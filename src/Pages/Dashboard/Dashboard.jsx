import React, { useEffect, useState } from "react";
import {
  FaGraduationCap,
  FaChalkboardTeacher,
  FaUsers,
  FaMoneyBillWave,
  FaBell,
  FaTachometerAlt,
  FaUserCheck,
  FaEnvelope,
  FaCalendarAlt,
  // FaEnvelope,
  FaBook,
  // FaComment,
  FaCog,
  FaSignOutAlt,
  FaChartLine,
  FaClipboardList,
  FaUserGraduate,
  FaUser,
  // FaUtensils,
  FaTrophy,
  FaCalendarCheck,
  FaImages,
} from "react-icons/fa";
import {
  Users,
  UserCheck,
  UserX,
  TrendingUp,
  DollarSign,
  Calendar,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Add state for unread messages
  const [unreadMessages, setUnreadMessages] = useState(0);

  // Fetch unread messages count (replace with your actual API call)
  useEffect(() => {
    // Example: fetchUnreadMessagesCount().then(count => setUnreadMessages(count));
    // For demo, let's set it to 3
    setUnreadMessages(3);
  }, []);

  // Update menuItems to include unread badge for Messages
  const menuItems = [
    { label: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
    {
      label: "Students",
      icon: <FaUserGraduate />,
      path: "/dashboard/students",
    },
    {
      label: "Teachers",
      icon: <FaChalkboardTeacher />,
      path: "/dashboard/teachers",
    },
    { label: "Events", icon: <FaCalendarAlt />, path: "/dashboard/events" },
    {
      label: "Messages",
      icon: <FaEnvelope />,
      path: "/dashboard/messages",
    },
    { label: "Gallery", icon: <FaImages />, path: "/dashboard/gallery" },
    ...(user?.role === "super_admin"
      ? [{ label: "Settings", icon: <FaCog />, path: "/dashboard/settings" }]
      : []),
    { label: "Log out", icon: <FaSignOutAlt />, path: "/" },
  ];

  const stats = [
    {
      label: "Total Students",
      value: "2,468",
      icon: <FaGraduationCap className="text-purple-400" />,
    },
    {
      label: "Teachers",
      value: "245",
      icon: <FaChalkboardTeacher className="text-green-400" />,
    },
    {
      label: "Employees",
      value: "508",
      icon: <FaUsers className="text-blue-400" />,
    },
    {
      label: "Revenue",
      value: "$232,468",
      icon: <FaMoneyBillWave className="text-yellow-400" />,
    },
  ];

  // Enhanced Student Component
  const EnhancedStudentSection = () => {
    const totalStudents = 375;
    const boys = 205;
    const girls = 170;
    const boysPercentage = (boys / totalStudents) * 100;
    const girlsPercentage = (girls / totalStudents) * 100;

    // Calculate stroke dash for donut chart
    const circumference = 2 * Math.PI * 60;
    const boysOffset = circumference;
    const girlsOffset = circumference - (boysPercentage / 100) * circumference;

    return (
      <div className="bg-gradient-to-br from-[#1f2937] to-[#111827] p-6 rounded-xl border border-gray-700 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Users className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">Students</h2>
          </div>
          <div className="text-sm text-gray-400">Total Enrolled</div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-3 gap-6 items-center">
          {/* Left Statistics */}
          <div className="space-y-4">
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <UserCheck className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-400 font-medium">Boys</span>
              </div>
              <div className="text-2xl font-bold text-white">{boys}</div>
              <div className="text-xs text-gray-400">
                {boysPercentage.toFixed(1)}% of total
              </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <UserX className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-yellow-400 font-medium">
                  Girls
                </span>
              </div>
              <div className="text-2xl font-bold text-white">{girls}</div>
              <div className="text-xs text-gray-400">
                {girlsPercentage.toFixed(1)}% of total
              </div>
            </div>
          </div>

          {/* Center Donut Chart */}
          <div className="flex justify-center">
            <div className="relative">
              <svg className="w-32 h-32 transform -rotate-90">
                {/* Background circle */}
                <circle
                  cx="64"
                  cy="64"
                  r="60"
                  fill="none"
                  stroke="#374151"
                  strokeWidth="8"
                />
                {/* Boys arc */}
                <circle
                  cx="64"
                  cy="64"
                  r="60"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={boysOffset}
                  className="transition-all duration-1000 ease-out"
                />
                {/* Girls arc */}
                <circle
                  cx="64"
                  cy="64"
                  r="60"
                  fill="none"
                  stroke="#eab308"
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={girlsOffset}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>

              {/* Center text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-3xl font-bold text-white">
                  {totalStudents}
                </div>
                <div className="text-xs text-gray-400 font-medium">TOTAL</div>
              </div>
            </div>
          </div>

          {/* Right Quick Stats */}
          <div className="space-y-3">
            <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
              <div className="text-xs text-gray-400 mb-1">Boy-Girl Ratio</div>
              <div className="text-lg font-semibold text-white">
                {(boys / girls).toFixed(1)}:1
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
              <div className="text-xs text-gray-400 mb-1">Capacity</div>
              <div className="text-lg font-semibold text-white">
                {((totalStudents / 500) * 100).toFixed(0)}%
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
                <div
                  className="bg-purple-500 h-1.5 rounded-full transition-all duration-1000"
                  style={{ width: `${(totalStudents / 500) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
              <div className="text-xs text-gray-400 mb-1">Growth</div>
              <div className="text-lg font-semibold text-green-400">+12%</div>
            </div>
          </div>
        </div>

        {/* Bottom Summary Bar */}
        <div className="mt-6 pt-4 border-t border-gray-700">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-300">Boys ({boys})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-300">Girls ({girls})</span>
              </div>
            </div>
            <div className="text-gray-400">Last updated: Today</div>
          </div>
        </div>
      </div>
    );
  };

  // Enhanced Earnings Component
  const EnhancedEarningsSection = () => {
    const earningsData = [
      { month: "Jan", received: 85000, pending: 15000 },
      { month: "Feb", received: 92000, pending: 18000 },
      { month: "Mar", received: 76000, pending: 12000 },
      { month: "Apr", received: 105000, pending: 22000 },
      { month: "May", received: 95000, pending: 8000 },
    ];

    const totalReceived = 453000;
    const totalPending = 75000;
    const monthlyGrowth = 12.5;
  };

  // Enhanced Attendance Component

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#0a0e1f] to-[#1a2a4a] text-gray-100 font-sans">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white text-xl">
            <FaGraduationCap />
          </div>
          <h1 className="text-2xl font-bold tracking-wide">SHS ADMIN</h1>
        </div>
        <div className="flex items-center space-x-4">
          {/* Removed notification bell and badge */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              {/*  user icon */}
              <FaUser className="w-10 h-10 text-purple-400 rounded-full bg-gray-800 p-2" />
              <span className="text-sm font-medium">
                {user?.role === "super_admin" ? "Admin" : user?.username}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Sidebar */}
        <aside className="space-y-2">
          {menuItems.map(({ label, icon, path, unread }, index) =>
            label === "Log out" ? (
              <button
                key={index}
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium bg-gray-800 hover:bg-gray-700 transition"
              >
                {icon}
                <span>{label}</span>
              </button>
            ) : (
              <Link
                key={index}
                to={path}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium ${
                  window.location.pathname === path
                    ? "bg-purple-600 text-white"
                    : "bg-gray-800 hover:bg-gray-700"
                } transition`}
              >
                {icon}
                <span>
                  {label}
                  {/* Remove this unread badge next to Messages */}
                  {/* {label === "Messages" && unread > 0 && (
                    <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {unread}
                    </span>
                  )} */}
                </span>
              </Link>
            )
          )}
        </aside>

        {/* Main Content */}
        <main className="col-span-4 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-[#1f2937] p-5 rounded-xl shadow hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="text-3xl">{stat.icon}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
                <div className="text-2xl font-semibold text-white">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {/* Students and Teachers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Enhanced Students Section */}
            <EnhancedStudentSection />

            {/* Teacher List */}
            <div className="bg-[#1f2937] p-5 rounded-xl overflow-x-auto">
              <h2 className="text-lg font-semibold mb-4">Teacher List</h2>
              <div className="min-w-[600px]">
                <div className="grid grid-cols-5 text-sm text-gray-400 mb-2 font-medium">
                  <span>Name</span>
                  <span>Class</span>
                  <span>Subject</span>
                  <span>Email</span>
                  <span>Action</span>
                </div>
                {[
                  {
                    name: "Morris Johnson",
                    class: "Class 6",
                    subject: "English",
                    email: "morrisjohnson@gmail.com",
                  },
                  {
                    name: "Jane Cooper",
                    class: "Class 5",
                    subject: "Music",
                    email: "janecooper@gmail.com",
                  },
                  {
                    name: "Esther Howard",
                    class: "Class 8",
                    subject: "Arts",
                    email: "estherhoward@gmail.com",
                  },
                  {
                    name: "Wade Warren",
                    class: "Class 7",
                    subject: "Physics",
                    email: "wadewarren@gmail.com",
                  },
                  {
                    name: "Jenny Wilson",
                    class: "Class 9",
                    subject: "Chemistry",
                    email: "jennywilson@gmail.com",
                  },
                ].map((teacher, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-5 items-center py-2 border-t border-gray-700"
                  >
                    <div className="flex items-center space-x-2">
                      {/* Replace image with user icon */}
                      <FaUserGraduate className="w-10 h-10 text-purple-400 rounded-full bg-gray-800 p-2" />
                      <span className="text-sm font-medium">
                        {user?.role === "super_admin"
                          ? "Admin"
                          : user?.username}
                      </span>
                    </div>
                    <span>{teacher.class}</span>
                    <span>{teacher.subject}</span>
                    <span className="text-sm truncate">{teacher.email}</span>
                    <button className="text-gray-400 hover:text-white text-lg">
                      ⋮
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
