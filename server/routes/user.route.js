import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { getUserData, recentSerachCities } from '../controllers/user.controller.js';

const userRouter = express.Router();


userRouter.get("/",authMiddleware,getUserData)

userRouter.post("/store-recent-search",authMiddleware,recentSerachCities)


export default userRouter;