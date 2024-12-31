import {generateCompleteDesignTokens} from './openaiService.js';
import {validateStructure, validatePrompt} from './validationService.js';
import {designTokensStructure} from '../models/designTokens.js';
import {processImage} from './imageService.js';
import * as path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function generateDesignSystem(prompt) {
    validatePrompt(prompt);

    const {part1Response, part2Response} = await generateCompleteDesignTokens(prompt);

    const combined = {
        ...JSON.parse(part1Response),
        ...JSON.parse(part2Response)
    };
}