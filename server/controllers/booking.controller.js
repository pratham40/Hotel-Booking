
import Booking from "../models/booking.model";
import Room from "../models/room.model";
import Hotel from "../models/hotel.model";


async function checkAvailability({checkInDate,checkOutDate,room}) {
    const bookings = await Booking.find({
            room,
            checkInDate : {
                $lte: checkOutDate,
            },
            checkOutDate: {
                $gte: checkInDate,
            }
        })

        const isAvail = bookings.length === 0;

        return isAvail;
}


async function checkAvailabilityApi(req,res) {
    try {
        const {checkInDate, checkOutDate, room} = req.body;

        const isAvail = await checkAvailability({checkInDate, checkOutDate, room});

        return res.status(200).json({
            success: true,
            message: isAvail ? "Room is available" : "Room is not available"
        });
    } catch (error) {
        console.error("Error checking availability:", error);
        return res.status(500).json({
            success: false,
            message: "Error checking availability"
        });
    }
}


async function createBooking(req,res,next) {
    try {
        const {room,checkInDate,checkOutDate,guests} = req.body;
        const user = req.user._id;

        const isAvail = await checkAvailability({checkInDate, checkOutDate, room});

        if (!isAvail) {
            return res.status(400).json({
                success: false,
                message: "Room is not available for the selected dates"
            });
        }

        const roomData = await Room.findById(room)
                                   .populate('hotel');

        const roomPrice = roomData.pricePerNight

        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);

        const nights = Math.ceil(checkIn.getTime()- checkOut.getTime() / (1000 * 60 * 60 * 24));

        const totalPrice = nights * roomPrice;

        const booking = await Booking.create({
            user,
            room,
            hotel: roomData.hotel._id,
            checkInDate: checkIn,
            checkOutDate: checkOut,
            totalPrice,
            guests:+guests,
        })

        return res.status(201).json({
            success: true,
            message: "Booking created successfully",
            booking
        });
    } catch (error) {
        console.error("Error creating booking:", error);
        return res.status(500).json({
            success: false,
            message: "Error creating booking"
        });
    }
}


async function getUserBooking(req,res,next) {
    try {
        const userId = req.user._id;

        const bookings = await Booking.find({user: userId})
                                      .populate('room hotel')
                                      .sort({createdAt: -1});


        return res.status(200).json({
            success: true,
            bookings
        });
    } catch (error) {
        console.error("Error fetching user bookings:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching user bookings"
        });
    }
}


async function getHotelBooking(req,res) {
    const hotel = await Hotel.findOne({
        owner: req.user._id
    })
    if (!hotel) {
        return res.status(404).json({
            success: false,
            message: "Hotel not found"
        });
    }

    const bookings = await Booking.find({hotel: hotel._id})
                                    .populate('room hotel user')
                                    .sort({createdAt: -1});

    if (bookings) {
        const totalBookings = bookings.length;
        const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);
        return res.status(200).json({
            success: true,
            dashboardData:{
                bookings,
                totalBookings,
                totalRevenue
            }
        });
    }

    return res.status(404).json({
        success: false,
        message: "No bookings found for this hotel"
    });

}

export { checkAvailabilityApi, createBooking, getUserBooking,getHotelBooking };