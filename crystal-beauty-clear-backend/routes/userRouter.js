import express from "express";
import { getCurrentUser, googleLogin, loginUser, saveUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/",saveUser)
userRouter.post("/login",loginUser)
userRouter.post("/googleLogin",googleLogin)
userRouter.get("/getuser",getCurrentUser)

export default userRouter; 