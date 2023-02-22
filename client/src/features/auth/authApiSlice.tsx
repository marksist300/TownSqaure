import { apiSlice } from "../../app/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: credentials => ({
        url: "/auth/signup",
        method: "POST",
        body: credentials,
      }),
    }),
    getUserData: builder.mutation({
      query: userId => ({
        url: `/users?userId=${userId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useGetUserDataMutation } =
  authApiSlice;
