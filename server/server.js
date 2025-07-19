import express from 'express';
import cors from 'cors';
import connectDB from './config/dbConnection.js';
import { configDotenv } from 'dotenv';
configDotenv();
import userRouter from './routes/user.route.js';
import {clerkMiddleware} from '@clerk/express'
import {v2 as cloudinary} from "cloudinary"
import morgan from 'morgan';
import clerkWebhook from './controllers/clerkWebhook.js';
import hotelRouter from './routes/hotel.route.js';
import roomRouter from './routes/room.routes.js';
import bookingRouter from './routes/booking.route.js';

const app = express();
app.use(cors());
app.use(clerkMiddleware());
app.use(morgan('dev'));

// Cloudinary configuration

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})


app.get('/', (req, res) => {
    res.send('API is running...');
});


app.use("/api/clerk",express.raw({type:'application/json' }),clerkWebhook)



app.use(express.json());

app.use("/api/users",userRouter)

app.use("/api/hotels",hotelRouter)

app.use("/api/rooms",roomRouter)

app.use("/api/bookings",bookingRouter);

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