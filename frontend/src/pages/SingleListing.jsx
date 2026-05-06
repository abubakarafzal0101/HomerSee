import React, { useContext, useEffect, useState } from "react";
import { ListingContext } from "../contexts/ListingContextProvider";
import { useParams } from "react-router-dom";
import {
  HiOutlineLocationMarker,
  HiOutlineCurrencyDollar,
  HiOutlinePhone,
} from "react-icons/hi";
import { motion } from "framer-motion";

/* ─── skeleton loader ───────────────────────── */
const Skeleton = () => (
  <div className="max-w-5xl mx-auto px-6 py-10 animate-pulse">
    <div className="h-80 bg-gray-200 rounded-2xl mb-6" />
    <div className="space-y-3">
      <div className="h-6 bg-gray-200 rounded w-1/2" />
      <div className="h-4 bg-gray-100 rounded w-full" />
      <div className="h-4 bg-gray-100 rounded w-5/6" />
      <div className="h-4 bg-gray-100 rounded w-3/4" />
    </div>
  </div>
);

/* ─── main component ───────────────────────── */
const SingleListing = () => {
  const { getSingleListing } = useContext(ListingContext);
  const { id } = useParams();

  const [listingData, setListingData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true);
      try {
        const data = await getSingleListing(id);
        setListingData(data);
      } catch (error) {
        console.error("Error fetching single listing:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id, getSingleListing]);

  /* ─── loading state ───────────────────────── */
  if (loading) return <Skeleton />;

  /* ─── no data state ───────────────────────── */
  if (!listingData) {
    return (
      <div className="text-center py-20 text-gray-400">Listing not found</div>
    );
  }

  /* ─── UI ───────────────────────── */
  return (
    <div className="bg-[#f8f8f6] min-h-screen py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* image */}
          <div className="h-80 w-full rounded-2xl overflow-hidden shadow-sm">
            <img
              src={listingData.image}
              alt={listingData.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* content */}
          <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900">
              {listingData.title}
            </h1>

            <p className="text-gray-400 mt-2 leading-relaxed">
              {listingData.description}
            </p>

            {/* info row */}
            <div className="flex flex-wrap gap-6 mt-6">
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <HiOutlineLocationMarker size={18} />
                {listingData.location}
              </div>

              <div className="flex items-center gap-2 text-gray-900 font-semibold">
                <HiOutlineCurrencyDollar size={18} />
                {listingData.price}
              </div>

              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <HiOutlinePhone size={18} />
                {listingData.contact}
              </div>
            </div>

            {/* category badge */}
            <div className="mt-6">
              <span className="inline-block bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full capitalize">
                {listingData.category}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SingleListing;
