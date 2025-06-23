import React from "react";
import Navbar1 from "../Components/Navbar1";
import Footer from "../Components/Footer";
import Banner from "../Components/Sports/Banner";
import Sports from "../Components/Sports/Sports";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar1 />
      <Banner />
      <Sports /> 
      <Footer />
    </div>
  );
};

export default About;
