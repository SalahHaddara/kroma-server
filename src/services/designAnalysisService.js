import {openai} from '../config/openai.js';

const parseGPTResponse = (responseText) => {
    const sections = {
        critical: [],
        moderate: [],
        suggestions: []
    };

    // Split the text into main sections
    const mainSections = responseText.split(/###\s+/g).filter(Boolean);

    mainSections.forEach(section => {
        const lines = section.split('\n').filter(Boolean);
        const sectionTitle = lines[0].toLowerCase().trim();

        // Process each numbered item in the section
        const items = lines.slice(1).join('\n').split(/\d+\.\s+/).filter(Boolean);

        items.forEach(item => {
            const issueMatch = item.match(/\*\*(.*?):\*\*(.*?)(?=-\s+\*\*|$)/s);
            const recommendationMatch = item.match(/-\s+\*\*Recommendation\*\*:(.*?)(?=\n|$)/s);

            if (issueMatch) {
                const [_, title, descriptionPart] = issueMatch;
                const recommendation = recommendationMatch ? recommendationMatch[1].trim() : '';
                const description = (descriptionPart + (recommendation ? ". " + recommendation : "")).trim();

                const issue = {
                    title: title.trim(),
                    description: description,
                    category: determineCategory(title, description),
                    severity: sectionTitle.includes('critical') ? 3 :
                        sectionTitle.includes('moderate') ? 2 : 1,
                    colorCode: sectionTitle.includes('critical') ? '#DC2626' :
                        sectionTitle.includes('moderate') ? '#F97316' :
                            '#EAB308'
                };

                if (sectionTitle.includes('critical')) {
                    sections.critical.push(issue);
                } else if (sectionTitle.includes('moderate')) {
                    sections.moderate.push(issue);
                } else if (sectionTitle.includes('suggestion')) {
                    sections.suggestions.push(issue);
                }
            }
        });
    });

    return sections;
};

function determineCategory(title) {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('accessibility')) return 'Accessibility';
    if (titleLower.includes('layout') || titleLower.includes('alignment')) return 'Layout';
    if (titleLower.includes('typography') || titleLower.includes('text') || titleLower.includes('readability')) return 'Typography';
    if (titleLower.includes('color') || titleLower.includes('contrast')) return 'Color';
    if (titleLower.includes('spacing')) return 'Spacing';
    if (titleLower.includes('navigation')) return 'Navigation';
    return 'Layout';
}


export async function analyzeDesignImage(dataUrl) {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: `Analyze this UI design image in detail and provide specific feedback in these categories:

                            CRITICAL ISSUES:
                            - Look for serious problems with accessibility, usability, and functionality
                            - Examine contrast ratios, text readability, and navigation clarity
                            - Identify any major layout or alignment issues
                            - Don't add any critical issue unless it is really critical not just assumptions.

                            MODERATE IMPROVEMENTS:
                            - Check spacing consistency and visual hierarchy
                            - Evaluate typography choices and sizing
                            - Assess color scheme effectiveness and consistency

                            SUGGESTIONS:
                            - Recommend refinements for better user experience
                            - Suggest minor visual enhancements
                            - Propose optimization for different screen sizes
                            here is the EXACT structure formatting u should follow : 
                            ### CRITICAL ISSUES

                            - **Accessibility:**
                            - Ensure that text elements...
                            - Alt text for icons...

                            - **Usability:**
                            - The navigation should...
                            `
                        },
                        {
                            type: "image_url",
                            image_url: {
                                url: dataUrl
                            }
                        }
                    ]
                }
            ]
        });

        const analysisText = response.choices[0]?.message?.content;
        console.log('Raw GPT Response:', analysisText);

        if (!analysisText) {
            throw new Error('Failed to generate analysis');
        }

        // Parse the GPT response into structured data
        const analysis = parseGPTResponse(analysisText);
        const structuredAnalysis = parseMarkdownAnalysis(analysisText);

        return structuredAnalysis
    } catch (error) {
        console.error('OpenAI API Error:', error);
        throw error;
    }
}


