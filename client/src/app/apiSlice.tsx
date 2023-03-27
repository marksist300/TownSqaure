import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";

const TSBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_SERVER_DOMAIN,
  mode: "cors",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery: TSBaseQuery,
  endpoints: builder => ({}),
});
