import React, { useEffect, useRef } from 'react';
import { Calendar, Clock, BookOpen, GraduationCap, Users, Star, ChevronRight, MapPin } from 'lucide-react';

// Current Term Events Component
const CurrentTermEvents = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;

    // GSAP Animation
    if (typeof window !== 'undefined' && window.gsap) {
      const tl = window.gsap.timeline({ delay: 0.2 });
      
      tl.fromTo(section.querySelector('.section-header'), 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );

      cards.forEach((card, index) => {
        if (card) {
          tl.fromTo(card,
            { opacity: 0, y: 30, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power2.out' },
            `-=${0.4 - index * 0.1}`
          );
        }
      });
    }
  }, []);

  const currentTermEvents = [
    {
      title: "Mid-Term Examinations",
      date: "June 15-22, 2025",
      time: "8:00 AM - 4:00 PM",
      type: "Academic",
      priority: "high",
      description: "Comprehensive examinations for all subjects across S1-S6"
    },
    {
      title: "Inter-House Sports Day",
      date: "June 28, 2025",
      time: "9:00 AM - 5:00 PM",
      type: "Sports",
      priority: "medium",
      description: "Annual athletics competition between school houses"
    },
    {
      title: "Parent-Teacher Conference",
      date: "July 5, 2025",
      time: "2:00 PM - 6:00 PM",
      type: "Meeting",
      priority: "high",
      description: "Individual meetings to discuss student progress"
    },
    {
      title: "Science Fair Exhibition",
      date: "July 12, 2025",
      time: "10:00 AM - 3:00 PM",
      type: "Academic",
      priority: "medium",
      description: "Student projects and experiments showcase"
    },
    {
      title: "End of Term Closing",
      date: "July 19, 2025",
      time: "12:00 PM",
      type: "Administrative",
      priority: "high",
      description: "Term closing ceremony and holiday commencement"
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Academic': return <BookOpen className="w-5 h-5" />;
      case 'Sports': return <Users className="w-5 h-5" />;
      case 'Meeting': return <GraduationCap className="w-5 h-5" />;
      default: return <Calendar className="w-5 h-5" />;
    }
  };

  return (
    <section ref={sectionRef} className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="section-header text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Current Term Events</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay updated with important dates and events happening this term
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Event</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Time</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentTermEvents.map((event, index) => (
                  <tr
                    key={index}
                    ref={el => cardsRef.current[index] = el}
                    className="group hover:bg-blue-50 transition-all duration-300 cursor-pointer"
                  >
                    <td className="px-6 py-6">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                          {getTypeIcon(event.type)}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                            {event.title}
                          </h3>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-blue-500" />
                        <span className="font-medium text-gray-700">{event.date}</span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <span className="font-medium text-gray-700">{event.time}</span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium group-hover:bg-blue-100 group-hover:text-blue-800 transition-all duration-300">
                        {event.type}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${getPriorityColor(event.priority)}`}></div>
                        <span className="text-sm font-medium text-gray-600 capitalize">{event.priority}</span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                        {event.description}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Table Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>High Priority</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span>Medium Priority</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Low Priority</span>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {currentTermEvents.length} events scheduled this term
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Academic Calendar Component
const AcademicCalendar = () => {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const items = itemsRef.current;

    if (typeof window !== 'undefined' && window.gsap) {
      const tl = window.gsap.timeline({ 
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
        }
      });

      tl.fromTo(section.querySelector('.section-header'),
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );

      items.forEach((item, index) => {
        if (item) {
          tl.fromTo(item,
            { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
            { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' },
            `-=${0.3}`
          );
        }
      });
    }
  }, []);

  const academicTerms = [
    {
      term: "First Term 2025",
      startDate: "February 3, 2025",
      endDate: "May 16, 2025",
      status: "completed",
      highlights: ["Opening Ceremony", "Mock Examinations", "Cultural Day"]
    },
    {
      term: "Second Term 2025",
      startDate: "June 2, 2025",
      endDate: "August 22, 2025",
      status: "current",
      highlights: ["Mid-Term Exams", "Sports Day", "Science Fair"]
    },
    {
      term: "Third Term 2025",
      startDate: "September 8, 2025",
      endDate: "December 12, 2025",
      status: "upcoming",
      highlights: ["Final Examinations", "Graduation", "Prize Giving"]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'current': return 'bg-blue-500';
      case 'upcoming': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-50 border-green-200';
      case 'current': return 'bg-blue-50 border-blue-200';
      case 'upcoming': return 'bg-gray-50 border-gray-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <section ref={sectionRef} className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="section-header text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mb-6">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Academic Calendar 2025</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Complete overview of academic terms and important dates throughout the year
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-0.5 w-1 h-full bg-gradient-to-b from-purple-200 via-blue-200 to-gray-200 rounded-full"></div>
          
          {academicTerms.map((term, index) => (
            <div
              key={index}
              ref={el => itemsRef.current[index] = el}
              className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} mb-16`}
            >
              {/* Timeline Dot */}
              <div className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 ${getStatusColor(term.status)} rounded-full border-4 border-white shadow-lg z-10`}></div>
              
              {/* Content Card */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                <div className={`${getStatusBg(term.status)} rounded-2xl p-8 border-2 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105`}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-800">{term.term}</h3>
                    <span className={`px-4 py-2 ${getStatusColor(term.status)} text-white rounded-full text-sm font-medium capitalize`}>
                      {term.status}
                    </span>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700 font-medium">Start: {term.startDate}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-gray-700 font-medium">End: {term.endDate}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Key Highlights</h4>
                    <div className="space-y-2">
                      {term.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-gray-600">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Important Notices Component
const ImportantNotices = () => {
  const sectionRef = useRef(null);
  const noticesRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const notices = noticesRef.current;

    if (typeof window !== 'undefined' && window.gsap) {
      const tl = window.gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
        }
      });

      tl.fromTo(section.querySelector('.section-header'),
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );

      notices.forEach((notice, index) => {
        if (notice) {
          tl.fromTo(notice,
            { opacity: 0, y: 30, rotateY: 10 },
            { opacity: 1, y: 0, rotateY: 0, duration: 0.6, ease: 'power2.out' },
            `-=${0.2}`
          );
        }
      });
    }
  }, []);

  const notices = [
    {
      title: "School Fees Payment Deadline",
      content: "Reminder: All school fees for the second term must be paid by June 10, 2025. Late payment will incur additional charges.",
      type: "Finance",
      urgency: "high",
      date: "May 28, 2025",
      location: "Accounts Office"
    },
    {
      title: "New Uniform Requirements",
      content: "Starting next term, all students are required to wear the updated school uniform. Please visit the school shop for details.",
      type: "Administrative",
      urgency: "medium",
      date: "May 25, 2025",
      location: "Administration Block"
    },
    {
      title: "Library Extended Hours",
      content: "The school library will now be open until 8:00 PM on weekdays to accommodate evening study sessions.",
      type: "Academic",
      urgency: "low",
      date: "May 20, 2025",
      location: "Main Library"
    },
    {
      title: "Health Screening Exercise",
      content: "Mandatory health screening for all students will be conducted from June 3-7, 2025. Please bring your health cards.",
      type: "Health",
      urgency: "high",
      date: "May 30, 2025",
      location: "School Clinic"
    }
  ];

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-blue-500 bg-blue-50';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Finance': return 'bg-green-100 text-green-800';
      case 'Administrative': return 'bg-blue-100 text-blue-800';
      case 'Academic': return 'bg-purple-100 text-purple-800';
      case 'Health': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section ref={sectionRef} className="py-16 bg-gradient-to-br from-gray-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="section-header text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl mb-6">
            <Clock className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Important Notices</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay informed with the latest announcements and important updates from school administration
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {notices.map((notice, index) => (
            <div
              key={index}
              ref={el => noticesRef.current[index] = el}
              className={`${getUrgencyColor(notice.urgency)} rounded-2xl border-l-4 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden group cursor-pointer transform hover:-translate-y-2`}
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {notice.title}
                    </h3>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(notice.type)}`}>
                      {notice.type}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 mb-1">{notice.date}</div>
                    <div className="flex items-center space-x-1 text-gray-400">
                      <MapPin className="w-3 h-3" />
                      <span className="text-xs">{notice.location}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mb-6">
                  {notice.content}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-blue-500' : i === 1 ? 'bg-blue-300' : 'bg-gray-300'}`}
                      ></div>
                    ))}
                  </div>
                  <div className="flex items-center space-x-2 text-blue-600 font-medium text-sm group-hover:text-blue-700 transition-colors duration-300">
                    <span>Read More</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Main Calendar Page Component
const SchoolCalendarPage = () => {
  useEffect(() => {
    // Load GSAP and ScrollTrigger
    const loadGSAP = () => {
      if (typeof window !== 'undefined') {
        const script1 = document.createElement('script');
        script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
        script1.async = true;
        document.head.appendChild(script1);

        script1.onload = () => {
          const script2 = document.createElement('script');
          script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
          script2.async = true;
          document.head.appendChild(script2);

          script2.onload = () => {
            if (window.gsap) {
              window.gsap.registerPlugin(window.ScrollTrigger);
            }
          };
        };
      }
    };

    loadGSAP();

    return () => {
      // Cleanup scripts
      const scripts = document.querySelectorAll('script[src*="gsap"]');
      scripts.forEach(script => script.remove());
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <CurrentTermEvents />
      <AcademicCalendar />
      <ImportantNotices />
    </div>
  );
};

export default SchoolCalendarPage;