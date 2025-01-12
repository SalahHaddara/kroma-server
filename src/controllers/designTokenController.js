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

        const responseData = {
            ...latestDesign.designTokens,
            inspirationImages: latestDesign.inspirationImages
        };

        if (latestDesign.designImage) {
            responseData.designImage = latestDesign.designImage.toString('base64');
        }

        res.json(responseData);
    } catch (e) {
        console.error('Error fetching design tokens', e);
        res.status(500).json({error: 'Failed to fetch design tokens'});
    }
}

export async function
saveDesignPNG(req, res) {
    try {
        if (!req.files || !req.files.design) {
            return res.status(400).json({error: 'No design image uploaded'});
        }

        const userId = req.user._id;
        const designImage = req.files.design;

        const latestDesign = await DesignTokenHistory.findOne({
            user: userId
        }).sort({createdAt: -1});

        if (!latestDesign) {
            return res.status(404).json({error: 'No design history found'});
        }

        latestDesign.designImage = designImage.data;
        await latestDesign.save();

        res.status(200).json({message: 'Design image saved successfully'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}