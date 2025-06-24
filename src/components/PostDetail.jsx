import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
  const { id } = useParams();
  const posts = useSelector((state) => state.posts.posts);
  const localPosts = useSelector((state) => state.posts.localPosts);

  const post = [...localPosts, ...posts].find((post) => post.id.toString() === id);

  if (!post) return <div>Post not found</div>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
};

export default PostDetail;
