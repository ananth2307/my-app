import { api } from "./baseApiSetup";
import { constants } from "../utilities/constants";

const OBSERVABILITY_BASE_URL = `/api/v1`;

export const observabilityApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAppList: build.query({
      query: ({user = "kevin"}) => ({
        url: `${OBSERVABILITY_BASE_URL}/cmdb/${user}/Operation`,
      }),
      transformResponse: (appList) => appList?.map(app => {
        return {label: `${app.appName}[${app.appCode}]`, value: app.appCode}
      }),
    }),
    getProjectList: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/home/projectLists`,
        method: 'POST',
        body: postBody,
      }),
      transformResponse: (projectList) => projectList?.map(proj => {
        return {label: proj.projectName, value: proj.projectName}
      }),
    }),
    getSprintList: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/home/sprint/sprintNames`,
        method: 'POST',
        body: postBody,
      }),
      transformResponse: (sprintList) => sprintList?.map(sprint => {
        return {label: sprint, value: sprint}
      }),
    }),
  }),
  overrideExisting: true,
});
