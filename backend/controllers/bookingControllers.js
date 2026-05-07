import BookingModel from "../models/bookingModel.js";
import UserModel from "../models/userModel.js";
import ListingModel from "../models/listingModel.js";

export const addBooking = async (req, res) => {
  try {
    let { startDate, endDate, totalPrice } = req.body;

    const userId = req.userId;
    const listingId = req.params.id;

    // ================= VALIDATION =================

    if (!startDate || !endDate || !totalPrice) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    totalPrice = Number(totalPrice);

    // price validation
    if (isNaN(totalPrice)) {
      return res.status(400).json({
        success: false,
        message: "Invalid price",
      });
    }

    // convert dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();

    // remove time from today
    today.setHours(0, 0, 0, 0);

    // start > end
    if (start > end) {
      return res.status(400).json({
        success: false,
        message: "Start date cannot be greater than end date",
      });
    }

    // same dates
    if (start.getTime() === end.getTime()) {
      return res.status(400).json({
        success: false,
        message: "Start date and end date cannot be same",
      });
    }

    // past dates
    if (start < today) {
      return res.status(400).json({
        success: false,
        message: "Start date cannot be in the past",
      });
    }

    if (end < today) {
      return res.status(400).json({
        success: false,
        message: "End date cannot be in the past",
      });
    }

    // ================= USER CHECK =================

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ================= LISTING CHECK =================

    const listing = await ListingModel.findById(listingId);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    // ================= AVAILABILITY CHECK =================

    const existingBooking = await BookingModel.findOne({
      listing: listingId,

      $or: [
        {
          startDate: { $lte: end },
          endDate: { $gte: start },
        },
      ],
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: "Listing is already booked for selected dates",
      });
    }

    // ================= CREATE BOOKING =================

    const booking = await BookingModel.create({
      user: userId,
      listing: listingId,
      startDate: start,
      endDate: end,
      totalPrice,
    });

    return res.status(201).json({
      success: true,
      message: "Booking added successfully",
      booking,
    });
  } catch (error) {
    console.log("Error in adding booking", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const userId = req.userId;

    const bookings = await BookingModel.find({
      user: userId,
    }).populate("listing");

    return res.status(200).json({
      success: true,
      message: "Bookings fetched successfully",
      bookings,
    });
  } catch (error) {
    console.log("Error in getting user bookings", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
