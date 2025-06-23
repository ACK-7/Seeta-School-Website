import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const CampusSection = () => {
  const campusRef = useRef(null);
  const campusItems = useRef([]);

  const campuses = [
    {
      image: "src/assets/main campus.jpeg",
      name: "MUKONO CAMPUS",
      link: "#",
      animationFrom: "top", // First from top
    },
    {
      image: "src/assets/Greencampus.jpg",
      name: "GREEN CAMPUS",
      link: "#",
      animationFrom: "bottom", // Second from bottom
    },
    {
      image: "src/assets/mbalala campus.jpeg",
      name: "MBALALA CAMPUS",
      link: "#",
      animationFrom: "top", // Third from top
    },
    {
      image: "src/assets/mbalala campus.jpeg",
      name: "A'LEVEL CAMPUS",
      link: "#",
      animationFrom: "bottom", // Fourth from bottom
    },
  ];

  useEffect(() => {
    // Use a small delay to ensure DOM elements are ready
    const timer = setTimeout(() => {
      if (campusItems.current.length === campuses.length) {
        campusItems.current.forEach((element, index) => {
          const direction = campuses[index].animationFrom;
          const yStart = direction === "top" ? -100 : 100;

          gsap.fromTo(
            element,
            { y: yStart, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top center", // Adjust based on your layout
                toggleActions: "play none none reverse",
              },
              delay: index * 0.5, // Staggered delay for each item
            }
          );
        });

        // Animate the header section separately
        gsap.fromTo(
          ".campusHeader",
          { y: -50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: campusRef.current,
              start: "top center",
            },
          }
        );
      }
    }, 100); // Small delay to allow DOM elements to render

    return () => clearTimeout(timer);
  }, [campuses]);

  // Function to add elements to the refs array
  const addToRefs = (el) => {
    if (el && !campusItems.current.includes(el)) {
      campusItems.current.push(el);
    }
  };

  return (
    <section className="py-16 px-5 text-center" ref={campusRef}>
      {/* Header */}
      <div className="campusHeader opacity-0">
        <h1 className="text-4xl font-bold text-gray-800 mb-5">OUR CAMPUSES</h1>
        <div className="flex justify-center items-center my-5">
          <div className="flex-1 h-0.5 bg-gray-300"></div>
          <div className="w-2 h-2 bg-gray-800 rounded-full mx-2"></div>
          <div className="flex-1 h-0.5 bg-gray-300"></div>
        </div>
      </div>

      {/* Campus Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
        {campuses.map((campus, index) => (
          <div
            key={index}
            ref={addToRefs}
            className="relative overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2.5"
          >
            <div className="relative overflow-hidden">
              <img
                src={campus.image}
                alt={campus.name}
                className="w-full h-[300px] object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-5 left-5 right-5 text-left opacity-0 hover:opacity-100 transition-all duration-300 translate-y-5 hover:translate-y-0">
                <h3 className="text-xl text-white mb-2">{campus.name}</h3>
                <a
                  href={campus.link}
                  className="text-white inline-flex items-center gap-1 hover:text-blue-400 transition-colors"
                >
                  Learn More
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CampusSection;