import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const NewsManager = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get(
        "http://localhost/API/seeta/get_news.php"
      );
      setNewsList(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch news", error);
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      date: "",
      description: "",
    });
    setImageFile(null);
  };

  const handleAddNews = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.date ||
      !formData.description ||
      !imageFile
    ) {
      Swal.fire("Error", "All fields are required", "error");
      return;
    }

    const form = new FormData();
    form.append("title", formData.title);
    form.append("date", formData.date);
    form.append("description", formData.description);
    form.append("image", imageFile);

    try {
      await axios.post("http://localhost/API/seeta/add_news.php", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchNews();
      setShowAddModal(false);
      resetForm();
      Swal.fire("Success", "News item added successfully!", "success");
    } catch (error) {
      console.error("Error adding news:", error);
      Swal.fire("Error", "Failed to add news item", "error");
    }
  };

  const handleEditNews = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("id", editingItem.id);
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("date", formData.date);
    if (imageFile) {
      form.append("image", imageFile);
    }

    try {
      const res = await fetch("http://localhost/API/seeta/update_news.php", {
        method: "POST",
        body: form,
      });
      const result = await res.json();
      if (result.success) {
        Swal.fire("Success", "News updated successfully!", "success");
        fetchNews();
        closeModals();
      } else {
        Swal.fire("Error", result.error || "Failed to update news", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Failed to update news", "error");
    }
  };

  // For delete confirmation
  const deleteNews = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This news will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        await axios.post("http://localhost/API/seeta/delete_news.php", { id });
        fetchNews();
        Swal.fire("Deleted!", "News has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting news:", error);
        alert("Failed to delete news item");
      }
    }
  };

  const openAddModal = () => {
    resetForm();
    setShowAddModal(true);
  };

  const openEditModal = (item) => {
    setFormData({
      title: item.title,
      date: item.date,
      description: item.description,
    });
    setEditingItem(item);
    setShowEditModal(true);
  };

  const closeModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setEditingItem(null);
    resetForm();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">News Management</h2>
      <button
        className="mb-4 bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700"
        onClick={openAddModal}
      >
        + Add News Item
      </button>

      {loading ? (
        <p>Loading news...</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-black">
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {newsList.map((item) => (
              <tr key={item.id} className="text-sm">
                <td className="p-2 border">
                  {console.log(item.image)}
                  <img
                    src={
                      item.image.startsWith("http")
                        ? item.image
                        : `${window.location.origin}${item.image}`
                    }
                    alt={item.title}
                    className="w-20 h-14 object-cover"
                  />
                </td>
                <td className="p-2 border">{item.title}</td>
                <td className="p-2 border">{item.date}</td>
                <td className="p-2 border">{item.description}</td>
                <td className="p-2 border">
                  <button
                    className="bg-yellow-500 px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                    onClick={() => openEditModal(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 px-2 py-1 rounded hover:bg-red-700"
                    onClick={() => deleteNews(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 text-black">
            <h3 className="text-xl font-bold mb-4">Add News Item</h3>
            <form onSubmit={handleAddNews}>
              <div className="mb-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="date"
                  placeholder="Date (e.g. 25 JUN)"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded h-24 resize-none"
                />
              </div>
              <div className="mb-4">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full p-2 border rounded"
                  accept="image/*"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModals}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 text-black">
            <h3 className="text-xl font-bold mb-4">Edit News Item</h3>
            <form onSubmit={handleEditNews}>
              <div className="mb-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="date"
                  placeholder="Date (e.g. 25 JUN)"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded h-24 resize-none"
                />
              </div>
              <label className="block mb-2 font-semibold">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mb-4"
              />
              {imageFile ? (
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Preview"
                  className="w-32 h-20 object-cover mb-2 rounded"
                />
              ) : (
                editingItem?.image && (
                  <img
                    src={editingItem.image}
                    alt="Current"
                    className="w-32 h-20 object-cover mb-2 rounded"
                  />
                )
              )}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModals}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsManager;
