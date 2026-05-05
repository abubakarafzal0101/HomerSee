import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "motion/react";

const Contact = () => {
  return (
    <>
      <Navbar />

      <div className="bg-white py-20 px-4">
        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-semibold">
            Contact <span className="text-gray-400">Us</span>
          </h1>
          <p className="text-gray-600 mt-3 text-sm md:text-base">
            We’d love to hear from you. Fill out the form below.
          </p>
        </div>

        {/* CONTENT */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm"
          >
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm focus:ring-2 focus:ring-black"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm focus:ring-2 focus:ring-black"
              />

              <input
                type="text"
                placeholder="Subject"
                className="px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm focus:ring-2 focus:ring-black"
              />

              <textarea
                rows="5"
                placeholder="Your Message"
                className="px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm focus:ring-2 focus:ring-black"
              />

              <button
                type="submit"
                className="cursor-pointer bg-black text-white py-3 rounded-xl text-sm hover:bg-gray-800 transition"
              >
                Send Message
              </button>
            </form>
          </motion.div>

          {/* INFO */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col justify-center gap-6"
          >
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-500" />
              <span>support@homersee.com</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-500" />
              <span>+92 300 1234567</span>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-500" />
              <span>Pakistan</span>
            </div>

            <p className="text-sm text-gray-500 mt-4">
              We usually respond within 24 hours. For urgent queries, please
              call us directly.
            </p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Contact;
