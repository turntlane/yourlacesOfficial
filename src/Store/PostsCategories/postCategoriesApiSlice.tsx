//@ts-nocheck
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../API/apiSlice";

const postCategoriesAdapter = createEntityAdapter({});

const initialState = postCategoriesAdapter.getInitialState();

export const postCategoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPostCategories: builder.query({
      query: () => ({
        url: "/forum-category",
        // validateStatus: (response, result) => {
        //   return response.status === 200 && !result.isError;
        // },
      }),
      // transformResponse: (responseData) => {
      //   console.log("weeee", responseData.posts);
      //   const loadedPosts = responseData.posts.map((post) => {
      //     post.id = post.userID;
      //     return post;
      //   });
      //   return postCategoriesAdapter.setAll(initialState, loadedPosts);
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
    createNewCategory: builder.mutation({
      query: (initialUserData) => ({
        url: "/forum-category",
        method: "POST",
        body: {
          ...initialUserData,
        },
      }),
      invalidatesTags: [{ type: "PostCategories", id: "LIST" }],
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
  useGetPostCategoriesQuery,
  createNewCategoryMutation,
  //   useUpdateUserMutation,
  //   useDeleteUserMutation,
  //   useGetUserByIDQuery,
} = postCategoriesApiSlice;

// returns the query result object
export const selectPostCategoryResult =
  postCategoriesApiSlice.endpoints.getPostCategories.select();

// creates memoized selector
const selectPostCategoryData = createSelector(
  selectPostCategoryResult,
  (postCategoryResult) => postCategoryResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllPostCategories,
  // selectById: selectPostByUserID,
  // Pass in a selector that returns the users slice of state
} = postCategoriesAdapter.getSelectors(
  (state) => selectPostCategoryData(state) ?? initialState
);
