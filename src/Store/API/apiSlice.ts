// @ts-nocheck
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { setCredentials } from "../Auth/authSlice";
// import { API_URL } from "../../Config";

// const baseQuery = fetchBaseQuery({
//   baseUrl: API_URL,
//   credentials: "include",
//   prepareHeaders: (headers, { getState }) => {
//     // console.log("idk man", getState().token);
//     const token = getState().token;
//     if (token) {
//       headers.set("authorization", `Bearer ${token}`);
//     }
//     // console.log("headers: ", headers);
//     return headers;
//   },
// });

// export const apiSlice = createApi({
//   baseQuery,
//   tagTypes: ["Note", "User"],
//   endpoints: (builder) => ({}),
// });

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../Auth/authSlice";
import { setUser } from "../Users/userSlice";
import { API_URL } from "../../Config";

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    console.log("token: ", token);
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  console.log(args); // request url, method, body
  console.log(api); // signal, dispatch, getState()
  console.log(extraOptions); //custom like {shout: true}

  let result = await baseQuery(args, api, extraOptions);

  // If you want, handle other status codes, too
  if (result?.error?.status === 403) {
    console.log("sending refresh token");

    // send refresh token to get new access token
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

    console.log("refresh: ", refreshResult);

    if (refreshResult?.data) {
      // store the new token
      console.log("this is it");
      api.dispatch(setCredentials({ ...refreshResult.data }));

      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = "Your login has expired.";
        api.dispatch(setCredentials({ token: null }));
        api.dispatch(setUser({ data: null }));
      }
      return refreshResult;
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Note", "User", "Posts"],
  endpoints: (builder) => ({}),
});
