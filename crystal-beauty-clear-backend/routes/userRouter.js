import express from "express";
import { getCurrentUser, googleLogin, loginUser, resetPassword, saveUser, sendOTP } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/",saveUser)
userRouter.post("/login",loginUser)
userRouter.post("/googleLogin",googleLogin)
userRouter.get("/getuser",getCurrentUser)
userRouter.post("/sendMail",sendOTP)
userRouter.post("/resetPassword",resetPassword)

export default userRouter; 