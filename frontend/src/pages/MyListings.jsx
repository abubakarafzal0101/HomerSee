import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ListingContext } from "../contexts/ListingContextProvider";
import { motion, AnimatePresence } from "motion/react";
import {
  HiOutlinePlus,
  HiOutlineHome,
  HiOutlineBriefcase,
  HiOutlineSparkles,
  HiOutlineLocationMarker,
  HiOutlineCurrencyDollar,
  HiOutlinePhone,
  HiOutlinePhotograph,
  HiOutlineTag,
  HiOutlineDocumentText,
  HiOutlinePencilAlt,
  HiOutlineTrash,
  HiOutlineX,
  HiOutlineCheck,
  HiOutlineViewGrid,
  HiOutlineFilter,
} from "react-icons/hi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

/* ─── tiny helpers ────────────────────────────────────────────── */
const categoryMeta = {
  all: { icon: HiOutlineViewGrid, label: "All", color: "#6366f1" },
  home: { icon: HiOutlineHome, label: "Home", color: "#0ea5e9" },
  service: { icon: HiOutlineBriefcase, label: "Service", color: "#f59e0b" },
  experience: {
    icon: HiOutlineSparkles,
    label: "Experience",
    color: "#10b981",
  },
};

const Spinner = () => (
  <AiOutlineLoading3Quarters className="animate-spin" size={18} />
);

/* ─── skeleton card ───────────────────────────────────────────── */
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
    <div className="h-44 bg-gray-200" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-100 rounded w-full" />
      <div className="h-3 bg-gray-100 rounded w-5/6" />
      <div className="h-3 bg-gray-100 rounded w-1/2" />
      <div className="flex gap-2 mt-4">
        <div className="h-8 bg-gray-200 rounded-lg w-16" />
        <div className="h-8 bg-gray-200 rounded-lg w-16" />
      </div>
    </div>
  </div>
);

