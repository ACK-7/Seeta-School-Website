import React, { useState, useEffect } from "react";
import axios from "axios"; // Add axios import

const Footer = () => {
  const [currentNews, setCurrentNews] = useState(0);
  const [newsItems, setNewsItems] = useState([]);

  // Fetch news from backend API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "http://localhost/API/seeta/get_news.php"
        );
        setNewsItems(response.data);
      } catch (error) {
        console.error("Failed to fetch news", error);
      }
    };
    fetchNews();
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    if (newsItems.length === 0) return;
    const interval = setInterval(() => {
      setCurrentNews((prev) => (prev + 1) % newsItems.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [newsItems]);

  return (
    <footer className="bg-[#222] text-white py-16">
      <div className="max-w-[1300px] mx-auto ">
        <div className="flex flex-wrap gap-8">
          {/* School Info */}
          <div className="flex-1 min-w-[250px]">
            <div className="flex items-center mb-4 flex-col md:flex md:flex-row">
              <img
                src="./src/assets/schoolbadge.png"
                alt="School Logo"
                className="w-20 h-auto mr-4"
              />
              <h5 className="text-3xl text-center">SHS</h5>
            </div>
            <p className="text-sm leading-relaxed px-5 text-center md:text-start">
              Seeta High School is committed to excellence in education,
              fostering academic achievement, personal growth, and character
              development in a supportive and innovative learning environment.
              We prioritize the holistic development of our students,
              encouraging creativity, critical thinking, and collaboration.
            </p>
            <div className="flex gap-4 mt-4">
              <a
                href="#"
                className="text-white text-xl transition-colors duration-300 hover:text-[#4361ee]"
              >
                <i className="bi bi-facebook"></i>
              </a>
              <a
                href="#"
                className="text-white text-xl transition-colors duration-300 hover:text-[#4361ee]"
              >
                <i className="bi bi-twitter"></i>
              </a>
              <a
                href="#"
                className="text-white text-xl transition-colors duration-300 hover:text-[#4361ee]"
              >
                <i className="bi bi-instagram"></i>
              </a>
              <a
                href="#"
                className="text-white text-xl transition-colors duration-300 hover:text-[#4361ee]"
              >
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex-1 min-w-[250px] text-center">
            <h5 className="mb-2 ">Contact Information</h5>
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
              className="w-[80px] h-auto mb-2 ms-[150px] md:ms-[110px]"
            />
            <p>Ministry of Education and Sports</p>
          </div>

          {/* Quick Links */}
          <div className="flex-1 min-w-[250px] text-center">
            <h5 className="mb-2">Quick Links</h5>
            <div className="h-0.5 bg-[#4361ee] mb-4"></div>
            <ul className="list-none p-0">
              <li>
                <a
                  href="index.html"
                  className="block text-sm text-white no-underline mb-2 transition-colors duration-300 hover:text-[#4361ee]"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="about.html"
                  className="block text-sm text-white no-underline mb-2 transition-colors duration-300 hover:text-[#4361ee]"
                >
                  About SHS
                </a>
              </li>
              <li>
                <a
                  href="apply.html"
                  className="block text-sm text-white no-underline mb-2 transition-colors duration-300 hover:text-[#4361ee]"
                >
                  Apply Now
                </a>
              </li>
              <li>
                <a
                  href="gallery.html"
                  className="block text-sm text-white no-underline mb-2 transition-colors duration-300 hover:text-[#4361ee]"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="contact-us.html"
                  className="block text-sm text-white no-underline mb-2 transition-colors duration-300 hover:text-[#4361ee]"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Latest News with Carousel */}
          <div className="flex-1 min-w-[250px] text-center">
            <h5 className="mb-2">Latest News</h5>
            <div className="h-0.5 bg-[#4361ee] mb-4"></div>

            {/* Carousel Container */}
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentNews * 100}%)` }}
              >
                {newsItems.length === 0 ? (
                  <div className="w-full flex-shrink-0">
                    <p className="text-gray-400">No news available.</p>
                  </div>
                ) : (
                  newsItems.map((news, index) => (
                    <div key={news.id} className="w-full flex-shrink-0">
                      <div className="flex flex-col">
                        <div className="w-[200px] h-[150px] overflow-hidden rounded-lg mb-4 ms-[90px] md:ms-[50px] relative">
                          <img
                            src={
                              news.image.startsWith("http")
                                ? news.image
                                : `${window.location.origin}${news.image}`
                            }
                            alt={news.title}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                          {/* Overlay effect */}
                          <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-10 transition-all duration-300"></div>
                        </div>
                        <p className="text-xs text-gray-400 mb-2">
                          {news.date}
                        </p>
                        <p className="font-bold mb-2 text-white">
                          {news.title}
                        </p>
                        <p className="text-sm leading-relaxed text-gray-300">
                          {news.description}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Carousel Indicators */}
              <div className="flex justify-center mt-4 space-x-2">
                {newsItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentNews(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentNews
                        ? "bg-[#4361ee] w-6"
                        : "bg-gray-500 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={() =>
                  setCurrentNews((prev) =>
                    prev === 0 ? newsItems.length - 1 : prev - 1
                  )
                }
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-r hover:bg-opacity-70 transition-all duration-300"
                disabled={newsItems.length === 0}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={() =>
                  setCurrentNews((prev) => (prev + 1) % newsItems.length)
                }
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-l hover:bg-opacity-70 transition-all duration-300"
                disabled={newsItems.length === 0}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center text-sm text-gray-400 mt-8 border-t-[1px] pt-6">
          © 2024 Seeta High School. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
