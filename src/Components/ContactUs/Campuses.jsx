import React, { useEffect, useRef } from 'react';
import { Phone, MapPin } from 'lucide-react';

const CampusLocations = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const campusRefs = useRef([]);

  const campuses = [
    {
      id: 1,
      name: "Main Campus",
      location: "Seeta, Mukono",
      contact: "0392 001786",
      type: "phone",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop&crop=entropy&auto=format&q=80"
    },
    {
      id: 2,
      name: "Green Campus",
      location: "Kayunga-Bugerere Road",
      contact: "0312 515031",
      type: "phone",
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop&crop=entropy&auto=format&q=80"
    },
    {
      id: 3,
      name: "Mbalala Campus",
      location: "5km past Mukono town",
      contact: "0392 174870",
      type: "phone",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=400&fit=crop&crop=entropy&auto=format&q=80"
    },
    {
      id: 4,
      name: "A'Level Campus",
      location: "1km past Wantoni",
      contact: "Kampala-Jinja Highway",
      type: "location",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop&crop=entropy&auto=format&q=80"
    }
  ];

  useEffect(() => {
    // Import GSAP from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    script.onload = () => {
      const { gsap } = window;
      
      // Animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Title animation
      tl.fromTo(titleRef.current, 
        { 
          opacity: 0, 
          y: 50,
          scale: 0.9
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out"
        }
      );

      // Campus items staggered animation
      tl.fromTo(campusRefs.current, 
        { 
          opacity: 0, 
          y: 80,
          scale: 0.8
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out"
        },
        "-=0.8"
      );

      // Hover animations
      campusRefs.current.forEach((ref, index) => {
        if (ref) {
          ref.addEventListener('mouseenter', () => {
            gsap.to(ref, {
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out"
            });
            gsap.to(ref.querySelector('.campus-image'), {
              scale: 1.1,
              duration: 0.3,
              ease: "power2.out"
            });
          });

          ref.addEventListener('mouseleave', () => {
            gsap.to(ref, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out"
            });
            gsap.to(ref.querySelector('.campus-image'), {
              scale: 1,
              duration: 0.3,
              ease: "power2.out"
            });
          });
        }
      });
    };

    // Load ScrollTrigger plugin
    const scrollTriggerScript = document.createElement('script');
    scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
    scrollTriggerScript.onload = () => {
      if (window.gsap) {
        window.gsap.registerPlugin(window.ScrollTrigger);
      }
    };

    document.head.appendChild(script);
    document.head.appendChild(scrollTriggerScript);

    return () => {
      document.head.removeChild(script);
      document.head.removeChild(scrollTriggerScript);
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen flex flex-col"
    >
      {/* Dark Header Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 py-20 px-6">
        <div className="max-w-7xl mx-auto w-full">
          {/* Title */}
          <div className="text-center">
            <h2 
              ref={titleRef}
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-200 to-slate-100 bg-clip-text text-transparent mb-4"
            >
              Our Campus Locations
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-300 mx-auto rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Light Content Section */}
      <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50 py-16 px-6 flex-1">
        <div className="max-w-7xl mx-auto w-full">

          {/* Campus Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {campuses.map((campus, index) => (
              <div
                key={campus.id}
                ref={(el) => (campusRefs.current[index] = el)}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={campus.image}
                    alt={campus.name}
                    className="campus-image w-full h-full object-cover transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  
                  {/* Campus Name Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-200 transition-colors duration-300">
                      {campus.name}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Location */}
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-slate-600 font-medium leading-relaxed">
                      {campus.location}
                    </p>
                  </div>

                  {/* Contact */}
                  <div className="flex items-center space-x-3">
                    {campus.type === 'phone' ? (
                      <>
                        <Phone className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <a 
                          href={`tel:${campus.contact}`}
                          className="text-slate-700 font-semibold hover:text-blue-600 transition-colors duration-200"
                        >
                          {campus.contact}
                        </a>
                      </>
                    ) : (
                      <>
                        <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <p className="text-slate-700 font-semibold">
                          {campus.contact}
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-200 rounded-2xl transition-colors duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>

          {/* Bottom Decorative Element */}
          <div className="mt-16 flex justify-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampusLocations;