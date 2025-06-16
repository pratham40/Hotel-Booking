import express from 'express';
import cors from 'cors';
import connectDB from './config/dbConnection.js';
import { configDotenv } from 'dotenv';
configDotenv();

import {clerkMiddleware} from '@clerk/express'

import morgan from 'morgan';
import clerkWebhook from './controllers/clerkWebhook.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('API is running...');
});


app.use("/api/clerk",clerkWebhook)

const PORT = process.env.PORT || 5000;

app.listen(PORT, async() => {
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
});