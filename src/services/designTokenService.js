import {openai} from '../config/openai.js';
import {validateStructure, validatePrompt} from './validationService.js';
import {designTokensStructure} from '../models/designTokens.js';
import * as path from 'path';
import {fileURLToPath} from 'url';
import {generateInspirationImages} from "./aiService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const systemPrompt = `You are a professional UI/UX designer specializing in creating comprehensive design systems.
Your task is to generate a complete design system based on the user's prompt.

Important requirements:
1. Maintain the EXACT structure of the provided JSON
2. Only change VALUES, never keys or structure
3. Ensure all colors use HEX format (#XXXXXX)
4. Create harmonious color palettes with proper contrast ratios
5. All SVG icons should be relevant to the theme
6. Typography should be practical and readable
7. All measurements (padding, sizes) should be practical for web use
8. Generate relevant quotes and alerts that match the theme
9. Maintain proper accessibility standards
10. Each color palette must have exactly 7 colors
11. SVG icons must be properly formatted and use currentColor 
and do not include \`\`\`json and \`\`\` when start and finish
and do not use fonts that are not available in figma always use fonts available in figma
change every single value in theat json strucutre without changing the strucutre itself by chagne every single value to match the whole moodobard goal and vibes and theme
change all icons and all texts in alerts`;

export async function generateDesignSystem(prompt) {
    try {
        validatePrompt(prompt);

        // Generate design tokens
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: `Generate a complete design system for: ${prompt}
                    
                    Base the response on this exact structure, only changing the values:
                    ${JSON.stringify(designTokensStructure, null, 2)}`
                }
            ],
        });
        console.log("//////////", completion);
        const designSystem = JSON.parse(completion.choices[0].message.content);
        console.log(designSystem);

        validateStructure(designSystem, designTokensStructure);

        // const dummyImages = {
        //     mainImage: {imageData: null},
        //     smallImage1: {imageData: null},
        //     smallImage2: {imageData: null}
        // };

        const inspirationImages = await generateInspirationImages(prompt);

        return {
            ...designSystem,
            inspirationImages: inspirationImages
        };
    } catch (error) {
        console.error('Error generating design system:', error);
        throw error;
    }
}