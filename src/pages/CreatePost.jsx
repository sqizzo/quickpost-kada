import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../features/postSlice";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const localPosts = useSelector((state) => state.posts.localPosts);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: 1000 + localPosts.length + 1,
      title,
      body,
    };

    dispatch(addPost(newPost));
    setSuccess(true);

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Post</h1>

      {success && (
        <p className="text-green-600 mb-4">✅ Post created successfully!</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            className="w-full border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter post title"
          />
        </div>
        <div>
          <label className="block font-medium">Body</label>
          <textarea
            className="w-full border p-2 rounded"
            rows={6}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            placeholder="Enter post content"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
