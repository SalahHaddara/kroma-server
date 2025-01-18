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

export const removeUser = async (req, res) => {
    try {
        const {userId} = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        if (user.isAdmin) {
            return res.status(403).json({message: 'Cannot remove admin user'});
        }

        await Promise.all([
            DesignTokenHistory.deleteMany({user: userId}),
            DesignAnalysis.deleteMany({user: userId}),
            User.findByIdAndDelete(userId)
        ]);

        res.json({message: 'User and all associated data removed successfully'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const getSystemStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({isAdmin: false});
        const totalDesigns = await DesignTokenHistory.countDocuments();
        const totalAnalyses = await DesignAnalysis.countDocuments();

        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const activeUsers = await User.countDocuments({
            updatedAt: {$gte: oneDayAgo}
        });

        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const dailyStats = await getDailyUsageStats(thirtyDaysAgo);

        res.json({
            overview: {
                totalUsers,
                totalDesigns,
                totalAnalyses,
                activeUsers
            },
            dailyStats
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
