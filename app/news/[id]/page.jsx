"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/app/components/global/Navbar";
import { ChangeLanguegeProvider } from "@/app/ChangeLanguegeProvider";
import Footer from "@/app/components/global/Footer";

const PostDetails = ({ params }) => {
  const { id } = params;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `${process.env.NEXT_PUBLIC_APP_API_URL}/api/posts/${id}`;
    const fetchPost = async () => {
      try {
        const response = await axios.get(apiUrl);
        setPost(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching post details:", err);
        setError("Error fetching post details");
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <ChangeLanguegeProvider>
      <div className="bg-[black]">
        <div className="max-w-[1440px] m-auto">
          <Navbar />
          <div className="flex flex-col items-center">
            <div className=" px-5">
              <img
                class="max-w-[700px]  w-full object-cover"
                src={post.image}
                alt={post.title}
              />

              <h1 className="text-white text-[32px]">{post.title}</h1>
              <p className="text-white">{post.content}</p>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </ChangeLanguegeProvider>
  );
};

export default PostDetails;
