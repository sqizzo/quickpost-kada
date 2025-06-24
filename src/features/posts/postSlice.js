import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPostsFromAPI } from '../../api/posts';

// Fetch posts using the function from the API file
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const posts = await fetchPostsFromAPI();
  return posts;
});

const initialState = {
  posts: [],
  localPosts: [],
  status: 'idle',
  error: null,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.localPosts.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addPost } = postSlice.actions;

export default postSlice.reducer;
