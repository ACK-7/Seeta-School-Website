import React, { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";

const CounterSection = () => {
  const counters = [
    { icon: "fa-book", count: 20, label: "Subjects" },
    { icon: "fa-users", count: 2000, label: "Students" },
    { icon: "fa-flask", count: 5, label: "Modern Lab" },
    { icon: "fa-user-secret", count: 25, label: "Teachers" },
  ];

  const [hasAnimated, setHasAnimated] = useState(false);
  const counterSectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (counterSectionRef.current) {
      observer.observe(counterSectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated]);

  return (
    <section 
      ref={counterSectionRef} 
      className="bg-gray-800 text-white py-20 my-12"
    >
      <div className="flex flex-wrap justify-center gap-5 max-w-7xl mx-auto px-4">
        {counters.map((counter, index) => (
          <div 
            key={index} 
            className="flex-1 min-w-[200px] flex flex-col items-center relative"
          >
            <i className={`fas ${counter.icon} text-6xl mb-2.5`}></i>
            <h4 className="text-2xl font-bold">
              {hasAnimated && <CountUp end={counter.count} duration={2} separator="," />}
            </h4>
            <p className="text-3xl mt-1">{counter.label}</p>
            {index !== counters.length - 1 && (
              <div className="absolute top-0 right-[-10px] w-px h-[150px] bg-white/20"></div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CounterSection;
