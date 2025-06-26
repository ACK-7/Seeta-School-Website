import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { jsPDF } from 'jspdf';
import { Download } from 'lucide-react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const SchoolFeesStructure = () => {
  const [activeTerm, setActiveTerm] = useState(1);
  const heroRef = useRef(null);
  const termButtonsRef = useRef(null);
  const oLevelCardRef = useRef(null);
  const aLevelCardRef = useRef(null);
  const additionalReqRef = useRef(null);
  const paymentInfoRef = useRef(null);
  const contactSectionRef = useRef(null);

  // Fees data structure
  const feesData = {
    1: {
      olevel: {
        'Tuition Fee': 800000,
        'Development Fee': 150000,
        'Boarding Fee': 600000,
        'Computer Fee': 50000,
        'Total': 1600000
      },
      alevel: {
        'Tuition Fee': 900000,
        'Development Fee': 150000,
        'Boarding Fee': 600000,
        'Laboratory Fee': 100000,
        'Total': 1750000
      }
    },
    2: {
      olevel: {
        'Tuition Fee': 780000,
        'Development Fee': 150000,
        'Boarding Fee': 600000,
        'Computer Fee': 50000,
        'Total': 1580000
      },
      alevel: {
        'Tuition Fee': 880000,
        'Development Fee': 150000,
        'Boarding Fee': 600000,
        'Laboratory Fee': 100000,
        'Total': 1730000
      }
    },
    3: {
      olevel: {
        'Tuition Fee': 750000,
        'Development Fee': 150000,
        'Boarding Fee': 600000,
        'Computer Fee': 50000,
        'Total': 1550000
      },
      alevel: {
        'Tuition Fee': 850000,
        'Development Fee': 150000,
        'Boarding Fee': 600000,
        'Laboratory Fee': 100000,
        'Total': 1700000
      }
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return `UGX ${amount.toLocaleString()}`;
  };

  // Handle term button click
  const handleTermButtonClick = (termNumber) => {
    setActiveTerm(termNumber);
    animateFeeCards();
  };

  // Generate PDF for O-Level fees
  const generateOLevelPDF = () => {
    const doc = new jsPDF();
    
    // Add header
    doc.setFontSize(22);
    doc.setTextColor(0, 51, 102);
    doc.text("Seeta High School", 105, 20, { align: "center" });
    
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text("O-Level Fees Structure", 105, 30, { align: "center" });
    doc.setFontSize(14);
    doc.text(`Term ${activeTerm} - ${new Date().getFullYear()}`, 105, 40, { align: "center" });
    
    // Add fees table
    doc.setFontSize(12);
    let yPosition = 60;
    
    // Add table headers
    doc.setFont("helvetica", "bold");
    doc.text("Fee Item", 40, yPosition);
    doc.text("Amount (UGX)", 140, yPosition);
    yPosition += 10;
    
    // Add horizontal line
    doc.setLineWidth(0.5);
    doc.line(40, yPosition - 5, 170, yPosition - 5);
    
    // Add fee items
    doc.setFont("helvetica", "normal");
    Object.entries(feesData[activeTerm].olevel).forEach(([fee, amount]) => {
      doc.text(fee, 40, yPosition);
      doc.text(amount.toLocaleString(), 140, yPosition);
      yPosition += 10;
    });
    
    // Add horizontal line
    doc.line(40, yPosition - 5, 170, yPosition - 5);
    
    // Add additional information
    yPosition += 15;
    doc.setFont("helvetica", "bold");
    doc.text("Additional Information:", 40, yPosition);
    yPosition += 10;
    
    doc.setFont("helvetica", "normal");
    doc.text("• All fees must be paid before the term begins", 40, yPosition);
    yPosition += 10;
    doc.text("• Payment plans available upon request", 40, yPosition);
    yPosition += 10;
    doc.text("• Keep all payment receipts for reference", 40, yPosition);
    yPosition += 10;
    doc.text("• Present bank slip to school bursar for receipt", 40, yPosition);
    yPosition += 20;
    
    // Bank details
    doc.setFont("helvetica", "bold");
    doc.text("Bank Account Details:", 40, yPosition);
    yPosition += 10;
    
    doc.setFont("helvetica", "normal");
    doc.text("Bank Name: Stanbic Bank Uganda", 40, yPosition);
    yPosition += 10;
    doc.text("Account Name: Seeta High School", 40, yPosition);
    yPosition += 10;
    doc.text("Account Number: 9030605789254", 40, yPosition);
    yPosition += 10;
    doc.text("Branch: Mukono Branch", 40, yPosition);
    yPosition += 20;
    
    // Contact information
    doc.setFont("helvetica", "bold");
    doc.text("Contact:", 40, yPosition);
    yPosition += 10;
    
    doc.setFont("helvetica", "normal");
    doc.text("Phone: 0392 001786", 40, yPosition);
    yPosition += 10;
    doc.text("Email: accounts@seetahighschool.ac.ug", 40, yPosition);
    
    // Footer
    doc.setFontSize(10);
    doc.text("© Seeta High School - All Rights Reserved", 105, 280, { align: "center" });
    
    // Save PDF
    doc.save(`Seeta_High_School_OLevel_Fees_Term${activeTerm}.pdf`);
  };

  // Generate PDF for A-Level fees
  const generateALevelPDF = () => {
    const doc = new jsPDF();
    
    // Add header
    doc.setFontSize(22);
    doc.setTextColor(204, 102, 0);
    doc.text("Seeta High School", 105, 20, { align: "center" });
    
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text("A-Level Fees Structure", 105, 30, { align: "center" });
    doc.setFontSize(14);
    doc.text(`Term ${activeTerm} - ${new Date().getFullYear()}`, 105, 40, { align: "center" });
    
    // Add fees table
    doc.setFontSize(12);
    let yPosition = 60;
    
    // Add table headers
    doc.setFont("helvetica", "bold");
    doc.text("Fee Item", 40, yPosition);
    doc.text("Amount (UGX)", 140, yPosition);
    yPosition += 10;
    
    // Add horizontal line
    doc.setLineWidth(0.5);
    doc.line(40, yPosition - 5, 170, yPosition - 5);
    
    // Add fee items
    doc.setFont("helvetica", "normal");
    Object.entries(feesData[activeTerm].alevel).forEach(([fee, amount]) => {
      doc.text(fee, 40, yPosition);
      doc.text(amount.toLocaleString(), 140, yPosition);
      yPosition += 10;
    });
    
    // Add horizontal line
    doc.line(40, yPosition - 5, 170, yPosition - 5);
    
    // Add additional information
    yPosition += 15;
    doc.setFont("helvetica", "bold");
    doc.text("Additional Information:", 40, yPosition);
    yPosition += 10;
    
    doc.setFont("helvetica", "normal");
    doc.text("• All fees must be paid before the term begins", 40, yPosition);
    yPosition += 10;
    doc.text("• Payment plans available upon request", 40, yPosition);
    yPosition += 10;
    doc.text("• Keep all payment receipts for reference", 40, yPosition);
    yPosition += 10;
    doc.text("• Present bank slip to school bursar for receipt", 40, yPosition);
    yPosition += 20;
    
    // Bank details
    doc.setFont("helvetica", "bold");
    doc.text("Bank Account Details:", 40, yPosition);
    yPosition += 10;
    
    doc.setFont("helvetica", "normal");
    doc.text("Bank Name: Stanbic Bank Uganda", 40, yPosition);
    yPosition += 10;
    doc.text("Account Name: Seeta High School", 40, yPosition);
    yPosition += 10;
    doc.text("Account Number: 9030605789254", 40, yPosition);
    yPosition += 10;
    doc.text("Branch: Mukono Branch", 40, yPosition);
    yPosition += 20;
    
    // Contact information
    doc.setFont("helvetica", "bold");
    doc.text("Contact:", 40, yPosition);
    yPosition += 10;
    
    doc.setFont("helvetica", "normal");
    doc.text("Phone: 0392 001786", 40, yPosition);
    yPosition += 10;
    doc.text("Email: accounts@seetahighschool.ac.ug", 40, yPosition);
    
    // Footer
    doc.setFontSize(10);
    doc.text("© Seeta High School - All Rights Reserved", 105, 280, { align: "center" });
    
    // Save PDF
    doc.save(`Seeta_High_School_ALevel_Fees_Term${activeTerm}.pdf`);
  };

  // Animation function for fee cards
  const animateFeeCards = () => {
    if (oLevelCardRef.current && aLevelCardRef.current) {
      gsap.fromTo(
        [oLevelCardRef.current, aLevelCardRef.current],
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" }
      );
    }
  };

  // Initialize animations
  useEffect(() => {
    // Hero section animation
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, scale: 0.7 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 1.2, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 80%",
        }
      }
    );

    // Term buttons animation
    gsap.fromTo(
      termButtonsRef.current,
      { opacity: 0, scale: 0.8 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 0.8, 
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: termButtonsRef.current,
          start: "top 80%",
        }
      }
    );

    // Fee cards initial animation
    gsap.fromTo(
      oLevelCardRef.current,
      { opacity: 0, scale: 0.7 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 0.8, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: oLevelCardRef.current,
          start: "top 80%",
        }
      }
    );

    gsap.fromTo(
      aLevelCardRef.current,
      { opacity: 0, scale: 0.7 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 0.8, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: aLevelCardRef.current,
          start: "top 80%",
        }
      }
    );

    // Additional Requirements section
    gsap.fromTo(
      additionalReqRef.current.querySelector('.grid > div:first-child'),
      { opacity: 0, scale: 0.7 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: additionalReqRef.current,
          start: "top 80%",
        }
      }
    );

    gsap.fromTo(
      additionalReqRef.current.querySelector('.grid > div:last-child'),
      { opacity: 0, scale: 0.7 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: additionalReqRef.current,
          start: "top 80%", 
        }
      }
    );

    // Payment Information section
    gsap.fromTo(
      paymentInfoRef.current.querySelector('.grid > div:first-child'),
      { opacity: 0, scale: 0.7 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: paymentInfoRef.current,
          start: "top 80%",
        }
      }
    );

    gsap.fromTo(
      paymentInfoRef.current.querySelector('.grid > div:last-child'),
      { opacity: 0, scale: 0.7 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: paymentInfoRef.current,
          start: "top 80%",
        }
      }
    );

    // Contact section animation (keeping the original scale animation)
    gsap.fromTo(
      contactSectionRef.current,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        scrollTrigger: {
          trigger: contactSectionRef.current,
          start: "top 80%",
        }
      }
    );
  }, []);

  return (
    <>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Term Selection */}
        <div ref={termButtonsRef} className="text-center mb-12">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            {[1, 2, 3].map((term) => (
              <button
                key={term}
                onClick={() => handleTermButtonClick(term)}
                className={`px-6 py-3 text-lg font-medium ${
                  activeTerm === term
                    ? "bg-blue-600 text-white"
                    : "bg-white text-blue-600 hover:bg-blue-50"
                } ${
                  term === 1 ? "rounded-l-lg" : term === 3 ? "rounded-r-lg" : ""
                } border border-blue-600 transition-all duration-300`}
              >
                Term {term}
              </button>
            ))}
          </div>
        </div>

        {/* Fees Structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* O-Level Card */}
          <div ref={oLevelCardRef} className="bg-white rounded-xl shadow-xl overflow-hidden border-t-4 border-blue-600 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">O-Level (S.1 - S.4)</h2>
              <button 
                onClick={generateOLevelPDF}
                className="bg-white text-blue-600 px-4 py-2 rounded-md flex items-center hover:bg-blue-50 transition-colors duration-300"
              >
                <Download size={16} className="mr-2" />
                <span>Download PDF</span>
              </button>
            </div>
            <div className="p-6">
              {Object.entries(feesData[activeTerm].olevel).map(([fee, amount], index) => (
                <div 
                  key={index} 
                  className={`flex justify-between py-3 ${
                    index < Object.entries(feesData[activeTerm].olevel).length - 1 
                      ? "border-b border-gray-200" 
                      : ""
                  } ${fee === "Total" ? "font-bold text-lg" : ""}`}
                >
                  <span>{fee}</span>
                  <span>{formatCurrency(amount)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* A-Level Card */}
          <div ref={aLevelCardRef} className="bg-white rounded-xl shadow-xl overflow-hidden border-t-4 border-yellow-500 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-yellow-500 text-white p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">A-Level (S.5 - S.6)</h2>
              <button 
                onClick={generateALevelPDF}
                className="bg-white text-yellow-600 px-4 py-2 rounded-md flex items-center hover:bg-yellow-50 transition-colors duration-300"
              >
                <Download size={16} className="mr-2" />
                <span>Download PDF</span>
              </button>
            </div>
            <div className="p-6">
              {Object.entries(feesData[activeTerm].alevel).map(([fee, amount], index) => (
                <div 
                  key={index} 
                  className={`flex justify-between py-3 ${
                    index < Object.entries(feesData[activeTerm].alevel).length - 1 
                      ? "border-b border-gray-200" 
                      : ""
                  } ${fee === "Total" ? "font-bold text-lg" : ""}`}
                >
                  <span>{fee}</span>
                  <span>{formatCurrency(amount)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Requirements */}
        <div ref={additionalReqRef}>
          <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b-2 border-blue-600 pb-2 inline-block">Additional Requirements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* One-Time Fees Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="bg-gray-800 text-white p-4">
                <h3 className="text-xl font-bold">One-Time Fees (New Students)</h3>
              </div>
              <div className="p-6">
                <ul className="divide-y divide-gray-200">
                  <li className="flex justify-between py-3">
                    <span>Admission Fee</span>
                    <span>UGX 150,000</span>
                  </li>
                  <li className="flex justify-between py-3">
                    <span>Identity Card</span>
                    <span>UGX 15,000</span>
                  </li>
                  <li className="flex justify-between py-3">
                    <span>Uniform Set</span>
                    <span>UGX 120,000</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Optional Services Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="bg-gray-800 text-white p-4">
                <h3 className="text-xl font-bold">Optional Services</h3>
              </div>
              <div className="p-6">
                <ul className="divide-y divide-gray-200">
                  <li className="flex justify-between py-3">
                    <span>School Bus (Per Term)</span>
                    <span>UGX 300,000</span>
                  </li>
                  <li className="flex justify-between py-3">
                    <span>Music Lessons</span>
                    <span>UGX 180,000</span>
                  </li>
                  <li className="flex justify-between py-3">
                    <span>Swimming Classes</span>
                    <span>UGX 150,000</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div ref={paymentInfoRef}>
          <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b-2 border-blue-600 pb-2 inline-block">Payment Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Bank Account Details */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="bg-blue-600 text-white p-4">
                <h3 className="text-xl font-bold">Bank Account Details</h3>
              </div>
              <div className="p-6">
                <p className="mb-3"><span className="font-bold">Bank Name:</span> Stanbic Bank Uganda</p>
                <p className="mb-3"><span className="font-bold">Account Name:</span> Seeta High School</p>
                <p className="mb-3"><span className="font-bold">Account Number:</span> 9030605789254</p>
                <p className="mb-3"><span className="font-bold">Branch:</span> Mukono Branch</p>
              </div>
            </div>

            {/* Payment Guidelines */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="bg-blue-600 text-white p-4">
                <h3 className="text-xl font-bold">Payment Guidelines</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                    <span>All fees must be paid before the term begins</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                    <span>Payment plans available upon request</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                    <span>Keep all payment receipts for reference</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                    <span>Present bank slip to school bursar for receipt</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div 
          ref={contactSectionRef}
          className="bg-blue-900 text-white p-8 rounded-xl shadow-xl mb-8 relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4 text-center">Need More Information?</h2>
            <p className="text-xl text-center mb-6">Contact our accounts office for any queries regarding fees and payments.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
              <div className="flex items-center justify-center bg-blue-800 bg-opacity-50 p-4 rounded-lg">
                <i className="fas fa-phone text-2xl mr-3"></i>
                <p className="text-xl">0392 001786</p>
              </div>
              <div className="flex items-center justify-center bg-blue-800 bg-opacity-50 p-4 rounded-lg">
                <i className="fas fa-envelope text-2xl mr-3"></i>
                <p className="text-xl">accounts@seetahighschool.ac.ug</p>
              </div>
            </div>
          </div>
          
          {/* Background animated elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-blue-300 animate-float-slow"></div>
            <div className="absolute top-20 right-20 w-24 h-24 rounded-full bg-blue-400 animate-float-medium"></div>
            <div className="absolute bottom-10 left-1/4 w-20 h-20 rounded-full bg-blue-200 animate-float-fast"></div>
          </div>
        </div>
      </div>

      {/* Add global styles for animations */}
      <style jsx global>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes floatMedium {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-25px); }
        }
        
        @keyframes floatFast {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float-slow {
          animation: floatSlow 8s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: floatMedium 6s ease-in-out infinite;
        }
        
        .animate-float-fast {
          animation: floatFast 4s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default SchoolFeesStructure;