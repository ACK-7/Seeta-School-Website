import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const FacilitiesSection = () => {
  const facilityCardsRef = useRef([]);

  useEffect(() => {
    // Animate facility cards using GSAP
    gsap.from(facilityCardsRef.current, {
      opacity: 1,
      y: 50,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, []);

  const facilities = [
    {
      title: "Modern Computer Lab",
      description:
        "State-of-the-art computer facility equipped with the latest hardware and software.",
      image: "src/assets/computer lab.jpeg",
    },
    {
      title: "Science Laboratory",
      description:
        "Advanced labs with modern equipment for practical experiments.",
      image: "src/assets/laboratories.jpeg",
    },
    {
      title: "Basketball Court",
      description:
        "Professional-grade court for sports activities and competitions.",
      image: "src/assets/basketball court.jpeg",
    },
    {
      title: "Swimming Pool",
      description: "Refreshing pool for relaxation and exercise.",
      image: "src/assets/swimmingpool.jpeg",
    },
    {
      title: "Multi-Purpose Auditorium",
      description: "Spacious venue for events and academic gatherings.",
      image: "src/assets/auditorium.jpg",
    },
    {
      title: "Modern Classrooms",
      description:
        "Spacious classrooms that offer a great environment for academic excellence.",
      image: "src/assets/classrooms.jpeg",
    },
    {
      title: "Library",
      description: "Well-equipped library to facilitate the learners' research.",
      image: "src/assets/library.jpg",
    },
    {
      title: "Dormitories",
      description: "Spacious sleeping areas with extreme comfortability.",
      image: "src/assets/dormitory.jpg",
    },
  ];

  return (
    <div className="py-16 px-5 bg-gray-50 text-center font-['Poppins']">
      <h1 className="text-4xl font-bold mb-10 text-gray-800 relative uppercase">
        Our World-Class Facilities
        <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 max-w-7xl mx-auto">
        {facilities.slice(0, 4).map((facility, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:-translate-y-2.5 hover:shadow-lg hover:border-blue-500 border border-gray-200 bg-white"
            ref={(el) => (facilityCardsRef.current[index] = el)}
          >
            <div className="bg-gray-200">
              <img
                src={facility.image}
                alt={facility.title}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="p-5">
                <h5 className="text-xl font-semibold mb-2.5 text-gray-800">{facility.title}</h5>
                <p className="text-base leading-relaxed text-gray-600">
                  {facility.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8 max-w-7xl mx-auto">
        {facilities.slice(4).map((facility, index) => (
          <div
            key={index + 4}
            className="relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:-translate-y-2.5 hover:shadow-lg hover:border-blue-500 border border-gray-200 bg-white"
            ref={(el) => (facilityCardsRef.current[index + 4] = el)}
          >
            <div className="bg-gray-200">
              <img
                src={facility.image}
                alt={facility.title}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="p-5">
                <h5 className="text-xl font-semibold mb-2.5 text-gray-800">{facility.title}</h5>
                <p className="text-base leading-relaxed text-gray-600">
                  {facility.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacilitiesSection;