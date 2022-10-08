import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://103.114.208.38:7775" }),
  tagTypes: ["Task"],
  reducerPath: 'baseApi',
  endpoints: (build) => ({
    login: build.mutation({
      query: (credentials) => ({
        url: 'SignIn',
        method: 'POST',
        body: credentials,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
      })
    }),
  })
});
