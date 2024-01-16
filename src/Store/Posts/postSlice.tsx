//@ts-nocheck
import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "posts",
  initialState: { data: null },
  reducers: {
    setPosts: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setPosts } = postSlice.actions;

export default postSlice.reducer;

export const selectPosts = (state) => state.posts;
