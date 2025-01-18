import User from '../models/User.js';
import DesignTokenHistory from '../models/DesignTokenHistory.js';
import DesignAnalysis from '../models/DesignAnalysis.js';

export const getAllUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const users = await User.find({isAdmin: false})
            .select('-password')
            .skip(skip)
            .limit(limit);

        const total = await User.countDocuments({isAdmin: false});

        const usersWithStats = await Promise.all(users.map(async (user) => {
            const designCount = await DesignTokenHistory.countDocuments({user: user._id});
            const analysisCount = await DesignAnalysis.countDocuments({user: user._id});

            return {
                ...user.toObject(),
                stats: {
                    totalDesigns: designCount,
                    totalAnalyses: analysisCount,
                    lastActive: await getLastActiveDate(user._id)
                }
            };
        }));

        res.json({
            users: usersWithStats,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const getUserDetails = async (req, res) => {
    try {
        const {userId} = req.params;

        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        const designHistory = await DesignTokenHistory.find({user: userId})
            .sort({createdAt: -1});

        const analysisHistory = await DesignAnalysis.find({user: userId})
            .sort({createdAt: -1});

        const stats = {
            totalDesigns: designHistory.length,
            totalAnalyses: analysisHistory.length,
            lastActive: await getLastActiveDate(userId),
            averageDesignsPerDay: await calculateAverageUsage(userId)
        };

        res.json({
            user,
            stats,
            history: {
                designs: designHistory,
                analyses: analysisHistory
            }
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
