import express from 'express';
import {
    getDesignTokens,
    getLatestDesignTokens,
    saveDesignPNG
} from '../controllers/designTokenController.js';
import {protect} from "../middleware/auth.js";
import fileUpload from 'express-fileupload';

const router = express.Router();

router.use(protect);
router.use(fileUpload());

router.get('/tokens', getDesignTokens);
router.post('/tokens', getDesignTokens);
router.get('/latest-tokens', getLatestDesignTokens);
router.post('/save-design', protect, saveDesignPNG);

export default router;