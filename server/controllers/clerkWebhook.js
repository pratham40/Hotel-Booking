import express from "express";
import User from "../models/user.model.js";
import { Webhook } from "svix";

const router = express.Router();

router.post("/webhook",async (req,res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        const header = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        }

        await whook.verify(
            JSON.stringify(req.body),
            header
        )

        const {data,type}=req.body;

        const userData =  {
            _id: data.id,
            email: data.email_addresses[0].email_address,
            username: data.first_name + " " + data.last_name,
            image: data.image_url,
        }


        switch(key){
            case "user.created":{
                await User.create(userData);
                break;
            }
            case "user.updated":{
                await User.findByIdAndUpdate(
                    { _id: userData._id },
                    userData,
                    { new: true}
                );
                break;
            }
            case "user.deleted":{
                await User.findByIdAndDelete(userData._id);
                break;
            }
            default: {
                console.log("Unhandled event type:", type);
                break;
            }
        }

        res.status(200).json({ message: "Webhook processed successfully" });    
        
    } catch (error) {
        console.error("Error processing Clerk webhook:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

export default router;