"use client";
import { useLanguage } from "@/app/ChangeLanguegeProvider";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const PostsList = ({ searchTerm }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language } = useLanguage();

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-5 mx-auto mb-[100px] max-w-[1440px]">
        {filteredPosts.length === 0 ? (
          <div>No posts found</div>
        ) : (
          filteredPosts.map((item, index) => (
            <div
              key={index}
              className="text-white w-full bg-black max-w-[430px] justify-between flex flex-col gap-3 p-4 border-2 border-[#1443FF] rounded-xl"
            >
              <Link href={`/news/${item._id}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[300px] rounded-[12px] object-cover"
                />
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-[32px] leading-8 w-[80%]">
                      {item.title}
                    </h3>
                    <p>{item.content.slice(0, 100)}...</p>
                  </div>
                </div>
              </Link>

              <div className="flex gap-3  items-center">
                <Link
                  className="bg-[#353535] p-1 rounded"
                  href={`/news/${item._id}`}
                >
                  {language === "mn" ? "Эвент" : "Read more"}
                </Link>
                <span>{new Date(item.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PostsList;
