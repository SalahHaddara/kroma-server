import {OAuth2Client} from 'google-auth-library';
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const signToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

export const signup = async (req, res) => {
    try {
        const {fullName, email, password} = req.body;

        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({message: 'Email already exist'});
        }

        const user = await User.create({
            fullName,
            email,
            password
        });

        const token = signToken(user._id);

        user.password = undefined;

        res.status(201).json({
            token,
            user
        });
    } catch (e) {
        res.status(401).json({message: e.message});
    }
}

export const login = async (req, res) => {
    try {

        const {email, password} = req.body;

        const user = User.find({email}).select('+password');
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({message: 'Invalid email or password'});
        }

        const token = signToken(user._id);

        user.password = undefined;

        res.status(200).json({
            token,
            user
        });
    } catch (e) {
        res.status(400).json({message: e.message});
    }
}

export const googleAuth = async (req, res) => {
    try {
        const {token} = req.body;

        // Verify Google token
        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const {email, name, picture, sub: googleId} = ticket.getPayload();

        let user = await User.findOne({email});

        if (!user) {
            // Create new user if doesn't exist
            user = await User.create({
                fullName: name,
                email,
                googleId,
                avatar: picture
            });
        } else {
            // Update existing user's Google ID if not set
            if (!user.googleId) {
                user.googleId = googleId;
                await user.save();
            }
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};