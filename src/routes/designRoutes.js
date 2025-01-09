import express from 'express';
import {getDesignTokens} from '../controllers/designTokenController.js';
import {protect} from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.get('/tokens', getDesignTokens);
router.post('/tokens', getDesignTokens);

router.get('/test-tokens', (req, res) => {
    const staticPrompt = "A Website selling plants.";

    // Add the static prompt to the request object
    req.query.prompt = staticPrompt;

    // Call the existing controller
    getDesignTokens(req, res);
});

export default router;