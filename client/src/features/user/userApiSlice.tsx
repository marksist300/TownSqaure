import { apiSlice } from "../../app/apiSlice";
import { PostProps } from "../../types";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProfile: builder.mutation({
      query: username => ({
        url: `/users?username=${username}`,
        method: "GET",
      }),
    }),
    getSpecificUsersPosts: builder.mutation({
      query: username => ({
        url: `/post/fetchUserPosts/${username}`,
        method: "GET",
      }),
    }),
    getUserAndFollowedPosts: builder.mutation({
      query: userId => ({
        url: `/post/fetchAll/${userId}`,
        method: "GET",
      }),
    }),
    createPost: builder.mutation({
      query: postdata => ({
        url: "/post/new",
        method: "POST",
        body: postdata,
      }),
    }),
  }),
});

export const {
  useGetProfileMutation,
  useGetSpecificUsersPostsMutation,
  useGetUserAndFollowedPostsMutation,
  useCreatePostMutation,
} = userApiSlice;
