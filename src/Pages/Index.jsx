import React from "react";
import Hero from "../Components/index/Hero";
import Services from "../Components/index/Services";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Strips from "../Components/index/Strips";
import Message from "../Components/index/Message";
import CounterSection from "../Components/index/CounterSection";
import WhyChooseUs from "../Components/index/WhyChooseUs";
import FacilitiesSection from "../Components/index/FacilitiesSection";
import TestimonialSlider from "../Components/index/TestimonialSlider";
import CallToActionSection from "../Components/index/CallToActionSection";
import Footer from "../Components/Footer";
import Navbar1 from "../Components/Navbar1";
import ImportantDays from "../Components/index/ImportantDays";
import SeetaHighlights from "../Components/index/SeetaHighlights";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar1 />
      <Hero />
      <Services />
      <Strips />
      <Message />
      <CounterSection />
      <WhyChooseUs />
      <FacilitiesSection />
      <TestimonialSlider />
      <ImportantDays />
      <CallToActionSection />
      <SeetaHighlights />
      <Footer />
    </div>
  );
};

export default Index;
