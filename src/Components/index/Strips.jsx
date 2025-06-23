import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stripsData = [
  { width: "40%", bgColor: "#1c4673", alignRight: true }, // Blue top strip
  { width: "80%", bgColor: "#d59f0f", alignRight: false }, // Gold middle strip
  { width: "40%", bgColor: "#1c4673", alignRight: true }, // Blue bottom strip
];

const Strips = () => {
//   useEffect(() => {
  
//   if (window.innerWidth > 768) {
//     gsap.utils.toArray(".strip").forEach((strip, index) => {
//       const isGold = index === 1;
//       const isRightAligned = stripsData[index].alignRight;

//       gsap.fromTo(
//         strip,
//         {
//           opacity: 0,
//           x: isGold ? "-100vw" : isRightAligned ? "100vw" : "-100vw",
//         },
//         {
//           opacity: 1,
//           x: 0,
//           duration: 1.5,
//           ease: "power3.out",
//           scrollTrigger: {
//             trigger: strip,
//             start: "top 85%",
//             end: "top 40%",
//             scrub: 1,
//           },
//         }
//       );
//     });
//   } else {
    
//     gsap.set(".strip", {
//       opacity: 1,
//       x: 0,
//     });
//   }
// }, []);


  return (
    <div className="relative w-full h-[150px] overflow-hidden mt-[10px] pt-[10px]">
      <div className="absolute w-full h-full flex flex-col items-center">
        {stripsData.map((strip, index) => (
          <div
            key={index}
            className={`strip absolute h-[40px]`}
            style={{
              width: strip.width,
              backgroundColor: strip.bgColor,
              marginTop: `${index * 50}px`,
              right: strip.alignRight ? "0" : "auto",
              left: strip.alignRight ? "auto" : "0",
              clipPath:
                index % 2 === 0
                  ? "polygon(0% 0%, 100% 0%, 100% 100%, 10% 100%)"
                  : "polygon(0% 0%, 100% 0%, 95% 100%, 0% 100%)",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Strips;
