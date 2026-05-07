import express from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  addBooking,
  getUserBookings,
} from "../controllers/bookingControllers.js";
const bookingRouter = express.Router();

bookingRouter.post("/add/:id", isAuth, addBooking);
bookingRouter.get("/get-user-bookings", isAuth, getUserBookings);

export default bookingRouter;
