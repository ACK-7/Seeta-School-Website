import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { gsap } from 'gsap';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);
  const { isAuthenticated, logout } = useAuth ? useAuth() : { isAuthenticated: false, logout: () => {} };
  const navigate = useNavigate ? useNavigate() : () => {};
  
  // Refs for animations
  const logoRef = useRef(null);
  const shsTextRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
      if (window.innerWidth > 992) {
        setIsOpen(false);
        setActiveDropdown(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // GSAP Animations
  useEffect(() => {
    // Logo pulse and scale animation
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        scale: 1.3,
        duration: 1.5,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        transformOrigin: "center center"
      });

      // Add a subtle pulse effect
      gsap.to(logoRef.current, {
        opacity: 0.8,
        duration: 2,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true
      });
    }

    // SHS text floating and glowing animation
    if (shsTextRef.current) {
      // Floating animation
      gsap.to(shsTextRef.current, {
        y: -8,
        duration: 2.5,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true
      });

      // Glowing effect using text-shadow
      gsap.to(shsTextRef.current, {
        textShadow: "0 0 20px rgba(218, 165, 32, 0.8), 0 0 30px rgba(218, 165, 32, 0.6), 0 0 40px rgba(218, 165, 32, 0.4)",
        duration: 2,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true
      });

      // Additional color pulse for the glow
      gsap.to(shsTextRef.current, {
        color: "#DAA520",
        duration: 3,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true
      });
    }
  }, []);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setActiveDropdown(null);
    }
  };

  const toggleDropdown = (index) => {
    // Only toggle dropdown in mobile view
    if (isMobile) {
      setActiveDropdown(activeDropdown === index ? null : index);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Close mobile menu when clicking on links
  const handleLinkClick = () => {
    if (isMobile) {
      setIsOpen(false);
      setActiveDropdown(null);
    }
  };

  return (
    <nav className={`fixed z-50 w-full top-0 left-0 py-3 px-4 sm:px-6 lg:px-8 transition-all duration-300 ease-in-out ${scrolled ? 'backdrop-blur-md bg-black/80' : 'bg-transparent'}`}>
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 z-50 no-underline" onClick={handleLinkClick}>
          <img 
            ref={logoRef}
            src="./src/assets/schoolbadge.png" 
            alt="Badge" 
            className="w-[50px] sm:w-[60px] h-auto" 
          />
          <span 
            ref={shsTextRef}
            className="text-[20px] sm:text-[25px] text-white font-sans font-bold"
            style={{ 
              textShadow: "0 0 10px rgba(218, 165, 32, 0.3)",
              transition: "all 0.3s ease"
            }}
          >
            SHS
          </span>
        </Link>
        
        {/* Mobile Menu Button - Fixed visibility issues */}
        <button 
          className={`${isMobile ? 'flex' : 'hidden'} flex-col justify-center items-center w-8 h-8 p-1 bg-transparent border border-white/20 rounded text-white cursor-pointer z-50 transition-all duration-300 hover:border-white/40 hover:bg-white/10`}
          type="button" 
          onClick={toggleNavbar}
          aria-expanded={isOpen ? "true" : "false"}
          aria-label="Toggle navigation"
        >
          {/* Hamburger icon with animation */}
          <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
          <div className={`w-5 h-0.5 bg-white mt-1 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-5 h-0.5 bg-white mt-1 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
        </button>
        
        {/* Navigation Menu */}
        <div className={`${isMobile ? 
          `fixed top-0 left-0 w-2/3 h-screen bg-black/95 backdrop-blur-md flex flex-col pt-20 pb-5 px-5 overflow-y-auto z-40 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}` : 
          'flex-1 flex items-center'
        }`}>
          
          {/* Main Navigation */}
          <ul className={`${isMobile ? 'flex flex-col w-full m-0 p-0 space-y-2' : 'ml-auto mr-4 flex flex-row items-center list-none pl-0'}`}>
            
            {/* Home */}
            <li className={`relative ${isMobile ? 'w-full' : ''}`}>
              <Link 
                className={`text-white font-medium transition-all duration-300 ease-in-out no-underline flex justify-between items-center hover:bg-white/10 rounded ${isMobile ? 'py-3 px-4 text-lg border-b border-white/10' : 'py-2 px-4'}`} 
                to="/"
                onClick={handleLinkClick}
              >
                Home
              </Link>
            </li>
            
            {/* About Us */}
            <li className={`relative ${isMobile ? 'w-full' : ''} group`}>
              <div className={`w-full ${isMobile ? '' : 'relative'}`}>
                <a 
                  className={`text-white font-medium transition-all duration-300 ease-in-out no-underline flex justify-between items-center hover:bg-white/10 rounded ${isMobile ? 'py-3 px-4 text-lg border-b border-white/10' : 'py-2 px-4'}`}
                  href="#" 
                  role="button"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDropdown(1);
                  }}
                >
                  About Us
                  <span className={`${isMobile ? 'inline-block' : 'hidden'} ml-2 text-sm transition-transform duration-200 ${activeDropdown === 1 ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </a>
              </div>
              
              {/* About Us Dropdown */}
              <div className={`
                ${isMobile ? 
                  `w-full bg-transparent transition-all duration-300 ease-in-out overflow-hidden ${activeDropdown === 1 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}` : 
                  'fixed left-1/2 -translate-x-1/2 w-[1000px] max-w-[90vw] mt-0 bg-white border-none rounded-none py-8 px-0 shadow-lg opacity-0 invisible pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto z-50'
                }
              `}>
                <div className={`${isMobile ? 'p-0' : 'max-w-6xl mx-auto grid grid-cols-[250px_1fr] gap-8 px-8'}`}>
                  <ul className={`list-none p-0 m-0 ${isMobile ? 'bg-white/10 ml-4 rounded' : ''}`}>
                    <li>
                      <Link 
                        to="/about" 
                        className={`block py-3 transition-all duration-300 ease-in-out no-underline ${isMobile ? 'text-white border-l-3 border-transparent px-4 hover:border-l-[#DAA520] hover:bg-white/5' : 'text-gray-600 border-l-[3px] border-transparent pl-4 hover:text-gray-800 hover:border-l-[#DAA520] hover:bg-gray-100'}`}
                        onClick={handleLinkClick}
                      >
                        About SHS
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/administration" 
                        className={`block py-3 transition-all duration-300 ease-in-out no-underline ${isMobile ? 'text-white border-l-3 border-transparent px-4 hover:border-l-[#DAA520] hover:bg-white/5' : 'text-gray-600 border-l-[3px] border-transparent pl-4 hover:text-gray-800 hover:border-l-[#DAA520] hover:bg-gray-100'}`}
                        onClick={handleLinkClick}
                      >
                        Administration
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/mission-vision" 
                        className={`block py-3 transition-all duration-300 ease-in-out no-underline ${isMobile ? 'text-white border-l-3 border-transparent px-4 hover:border-l-[#DAA520] hover:bg-white/5' : 'text-gray-600 border-l-[3px] border-transparent pl-4 hover:text-gray-800 hover:border-l-[#DAA520] hover:bg-gray-100'}`}
                        onClick={handleLinkClick}
                      >
                        Mission & Vision
                      </Link>
                    </li>
                  </ul>
                  <div className={`bg-gray-100 p-8 rounded-lg flex gap-5 ${isMobile ? 'hidden' : ''}`}>
                    <div>
                      <h2 className="text-[#003366] text-2xl font-bold mb-6 font-serif">About SHS</h2>
                      <p className="text-gray-600 text-[15px] leading-relaxed mb-8">
                        Seeta High schools' mission is to nurture holistic growth in our students, fostering a deep understanding and love for Christ while providing an exceptional academic foundation.
                      </p>
                    </div>
                    <div>
                      <img
                        src="src/assets/aboutus.png"
                        alt="About Us Image"
                        className="w-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </li>
            
            {/* Admissions */}
            <li className={`relative ${isMobile ? 'w-full' : ''} group`}>
              <div className={`w-full ${isMobile ? '' : 'relative'}`}>
                <a 
                  className={`text-white font-medium transition-all duration-300 ease-in-out no-underline flex justify-between items-center hover:bg-white/10 rounded ${isMobile ? 'py-3 px-4 text-lg border-b border-white/10' : 'py-2 px-4'}`}
                  href="#" 
                  role="button"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDropdown(2);
                  }}
                >
                  Admissions
                  <span className={`${isMobile ? 'inline-block' : 'hidden'} ml-2 text-sm transition-transform duration-200 ${activeDropdown === 2 ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </a>
              </div>
              
              {/* Admissions Dropdown */}
              <div className={`
                ${isMobile ? 
                  `w-full bg-transparent transition-all duration-300 ease-in-out overflow-hidden ${activeDropdown === 2 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}` : 
                  'fixed left-1/2 -translate-x-1/2 w-[1000px] max-w-[90vw] mt-0 bg-white border-none rounded-none py-8 px-0 shadow-lg opacity-0 invisible pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto z-50'
                }
              `}>
                <div className={`${isMobile ? 'p-0' : 'max-w-6xl mx-auto grid grid-cols-[250px_1fr] gap-8 px-8'}`}>
                  <ul className={`list-none p-0 m-0 ${isMobile ? 'bg-white/10 ml-4 rounded' : ''}`}>
                    <li>
                      <Link 
                        to="/apply" 
                        className={`block py-3 transition-all duration-300 ease-in-out no-underline ${isMobile ? 'text-white border-l-3 border-transparent px-4 hover:border-l-[#DAA520] hover:bg-white/5' : 'text-gray-600 border-l-[3px] border-transparent pl-4 hover:text-gray-800 hover:border-l-[#DAA520] hover:bg-gray-100'}`}
                        onClick={handleLinkClick}
                      >
                        Apply Now
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/admission-overview" 
                        className={`block py-3 transition-all duration-300 ease-in-out no-underline ${isMobile ? 'text-white border-l-3 border-transparent px-4 hover:border-l-[#DAA520] hover:bg-white/5' : 'text-gray-600 border-l-[3px] border-transparent pl-4 hover:text-gray-800 hover:border-l-[#DAA520] hover:bg-gray-100'}`}
                        onClick={handleLinkClick}
                      >
                        Admission Overview
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/fees-structure" 
                        className={`block py-3 transition-all duration-300 ease-in-out no-underline ${isMobile ? 'text-white border-l-3 border-transparent px-4 hover:border-l-[#DAA520] hover:bg-white/5' : 'text-gray-600 border-l-[3px] border-transparent pl-4 hover:text-gray-800 hover:border-l-[#DAA520] hover:bg-gray-100'}`}
                        onClick={handleLinkClick}
                      >
                        School Fees
                      </Link>
                    </li>
                  </ul>
                  <div className={`bg-gray-100 p-8 rounded-lg flex gap-5 ${isMobile ? 'hidden' : ''}`}>
                    <div>
                      <h2 className="text-[#003366] text-2xl font-bold mb-6 font-serif">ADMISSIONS</h2>
                      <p className="text-gray-600 text-[15px] leading-relaxed mb-8">
                        Join the Seeta Family! When you take part in on-campus tours, 
                        Venture for a Day experiences, and open houses, you will be able 
                        to discover what it means to be part of our extraordinary 
                        community and how we can assist you as you venture to become 
                        the very best version of yourself.
                      </p>
                    </div>
                    <div>
                      <img
                        src="src/assets/admission.png" 
                        alt="Admissions Image"
                        className="w-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </li>
            
            {/* Academics */}
            <li className={`relative ${isMobile ? 'w-full' : ''} group`}>
              <div className={`w-full ${isMobile ? '' : 'relative'}`}>
                <a 
                  className={`text-white font-medium transition-all duration-300 ease-in-out no-underline flex justify-between items-center hover:bg-white/10 rounded ${isMobile ? 'py-3 px-4 text-lg border-b border-white/10' : 'py-2 px-4'}`}
                  href="#" 
                  role="button"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDropdown(3);
                  }}
                >
                  Academics
                  <span className={`${isMobile ? 'inline-block' : 'hidden'} ml-2 text-sm transition-transform duration-200 ${activeDropdown === 3 ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </a>
              </div>
              
              {/* Academics Dropdown */}
              <div className={`
                ${isMobile ? 
                  `w-full bg-transparent transition-all duration-300 ease-in-out overflow-hidden ${activeDropdown === 3 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}` : 
                  'fixed left-1/2 -translate-x-1/2 w-[1000px] max-w-[90vw] mt-0 bg-white border-none rounded-none py-8 px-0 shadow-lg opacity-0 invisible pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto z-50'
                }
              `}>
                <div className={`${isMobile ? 'p-0' : 'max-w-6xl mx-auto grid grid-cols-[250px_1fr] gap-8 px-8'}`}>
                  <ul className={`list-none p-0 m-0 ${isMobile ? 'bg-white/10 ml-4 rounded' : ''}`}>
                    <li>
                      <Link 
                        to="/curriculum" 
                        className={`block py-3 transition-all duration-300 ease-in-out no-underline ${isMobile ? 'text-white border-l-3 border-transparent px-4 hover:border-l-[#DAA520] hover:bg-white/5' : 'text-gray-600 border-l-[3px] border-transparent pl-4 hover:text-gray-800 hover:border-l-[#DAA520] hover:bg-gray-100'}`}
                        onClick={handleLinkClick}
                      >
                        Curriculum
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/academic-calendar" 
                        className={`block py-3 transition-all duration-300 ease-in-out no-underline ${isMobile ? 'text-white border-l-3 border-transparent px-4 hover:border-l-[#DAA520] hover:bg-white/5' : 'text-gray-600 border-l-[3px] border-transparent pl-4 hover:text-gray-800 hover:border-l-[#DAA520] hover:bg-gray-100'}`}
                        onClick={handleLinkClick}
                      >
                        Academic Calendar
                      </Link>
                    </li>
                  </ul>
                  <div className={`bg-gray-100 p-8 rounded-lg flex gap-5 ${isMobile ? 'hidden' : ''}`}>
                    <div>
                      <h2 className="text-[#003366] text-2xl font-bold mb-6 font-serif">ACADEMICS</h2>
                      <p className="text-gray-600 text-[15px] leading-relaxed mb-8">
                        Experience excellence in education through our comprehensive 
                        academic programs. Our dedicated faculty and innovative curriculum 
                        are designed to challenge, inspire, and prepare you for success 
                        in your chosen field and beyond.
                      </p>
                    </div>
                    <div>
                      <img
                        src="src/assets/academics.png" 
                        alt="Academics Image"
                        className="w-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </li>
            
            {/* Student Life */}
            <li className={`relative ${isMobile ? 'w-full' : ''} group`}>
              <div className={`w-full ${isMobile ? '' : 'relative'}`}>
                <a 
                  className={`text-white font-medium transition-all duration-300 ease-in-out no-underline flex justify-between items-center hover:bg-white/10 rounded ${isMobile ? 'py-3 px-4 text-lg border-b border-white/10' : 'py-2 px-4'}`}
                  href="#" 
                  role="button"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDropdown(4);
                  }}
                >
                  Student Life
                  <span className={`${isMobile ? 'inline-block' : 'hidden'} ml-2 text-sm transition-transform duration-200 ${activeDropdown === 4 ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </a>
              </div>
              
              {/* Student Life Dropdown */}
              <div className={`
                ${isMobile ? 
                  `w-full bg-transparent transition-all duration-300 ease-in-out overflow-hidden ${activeDropdown === 4 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}` : 
                  'fixed left-1/2 -translate-x-1/2 w-[1000px] max-w-[90vw] mt-0 bg-white border-none rounded-none py-8 px-0 shadow-lg opacity-0 invisible pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto z-50'
                }
              `}>
                <div className={`${isMobile ? 'p-0' : 'max-w-6xl mx-auto grid grid-cols-[250px_1fr] gap-8 px-8'}`}>
                  <ul className={`list-none p-0 m-0 ${isMobile ? 'bg-white/10 ml-4 rounded' : ''}`}>
                    <li>
                      <Link 
                        to="/sports-athletics" 
                        className={`block py-3 transition-all duration-300 ease-in-out no-underline ${isMobile ? 'text-white border-l-3 border-transparent px-4 hover:border-l-[#DAA520] hover:bg-white/5' : 'text-gray-600 border-l-[3px] border-transparent pl-4 hover:text-gray-800 hover:border-l-[#DAA520] hover:bg-gray-100'}`}
                        onClick={handleLinkClick}
                      >
                        Sports & Athletics
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/student-clubs" 
                        className={`block py-3 transition-all duration-300 ease-in-out no-underline ${isMobile ? 'text-white border-l-3 border-transparent px-4 hover:border-l-[#DAA520] hover:bg-white/5' : 'text-gray-600 border-l-[3px] border-transparent pl-4 hover:text-gray-800 hover:border-l-[#DAA520] hover:bg-gray-100'}`}
                        onClick={handleLinkClick}
                      >
                        Clubs & Activities
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/gallery" 
                        className={`block py-3 transition-all duration-300 ease-in-out no-underline ${isMobile ? 'text-white border-l-3 border-transparent px-4 hover:border-l-[#DAA520] hover:bg-white/5' : 'text-gray-600 border-l-[3px] border-transparent pl-4 hover:text-gray-800 hover:border-l-[#DAA520] hover:bg-gray-100'}`}
                        onClick={handleLinkClick}
                      >
                        Gallery
                      </Link>
                    </li>
                  </ul>
                  <div className={`bg-gray-100 p-8 rounded-lg flex gap-5 ${isMobile ? 'hidden' : ''}`}>
                    <div>
                      <h2 className="text-[#003366] text-2xl font-bold mb-6 font-serif">STUDENT LIFE</h2>
                      <p className="text-gray-600 text-[15px] leading-relaxed mb-8">
                        Experience vibrant student life at Seeta. Our diverse clubs, exciting events, and supportive community offer opportunities to connect with peers, pursue your passions, and create lasting memories.
                      </p>
                    </div>
                    <div>
                      <img
                        src="src/assets/studentlife.png" 
                        alt="Student Life Image"
                        className="w-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </li>
            
            {/* Contact Us */}
            <li className={`relative ${isMobile ? 'w-full' : ''}`}>
              <Link 
                className={`text-white font-medium transition-all duration-300 ease-in-out no-underline flex justify-between items-center hover:bg-white/10 rounded ${isMobile ? 'py-3 px-4 text-lg border-b border-white/10' : 'py-2 px-4'}`} 
                to="/contact-us"
                onClick={handleLinkClick}
              >
                Contact Us
              </Link>
            </li>
          </ul>
          
          {/* Action Buttons */}
          <div className={`flex ${isMobile ? 'flex-col w-full mt-6 gap-3' : 'items-center gap-4'}`}>
            {!isAuthenticated ? (
              <>
                <Link
                  to="/apply"
                  className={`px-6 py-2 bg-[#d59f0f] text-white rounded border-none font-semibold transition-all duration-200 hover:bg-[#ecc74a] focus:outline-none text-center ${isMobile ? 'w-full' : ''}`}
                  style={{ boxShadow: 'none' }}
                  onClick={handleLinkClick}
                >
                  Apply Now
                </Link>
                <Link
                  to="/login"
                  className={`px-6 py-2 border-2 border-[#d59f0f] text-white bg-transparent rounded font-semibold transition-all duration-200 hover:bg-[#F9F9F950] focus:outline-none text-center ${isMobile ? 'w-full' : ''}`}
                  style={{ boxShadow: 'none' }}
                  onClick={handleLinkClick}
                >
                  Staff Login
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className={`px-5 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition text-center ${isMobile ? 'w-full' : 'ml-4'}`}
                  onClick={handleLinkClick}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className={`px-5 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition ${isMobile ? 'w-full' : 'ml-2'}`}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;