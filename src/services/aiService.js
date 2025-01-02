import {openai} from '../config/openai.js';
import {DESIGN_TOKEN_PARTS, GPT_CONFIG} from '../config/constants.js';
import {designTokensStructure} from '../models/designTokens.js';

function getSystemPrompt(userInput, parts) {
    const partsList = Object.keys(parts).join(', ');
    return `Create a design system with these requirements:
    Preserve the same exact STRUCTURE of the json and change ALL the values 

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

export async function generateInspirationImages(prompt) {

}

export async function generateCompleteDesignTokens(prompt) {
    const [part1Response, part2Response] = await Promise.all([
        generateDesignTokenPart(prompt, DESIGN_TOKEN_PARTS.part1),
        generateDesignTokenPart(prompt, DESIGN_TOKEN_PARTS.part2)
    ]);

    return {part1Response, part2Response};
}