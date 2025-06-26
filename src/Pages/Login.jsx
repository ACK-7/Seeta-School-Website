import React, { useState, useEffect } from "react";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  Mail,
  Twitter,
  Facebook,
  Instagram,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import badge from "../assets/Badge.jpeg";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, setUser } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("authUser");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, [setUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (username === "admin" && password === "password") {
        login();
        const from = location.state?.from?.pathname || "/dashboard";
        navigate(from, { replace: true });
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("Failed to login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const backgroundImageUrl =
    "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

  return (
    <div className="h-screen overflow-hidden relative">
      {/* Main Background - Split into two sections */}
      <div className="absolute inset-0 flex bg-gray-200">
        {/* Left Background - Image */}
        <div
          className="w-3/5 bg-cover bg-center relative"
          style={{
            backgroundImage: `url('${backgroundImageUrl}')`,
            clipPath: "polygon(0 0, 100% 0, 80% 100%, 0 100%)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40"></div>
        </div>

        {/* Right Background - Light Gray */}
        <div
          className="w-2/5 absolute right-0 top-0 bottom-0"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          }}
        ></div>
      </div>

      {/* Floating Card Container */}
      <div className="relative z-10 min-h-screen flex justify-center items-center p-4">
        <div className="w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row border-4 border-white">
          {/* Left Side of Card - Image (hidden on small screens) */}
          <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('${backgroundImageUrl}')`,
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40"></div>

            {/* Floating Elements */}
            <div className="absolute inset-0">
              <div className="absolute top-16 left-16 w-24 h-24 border border-white/20 rounded-full animate-pulse"></div>
              <div className="absolute bottom-24 right-12 w-16 h-16 bg-white/10 rounded-lg rotate-45 animate-bounce"></div>
              <div className="absolute top-1/2 left-8 w-12 h-12 bg-gradient-to-r from-purple-400/30 to-transparent rounded-full blur-sm animate-pulse"></div>
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-between p-8 text-white min-h-[600px]">
              {/* Top Navigation */}
              <div className="flex items-center justify-between">
                <div className="text-lg font-bold">SHS</div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <img
                      src={badge}
                      alt="School Badge"
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Center Content */}
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-5xl font-bold mb-3 leading-tight">
                    Welcome
                    <br />
                    <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                      Back Admin!
                    </span>
                  </h1>
                  <p className="text-lg text-white/80 max-w-sm mx-auto leading-relaxed">
                    Manage your school with ease and efficiency. Empowering
                    education through smart administration.
                  </p>
                </div>
              </div>

              {/* Bottom Profile Section */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side of Card - Login Form */}
          <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8">
            <div className="w-full max-w-sm">
              {/* Header */}
              <div className="flex items-center justify-end mb-12 ">
                <div className="text-3xl font-bold text-gray-900 mb-2 ">
                  SEETA HIGH SCHOOL
                </div>
              </div>

              {/* Welcome Section */}
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-1">
                  Hi Admin
                </h2>
                <p className="text-gray-600 text-sm">Welcome to Login Page</p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* username Field */}
                <div>
                  <input
                    type="text"
                    placeholder="Username"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent text-gray-900 placeholder-gray-500"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                {/* Password Field */}
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent text-gray-900 placeholder-gray-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {/* Forgot Password */}
                {/* <div className="text-right">
                  <a href="#" className="text-xs text-red-500 hover:text-red-600">
                    Forgot password?
                  </a>
                </div> */}

                {/* Error Message */}
                {/* {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-lg text-sm">
                    {error}
                  </div>
                )} */}

                {/* Remember Me */}
                {/* <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-400"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                    Remember me
                  </label>
                </div> */}

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      <span>Signing In...</span>
                    </div>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
