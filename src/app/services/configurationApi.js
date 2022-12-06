import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { api } from "./baseApiSetup";
import { constants } from "../utilities/constants";
const MODULE_BASE_URL = "/api/v1";

export const configurationApi = api.injectEndpoints({
  endpoints: (build) => ({
    getToolsList: build.mutation({
      query: ({page = 0, limit = 10}) => {
        return `${MODULE_BASE_URL}/tools/listByItemsPerPage/${page}/${limit}`;
      },
    }),
    getToolsListCount: build.query({
      query: () => `${MODULE_BASE_URL}/tools/count`,
    }),
  }),
  overrideExisting: true,
});
