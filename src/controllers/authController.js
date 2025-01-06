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
    const {fullName, email, password} = req.body;

    const existingUser = await User.findOne({email});
    if (existingUser) {
        return res.status(400).json({message: 'Email already exist'});
    }

    const user = await User.create({
        fullName,
        email,
        password
    })


}