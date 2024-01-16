//@ts-nocheck
import { createSlice } from "@reduxjs/toolkit";

const threadSlice = createSlice({
  name: "threads",
  initialState: { data: null },
  reducers: {
    setThreads: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setThreads } = threadSlice.actions;

export default threadSlice.reducer;

export const selectThreads = (state) => state.threads;
