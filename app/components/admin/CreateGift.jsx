"use client";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateGift = () => {
  const [loading, setLoading] = useState(false);
  const [imageUri, setImageUri] = useState({
    image1: null,
    image2: null,
  });

  const [formData, setFormData] = useState({
    name: "",
    probability: 0,
    limit: 1,
    text: "",
    type: "POINT",
    point: "",
    isCoupon: false,
    expiresAt: "",
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => {
      if (name === "type") {
        return {
          ...prev,
          type: newValue,
          probability: newValue === "SPIN" ? 1 : 0,
          point: newValue === "POINT" ? prev.point : "",
          isCoupon: newValue === "POINT" ? prev.isCoupon : false,
        };
      }
      return {
        ...prev,
        [name]: newValue,
      };
    });
  };

  const handleImageUpload = async (file, imageType) => {
    if (!file) return;

    const form = new FormData();
    form.append("image", file);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/api/document/image/upload`,
        form,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data && response.data.response) {
        setImageUri((prev) => ({
          ...prev,
          [imageType]: response.data.response,
        }));

        toast.success(`Image ${imageType} uploaded successfully!`, {
          position: "top-center",
          autoClose: 1500,
        });
      }
    } catch (error) {
      toast.error("Failed to upload image. Please try again.", {
        position: "top-center",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.text || !formData.type || !formData.expiresAt) {
      toast.error("Please fill in all required fields.", {
        position: "top-center",
      });
      return;
    }

    if (formData.type === "POINT") {
      if (!formData.point || Number(formData.point) <= 0) {
        toast.error("Points must be greater than 0.", {
          position: "top-center",
        });
        return;
      }
      if (!imageUri.image1) {
        toast.error("Please upload image 1.", { position: "top-center" });
        return;
      }
    }

    if (formData.type === "SPIN") {
      if (!formData.probability || Number(formData.probability) <= 0) {
        toast.error("Probability must be greater than 0.", {
          position: "top-center",
        });
        return;
      }
      if (!imageUri.image1 || !imageUri.image2) {
        toast.error("Please upload both images.", { position: "top-center" });
        return;
      }
    }

    setLoading(true);

    try {
      // Prepare payload - plain JSON with image URLs included
      const payload = {
        ...formData,
        image1: imageUri.image1 || "",
        image2: imageUri.image2 || "",
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/api/gift`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Gift created successfully!", {
          position: "top-center",
          autoClose: 1500,
        });

        // Reset form
        setFormData({
          name: "",
          probability: 0,
          limit: 1,
          text: "",
          type: "POINT",
          point: "",
          isCoupon: false,
          expiresAt: "",
        });

        setImageUri({ image1: null, image2: null });
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create gift. Please try again.", {
        position: "top-center",
        autoClose: 1500,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-white mb-6">Create Gift</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Type */}
        <div>
          <label htmlFor="type" className="block text-lg text-white">Төрөл</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="SPIN">SPIN</option>
            <option value="POINT">POINT</option>
          </select>
        </div>

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-lg text-white">Нэр</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Бэлгийн нэрийг оруулна уу"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Text */}
        <div>
          <label htmlFor="text" className="block text-lg text-white">Текст</label>
          <textarea
            id="text"
            name="text"
            value={formData.text}
            onChange={handleChange}
            placeholder="Тайлбар эсвэл мессеж оруулна уу"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            rows={3}
            required
          />
        </div>

        {/* Limit */}
        <div>
          <label htmlFor="limit" className="block text-lg text-white">Тоо ширхэг</label>
          <input
            type="number"
            id="limit"
            name="limit"
            value={formData.limit}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            min={1}
          />
        </div>

        {/* Probability */}
        {formData.type === "SPIN" && (
          <div>
            <label htmlFor="probability" className="block text-lg text-white">Магадлал</label>
            <input
              type="number"
              id="probability"
              name="probability"
              value={formData.probability}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        )}

        {/* Points */}
        {formData.type === "POINT" && (
          <>
            <div>
              <label htmlFor="point" className="block text-lg text-white">Оноо</label>
              <input
                type="number"
                id="point"
                name="point"
                value={formData.point}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                min={1}
                required
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isCoupon"
                name="isCoupon"
                checked={formData.isCoupon}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="isCoupon" className="text-white">Купон уу?</label>
            </div>
          </>
        )}

        {/* Expiration */}
        <div>
          <label htmlFor="expiresAt" className="block text-lg text-white">Хүчинтэй хугацаа</label>
          <input
            type="datetime-local"
            id="expiresAt"
            name="expiresAt"
            value={formData.expiresAt}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Image 1 */}
        <div>
          <label htmlFor="image1" className="block text-lg text-white">Зураг 1</label>
          <input
            type="file"
            id="image1"
            name="image1"
            accept="image/*"
            onChange={(e) => handleImageUpload(e.target.files[0], "image1")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required={!imageUri.image1}
          />
          {imageUri.image1 && (
            <img
              src={imageUri.image1}
              alt="Uploaded Image 1"
              className="mt-2 h-20 object-contain"
            />
          )}
        </div>

        {/* Image 2 */}
        {formData.type !== "POINT" && (
          <div>
            <label htmlFor="image2" className="block text-lg text-white">Зураг 2</label>
            <input
              type="file"
              id="image2"
              name="image2"
              accept="image/*"
              onChange={(e) => handleImageUpload(e.target.files[0], "image2")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required={!imageUri.image2}
            />
            {imageUri.image2 && (
              <img
                src={imageUri.image2}
                alt="Uploaded Image 2"
                className="mt-2 h-20 object-contain"
              />
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md"
        >
          {loading ? "Бүтээж байна..." : "Бэлэг үүсгэх"}
        </button>
      </form>
    </div>
  );
};

export default CreateGift;
