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
                default: 3
            },
            colorCode: {
                type: String,
                default: '#FF0000'
            }
        }],

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
                default: 2
            },
            colorCode: {
                type: String,
                default: '#FFA500'
            }
        }],
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
                default: 1
            },
            colorCode: {
                type: String,
                default: '#FFD700'
            }
        }]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

designAnalysisSchema.index({user: 1, createdAt: -1});

const DesignAnalysis = mongoose.model('DesignAnalysis', designAnalysisSchema);
export default DesignAnalysis;