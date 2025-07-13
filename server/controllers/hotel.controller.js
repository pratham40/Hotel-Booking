import Hotel from "../models/hotel.model.js";
import User from "../models/user.model.js";

export const registerHotel = async (req, res) => {
    try {
        const {name,address,contact,city} = req.body;

        const owner = req.user._id;

        const hotel = await Hotel.findOne({owner})

        if (hotel) {
            return res.status(400).json({
                success: false,
                message: "You have already registered a hotel"
            });
        }

        const newHotel = await Hotel.create({
            name,
            address,
            contact,
            owner,
            city
        });

        await User.findByIdAndUpdate(owner,{
            $set:{
                role:"admin"
            }
        },{
            new: true,
            
        }
        )

        return res.status(201).json({
            success: true,
            message: "Hotel registered successfully",
            hotel: newHotel
        });

    } catch (error) {
        console.error("Error registering hotel:", error);
        res.status(500).json({
            success: false,
            message: "error in registering hotel"
        });
    }
}