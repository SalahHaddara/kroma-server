import mongoose from 'mongoose';

const designTokenHistorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});


const DesignTokenHistory = mongoose.model('DesignTokenHistory', designTokenHistorySchema);
export default DesignTokenHistory;