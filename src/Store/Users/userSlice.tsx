//@ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = { data: null };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
      console.log("user state: ", state.data);
    },
    logOut: (state, action) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logOut, () => {
      return initialState;
    });
  },
});

export const { setUser, logOut } = userSlice.actions;

export default userSlice.reducer;

export const selectCurrentUser = (state) => state.user;
