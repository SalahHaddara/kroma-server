import mongoose from 'mongoose';

const designTokenHistorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    prompt: {
        type: String,
        required: true,
        minLength: 10
    },
});


const DesignTokenHistory = mongoose.model('DesignTokenHistory', designTokenHistorySchema);
export default DesignTokenHistory;