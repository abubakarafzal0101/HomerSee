import React, { useContext, useState } from "react";
import { ListingContext } from "../contexts/ListingContextProvider";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineHome,
  HiOutlineBriefcase,
  HiOutlineSparkles,
  HiOutlineViewGrid,
  HiOutlineLocationMarker,
  HiOutlineCurrencyDollar,
} from "react-icons/hi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* ─── category meta ───────────────────────── */
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

/* ─── skeleton ───────────────────────── */
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl shadow-sm animate-pulse">
    <div className="h-44 bg-gray-200 rounded-t-2xl" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-100 rounded w-full" />
      <div className="h-3 bg-gray-100 rounded w-5/6" />
    </div>
  </div>
);

/* ─── main component ───────────────────────── */
const AllListings = () => {
  const { listings } = useContext(ListingContext);

  const [filter, setFilter] = useState("all");
  const [loading] = useState(false); // connect to real loader if needed

  /* ── filter logic ── */
  const filteredListings = listings.filter((item) => {
    if (filter === "all") return true;
    return item.category === filter;
  });

  return (
    <>
      <Navbar />
      <div className="bg-[#f8f8f6] min-h-screen px-6 py-10">
        <div className="max-w-6xl mx-auto">
          {/* ── header ── */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">All Listings</h1>
            <p className="text-sm text-gray-400 mt-1">
              {filteredListings.length} result
              {filteredListings.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* ── filters ── */}
          <div className="flex flex-wrap gap-2 mb-8">
            {Object.entries(categoryMeta).map(([key, meta]) => {
              const Icon = meta.icon;
              const active = filter === key;

              return (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition"
                  style={{
                    background: active ? meta.color : "#fff",
                    color: active ? "#fff" : "#6b7280",
                    border: `1.5px solid ${active ? meta.color : "#e5e7eb"}`,
                  }}
                >
                  <Icon size={14} />
                  {meta.label}
                </button>
              );
            })}
          </div>

          {/* ── grid ── */}
          {loading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <motion.div layout className="grid md:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredListings.map((listing, i) => (
                  <motion.div
                    key={listing._id}
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: i * 0.03 }}
                  >
                    <Link
                      to={`/listing/${listing._id}`}
                      className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition group"
                    >
                      {/* image */}
                      <div className="h-44 overflow-hidden">
                        <img
                          src={listing.image}
                          alt={listing.title}
                          className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
                        />
                      </div>

                      {/* content */}
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 line-clamp-1">
                          {listing.title}
                        </h3>

                        <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                          {listing.description}
                        </p>

                        <div className="flex justify-between items-center mt-3">
                          <span className="flex items-center gap-1 text-xs text-gray-500">
                            <HiOutlineLocationMarker size={13} />
                            {listing.location}
                          </span>

                          <span className="flex items-center gap-0.5 text-sm font-bold text-gray-900">
                            <HiOutlineCurrencyDollar size={14} />
                            {listing.price}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ── empty state ── */}
          {!loading && filteredListings.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg font-semibold">
                No listings found
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Try changing the filter
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllListings;
