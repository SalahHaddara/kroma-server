import express from 'express';
import cors from 'cors';
import designRoutes from './routes/designRoutes.js';
import {errorHandler} from './middleware/errorHandler.js';
import authRoutes from "./routes/authRoutes.js";
import histroyRoutes from "./routes/histroyRoutes.js";
import analysisRoutes from "./routes/analysisRoutes.js";
import fileUpload from "express-fileupload";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

app.use(cors({
    origin: ['http://localhost:5173', 'null'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Type']
}));

app.options('*', cors());

app.use(express.json());
app.get('/test', (req, res) => {
    res.json({message: 'API working'});
});
app.use('/get-design', designRoutes);
app.use('/auth', authRoutes);
app.use('/api/history', histroyRoutes);
app.use('/analysis', analysisRoutes);
app.use('/admin', adminRoutes);

app.use(errorHandler);

export default app;