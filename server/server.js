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

const startServer = async () => {
  try {
    await connectDB();  // ✅ Ensures database is ready
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error('❌ Failed to connect DB:', err.message);
  }
};

startServer();