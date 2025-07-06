"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const NewsList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [currentPost, setCurrentPost] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_APP_API_URL}/api/posts`
        );
        setPosts(response.data.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching posts");
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const openModal = (post, type) => {
    setCurrentPost(post);
    setModalType(type);
    setIsModalOpen(true);
    if (type === "edit") {
      setUpdatedTitle(post.title);
      setUpdatedContent(post.content);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentPost(null);
    setUpdatedTitle("");
    setUpdatedContent("");
  };

  const handleUpdatePost = async () => {
    if (!updatedTitle || !updatedContent) {
      setError("Title and content cannot be empty");
      return;
    }

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/api/posts/${currentPost._id}`,
        {
          title: updatedTitle,
          content: updatedContent,
        }
      );
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === currentPost._id
            ? { ...post, title: updatedTitle, content: updatedContent }
            : post
        )
      );
      closeModal();
    } catch (error) {
      setError("Error updating post");
    }
  };

  const handleDeletePost = async () => {
    if (!currentPost) {
      setError("No post selected for deletion");
      return;
    }

    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/api/posts/${currentPost._id}`
      );
      if (response.data.success) {
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post._id !== currentPost._id)
        );
        closeModal(); 
      } else {
        setError("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      setError("Error deleting post");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="mt-[50px]">
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search posts..."
          onChange={handleSearchChange}
          className="p-2 w-[250px] h-[40px] text-white rounded-[18px] bg-[#353535]"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-5 mx-auto mb-[100px] max-w-[1440px]">
        {filteredPosts.length === 0 ? (
          <div>No posts found</div>
        ) : (
          filteredPosts.map((item) => (
            <div
              key={item._id}
              className="text-white w-full bg-black max-w-[430px] justify-between flex flex-col gap-3 p-4 border-2 border-[#1443FF] rounded-xl"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-auto max-h-[300px] rounded-[12px] object-cover"
              />
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <h3 className="text-[32px] leading-8 w-[80%]">
                    {item.title}
                  </h3>
                  <p>{item.content ? item.content.slice(0, 100) : ""}...</p>
                </div>
              </div>

              <div className="flex gap-3 items-center">
                <span>Эвент</span>
                <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                <button
                  onClick={() => openModal(item, "edit")}
                  className="text-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => openModal(item, "delete")}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            {modalType === "edit" ? (
              <>
                <h2 className="text-xl mb-4">Edit Post</h2>
                <input
                  type="text"
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                  placeholder="Title"
                  className="p-2 mb-2 w-full border"
                />
                <textarea
                  value={updatedContent}
                  onChange={(e) => setUpdatedContent(e.target.value)}
                  placeholder="Content"
                  className="p-2 mb-2 w-full border"
                />
                <div className="flex gap-3 justify-end mt-4">
                  <button
                    onClick={handleUpdatePost}
                    className="bg-blue-500 text-white p-2 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={closeModal}
                    className="bg-gray-500 text-white p-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl mb-4">Delete Post</h2>
                <p>Are you sure you want to delete this post?</p>
                <div className="flex gap-3 justify-end mt-4">
                  <button
                    onClick={handleDeletePost}
                    className="bg-red-500 text-white p-2 rounded"
                  >
                    Delete
                  </button>
                  <button
                    onClick={closeModal}
                    className="bg-gray-500 text-white p-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsList;
