import React from "react";
import Navbar from "../components/Navbar";
import HomeHero from "../components/homepage/HomeHero";
import Footer from "../components/Footer";
import HomeAbout from "../components/homepage/HomeAbout";
import HomeTestimonials from "../components/homepage/HomeTestimonials";
import HomeContact from "../components/homepage/HomeContact";
import FeaturedListings from "../components/homepage/FeaturedListings";

const Home = () => {
  return (
    <div>
      <Navbar />
      <HomeHero />
      <FeaturedListings />
      <HomeAbout />
      <HomeTestimonials />
      <HomeContact />
      <Footer />
    </div>
  );
};

export default Home;
