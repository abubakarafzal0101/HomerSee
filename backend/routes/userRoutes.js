import express from "express";
import {
  getCurrentUser,
  updatePassword,
  updateUser,
} from "../controllers/userControllers.js";
import isAuth from "../middlewares/isAuth.js";
const userRouter = express.Router();

// protected routes
userRouter.get("/me", isAuth, getCurrentUser);
userRouter.put("/update-profile", isAuth, updateUser);
userRouter.put("/update-password", isAuth, updatePassword);

export default userRouter;
