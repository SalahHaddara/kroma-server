import {generateDesignSystem} from '../services/designTokenService.js';
import {ValidationError} from '../services/validationService.js';

export async function getDesignTokens(req, res) {
    try {
        const userPrompt = req.query.prompt || req.body.prompt;
        const designTokens = await generateDesignSystem(userPrompt);
        res.json(designTokens);
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(400).json({error: error.message});
        } else {
            res.status(500).json({error: 'Failed to generate design tokens'});
        }
    }
}