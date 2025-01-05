import jwt from 'jsonwebtoken';
import {promisify} from 'util';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({message: 'Please log in to access this resource'});
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
        return res.status(401).json({message: 'User no longer exists'});
    }

    req.user = user;
    next();
    
};