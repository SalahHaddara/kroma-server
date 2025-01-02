import {generateCompleteDesignTokens, generateInspirationImages} from './aiService.js';
import {validateStructure, validatePrompt} from './validationService.js';
import {designTokensStructure} from '../models/designTokens.js';
import {processImage} from './imageService.js';
import * as path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function generateDesignSystem(prompt) {
    validatePrompt(prompt);

    const [tokenResponse, inspirationImages] = await Promise.all([
        generateCompleteDesignTokens(prompt),
        generateInspirationImages(prompt)
    ]);

    const combined = {
        ...JSON.parse(part1Response),
        ...JSON.parse(part2Response)
    };

    validateStructure(combined, designTokensStructure);

    return {
        ...combined,

    };
}