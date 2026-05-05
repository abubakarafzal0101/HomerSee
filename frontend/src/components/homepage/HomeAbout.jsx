import React from "react";
import { motion } from "motion/react";
import { ShieldCheck, Star, Clock, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: ShieldCheck,
    title: "Secure Booking",
    desc: "Your payments and data are fully protected with industry-grade security.",
  },
  {
    icon: Star,
    title: "Top Rated Listings",
    desc: "Explore hand-picked properties with the best reviews and experiences.",
  },
  {
    icon: Clock,
    title: "Instant Booking",
    desc: "Book your stay in seconds with our fast and seamless system.",
  },
  {
    icon: Globe,
    title: "Global Access",
    desc: "Find stays across cities and countries without any hassle.",
  },
];

const HomeAbout = () => {
    const navigate = useNavigate()
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Why Choose <span className="text-gray-400">HomerSee</span>?
          </h2>

          <p className="mt-4 text-gray-600 text-sm md:text-base max-w-md">
            We make finding and booking your perfect stay simple, fast, and
            reliable. Whether you're traveling for business or leisure, we’ve
            got you covered.
          </p>

          <button className="cursor-pointer mt-6 bg-black text-white px-6 py-3 rounded-xl text-sm hover:bg-gray-800 transition shadow-md" onClick={()=>navigate('/all-listings')}>
            Explore Listings
          </button>
        </motion.div>

        {/* RIGHT FEATURES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-5 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition"
            >
              <item.icon className="w-6 h-6 mb-3 text-black" />

              <h3 className="font-semibold text-sm mb-1">{item.title}</h3>

              <p className="text-xs text-gray-500">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;
