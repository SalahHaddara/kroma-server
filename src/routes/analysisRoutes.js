import express from 'express';
import {protect} from '../middleware/auth.js';
import {
    analyzeDesign,
} from '../controllers/designAnalysisController.js';

const router = express.Router();

//authentication middleware
router.use(protect);

// File upload route
router.post('/analyze', analyzeDesign);
// router.get('/history', getAnalysisHistory);
// router.get('/:id', getAnalysisById);
// router.delete('/:id', deleteAnalysisById);

export default router;