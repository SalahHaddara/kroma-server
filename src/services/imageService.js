import sharp from 'sharp';
import {readFile} from 'fs/promises';

export async function processImage(imagePath, width, height) {
    try {
        const imageBuffer = await readFile(imagePath);
        const processedBuffer = await sharp(imageBuffer)
            .resize(width, height, {
                fit: 'cover',
                position: 'center'
            })
            .jpeg({
                mozjpeg: true
            })
            .toBuffer();

        return `data:image/jpeg;base64,${processedBuffer.toString('base64')}`;
    } catch (error) {
        console.error(`Error processing image ${imagePath}:`, error);
        return null;
    }
}