import React from "react";
import Navbar from "../components/Navbar";
import HomeHero from "../components/homepage/HomeHero";
import Footer from "../components/Footer";
import HomeAbout from "../components/homepage/HomeAbout";
import HomeTestimonials from "../components/homepage/HomeTestimonials";
import HomeContact from "../components/homepage/HomeContact";

const Home = () => {
  return (
    <div>
      <Navbar />
      <HomeHero />
      <HomeAbout />
      <HomeTestimonials />
      <HomeContact />
      <Footer />
    </div>
  );
};

export default Home;
