import express from 'express';
import dotenv from 'dotenv';
//import connectDB from './config/db.js';
import morgan from 'morgan';
import healthRoutes from './routes/healthRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use('/api/sessions', sessionRoutes);
app.use('/api', healthRoutes);

// Connect to the database
//connectDB();

export default app;
