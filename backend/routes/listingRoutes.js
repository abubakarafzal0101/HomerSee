import express from "express";
import {
  addListing,
  deleteListing,
  getAllListings,
  getSingleListing,
  getUserListings,
  updateListing,
} from "../controllers/listingControllers.js";
import isAuth from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";
const listingRouter = express.Router();

listingRouter.post("/add", isAuth, upload.single("image"), addListing);
listingRouter.put("/update/:id", isAuth, upload.single("image"), updateListing);
listingRouter.delete("/delete/:id", isAuth, deleteListing);
listingRouter.get("/get-user-listings", isAuth, getUserListings);
/// free routes
listingRouter.get("/get-all", getAllListings);
listingRouter.get("/get-single/:id", getSingleListing);

export default listingRouter;
