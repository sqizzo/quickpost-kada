import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostDetail() {
  const { id } = useParams();
  const { remotePosts, localPosts } = useSelector((state) => state.posts);

  const post =
    localPosts.find((p) => String(p.id) === id) ||
    remotePosts.find((p) => String(p.id) === id);

  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);

  useEffect(() => {
    async function fetchComments() {
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/comments?postId=${id}`
        );
        const data = await res.json();
        setComments(data);
      } catch (err) {
        console.error("Failed to fetch comments", err);
      } finally {
        setLoadingComments(false);
      }
    }

    fetchComments();
  }, [id]);

  if (!post) return <p>Post not found.</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Link to="/" className="text-blue-500 hover:underline">
        &larr; Back
      </Link>
      <h1 className="text-3xl font-bold mt-4 mb-2">{post.title}</h1>
      <p className="text-gray-700 mb-6">{post.body}</p>

      <h2 className="text-xl font-semibold mb-2">Comments</h2>
      {loadingComments ? (
        <p>Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-gray-500">No comments yet.</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li key={comment.id} className="border p-4 rounded bg-gray-50">
              <p className="font-medium">{comment.name}</p>
              <p className="text-sm text-gray-500 mb-1">{comment.email}</p>
              <p>{comment.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
