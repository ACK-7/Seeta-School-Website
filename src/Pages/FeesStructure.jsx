import React from "react";
import Navbar1 from "../Components/Navbar1";
import Footer from "../Components/Footer";
import FeesStructure from "../Components/FeesStructure/FeesStructure";
import Banner from "../Components/FeesStructure/Banner";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar1 />
      <Banner />
      <FeesStructure />  
      <Footer />
    </div>
  );
};

export default About;
