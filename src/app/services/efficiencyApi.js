import { api } from "./baseApiSetup";

const EFFICIENCY_BASE_URL = `/api/v1`;

export const effciencyApi = api.injectEndpoints({
  endpoints: (build) => ({
    getcmdb: build.query({
        query: () => `${EFFICIENCY_BASE_URL}/cmdb`,
      }),
      getOperationRoleDetails: build.query({
        query:() => `${EFFICIENCY_BASE_URL}/licence/user/operationRole/details`,
      }),
    getcmdbCount:build.query({
      query:() => `${EFFICIENCY_BASE_URL}/cmdb/count`
    }),
    getcmdbList: build.mutation({
      query:({page = 0,limit=10}) => `${EFFICIENCY_BASE_URL}/cmdb/list/${page}/${limit}`
    }),
    getcmdbProjectCount: build.mutation({
      query: ({id}) => `${EFFICIENCY_BASE_URL}/cmdb/${id}/projects/count`
    }),
    getcmdbProjectList: build.mutation({
      query:({id,page=0,limit=10}) => `${EFFICIENCY_BASE_URL}/cmdb/${id}/projects/${page}/${limit}`
    }),
    getFilteredCmdbCount: build.mutation({
      query:(postBody={}) => ({
        url:`${EFFICIENCY_BASE_URL}/cmdb/filter/count`,
        method:'POST',
        body:postBody
      })
    }),
    getFilteredCmdbList: build.mutation({
      query:(postBody = {},page=0,limit=10) => ({
        url:`${EFFICIENCY_BASE_URL}/cmdb/filter/${page}/${limit}`,
        method:'POST',
        body:postBody
      })
    }),
    getNewProjectType: build.query({
      query:() => `${EFFICIENCY_BASE_URL}/toolsPlugin`
    }),
    getNewProjectTool: build.query({
      query:(type='code') => `${EFFICIENCY_BASE_URL}/toolsPlugin/${type}`
    }),

  }),
  overrideExisting: true,
});
