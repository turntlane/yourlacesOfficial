//@ts-nocheck
import { configureStore, combineReducers, compose } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/query";

import { apiSlice } from "./API/apiSlice";
import authReducer from "./Auth/authSlice";
import userReducer from "./Users/userSlice";

// Define the persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // Specify reducers to persist
};

// Combine reducers
const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  user: userReducer,
  // Add other reducers here
});

// Apply persistReducer to the combined reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
