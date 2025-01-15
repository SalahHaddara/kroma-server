import mongoose from 'mongoose';

const designAnalysisSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    originalImage: {
        type: Buffer,
        required: true
    },
    analysis: {
        // Critical issues that need immediate attention
        critical: [{
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            category: {
                type: String,
                enum: ['Layout', 'Typography', 'Color', 'Spacing', 'Navigation', 'Accessibility'],
                required: true
            },
            severity: {
                type: Number,
                default: 3  // 3 = Critical
            },
            colorCode: {
                type: String,
                default: '#FF0000'  // Red for critical issues
            }
        }],
        // Moderate improvements needed
        moderate: [{
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            category: {
                type: String,
                enum: ['Layout', 'Typography', 'Color', 'Spacing', 'Navigation', 'Accessibility'],
                required: true
            },
            severity: {
                type: Number,
                default: 2  // 2 = Moderate
            },
            colorCode: {
                type: String,
                default: '#FFA500'  // Orange for moderate issues
            }
        }],
        // Minor suggestions for enhancement
        suggestions: [{
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            category: {
                type: String,
                enum: ['Layout', 'Typography', 'Color', 'Spacing', 'Navigation', 'Accessibility'],
                required: true
            },
            severity: {
                type: Number,
                default: 1  // 1 = Suggestion
            },
            colorCode: {
                type: String,
                default: '#FFD700'  // Gold for suggestions
            }
        }]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Index for faster queries
designAnalysisSchema.index({user: 1, createdAt: -1});

const DesignAnalysis = mongoose.model('DesignAnalysis', designAnalysisSchema);
export default DesignAnalysis;