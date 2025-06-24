import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PostList from "./pages/PostList";
import PostDetail from "./pages/PostDetail";
import CreatePost from "./pages/CreatePost";

import React from "react";

function App() {
  return (
    <Router>
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Navbar atau tombol di atas */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Quickpost App</h1>
          <Link
            to="/create"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            + Create Post
          </Link>
        </div>

        {/* Routing */}
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/create" element={<CreatePost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
