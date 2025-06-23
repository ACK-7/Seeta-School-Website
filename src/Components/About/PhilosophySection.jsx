import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import philosophyImg from '/src/assets/about us.jpg'; // Replace with your actual image path

gsap.registerPlugin(ScrollTrigger);

const PhilosophySection = () => {
  useEffect(() => {
    gsap.fromTo(
      '.philosophy-title',
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.philosophy-title',
          start: 'top 80%',
        },
      }
    );

    gsap.fromTo(
      '.philosophy-text',
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.4,
        delay: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.philosophy-text',
          start: 'top 80%',
        },
      }
    );

    gsap.fromTo(
      '.philosophy-img',
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.philosophy-img',
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <section className="bg-[#344054] text-white py-20 px-6 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Text Section */}
        <div className="flex-1 space-y-6">
          <h2 className="philosophy-title text-4xl md:text-5xl font-bold">
            Our Philosophy
          </h2>
          <p className="philosophy-text text-lg md:text-xl text-gray-300 leading-relaxed">
            At Seeta High School, we believe in a holistic, learner-centered approach to education that goes beyond academic achievement. Our pedagogy integrates critical thinking, creativity, and character development, empowering students to thrive in a complex, ever-changing world.
            <br /><br />
            We combine STEM-focused learning with inquiry-based methods to spark curiosity and cultivate lifelong learners. Every student is guided to discover their unique potential in a nurturing, faith-based environment that emphasizes moral values and global citizenship.
          </p>
        </div>

        {/* Image Section */}
        <div className="flex-1">
          <img
            src={philosophyImg}
            alt="Our Educational Philosophy"
            className="philosophy-img w-full h-auto rounded-2xl shadow-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
