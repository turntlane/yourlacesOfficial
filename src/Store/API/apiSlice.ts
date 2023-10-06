import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../Config";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["Note", "Users"],
  endpoints: (builder) => ({}),
});
