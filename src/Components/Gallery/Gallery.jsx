import React, { useState, useEffect, useRef } from "react";
import {
  Heart,
  Share2,
  MessageCircle,
  X,
  Send,
  Eye,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Images,
  Calendar,
  User
} from "lucide-react";
import axios from 'axios'; // Import Axios
import Swal from 'sweetalert2';

const ModernAlbumGallery = () => {
  const [currentView, setCurrentView] = useState("albums"); // "albums" or "gallery"
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [likes, setLikes] = useState({});
  const [userLikes, setUserLikes] = useState({});
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState("");
  const [albums, setAlbums] = useState([]);
  const [images, setImages] = useState([]);

  const galleryRef = useRef(null);
  const modalRef = useRef(null);

  // Generate a simple user identifier (could be session-based or cookie-based)
  const userIdentifier = useRef(
    `anon_${Math.random().toString(36).substring(2, 10)}`
  ).current;

  const getImageUrl = (file_path) => `${file_path}`;

  // Fetch albums on mount
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const res = await axios.get("http://localhost/API/seeta/albums.php?public=1");
        setAlbums(Array.isArray(res.data.data) ? res.data.data : []);
      } catch (err) {
        console.error("Failed to load albums", err);
        setAlbums([]);
      }
    };
    fetchAlbums();
  }, []);

  // GSAP animations
  useEffect(() => {
    if (typeof window !== "undefined" && window.gsap) {
      const items = galleryRef.current?.querySelectorAll(".gallery-item");
      if (items) {
        window.gsap.fromTo(
          items,
          {
            opacity: 0,
            y: 50,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
          }
        );
      }
    }
  }, [currentView, selectedAlbum]);

  // Load images when entering gallery view
  useEffect(() => {
    if (currentView === "gallery" && selectedAlbum) {
      const fetchImages = async () => {
        try {
          const res = await axios.get("http://localhost/API/seeta/images.php", {
            params: { album_id: selectedAlbum.id, public: 1 }
          });
          const data = Array.isArray(res.data.data) ? res.data.data : [];

          const initialLikes = {};
          const initialUserLikes = {};
          const initialComments = {};

          for (let img of data) {
            // Get like status
            const likeRes = await axios.post("http://localhost/API/seeta/check-like.php", {
              image_id: img.id,
              user_identifier: userIdentifier
            });

            const commentRes = await axios.post("http://localhost/API/seeta/get-comments.php", {
              image_id: img.id
            });

            initialUserLikes[img.id] = likeRes.data.liked;
            initialLikes[img.id] = img.likes || 0;
            initialComments[img.id] = commentRes.data.comments || [];
          }

          setImages(data);
          setLikes(initialLikes);
          setUserLikes(initialUserLikes);
          setComments(initialComments);
        } catch (err) {
          console.error("Failed to load images", err);
        }
      };

      fetchImages();
    }
  }, [currentView, selectedAlbum, userIdentifier]);

  const handleAlbumClick = (album) => {
    setSelectedAlbum(album);
    setCurrentView("gallery");
  };

  const handleBackToAlbums = () => {
    setCurrentView("albums");
    setSelectedAlbum(null);
    setImages([]);
  };

  const handleLike = async (imageId, e) => {
    e.stopPropagation();

    if (!userLikes[imageId]) {
      try {
        const res = await axios.post("http://localhost/API/seeta/like.php", {
          image_id: imageId,
          user_identifier: userIdentifier
        });

        const result = res.data;

        if (result.success) {
          setLikes((prev) => ({
            ...prev,
            [imageId]: result.likes
          }));
          setUserLikes((prev) => ({
            ...prev,
            [imageId]: true
          }));

          if (typeof window !== "undefined" && window.gsap) {
            const heart = e.target.closest(".like-btn");
            window.gsap.to(heart, {
              scale: 1.3,
              duration: 0.1,
              yoyo: true,
              repeat: 1,
              ease: "power2.out"
            });
          }
        } else {
          alert("Already liked!");
        }
      } catch (err) {
        console.error("Like failed", err);
      }
    }
  };

  const handleShare = (item, e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: `Check out: ${item.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    if (typeof window !== "undefined" && window.gsap) {
      window.gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power3.out" }
      );
    }
  };

  const navigateImage = (direction) => {
    if (!selectedImage || !selectedAlbum) return;

    const currentIndex = images.findIndex((img) => img.id === selectedImage.id);
    let nextIndex;

    if (direction === "next") {
      nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    } else {
      nextIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    }

    setSelectedImage(images[nextIndex]);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!selectedImage) return;
      if (e.key === "ArrowRight") {
        navigateImage("next");
      } else if (e.key === "ArrowLeft") {
        navigateImage("prev");
      } else if (e.key === "Escape") {
        closeModal();
      }
    };

    if (selectedImage) {
      window.addEventListener("keydown", handleKeyPress);
      return () => window.removeEventListener("keydown", handleKeyPress);
    }
  }, [selectedImage]);

  const closeModal = () => {
    if (typeof window !== "undefined" && window.gsap) {
      window.gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.2,
        onComplete: () => setSelectedImage(null)
      });
    } else {
      setSelectedImage(null);
    }
  };

  const addComment = async (imageId) => {
    if (newComment.trim()) {
      try {
        const res = await axios.post("http://localhost/API/seeta/comment.php", {
          image_id: imageId,
          user_identifier: userIdentifier,
          comment_text: newComment
        });

        const result = res.data;

        if (result.success) {
          const newCommentObj = {
            id: Date.now(),
            text: newComment,
            author: "Anonymous",
            commented_at: new Date().toISOString()
          };

          setComments((prev) => ({
            ...prev,
            [imageId]: [...(prev[imageId] || []), newCommentObj]
          }));
          setNewComment("");

          // Show success SweetAlert
          Swal.fire({
            icon: 'success',
            title: 'Comment Added!',
            text: 'Your comment was submitted successfully.',
            timer: 1500,
            showConfirmButton: false
          });
        }
      } catch (err) {
        console.error("Failed to submit comment", err);
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: 'Could not submit your comment. Please try again.',
        });
      }
    }
  };

  // Albums View
  if (currentView === "albums") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Photo Albums</h1>
            <p className="text-gray-600">Explore our collection of memorable moments</p>
          </div>

          {/* Albums Grid */}
          <div ref={galleryRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {albums.map((album) => (
              <div
                key={album.id}
                className="gallery-item group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
                onClick={() => handleAlbumClick(album)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={album.cover_image ? album.cover_image : '/path/to/default.jpg'}
                    alt={album.title}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Image Count Badge */}
                  <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center">
                    <Images className="w-4 h-4 mr-1" />
                    {album.image_count}
                  </div>
                  {/* Hover Play Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                      <Eye className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {album.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{album.description}</p>
                  {/* Album Meta */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {album.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(album.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  {/* Action Buttons */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <span className="text-blue-600 font-medium">View Album</span>
                    <button
                      onClick={(e) => handleShare(album, e)}
                      className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Load GSAP */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script> 
      </div>
    );
  }

  // Gallery View (Album Contents)
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Back Button */}
        <div className="mb-12">
          <button
            onClick={handleBackToAlbums}
            className="flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Albums
          </button>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{selectedAlbum?.title}</h1>
            <p className="text-gray-600 mb-4">{selectedAlbum?.description}</p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <Images className="w-4 h-4 mr-1" />
                {selectedAlbum?.image_count} photos
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                {selectedAlbum?.author}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(selectedAlbum?.created_at).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        {/* Images Grid */}
        <div ref={galleryRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image) => (
            <div
              key={image.id}
              className="gallery-item group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
              onClick={() => handleImageClick(image)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={image.file_path}
                  alt={image.title}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* View Count */}
                <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-full text-sm flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {Math.floor(Math.random() * 100) + 50}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors">
                  {image.title}
                </h3>
                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={(e) => handleLike(image.id, e)}
                      disabled={userLikes[image.id]}
                      className={`like-btn flex items-center space-x-1 transition-colors ${
                        userLikes[image.id]
                          ? "text-red-500 cursor-not-allowed"
                          : "text-gray-500 hover:text-red-500 cursor-pointer"
                      }`}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          userLikes[image.id] ? "fill-red-500" : ""
                        }`}
                      />
                      <span className="text-sm">{likes[image.id] || 0}</span>
                    </button>
                    <button
                      onClick={(e) => handleShare(image, e)}
                      className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleImageClick(image);
                      }}
                      className="flex items-center space-x-1 text-gray-500 hover:text-green-500 transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-sm">Comment</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div
              ref={modalRef}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            >
              <div className="relative">
                <img
                  src={selectedImage.file_path}
                  alt={selectedImage.title}
                  className="w-full h-96 object-cover"
                />

                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => navigateImage("prev")}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => navigateImage("next")}
                      className="absolute right-16 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Image Counter */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {images.findIndex((img) => img.id === selectedImage.id) + 1} / {images.length}
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {selectedImage.title}
                    </h2>
                    <p className="text-gray-600 mt-1">
                      From album: {selectedAlbum?.title}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-6 mb-6 pb-6 border-b">
                  <button
                    onClick={(e) => handleLike(selectedImage.id, e)}
                    disabled={userLikes[selectedImage.id]}
                    className={`flex items-center space-x-2 transition-colors ${
                      userLikes[selectedImage.id]
                        ? "text-red-500 cursor-not-allowed"
                        : "text-gray-600 hover:text-red-500 cursor-pointer"
                    }`}
                  >
                    <Heart
                      className={`w-6 h-6 ${
                        userLikes[selectedImage.id] ? "fill-red-500" : ""
                      }`}
                    />
                    <span>{likes[selectedImage.id] || 0} likes</span>
                  </button>
                  <button
                    onClick={(e) => handleShare(selectedImage, e)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors"
                  >
                    <Share2 className="w-6 h-6" />
                    <span>Share</span>
                  </button>
                </div>

                {/* Comment Form */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Add a Comment</h3>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Write your comment here..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onKeyPress={(e) =>
                        e.key === "Enter" && addComment(selectedImage.id)
                      }
                    />
                    <button
                      onClick={() => addComment(selectedImage.id)}
                      className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernAlbumGallery;