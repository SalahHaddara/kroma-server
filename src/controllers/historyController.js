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
    try {
        const userId = req.user._id;
        const history = await DesignTokenHistory.find({user: userId})
            .sort({createdAt: -1});

        res.status(200).json({
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

export async function getHistoryById(req, res) {
    const {id} = req.params;
    const userId = req.user._id;

    const history = await DesignTokenHistory.findOne({
        _id: id,
        user: userId
    });

    if (!history) {
        return res.status(404).json({
            status: 'error',
            message: 'Design token history not found'
        });
    }
}