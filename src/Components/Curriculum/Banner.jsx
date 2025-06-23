import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import bannerImage from '/src/assets/bannerPic.png';

const Banner = () => {
  useEffect(() => {
    gsap.fromTo(
      '.banner-title',
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.5, delay: 0.3, ease: 'power2.out' }
    );

    gsap.fromTo(
      '.banner-text',
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.5, delay: 0.6, ease: 'power2.out' }
    );

    gsap.fromTo(
      '.banner-buttons',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, delay: 0.9, ease: 'power2.out' }
    );
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <img
        src={bannerImage}
        alt="Team"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1f1f2e]/100 via-[#1f1f2e]/80 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 flex items-center h-full px-8 md:px-20">
        <div className="max-w-2xl text-white space-y-6">
          <h1 className="banner-title text-4xl md:text-6xl font-bold leading-tight">
            Our Curriculum<br />Designed To Inspire<br />And Empower
          </h1>
          <p className="banner-text text-gray-300">
            we provide a dynamic and inclusive curriculum that nurtures critical thinking, creativity, and lifelong learning. our programs are tailored to meet the diverse needs of every student, preparing them for success in academics and beyond.
          </p>
        </div>
      </div>

      {/* SVG Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 z-10 ">
        <svg
          className="w-full h-24 md:h-32 lg:h-40"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#f8f9fa"
            d="M0,224L48,213.3C96,203,192,181,288,170.7C384,160,480,160,576,176C672,192,768,224,864,234.7C960,245,1056,235,1152,213.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Banner;
