import DesignTokenHistory from '../models/DesignTokenHistory.js';


export async function saveDesignTokenHistory(req, res) {

    const {prompt, designTokens, inspirationImages} = req.body;
    const userId = req.user._id; // from auth middleware

}