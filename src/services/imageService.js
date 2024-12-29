import sharp from 'sharp';
import {readFile} from 'fs/promises';

export async function processImage(imagePath, width, height) {

    const imageBuffer = await readFile(imagePath);


}