import React, { useEffect, useRef } from 'react';
import { User, GraduationCap, Megaphone, Mail } from 'lucide-react';

const OurTeamSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const teamRefs = useRef([]);

  const teamMembers = [
    {
      id: 1,
      name: "Ms Nagawa Joan",
      title: "Human Resource Manager",
      department: "Administration",
      description: "Overseeing staff development and institutional growth",
      email: "shs@humanresource.ac.ug",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face&auto=format&q=80",
      icon: User,
      color: "from-green-500 to-emerald-600"
    },
    {
      id: 2,
      name: "Mr. Katumbe Davis",
      title: "Director of Admissions",
      department: "Admissions",
      description: "Guiding future students on their educational journey",
      email: "admissions@seetahighschool.ac.ug",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face&auto=format&q=80",
      icon: GraduationCap,
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: 3,
      name: "Communications Department",
      title: "Public Relations & Media",
      department: "Media Inquiries",
      description: "Keeping our community informed and connected",
      email: "communications@seetahighschool.ac.ug",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=400&fit=crop&crop=center&auto=format&q=80",
      icon: Megaphone,
      color: "from-purple-500 to-violet-600"
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
          y: 60,
          scale: 0.8
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out"
        }
      );

      // Team members staggered animation
      tl.fromTo(teamRefs.current, 
        { 
          opacity: 0, 
          y: 100,
          rotationY: 15,
          scale: 0.9
        },
        { 
          opacity: 1, 
          y: 0,
          rotationY: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.3,
          ease: "power3.out"
        },
        "-=0.8"
      );

      // Hover animations
      teamRefs.current.forEach((ref) => {
        if (ref) {
          ref.addEventListener('mouseenter', () => {
            gsap.to(ref, {
              y: -10,
              scale: 1.02,
              duration: 0.4,
              ease: "power2.out"
            });
            gsap.to(ref.querySelector('.team-image'), {
              scale: 1.1,
              duration: 0.4,
              ease: "power2.out"
            });
            gsap.to(ref.querySelector('.icon-container'), {
              scale: 1.2,
              rotation: 5,
              duration: 0.3,
              ease: "back.out(1.7)"
            });
          });

          ref.addEventListener('mouseleave', () => {
            gsap.to(ref, {
              y: 0,
              scale: 1,
              duration: 0.4,
              ease: "power2.out"
            });
            gsap.to(ref.querySelector('.team-image'), {
              scale: 1,
              duration: 0.4,
              ease: "power2.out"
            });
            gsap.to(ref.querySelector('.icon-container'), {
              scale: 1,
              rotation: 0,
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
      className="py-20 px-6 bg-gradient-to-br from-gray-50 via-white to-slate-100 min-h-screen flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Title */}
        <div className="text-center mb-20">
          <h2 
            ref={titleRef}
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 via-gray-700 to-slate-600 bg-clip-text text-transparent mb-6"
          >
            Our Team
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-slate-500 to-gray-600 mx-auto rounded-full mb-4"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Meet the dedicated professionals who make our institution exceptional
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {teamMembers.map((member, index) => {
            const IconComponent = member.icon;
            return (
              <div
                key={member.id}
                ref={(el) => (teamRefs.current[index] = el)}
                className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                {/* Content */}
                <div className="relative p-8 text-center">
                  {/* Icon Container */}
                  <div className="flex justify-center mb-6">
                    <div className={`icon-container w-16 h-16 bg-gradient-to-br ${member.color} rounded-2xl flex items-center justify-center shadow-md`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Department Badge */}
                  <div className="inline-flex items-center space-x-2 mb-6">
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                      {member.department}
                    </span>
                  </div>

                  {/* Profile Image */}
                  <div className="relative w-32 h-32 mx-auto mb-6 overflow-hidden rounded-full shadow-lg">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="team-image w-full h-full object-cover transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${member.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                  </div>

                  {/* Name and Title */}
                  <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-lg font-medium text-gray-600 mb-4">
                    {member.title}
                  </p>

                  {/* Description */}
                  <p className="text-gray-500 leading-relaxed mb-6 text-sm">
                    {member.description}
                  </p>

                  {/* Email Button */}
                  <a
                    href={`mailto:${member.email}`}
                    className={`inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r ${member.color} text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 group-hover:shadow-xl`}
                  >
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">Contact</span>
                  </a>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-white/10 to-white/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-white/5 to-white/10 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            );
          })}
        </div>

        {/* Bottom Stats or Info */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center space-x-8 bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-lg">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">3</p>
              <p className="text-sm text-gray-600">Departments</p>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">24/7</p>
              <p className="text-sm text-gray-600">Support</p>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">100%</p>
              <p className="text-sm text-gray-600">Dedicated</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurTeamSection;