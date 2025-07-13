import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { registerHotel } from '../controllers/hotel.controller.js';

const hotelRouter = express.Router();

hotelRouter.post("/",authMiddleware,registerHotel);

export default hotelRouter;