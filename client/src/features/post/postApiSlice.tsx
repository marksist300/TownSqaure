import { apiSlice } from "../../app/apiSlice";

//TODO: Manage new posts by placing them into state.
export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
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
    deletePost: builder.mutation({
      query: ({ userId, postId }: { userId: string; postId: string }) => ({
        url: `/post/${postId}`,
        method: "DELETE",
        body: { userId: userId },
      }),
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetSpecificUsersPostsMutation,
  useGetUserAndFollowedPostsMutation,
  useDeletePostMutation,
} = postApiSlice;
