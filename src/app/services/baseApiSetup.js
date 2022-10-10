import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { constants } from "../utitlities/constants";

export const api = createApi({
  baseQuery: fetchBaseQuery({ 
    baseUrl: `${constants.BASE_URL}`,
    prepareHeaders: (headers) => {
      headers.set("Authorization", "Bearer test");
      return headers;
    },
  }),
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
