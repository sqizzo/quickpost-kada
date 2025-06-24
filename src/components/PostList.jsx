import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../features/posts/postSlice';
import { Link } from 'react-router-dom';

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const localPosts = useSelector((state) => state.posts.localPosts);
  const status = useSelector((state) => state.posts.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [dispatch, status]);

  return (
    <div>
      <h2>Posts</h2>
      {localPosts.concat(posts).map((post) => (
        <div key={post.id}>
          <Link to={`/post/${post.id}`}>
            <h3>{post.title}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PostList;
