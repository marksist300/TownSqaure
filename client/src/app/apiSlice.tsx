import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Root } from "react-dom/client";
import { setSignup, setLogin, logoutAuth } from "../features/auth/authSlice";
import { RootState } from "./store";

const TSBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_SERVER_DOMAIN,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      // console.log("Token", token);
      // console.log("Token Set in storage");
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery: TSBaseQuery,
  endpoints: builder => ({}),
});
