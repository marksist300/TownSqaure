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
  useFetchFollowerListMutation,
  useFollowUserMutation,
  useUnFollowUserMutation,
} = userApiSlice;
