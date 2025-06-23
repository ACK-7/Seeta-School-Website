import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Create GSAP timeline for the arrow animation
    const tl = gsap.timeline({ paused: true });
    
    // Initial state
    tl.fromTo(
      ".back-to-top",
      {
        opacity: 0,
        scale: 0.5,
        y: 20,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        ease: "back.out(1.7)",
      }
    );

    // Hover animation
    const arrow = document.querySelector(".back-to-top");
    if (arrow) {
      arrow.addEventListener("mouseenter", () => {
        gsap.to(".back-to-top", {
          y: -5,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      arrow.addEventListener("mouseleave", () => {
        gsap.to(".back-to-top", {
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    }

    // Scroll event listener
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 300) {
        setIsVisible(true);
        tl.play();
      } else {
        setIsVisible(false);
        tl.reverse();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (arrow) {
        arrow.removeEventListener("mouseenter", () => {});
        arrow.removeEventListener("mouseleave", () => {});
      }
    };
  }, []);

  const scrollToTop = () => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: 0, autoKill: false },
      ease: "power3.inOut",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className="back-to-top fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-label="Back to top"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
};

export default BackToTop; 