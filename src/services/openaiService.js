import {openai} from '../config/openai.js';
import {DESIGN_TOKEN_PARTS, GPT_CONFIG} from '../config/constants.js';
import {designTokensStructure} from '../models/designTokens.js';

function getSystemPrompt(userInput, parts) {
    const partsList = Object.keys(parts).join(', ');
    return `Create a design system with these requirements:
    1. Match exactly the provided structure
    2. Create accessible and harmonious colors
    3. Use consistent spacing and sizing
    4. Generate unique SVG icons matching the theme
    5. Create cohesive typography
    6. Design matching alerts and components
    7. Add detailed design comments
    8. Use consistent units
    9. Generate unique quotes and messages
    10. Use professional naming

    Theme requirements: ${JSON.stringify(userInput)}
    
    Generate JSON for these sections only: ${partsList}`;
}

export async function generateDesignTokenPart(prompt, part) {
    const response = await openai.chat.completions.create({
        ...GPT_CONFIG,
        messages: [
            {
                role: "system",
                content: getSystemPrompt(prompt, part)
            },
            {
                role: "user",
                content: `Generate the design system part matching this structure: ${JSON.stringify(designTokensStructure, null, 2)}`
            }
        ]
    });

    return response.choices[0].message.content;
}

