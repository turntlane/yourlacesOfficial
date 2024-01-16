//@ts-nocheck
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../API/apiSlice";

const postAdapter = createEntityAdapter({});

const initialState = postAdapter.getInitialState();

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => ({
        url: "/posts",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        console.log("weeee", responseData.posts);
        const loadedPosts = responseData.posts.map((post) => {
          post.id = post.userID;
          return post;
        });
        return postAdapter.setAll(initialState, loadedPosts);
      },
      providesTags: (result, error, arg) => {
        console.log("yeeeewww", result);
        if (result?.ids) {
          return [
            { type: "Posts", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Posts", id })),
          ];
        } else return [{ type: "Posts", id: "LIST" }];
      },
    }),
    getPostsByUserID: builder.query({
      query: (userId) => `posts/${userId}`,
      // query: (userID) => ({
      //   url: `/posts/${userID}`,
      //   validateStatus: (response, result) => {
      //     return response.status === 200 && !result.isError;
      //   },
      // }),
      // transformResponse: (responseData) => {
      //   // console.log("weeee", responseData.posts);
      //   const loadedPosts = responseData.posts.map((post) => {
      //     post.id = post.postID;
      //     console.log("arrrrgggg", post);
      //     return post;
      //   });
      //   return postAdapter.setAll(initialState, loadedPosts);
      // },
      // providesTags: (result, error, arg) => {
      //   console.log("yeeeewww", result);
      //   if (result?.ids) {
      //     return [
      //       { type: "Posts", id: "LIST" },
      //       ...result.ids.map((id) => ({ type: "Posts", id })),
      //     ];
      //   } else return [{ type: "Posts", id: "LIST" }];
      // },
    }),
    getPostsByCategoryID: builder.query({
      query: (categoryID) => `posts/category/${categoryID}`,
    }),
    // addNewUser: builder.mutation({
    //   query: (initialUserData) => ({
    //     url: "/users",
    //     method: "POST",
    //     body: {
    //       ...initialUserData,
    //     },
    //   }),
    //   invalidatesTags: [{ type: "user", id: "LIST" }],
    // }),
    // updateUser: builder.mutation({
    //   query: (initialUserData) => ({
    //     url: "/users",
    //     method: "PATCH",
    //     body: {
    //       ...initialUserData,
    //     },
    //   }),
    //   invalidatesTags: (result, error, arg) => [{ type: "user", id: arg.id }],
    // }),
    // deleteUser: builder.mutation({
    //   query: ({ id }) => ({
    //     url: `/users`,
    //     method: "DELETE",
    //     body: { id },
    //   }),
    //   invalidatesTags: (result, error, arg) => [{ type: "user", id: arg.id }],
    // }),
    // getUserById: builder.query({
    //   query: (id) => `users/${id}`,
    // }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostsByUserIDQuery,
  useGetPostsByCategoryIDQuery,

  //   useUpdateUserMutation,
  //   useDeleteUserMutation,
  //   useGetUserByIDQuery,
} = postApiSlice;

// returns the query result object
export const selectPostResult = postApiSlice.endpoints.getPosts.select();

// creates memoized selector
const selectPostData = createSelector(
  selectPostResult,
  (postResult) => postResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllPost,
  selectById: selectPostByUserID,
  // Pass in a selector that returns the users slice of state
} = postAdapter.getSelectors((state) => selectPostData(state) ?? initialState);
