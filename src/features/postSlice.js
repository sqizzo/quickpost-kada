import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Post fetch
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();
  return data;
});

const postSlice = createSlice({
  name: "posts",
  initialState: {
    remotePosts: [],
    localPosts: [],
    loading: false,
    error: null,
  },
  reducers: {
    addPost: (state, action) => {
      state.localPosts.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.remotePosts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addPost } = postSlice.actions;
export default postSlice.reducer;
