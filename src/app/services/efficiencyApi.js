import { api } from "./baseApiSetup";

const EFFICIENCY_BASE_URL = `/api/v1`;

export const effciencyApi = api.injectEndpoints({
  endpoints: (build) => ({
    getcmdb: build.query({
      query: () => `${EFFICIENCY_BASE_URL}/cmdb`,
    }),
    getOperationRoleDetails: build.query({
      query: () => `${EFFICIENCY_BASE_URL}/licence/user/operationRole/details`,
    }),
    getcmdbCount: build.query({
      query: () => `${EFFICIENCY_BASE_URL}/cmdb/count`,
    }),
    getcmdbList: build.query({
      query: ({ page, limit }) =>
        `${EFFICIENCY_BASE_URL}/cmdb/list/${page}/${limit}`,
    }),
    getcmdbProjectCount: build.query({
      query: ({ id }) => `${EFFICIENCY_BASE_URL}/cmdb/${id}/projects/count`,
    }),
    getcmdbProjectList: build.query({
      query: ({ id, page = 0, limit = 10 }) =>
        `${EFFICIENCY_BASE_URL}/cmdb/${id}/projects/${page}/${limit}`,
    }),
    getFilteredCmdbCount: build.mutation({
      query: (postBody = {}) => ({
        url: `${EFFICIENCY_BASE_URL}/cmdb/filter/count`,
        method: "POST",
        body: postBody,
      }),
    }),
    getFilteredCmdbList: build.mutation({
      query: (postBody = {}, page = 0, limit = 10) => ({
        url: `${EFFICIENCY_BASE_URL}/cmdb/filter/${page}/${limit}`,
        method: "POST",
        body: postBody,
      }),
    }),
    getNewProjectType: build.query({
      query: () => `${EFFICIENCY_BASE_URL}/toolsPlugin`,
    }),
    getNewProjectTool: build.query({
      query: (type = "code") => `${EFFICIENCY_BASE_URL}/toolsPlugin/${type}`,
    }),
    addManageProject: build.mutation({
      query: ({ payload, id }) => ({
        url: `${EFFICIENCY_BASE_URL}/cmdb/${id}/project/kevin`,
        method: "POST",
        body:payload
      }),
    }),
    checkAppCode: build.query({
      query:({appCode,appCodeId=0,cacheTimeStamp}) => `${EFFICIENCY_BASE_URL}/cmdb/checkAppCode/${appCode}/${appCodeId}?_=${cacheTimeStamp}`
    }),
    postApplicationDetails: build.mutation({
      query: (postBody={}) =>{ 
        console.log({postBody})
        return ({
        url:`${EFFICIENCY_BASE_URL}/cmdb/kevin`,
        method:"POST",
        body:postBody
      })
    }
    }),
    //Access Management
    getUserDetails: build.query({
      query:() => `${EFFICIENCY_BASE_URL}/licence/user/details`
    }),
    getGroups: build.query({
      query: ()=> `${EFFICIENCY_BASE_URL}/groups`
    }),
    getProjects: build.query({
      query: (id) => `${EFFICIENCY_BASE_URL}/onboarding/cmdb/${id}/projectList`
    }),
    getOnBoardTools: build.query({
      query: ({id,projectId="nullString"}) => `${EFFICIENCY_BASE_URL}/cmdb/${id}/project/${projectId}`
    }),
    getGroupMembers: build.query({
      query: ({id,projectId='ALL'}) => `${EFFICIENCY_BASE_URL}/directory/get/group/member/list/${id}/${projectId}`
    })
  }),
  overrideExisting: true,
});
