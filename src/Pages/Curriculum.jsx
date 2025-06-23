import React from "react";
import Navbar1 from "../Components/Navbar1";
import Footer from "../Components/Footer";
import Curriculum from "../Components/Curriculum/Curriculum";
import Banner from "../Components/Curriculum/Banner";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar1 />
      <Banner />
      <Curriculum />  
      <Footer />
    </div>
  );
};

export default About;
