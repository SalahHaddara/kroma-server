import DesignTokenHistory from '../models/DesignTokenHistory.js';


export async function saveDesignTokenHistory(req, res) {

    const {prompt, designTokens, inspirationImages} = req.body;
    const userId = req.user._id; // from auth middleware

    const history = await DesignTokenHistory.create({
        user: userId,
        prompt,
        designTokens,
        inspirationImages
    });

    res.status(201).json({
        status: 'success',
        data: history
    });
}