import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../features/postSlice";
import { Link } from "react-router-dom";

function PostList() {
  const dispatch = useDispatch();

  const { remotePosts, localPosts, loading, error } = useSelector(
    (state) => state.posts
  );

  //   fetch post after page load
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error}</p>;

  const allPosts = [...localPosts, ...remotePosts];

  return (
    <div className="p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-4">All Posts</h1>
      <ul className="flex flex-wrap space-y-2 space-x-2 w-fit">
        {allPosts.map((post) => (
          <li key={post.id} className="border p-4 rounded hover:shadow w-50">
            <Link to={`/posts/${post.id}`} className="text-blue-600">
              <h2 className="font-semibold">{post.title}</h2>
              <p className="text-sm text-gray-600">
                {post.body?.substring(0, 60)}...
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
