import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { getUserData } from '../controllers/user.controller.js';

const router = express.Router();


router.get("/",authMiddleware,getUserData)