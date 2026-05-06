import ListingModel from "../models/listingModel.js";
import UserModel from "../models/userModel.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
export const addListing = async (req, res) => {
  try {
    const { title, description, price, location, contact, category } = req.body;
    const userId = req.userId;

    if (
      !title ||
      !description ||
      !price ||
      !location ||
      !contact ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    let image;
    let imagePath = req.file.path;

    // Upload to Cloudinary
    try {
      const uploadResult = await cloudinary.uploader.upload(imagePath, {
        folder: "listings",
      });
      image = uploadResult.secure_url;
    } catch (uploadError) {
      console.error("Cloudinary upload error:", uploadError);

      // delete local file if upload fails
      if (imagePath) {
        try {
          fs.unlinkSync(imagePath);
        } catch (err) {
          console.error("File delete error:", err);
        }
      }

      return res.status(500).json({
        success: false,
        message: "Image upload failed",
      });
    }

    // 🧹 Delete local file after upload
    if (imagePath) {
      try {
        fs.unlinkSync(imagePath);
      } catch (err) {
        console.error("File delete error:", err);
      }
    }

    // 🟢 Save to DB
    const newListing = new ListingModel({
      user: userId,
      title,
      description,
      price,
      image,
      location,
      contact,
      category,
    });

    await newListing.save();

    return res.status(201).json({
      success: true,
      message: "Listing added successfully",
      listing: newListing,
    });
  } catch (error) {
    console.error("Error adding listing:", error);

    // 🧹 Safety cleanup
    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (err) {
        console.error("Cleanup delete error:", err);
      }
    }

    return res.status(500).json({
      success: false,
      message: "Server error while adding listing",
    });
  }
};
export const updateListing = async (req, res) => {
  try {
    const { title, description, price, location, contact, category } = req.body;
    const listingId = req.params.id;

    // 🔴 Validation
    if (
      !title ||
      !description ||
      !price ||
      !location ||
      !contact ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const listing = await ListingModel.findById(listingId);
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    let image = listing.image;

    // 🟡 If new image uploaded
    if (req.file) {
      const imagePath = req.file.path;

      try {
        const uploadResult = await cloudinary.uploader.upload(imagePath, {
          folder: "listings",
        });

        image = uploadResult.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);

        // delete local file if upload fails
        if (imagePath) {
          try {
            fs.unlinkSync(imagePath);
          } catch (err) {
            console.error("File delete error:", err);
          }
        }

        return res.status(500).json({
          success: false,
          message: "Image upload failed",
        });
      }

      // 🧹 delete local file after upload
      if (imagePath) {
        try {
          fs.unlinkSync(imagePath);
        } catch (err) {
          console.error("File delete error:", err);
        }
      }
    }

    // 🟢 Update fields
    listing.title = title;
    listing.description = description;
    listing.price = price;
    listing.image = image;
    listing.location = location;
    listing.contact = contact;
    listing.category = category;

    await listing.save();

    return res.status(200).json({
      success: true,
      message: "Listing updated successfully",
      listing,
    });
  } catch (error) {
    console.error("Error updating listing:", error);

    // 🧹 Safety cleanup
    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (err) {
        console.error("Cleanup delete error:", err);
      }
    }

    return res.status(500).json({
      success: false,
      message: "Server error while updating listing",
    });
  }
};

export const deleteListing = async (req, res) => {
  try {
    const listingId = req.params.id;
    await ListingModel.findByIdAndDelete(listingId);
    return res
      .status(200)
      .json({ success: true, message: "Listing deleted successfully" });
  } catch (error) {
    console.error("Error deleting listing:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error while deleting listing" });
  }
};

export const getAllListings = async (req, res) => {
  try {
    const listings = await ListingModel.find().populate("user", "name email");
    return res.status(200).json({ success: true, listings });
  } catch (error) {
    console.error("Error getting all listings:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error while getting listings" });
  }
};

export const getSingleListing = async (req, res) => {
  try {
    const listingId = req.params.id;
    const listing = await ListingModel.findById(listingId).populate(
      "user",
      "name email",
    );
    if (!listing) {
      return res
        .status(404)
        .json({ success: false, message: "Listing not found" });
    }
    return res.status(200).json({ success: true, listing });
  } catch (error) {
    console.error("Error getting single listing:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error while getting listing" });
  }
};
