import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ApplyNow = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ".feature-card",
      { opacity: 0, y: 50 },
      {
        opacity: 2,
        y: 50,
        duration: 1,
        delay: 0.7,
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        onComplete: () => {
          document.querySelectorAll('.feature-card').forEach(el => el.classList.remove('animate-hidden'));
        }
      }
    );

    gsap.fromTo(
      ".timeline-item",
      { opacity: 0, scale: 0.7 },
      {
        opacity: 2,
        scale: 1,
        duration: 1,
        delay: 0.7,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".timeline-section",
          start: "top 80%",
        },
        onComplete: () => {
          document.querySelectorAll('.timeline-item').forEach(el => el.classList.remove('animate-hidden'));
        }
      }
    );

    gsap.fromTo(
      ".timeline-image",
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        delay: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".timeline-section",
          start: "top 80%",
        },
        onComplete: () => {
          document.querySelectorAll('.timeline-image').forEach(el => el.classList.remove('animate-hidden'));
        }
      }
    );
  }, []);

  return (
    <div className="text-gray-800">
      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-blue-50 via-white to-white" ref={sectionRef}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎓",
                title: "Quality Education",
                text: "World-class education with experienced faculty and modern facilities.",
              },
              {
                icon: "🌍",
                title: "Diverse Community",
                text: "Join a vibrant community of learners from diverse backgrounds.",
              },
              {
                icon: "💻",
                title: "Modern Facilities",
                text: "Access state-of-the-art resources for optimal learning.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="feature-card animate-hidden bg-white p-8 rounded-2xl shadow-lg text-center border border-blue-100 hover:shadow-2xl transition-all duration-300"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-2 text-blue-900">{feature.title}</h3>
                <p className="text-gray-600 text-base">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-16 bg-blue-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-blue-900">Download Application Forms</h2>
          <p className="mb-10 text-lg text-gray-700">
            Select your level and download the appropriate application form below.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <a
              href="src/assets/Application_form_O-level.pdf"
              download
              className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow hover:bg-blue-700 transition"
            >
              Download O-Level Form
            </a>
            <a
              href="src/assets/Application_form_A-level.pdf"
              download
              className="bg-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow hover:bg-green-700 transition"
            >
              Download A-Level Form
            </a>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section py-16 bg-gradient-to-t from-blue-50 via-white to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-900">Application Process</h2>
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-8">
              {[
                "Submit Application",
                "Application Review",
                "Interview",
                "Final Decision",
              ].map((step, idx) => (
                <div key={idx} className="timeline-item animate-hidden bg-white p-8 rounded-xl shadow-lg border border-blue-100">
                  <h4 className="text-xl font-semibold mb-2 text-blue-800">{idx + 1}. {step}</h4>
                  <p className="text-gray-700">
                    {
                      [
                        "Fill out the application and attach required documents.",
                        "Our admissions team will review it within 5–7 working days.",
                        "You may be invited for an interview or assessment.",
                        "Successful candidates receive an offer letter within 3 days.",
                      ][idx]
                    }
                  </p>
                </div>
              ))}
            </div>
            <div className="timeline-image animate-hidden flex-1 flex justify-center items-center">
              <img
                src="src/assets/application.jpg"
                alt="Application Process"
                className="rounded-2xl shadow-lg h-[600px] object-cover border-4 border-blue-200"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApplyNow;
