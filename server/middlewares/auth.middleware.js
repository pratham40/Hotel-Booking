import User from "../models/user.model.js";


export const authMiddleware = async (req,res,next) => {
    const userId = req.auth;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId);

    req.user = user;

    next();

}