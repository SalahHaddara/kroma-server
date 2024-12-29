import express from 'express';
import cors from 'cors';
import designRoutes from './routes/designRoutes.js';

const app = express();
app.use(cors());

app.use('/get-design', designRoutes);

export default app;