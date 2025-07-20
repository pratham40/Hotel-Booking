import express from "express";
import { checkAvailabilityApi, createBooking, getHotelBooking, getUserBooking } from "../controllers/booking.controller.js";
import {authMiddleware} from "../middlewares/auth.middleware.js"
const bookingRouter = express.Router();

bookingRouter.post("/check-availability",checkAvailabilityApi);
bookingRouter.post("/book",authMiddleware,createBooking);
bookingRouter.get("/user",authMiddleware,getUserBooking);
bookingRouter.get("/hotel",authMiddleware,getHotelBooking);


export default bookingRouter;