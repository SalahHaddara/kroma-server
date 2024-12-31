import {generateDesignSystem} from '../services/designTokenService.js';

export async function getDesignTokens(req, res) {

    const userPrompt = req.query.prompt || req.body.prompt;
    const designTokens = await generateDesignSystem(userPrompt);
    res.json(designTokens);
}