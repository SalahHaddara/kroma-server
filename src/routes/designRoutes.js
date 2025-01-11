import express from 'express';
import {getDesignTokens, getLatestDesignTokens, saveDesignSVG} from '../controllers/designTokenController.js';
import {protect} from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.get('/tokens', getDesignTokens);
router.post('/tokens', getDesignTokens);
router.get('/latest-tokens', getLatestDesignTokens);
router.post('/save-design', protect, saveDesignSVG);


export default router;