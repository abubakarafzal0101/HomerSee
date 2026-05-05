import React from "react";
import { motion } from "motion/react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ali Khan",
    role: "Traveler",
    review:
      "HomerSee made booking so easy. The listings were exactly as shown. Highly recommended!",
  },
  {
    name: "Sara Ahmed",
    role: "Business Owner",
    review:
      "I found the perfect place within minutes. The experience was smooth and professional.",
  },
  {
    name: "Usman Tariq",
    role: "Freelancer",
    review:
      "Amazing platform! Clean UI and very fast booking process. Will use again.",
  },
];

const HomeTestimonials = () => {
  return (
    <section className="bg-gray-50 py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
        {/* heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-semibold tracking-tight"
        >
          What Our Users Say
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-3 text-gray-600 text-sm md:text-base max-w-xl mx-auto"
        >
          Real experiences from people who trust HomerSee for their stays.
        </motion.p>

        {/* cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-200 rounded-2xl p-6 text-left shadow-sm hover:shadow-md transition"
            >
              {/* stars */}
              <div className="flex gap-1 mb-3 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>

              {/* review */}
              <p className="text-sm text-gray-600 leading-relaxed">
                "{item.review}"
              </p>

              {/* user */}
              <div className="flex items-center gap-3 mt-5">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white text-sm font-semibold">
                  {item.name.charAt(0)}
                </div>

                <div>
                  <h4 className="text-sm font-semibold">{item.name}</h4>
                  <p className="text-xs text-gray-500">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeTestimonials;
