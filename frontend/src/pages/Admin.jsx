import React, { useEffect, useState } from "react";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "", // Replace with your API base URL
  withCredentials: true, // Send cookies with requests
});

const AdminPanel = () => {
  const [tours, setTours] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    city: "",
    address: "",
    distance: "",
    photo: "",
    desc: "",
    price: "",
    maxGroupSize: "",
    featured: false,
  });
  const [editMode, setEditMode] = useState(false);
  const [selectedTourId, setSelectedTourId] = useState(null);

  // Fetch all tours
  const fetchTours = async () => {
    try {
      const response = await axiosInstance.get("http://localhost:8000/api/v1/tours/admin/getAllTour");
      setTours(response.data.data);
    } catch (error) {
      console.error("Error fetching tours:", error);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Create or update tour
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axiosInstance.put(`http://localhost:8000/api/v1/tours/${selectedTourId}`, formData);
      } else {
        await axiosInstance.post("http://localhost:8000/api/v1/tours", formData);
      }
      fetchTours();
      setFormData({
        title: "",
        city: "",
        address: "",
        distance: "",
        photo: "",
        desc: "",
        price: "",
        maxGroupSize: "",
        featured: false,
      });
      setEditMode(false);
      setSelectedTourId(null);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Delete tour
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`http://localhost:8000/api/v1/tours/${id}`);
      fetchTours();
    } catch (error) {
      console.error("Error deleting tour:", error);
    }
  };

  // Edit tour
  const handleEdit = (tour) => {
    setFormData({
      title: tour.title,
      city: tour.city,
      address: tour.address,
      distance: tour.distance,
      photo: tour.photo,
      desc: tour.desc,
      price: tour.price,
      maxGroupSize: tour.maxGroupSize,
      featured: tour.featured,
    });
    setEditMode(true);
    setSelectedTourId(tour._id);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-2xl font-bold text-center mb-5">Admin Panel</h1>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        <h2 className="text-xl font-semibold">
          {editMode ? "Edit Tour" : "Add New Tour"}
        </h2>
        <input
          type="text"
          name="title"
          placeholder="Tour Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <div className="flex gap-4">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-1/2 p-2 border rounded"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-1/2 p-2 border rounded"
          />
        </div>
        <div className="flex gap-4">
          <input
            type="number"
            name="distance"
            placeholder="Distance (km)"
            value={formData.distance}
            onChange={handleChange}
            required
            className="w-1/3 p-2 border rounded"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-1/3 p-2 border rounded"
          />
          <input
            type="number"
            name="maxGroupSize"
            placeholder="Max Group Size"
            value={formData.maxGroupSize}
            onChange={handleChange}
            required
            className="w-1/3 p-2 border rounded"
          />
        </div>
        <textarea
          name="desc"
          placeholder="Description"
          value={formData.desc}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="photo"
          placeholder="Photo URL"
          value={formData.photo}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
          />
          Featured
        </label>
        <button
          type="submit"
          className="w-full bg-[#faa935] text-white py-2 rounded hover:bg-blue-600"
        >
          {editMode ? "Update Tour" : "Add Tour"}
        </button>
      </form>

      {/* Tours List */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">All Tours</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <div
              key={tour._id}
              className="bg-white p-4 rounded shadow-md space-y-2"
            >
              <h3 className="text-lg font-bold">{tour.title}</h3>
              <p className="text-gray-600">{tour.city}</p>
              <p>${tour.price}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(tour)}
                  className="bg-[#faa935] text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(tour._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
