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
app.use(clerkMiddleware());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('API is running...');
});


app.use("/api/clerk",express.raw({type:'application/json' }),clerkWebhook)



app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, async() => {
    try {
        await connectDB();
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.error('❌ Failed to connect to MongoDB:', err.message);
        process.exit(1);
    }
});