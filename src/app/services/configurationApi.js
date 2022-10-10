import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { api } from "./baseApiSetup";
import { constants } from "../utitlities/constants";
const MODULE_BASE_URL = "/api/v1";

export const configurationApi = api.injectEndpoints({
  endpoints: (build) => ({
    getToolsList: build.query({
      query: (page = 0, length = 10) =>
        `tools/listByItemsPerPage/${page}/${length}`,
    }),
    getGroupsList: build.query({
      query: (page = 0, length = 10) =>
        `groups/listByItemsPerPage/${page}/${length}`,
    }),
  }),
  overrideExisting: true,
});
