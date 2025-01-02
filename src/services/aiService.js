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
    try {
        const imagePrompts = {
            mainImage: `Create a modern, high-quality design inspiration image showcasing ${prompt}. Focus on overall aesthetic and mood.`,
            smallImage1: `Create a detailed design inspiration image focusing on the textures and patterns of ${prompt}.`,
            smallImage2: `Create a design inspiration image showing the color palette and visual elements of ${prompt}.`
        };


    } catch (error) {
        console.error('Error generating inspiration images:', error);
        throw new Error('Failed to generate inspiration images');
    }
}

async function generateImage(prompt, size) {
    const response = await openai.images.generate({
        model: "dall-e-2",
        prompt: prompt,
        size: size,
        quality: "standard",
        n: 1,
        response_format: "b64_json"
    });

    return `data:image/png;base64,${response.data[0].b64_json}`;

}

export async function generateCompleteDesignTokens(prompt) {
    const [part1Response, part2Response] = await Promise.all([
        generateDesignTokenPart(prompt, DESIGN_TOKEN_PARTS.part1),
        generateDesignTokenPart(prompt, DESIGN_TOKEN_PARTS.part2)
    ]);

    return {part1Response, part2Response};
}