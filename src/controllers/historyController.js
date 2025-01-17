import DesignTokenHistory from '../models/DesignTokenHistory.js';
import {ValidationError} from '../services/validationService.js';

export async function saveDesignTokenHistory(req, res) {
    try {
        const {prompt, designTokens, inspirationImages} = req.body;
        const userId = req.user._id;

        if (!prompt || !designTokens) {
            throw new ValidationError('Prompt and design tokens are required');
        }

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
        if (error instanceof ValidationError) {
            res.status(400).json({
                status: 'error',
                message: error.message
            });
        } else {
            res.status(500).json({
                status: 'error',
                message: 'Failed to save design token history'
            });
        }
    }
}

export async function getUserHistory(req, res) {
    try {
        const userId = req.user._id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const total = await DesignTokenHistory.countDocuments({user: userId});

        let history = await DesignTokenHistory.find({user: userId})
            .sort({createdAt: -1})
            .skip(skip)
            .limit(limit);

        history = history.map(item => {
            const historyObj = item.toObject();

            if (historyObj.designImage && Buffer.isBuffer(historyObj.designImage)) {
                historyObj.designImage = historyObj.designImage.toString('base64');
            }

            if (historyObj.designTokens && historyObj.designTokens.designImage) {
                if (Buffer.isBuffer(historyObj.designTokens.designImage)) {
                    historyObj.designTokens.designImage = historyObj.designTokens.designImage.toString('base64');
                }
            }

            return historyObj;
        });

        res.status(200).json({
            status: 'success',
            data: {
                history,
                pagination: {
                    page,
                    limit,
                    total,
                    pages: Math.ceil(total / limit)
                }
            }
        });
    } catch (error) {
        console.error('Error in getUserHistory:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch design token history'
        });
    }
}

export async function getHistoryById(req, res) {
    try {
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

        res.status(200).json({
            status: 'success',
            data: history
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch design token history'
        });
    }
}

export async function deleteHistoryItem(req, res) {
    try {
        const {id} = req.params;
        const userId = req.user._id;

        const history = await DesignTokenHistory.findOneAndDelete({
            _id: id,
            user: userId
        });

        if (!history) {
            return res.status(404).json({
                status: 'error',
                message: 'Design token history not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'History item deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to delete history item'
        });
    }
}