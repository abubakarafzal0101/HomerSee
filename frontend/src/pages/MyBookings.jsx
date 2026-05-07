import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BookingContext } from "../contexts/BookingContextProvider";
import { motion, AnimatePresence } from "motion/react";
import {
  HiOutlineCalendar,
  HiOutlineLocationMarker,
  HiOutlineCurrencyDollar,
  HiOutlineClock,
  HiOutlineHome,
  HiOutlineInbox,
} from "react-icons/hi";

const SkeletonCard = () => (
  <div className="bg-white rounded-3xl overflow-hidden shadow-sm animate-pulse">
    <div className="h-52 bg-gray-200" />

    <div className="p-5 space-y-3">
      <div className="h-5 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-100 rounded w-full" />
      <div className="h-4 bg-gray-100 rounded w-5/6" />

      <div className="flex justify-between pt-3">
        <div className="h-8 bg-gray-200 rounded-xl w-24" />
        <div className="h-8 bg-gray-200 rounded-xl w-20" />
      </div>
    </div>
  </div>
);

const MyBookings = () => {
  const { bookings, loading } = useContext(BookingContext);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const calculateDays = (start, end) => {
    const oneDay = 1000 * 60 * 60 * 24;

    const startDate = new Date(start);
    const endDate = new Date(end);

    return Math.ceil((endDate - startDate) / oneDay);
  };

  return (
    <>
      <Navbar />

      <div
        className="min-h-screen bg-[#f8f8f6]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* hero */}
        <div className="bg-white border-b border-gray-100 px-6 py-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-semibold mb-1">
                Dashboard
              </p>

              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                My Bookings
              </h1>

              <p className="text-sm text-gray-400 mt-1">
                {bookings?.length || 0} booking
                {bookings?.length !== 1 ? "s" : ""} found
              </p>
            </motion.div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* loading */}
          {loading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <>
              {/* bookings grid */}
              <motion.div layout className="grid md:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {bookings?.map((booking, i) => {
                    const listing = booking.listing;

                    return (
                      <motion.div
                        key={booking._id}
                        layout
                        initial={{ opacity: 0, y: 20, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.92 }}
                        transition={{ duration: 0.3, delay: i * 0.04 }}
                        className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
                      >
                        {/* image */}
                        <div className="relative h-56 overflow-hidden">
                          <img
                            src={listing?.image}
                            alt={listing?.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />

                          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
                            <HiOutlineClock size={14} />
                            {calculateDays(
                              booking.startDate,
                              booking.endDate,
                            )}{" "}
                            days
                          </div>
                        </div>

                        {/* content */}
                        <div className="p-5">
                          {/* title */}
                          <div className="flex items-start justify-between gap-3">
                            <h2 className="text-lg font-bold text-gray-900 line-clamp-1">
                              {listing?.title}
                            </h2>

                            <div className="flex items-center gap-1 text-sm font-bold text-emerald-600 whitespace-nowrap">
                              <HiOutlineCurrencyDollar size={16} />
                              {booking.totalPrice}
                            </div>
                          </div>

                          {/* desc */}
                          <p className="text-sm text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                            {listing?.description}
                          </p>

                          {/* location */}
                          <div className="flex items-center gap-1 text-sm text-gray-500 mt-4">
                            <HiOutlineLocationMarker
                              className="text-gray-400"
                              size={15}
                            />

                            <span className="line-clamp-1">
                              {listing?.location}
                            </span>
                          </div>

                          {/* dates */}
                          <div className="mt-5 bg-gray-50 rounded-2xl p-4">
                            <div className="flex items-center gap-2 mb-3">
                              <HiOutlineCalendar
                                className="text-gray-400"
                                size={16}
                              />

                              <p className="text-sm font-semibold text-gray-700">
                                Booking Dates
                              </p>
                            </div>

                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-xs text-gray-400 mb-1">
                                  Check In
                                </p>

                                <p className="text-sm font-semibold text-gray-800">
                                  {formatDate(booking.startDate)}
                                </p>
                              </div>

                              <div className="h-px flex-1 bg-gray-200 mx-4" />

                              <div className="text-right">
                                <p className="text-xs text-gray-400 mb-1">
                                  Check Out
                                </p>

                                <p className="text-sm font-semibold text-gray-800">
                                  {formatDate(booking.endDate)}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* footer */}
                          <div className="flex items-center justify-between mt-5">
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                              <HiOutlineHome size={14} />
                              Reserved Property
                            </div>

                            <div className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold">
                              Confirmed
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>

              {/* empty state */}
              <AnimatePresence>
                {bookings?.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-28 text-center"
                  >
                    <div className="w-20 h-20 rounded-3xl bg-gray-100 flex items-center justify-center mb-5">
                      <HiOutlineInbox size={34} className="text-gray-300" />
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900">
                      No bookings yet
                    </h2>

                    <p className="text-gray-400 text-sm mt-2 max-w-sm leading-relaxed">
                      You haven’t booked any properties yet. Start exploring
                      listings and reserve your perfect stay.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MyBookings;
