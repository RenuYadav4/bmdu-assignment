import express from "express";
import dotenv from "dotenv";
import {  registerUser, loginUser } from "../controllers/userController.js";

dotenv.config();
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);



export default router;

