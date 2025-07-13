import Hotel from "../models/hotel.model.js";
import {v2 as cloudinary} from 'cloudinary';
import Room from "../models/room.model.js";

export const createRoom = async (req, res) => {
    try {
        const {roomType,pricePerNight,amenties} = req.body;

        const hotel = await Hotel.findOne({owner: req.auth.userId});

        if (!hotel) {
            return res.status(404).json({
                success: false,
                message: "Hotel not found"
            });
        }

        if (req.files) {
            const uploadImages = req.files.map(async(file)=>{
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: "rooms"
                });

                return result.secure_url;
            })
        }

        const images=await Promise.all(uploadImages)

        await Room.create({
            hotel: hotel._id,
            roomType,
            pricePerNight:+pricePerNight,
            amenties:JSON.parse(amenties),
            images
        })

        return res.status(201).json({
            success: true,
            message: "Room created successfully",
            room: {
                hotel: hotel._id,
                roomType,
                pricePerNight,
                amenties: JSON.parse(amenties),
                images
            }
        });

    } catch (error) {
        console.error("Error creating room:", error);
        res.status(500).json({
            success: false,
            message: "error in creating room"
        });
    }
}


export const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find({isAvailable: true})
                                .populate({
                                    path:"hotel",
                                    populate :{
                                        path:"owner",
                                        select: 'avatar'
                                    }
                                }).sort({createdAt: -1});

        return res.status(200).json({
            success: true,
            message: "Rooms fetched successfully",
            rooms
        });

    } catch (error) {
        console.error("Error fetching rooms:", error);
        return res.status(500).json({
            success: false,
            message: "error in fetching rooms"
        });
    }
}

export const getOwnerRooms = async (req, res) => {
    try {
        const hotel = await Hotel.findOne({owner: req.auth.userId});

        if (!hotel) {
            return res.status(404).json({
                success: false,
                message: "Hotel not found"
            });
        }

        const rooms = await Room.find({
            hotel: hotel._id.toString()
        }).populate("hotel");

        return res.status(200).json({
            success: true,
            message: "Owner's rooms fetched successfully",
            rooms
        });
    } catch (error) {
        console.error("Error fetching owner's rooms:", error);
        return res.status(500).json({
            success: false,
            message: "error in fetching owner's rooms"
        });
    }
}


export const toggleRoomAvailability = async (req, res) => {
    try {
        const {roomId} = req.body;

        const room = await Room.findById(roomId);

        if (!room) {
            return res.status(404).json({
                success: false,
                message: "Room not found"
            });
        }


        room.isAvailable = !room.isAvailable;

        await room.save({
            validateBeforeSave: false
        });


        return res.status(200).json({
            success: true,
            message: "Room availability toggled successfully",
            room
        });
    } catch (error) {
        console.error("Error toggling room availability:", error);
        return res.status(500).json({
            success: false,
            message: "error in toggling room availability"
        });
    }
}