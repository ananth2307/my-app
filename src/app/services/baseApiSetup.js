import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { constants } from "../utilities/constants";

export const api = createApi({
  baseQuery: fetchBaseQuery({ 
    baseUrl: `${constants.BASE_URL}`,
    prepareHeaders: (headers) => {
      headers.set("DTOP_API_TOKEN", "CODE8~org.springframework.security.authentication.UsernamePasswordAuthenticationToken@23608e02: Principal: kevin; Credentials: [PROTECTED]; Authenticated: true; Details: null; Granted Authorities: Operation");
      // headers.set("Cookie", "JSESSIONID=CA727E3B5BDDD43F3C7BE467134DD394");
      headers.set("withCredentials", "false");
      return headers;
    },
  }),
  tagTypes: ["Task"],
  reducerPath: 'baseApi',
  endpoints: (build) => ({
    login: build.mutation({
      query: (credentials) => ({
        url: '/SignIn',
        method: 'POST',
        body: credentials,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
      })
    }),
  })
});
