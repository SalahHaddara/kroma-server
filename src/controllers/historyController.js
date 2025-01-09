import DesignTokenHistory from '../models/DesignTokenHistory.js';


export async function saveDesignTokenHistory(req, res) {
    try {
        const {prompt, designTokens, inspirationImages} = req.body;
        const userId = req.user._id; // From auth middleware

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
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
}

export async function getUserHistory(req, res) {

    const userId = req.user._id;
    const history = await DesignTokenHistory.find({user: userId}).sort({createdAt: -1});


}