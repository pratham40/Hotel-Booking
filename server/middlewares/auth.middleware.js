import User from "../models/user.model.js";


export const authMiddleware = async (req,res,next) => {

    console.log(req.auth.userId);
    const userId = req.auth.userId;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId);

    req.user = user;

    next();

}