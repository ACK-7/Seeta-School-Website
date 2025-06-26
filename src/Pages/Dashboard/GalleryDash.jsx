import React, { useEffect, useState, useRef } from "react";
import Swal from 'sweetalert2';

import {
  HiDotsVertical,
  HiCog,
  HiPencil,
  HiTrash,
  HiOutlinePhotograph,
  HiOutlineUpload,
  HiOutlineSearch,
  HiOutlineViewGrid,
  HiOutlineViewList,
  HiOutlineX,
  HiOutlinePlus,
  HiOutlineHeart,
  HiOutlineFolder,
  HiOutlineCamera,
  HiOutlineEye,
  HiOutlineStar,
  HiEye,
  HiEyeOff
} from "react-icons/hi";
import axios from 'axios';

const API_BASE_URL = "http://localhost/API/seeta/";

// Create Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export default function GalleryDashboard() {
  const [albums, setAlbums] = useState([]);
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [title, setTitle] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [newAlbum, setNewAlbum] = useState({ title: "", description: "", coverImage: null });
  const [editImage, setEditImage] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editImageFile, setEditImageFile] = useState(null);
  const [showAlbumModal, setShowAlbumModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [editAlbum, setEditAlbum] = useState(null);
  const [editAlbumData, setEditAlbumData] = useState({ title: '', description: '', coverImage: null });

  const fileInputRef = useRef(null);

  // Handle album edit modal
    useEffect(() => {
    if (editAlbum) {
      setEditAlbumData({
        title: editAlbum.title,
        description: editAlbum.description || '',
        coverImage: null
      });
    }
  }, [editAlbum]);


  // Fetch all albums on load
  useEffect(() => {
    fetchAlbums();
  }, []);

  // Fetch images when album is selected
  useEffect(() => {
    if (selectedAlbum) {
      console.log("Selected Album:", selectedAlbum);
      fetchImages(selectedAlbum.id);
    }
  }, [selectedAlbum]);

  // Filter images by search term
  useEffect(() => {
    let filtered = images;
    if (searchTerm) {
      filtered = filtered.filter(
        (img) =>
          img.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          img.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredImages(filtered);
  }, [images, searchTerm]);

  // Fetch Albums
  const fetchAlbums = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('albums.php');
      setAlbums(Array.isArray(res.data.data) ? res.data.data : []);
    } catch (error) {
      console.error("Error fetching albums:", error);
      setAlbums([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Images by Album ID
  const fetchImages = async (albumId) => {
    try {
      setLoading(true);
      console.log("Fetching images for album ID:", albumId);
      const res = await apiClient.get('images.php', {
        params: { album_id: albumId },
      });
      setImages(res.data.data || []);
    } catch (error) {
      console.error("Error fetching images:", error);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  // Create New Album
  const handleCreateAlbum = async (e) => {
  e.preventDefault();
  if (!newAlbum.title.trim()) return;

  try {
    setLoading(true);

    const formData = new FormData();
    formData.append("title", newAlbum.title);
    if (newAlbum.description) formData.append("description", newAlbum.description);
    if (newAlbum.coverImage) formData.append("cover_image", newAlbum.coverImage);

    const res = await apiClient.post('create-album.php', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    const newAlbumData = {
      ...newAlbum,
      id: res.data.data.id,
      image_count: 0,
      created_at: new Date().toISOString(),
      cover_image: res.data.data.cover_image
    };

    setAlbums([...albums, newAlbumData]);
    setNewAlbum({ title: "", description: "", coverImage: null });
    setShowAlbumModal(false);

    //  Show success popup
    Swal.fire({
      icon: 'success',
      title: 'Album Created!',
      text: `The album "${newAlbum.title}" was successfully created.`,
      timer: 2000,
      showConfirmButton: false
    });

  } catch (err) {
    console.error("Error creating album:", err);
    Swal.fire({
      icon: 'error',
      title: 'Oops!',
      text: 'Something went wrong while creating the album.',
    });
  } finally {
    setLoading(false);
  }
};


// Edit Album
  const handleEditAlbum = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("album_id", editAlbum.id);
      formData.append("title", editAlbumData.title);
      formData.append("description", editAlbumData.description);
      if (editAlbumData.coverImage) {
        formData.append("cover_image", editAlbumData.coverImage);
      }

      const res = await apiClient.post('update-album.php', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      // Replace updated album in the list
      const updated = res.data.data;
      setAlbums(albums.map((a) => (a.id === updated.id ? updated : a)));
      setEditAlbum(null);

      Swal.fire({
        icon: 'success',
        title: 'Album Updated!',
        text: `"${updated.title}" has been updated successfully.`,
        timer: 2000,
        showConfirmButton: false
      });

    } catch (err) {
      console.error("Failed to update album:", err);
      Swal.fire({
        icon: 'error',
        title: 'Update failed',
        text: 'Could not update the album.'
      });
    } finally {
      setLoading(false);
    }
  };


  // Delete Album
    const handleDeleteAlbum = async (album) => {
    try {
      await apiClient.delete('delete-album.php', {
        data: { id: album.id },
      });

      setAlbums(albums.filter((a) => a.id !== album.id));
      if (selectedAlbum?.id === album.id) {
        setSelectedAlbum(null);
        setImages([]);
      }
      setShowDeleteConfirm(null);

      // ✅ SweetAlert success popup
      Swal.fire({
        icon: 'success',
        title: 'Album Deleted!',
        text: `"${album.title}" has been permanently removed.`,
        timer: 2000,
        showConfirmButton: false,
      });

    } catch (err) {
      console.error("Failed to delete album:", err);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to delete the album.',
      });
    }
  };


  // Upload Image
  const handleUpload = async (e) => {
    e.preventDefault();
    const file = fileInputRef.current.files[0];
    if (!file || !selectedAlbum) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", file);
      formData.append("album_id", selectedAlbum.id);
      formData.append("title", title || file.name);
      formData.append("category", "General");

      await apiClient.post('upload-image.php', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      await fetchImages(selectedAlbum.id);
      setTitle("");
      fileInputRef.current.value = "";
      setShowUploadForm(false);

      // Show success SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Image Uploaded!',
        text: 'Your image was uploaded successfully.',
        timer: 2000,
        showConfirmButton: false
      });

    } catch (err) {
      console.error("Image upload failed:", err);

      // Show error SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Upload Failed',
        text: 'There was a problem uploading your image. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete Image
  const handleDeleteImage = async (img) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Delete "${img.title}"? This cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await apiClient.delete('delete-images.php', {
          data: { image_id: img.id },
        });
        setImages(images.filter((i) => i.id !== img.id));
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'The image has been deleted.',
          timer: 1500,
          showConfirmButton: false
        });
      } catch (err) {
        console.error("Failed to delete image:", err);
        Swal.fire({
          icon: 'error',
          title: 'Delete Failed',
          text: 'Could not delete the image. Please try again.',
        });
      }
    }
  };

  // Open Edit Modal
  const openEditModal = (img) => {
    setEditImage(img);
    setEditTitle(img.title);
    setEditCategory(img.category);
  };

  // Submit Edit Image
  const handleEditImage = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image_id", editImage.id);
      formData.append("title", editTitle);
      if (editImageFile) {
        formData.append("file", editImageFile);
      }

      const res = await apiClient.post('update-image.php', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      Swal.fire({
        icon: 'success',
        title: 'Image Updated!',
        text: 'The image details have been updated.',
        timer: 1500,
        showConfirmButton: false
      });

      // Refetch images to get the latest file_path
      await fetchImages(selectedAlbum.id);
      setEditImage(null);

    } catch (err) {
      console.error("Failed to update image:", err);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'Could not update the image. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  // Set as Cover Image
  const handleSetCoverImage = async (img) => {
    try {
      await apiClient.put('update-album-cover.php', {
        album_id: selectedAlbum.id,
        cover_image_id: img.id,
      });
      setSelectedAlbum({
        ...selectedAlbum,
        cover_image_id: img.id,
      });
    } catch (err) {
      console.error("Failed to update cover image:", err);
    }
  };

  // Toggle Album Visibility
  const toggleAlbumVisibility = async (album) => {
    try {
      await apiClient.post('toggle-album-visibility.php', {
        album_id: album.id,
        visible: album.visible ? 0 : 1
      });
      // Refetch albums or update state
      fetchAlbums();
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Failed', text: 'Could not update album visibility.' });
    }
  };

  // Toggle Image Visibility
  const toggleImageVisibility = async (img) => {
    try {
      await apiClient.post('toggle-image-visibility.php', {
        image_id: img.id,
        visible: img.visible ? 0 : 1
      });
      // Refetch images or update state
      fetchImages(selectedAlbum.id);
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Failed', text: 'Could not update image visibility.' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-40 shadow-lg shadow-blue-500/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <HiOutlineCamera className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Gallery Studio
              </h1>
              <p className="text-sm text-gray-500">Professional Media Management</p>
            </div>
          </div>
          <button
            onClick={() => setShowAlbumModal(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
          >
            <HiOutlinePlus className="w-5 h-5" />
            <span>New Album</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar: Albums */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 shadow-lg shadow-blue-500/10 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
                <HiOutlineFolder className="w-5 h-5 text-blue-600" />
                <span>Albums</span>
              </h2>
              <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full font-medium">
                {albums.length}
              </span>
            </div>
            {loading && !albums.length ? (
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="animate-pulse">
                    <div className="h-16 bg-gray-200 rounded-xl"></div>
                  </div>
                ))}
              </div>
            ) : (
              <ul className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
                {albums.map((album) => (
                  <li key={album.id}>
                    <button
                      onClick={() => setSelectedAlbum(album)}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-200 group ${
                        selectedAlbum?.id === album.id
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                          : "bg-white/50 hover:bg-white/80 hover:shadow-md border border-white/30"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-semibold truncate ${
                            selectedAlbum?.id === album.id ? "text-white" : "text-gray-800"
                          }`}>
                            {album.title}
                          </h3>
                          <p className={`text-sm mt-1 truncate ${
                            selectedAlbum?.id === album.id ? "text-blue-100" : "text-gray-500"
                          }`}>
                            {album.description}
                          </p>
                          <div className={`flex items-center space-x-3 mt-2 text-xs ${
                            selectedAlbum?.id === album.id ? "text-blue-100" : "text-gray-400"
                          }`}>
                            <span className="flex items-center space-x-1">
                              <HiOutlinePhotograph className="w-3 h-3" />
                              <span>{album.image_count || 0} images</span>
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowDeleteConfirm(album);
                          }}
                          className={`opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg ${
                            selectedAlbum?.id === album.id 
                              ? "hover:bg-white/20 text-white" 
                              : "hover:bg-red-50 text-red-500"
                          }`}
                        >
                          <HiTrash className="w-4 h-4" />
                        </button>
                        {/* edit */}
                        <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditAlbum(album); // <-- store album in state
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg hover:bg-blue-50 text-blue-600"
                          >
                            <HiPencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toggleAlbumVisibility(album)}
                          title={album.visible ? "Hide from public" : "Show on public"}
                        >
                          {album.visible ? <HiEye className="text-green-500" /> : <HiEyeOff className="text-gray-400" />}
                        </button>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Upload Form */}
          {selectedAlbum && (
            <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 shadow-lg shadow-blue-500/10 border border-white/20">
              <button
                onClick={() => setShowUploadForm(true)}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white p-3 rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <HiOutlineUpload className="w-5 h-5" />
                <span>Upload Images</span>
              </button>
            </div>
          )}
        </aside>

        {/* Main Content: Images */}
        <section className="lg:col-span-3 space-y-6">
          {selectedAlbum ? (
            <>
              {/* Album Header */}
              <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 shadow-lg shadow-blue-500/10 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      {selectedAlbum.title}
                    </h2>
                    <p className="text-gray-600 mb-4">{selectedAlbum.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center space-x-1">
                        <HiOutlinePhotograph className="w-4 h-4" />
                        <span>{filteredImages.length} images</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <HiOutlineHeart className="w-4 h-4" />
                        <span>{filteredImages.reduce((acc, img) => acc + (Number(img?.likes) || 0), 0)} total likes</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search images..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm"
                      />
                    </div>
                    <div className="flex bg-gray-100 rounded-xl p-1">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2 rounded-lg transition-all ${
                          viewMode === "grid" 
                            ? "bg-white text-blue-600 shadow-md" 
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        <HiOutlineViewGrid className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setViewMode("table")}
                        className={`p-2 rounded-lg transition-all ${
                          viewMode === "table" 
                            ? "bg-white text-blue-600 shadow-md" 
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        <HiOutlineViewList className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Images Display */}
              <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 shadow-lg shadow-blue-500/10 border border-white/20">
                {loading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                      <div key={i} className="animate-pulse">
                        <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                      </div>
                    ))}
                  </div>
                ) : filteredImages.length === 0 ? (
                  <div className="text-center py-12">
                    <HiOutlinePhotograph className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-600 mb-2">No images found</h3>
                    <p className="text-gray-400">Upload some images to get started</p>
                  </div>
                ) : (
                  <>
                    {/* Grid View */}
                    {viewMode === "grid" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredImages
                          .filter(img => img && img.file_path)
                          .map(img => (
                            <div
                              key={img.id}
                              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                            >
                              <div className="relative overflow-hidden">
                                <img
                                  src={img.file_path}
                                  alt={img.title || ""}
                                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <div className="relative">
                                    <button className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
                                      <HiDotsVertical className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="p-4">
                                <h3 className="font-semibold text-gray-800 mb-1 truncate">{img.title}</h3>
                                <p className="text-sm text-gray-500 mb-3">{img.category}</p>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-1 text-red-500">
                                    <HiOutlineHeart className="w-4 h-4" />
                                    <span className="text-sm font-medium">{img.likes || 0}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <button
                                      onClick={() => handleSetCoverImage(img)}
                                      className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                      title="Set as cover"
                                    >
                                      <HiOutlineStar className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => openEditModal(img)}
                                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                      title="Edit"
                                    >
                                      <HiPencil className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteImage(img)}
                                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                      title="Delete"
                                    >
                                      <HiTrash className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => toggleImageVisibility(img)}
                                      title={img.visible ? "Hide from public" : "Show on public"}
                                    >
                                      {img.visible ? <HiEye className="text-green-500" /> : <HiEyeOff className="text-gray-400" />}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}

                    {/* Table View */}
                    {viewMode === "table" && (
                      <div className="overflow-x-auto">
                        <table className="min-w-full">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-4 px-4 font-semibold text-gray-600">Preview</th>
                              <th className="text-left py-4 px-4 font-semibold text-gray-600">Title</th>
                              <th className="text-left py-4 px-4 font-semibold text-gray-600">Category</th>
                              <th className="text-left py-4 px-4 font-semibold text-gray-600">Likes</th>
                              <th className="text-right py-4 px-4 font-semibold text-gray-600">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {filteredImages
                              .filter(img => img && img.file_path)
                              .map(img => (
                                <tr key={img.id} className="hover:bg-gray-50/50 transition-colors">
                                  <td className="py-4 px-4">
                                    <img
                                      src={img.file_path}
                                      alt={img.title || ""}
                                      className="w-12 h-12 object-cover rounded-lg"
                                    />
                                  </td>
                                  <td className="py-4 px-4 font-medium text-gray-800">{img.title}</td>
                                  <td className="py-4 px-4 text-gray-600">{img.category}</td>
                                  <td className="py-4 px-4">
                                    <div className="flex items-center space-x-1 text-red-500">
                                      <HiOutlineHeart className="w-4 h-4" />
                                      <span>{img.likes || 0}</span>
                                    </div>
                                  </td>
                                  <td className="py-4 px-4">
                                    <div className="flex items-center justify-end space-x-2">
                                      <button
                                        onClick={() => handleSetCoverImage(img)}
                                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                        title="Set as cover"
                                      >
                                        <HiOutlineStar className="w-4 h-4" />
                                      </button>
                                      <button
                                        onClick={() => openEditModal(img)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        title="Edit"
                                      >
                                        <HiPencil className="w-4 h-4" />
                                      </button>
                                      <button
                                        onClick={() => handleDeleteImage(img)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Delete"
                                      >
                                        <HiTrash className="w-4 h-4" />
                                      </button>
                                      <button
                                        onClick={() => toggleImageVisibility(img)}
                                        title={img.visible ? "Hide from public" : "Show on public"}
                                      >
                                        {img.visible ? <HiEye className="text-green-500" /> : <HiEyeOff className="text-gray-400" />}
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </>
                )}
              </div>
            </>
          ) : (
            <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-12 shadow-lg shadow-blue-500/10 border border-white/20 text-center">
              <HiOutlineFolder className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">Select an Album</h3>
              <p className="text-gray-400">Choose an album from the sidebar to manage its images</p>
            </div>
          )}
        </section>
      </main>

      {/* Upload Image Modal */}
      {showUploadForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-800">Upload Image</h3>
              <button
                onClick={() => setShowUploadForm(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <HiOutlineX className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleUpload} className="p-6 space-y-4">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Image Title (Optional)"
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm"
              />
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                required
                className="w-full p-3 border border-gray-200 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 bg-white/70 backdrop-blur-sm"
              />
              <div className="flex space-x-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 font-medium"
                >
                  {loading ? "Uploading..." : "Upload"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowUploadForm(false)}
                  className="px-4 py-3 bg-gray-200 text-gray-600 rounded-xl hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Image */}
      {editImage && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-800">Edit Image</h3>
              <button
                onClick={() => setEditImage(null)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <HiOutlineX className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleEditImage} className="p-6 space-y-6">
              <div className="text-center">
                <img
                  src={editImage.file_path}
                  alt={editImage.title}
                  className="w-32 h-32 object-cover rounded-xl mx-auto shadow-lg"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image Title</label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter image title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <input
                    type="text"
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter category"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Replace Image (Optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setEditImageFile(e.target.files[0])}
                    className="w-full p-3 border border-gray-200 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditImage(null)}
                  className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg font-medium transition-all disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Create Album */}
      {showAlbumModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-800">Create New Album</h3>
              <button
                onClick={() => setShowAlbumModal(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <HiOutlineX className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateAlbum} className="p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Album Title *</label>
                  <input
                    type="text"
                    value={newAlbum.title}
                    onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })}
                    placeholder="Enter album title"
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newAlbum.description}
                    onChange={(e) => setNewAlbum({ ...newAlbum, description: e.target.value })}
                    placeholder="Enter album description"
                    rows={3}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image (Optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewAlbum({ ...newAlbum, coverImage: e.target.files[0] })}
                    className="w-full p-3 border border-gray-200 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setShowAlbumModal(false);
                    setNewAlbum({ title: "", description: "", coverImage: null });
                  }}
                  className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newAlbum.title.trim() || loading}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg font-medium transition-all disabled:opacity-50"
                >
                  {loading ? "Creating..." : "Create Album"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Album */}
      {editAlbum && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-800">Edit Album</h3>
              <button onClick={() => setEditAlbum(null)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <HiOutlineX className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleEditAlbum} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1">Album Title</label>
                <input
                  type="text"
                  value={editAlbumData.title}
                  onChange={(e) => setEditAlbumData({ ...editAlbumData, title: e.target.value })}
                  className="w-full p-3 border rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editAlbumData.description}
                  onChange={(e) => setEditAlbumData({ ...editAlbumData, description: e.target.value })}
                  className="w-full p-3 border rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Change Cover Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setEditAlbumData({ ...editAlbumData, coverImage: e.target.files[0] })}
                  className="w-full p-3 border rounded-xl"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditAlbum(null)}
                  className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!editAlbumData.title.trim()}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {/* Modal: Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HiTrash className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Delete Album</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "{showDeleteConfirm.title}"? This will permanently remove the album and all its images. This action cannot be undone.
              </p>
              <div className="flex justify-center space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteAlbum(showDeleteConfirm)}
                  className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 font-medium transition-colors"
                >
                  Delete Album
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}