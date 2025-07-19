const { checkAvailabilityApi, createBooking, getUserBooking, getHotelBooking } = require("../controllers/booking.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

const bookingRouter = require("express").Router();

bookingRouter.post("/check-availability",checkAvailabilityApi);
bookingRouter.post("/book",authMiddleware,createBooking);
bookingRouter.get("/user",authMiddleware,getUserBooking);
bookingRouter.get("/hotel",authMiddleware,getHotelBooking);


export default bookingRouter;