import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import modelRoutes from './routes/modelRoutes.js';
import { connectDB } from './db/db.js';


import dotenv from 'dotenv';
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/model', modelRoutes)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});