"use client";
import { useState } from "react";
import axios from "axios";

const Uploud = () => {
  const [files, setFiles] = useState([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (event) => {
    setFiles(Array.from(event.target.files));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert("Please select files to upload.");
      return;
    }

    const uploadedUrls = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
      );
      formData.append("folder", "CV");

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
          formData
        );
        uploadedUrls.push(response.data.secure_url);
      } catch (error) {
        console.error("Error uploading the file:", error);
        alert("Error uploading a file. Please try again.");
      }
    }

    setUploadedImageUrls(uploadedUrls);
    setShowModal(false);
  };

  const openImageModal = (url) => {
    setSelectedImage(url);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setShowModal(false);
  };

  return (
    <div>
      <div
        className="bg-[#1443FF] flex p-2 gap-2 cursor-pointer rounded-xl"
        onClick={() => setShowModal(true)}
      >
        <img className="w-[25px]" src="/icons/Uploud.png" alt="Upload" />
        <p className="text-white font-extrabold">Анкет илгээх</p>
      </div>

      {/* {showModal && (
        <Modal closeModal={closeModal}>
          <div className="flex flex-col gap-5 items-center">
            <input
            className=""
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
            <button
              className="bg-[#1443FF] p-2 rounded-md text-white"
              onClick={handleUpload}
            >
              Upload
            </button>
          </div>
        </Modal>
      )} */}

      {selectedImage && (
        <Modal closeModal={closeModal}>
          <div className="text-center">
            <img
              src={selectedImage}
              alt="Selected"
              style={{ maxWidth: "90%", maxHeight: "90vh" }}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

const Modal = ({ children, closeModal }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[400px] relative">
        <button
          className="absolute top-2 right-2 text-xl text-gray-600"
          onClick={closeModal}
        >
          &times; 
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Uploud;
