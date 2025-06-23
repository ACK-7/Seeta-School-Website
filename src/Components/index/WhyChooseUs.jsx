import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const WhyChooseUs = () => {
  const features = [
    {
      icon: "fa-graduation-cap",
      title: "Academic Excellence",
      description:
        "Consistently outstanding academic performance with high success rates in national examinations, demonstrated by a strong foundation in core subject areas.",
    },
    {
      icon: "fa-chalkboard-teacher",
      title: "Experienced Faculty",
      description:
        "Our highly qualified teachers bring years of experience and passion for education, providing personalized attention to each student's learning journey.",
    },
    {
      icon: "fa-building",
      title: "Modern Facilities",
      description:
        "State-of-the-art laboratories, libraries, and sports facilities ensure a comprehensive learning environment for all-round development.",
    },
    {
      icon: "fa-child",
      title: "Holistic Development",
      description:
        "Focus on both academic and personal growth through various extracurricular activities, leadership opportunities, and character development programs.",
    },
  ];

  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Initialize GSAP timeline
    const tl = gsap.timeline({ paused: true });

    // Add animations for each card
    cardsRef.current.forEach((card, index) => {
      tl.fromTo(
        card,
        {
          opacity: 0,
          scale: 0.9,
          y: 20,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: index * 0.2, // Staggered delay for each card
        }
      );
    });

    // Create an Intersection Observer instance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tl.play(); // Play animation when the section is in view
          } else {
            tl.reverse(); // Reverse animation when the section leaves the view
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of the section is visible
      }
    );

    // Observe the section
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Cleanup the observer on component unmount
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16 px-5 bg-gray-50 text-center">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-5">WHY CHOOSE US</h1>
        <div className="flex justify-center items-center mb-10">
          <span className="flex-1 h-0.5 bg-gray-300"></span>
          <span className="w-2.5 h-2.5 bg-gray-800 rotate-45 mx-2.5"></span>
          <span className="flex-1 h-0.5 bg-gray-300"></span>
        </div>
      </div>

      <div className="flex flex-wrap gap-5 justify-center">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex-1 min-w-[280px] relative"
            ref={(el) => (cardsRef.current[index] = el)} 
          >
            <div className="bg-gray-200 shadow-md overflow-hidden relative transition-all duration-300 hover:-translate-y-2.5 hover:shadow-lg">
              <div className="bg-indigo-500 w-20 h-20 rounded-full flex justify-center items-center mx-auto my-5">
                <i className={`fas ${feature.icon} text-3xl text-white`}></i>
              </div>
              <div className="p-5 flex-1">
                <h3 className="text-2xl font-bold text-gray-800 mb-2.5">{feature.title}</h3>
                <p className="text-base text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
              <div className="absolute inset-0 bg-indigo-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;