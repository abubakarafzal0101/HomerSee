import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },

    isBooked: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const ListingModel =
  mongoose.models.Listing || mongoose.model("Listing", listingSchema);

export default ListingModel;
