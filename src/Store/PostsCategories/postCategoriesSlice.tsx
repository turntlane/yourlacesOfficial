//@ts-nocheck
import { createSlice } from "@reduxjs/toolkit";

const postCategories = createSlice({
  name: "postCategories",
  initialState: { data: null },
  reducers: {
    setPostCategories: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setPostCategories } = postCategories.actions;

export default postCategories.reducer;

export const selectPostCategories = (state) => state.postCategories;
