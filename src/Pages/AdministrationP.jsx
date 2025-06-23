import React from "react";
import Navbar1 from "../Components/Navbar1";
import Footer from "../Components/Footer";
import Administration from "../Components/Administration/Administration";
import Banner from "../Components/Administration/Banner";

const AdministrationP = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar1 />
      <Banner />
      <Administration />
      <Footer />
    </div>
  );
};

export default AdministrationP;
