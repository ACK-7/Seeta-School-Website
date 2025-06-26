import React, { useEffect } from 'react';
import video from '../../assets/video.mp4';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Hero = () => {
  useGSAP(() => {
    gsap.to("#hero1", {
      opacity: 1,
      duration: 1.5,
      delay: 2,
    });
    gsap.to("#hero2", {
      opacity: 1,
      duration: 1.5,
      delay: 2.5,
    });
    gsap.to("#btn1", {
      opacity: 1,
      duration: 1.5,
      delay: 3,
    });
  });
  
  return (
    <div className="relative w-full h-[90vh] overflow-hidden flex items-center justify-center">
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-[rgba(0,50,50,0.4)]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center p-5 rounded-lg w-[90%] max-w-[1200px]">
        <h1 id='hero1' className="text-5xl font-bold uppercase text-white drop-shadow-md opacity-0 mb-2 md:text-6xl sm:text-3xl xs:text-2xl">
          <span className="text-6xl font-bold text-white md:text-8xl  xs:text-3xl">R</span>eady to unlock your 
        </h1>
        <h2 id='hero2' className="text-6xl font-bold font-serif text-black drop-shadow-[2px_2px_5px_rgba(255,204,0,0.7)] opacity-0 mb-6 md:text-8xl  xs:text-4xl">Potential?</h2>
        <button 
          id='btn1' 
          className="px-8 py-3 text-xl bg-[#ff9900] text-white border-none rounded-md cursor-pointer opacity-0 transition-colors duration-300 hover:bg-[#ff7700] md:px-7 md:py-2.5 md:text-lg sm:px-6 sm:py-2 sm:text-base"
        >
          Join Us
        </button>
      </div>
    </div>
  );
}

export default Hero;