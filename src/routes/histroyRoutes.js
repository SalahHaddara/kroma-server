import express from 'express';
import {protect} from '../middleware/auth.js';
import {
    saveDesignTokenHistory,
    getUserHistory,
    getHistoryById,
    deleteHistoryItem
} from '../controllers/historyController.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

router.post('/', saveDesignTokenHistory);
router.get('/', getUserHistory);


export default router;