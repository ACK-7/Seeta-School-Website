import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Waves, Mic } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SchoolClubsPage = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const spotlightRef = useRef(null);
  const activitiesRef = useRef(null);
  const clubsListRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section animation
      gsap.fromTo(heroRef.current.children, 
        { 
          y: 50, 
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out"
        }
      );

      // Spotlight cards animation with scrub
      gsap.fromTo(".spotlight-card",
        {
          x: -50,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.3,
          scrollTrigger: {
            trigger: spotlightRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
            toggleActions: "play none none reverse"
          }
        }
      );

      // Activities section with scrub effect
      gsap.fromTo(".activity-image",
        {
          y: 100,
          opacity: 0,
          scale: 0.9
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: 0.2,
          scrollTrigger: {
            trigger: activitiesRef.current,
            start: "top 85%",
            end: "bottom 15%",
            scrub: 2
          }
        }
      );

      // Club list items animation
      gsap.fromTo(".club-item",
        {
          x: 30,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: clubsListRef.current,
            start: "top 90%",
            end: "bottom 10%",
            scrub: 1.5
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section ref={heroRef} className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Student-Led Clubs
              </h1>
              
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Student-led clubs offer students the chance to work together to pursue extracurricular 
                interests and assume leadership roles within their community.
              </p>
              
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                The clubs and organizations offered at Seeta High Schools reflect the interests and 
                passions of our students. They are able to create and lead clubs on any interest or topic 
                of their choice. Established clubs include chess, yearbook, gaming.
              </p>
              
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                There are also opportunities to be student ambassadors and teaching assistants. The 
                list of clubs available changes from year to year based on the interests and needs of 
                students.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                There are also opportunities to be student ambassadors and teaching assistants.
              </p>
            </div>
            
            <div className="relative">
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                <div className="aspect-[4/3] bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-16 h-16 text-blue-600" />
                </div>
                <div className="bg-blue-600 text-white p-4 rounded-lg text-center">
                  <p className="font-medium">
                    Clubs give students an opportunity to lead and collaborate in a low-stakes 
                    but high-reward environment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Club Spotlights */}
      <section ref={spotlightRef} className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Swimming Spotlight */}
          <div className="spotlight-card mb-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="bg-red-500 text-white inline-block px-4 py-2 rounded mb-4 font-bold">
                  CLUB SPOTLIGHT: SWIMMING
                </div>
                
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Seeta High School Swim Team is a team of young and aspiring athletes. The current season 
                  marks the team's continued dedication to competitive swimming. Hawks on training and a 
                  passion for the sport are encouraged at Seeta High School, and the swim team provides a 
                  platform for students to pursue their athletic goals beyond the classroom.
                </p>
                
                <p className="text-gray-700 mb-4 leading-relaxed">
                  The Seeta High School Swim Team aims to inspire and expose others to the sport of swimming, 
                  promoting healthy lifestyles and a love for aquatic activities. We hope to represent our school 
                  with pride at swim meets and share our experiences and knowledge with the broader school 
                  community.
                </p>
                
                <p className="text-gray-700 leading-relaxed">
                  One of the unique aspects of the Seeta High School Swim Team is its inclusive environment. 
                  While many competitive swim teams primarily focus on older students, we welcome swimmers 
                  of all ages and skill levels. The team provides opportunities for students to develop not only their 
                  swimming techniques but also crucial life skills such as critical thinking, problem-solving, 
                  teamwork, leadership, and sportsmanship.
                </p>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                <div className="aspect-[4/3] bg-blue-600 rounded-lg flex items-center justify-center">
                  <Waves className="w-20 h-20 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Speech and Debate Spotlight */}
          <div className="spotlight-card">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                  <div className="aspect-[4/3] bg-blue-600 rounded-lg flex items-center justify-center">
                    <Mic className="w-20 h-20 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="order-1 lg:order-2">
                <div className="bg-red-500 text-white inline-block px-4 py-2 rounded mb-4 font-bold">
                  CLUB SPOTLIGHT: SPEECH AND DEBATE
                </div>
                
                <p className="text-gray-700 leading-relaxed">
                  The Speech & Debate Team is a great place for members to practice confidence, critical thinking, 
                  and effective speaking skills in a positive, constructive, and inclusive environment. The team is 
                  comprised of all skill levels and provides student, teacher, and coach based instruction. The club 
                  is a ton of fun, with events like school-wide speech fairs with prizes, end of the term parties, and 
                  weekend tournaments at a variety of high schools and universities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Club Activities in Action */}
      <section ref={activitiesRef} className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Club Activities in Action
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="activity-image bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-[4/3] bg-gray-200 flex items-center justify-center">
                <Users className="w-16 h-16 text-gray-400" />
              </div>
            </div>
            <div className="activity-image bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-[4/3] bg-blue-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-blue-600 text-white px-4 py-2 rounded mb-2">Club Event</div>
                  <Users className="w-12 h-12 text-blue-600 mx-auto" />
                </div>
              </div>
            </div>
            <div className="activity-image bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-[4/3] bg-yellow-100 flex items-center justify-center">
                <Users className="w-16 h-16 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Clubs List */}
      <section ref={clubsListRef} className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="bg-blue-600 text-white inline-block px-6 py-3 rounded-full font-semibold mb-8">
                Clubs
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                Student Clubs
              </h2>
              
              <div className="space-y-4">
                {[
                  "Drama and Acting",
                  "Science Journal Club", 
                  "Entrepreneurship and Innovation",
                  "French Society",
                  "Leadership Team",
                  "Speech and Debate",
                  "Table Tennis",
                  "Yearbook",
                  "Math Club"
                ].map((club, index) => (
                  <div key={index} className="club-item flex items-center py-3 border-b border-gray-100">
                    <span className="text-lg text-gray-700">{club}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="aspect-[4/3] bg-white rounded-lg shadow-sm flex items-center justify-center">
                <Users className="w-20 h-20 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SchoolClubsPage;