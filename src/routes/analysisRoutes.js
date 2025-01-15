import express from 'express';
import {protect} from '../middleware/auth.js';
import {
    analyzeDesign,
} from '../controllers/designAnalysisController.js';
import fileUpload from "express-fileupload";

const router = express.Router();

// Apply authentication middleware
router.use(protect);

const fileUploadMiddleware = fileUpload({
    limits: {fileSize: 5 * 1024 * 1024}, // 5MB max file size
    abortOnLimit: true,
    responseOnLimit: "File size limit exceeded (5MB)",
    debug: true,
    useTempFiles: false,
    preserveExtension: true,
    safeFileNames: true
});
// File upload route
router.post('/analyze', fileUploadMiddleware, analyzeDesign);
// router.get('/history', getAnalysisHistory);
// router.get('/:id', getAnalysisById);
// router.delete('/:id', deleteAnalysisById);

export default router;