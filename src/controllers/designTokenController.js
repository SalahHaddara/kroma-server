import {generateDesignSystem} from '../services/designTokenService.js';
import {ValidationError} from '../services/validationService.js';
import DesignTokenHistory from '../models/DesignTokenHistory.js';

export async function getDesignTokens(req, res) {
    try {
        const userPrompt = req.query.prompt || req.body.prompt;
        const designSystem = await generateDesignSystem(userPrompt);

        if (req.user) {
            await DesignTokenHistory.create({
                user: req.user._id,
                prompt: userPrompt,
                designTokens: designSystem,
                inspirationImages: designSystem.inspirationImages
            });
        }

        res.json(designSystem);
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(400).json({error: error.message});
        } else {
            res.status(500).json({error: 'Failed to generate design tokens'});
        }
    }
}

export async function getLatestDesignTokens(req, res) {
    try {
        const latestDesign = await DesignTokenHistory.findOne({
            user: req.user._id
        }).sort({createdAt: -1});

        res.json({
            ...latestDesign.designTokens,
            inspirationImages: latestDesign.inspirationImages
        });
    } catch (e) {
        console.error('Error fetching design tokens', e);
        res.status(500).json({error: 'Failed to fetch design tokens'});
    }
}

export async function saveDesignSVG(req, res) {

    const userId = req.user._id;
    const {svg} = req.body;

    const latestDesign = await DesignTokenHistory.findOne({
        user: userId
    }).sort({createdAt: -1});

}