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
    //Flow Metrics Page start
    getFlowDistribution: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/safeFlowMetrics/flow/flowDistribution/main`,
        method: 'POST',
        body: postBody,
      }),
    }),
    getFlowVelocity: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/safeFlowMetrics/flow/flowVelocity/main`,
        method: 'POST',
        body: postBody,
      }),
    }),
    getFlowPredictability: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/safeFlowMetrics/flow/flowMetrics/ddflowpredicatablitymain`,
        method: 'POST',
        body: postBody,
      }),
    }),
    getFlowPredictabilityDrill: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/safeFlowMetrics/flow/flowMetrics/ddflowpredicatablitymonth`,
        method: 'POST',
        body: postBody,
      }),
    }),
    getFlowPredictabilitySummary: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/safeFlowMetrics/flow/flowMetrics/ddflowsummary`,
        method: 'POST',
        body: postBody,
      }),
    }),
    getFlowEfficiency: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/safeFlowMetrics/flow/flowEfficiency/main`,
        method: 'POST',
        body: postBody,
      }),
    }),
    getFlowEfficiencyDrill: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/safeFlowMetrics/flow/flowEfficiency/main/drilldown`,
        method: 'POST',
        body: postBody,
      }),
    }),
    getActiveSprints: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/safeFlowMetrics/flow/issueMetrics/activeSprints`,
        method: 'POST',
        body: postBody,
      }),
    }),
    getFlowLoad: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/safeFlowMetrics/flow/flowMetrics/flowLoadMain`,
        method: 'POST',
        body: postBody,
      }),
    }),
    //People Metrics
    getIssueMetrics: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/home/issueMetrics`,
        method: 'POST',
        body: postBody,
      }),
    }),
    getCollaboration: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/home/level/collaboration`,
        method: 'POST',
        body: postBody,
      }),
    }),
    getTopAssignee: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/safeFlowMetrics/flow/peopleMetric/topAssignee`,
        method: 'POST',
        body: postBody,
      }),
    }),
    getCommentsDdOne: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/safeFlowMetrics/flow/peopleMetric/comments/ddone`,
        method: 'POST',
        body: postBody,
      }),
    }),
  }),
  overrideExisting: true,
});
