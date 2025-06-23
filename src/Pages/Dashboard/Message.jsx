import React, { useState, useEffect } from "react";
import { 
  Search, 
  ChevronLeft, 
  ChevronRight,
  Inbox,
  Star,
  Trash2,
  Archive,
  Reply,
  Forward,
  MoreVertical,
  Check,
  RefreshCw,
  Mail,
  Menu,
  Settings,
  User,
  Calendar,
  Send,
  Filter,
  Eye,
  EyeOff,
  X
} from "lucide-react";

const Message = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMessages, setSelectedMessages] = useState(new Set());
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [starredMessages, setStarredMessages] = useState(new Set());
  const [readMessages, setReadMessages] = useState(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulating API call - replace with your actual API using fetch
        const response = await fetch("http://localhost/API/contact_submissions.php", {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });
        
        const data = await response.json();
        
        if (data.success) {
          setSubmissions(data.data || []);
        } else {
          throw new Error(data.message || "Failed to fetch data");
        }
        
      } catch (err) {
        console.error("Error fetching submissions:", err);
        
        if (err.name === 'AbortError') {
          setError("Request timeout. Please check if the server is running.");
        } else {
          setError("Cannot connect to server. Please check if the API server is running.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  // Filter submissions based on search term
  const filteredSubmissions = submissions.filter((submission) =>
    Object.values(submission).some(
      (value) =>
        value != null &&
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Apply pagination to filtered results
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSubmissions = filteredSubmissions.slice(indexOfFirstItem, indexOfLastItem);
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
      setSelectedMessages(new Set(currentSubmissions.map(sub => sub.id)));
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

  const handleStarMessage = (id) => {
    const newStarred = new Set(starredMessages);
    if (newStarred.has(id)) {
      newStarred.delete(id);
    } else {
      newStarred.add(id);
    }
    setStarredMessages(newStarred);
  };

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
    setReadMessages(prev => new Set([...prev, message.id]));
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
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays <= 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const truncateMessage = (text, maxLength = 100) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getAvatarColor = (name) => {
    const colors = [
      'bg-purple-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 
      'bg-pink-500', 'bg-indigo-500', 'bg-red-500', 'bg-teal-500'
    ];
    const index = name.length % colors.length;
    return colors[index];
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
                  <Archive size={18} />
                </button>
                <button className="text-gray-400 hover:text-red-400 p-2 rounded-lg hover:bg-gray-800/50 transition-all duration-200">
                  <Trash2 size={18} />
                </button>
                <button className="text-gray-400 hover:text-green-400 p-2 rounded-lg hover:bg-gray-800/50 transition-all duration-200">
                  <Reply size={18} />
                </button>
                <button className="text-gray-400 hover:text-purple-400 p-2 rounded-lg hover:bg-gray-800/50 transition-all duration-200">
                  <Forward size={18} />
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
                  <div className={`w-12 h-12 ${getAvatarColor(selectedMessage.name)} rounded-full flex items-center justify-center text-white font-medium shadow-lg`}>
                    {getInitials(selectedMessage.name)}
                  </div>
                  <div>
                    <div className="font-medium text-gray-100 text-lg">{selectedMessage.name}</div>
                    <div className="text-gray-400 text-sm">{selectedMessage.email}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-800/40 rounded-xl p-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                  <div className="text-gray-100 text-lg">{selectedMessage.phone || 'Not provided'}</div>
                </div>
                
                <div className="bg-gray-800/40 rounded-xl p-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <div className="text-gray-100 whitespace-pre-wrap leading-relaxed text-lg">
                    {selectedMessage.message}
                  </div>
                </div>
                
                <div className="bg-gray-800/40 rounded-xl p-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Received</label>
                  <div className="text-gray-400">
                    {new Date(selectedMessage.sent_at).toLocaleString()}
                  </div>
                </div>

                {/* Add Image Display Section */}
                {selectedMessage.images && selectedMessage.images.length > 0 && (
                  <div className="bg-gray-800/40 rounded-xl p-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Attached Images</label>
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
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 shadow-lg">
                  <Reply size={18} />
                  <span>Reply</span>
                </button>
                <button className="bg-gray-800/50 text-gray-300 px-6 py-3 rounded-xl hover:bg-gray-700/50 transition-all duration-200 flex items-center space-x-2">
                  <Forward size={18} />
                  <span>Forward</span>
                </button>
              </div>
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
          
          <div className="flex items-center space-x-3">
            <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-all duration-200 text-gray-400 hover:text-gray-200">
              <Settings size={18} />
            </button>
            <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-all duration-200 text-gray-400 hover:text-gray-200">
              <User size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-gray-800/30 backdrop-blur-xl border-r border-gray-700/50 transition-all duration-300 flex-shrink-0`}>
          <div className="p-4 space-y-2">
            <div className={`flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 ${!sidebarOpen ? 'justify-center' : ''}`}>
              <Inbox size={20} className="text-blue-400" />
              {sidebarOpen && <span className="text-gray-200 font-medium">Inbox</span>}
              {sidebarOpen && <span className="ml-auto bg-blue-600/30 text-blue-300 text-xs px-2 py-1 rounded-full">{filteredSubmissions.length}</span>}
            </div>
            
            <div className={`flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-700/30 transition-all duration-200 cursor-pointer ${!sidebarOpen ? 'justify-center' : ''}`}>
              <Star size={20} className="text-yellow-400" />
              {sidebarOpen && <span className="text-gray-300">Starred</span>}
              {sidebarOpen && <span className="ml-auto text-gray-500 text-xs">{starredMessages.size}</span>}
            </div>
            
            <div className={`flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-700/30 transition-all duration-200 cursor-pointer ${!sidebarOpen ? 'justify-center' : ''}`}>
              <Send size={20} className="text-green-400" />
              {sidebarOpen && <span className="text-gray-300">Sent</span>}
            </div>
            
            <div className={`flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-700/30 transition-all duration-200 cursor-pointer ${!sidebarOpen ? 'justify-center' : ''}`}>
              <Trash2 size={20} className="text-red-400" />
              {sidebarOpen && <span className="text-gray-300">Trash</span>}
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
                <Search className="absolute left-4 top-4 text-gray-400" size={16} />
              </div>
              <button className="p-3 bg-gray-800/40 border border-gray-700/50 rounded-xl hover:bg-gray-700/40 transition-all duration-200">
                <Filter size={16} className="text-gray-400" />
              </button>
              <button className="p-3 bg-gray-800/40 border border-gray-700/50 rounded-xl hover:bg-gray-700/40 transition-all duration-200">
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
                      checked={selectedMessages.size === currentSubmissions.length && currentSubmissions.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-800"
                    />
                    <button className="text-gray-400 hover:text-blue-400 p-2 rounded-lg hover:bg-gray-800/50 transition-all duration-200">
                      <Archive size={16} />
                    </button>
                    <button className="text-gray-400 hover:text-red-400 p-2 rounded-lg hover:bg-gray-800/50 transition-all duration-200">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  {selectedMessages.size > 0 && (
                    <span className="text-sm text-blue-400 bg-blue-600/20 px-3 py-1 rounded-lg">
                      {selectedMessages.size} selected
                    </span>
                  )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center space-x-3 text-sm text-gray-400">
                    <span className="bg-gray-800/40 px-3 py-1 rounded-lg">
                      {indexOfFirstItem + 1}–{Math.min(indexOfLastItem, filteredSubmissions.length)} of {filteredSubmissions.length}
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
                <h3 className="text-xl font-light text-gray-300 mb-2">Your inbox is empty</h3>
                <p className="text-gray-500">No contact form submissions to display.</p>
              </div>
            </div>
          )}

          {!loading && !error && submissions.length > 0 && filteredSubmissions.length === 0 && (
            <div className="flex-1 flex justify-center items-center">
              <div className="text-center">
                <Search className="mx-auto h-16 w-16 text-gray-600 mb-4" />
                <h3 className="text-xl font-light text-gray-300 mb-2">No messages found</h3>
                <p className="text-gray-500">Try different keywords or clear your search.</p>
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
                      selectedMessages.has(submission.id) ? 'bg-blue-600/10 border-l-4 border-blue-500' : ''
                    } ${!readMessages.has(submission.id) ? 'bg-gray-800/10' : ''}`}
                    onClick={() => handleMessageClick(submission)}
                  >
                    <div className="flex items-center space-x-4 flex-shrink-0">
                      <input
                        type="checkbox"
                        checked={selectedMessages.has(submission.id)}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleSelectMessage(submission.id);
                        }}
                        className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-800"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStarMessage(submission.id);
                        }}
                        className="text-gray-500 hover:text-yellow-400 transition-colors duration-200"
                      >
                        <Star 
                          size={16} 
                          className={starredMessages.has(submission.id) ? "text-yellow-400 fill-yellow-400" : ""} 
                        />
                      </button>
                    </div>

                    <div className="flex-1 min-w-0 ml-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 flex-1 min-w-0">
                          <div className={`w-10 h-10 ${getAvatarColor(submission.name)} rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0 shadow-lg`}>
                            {getInitials(submission.name)}
                          </div>
                          <div className={`font-medium flex-shrink-0 w-48 truncate ${!readMessages.has(submission.id) ? 'text-gray-100' : 'text-gray-300'}`}>
                            {submission.name}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className={`truncate ${!readMessages.has(submission.id) ? 'text-gray-200' : 'text-gray-400'}`}>
                              <span className={`${!readMessages.has(submission.id) ? 'font-medium' : 'font-normal'}`}>Contact Form - </span>
                              {truncateMessage(submission.message)}
                            </div>
                            {/* Add Image Preview Thumbnail */}
                            {submission.images && submission.images.length > 0 && (
                              <div className="flex space-x-2 mt-2">
                                {submission.images.slice(0, 3).map((image, index) => (
                                  <div key={index} className="w-8 h-8 rounded-lg overflow-hidden">
                                    <img 
                                      src={image.url} 
                                      alt={`Thumbnail ${index + 1}`}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                ))}
                                {submission.images.length > 3 && (
                                  <div className="w-8 h-8 rounded-lg bg-gray-700 flex items-center justify-center text-xs text-gray-300">
                                    +{submission.images.length - 3}
                                  </div>
                                )}
                              </div>
                            )}
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