import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import staffImage from "../../assets/admission-process.png";

gsap.registerPlugin(ScrollTrigger);

const Administration = () => {
  const sectionRef = useRef(null);
  const adminCardsRef = useRef([]);
  const headteacherCardsRef = useRef([]);
  const boardMembersRef = useRef([]);
  const boardImagesRef = useRef([]);

  // Function to add elements to refs
  const addToRefs = (el, refArray) => {
    if (el && !refArray.current.includes(el)) {
      refArray.current.push(el);
    }
  };

  useEffect(() => {
    // Header animation
    gsap.fromTo(
      ".content-section h1",
      { y: -60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );

    // Text animation
    gsap.fromTo(
      ".text-animation",
      { opacity: 0, x: -120 },
      {
        opacity: 1,
        x: 0,
        duration: 1.8,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".text-animation",
          start: "top 80%",
          end: "bottom 60%",
        },
      }
    );
    gsap.fromTo(
      ".img1",
      { opacity: 0, x: 120 },
      {
        opacity: 1,
        x: 0,
        duration: 2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".text-animation",
          start: "top 80%",
          end: "bottom 60%",
        },
      }
    );

    // Card animations
    const animateCards = (cards) => {
      cards.current.forEach((card, index) => {
        // Generate random starting position from off-screen
        const getRandomStartPosition = () => {
          const directions = [
            { x: -200, y: 0 }, 
            { x: 200, y: 0 }, 
            { x: 0, y: -200 }, 
            { x: 0, y: 200 }, 
            { x: -150, y: -150 }, 
            { x: 150, y: -150 }, 
            { x: -150, y: 150 }, 
            { x: 150, y: 150 }, 
          ];

          // Add some randomness to the distance
          const randomDirection =
            directions[Math.floor(Math.random() * directions.length)];
          const randomMultiplier = 0.8 + Math.random() * 0.6; 

          return {
            x: randomDirection.x * randomMultiplier,
            y: randomDirection.y * randomMultiplier,
          };
        };

        const startPos = getRandomStartPosition();

        gsap.fromTo(
          card,
          {
            x: startPos.x,
            y: startPos.y,
            opacity: 0,
            scale: 0.8,
            rotation: Math.random() * 20 - 10, 
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1 + Math.random() * 0.4, 
            ease: "power3.out",
            scrollTrigger: {
            trigger: card,
            start: "top 85%",
            },
            delay: index * 0.15 + Math.random() * 0.2, 
          }
        );

        // Hover effect
        card.addEventListener("mouseenter", () => {
          gsap.to(card, { scale: 1.03, duration: 0.3, ease: "power2.out" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { scale: 1, duration: 0.3, ease: "power2.out" });
        });
      });
    };

    // Image animations for Board of Trustees
    const animateImages = (images) => {
      images.current.forEach((img, index) => {
        gsap.fromTo(
          img,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: img,
              start: "top 85%",
            },
            delay: index * 0.3,
          }
        );
      });
    };

    animateCards(adminCardsRef);
    animateCards(headteacherCardsRef);
    animateCards(boardMembersRef);
    animateImages(boardImagesRef);

    // Cleanup event listeners
    return () => {
      adminCardsRef.current.forEach((card) => {
        card.removeEventListener("mouseenter", () => {});
        card.removeEventListener("mouseleave", () => {});
      });
      headteacherCardsRef.current.forEach((card) => {
        card.removeEventListener("mouseenter", () => {});
        card.removeEventListener("mouseleave", () => {});
      });
      boardMembersRef.current.forEach((card) => {
        card.removeEventListener("mouseenter", () => {});
        card.removeEventListener("mouseleave", () => {});
      });
    };
  }, []);

  return (
    <div className="overflow-hidden">
      <div ref={sectionRef} className="font-sans relative">
        {/* Background Image with Blur */}
        <div 
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage: 'url("src/assets/bannerPic.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            // filter: 'blur(4px) brightness(0.8)',
            transform: 'scale(1.1)', // Prevents blur edges from showing
            // backgroundColor: 'rgba(0, 0, 51, 0.4)', // Dark blue overlay
            // backgroundBlendMode: 'overlay',
          }}
        />
        
        {/* Content Container with semi-transparent background */}
        <div className="relative z-10">
          {/* Content Section */}
          <section className="py-20 content-section bg-white/90">
            <div className="container mx-auto px-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="md:w-1/2 text-left text-animation">
                  <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight transition-all duration-300 hover:text-blue-700">
                    Everyone's a Student, Everyone's a Teacher
                  </h1>
                  <div className="w-28 h-1 bg-blue-600 mb-8 rounded-full transition-all duration-500 hover:w-36"></div>
                  <p className="text-lg text-gray-700 leading-relaxed transition-all duration-300">
                    Our faculty and staff are passionate experts, dedicated to
                    sharing their knowledge and fostering a collaborative learning
                    environment...
                  </p>
                </div>
                <div className="md:w-1/2 img1">
                  <img
                    src={staffImage}
                    alt="School administrators collaborating"
                    className="rounded-xl shadow-2xl object-cover w-full h-72 md:h-96 transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* School Administrators Section */}
          <section className="py-16 bg-gray-100/90">
            <div className="container mx-auto px-6">
              <h2 className="text-4xl font-bold text-center text-gray-900 mb-6">
                School Administrators
              </h2>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                Our visionary administrators lead with passion, ensuring Seeta High
                Schools thrive as centers of excellence.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    name: "Mr. Lumu Charles",
                    role: "Head of Finance",
                    img: "src/assets/charles.jpeg",
                  },
                  {
                    name: "Ms. Nagawa Joan",
                    role: "Human Resource",
                    img: "src/assets/Nagawa.jpg",
                  },
                  {
                    name: "Mr. Sekiziyivu Joseph",
                    role: "Financial Officer",
                    img: "src/assets/Joseph.jpg",
                  },
                ].map((admin, idx) => (
                  <div
                    key={idx}
                    className="relative overflow-hidden rounded-xl shadow-lg bg-white transition-transform duration-300"
                    ref={(el) => addToRefs(el, adminCardsRef)}
                  >
                    <img
                      src={admin.img}
                      alt={admin.name}
                      className="w-full h-80 object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent text-white text-center p-6">
                      <h5 className="text-xl font-semibold">{admin.name}</h5>
                      <p className="text-sm mt-1">{admin.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Headteachers Section */}
          <section className="py-16 bg-white/90">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Meet Our Headteachers
              </h2>
              <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
                Our headteachers lead each campus with dedication, overseeing
                programs and fostering a vibrant learning community.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  {
                    name: "Namulondo Lilian",
                    role: "Headteacher | Main Campus",
                    img: "src/assets/Namulondo-Lilian.jpg",
                    contact: {
                      tel: "+256759700088",
                      email: "namulondo@seetahigh.ac.ug",
                    },
                  },
                  {
                    name: "Mr. Ssebukalu Bonny",
                    role: "Headteacher | Main Campus",
                    img: "src/assets/Bonny.jpeg",
                    contact: {
                      tel: "+256759700088",
                      email: "namulondo@seetahigh.ac.ug",
                    },
                  },
                  {
                    name: "Mr. Songha Ramadhan",
                    role: "Headteacher | Main Campus",
                    img: "src/assets/Songha.jpeg",
                    contact: {
                      tel: "+256759700088",
                      email: "namulondo@seetahigh.ac.ug",
                    },
                  },
                  {
                    name: "Namulondo Lilian",
                    role: "Headteacher | Main Campus",
                    img: "src/assets/Paul.jpeg",
                    contact: {
                      tel: "+256759700088",
                      email: "namulondo@seetahigh.ac.ug",
                    },
                  },
                ].map((headteacher, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300"
                    ref={(el) => addToRefs(el, headteacherCardsRef)}
                  >
                    <img
                      src={headteacher.img}
                      alt={headteacher.name}
                      className="w-full h-72 object-cover border-b border-gray-200"
                    />
                    <div className="p-6 text-center">
                      <h5 className="text-xl font-semibold text-gray-800">
                        {headteacher.name}
                      </h5>
                      <p className="text-gray-500 mb-2">{headteacher.role}</p>
                      <p className="text-sm text-gray-600 mb-4">
                        Tel: {headteacher.contact.tel}
                        <br />
                        Email: {headteacher.contact.email}
                      </p>
                      <div className="flex justify-center space-x-4">
                        <a
                          href="#"
                          className="text-gray-600 hover:text-blue-600 transition-colors"
                        >
                          <i className="bi bi-facebook text-xl"></i>
                        </a>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-blue-400 transition-colors"
                        >
                          <i className="bi bi-twitter text-xl"></i>
                        </a>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-blue-700 transition-colors"
                        >
                          <i className="bi bi-linkedin text-xl"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Board of Trustees Section */}
          <section className="py-20 bg-gradient-to-b from-gray-50/90 to-white/90 text-center">
            <div className="container mx-auto px-6">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                School Leadership
              </h2>
              <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
                Our dedicated leadership team works tirelessly to ensure Seeta High Schools maintain the highest standards of academic excellence and student development.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                {[
                  {
                    title: "Mrs. Rose Namayanja Muyingo",
                    description: "Director of Seeta High Schools",
                    role: "Director",
                    img: "src/assets/Director.jpeg",
                    alt: "Director of Seeta High Schools",
                    achievements: [
                      "Over 20 years of experience in educational leadership",
                      "Pioneered innovative teaching methodologies",
                      "Led the expansion of Seeta High Schools network"
                    ]
                  },
                  {
                    title: "Mr. Kafumbe Davis",
                    description: "Principal of Seeta High School",
                    role: "Principal",
                    img: "src/assets/principal.jpeg",
                    alt: "Principal of Seeta High School",
                    achievements: [
                      "Expert in curriculum development and implementation",
                      "Strong focus on student welfare and academic excellence",
                      "Implemented successful mentorship programs"
                    ]
                  }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="relative rounded-xl shadow-lg overflow-hidden bg-white transform transition-all duration-300 hover:shadow-xl"
                    ref={(el) => addToRefs(el, boardImagesRef)}
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 relative">
                        <img
                          src={item.img}
                          alt={item.alt}
                          className="w-full h-full object-cover min-h-[300px]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 text-white">
                          <span className="text-sm font-medium bg-blue-600 px-3 py-1 rounded-full">
                            {item.role}
                          </span>
                        </div>
                      </div>
                      <div className="md:w-2/3 p-6 text-left">
                        <h5 className="text-2xl font-semibold text-gray-800 mb-2">
                          {item.title}
                        </h5>
                        <p className="text-blue-600 font-medium mb-4">
                          {item.description}
                        </p>
                        <div className="space-y-3">
                          {item.achievements.map((achievement, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <svg className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                              <p className="text-gray-600 text-sm">{achievement}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Administration;
