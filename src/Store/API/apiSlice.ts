// @ts-nocheck
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../Auth/authSlice";
import { API_URL } from "../../Config";

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  // credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    // console.log("idk man", getState().token);
    const token = getState().token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    // console.log("headers: ", headers);
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Note", "User"],
  endpoints: (builder) => ({}),
});
