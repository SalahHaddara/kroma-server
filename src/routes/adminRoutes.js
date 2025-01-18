import express from 'express';
import {protect} from '../middleware/auth.js';
import {adminAuth} from '../middleware/adminAuth.js';
import {
    getAllUsers,
    getUserDetails,
    removeUser,
    getSystemStats
} from '../controllers/adminController.js';

const router = express.Router();

router.use(protect);
router.use(adminAuth);

router.get('/users', getAllUsers);
router.get('/users/:userId', getUserDetails);
router.delete('/users/:userId', removeUser);
router.get('/stats', getSystemStats);

export default router;