import express from 'express';
import {
    signup, login, googleAuth, githubAuth, checkPluginLogin,
    completePluginLogin,
    checkPluginSession
} from '../controllers/authController.js';
import {protect} from "../middleware/auth.js";

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/google', googleAuth);
router.post('/github', githubAuth);

// Plugin authentication endpoints
router.get('/check-plugin-login', checkPluginLogin);
router.post('/complete-plugin-login', protect, completePluginLogin);
router.get('/plugin-session', (req, res, next) => {
    console.log('Plugin session request received');
    next();
}, checkPluginSession);
router.post('/logout', (req, res) => {
    res.json({success: true});
});

export default router;