import ListingModel from "../models/listingModel.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
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

    const uploadFromBuffer = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "listings" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

    const result = await uploadFromBuffer();

    const newListing = new ListingModel({
      user: userId,
      title,
      description,
      price,
      image: result.secure_url,
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

    const listing = await ListingModel.findById(listingId);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    // 🟢 KEEP OLD IMAGE BY DEFAULT
    let image = listing.image;

    // 🔥 ONLY UPLOAD IF NEW FILE EXISTS
    if (req.file) {
      const uploadFromBuffer = () =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "listings" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            },
          );

          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });

      const result = await uploadFromBuffer();
      image = result.secure_url;
    }

    // UPDATE FIELDS
    listing.title = title;
    listing.description = description;
    listing.price = price;
    listing.location = location;
    listing.contact = contact;
    listing.category = category;
    listing.image = image; // 👈 always safe now

    await listing.save();

    return res.status(200).json({
      success: true,
      message: "Listing updated successfully",
      listing,
    });
  } catch (error) {
    console.error(error);
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
