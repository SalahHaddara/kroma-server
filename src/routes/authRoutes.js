import express from 'express';
import {signup, login, googleAuth, githubAuth} from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/google', googleAuth);
router.post('/github', githubAuth);