/* ─── main component ──────────────────────────────────────────── */
const MyListings = () => {
  const { userListings, deleteListing, addListing, updateListingHandler } =
    useContext(ListingContext);

  const [filterListing, setFilterListing] = useState("all");
  const [showPopup, setShowPopup] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  // loading states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [pageLoading] = useState(false); // hook up to your real loader if needed

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "home",
    price: "",
    contact: "",
    location: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  /* ── filter ── */
  const filteredListings = userListings.filter((listing) => {
    if (filterListing === "all") return true;
    return listing.category === filterListing;
  });

  /* ── handlers (logic unchanged) ── */
  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const openAdd = () => {
    setIsEdit(false);
    setEditId(null);
    setShowPopup(true);
    setFormData({
      title: "",
      description: "",
      category: "home",
      price: "",
      contact: "",
      location: "",
    });
    setImageFile(null);
    setImagePreview(null);
  };

  const openEdit = (listing) => {
    setIsEdit(true);
    setEditId(listing._id);
    setShowPopup(true);
    setFormData({
      title: listing.title,
      description: listing.description,
      category: listing.category,
      price: listing.price,
      contact: listing.contact,
      location: listing.location,
    });
    setImagePreview(listing.image);
    setImageFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const listingData = new FormData();
    listingData.append("title", formData.title);
    listingData.append("description", formData.description);
    listingData.append("category", formData.category);
    listingData.append("price", formData.price);
    listingData.append("contact", formData.contact);
    listingData.append("location", formData.location);
    if (imageFile) {
      listingData.append("image", imageFile);
    } else if (!isEdit) {
      // new listing requires image — backend will return error naturally
    }

    if (isEdit) {
      await updateListingHandler(editId, listingData);
    } else {
      await addListing(listingData);
    }

    setIsSubmitting(false);
    setShowPopup(false);
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    await deleteListing(id);
    setDeletingId(null);
  };

  /* ── category badge color ── */
  const getCategoryColor = (cat) => categoryMeta[cat]?.color ?? "#6366f1";

  return (
    <>
      <Navbar />

      <div
        className="min-h-screen bg-[#f8f8f6]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* ── hero header ── */}
        <div className="bg-white border-b border-gray-100 px-6 py-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <p className="text-xs font-semibold tracking-[0.18em] text-gray-400 uppercase mb-1">
                Dashboard
              </p>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                My Listings
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                {userListings.length} listing
                {userListings.length !== 1 ? "s" : ""} total
              </p>
            </motion.div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* ── top bar ── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-wrap gap-3 justify-between items-center mb-8"
          >
            {/* filter pills */}
            <div className="flex items-center gap-2 flex-wrap">
              <HiOutlineFilter className="text-gray-400" size={16} />
              {Object.entries(categoryMeta).map(([key, meta]) => {
                const Icon = meta.icon;
                const active = filterListing === key;
                return (
                  <button
                    key={key}
                    onClick={() => setFilterListing(key)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer"
                    style={{
                      background: active ? meta.color : "#fff",
                      color: active ? "#fff" : "#6b7280",
                      border: `1.5px solid ${active ? meta.color : "#e5e7eb"}`,
                      boxShadow: active ? `0 2px 12px ${meta.color}44` : "none",
                    }}
                  >
                    <Icon size={14} />
                    {meta.label}
                  </button>
                );
              })}
            </div>

            {/* add button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={openAdd}
              className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-700 transition-colors cursor-pointer shadow-lg shadow-gray-900/10"
            >
              <HiOutlinePlus size={17} />
              Add Listing
            </motion.button>
          </motion.div>

          {/* ── grid ── */}
          {pageLoading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <motion.div layout className="grid md:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredListings.map((listing, i) => {
                  const catColor = getCategoryColor(listing.category);
                  const isDeleting = deletingId === listing._id;

                  return (
                    <motion.div
                      key={listing._id}
                      layout
                      initial={{ opacity: 0, y: 20, scale: 0.96 }}
                      animate={{
                        opacity: isDeleting ? 0.5 : 1,
                        y: 0,
                        scale: 1,
                      }}
                      exit={{ opacity: 0, scale: 0.92, y: -10 }}
                      transition={{ duration: 0.3, delay: i * 0.04 }}
                      className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
                    >
                      {/* image */}
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={listing.image}
                          alt={listing.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* category badge */}
                        <span
                          className="absolute top-3 left-3 text-white text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm capitalize"
                          style={{ background: `${catColor}cc` }}
                        >
                          {listing.category}
                        </span>
                      </div>

                      {/* body */}
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 text-base leading-snug line-clamp-1">
                          {listing.title}
                        </h3>

                        <p className="text-sm text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                          {listing.description}
                        </p>

                        <div className="flex items-center gap-3 mt-3">
                          <span className="flex items-center gap-1 text-xs text-gray-500">
                            <HiOutlineLocationMarker
                              className="text-gray-400"
                              size={13}
                            />
                            {listing.location}
                          </span>
                          <span
                            className="flex items-center gap-0.5 text-xs font-semibold"
                            style={{ color: catColor }}
                          >
                            <HiOutlineCurrencyDollar size={13} />
                            {listing.price}
                          </span>
                        </div>

                        {/* action buttons */}
                        <div className="flex gap-2 mt-4">
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => openEdit(listing)}
                            disabled={isDeleting}
                            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors cursor-pointer disabled:opacity-40"
                          >
                            <HiOutlinePencilAlt size={14} />
                            Edit
                          </motion.button>

                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDelete(listing._id)}
                            disabled={isDeleting}
                            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors cursor-pointer disabled:opacity-40"
                          >
                            {isDeleting ? (
                              <Spinner />
                            ) : (
                              <HiOutlineTrash size={14} />
                            )}
                            {isDeleting ? "Deleting…" : "Delete"}
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ── empty state ── */}
          <AnimatePresence>
            {!pageLoading && filteredListings.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
                  <HiOutlineViewGrid size={28} className="text-gray-300" />
                </div>
                <p className="text-gray-800 font-semibold text-lg">
                  No listings found
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Try a different filter or add your first listing.
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={openAdd}
                  className="mt-6 flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer"
                >
                  <HiOutlinePlus size={16} />
                  Add Listing
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── modal ── */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* modal header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <div>
                  <h2 className="text-base font-bold text-gray-900">
                    {isEdit ? "Update Listing" : "New Listing"}
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {isEdit
                      ? "Make changes to your listing"
                      : "Fill in the details below"}
                  </p>
                </div>
                <button
                  onClick={() => setShowPopup(false)}
                  className="p-2 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer text-gray-400"
                >
                  <HiOutlineX size={18} />
                </button>
              </div>

              {/* modal body */}
              <div className="px-6 py-5 max-h-[75vh] overflow-y-auto">
                <form onSubmit={handleSubmit} className="space-y-3">
                  {/* title */}
                  <div className="relative">
                    <HiOutlineTag
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300"
                      size={16}
                    />
                    <input
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Title"
                      required
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 ring-gray-200 transition placeholder:text-gray-300"
                    />
                  </div>

                  {/* description */}
                  <div className="relative">
                    <HiOutlineDocumentText
                      className="absolute left-3.5 top-3.5 text-gray-300"
                      size={16}
                    />
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Description"
                      rows={3}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 ring-gray-200 transition placeholder:text-gray-300 resize-none"
                    />
                  </div>

                  {/* category */}
                  <div className="relative">
                    <HiOutlineViewGrid
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none"
                      size={16}
                    />
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 ring-gray-200 transition appearance-none cursor-pointer"
                    >
                      <option value="home">Home</option>
                      <option value="service">Service</option>
                      <option value="experience">Experience</option>
                    </select>
                  </div>

                  {/* price + contact row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <HiOutlineCurrencyDollar
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300"
                        size={16}
                      />
                      <input
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="Price"
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 ring-gray-200 transition placeholder:text-gray-300"
                      />
                    </div>
                    <div className="relative">
                      <HiOutlinePhone
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300"
                        size={16}
                      />
                      <input
                        name="contact"
                        value={formData.contact}
                        onChange={handleInputChange}
                        placeholder="Contact"
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 ring-gray-200 transition placeholder:text-gray-300"
                      />
                    </div>
                  </div>

                  {/* location */}
                  <div className="relative">
                    <HiOutlineLocationMarker
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300"
                      size={16}
                    />
                    <input
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Location"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 ring-gray-200 transition placeholder:text-gray-300"
                    />
                  </div>

                  {/* image upload */}
                  <label className="flex items-center gap-2.5 cursor-pointer bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl px-4 py-3 hover:border-gray-300 transition group">
                    <HiOutlinePhotograph
                      className="text-gray-300 group-hover:text-gray-400 transition"
                      size={20}
                    />
                    <span className="text-sm text-gray-400">
                      {imageFile ? imageFile.name : "Upload image"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>

                  {imagePreview && (
                    <motion.img
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      src={imagePreview}
                      alt="preview"
                      className="h-36 w-full object-cover rounded-xl"
                    />
                  )}

                  {/* submit */}
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-xl text-sm font-semibold hover:bg-gray-700 transition-colors cursor-pointer disabled:opacity-60 mt-1"
                  >
                    {isSubmitting ? (
                      <>
                        <Spinner />
                        {isEdit ? "Updating…" : "Adding…"}
                      </>
                    ) : (
                      <>
                        <HiOutlineCheck size={16} />
                        {isEdit ? "Update Listing" : "Add Listing"}
                      </>
                    )}
                  </motion.button>

                  <button
                    type="button"
                    onClick={() => setShowPopup(false)}
                    className="w-full text-gray-400 text-sm py-2 hover:text-gray-600 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
};

export default MyListings;
