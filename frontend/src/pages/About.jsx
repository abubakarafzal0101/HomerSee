import React from "react";
import { motion } from "motion/react";
import { Users, Target, Globe, Star } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="bg-white">
        {/* HERO */}
        <section className="text-center py-20 md:py-28 px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-semibold tracking-tight"
          >
            About <span className="text-gray-400">HomerSee</span>
          </motion.h1>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            We are building a modern platform to help people discover, explore,
            and book the perfect stay anywhere in the world.
          </p>
        </section>

        {/* MISSION & VISION */}
        <section className="max-w-6xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-10 pb-20">
          <div className="p-6 rounded-2xl border border-gray-200">
            <Target className="w-6 h-6 mb-3" />
            <h3 className="font-semibold text-lg mb-2">Our Mission</h3>
            <p className="text-sm text-gray-600">
              To simplify property discovery and booking through a fast,
              transparent, and user-friendly platform.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-gray-200">
            <Globe className="w-6 h-6 mb-3" />
            <h3 className="font-semibold text-lg mb-2">Our Vision</h3>
            <p className="text-sm text-gray-600">
              To become a global marketplace where anyone can find their perfect
              stay with confidence and ease.
            </p>
          </div>
        </section>

        {/* STATS */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center gap-6">
            {[
              { number: "10K+", label: "Listings" },
              { number: "5K+", label: "Users" },
              { number: "100+", label: "Cities" },
              { number: "99%", label: "Satisfaction" },
            ].map((item, i) => (
              <div key={i}>
                <h3 className="text-2xl font-semibold">{item.number}</h3>
                <p className="text-sm text-gray-500">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section className="max-w-6xl mx-auto px-4 md:px-8 py-20">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10">
            Why Choose Us
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Star,
                title: "Top Quality Listings",
                desc: "Only verified and high-quality properties available.",
              },
              {
                icon: Users,
                title: "Trusted Community",
                desc: "Thousands of happy users across multiple cities.",
              },
              {
                icon: Globe,
                title: "Global Reach",
                desc: "Find places anywhere, anytime without hassle.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 border rounded-2xl text-center hover:shadow-md transition"
              >
                <item.icon className="mx-auto mb-3" />
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TEAM */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold mb-10">
              Meet Our Team
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {["Ali", "Sara", "Usman", "Ayesha"].map((name, i) => (
                <div
                  key={i}
                  className="p-5 bg-white border rounded-2xl text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-black text-white flex items-center justify-center">
                    {name.charAt(0)}
                  </div>
                  <h4 className="text-sm font-semibold">{name}</h4>
                  <p className="text-xs text-gray-500">Team Member</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 text-center px-4">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Ready to Find Your Stay?
          </h2>

          <p className="text-gray-600 mt-3 text-sm">
            Explore listings and book your next experience today.
          </p>

          <button
            className="cursor-pointer mt-6 bg-black text-white px-6 py-3 rounded-xl text-sm hover:bg-gray-800 transition"
            onClick={() => navigate("/all-listings")}
          >
            Explore Listings
          </button>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default About;
