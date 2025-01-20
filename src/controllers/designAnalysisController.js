import {analyzeDesignImage} from '../services/designAnalysisService.js';
import DesignAnalysis from '../models/DesignAnalysis.js';

export async function analyzeDesign(req, res) {
    try {
        if (!req.files || !req.files.image) {
            return res.status(400).json({error: 'No image file uploaded'});
        }

        const imageFile = req.files.image;
        const imageBuffer = imageFile.data;
        const base64Image = imageBuffer.toString('base64');
        const dataUrl = `data:${imageFile.mimetype};base64,${base64Image}`;

        const analysis = await analyzeDesignImage(dataUrl);

        const designAnalysis = await DesignAnalysis.create({
            user: req.user._id,
            originalImage: imageBuffer,
            analysis
        });

        const response = designAnalysis.toObject();
        delete response.originalImage;

        res.json(response);
    } catch (error) {
        console.error('Design analysis error:', error);
        res.status(500).json({
            error: 'Failed to analyze design',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}