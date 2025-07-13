import express from 'express';
import upload from '../middlewares/multer.middleware.js';
import {authMiddleware} from "../middlewares/auth.middleware.js"
import { createRoom, getOwnerRooms, getRooms, toggleRoomAvailability } from '../controllers/room.controller';
const roomRouter = express.Router();

roomRouter.post("/",upload.array("images",4),authMiddleware,createRoom)

roomRouter.get("/",getRooms)

roomRouter.get("/owner",authMiddleware,getOwnerRooms)

roomRouter.get("/toogle-avalibility",authMiddleware,toggleRoomAvailability)

export default roomRouter;