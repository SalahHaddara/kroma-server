import {openai} from '../config/openai.js';

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

        const structuredAnalysis = parseMarkdownAnalysis(analysisText);

        return structuredAnalysis
    } catch (error) {
        console.error('OpenAI API Error:', error);
        throw error;
    }
}

function parseMarkdownAnalysis(analysisText) {
    const structured = {
        critical: [],
        moderate: [],
        suggestions: []
    };

    // Split into main sections
    const sections = analysisText.split('###').filter(Boolean);

    sections.forEach(section => {
        const lines = section.trim().split('\n');
        const sectionType = lines[0].trim().toLowerCase();

        // Skip the section header
        const bulletPoints = lines.slice(1)
            .filter(line => line.trim().startsWith('-'))
            .map(line => line.trim().substring(1).trim());

        // Group bullet points by their parent
        let currentIssue = null;

        bulletPoints.forEach(point => {
            if (point.startsWith('**')) {
                currentIssue = {
                    title: point.match(/\*\*(.*?):\*\*/)[1],
                    description: '',
                    subpoints: [],
                    category: determineCategory(point),
                    severity: sectionType.includes('critical') ? 3 :
                        sectionType.includes('moderate') ? 2 : 1,
                    colorCode: sectionType.includes('critical') ? '#EF4444' :
                        sectionType.includes('moderate') ? '#F97316' : '#EAB308'
                };

                // Add to appropriate section
                if (sectionType.includes('critical')) structured.critical.push(currentIssue);
                else if (sectionType.includes('moderate')) structured.moderate.push(currentIssue);
                else structured.suggestions.push(currentIssue);
            } else if (currentIssue) {
                // This is a subpoint of the current issue
                currentIssue.subpoints.push(point);
                currentIssue.description += (currentIssue.description ? ' ' : '') + point;
            }
        });
    });

    return structured;
}

