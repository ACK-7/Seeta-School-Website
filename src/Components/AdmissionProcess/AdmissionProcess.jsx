import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, Send, CreditCard, Eye, CheckCircle, Award, Users, BookOpen, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import image from "../../assets/quote.jpg";
import image1 from "../../assets/holistic.jpg";
import image2 from "../../assets/faculty.png";
import image3 from "../../assets/vibrant.jpg";
import image4 from "../../assets/ready.png";

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const AdmissionsProcess = () => {
  useEffect(() => {
    // Hero section animations with parallax
    gsap.fromTo(
      '.hero-title',
      { opacity: 0, scale: 0.8 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 1.2, 
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.hero-title',
          start: 'top 80%',
        }
      }
    );
    gsap.fromTo(
      '.hero-subtitle',
      { opacity: 0, scale: 0.8 },
      { 
        opacity: 1, 
        scale: 1,
        duration: 1.2, 
        delay: 0.4, 
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.hero-subtitle',
          start: 'top 80%',
        }
      }
    );
    gsap.fromTo(
      '.hero-image',
      { scale: 1.2, opacity: 0 },
      { 
        scale: 1, 
        opacity: 1, 
        duration: 2, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.hero-image',
          start: 'top 80%',
        }
      }
    );

    // Banner animation with scale and fade
    gsap.fromTo(
      '.banner-container',
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.banner-container',
          start: 'top 80%',
        },
      }
    );

    
    gsap.fromTo(
      '.process-item',
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.process-container',
          start: 'top 75%',
        },
      }
    );

    
    gsap.fromTo(
      '.process-image',
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.process-container',
          start: 'top 80%',
        },
      }
    );

    // Quote section with static background
    gsap.fromTo(
      '.quote-content',
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.quote-section',
          start: 'top 80%',
        },
      }
    );

    // Why Choose section cards animation
    gsap.fromTo(
      '.feature-card',
      { opacity: 0, scale: 0.8 },
      {
        opacity: 2,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.features-container',
          start: 'top 75%',
        },
      }
    );

    // Alert section animation
    gsap.fromTo(
      '.alert-section',
      { opacity: 0, scale: 0.8},
      {
        opacity: 1,
        scale: 1,
        delay: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.alert-section',
          start: 'top 80%',
        },
      }
    );

    // Alert image animation
    gsap.fromTo(
      '.alert-image',
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        delay: 0.4,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.alert-section',
          start: 'top 80%',
        },
      }
    );
  }, []);

  const processSteps = [
    { 
      text: 'Fill out the Request More Information form to receive application materials from our Admissions Office.',
      icon: FileText,
      color: 'text-blue-600'
    },
    { 
      text: 'Complete and submit the application form along with all required supporting documents.',
      icon: Send,
      color: 'text-green-600'
    },
    { 
      text: 'Pay the non-refundable application processing fee to proceed with your application.',
      icon: CreditCard,
      color: 'text-purple-600'
    },
    { 
      text: "Once all materials are received, your child's application will be reviewed and placed on the appropriate waiting list based on submission date.",
      icon: Eye,
      color: 'text-orange-600'
    },
    { 
      text: 'If a spot is available, provisional acceptance will be granted. Submit enrollment forms and deposit within 30 days to secure your place.',
      icon: CheckCircle,
      color: 'text-teal-600'
    },
    { 
      text: 'Upon receipt and review of enrollment forms and full deposit payment, final acceptance will be confirmed.',
      icon: Award,
      color: 'text-red-600'
    },
  ];

  return (
    <div className="bg-gray-50 font-sans">
      {/* Main Content */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-8">
            Prospective Students
          </h2>
          <p className="text-center text-gray-600 text-lg max-w-3xl mx-auto mb-12 leading-relaxed">
            Thank you for considering Seeta High School. Our admissions process is designed to be straightforward and supportive, ensuring every applicant has the opportunity to join our community. For inquiries, contact our Admissions Office at{' '}
            <a href="mailto:admissions@seeta.edu" className="text-blue-600 hover:underline font-medium">
              admissions@seeta.edu
            </a>.
          </p>

          <h3 className="text-3xl font-semibold text-center text-gray-800 mb-12">
            Our Admissions Process
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Process Steps */}
            <div className="process-container">
              {processSteps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div
                    key={index}
                    className="process-item flex items-start mb-6 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-[1.02]"
                  >
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mr-4 ${step.color}`}>
                      <IconComponent size={24} />
                    </div>
                    <div className="flex-1">
                      <span className="text-blue-600 font-bold text-xl mr-3">{index + 1}.</span>
                      <p className="text-gray-700 text-base leading-relaxed inline">{step.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Process Illustration */}
            <div className="process-image relative">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 shadow-xl">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen size={40} className="text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-2">Join Our Community</h4>
                  <p className="text-gray-600">Your journey to excellence starts here</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-white rounded-lg shadow-sm">
                    <Users size={20} className="text-blue-600 mr-3" />
                    <span className="text-gray-700">Supportive Learning Environment</span>
                  </div>
                  <div className="flex items-center p-3 bg-white rounded-lg shadow-sm">
                    <Heart size={20} className="text-red-500 mr-3" />
                    <span className="text-gray-700">Holistic Development Focus</span>
                  </div>
                  <div className="flex items-center p-3 bg-white rounded-lg shadow-sm">
                    <Award size={20} className="text-yellow-600 mr-3" />
                    <span className="text-gray-700">Academic Excellence</span>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <Link 
                    to="/apply"
                    className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300 shadow-md transform hover:scale-105 inline-block"
                  >
                    Start Your Application
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="quote-section relative py-20 bg-blue-100 overflow-hidden">
        <img
          src={image}
          alt="Inspirational school background with students"
          className="quote-image absolute inset-0 w-full h-full object-cover opacity-30 "
        />
        <div className="quote-content container mx-auto px-6 text-center relative z-10">
          <h3 className="text-3xl md:text-4xl font-semibold text-gray-800 italic mb-6">
            "Education is the most powerful weapon which you can use to change the world."
          </h3>
          <p className="text-gray-600 text-lg">— Nelson Mandela</p>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-semibold text-center text-gray-800 mb-12">
            Why Choose Seeta High School?
          </h3>
          <div className="features-container grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Holistic Education',
                text: 'Our curriculum integrates academic rigor with spiritual and personal growth, preparing students for success in all aspects of life.',
                img: image1,
              },
              {
                title: 'Dedicated Faculty',
                text: "Our experienced educators are committed to nurturing each student's unique talents and fostering a love for learning.",
                img: image2,
              },
              {
                title: 'Vibrant Community',
                text: 'Join a supportive community where students build lifelong friendships and engage in diverse extracurricular activities.',
                img: image3,
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="feature-card bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105"
              >
                <img
                  src={feature.img}
                  alt={feature.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h4 className="text-xl font-semibold text-blue-800 mb-4">{feature.title}</h4>
                <p className="text-gray-600">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alert Section */}
      <section className="alert-section py-20 bg-gradient-to-br from-gray-100 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Alert Content */}
            <div className="bg-white p-8 rounded-xl shadow-lg h-full">
              <h4 className="text-2xl font-semibold text-blue-800 mb-6 flex items-center">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-red-600 font-bold">!</span>
                </div>
                Important Notes for Applicants
              </h4>
              <div className="space-y-4">
                <div className="flex items-start p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
                  <FileText size={20} className="text-red-600 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">Submit results of a standardized achievement test from the last two years.</p>
                </div>
                <div className="flex items-start p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                  <BookOpen size={20} className="text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">Non-native English speakers must provide English Proficiency test results.</p>
                </div>
                <div className="flex items-start p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                  <Award size={20} className="text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">New high school students will take math and foreign language screening tests.</p>
                </div>
                <div className="flex items-start p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                  <Heart size={20} className="text-purple-600 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">Band and choir applicants must audition for enrollment.</p>
                </div>
              </div>
            </div>

            {/* Alert Image */}
            <div className="alert-image h-full">
              <div className="relative h-full">
                <img
                  src={image4}
                  alt="Students studying and preparing for applications"
                  className="w-full h-full object-cover rounded-xl shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h5 className="text-xl font-semibold mb-2">Ready to Apply?</h5>
                  <p className="text-sm opacity-90">Review all requirements carefully</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdmissionsProcess;