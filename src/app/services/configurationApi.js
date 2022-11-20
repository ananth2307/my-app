import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { api } from "./baseApiSetup";
import { constants } from "../utilities/constants";
const MODULE_BASE_URL = "/api/v1";

export const configurationApi = api.injectEndpoints({
  endpoints: (build) => ({
    getToolsList: build.mutation({
      query: ({page = 0, limit = 10}) => {
        return `http://localhost:7111/api/v1/tools/listByItemsPerPage/${page}/${limit}`;
      },
    }),
    getToolsListCount: build.query({
      query: () => `http://localhost:7111/api/v1/tools/count`,
    }),
  }),
  overrideExisting: true,
});
