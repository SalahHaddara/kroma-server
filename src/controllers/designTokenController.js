import {processImage} from '../services/imageService.js';
import {designTokensStructure} from '../models/designTokens.js';
import * as path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function getDesignTokens(req, res) {
    try {
        const mainImage = await processImage(
            path.join(__dirname, '../../public/images/main.jpg'),
            800,
            400
        );

        const smallImage1 = await processImage(
            path.join(__dirname, '../../public/images/small1.jpg'),
            400,
            400
        );

        const smallImage2 = await processImage(
            path.join(__dirname, '../../public/images/small2.jpg'),
            400,
            400
        );

        const designTokens = {
            ...designTokensStructure,
            inspirationImages: {
                mainImage: {imageData: mainImage},
                smallImage1: {imageData: smallImage1},
                smallImage2: {imageData: smallImage2}
            }
        };

        res.json(designTokens);
    } catch (error) {
        res.status(500).json({error: 'Failed to get design tokens'});
    }
}