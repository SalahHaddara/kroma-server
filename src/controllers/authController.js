import {OAuth2Client} from 'google-auth-library';
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import axios from "axios";

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

        const user = await User.findOne({email}).select('+password');

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

        const jwtToken = signToken(user._id);

        res.status(200).json({
            token: jwtToken,
            user
        })
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

export const githubAuth = async (req, res) => {
    try {
        const {code} = req.body;

        // Exchange code for access token
        const tokenResponse = await axios.post(
            'https://github.com/login/oauth/access_token',
            {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code
            },
            {
                headers: {
                    Accept: 'application/json'
                }
            }
        );

        const accessToken = tokenResponse.data.access_token;

        // Get user data from GitHub
        const userResponse = await axios.get('https://api.github.com/user', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        const {login: githubUsername, id: githubId, avatar_url, email} = userResponse.data;

        // Get user's email if not provided in profile
        let userEmail = email;
        if (!userEmail) {
            const emailsResponse = await axios.get('https://api.github.com/user/emails', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            userEmail = emailsResponse.data.find(email => email.primary)?.email;
        }

        // Check if user exists
        let user = await User.findOne({email: userEmail});

        if (!user) {
            // Create new user if doesn't exist
            user = await User.create({
                fullName: githubUsername,
                email: userEmail,
                githubId: githubId.toString(),
                avatar: avatar_url
            });
        } else {
            // Update existing user's GitHub ID if not set
            if (!user.githubId) {
                user.githubId = githubId.toString();
                await user.save();
            }
        }

        // Create token
        const token = signToken(user._id);

        res.status(200).json({
            token,
            user
        });
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

const pluginSessions = new Map();

export const checkPluginSession = async (req, res) => {
    console.log('Checking plugin session');
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({authenticated: false});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({authenticated: false});
        }

        res.json({
            authenticated: true,
            token,
            user: {
                email: user.email,
                name: user.fullName
            }
        });
    } catch (error) {
        res.status(500).json({error: 'Server error'});
    }
};

export const checkPluginLogin = async (req, res) => {
    const {sessionKey} = req.query;
    const session = pluginSessions.get(sessionKey);

    if (session) {
        pluginSessions.delete(sessionKey);
        res.json({
            authenticated: true,
            token: session.token,
            user: session.user
        });
    } else {
        res.json({authenticated: false});
    }
};

export const completePluginLogin = async (req, res) => {
    console.log('Request user:', req.user); // Add this line
    const {sessionKey} = req.body;
    if (!sessionKey || !req.user) {
        return res.status(400).json({error: 'Invalid request'});
    }

    pluginSessions.set(sessionKey, {
        token: jwt.sign({id: req.user._id}, process.env.JWT_SECRET),
        user: {
            email: req.user.email,
            name: req.user.fullName
        }
    });

    res.json({success: true});
};
