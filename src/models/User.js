import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: function () {
            return !this.googleId && !this.githubId;
        }
    },
    googleId: String,
    githubId: String,
    avatar: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});