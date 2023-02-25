import { apiSlice } from "../../app/apiSlice";

export const followedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getGlobalFollowedUsers: builder.mutation({
      query: userId => ({
        url: `/users/followers/${userId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetGlobalFollowedUsersMutation } = followedApiSlice;
