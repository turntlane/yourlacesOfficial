//@ts-nocheck
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../API/apiSlice";

const threadAdapter = createEntityAdapter({});

const initialState = threadAdapter.getInitialState();

export const threadApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getThreads: builder.query({
      query: () => ({
        url: "/threads",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        console.log("weeee", responseData.threads);
        const loadedThreads = responseData.threads.map((thread) => {
          thread.id = thread.userID;
          return thread;
        });
        return threadAdapter.setAll(initialState, loadedThreads);
      },
      providesTags: (result, error, arg) => {
        console.log("yeeeewww", result);
        if (result?.ids) {
          return [
            { type: "Threads", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Threads", id })),
          ];
        } else return [{ type: "Threads", id: "LIST" }];
      },
    }),
    getThreadsByPostID: builder.query({
      query: (postID) => `threads/${postID}`,
    }),
    getThreadsByCategoryID: builder.query({
      query: (categoryID) => `posts/category/${categoryID}`,
    }),
    addPost: builder.mutation({
      query: (newPost) => ({
        url: "/threads",
        method: "POST",
        body: newPost, // The payload for the POST request
      }),
    }),
  }),
});

export const {
  useGetThreadsQuery,
  useGetThreadsByPostIDQuery,
  useGetThreadsByCategoryIDQuery,
  useAddPostMutation,
  //   useUpdateUserMutation,
  //   useDeleteUserMutation,
  //   useGetUserByIDQuery
} = threadApiSlice;

// returns the query result object
export const selectThreadsResult = threadApiSlice.endpoints.getThreads.select();

// creates memoized selector
const selectThreadsData = createSelector(
  selectThreadsResult,
  (threadResult) => threadResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllThreads,
  selectById: selectThreadsByUserID,
  // Pass in a selector that returns the users slice of state
} = threadAdapter.getSelectors(
  (state) => selectThreadsData(state) ?? initialState
);
