import React, { useState } from "react";
import axios from 'axios';


const CallToActionSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [focused, setFocused] = useState({
    name: false,
    email: false,
    phone: false,
    message: false,
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    message: false,
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (value.trim() !== "") {
      setErrors((prev) => ({
        ...prev,
        [name]: false,
      }));
    }
  };

  const handleFocus = (field) => {
    setFocused((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const handleBlur = (field) => {
    setFocused((prev) => ({
      ...prev,
      [field]: formData[field].trim() !== "",
    }));

    if (formData[field].trim() === "") {
      setErrors((prev) => ({
        ...prev,
        [field]: true,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: formData.name.trim() === "",
      email: formData.email.trim() === "",
      phone: formData.phone.trim() === "",
      message: formData.message.trim() === "",
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      axios
        .post("http://localhost/contact-backend/seeta.php", formData)
        .then((response) => {
          console.log("Response from backend:", response.data);

          setLoading(false);

          // Only show success modal if message contains 'successfully'
          if (
            response.data.message &&
            response.data.message.toLowerCase().includes("successfully")
          ) {
            setFormData({
              name: "",
              email: "",
              phone: "",
              message: "",
            });
            setShowForm(false);
            setShowSuccessMessage(true);

            setTimeout(() => {
              setShowSuccessMessage(false);
              setShowForm(true);
              navigate("/");
            }, 3000);
          } else {
            // Handle partial success or failure messages
            alert(response.data.message || "An unexpected error occurred.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          setLoading(false);
          alert("Failed to send message. Please try again.");
        });
    }
  };


  const PaperPlaneIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
    </svg>
  );

  const SpinnerIcon = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

  return (
    <section className="py-20 bg-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Left Column: Map */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="mb-6 sm:mb-8 text-center">
              <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">Find Us</h2>
              <div className="flex items-center justify-center gap-2">
                <span className="w-6 sm:w-8 h-0.5 bg-blue-500"></span>
                <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-blue-500"></span>
                <span className="w-6 sm:w-8 h-0.5 bg-blue-500"></span>
              </div>
            </div>
            <div className="relative w-full pb-[100%] sm:pb-[80%] overflow-hidden rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7526979999997!2d32.5678!3d0.5678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMzQnMDQuMSJOIDMywrAzNCcwNC4xIkU!5e0!3m2!1sen!2sug!4v1234567890"
                className="absolute top-0 left-0 w-full h-full border-0 rounded-xl sm:rounded-2xl"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map"
              ></iframe>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="w-full lg:w-1/2 flex flex-col mt-8 lg:mt-0">
            <div className="mb-8 text-center">
              <h2 className="text-4xl font-bold text-white mb-4">Contact Us</h2>
              <div className="flex items-center justify-center gap-2">
                <span className="w-8 h-0.5 bg-orange-500"></span>
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                <span className="w-8 h-0.5 bg-orange-500"></span>
              </div>
            </div>

            <div className="relative min-h-[500px] bg-slate-800/40 backdrop-blur-lg rounded-3xl p-4 sm:p-8 shadow-2xl border border-white/10">
              {showForm && (
                <form onSubmit={handleSubmit} className="w-full transition-opacity duration-500 space-y-6">
                  {/* Full Name Field */}
                  <div className="relative">
                    <label className="block text-white text-sm font-medium mb-2">
                      FULL NAME <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => handleFocus('name')}
                      onBlur={() => handleBlur('name')}
                      placeholder="Your full name"
                      className={`w-full px-4 py-3 bg-slate-700/60 backdrop-blur-sm border rounded-xl text-white placeholder-gray-400 outline-none transition-all duration-300 ${
                        focused.name || formData.name ? "border-blue-500 bg-slate-700/80" : "border-slate-600"
                      } ${errors.name ? "border-red-400" : ""}`}
                    />
                    {errors.name && (
                      <span className="text-red-400 text-sm mt-1 block">Full name is required</span>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="relative">
                    <label className="block text-white text-sm font-medium mb-2">
                      EMAIL <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => handleFocus('email')}
                      onBlur={() => handleBlur('email')}
                      placeholder="Your email address"
                      className={`w-full px-4 py-3 bg-slate-700/60 backdrop-blur-sm border rounded-xl text-white placeholder-gray-400 outline-none transition-all duration-300 ${
                        focused.email || formData.email ? "border-blue-500 bg-slate-700/80" : "border-slate-600"
                      } ${errors.email ? "border-red-400" : ""}`}
                    />
                    {errors.email && (
                      <span className="text-red-400 text-sm mt-1 block">Email is required</span>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div className="relative">
                    <label className="block text-white text-sm font-medium mb-2">
                      PHONE <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => handleFocus('phone')}
                      onBlur={() => handleBlur('phone')}
                      placeholder="Your phone number"
                      className={`w-full px-4 py-3 bg-slate-700/60 backdrop-blur-sm border rounded-xl text-white placeholder-gray-400 outline-none transition-all duration-300 ${
                        focused.phone || formData.phone ? "border-blue-500 bg-slate-700/80" : "border-slate-600"
                      } ${errors.phone ? "border-red-400" : ""}`}
                    />
                    {errors.phone && (
                      <span className="text-red-400 text-sm mt-1 block">Phone is required</span>
                    )}
                  </div>

                  {/* Message Field */}
                  <div className="relative">
                    <label className="block text-white text-sm font-medium mb-2">
                      MESSAGE <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => handleFocus('message')}
                      onBlur={() => handleBlur('message')}
                      placeholder="Your message"
                      rows="4"
                      className={`w-full px-4 py-3 bg-slate-700/60 backdrop-blur-sm border rounded-xl text-white placeholder-gray-400 outline-none transition-all duration-300 resize-none ${
                        focused.message || formData.message ? "border-blue-500 bg-slate-700/80" : "border-slate-600"
                      } ${errors.message ? "border-red-400" : ""}`}
                    />
                    {errors.message && (
                      <span className="text-red-400 text-sm mt-1 block">Message is required</span>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl font-semibold flex items-center justify-center gap-3 transition-all duration-300 transform shadow-lg hover:shadow-xl ${loading ? 'opacity-75 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-95 cursor-pointer'}`}
                  >
                    {loading ? <SpinnerIcon /> : <PaperPlaneIcon />}
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}

              {showSuccessMessage && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800/95 backdrop-blur-lg rounded-3xl transform transition-all duration-500 ease-in-out">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg
                        className="w-10 h-10 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-3">Thank You!</h3>
                    <p className="text-gray-300 text-lg mb-2">Your message has been sent successfully.</p>
                    <p className="text-gray-400">We'll get back to you soon.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;