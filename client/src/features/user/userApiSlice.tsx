import { PublicTwoTone } from "@mui/icons-material";
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
    fetchPostUser: builder.mutation({
      query: userId => ({
        url: `/users?userId=${userId}`,
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
    uploadPhoto: builder.mutation({
      query: ({ userId, formData }) => ({
        url: `/users/photo/${userId}`,
        method: "PUT",
        body: formData,
      }),
    }),
    editUserData: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/update/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    userSearch: builder.mutation({
      query: user => ({
        url: `/users/search?person=${user}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetProfileMutation,
  useFetchPostUserMutation,
  useFetchFollowerListMutation,
  useFollowUserMutation,
  useUnFollowUserMutation,
  useUploadPhotoMutation,
  useEditUserDataMutation,
  useUserSearchMutation,
} = userApiSlice;
