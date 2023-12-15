// import { configureStore } from "@reduxjs/toolkit";
// import { apiSlice } from "../Store/API/apiSlice";

// export const store = configureStore({
//   reducer: {
//     [apiSlice.reducerPath]: apiSlice.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(apiSlice.middleware),
//   devTools: true,
// });

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
