import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPosts } from "../services/services";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const data = await getAllPosts();
    setPosts(data.data);
  };
  return (
    <div className="rounded-lg bg-gray-50 p-7 text-gray-900 shadow-lg">
      <h1 className="mb-7 text-4xl font-bold">Posts</h1>
      <Link to="/" className="mb-4 flex items-center text-blue-600 hover:underline">
        <Icon icon="mdi:arrow-left" className="mr-2" />
        Back to Home
      </Link>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts &&
          posts.length > 0 &&
          posts.map((post) => (
            <div key={post.id} className="rounded-lg bg-white p-7 shadow-lg">
              <h2 className="text-2xl font-bold">
                {post.firstName} {post.lastName}
              </h2>
              <p className="text-gray-700">{post.writeup}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Posts;
