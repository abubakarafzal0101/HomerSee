import React from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin } from "lucide-react";

const HomeContact = () => {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT INFO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Get in Touch
          </h2>

          <p className="mt-4 text-gray-600 text-sm md:text-base max-w-md">
            Have questions or need help? Reach out to us and our team will get
            back to you as soon as possible.
          </p>

          {/* contact info */}
          <div className="mt-6 space-y-4 text-sm">
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
          </div>
        </motion.div>

        {/* RIGHT FORM */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
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

            <textarea
              rows="4"
              placeholder="Your Message"
              className="px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm focus:ring-2 focus:ring-black"
            ></textarea>

            <button
              type="submit"
              className="cursor-pointer bg-black text-white py-3 rounded-xl text-sm hover:bg-gray-800 transition"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeContact;
