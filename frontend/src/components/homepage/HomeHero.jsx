import React from "react";
import { motion } from "motion/react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
const HomeHero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-100">
      {/* background glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-200/40 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-20 md:py-28 text-center">
        {/* heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight"
        >
          Find Your Perfect Stay <br />
          <span className="text-gray-400">Anytime, Anywhere</span>
        </motion.h1>

        {/* subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-gray-600 max-w-xl mx-auto text-sm md:text-base"
        >
          Discover premium listings, book instantly, and experience comfort like
          never before.
        </motion.p>

        {/* search box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex items-center gap-2 bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-lg px-4 py-3 max-w-xl mx-auto"
        >
          <Search className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search by location, city, or property..."
            className="w-full bg-transparent outline-none text-sm"
          />
          <button className="cursor-pointer bg-black text-white px-4 py-2 rounded-xl text-sm hover:bg-gray-800 transition">
            Search
          </button>
        </motion.div>

        {/* buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 flex flex-col sm:flex-row justify-center gap-3"
        >
          <button
            className="cursor-pointer bg-black text-white px-6 py-3 rounded-xl text-sm hover:bg-gray-800 transition shadow-md"
            onClick={() => navigate("/all-listings")}
          >
            Explore Listings
          </button>

          <button
            className="cursor-pointer bg-white border border-gray-200 px-6 py-3 rounded-xl text-sm hover:bg-gray-100 transition"
            onClick={() => navigate("/my-listings")}
          >
            Llist Your Home
          </button>
        </motion.div>

        {/* stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 grid grid-cols-3 gap-6 max-w-md mx-auto text-center"
        >
          <div>
            <h3 className="font-semibold text-lg">10K+</h3>
            <p className="text-xs text-gray-500">Listings</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">5K+</h3>
            <p className="text-xs text-gray-500">Users</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">99%</h3>
            <p className="text-xs text-gray-500">Satisfaction</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeHero;
