import express from 'express';
import {getDesignTokens} from '../controllers/designTokenController.js';
import {protect} from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.get('/tokens', getDesignTokens);
router.post('/tokens', getDesignTokens);

router.get('/latest-tokens', async (req, res) => {

});

export default router;