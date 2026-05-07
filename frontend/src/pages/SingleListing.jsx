import React, { useContext, useEffect, useState } from "react";
import { ListingContext } from "../contexts/ListingContextProvider";
import { BookingContext } from "../contexts/BookingContextProvider";
import { useParams } from "react-router-dom";

import {
  HiOutlineLocationMarker,
  HiOutlineCurrencyDollar,
  HiOutlinePhone,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineCheckCircle,
} from "react-icons/hi";

import { motion } from "framer-motion";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

/* ───────────────── spinner ───────────────── */

const Spinner = () => (
  <AiOutlineLoading3Quarters className="animate-spin" size={18} />
);

/* ───────────────── skeleton ───────────────── */

const Skeleton = () => (
  <div className="max-w-6xl mx-auto px-6 py-10 animate-pulse">
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="h-[420px] rounded-3xl bg-gray-200" />

      <div className="space-y-4">
        <div className="h-8 rounded bg-gray-200 w-2/3" />
        <div className="h-4 rounded bg-gray-100 w-full" />
        <div className="h-4 rounded bg-gray-100 w-5/6" />
        <div className="h-4 rounded bg-gray-100 w-3/4" />
        <div className="h-40 rounded-3xl bg-gray-100 mt-8" />
      </div>
    </div>
  </div>
);

/* ───────────────── component ───────────────── */

const SingleListing = () => {
  const { getSingleListing } = useContext(ListingContext);

  const { addBooking } = useContext(BookingContext);

  const { id } = useParams();

  const [listingData, setListingData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [bookingLoading, setBookingLoading] = useState(false);

  const [bookingData, setBookingData] = useState({
    startDate: "",
    endDate: "",
  });

  /* ───────────────── fetch listing ───────────────── */

  useEffect(() => {
    const fetchSingleListing = async () => {
      setLoading(true);

      try {
        const data = await getSingleListing(id);

        setListingData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSingleListing();
  }, [id, getSingleListing]);

  /* ───────────────── handlers ───────────────── */

  const handleInputChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    });
  };

  /* ───────────────── calculate days ───────────────── */

  const calculateDays = () => {
    if (!bookingData.startDate || !bookingData.endDate) return 0;

    const start = new Date(bookingData.startDate);

    const end = new Date(bookingData.endDate);

    const diff = end - start;

    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const totalDays = calculateDays();

  const totalPrice = totalDays > 0 ? totalDays * Number(listingData?.price) : 0;

  /* ───────────────── booking submit ───────────────── */

  const handleBooking = async (e) => {
    e.preventDefault();

    if (totalDays <= 0) return;

    setBookingLoading(true);

    try {
      await addBooking(id, {
        startDate: bookingData.startDate,
        endDate: bookingData.endDate,
        totalPrice,
      });

      setBookingData({
        startDate: "",
        endDate: "",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setBookingLoading(false);
    }
  };

  /* ───────────────── loading ───────────────── */

  if (loading) return <Skeleton />;

  /* ───────────────── no listing ───────────────── */

  if (!listingData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 text-lg">
        Listing not found
      </div>
    );
  }

  /* ───────────────── ui ───────────────── */

  return (
    <div
      className="min-h-screen bg-[#f8f8f6] py-10 px-6"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid lg:grid-cols-2 gap-8"
        >
          {/* ───────────── left ───────────── */}

          <div>
            {/* image */}

            <div className="h-[430px] rounded-3xl overflow-hidden shadow-sm">
              <img
                src={listingData.image}
                alt={listingData.title}
                className="h-full w-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* content */}

            <div className="bg-white rounded-3xl p-7 shadow-sm mt-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                    {listingData.title}
                  </h1>

                  <div className="flex items-center gap-2 text-gray-500 mt-3">
                    <HiOutlineLocationMarker size={18} />

                    <span>{listingData.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-2xl font-bold text-emerald-600">
                  <HiOutlineCurrencyDollar size={24} />

                  {listingData.price}
                </div>
              </div>

              {/* desc */}

              <p className="text-gray-500 leading-relaxed mt-6">
                {listingData.description}
              </p>

              {/* info */}

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-gray-50 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <HiOutlinePhone size={18} />

                    <p className="text-sm">Contact</p>
                  </div>

                  <p className="font-semibold text-gray-800">
                    {listingData.contact}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <HiOutlineCheckCircle size={18} />

                    <p className="text-sm">Category</p>
                  </div>

                  <p className="font-semibold text-gray-800 capitalize">
                    {listingData.category}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ───────────── booking card ───────────── */}

          <div>
            <div className="bg-white rounded-3xl p-7 shadow-sm sticky top-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 font-medium">
                    Reserve this place
                  </p>

                  <h2 className="text-2xl font-bold text-gray-900 mt-1">
                    Booking Details
                  </h2>
                </div>

                <div className="bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full text-sm font-semibold">
                  Available
                </div>
              </div>

              {/* form */}

              <form onSubmit={handleBooking} className="mt-8 space-y-5">
                {/* start date */}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Check In
                  </label>

                  <div className="relative">
                    <HiOutlineCalendar
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                      size={18}
                    />

                    <input
                      type="date"
                      name="startDate"
                      value={bookingData.startDate}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-4 py-3 outline-none focus:ring-2 ring-gray-200 transition text-sm"
                    />
                  </div>
                </div>

                {/* end date */}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Check Out
                  </label>

                  <div className="relative">
                    <HiOutlineCalendar
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                      size={18}
                    />

                    <input
                      type="date"
                      name="endDate"
                      value={bookingData.endDate}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-4 py-3 outline-none focus:ring-2 ring-gray-200 transition text-sm"
                    />
                  </div>
                </div>

                {/* summary */}

                <div className="bg-gray-50 rounded-2xl p-5">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-500">
                      <HiOutlineClock size={16} />
                      Total Days
                    </div>

                    <p className="font-semibold text-gray-900">
                      {totalDays > 0 ? totalDays : 0}
                    </p>
                  </div>

                  <div className="h-px bg-gray-200 my-4" />

                  <div className="flex items-center justify-between">
                    <p className="text-gray-500 text-sm">Total Price</p>

                    <div className="flex items-center gap-1 text-2xl font-bold text-emerald-600">
                      <HiOutlineCurrencyDollar size={22} />

                      {totalPrice}
                    </div>
                  </div>
                </div>

                {/* button */}

                <motion.button
                  whileHover={{
                    scale: bookingLoading ? 1 : 1.02,
                  }}
                  whileTap={{
                    scale: bookingLoading ? 1 : 0.98,
                  }}
                  disabled={bookingLoading || totalDays <= 0}
                  type="submit"
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3.5 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                >
                  {bookingLoading ? (
                    <>
                      <Spinner />
                      Booking...
                    </>
                  ) : (
                    <>
                      <HiOutlineCheckCircle size={18} />
                      Confirm Booking
                    </>
                  )}
                </motion.button>
              </form>

              {/* note */}

              <p className="text-xs text-gray-400 text-center mt-5 leading-relaxed">
                By confirming this booking you agree to our booking and refund
                policy.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SingleListing;
