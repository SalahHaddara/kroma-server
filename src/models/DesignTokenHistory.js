import mongoose from 'mongoose';

const designTokenHistorySchema = new mongoose.Schema({});


const DesignTokenHistory = mongoose.model('DesignTokenHistory', designTokenHistorySchema);
export default DesignTokenHistory;