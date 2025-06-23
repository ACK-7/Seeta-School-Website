import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { Book, Calculator, Globe, Beaker, Palette, Star, Download, ChevronDown, ChevronRight, Mail } from 'lucide-react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function CurriculumPage() {
  const [activeTab, setActiveTab] = useState('o-level');
  const [expandedAccordion, setExpandedAccordion] = useState(null);
  
  // Refs for animations
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const cardsRef = useRef(null);
  const subjectsRef = useRef(null);
  const galleryRef = useRef(null);
  const downloadsRef = useRef(null);
  const ctaRef = useRef(null);
  
  // Animation setup
  useEffect(() => {
    // Hero animations
    const heroTl = gsap.timeline();
    heroTl.fromTo(heroRef.current?.querySelector('h1'), 
      { opacity: 0, y: 30 },
      { duration: 1.2, opacity: 1, y: 0, ease: "power3.out" }
    );
    heroTl.fromTo(heroRef.current?.querySelector('p'),
      { opacity: 0, y: 20 },
      { duration: 1, opacity: 1, y: 0, ease: "power3.out" },
      "-=0.7"
    );

    // About section animations
    ScrollTrigger.create({
      trigger: aboutRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(aboutRef.current?.querySelector('.about-text'),
          { opacity: 0, x: 50 },
          { duration: 1, opacity: 1, x: 0, ease: "power3.out" }
        );
        gsap.fromTo(aboutRef.current?.querySelector('.about-image'),
          { opacity: 0, x: -50 },
          { duration: 1, opacity: 1, x: 0, ease: "power3.out", delay: 0.3 }
        );
      }
    });

    // Cards animations
    ScrollTrigger.create({
      trigger: cardsRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(cardsRef.current?.querySelectorAll('.curriculum-card'),
          { opacity: 0, y: 30, scale: 0.9 },
          { 
            duration: 0.8, 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            stagger: 0.2, 
            ease: "back.out(1.5)" 
          }
        );
      }
    });

    // Subjects animations
    ScrollTrigger.create({
      trigger: subjectsRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(subjectsRef.current?.querySelectorAll('.tab-button'),
          { opacity: 0, y: 20 },
          { duration: 0.5, opacity: 1, y: 0, stagger: 0.1, ease: "power2.out" }
        );
        gsap.fromTo(subjectsRef.current?.querySelectorAll('.subject-item'),
          { opacity: 0, x: -20 },
          { duration: 0.5, opacity: 1, x: 0, stagger: 0.1, ease: "power2.out", delay: 0.3 }
        );
      }
    });

    // Gallery animations
    ScrollTrigger.create({
      trigger: galleryRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(galleryRef.current?.querySelectorAll('.gallery-image'),
          { opacity: 0, scale: 0.8 },
          { duration: 0.8, opacity: 1, scale: 1, stagger: 0.15, ease: "power3.out" }
        );
      }
    });

    // Downloads animations
    ScrollTrigger.create({
      trigger: downloadsRef.current,
      start: "top 85%",
      onEnter: () => {
        gsap.fromTo(downloadsRef.current?.querySelectorAll('button'),
          { opacity: 0, y: 20, scale: 0.95 },
          { duration: 0.7, opacity: 1, y: 0, scale: 1, stagger: 0.2, ease: "back.out(1.7)" }
        );
      }
    });

    // CTA animations
    if (ctaRef.current) {
      ScrollTrigger.create({
        trigger: ctaRef.current,
        start: "top 90%",
        onEnter: () => {
          gsap.fromTo(ctaRef.current,
            { opacity: 0, y: 10 },
            { duration: 0.8, opacity: 1, y: 0, ease: "power2.out" }
          );
        }
      });
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const toggleAccordion = (id) => {
    setExpandedAccordion(expandedAccordion === id ? null : id);
  };

  // O-Level Subjects
  const oLevelSubjects = [
    { name: "English Language", icon: <Book size={20} /> },
    { name: "Mathematics", icon: <Calculator size={20} /> },
    { name: "Physics", icon: <Beaker size={20} /> },
    { name: "Chemistry", icon: <Beaker size={20} /> },
    { name: "Biology", icon: <Beaker size={20} /> },
    { name: "Geography", icon: <Globe size={20} /> },
    { name: "History", icon: <Book size={20} /> },
    { name: "Christian Religious Education", icon: <Book size={20} /> },
    { name: "Commerce", icon: <Calculator size={20} /> },
    { name: "Computer Studies", icon: <Calculator size={20} /> },
    { name: "Agriculture", icon: <Palette size={20} /> },
    { name: "Fine Art", icon: <Palette size={20} /> }
  ];

  // A-Level Subjects
  const aLevelSubjects = {
    arts: [
      { name: "HEG (History, Economics, Geography)", icon: <Book size={20} /> },
      { name: "HEL (History, Economics, Literature)", icon: <Book size={20} /> },
      { name: "HLD (History, Literature, Divinity)", icon: <Book size={20} /> }
    ],
    sciences: [
      { name: "PCB (Physics, Chemistry, Biology)", icon: <Beaker size={20} /> },
      { name: "PCM (Physics, Chemistry, Mathematics)", icon: <Beaker size={20} /> },
      { name: "BCM (Biology, Chemistry, Mathematics)", icon: <Beaker size={20} /> }
    ],
    subsidiaries: [
      { name: "General Paper (GP)", icon: <Star size={20} /> },
      { name: "Subsidiary ICT", icon: <Calculator size={20} /> },
      { name: "Subsidiary Mathematics", icon: <Calculator size={20} /> }
    ]
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header / Hero Section */}
      {/* <section 
        ref={heroRef}
        className="relative h-96 flex items-center justify-center text-white text-center px-4"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url('/api/placeholder/1200/500')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Curriculum</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Delivering quality, competency-based education under the Ugandan National Curriculum.
          </p>
        </div>
      </section> */}

      {/* About Our Curriculum */}
      <section ref={aboutRef} className="py-16 px-4 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="about-image md:w-1/2">
            <img 
              src="/api/placeholder/600/400" 
              alt="Students in classroom" 
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
          <div className="about-text md:w-1/2">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">About Our Curriculum</h2>
            <p className="text-gray-700 mb-4">
              Our school proudly follows the guidelines established by the Uganda National Examinations Board (UNEB), 
              offering a comprehensive educational journey for all our students.
            </p>
            <p className="text-gray-700 mb-4">
              We provide three key educational levels:
            </p>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>O-Level (UCE) – Senior 1 to 4</li>
              <li>A-Level (UACE) – Senior 5 to 6</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Our curriculum focuses on holistic development, preparing students not just for exams but for life beyond school.
            </p>
          </div>
        </div>
      </section>

      {/* Curriculum Structure Cards */}
      <section ref={cardsRef} className="py-16 px-4 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Curriculum Structure</h2>
          <div className="grid grid-cols-2 gap-8">

            {/* O-Level Card */}
            <div className="curriculum-card bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="flex flex-col md:flex-row h-full">
                <div className="md:w-1/2">
                  <img 
                    src="/api/placeholder/400/300" 
                    alt="O-Level Studies" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-1/2">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">O-Level (UCE)</h3>
                  <p className="text-gray-600">
                    Our comprehensive four-year program (Senior 1-4) covers core and elective subjects,
                    culminating in the Uganda Certificate of Education examinations.
                  </p>
                </div>
              </div>
            </div>

            {/* A-Level Card */}
            <div className="curriculum-card bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="flex flex-col md:flex-row h-full">
                <div className="md:w-1/2">
                  <img 
                    src="/api/placeholder/400/300" 
                    alt="A-Level Studies" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-1/2">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">A-Level (UACE)</h3>
                  <p className="text-gray-600">
                    Our two-year advanced program (Senior 5-6) offers specialized subject combinations 
                    preparing students for university and professional careers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects Offered */}
      <section ref={subjectsRef} className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Subjects Offered</h2>
        
        {/* Tabs for Desktop */}
        <div className="hidden md:flex mb-8 border-b border-gray-200">
          <button
            className={`tab-button px-6 py-3 font-medium text-sm ${activeTab === 'o-level' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('o-level')}
          >
            O-Level Subjects
          </button>
          <button
            className={`tab-button px-6 py-3 font-medium text-sm ${activeTab === 'a-level' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('a-level')}
          >
            A-Level Subjects
          </button>
        </div>

        {/* Accordion for Mobile */}
        <div className="md:hidden mb-6 space-y-3">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100"
              onClick={() => toggleAccordion('o-level')}
            >
              <span className="font-medium">O-Level Subjects</span>
              {expandedAccordion === 'o-level' ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </button>
            {expandedAccordion === 'o-level' && (
              <div className="p-4 bg-white">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {oLevelSubjects.map((subject, idx) => (
                    <div key={idx} className="subject-item flex items-center p-2 rounded bg-gray-50">
                      <span className="mr-2 text-blue-600">{subject.icon}</span>
                      <span>{subject.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100"
              onClick={() => toggleAccordion('a-level')}
            >
              <span className="font-medium">A-Level Subjects</span>
              {expandedAccordion === 'a-level' ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </button>
            {expandedAccordion === 'a-level' && (
              <div className="p-4 bg-white space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Arts Combinations</h4>
                  {aLevelSubjects.arts.map((subject, idx) => (
                    <div key={idx} className="subject-item flex items-center p-2 rounded bg-gray-50 mb-2">
                      <span className="mr-2 text-purple-600">{subject.icon}</span>
                      <span>{subject.name}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="font-medium mb-2">Science Combinations</h4>
                  {aLevelSubjects.sciences.map((subject, idx) => (
                    <div key={idx} className="subject-item flex items-center p-2 rounded bg-gray-50 mb-2">
                      <span className="mr-2 text-green-600">{subject.icon}</span>
                      <span>{subject.name}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="font-medium mb-2">Subsidiaries</h4>
                  {aLevelSubjects.subsidiaries.map((subject, idx) => (
                    <div key={idx} className="subject-item flex items-center p-2 rounded bg-gray-50 mb-2">
                      <span className="mr-2 text-blue-600">{subject.icon}</span>
                      <span>{subject.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tab Content for Desktop */}
        <div className="hidden md:block">
          {activeTab === 'o-level' && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-medium mb-6 text-gray-800">O-Level Curriculum</h3>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {oLevelSubjects.map((subject, idx) => (
                  <div key={idx} className="subject-item flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <span className="mr-3 text-blue-600">{subject.icon}</span>
                    <span>{subject.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'a-level' && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-medium mb-6 text-gray-800">A-Level Curriculum</h3>
              
              <div className="mb-8">
                <h4 className="text-lg font-medium mb-4 text-gray-700">Arts Combinations</h4>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {aLevelSubjects.arts.map((subject, idx) => (
                    <div key={idx} className="subject-item flex items-center p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors">
                      <span className="mr-3 text-purple-600">{subject.icon}</span>
                      <span>{subject.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-8">
                <h4 className="text-lg font-medium mb-4 text-gray-700">Science Combinations</h4>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {aLevelSubjects.sciences.map((subject, idx) => (
                    <div key={idx} className="subject-item flex items-center p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
                      <span className="mr-3 text-green-600">{subject.icon}</span>
                      <span>{subject.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-medium mb-4 text-gray-700">Subsidiaries</h4>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {aLevelSubjects.subsidiaries.map((subject, idx) => (
                    <div key={idx} className="subject-item flex items-center p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
                      <span className="mr-3 text-blue-600">{subject.icon}</span>
                      <span>{subject.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Visual Gallery */}
      <section ref={galleryRef} className="py-16 px-4 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Learning in Action</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="gallery-image overflow-hidden rounded-lg shadow-lg transition duration-300 hover:shadow-xl hover:scale-105">
              <img 
                src="/api/placeholder/400/300" 
                alt="Science lab experiment" 
                className="w-full h-64 object-cover"
              />
              <div className="p-4 bg-white">
                <p className="font-medium text-gray-800">Science Lab Experiments</p>
              </div>
            </div>
            <div className="gallery-image overflow-hidden rounded-lg shadow-lg transition duration-300 hover:shadow-xl hover:scale-105">
              <img 
                src="/api/placeholder/400/300" 
                alt="Library study session" 
                className="w-full h-64 object-cover"
              />
              <div className="p-4 bg-white">
                <p className="font-medium text-gray-800">Library Resources</p>
              </div>
            </div>
            <div className="gallery-image overflow-hidden rounded-lg shadow-lg transition duration-300 hover:shadow-xl hover:scale-105">
              <img 
                src="/api/placeholder/400/300" 
                alt="ICT lab session" 
                className="w-full h-64 object-cover"
              />
              <div className="p-4 bg-white">
                <p className="font-medium text-gray-800">ICT Practical Sessions</p>
              </div>
            </div>
            <div className="gallery-image overflow-hidden rounded-lg shadow-lg transition duration-300 hover:shadow-xl hover:scale-105">
              <img 
                src="/api/placeholder/400/300" 
                alt="Art class" 
                className="w-full h-64 object-cover"
              />
              <div className="p-4 bg-white">
                <p className="font-medium text-gray-800">Art & Creative Projects</p>
              </div>
            </div>
            <div className="gallery-image overflow-hidden rounded-lg shadow-lg transition duration-300 hover:shadow-xl hover:scale-105">
              <img 
                src="/api/placeholder/400/300" 
                alt="Agriculture practical" 
                className="w-full h-64 object-cover"
              />
              <div className="p-4 bg-white">
                <p className="font-medium text-gray-800">Agriculture Practicals</p>
              </div>
            </div>
            <div className="gallery-image overflow-hidden rounded-lg shadow-lg transition duration-300 hover:shadow-xl hover:scale-105">
              <img 
                src="/api/placeholder/400/300" 
                alt="Group discussion" 
                className="w-full h-64 object-cover"
              />
              <div className="p-4 bg-white">
                <p className="font-medium text-gray-800">Collaborative Learning</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum PDF Downloads */}
      <section ref={downloadsRef} className="py-16 px-4 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Download Curriculum Details</h2>
        <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
          Access detailed information about our curriculum, subject requirements, and assessment methods.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow transition-all duration-300 hover:shadow-lg transform hover:scale-105 active:scale-95">
            <Download size={20} className="mr-2" />
            Download O-Level Curriculum (PDF)
          </button>
          <button className="flex items-center bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg shadow transition-all duration-300 hover:shadow-lg transform hover:scale-105 active:scale-95">
            <Download size={20} className="mr-2" />
            Download A-Level Curriculum (PDF)
          </button>
        </div>
      </section>

      {/* Call to Action */}
      <section ref={ctaRef} className="py-12 px-4 bg-gray-100 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-700 mb-4">
            Have questions about the curriculum? Reach out to our academic office.
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <Mail size={16} className="mr-2" />
            Contact Academic Office
          </a>
        </div>
      </section>
    </div>
  );
}