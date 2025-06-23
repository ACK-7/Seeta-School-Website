import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#222] text-white py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-wrap gap-8">
          {/* School Info */}
          <div className="flex-1 min-w-[250px]">
            <div className="flex items-center mb-4">
              <img
                src="./src/assets/schoolbadge.png"
                alt="School Logo"
                className="w-20 h-auto mr-4"
              />
              <h5 className="text-3xl text-center">SHS</h5>
            </div>
            <p className="text-sm leading-relaxed">
              Seeta High School is committed to excellence in education,
              fostering academic achievement, personal growth, and character
              development in a supportive and innovative learning environment.
              We prioritize the holistic development of our students,
              encouraging creativity, critical thinking, and collaboration.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-white text-xl transition-colors duration-300 hover:text-[#4361ee]">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-white text-xl transition-colors duration-300 hover:text-[#4361ee]">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="text-white text-xl transition-colors duration-300 hover:text-[#4361ee]">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="text-white text-xl transition-colors duration-300 hover:text-[#4361ee]">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex-1 min-w-[250px]">
            <h5 className="mb-2">Contact Information</h5>
            <div className="h-0.5 bg-[#4361ee] mb-4"></div>
            <p className="text-sm leading-relaxed">
              <i className="bi bi-geo-alt-fill"></i> P.O BOX 417, Mukono, Uganda
              <br />
              <i className="bi bi-telephone-fill"></i> Main: 0392 001786
              <br />
              <i className="bi bi-telephone-fill"></i> Mukono: 0392 174870
              <br />
              <i className="bi bi-telephone-fill"></i> Green: 0312 515031
              <br />
              <i className="bi bi-envelope-fill"></i> info@seetahighschool.ac.ug
            </p>
            <h5 className="mt-6 mb-2">Accredited By</h5>
            <img
              src="./src/assets/education_logo.png"
              alt="Accreditation Logo"
              className="w-[80px] h-auto mb-2"
            />
            <p>Ministry of Education and Sports</p>
          </div>

          {/* Quick Links */}
          <div className="flex-1 min-w-[250px]">
            <h5 className="mb-2">Quick Links</h5>
            <div className="h-0.5 bg-[#4361ee] mb-4"></div>
            <ul className="list-none p-0">
              <li>
                <a href="index.html" className="block text-sm text-white no-underline mb-2 transition-colors duration-300 hover:text-[#4361ee]">
                  Home
                </a>
              </li>
              <li>
                <a href="about.html" className="block text-sm text-white no-underline mb-2 transition-colors duration-300 hover:text-[#4361ee]">
                  About SHS
                </a>
              </li>
              <li>
                <a href="apply.html" className="block text-sm text-white no-underline mb-2 transition-colors duration-300 hover:text-[#4361ee]">
                  Apply Now
                </a>
              </li>
              <li>
                <a href="gallery.html" className="block text-sm text-white no-underline mb-2 transition-colors duration-300 hover:text-[#4361ee]">
                  Gallery
                </a>
              </li>
              <li>
                <a href="contact-us.html" className="block text-sm text-white no-underline mb-2 transition-colors duration-300 hover:text-[#4361ee]">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Latest News */}
          <div className="flex-1 min-w-[250px]">
            <h5 className="mb-2">Latest News</h5>
            <div className="h-0.5 bg-[#4361ee] mb-4"></div>
            <div className="flex flex-col">
              <div className="w-[200px] h-[150px] overflow-hidden rounded-lg mb-4">
                <img
                  src="./src/assets/swimming team.jpeg"
                  alt="News Image"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-gray-400 mb-2">15 MAR</p>
              <p className="font-bold mb-2">School Sports Day</p>
              <p className="text-sm leading-relaxed">
                Annual sports day scheduled for next month.
              </p>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center text-sm text-gray-400 mt-8">
          © 2024 Seeta High School. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;