import express from 'express';
import cors from 'cors';
import designRoutes from './routes/designRoutes.js';
import {errorHandler} from './middleware/errorHandler.js';
import authRoutes from "./routes/authRoutes.js";
import histroyRoutes from "./routes/histroyRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
express.urlencoded()

app.use('/get-design', designRoutes);
app.use('/auth', authRoutes);
app.use('/api/history', histroyRoutes);

app.use(errorHandler);

export default app;