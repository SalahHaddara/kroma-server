import express from 'express';
import {getDesignTokens} from '../controllers/designTokenController.js';

const router = express.Router();

router.get('/tokens', getDesignTokens);

export default router;