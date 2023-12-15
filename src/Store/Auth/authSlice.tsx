// @ts-nocheck
// import { createSlice } from "@reduxjs/toolkit";

// const authSlice = createSlice({
//   name: "auth",
//   initialState: { token: null },
//   reducers: {
//     setCredentials: (state, action) => {
//       const { accessToken } = action.payload;
//       console.log("are we here", state);
//       state.token = accessToken;
//     },
//     logOut: (state, action) => {
//       state.token = null;
//     },
//   },
// });

// export const { setCredentials, logOut } = authSlice.actions;

// export default authSlice.reducer;

// export const selectCurrentToken = (state) => state.token;

// features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../Config";

export const loginUser = createAsyncThunk(
  "auth",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to login");
      console.log("we are here", data);

      return data; // assuming this returns { accessToken, refreshToken }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const refreshAccessToken = createAsyncThunk(
  "auth/refresh",
  async (refreshToken, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/auth/refresh`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error("Failed to refresh access token");
      return data; // assuming this returns { accessToken }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    accessToken: null,
    refreshToken: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.loading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      console.log("action: ", action);
      state.user = action.payload.user; // assuming the user info is in the payload
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.loading = false;
      state.error = null;
    },
    [loginUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [refreshAccessToken.fulfilled]: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
