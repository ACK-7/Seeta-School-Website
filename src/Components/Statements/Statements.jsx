"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import principal from "../../assets/principal.jpeg";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin);

const Statements = () => {
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const valuesWrapperRef = useRef(null);
  const themeBlockRef = useRef(null);
  const visionBlockRef = useRef(null);
  const missionBlockRef = useRef(null);
  const mottoBlockRef = useRef(null);
  const anthemRef = useRef(null);
  const coreValuesRef = useRef(null);
  const leadershipRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial page load animation with enhanced effects
      const pageLoadTl = gsap.timeline();
      pageLoadTl
        .fromTo(
          pageRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
          }
        )
        .fromTo(
          ".hero-content",
          { y: 120, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.6"
        );

      // Smooth scroll to top
      gsap.to(window, {
        duration: 0.4,
        scrollTo: { y: 0, autoKill: true },
        ease: "power2.inOut",
      });

      // Stats counter animation with improved performance
      if (statsRef.current) {
        const stats = statsRef.current.querySelectorAll(".stat-number");
        stats.forEach((stat) => {
          const value = parseInt(stat.getAttribute("data-value"));
          gsap.fromTo(
            stat,
            { textContent: 0 },
            {
              textContent: value,
              duration: 2.5,
              ease: "power1.out",
              snap: { textContent: 1 },
              scrollTrigger: {
                trigger: stat,
                start: "top 80%",
                toggleActions: "play none none reverse",
                once: true, // Only play once
              },
            }
          );
        });
      }

      // Enhanced value blocks animation with stagger and improved performance
      const valueBlocks = [
        themeBlockRef.current,
        visionBlockRef.current,
        missionBlockRef.current,
        mottoBlockRef.current,
      ].filter(Boolean); // Filter out any null refs

      if (valueBlocks.length > 0) {
        gsap.fromTo(
          valueBlocks,
          { y: 80, opacity: 0, scale: 0.9, rotateY: 15 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: valuesWrapperRef.current,
              start: "top 85%",
              end: "top 40%",
              toggleActions: "play none none reverse",
              once: true, // Only play once
            },
          }
        );
      }

      // Anthem section animation with improved performance
      if (anthemRef.current) {
        gsap.fromTo(
          ".anthem-verse",
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: anthemRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
              once: true, // Only play once
            },
          }
        );
      }

      // Core values animation with improved performance
      if (coreValuesRef.current) {
        gsap.fromTo(
          ".value-item",
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: coreValuesRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
              once: true, // Only play once
            },
          }
        );
      }

      // Leadership message animation with improved performance
      if (leadershipRef.current) {
        gsap.fromTo(
          ".leadership-content",
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: leadershipRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
              once: true, // Only play once
            },
          }
        );
      }

      // Enhanced hover animations for cards with proper cleanup
      const cards = document.querySelectorAll(".card");
      const cardAnimations = Array.from(cards).map(card => {
        const enterAnimation = gsap.to(card, {
          y: -15,
          scale: 1.03,
          duration: 0.4,
          ease: "power2.out",
          boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
          paused: true,
        });

        const leaveAnimation = gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
          paused: true,
        });

        card.addEventListener("mouseenter", () => enterAnimation.play());
        card.addEventListener("mouseleave", () => leaveAnimation.play());

        return { enterAnimation, leaveAnimation };
      });

      // Floating animation for decorative elements with improved performance
      const floatingAnimation = gsap.to(".floating-element", {
        y: -20,
        duration: 3,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
      });

      // Background pattern animation with improved performance
      const patternAnimation = gsap.to(".bg-pattern", {
        rotation: 360,
        duration: 60,
        ease: "none",
        repeat: -1,
      });

      // Return cleanup function
      return () => {
        // Kill all ScrollTrigger instances
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        
        // Kill all animations
        floatingAnimation.kill();
        patternAnimation.kill();
        cardAnimations.forEach(({ enterAnimation, leaveAnimation }) => {
          enterAnimation.kill();
          leaveAnimation.kill();
        });
        
        // Remove event listeners
        cards.forEach(card => {
          card.removeEventListener("mouseenter", () => {});
          card.removeEventListener("mouseleave", () => {});
        });
      };
    });

    return () => {
      ctx.revert(); // This will clean up all GSAP animations and ScrollTriggers
    };
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background decorative patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bg-pattern absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
        <div className="bg-pattern absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-green-200/20 to-blue-200/20 rounded-full blur-3xl"></div>
      </div>

      {/* Core Values Section */}
      <section ref={valuesWrapperRef} className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Our Foundation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The pillars that guide our educational excellence and shape the future leaders of tomorrow
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <div ref={themeBlockRef} className="card group relative bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl"></div>
              <div className="relative">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mr-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-blue-600">Theme</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Inspiring innovation and excellence in education through cutting-edge research and practical learning experiences that prepare students for the challenges of tomorrow.
                </p>
              </div>
            </div>

            <div ref={visionBlockRef} className="card group relative bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-2xl"></div>
              <div className="relative">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mr-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-purple-600">Vision</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Empowering future leaders through knowledge, innovation, and global perspectives to create positive change in society and build a better world for all.
                </p>
              </div>
            </div>

            <div ref={missionBlockRef} className="card group relative bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-2xl"></div>
              <div className="relative">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mr-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-green-600">Mission</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Fostering a transformative learning environment that nurtures creativity, critical thinking, and lifelong learning while building character and integrity.
                </p>
              </div>
            </div>

            <div ref={mottoBlockRef} className="card group relative bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 rounded-2xl"></div>
              <div className="relative">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center mr-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-red-600">Motto</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Learn, Grow, Succeed - Building a foundation for excellence and achievement in every endeavor we undertake.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* School Anthem Section */}
      <section ref={anthemRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-yellow-50 to-amber-50 relative">
        <div
          className={`absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23f59e0b\' fill-opacity=\'0.05\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30`}
        ></div>
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-16">
            <div className="floating-element inline-block">
              <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mb-6 mx-auto shadow-xl">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                </svg>
              </div>
            </div>
            <h2 className="text-5xl font-bold mb-6 text-gray-800">Our School Anthem</h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-8"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="anthem-verse bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-xl border border-yellow-200/50">
              <h3 className="text-2xl font-bold text-center mb-8 text-yellow-700 uppercase tracking-wider">Verse I</h3>
              <div className="space-y-4 text-center">
                <p className="text-gray-700 text-lg leading-relaxed italic">Seeta High School raise your banners,</p>
                <p className="text-gray-700 text-lg leading-relaxed italic">Lift your vision above all,</p>
                <p className="text-gray-700 text-lg leading-relaxed italic">You the model, you the fountain,</p>
                <p className="text-gray-700 text-lg leading-relaxed italic">The core of morals and talents.</p>
                <p className="text-gray-700 text-lg leading-relaxed italic">Responsible leaders for our nation,</p>
                <p className="text-gray-700 text-lg leading-relaxed italic">Rise to excel and prosper,</p>
                <p className="text-gray-700 text-lg leading-relaxed italic font-semibold">Seeta High School, raise your banners,</p>
                <p className="text-gray-700 text-lg leading-relaxed italic font-semibold">Lift your plight above all</p>
              </div>
            </div>

            <div className="anthem-verse bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-xl border border-yellow-200/50">
              <h3 className="text-2xl font-bold text-center mb-8 text-yellow-700 uppercase tracking-wider">Verse II</h3>
              <div className="space-y-4 text-center">
                <p className="text-gray-700 text-lg leading-relaxed italic">Seeta High School ever shining</p>
                <p className="text-gray-700 text-lg leading-relaxed italic">You are the helm morning star</p>
                <p className="text-gray-700 text-lg leading-relaxed italic">Serve the church and serve the nation</p>
                <p className="text-gray-700 text-lg leading-relaxed italic">Producing soldiers of Christ.</p>
                <p className="text-gray-700 text-lg leading-relaxed italic">Education for our great future</p>
                <p className="text-gray-700 text-lg leading-relaxed italic">Uganda will rise and shine.</p>
                <p className="text-gray-700 text-lg leading-relaxed italic font-semibold">Seeta High School, raise your banners,</p>
                <p className="text-gray-700 text-lg leading-relaxed italic font-semibold">Lift your plight above all.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values in Action Section */}
      <section ref={coreValuesRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Values in Action
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              How our core principles translate into everyday excellence and student success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="value-item group">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl border border-blue-200/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-blue-600 mb-4">Academic Excellence</h3>
                <p className="text-gray-700 leading-relaxed">
                  Fostering intellectual curiosity and critical thinking through innovative teaching methodologies and comprehensive curricula.
                </p>
              </div>
            </div>

            <div className="value-item group">
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-2xl border border-green-200/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-green-600 mb-4">Character Building</h3>
                <p className="text-gray-700 leading-relaxed">
                  Nurturing integrity, empathy, and moral values to develop well-rounded individuals who contribute positively to society.
                </p>
              </div>
            </div>

            <div className="value-item group">
              <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-8 rounded-2xl border border-purple-200/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-purple-600 mb-4">Community Service</h3>
                <p className="text-gray-700 leading-relaxed">
                  Encouraging active participation in community development and social responsibility initiatives.
                </p>
              </div>
            </div>

            <div className="value-item group">
              <div className="bg-gradient-to-br from-orange-50 to-red-100 p-8 rounded-2xl border border-orange-200/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-orange-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-orange-600 mb-4">Innovation</h3>
                <p className="text-gray-700 leading-relaxed">
                  Embracing creativity and technological advancement to prepare students for the future workforce.
                </p>
              </div>
            </div>

            <div className="value-item group">
              <div className="bg-gradient-to-br from-teal-50 to-cyan-100 p-8 rounded-2xl border border-teal-200/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-teal-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-teal-600 mb-4">Global Perspective</h3>
                <p className="text-gray-700 leading-relaxed">
                  Developing international awareness and cross-cultural understanding in our interconnected world.
                </p>
              </div>
            </div>

            <div className="value-item group">
              <div className="bg-gradient-to-br from-yellow-50 to-amber-100 p-8 rounded-2xl border border-yellow-200/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-yellow-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-yellow-600 mb-4">Leadership Excellence</h3>
                <p className="text-gray-700 leading-relaxed">
                  Cultivating leadership skills and empowering students to become confident, responsible leaders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Message Section */}
      <section ref={leadershipRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 to-purple-50 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Leadership Message
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Words of wisdom and guidance from our school leadership
            </p>
          </div>

          <div className="leadership-content bg-white/80 backdrop-blur-sm p-12 rounded-3xl shadow-xl border border-indigo-200/50">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-indigo-200 shadow-lg">
                <img 
                  src={principal} 
                  alt="School Principal" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-indigo-600 mb-4">Principal's Message</h3>
                <p className="text-gray-700 leading-relaxed text-lg mb-6">
                  Welcome to Seeta High School, where excellence meets opportunity. Our commitment to academic excellence, character development, and holistic education creates an environment where students can thrive and reach their full potential.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  We believe in nurturing not just academic success, but also the development of strong moral values, leadership skills, and a global perspective. Our dedicated team of educators works tirelessly to ensure that every student receives the guidance and support they need to succeed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Statements;