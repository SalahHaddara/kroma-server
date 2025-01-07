import express from 'express';
import cors from 'cors';
import designRoutes from './routes/designRoutes.js';
import {errorHandler} from './middleware/errorHandler.js';
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use('/get-design', designRoutes);
app.use('/auth', authRoutes);

app.use(errorHandler);

export default app;