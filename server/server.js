import express from 'express';
import cors from 'cors';
import connectDB from './config/dbConnection.js';
import { configDotenv } from 'dotenv';
configDotenv();


const app = express();
app.use(cors());


app.get('/', (req, res) => {
    res.send('API is running...');
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, async() => {
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
});