import { baseAPI } from "../../app/baseApiSetup";

export const authAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    authenticateUser: build.query({
      query: () => 'posts',
    }),
  }),
  overrideExisting: false,
})