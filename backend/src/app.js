import express from 'express';
import dotenv from 'dotenv';
//import connectDB from './config/db.js';
import morgan from 'morgan';
import healthRoutes from './routes/healthRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';
import cors from 'cors';

dotenv.config();
const app = express();

// Middleware
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('tiny'));
app.use('/api/sessions', sessionRoutes);
app.use('/api', healthRoutes);



export default app;
