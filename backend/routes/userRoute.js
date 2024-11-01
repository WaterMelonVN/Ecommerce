import express from "express";
import {
    loginUser,
    registerUser,
    adminLogin,
    updateUserProfile,
    getMyProfile,
} from "../controllers/userController.js";
import authUser from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);
userRouter.put(
    "/update-profile",
    authUser,
    upload.single("avatar"),
    updateUserProfile
);
userRouter.get("/my-profile", authUser, getMyProfile); // Added MyProfile route

export default userRouter;
