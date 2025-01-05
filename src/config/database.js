import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');
    } catch (e) {
        console.error('MongoDB connection error:', e);
        process.exit(1);
    }
}

export default connectDB;