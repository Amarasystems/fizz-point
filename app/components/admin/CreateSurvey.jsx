"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateSurvey = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "VALID",
    expiresAt: "",
    minMinutes: 1,
    maxMinutes: 3,
    point: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.title || !formData.description || !formData.expiresAt) {
      toast.error("All fields are required.", {
        position: "top-center",
      });
      return;
    }

    if (formData.point === 0) {
      toast.error("Point value cannot be 0.", {
        position: "top-center",
      });
      return;
    }

    const postData = {
      title: formData.title,
      description: formData.description,
      status: formData.status,
      expiresAt: formData.expiresAt,
      minMinutes: formData.minMinutes,
      maxMinutes: formData.maxMinutes,
      point: formData.point,
    };

    setLoading(true);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/api/survey`,
        postData
      );
      setLoading(false);
      toast.success("Post created successfully!", {
        position: "top-center",
      });

      setFormData({
        title: "",
        description: "",
        status: "VALID",
        expiresAt: "",
        minMinutes: 1,
        maxMinutes: 3,
        point: 0,
      });
    } catch (error) {
      setLoading(false);
      toast.error(
        "An error occurred while creating the post. Please try again.",
        {
          position: "top-center",
        }
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-white mb-6">
        Create a Survey
      </h1>

      {/* Toast Notifications */}
      <ToastContainer />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-lg text-white">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-lg text-white">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            rows="5"
          ></textarea>
        </div>

        <div>
          <label htmlFor="status" className="block text-lg text-white">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="VALID">VALID</option>
            <option value="PENDING">NOT VALID</option>
          </select>
        </div>

        <div>
          <label htmlFor="expiresAt" className="block text-lg text-white">
            Expiration Date and Time
          </label>
          <input
            type="datetime-local"
            id="expiresAt"
            name="expiresAt"
            value={formData.expiresAt}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="minMinutes" className="block text-lg text-white">
            Minimum Minutes
          </label>
          <input
            type="number"
            id="minMinutes"
            name="minMinutes"
            value={formData.minMinutes}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            min={1}
          />
        </div>

        <div>
          <label htmlFor="maxMinutes" className="block text-lg text-white">
            Maximum Minutes
          </label>
          <input
            type="number"
            id="maxMinutes"
            name="maxMinutes"
            value={formData.maxMinutes}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            min={1}
          />
        </div>

        <div>
          <label htmlFor="point" className="block text-lg text-white">
            Points
          </label>
          <input
            type="number"
            id="point"
            name="point"
            value={formData.point}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            min={1}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md"
        >
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default CreateSurvey;
