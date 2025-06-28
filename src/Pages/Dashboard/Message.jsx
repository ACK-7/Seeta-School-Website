import React, { useState, useEffect } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Inbox,
  Send,
  Filter,
  Eye,
  EyeOff,
  X,
  Menu,
  Mail,
  RefreshCw,
  Settings,
  User,
} from "lucide-react";

const Message = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMessages, setSelectedMessages] = useState(new Set());
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [readMessages, setReadMessages] = useState(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [showSent, setShowSent] = useState(false);

  // Reply states
  const [showReply, setShowReply] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [replyLoading, setReplyLoading] = useState(false);
  const [replySuccess, setReplySuccess] = useState(false);
  const [replyError, setReplyError] = useState("");

  // Add a loading state for delete
  const [deleteLoading, setDeleteLoading] = useState(false);

  const itemsPerPage = 10;

  // 1. Move fetch logic to a function
  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "http://localhost/API/contact_submissions.php",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.success) {
        setSubmissions(data.data || []);
      } else {
        throw new Error(data.message || "Failed to fetch data");
      }
    } catch (err) {
      console.error("Error fetching submissions:", err);

      if (err.name === "AbortError") {
        setError("Request timeout. Please check if the server is running.");
      } else {
        setError(
          "Cannot connect to server. Please check if the API server is running."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchSentMessages = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "http://localhost/API/seeta/get_sent_messages.php"
      );
      const data = await response.json();
      if (data.success) {
        setSubmissions(data.data || []);
      } else {
        setError(data.message || "Failed to fetch sent messages");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  };

  // 2. Call it in useEffect
  useEffect(() => {
    fetchSubmissions();
  }, []);

  // Filter submissions based on search term
  const filteredSubmissions = submissions.filter((submission) => {
    if (showSent) {
      // Show all sent messages (no filter)
      return true;
    }
    // Inbox filter (keep as is)
    return Object.values(submission).some(
      (value) =>
        value != null &&
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Apply pagination to filtered results
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSubmissions = filteredSubmissions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);

  // Reset to page 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSelectAll = () => {
    if (selectedMessages.size === currentSubmissions.length) {
      setSelectedMessages(new Set());
    } else {
      setSelectedMessages(new Set(currentSubmissions.map((sub) => sub.id)));
    }
  };

  const handleSelectMessage = (id) => {
    const newSelected = new Set(selectedMessages);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedMessages(newSelected);
  };

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
    setReadMessages((prev) => new Set([...prev, message.id]));
  };

  const handleCloseMessage = () => {
    setSelectedMessage(null);
  };

  const handleImagePreview = (imageUrl) => {
    setImagePreview(imageUrl);
  };

  const handleCloseImagePreview = () => {
    setImagePreview(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diffDays <= 7) {
      return date.toLocaleDateString([], { weekday: "short" });
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  const truncateMessage = (text, maxLength = 100) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getAvatarColor = (name) => {
    const colors = [
      "bg-purple-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-red-500",
      "bg-teal-500",
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  const handleDeleteMessages = async () => {
    if (selectedMessages.size === 0) return;
    if (
      !window.confirm(
        "Are you sure you want to delete the selected message(s)?"
      )
    )
      return;

    setDeleteLoading(true);
    setError(null);

    try {
      // Send IDs as an array
      const res = await fetch(
        "http://localhost/API/seeta/delete_messages.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids: Array.from(selectedMessages) }),
        }
      );
      const data = await res.json();

      if (data.success) {
        // Remove deleted messages from state
        setSubmissions((prev) =>
          prev.filter((msg) => !selectedMessages.has(msg.id))
        );
        setSelectedMessages(new Set());
      } else {
        setError(data.message || "Failed to delete messages.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
    setDeleteLoading(false);
  };

  const handleInboxClick = () => {
    setShowSent(false);
    fetchSubmissions();
  };

  const handleSentClick = () => {
    setShowSent(true);
    fetchSentMessages();
  };

  if (selectedMessage) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100">
        {/* Message View Header */}
        <div className="bg-gray-800/50 backdrop-blur-xl border-b border-gray-700/50 px-6 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleCloseMessage}
                className="text-gray-400 hover:text-gray-200 p-2 rounded-lg hover:bg-gray-800/50 transition-all duration-200"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex items-center space-x-3">
                <button className="text-gray-400 hover:text-blue-400 p-2 rounded-lg hover:bg-gray-800/50 transition-all duration-200">
                  <Send size={18} />
                </button>
              </div>
            </div>
            <div className="text-sm text-gray-400 bg-gray-800/30 px-3 py-1 rounded-lg">
              {formatDate(selectedMessage.sent_at)}
            </div>
          </div>
        </div>

        {/* Message Content */}
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-gray-800/30 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden">
            <div className="p-8">
              <div className="border-b border-gray-700/30 pb-6 mb-8">
                <h1 className="text-2xl font-light text-gray-100 mb-4">
                  Contact Form Submission
                </h1>
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 ${getAvatarColor(
                      selectedMessage.name
                    )} rounded-full flex items-center justify-center text-white font-medium shadow-lg`}
                  >
                    {getInitials(selectedMessage.name)}
                  </div>
                  <div>
                    <div className="font-medium text-gray-100 text-lg">
                      {selectedMessage.name}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {selectedMessage.email}
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-gray-800/40 rounded-xl p-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <div className="text-gray-100 text-lg">
                    {selectedMessage.phone || "Not provided"}
                  </div>
                </div>

                <div className="bg-gray-800/40 rounded-xl p-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <div className="text-gray-100 whitespace-pre-wrap leading-relaxed text-lg">
                    {selectedMessage.message}
                  </div>
                </div>

                <div className="bg-gray-800/40 rounded-xl p-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Received
                  </label>
                  <div className="text-gray-400">
                    {new Date(selectedMessage.sent_at).toLocaleString()}
                  </div>
                </div>

                {/* Add Image Display Section */}
                {selectedMessage.images &&
                  selectedMessage.images.length > 0 && (
                    <div className="bg-gray-800/40 rounded-xl p-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Attached Images
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {selectedMessage.images.map((image, index) => (
                          <div
                            key={index}
                            className="relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => handleImagePreview(image.url)}
                          >
                            <img
                              src={image.url}
                              alt={`Attachment ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
              {/* Image Preview Modal */}
              {imagePreview && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
                  <button
                    onClick={handleCloseImagePreview}
                    className="absolute top-4 right-4 text-white hover:text-gray-300"
                  >
                    <X size={24} />
                  </button>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-[90vh] max-w-[90vw] object-contain"
                  />
                </div>
              )}
              {/* Reply Section */}
              <div className="mt-8 pt-6 border-t border-gray-700/30 flex space-x-3">
                <button
                  onClick={() => setShowReply(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
                >
                  <Send size={18} />
                  <span>Reply</span>
                </button>
              </div>

              {/* {showReply && (
                <div className="mt-8 pt-6 border-t border-gray-700/30">
                  <textarea
                    className="w-full p-2 rounded bg-gray-800 text-gray-100 mb-2"
                    rows={4}
                    placeholder="Type your reply..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                  />
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                    onClick={handleSendReply}
                  >
                    Send Reply
                  </button>
                  <button
                    className="ml-2 px-4 py-2 rounded bg-gray-600 text-white"
                    onClick={() => setShowReply(false)}
                  >
                    Cancel
                  </button>
                </div>
              )} */}
              {/* Reply Modal */}
              {showReply && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                  <div className="bg-gray-900 rounded-2xl p-8 w-full max-w-lg shadow-2xl relative">
                    <button
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
                      onClick={() => {
                        setShowReply(false);
                        setReplyContent("");
                        setReplyError("");
                      }}
                    >
                      <X size={22} />
                    </button>
                    <h2 className="text-xl font-semibold mb-4 text-white">
                      Reply to {selectedMessage.name}
                    </h2>
                    <div className="mb-4">
                      <label className="block text-gray-300 mb-2">To</label>
                      <input
                        type="email"
                        value={selectedMessage.email}
                        disabled
                        className="w-full px-3 py-2 rounded bg-gray-800 text-gray-400 border border-gray-700"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-300 mb-2">
                        Message
                      </label>
                      <textarea
                        rows={5}
                        className="w-full px-3 py-2 rounded bg-gray-800 text-gray-100 border border-gray-700"
                        placeholder="Type your reply..."
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                      />
                    </div>
                    {replyError && (
                      <div className="text-red-400 mb-2">{replyError}</div>
                    )}
                    {replySuccess && (
                      <div className="text-green-400 mb-2">
                        Reply sent successfully!
                      </div>
                    )}
                    <div className="flex justify-end gap-2">
                      <button
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
                        onClick={async () => {
                          console.log(
                            "Reply will be sent to:",
                            selectedMessage.email
                          );
                          setReplyLoading(true);
                          setReplyError("");
                          setReplySuccess(false);

                          try {
                            const res = await fetch(
                              "http://localhost/API/seeta/reply.php", // New endpoint
                              {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                  recipient_email: selectedMessage.email, // User's email as recipient
                                  recipient_name: selectedMessage.name, // User's name
                                  message: replyContent, // Admin's reply message
                                }),
                              }
                            );

                            const data = await res.json();

                            if (data.success) {
                              setReplySuccess(true);
                              setReplyContent("");

                              // Save to sent messages
                              await fetch(
                                "http://localhost/API/seeta/save_sent_message.php",
                                {
                                  method: "POST",
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                  body: JSON.stringify({
                                    recipient_email: selectedMessage.email,
                                    recipient_name: selectedMessage.name,
                                    message: replyContent,
                                  }),
                                }
                              );

                              setTimeout(() => {
                                setShowReply(false);
                                setReplySuccess(false);
                              }, 1500);
                            } else {
                              setReplyError(
                                data.message || "Failed to send reply."
                              );
                            }
                          } catch (err) {
                            console.error("Reply error:", err);
                            setReplyError("Network error. Please try again.");
                          }

                          setReplyLoading(false);
                        }}
                        disabled={replyLoading || !replyContent.trim()}
                      >
                        {replyLoading ? "Sending..." : "Send Reply"}
                      </button>
                      <button
                        className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
                        onClick={() => setShowReply(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      {/* Top Header */}
      <div className="bg-gray-800/50 backdrop-blur-xl border-b border-gray-700/50 px-6 py-4 sticky top-0 z-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-700/50 rounded-lg transition-all duration-200"
            >
              <Menu size={20} className="text-gray-400" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Mail size={16} className="text-white" />
              </div>
              <h1 className="text-xl font-light text-gray-100">School Inbox</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? "w-64" : "w-16"
          } bg-gray-800/30 backdrop-blur-xl border-r border-gray-700/50 transition-all duration-300 flex-shrink-0`}
        >
          <div className="p-4 space-y-2">
            <div
              className={`flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 ${
                !sidebarOpen ? "justify-center" : ""
              } cursor-pointer`}
              onClick={handleInboxClick}
            >
              <Inbox size={20} className="text-blue-400" />
              {sidebarOpen && (
                <span className="text-gray-200 font-medium">Inbox</span>
              )}
              {sidebarOpen && (
                <span className="ml-auto bg-blue-600/30 text-blue-300 text-xs px-2 py-1 rounded-full">
                  {/* Show count only for inbox */}
                  {!showSent ? filteredSubmissions.length : ""}
                </span>
              )}
            </div>

            <div
              className={`flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-700/30 transition-all duration-200 cursor-pointer ${
                !sidebarOpen ? "justify-center" : ""
              }`}
              onClick={handleSentClick}
            >
              <Send size={20} className="text-green-400" />
              {sidebarOpen && <span className="text-gray-300">Sent</span>}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Search and Filters */}
          <div className="bg-gray-800/20 backdrop-blur-xl border-b border-gray-700/30 p-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-xl text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:bg-gray-800/60 transition-all duration-200"
                />
                <Search
                  className="absolute left-4 top-4 text-gray-400"
                  size={16}
                />
              </div>
              <button
                className="p-3 bg-gray-800/40 border border-gray-700/50 rounded-xl hover:bg-gray-700/40 transition-all duration-200"
                onClick={fetchSubmissions} // <-- Add this
                disabled={loading}
                title="Refresh"
              >
                <RefreshCw size={16} className="text-gray-400" />
              </button>
            </div>
          </div>

          {/* Toolbar */}
          {!loading && !error && currentSubmissions.length > 0 && (
            <div className="bg-gray-800/20 backdrop-blur-xl border-b border-gray-700/30 px-6 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={
                        selectedMessages.size === currentSubmissions.length &&
                        currentSubmissions.length > 0
                      }
                      onChange={handleSelectAll}
                      className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-800"
                    />
                  </div>

                  {selectedMessages.size > 0 && (
                    <>
                      <span className="text-sm text-blue-400 bg-blue-600/20 px-3 py-1 rounded-lg">
                        {selectedMessages.size} selected
                      </span>
                      <button
                        className="ml-2 px-3 py-1 rounded-lg bg-red-600/80 text-white hover:bg-red-700 transition-all duration-200 disabled:opacity-60"
                        onClick={handleDeleteMessages}
                        disabled={deleteLoading}
                        title="Delete selected"
                      >
                        {deleteLoading ? "Deleting..." : "Delete"}
                      </button>
                    </>
                  )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center space-x-3 text-sm text-gray-400">
                    <span className="bg-gray-800/40 px-3 py-1 rounded-lg">
                      {indexOfFirstItem + 1}–
                      {Math.min(indexOfLastItem, filteredSubmissions.length)} of{" "}
                      {filteredSubmissions.length}
                    </span>
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg hover:bg-gray-800/50 disabled:text-gray-600 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg hover:bg-gray-800/50 disabled:text-gray-600 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex-1 flex justify-center items-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent mx-auto"></div>
                <span className="mt-4 text-gray-400">Loading messages...</span>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="m-6 bg-red-500/10 border border-red-500/30 text-red-400 px-6 py-4 rounded-xl backdrop-blur-xl">
              <strong className="font-medium">Error:</strong> {error}
            </div>
          )}

          {/* Empty States */}
          {!loading && !error && submissions.length === 0 && (
            <div className="flex-1 flex justify-center items-center">
              <div className="text-center">
                <Inbox className="mx-auto h-16 w-16 text-gray-600 mb-4" />
                <h3 className="text-xl font-light text-gray-300 mb-2">
                  Your inbox is empty
                </h3>
                <p className="text-gray-500">
                  No contact form submissions to display.
                </p>
              </div>
            </div>
          )}

          {!loading &&
            !error &&
            submissions.length > 0 &&
            filteredSubmissions.length === 0 && (
              <div className="flex-1 flex justify-center items-center">
                <div className="text-center">
                  <Search className="mx-auto h-16 w-16 text-gray-600 mb-4" />
                  <h3 className="text-xl font-light text-gray-300 mb-2">
                    No messages found
                  </h3>
                  <p className="text-gray-500">
                    Try different keywords or clear your search.
                  </p>
                </div>
              </div>
            )}

          {/* Messages List */}
          {!loading && !error && currentSubmissions.length > 0 && (
            <div className="flex-1 overflow-auto">
              <div className="divide-y divide-gray-700/30">
                {currentSubmissions.map((submission) => (
                  <div
                    key={submission.id}
                    className={`flex items-center px-6 py-4 hover:bg-gray-800/20 cursor-pointer transition-all duration-200 group ${
                      selectedMessages.has(submission.id)
                        ? "bg-blue-600/10 border-l-4 border-blue-500"
                        : ""
                    } ${
                      !readMessages.has(submission.id) ? "bg-gray-800/10" : ""
                    }`}
                    onClick={() => handleMessageClick(submission)}
                  >
                    <div className="flex items-center space-x-4 flex-shrink-0">
                      <input
                        type="checkbox"
                        checked={selectedMessages.has(submission.id)}
                        onClick={(e) => e.stopPropagation()} // Prevents opening the message
                        onChange={(e) => handleSelectMessage(submission.id)}
                        className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-800"
                      />
                    </div>

                    <div className="flex-1 min-w-0 ml-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 flex-1 min-w-0">
                          <div
                            className={`w-10 h-10 ${getAvatarColor(
                              showSent
                                ? submission.recipient_name
                                : submission.name
                            )} rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0 shadow-lg`}
                          >
                            {getInitials(
                              showSent
                                ? submission.recipient_name
                                : submission.name
                            )}
                          </div>
                          <div
                            className={`font-medium flex-shrink-0 w-48 truncate ${
                              !readMessages.has(submission.id)
                                ? "text-gray-100"
                                : "text-gray-300"
                            }`}
                          >
                            {showSent
                              ? submission.recipient_name
                              : submission.name}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div
                              className={`truncate ${
                                !readMessages.has(submission.id)
                                  ? "text-gray-200"
                                  : "text-gray-400"
                              }`}
                            >
                              <span
                                className={`${
                                  !readMessages.has(submission.id)
                                    ? "font-medium"
                                    : "font-normal"
                                }`}
                              >
                                {showSent
                                  ? "Sent Message - "
                                  : "Contact Form - "}
                              </span>
                              {truncateMessage(submission.message)}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500 flex-shrink-0 ml-4 bg-gray-800/30 px-2 py-1 rounded-lg">
                          {formatDate(submission.sent_at)}
                        </div>
                      </div>
                    </div>

                    {/* Unread indicator */}
                    {!readMessages.has(submission.id) && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full ml-3 flex-shrink-0"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
