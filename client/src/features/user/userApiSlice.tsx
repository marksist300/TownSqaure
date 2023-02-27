import { apiSlice } from "../../app/apiSlice";

//TODO: Manage new posts by placing them into state.
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
    fetchFollowerList: builder.mutation({
      query: userId => ({
        url: `/users/followers/${userId}`,
        method: "GET",
      }),
    }),
    followUser: builder.mutation({
      query: ({ userId, currentUserId }) => ({
        url: `/users/follow/${userId}`,
        method: "PUT",
        body: { currentUserId: currentUserId },
      }),
    }),
    unFollowUser: builder.mutation({
      query: ({ userId, currentUserId }) => ({
        url: `/users/unfollow/${userId}`,
        method: "PUT",
        body: { currentUserId: currentUserId },
      }),
    }),
  }),
});

export const {
  useGetProfileMutation,
  useGetSpecificUsersPostsMutation,
  useGetUserAndFollowedPostsMutation,
  useCreatePostMutation,
  useFetchFollowerListMutation,
  useFollowUserMutation,
  useUnFollowUserMutation,
} = userApiSlice;
