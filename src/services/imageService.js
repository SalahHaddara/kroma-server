import sharp from 'sharp';
import {readFile} from 'fs/promises';

export async function processImage(imagePath, width, height) {

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

}