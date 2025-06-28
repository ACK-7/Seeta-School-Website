import React, { useState, useCallback, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  Settings as SettingsIcon,
  User,
  Mail,
  Key,
  Copy,
  Check,
  UserPlus,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";

const tabs = [
  { id: "account", label: "Account", icon: User },
  { id: "users", label: "User Management", icon: UserPlus },
];

const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("account");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [generatedLogin, setGeneratedLogin] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [loadingTeachers, setLoadingTeachers] = useState(true);

  const handleEmailChange = useCallback((e) => {
    setTeacherEmail(e.target.value);
    setError("");
  }, []);

  const copyToClipboard = useCallback(async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(""), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }, []);

  const generateCredentials = useCallback((email) => {
    const username = email.split("@")[0] + Math.floor(Math.random() * 1000);
    const password = Math.random().toString(36).slice(-8);
    return { username, password };
  }, []);

  const handleGenerateLogin = async () => {
    setIsGenerating(true);
    setError("");
    setGeneratedLogin(null);

    if (!teacherEmail) {
      setError("Please enter a teacher email.");
      setIsGenerating(false);
      return;
    }

    const { username, password } = generateCredentials(teacherEmail);

    try {
      const res = await fetch("http://localhost/API/seeta/add_teacher_auth.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email: teacherEmail }),
      });
      const data = await res.json();
      if (data.success) {
        setGeneratedLogin({ username, password, email: teacherEmail });
        setTeacherEmail("");
        fetchTeachers();
      } else {
        setError(data.error || "Failed to create teacher.");
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setIsGenerating(false);
    }
  };

  const fetchTeachers = useCallback(async () => {
    setLoadingTeachers(true);
    try {
      const res = await fetch("http://localhost/API/seeta/get_teachers_auth.php");
      const data = await res.json();
      if (data.success) setTeachers(data.data);
    } catch (err) {
      console.error("Error fetching teachers:", err);
    } finally {
      setLoadingTeachers(false);
    }
  }, []);

  const handleDeleteTeacher = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this teacher?");
    if (!confirmed) return;

    try {
      const res = await fetch("http://localhost/API/seeta/delete_teacher_auth.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `id=${encodeURIComponent(id)}`,
      });
      const data = await res.json();
      if (data.success) fetchTeachers();
      else alert("Failed to delete teacher.");
    } catch (err) {
      alert("Network error while deleting.");
    }
  };

  useEffect(() => {
    if (activeTab === "users") fetchTeachers();
  }, [activeTab, fetchTeachers]);

  if (!user || user.role !== "super_admin") {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-400">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <SettingsIcon className="w-8 h-8 text-blue-400 mr-3" />
            <h1 className="text-3xl font-bold text-white">Settings</h1>
          </div>
          <p className="text-gray-400">Manage your account settings and preferences</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-2">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                        activeTab === tab.id ? "bg-blue-600 text-white font-medium" : "text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      <Icon className={`w-5 h-5 mr-3 ${activeTab === tab.id ? "text-white" : "text-gray-400"}`} />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          <div className="flex-1">
            {activeTab === "account" ? (
              <div className="space-y-6">
                <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2 text-blue-400" />
                    Profile Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                      <input
                        type="text"
                        value={user?.username || ""}
                        disabled
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                      <div className="flex items-center">
                        <span className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
                          {user?.role === "super_admin" ? "Super Administrator" : user?.role}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <UserPlus className="w-5 h-5 mr-2 text-green-400" />
                    Generate Teacher Login
                  </h3>
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Teacher Email Address</label>
                    <input
                      type="email"
                      value={teacherEmail}
                      onChange={handleEmailChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg placeholder-gray-400"
                      placeholder="teacher@seetahigh.edu"
                    />
                    <button
                      type="button"
                      onClick={handleGenerateLogin}
                      disabled={!teacherEmail || isGenerating}
                      className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
                    >
                      {isGenerating ? "Generating..." : "Generate Login Credentials"}
                    </button>

                    {generatedLogin && (
                      <div className="mt-6 bg-gradient-to-r from-green-900/50 to-emerald-900/50 border border-green-700 rounded-xl p-6">
                        <div className="flex items-center mb-4">
                          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                          <h4 className="text-lg font-semibold text-green-400">Login Credentials Generated</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                            <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                            <div className="flex items-center justify-between">
                              <code className="text-sm font-mono text-white bg-gray-800 px-2 py-1 rounded">
                                {generatedLogin.username}
                              </code>
                              <button onClick={() => copyToClipboard(generatedLogin.username, "username")}>
                                {copiedField === "username" ? <Check className="text-green-400" /> : <Copy />}
                              </button>
                            </div>
                          </div>
                          <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                            <div className="flex items-center justify-between">
                              <code className="text-sm font-mono text-white bg-gray-800 px-2 py-1 rounded">
                                {showPassword ? generatedLogin.password : "••••••••"}
                              </code>
                              <div className="flex items-center ml-2">
                                <button onClick={() => setShowPassword(!showPassword)}>
                                  {showPassword ? <EyeOff /> : <Eye />}
                                </button>
                                <button onClick={() => copyToClipboard(generatedLogin.password, "password")}>
                                  {copiedField === "password" ? <Check className="text-green-400" /> : <Copy />}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700 mt-10">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2 text-yellow-400" />
                    Manage Teachers
                  </h3>
                  {loadingTeachers ? (
                    <p className="text-gray-300">Loading...</p>
                  ) : teachers.length === 0 ? (
                    <p className="text-gray-400">No teachers found.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-sm text-left text-gray-300">
                        <thead className="bg-gray-700 text-gray-200 uppercase text-xs">
                          <tr>
                            <th className="px-4 py-3">Username</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Password</th>
                            <th className="px-4 py-3">Created At</th>
                            <th className="px-4 py-3 text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {teachers.map((teacher) => (
                            <tr key={teacher.id} className="border-t border-gray-700">
                              <td className="px-4 py-2">{teacher.username}</td>
                              <td className="px-4 py-2">{teacher.email}</td>
                              <td className="px-4 py-2 font-mono">{teacher.password}</td>
                              <td className="px-4 py-2">{new Date(teacher.created_at).toLocaleString()}</td>
                              <td className="px-4 py-2 text-center">
                                <button
                                  onClick={() => handleDeleteTeacher(teacher.id)}
                                  className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
