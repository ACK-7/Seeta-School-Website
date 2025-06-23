import React, { useState, useEffect } from "react";

const Testimonials = [
  {
    id: 1,
    name: "Gabriella Irvin",
    classYear: "Class of '23",
    testimonial:
      "At Foley I can find support from my teachers, counselors or anyone in administration. I feel comfortable asking teachers for help or advice when I need it. Foley has really set me up for an excellent future and has helped me prepare for my future.",
    image: "src/assets/std1.jpg",
  },
  {
    id: 2,
    name: "Ethan Johnson",
    classYear: "Class of '24",
    testimonial:
      "The faculty at Foley are incredibly dedicated and passionate about teaching. They go above and beyond to ensure that every student succeeds. I've learned so much here and feel prepared for college.",
    image: "src/assets/std2.jpg",
  },
  {
    id: 3,
    name: "Sophia Lee",
    classYear: "Class of '25",
    testimonial:
      "Foley offers a wide range of extracurricular activities that have allowed me to explore my interests and develop new skills. The supportive community has been instrumental in my personal growth.",
    image: "src/assets/std3.jpg",
  },
];

const TestimonialSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === Testimonials.length - 1 ? 0 : prev + 1));
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev === Testimonials.length - 1 ? 0 : prev + 1));
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? Testimonials.length - 1 : prev - 1));
  };

  return (
    <div className="max-w-full mx-auto relative">
      <div className="relative overflow-hidden mx-auto bg-[rgba(34,34,34,0.9)]">
        <button 
          className="absolute top-1/2 left-2.5 -translate-y-1/2 bg-[rgba(0,0,0,0.5)] border-none text-2xl cursor-pointer z-10 p-2.5 text-white opacity-70 hover:opacity-100 hover:bg-[rgba(0,0,0,0.8)] transition-opacity duration-300 rounded-full" 
          onClick={goToPrevSlide}
        >
          &lt;
        </button>
        
        <div 
          className="flex transition-transform duration-500 ease-in-out w-full" 
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {Testimonials.map((testimonial) => (
            <div key={testimonial.id} className="min-w-full p-4 sm:p-10">
              <div className="text-[60px] sm:text-[80px] leading-none text-yellow-500 opacity-80 self-start -mb-5">&ldquo;</div>
              
              <div className="flex flex-col sm:flex-row relative w-full px-4 sm:px-10">
                <div className="relative z-10 w-full sm:max-w-[45%] flex justify-center items-center mb-6 sm:mb-0">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] pb-[30px] sm:pb-[60px] pl-[30px] sm:pl-[60px]"
                  />
                </div>
                
                <div className="w-full sm:flex-1 sm:max-w-[65%] sm:-ml-[15%] flex items-center">
                  <div className="border border-white/30 p-4 sm:p-8 sm:pl-[20%] relative text-white">
                    <p className="text-base sm:text-lg leading-relaxed mb-5">{testimonial.testimonial}</p>
                    <p className="font-bold text-right">
                      &mdash; {testimonial.name}, {testimonial.classYear}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end w-full pr-4">
                <div className="text-[60px] sm:text-[80px] leading-none text-yellow-500 opacity-80 -mt-5">&rdquo;</div>
              </div>
            </div>
          ))}
        </div>
        
        <button 
          className="absolute top-1/2 right-2.5 -translate-y-1/2 bg-[rgba(0,0,0,0.5)] border-none text-2xl cursor-pointer z-10 p-2.5 text-white opacity-70 hover:opacity-100 hover:bg-[rgba(0,0,0,0.8)] transition-opacity duration-300 rounded-full" 
          onClick={goToNextSlide}
        >
          &gt;
        </button>
      </div>
      
      <div className="flex justify-center mt-5">
        {Testimonials.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 bg-gray-300 rounded-full mx-1 cursor-pointer transition-colors duration-300 ${
              index === currentSlide ? "bg-yellow-500" : ""
            }`}
            onClick={() => setCurrentSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;