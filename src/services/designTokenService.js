import {generateCompleteDesignTokens} from './aiService.js';
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

    validateStructure(combined, designTokensStructure);

    const [mainImage, smallImage1, smallImage2] = await Promise.all([
        processImage(path.join(__dirname, '../../public/images/main.jpg'), 800, 400),
        processImage(path.join(__dirname, '../../public/images/small1.jpg'), 400, 400),
        processImage(path.join(__dirname, '../../public/images/small2.jpg'), 400, 400)
    ]);

    return {
        ...combined,
        inspirationImages: {
            mainImage: {imageData: mainImage},
            smallImage1: {imageData: smallImage1},
            smallImage2: {imageData: smallImage2}
        }
    };
}