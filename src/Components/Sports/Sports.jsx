import React, { useEffect, useRef } from 'react';
import { Trophy, Calendar, Users, Camera, Star, Medal, Target, Zap } from 'lucide-react';

const SportsAthleticsPage = () => {
  const heroRef = useRef(null);
  const newsRef = useRef(null);
  const teamsRef = useRef(null);
  const galleryRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    // Import GSAP from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    script.onload = () => {
      const { gsap } = window;
      
      // Hero section animation
      gsap.fromTo(heroRef.current.children, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
      );

      // Scroll-triggered animations
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = entry.target;
            
            if (target === newsRef.current) {
              gsap.fromTo(target.querySelectorAll('.news-card'), 
                { opacity: 0, y: 30, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: "back.out(1.7)" }
              );
            }
            
            if (target === teamsRef.current) {
              gsap.fromTo(target.querySelectorAll('.team-card'), 
                { opacity: 0, rotationY: 45 },
                { opacity: 1, rotationY: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" }
              );
            }
            
            if (target === galleryRef.current) {
              gsap.fromTo(target.querySelectorAll('.gallery-item'), 
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 0.7, stagger: 0.1, ease: "elastic.out(1, 0.5)" }
              );
            }

            if (target === statsRef.current) {
              gsap.fromTo(target.querySelectorAll('.stat-card'), 
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
              );
              
              // Animate counters
              target.querySelectorAll('.counter').forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                gsap.to(counter, {
                  innerHTML: target,
                  duration: 2,
                  snap: { innerHTML: 1 },
                  ease: "power2.out"
                });
              });
            }
          }
        });
      }, observerOptions);

      [newsRef.current, teamsRef.current, galleryRef.current, statsRef.current].forEach(ref => {
        if (ref) observer.observe(ref);
      });

      // Hover animations for cards
      document.querySelectorAll('.hover-lift').forEach(card => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { y: -10, scale: 1.02, duration: 0.3, ease: "power2.out" });
        });
        
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" });
        });
      });

      // Floating animation for hero icons
      gsap.to('.floating-icon', {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        stagger: 0.5
      });
    };
    
    document.head.appendChild(script);
    
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const newsItems = [
    {
      title: "Upcoming Game",
      description: "Cheer for our team this Friday at the home stadium.",
      image: "/api/placeholder/400/250",
      type: "upcoming",
      icon: Calendar
    },
    {
      title: "Recent Victory",
      description: "Congratulations to our basketball team for an epic win!",
      image: "/api/placeholder/400/250",
      type: "victory",
      icon: Trophy
    },
    {
      title: "Swimming Spotlight",
      description: "Meet our star of the swimming tournament.",
      image: "/api/placeholder/400/250",
      type: "spotlight",
      icon: Star
    }
  ];

  const teams = [
    {
      name: "Varsity Basketball",
      image: "/api/placeholder/400/300",
      members: 12,
      achievements: "Regional Champions 2024"
    },
    {
      name: "Soccer",
      image: "/api/placeholder/400/300",
      members: 18,
      achievements: "District Runners-up"
    },
    {
      name: "Varsity Swimming",
      image: "/api/placeholder/400/300",
      members: 15,
      achievements: "State Qualifiers"
    }
  ];

  const galleryImages = [
    "/api/placeholder/350/250",
    "/api/placeholder/350/250",
    "/api/placeholder/350/250",
    "/api/placeholder/350/250",
    "/api/placeholder/350/250",
    "/api/placeholder/350/250"
  ];

  const stats = [
    { number: 150, label: "Student Athletes", icon: Users },
    { number: 25, label: "Championships", icon: Trophy },
    { number: 8, label: "Sports Teams", icon: Target },
    { number: 95, label: "Win Rate %", icon: Zap }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10" ref={heroRef}></div>
      </section>

      {/* Stats Section */}
      <section className="mt-[-150px] px-4" ref={statsRef}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card text-center p-6 bg-white rounded-2xl shadow-lg hover-lift">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="counter text-3xl md:text-4xl font-bold text-gray-800 mb-2" data-target={stat.number}>
                  0
                </div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent News & Announcements */}
      <section className="py-20 px-4" ref={newsRef}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Recent News & Announcements
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-orange-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {newsItems.map((item, index) => (
              <div key={index} className="news-card group bg-white rounded-3xl shadow-xl overflow-hidden hover-lift">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Teams */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-orange-50" ref={teamsRef}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Our Teams
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-orange-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {teams.map((team, index) => (
              <div key={index} className="team-card group bg-white rounded-3xl shadow-xl overflow-hidden hover-lift">
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={team.image} 
                    alt={team.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-2">{team.name}</h3>
                    <div className="flex items-center justify-between text-white/90">
                      <span className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {team.members} members
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-orange-600">
                    <Medal className="w-5 h-5" />
                    <span className="font-semibold">{team.achievements}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-20 px-4" ref={galleryRef}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Photo Gallery
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-orange-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div key={index} className="gallery-item group relative overflow-hidden rounded-2xl shadow-lg hover-lift">
                <img 
                  src={image} 
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Camera className="w-12 h-12 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SportsAthleticsPage;