import { api } from "./baseApiSetup";
import { constants } from "../utilities/constants";
const OBSERVABILITY_BASE_URL = `/api/v1`;

export const observabilityApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAppList: build.query({
      query: ({ user = "kevin" }) => ({
        url: `${OBSERVABILITY_BASE_URL}/cmdb/${user}/Operation`,
      }),
      transformResponse: (appList) =>
        appList?.map((app) => {
          return {
            label: `${app.appName}[${app.appCode}]`,
            value: app.appCode,
            id: app.id,
          };
        }),
    }),
    getProjectList: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/home/projectLists`,
        method: "POST",
        body: postBody,
      }),
      transformResponse: (projectList) =>
        projectList?.map((proj) => {
          return { label: proj.projectName, value: proj.projectName };
        }),
    }),
    getSprintList: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/home/sprint/sprintNames`,
        method: "POST",
        body: postBody,
      }),
      transformResponse: (sprintList) =>
        sprintList?.map((sprint) => {
          return { label: sprint, value: sprint };
        }),
    }),
    //Flow Metrics Page start
    getFlowDistribution: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/safeFlowMetrics/flow/flowDistribution/main`,
        method: "POST",
        body: postBody,
      }),
    }),
    getFlowVelocity: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/safeFlowMetrics/flow/flowVelocity/main`,
        method: "POST",
        body: postBody,
      }),
    }),
    getFlowPredictability: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/safeFlowMetrics/flow/flowMetrics/ddflowpredicatablitymain`,
        method: "POST",
        body: postBody,
      }),
    }),
    getFlowPredictabilityDrill: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/safeFlowMetrics/flow/flowMetrics/ddflowpredicatablitymonth`,
        method: "POST",
        body: postBody,
      }),
    }),
    getFlowPredictabilitySummary: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/safeFlowMetrics/flow/flowMetrics/ddFlowSummary`,
        method: "POST",
        body: postBody,
      }),
    }),
    getFlowEfficiency: build.mutation({
      query: (postBody = {}) => ({
        url: `http://localhost:7111/api/v1/safeFlowMetrics/flow/flowEfficiency/main`,
        method: "POST",
        body: postBody,
      }),
    }),
    getFlowEfficiencyDrill: build.mutation({
      query: (postBody = {}) => ({
        url: `http://localhost:7111/api/v1/safeFlowMetrics/flow/flowEfficiency/main/drilldown`,
        method: "POST",
        body: postBody,
      }),
    }),
    getActiveSprints: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/safeFlowMetrics/flow/issueMetrics/activeSprints`,
        method: "POST",
        body: postBody,
      }),
    }),
    getFlowLoad: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/safeFlowMetrics/flow/flowMetrics/flowLoadMain`,
        method: "POST",
        body: postBody,
      }),
    }),
    //People Metrics
    getIssueMetrics: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/home/issueMetrics`,
        method: "POST",
        body: postBody,
      }),
    }),
    getIssueMetricsDdOne: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/safeFlowMetrics/flow/issueMetrics/drillDownOne`,
        method: "POST",
        body: postBody,
      }),
    }),
    getCollaboration: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/home/level/collaboration`,
        method: "POST",
        body: postBody,
      }),
    }),
    getTopAssignee: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/safeFlowMetrics/flow/peopleMetric/topAssignee`,
        method: "POST",
        body: postBody,
      }),
    }),
    getCommentsDdOne: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/safeFlowMetrics/flow/peopleMetric/comments/ddone`,
        method: "POST",
        body: postBody,
      }),
    }),
    //productivity Metrics
    getStaticCodeAnalysis: build.mutation({
      query: (postedBy = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/home/staticCodeAnalysis`,
        method: "POST",
        body: postedBy,
      }),
    }),
    getLinesOfCodes: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/home/analysis/against/linesOfCodes`,
        method: "POST",
        body: postBody,
      }),
    }),
    getLineOfCodeDatewise: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/productivityMetrics/codeAnalysis/dateWise`,
        method: "POST",
        body: postBody,
      }),
    }),
    getBulidMetrics: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/safeFlowMetrics/flow/productMetric/buildMetric/ddone`,
        method: "POST",
        body: postBody,
      }),
    }),
    //opsMetrics
    //Incident Management
    getIncidents: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/incidentManagement/filter/noOfIncident`,
        method: "POST",
        body: postBody,
      }),
    }),
    getIncidentsPercategory: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/incidentManagement/filter/category`,
        method: "POST",
        body: postBody,
      }),
    }),
    getMeanTimetoRecover: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/incidentManagement/filter/MTTR/Dashboard`,
        method: "POST",
        body: postBody,
      }),
    }),
    getMTBI: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/incidentManagement/filter/MTBI`,
        method: "POST",
        body: postBody,
      }),
    }),
    getIncidentMTTR: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/incidentManagement/filter/incidentMTTR`,
        method: "POST",
        body: postBody,
      }),
    }),
    //ChangeManagement
    getChangeRequest: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/changeManagement/filter/noOfChangeRequest`,
        method: "POST",
        body: postBody,
      }),
    }),
    getRootCause: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/changeManagement/getByRootCause/${postBody.type}`,
        method: "POST",
        body: postBody,
      }),
    }),
    getChangeRequestPerCategory: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/changeManagement/filter/category`,
        method: "POST",
        body: postBody,
      }),
    }),
    getChangeRequestPerRisk: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/changeManagement/filter/getForRisk`,
        method: "POST",
        body: postBody,
      }),
    }),
    getMeanTimetoChange: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/changeManagement/filter/meanTime/dashboard`,
        method: "POST",
        body: postBody,
      }),
    }),
    //Jenkins
    getBuildTrend: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/gnc/buildTrend`,
        method: "POST",
        body: postBody,
      }),
    }),
    getSuccessFailCountRatio: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/gnc/SFRatioAndCount`,
        method: "POST",
        body: postBody,
      }),
    }),
    getNodeDetails: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/gnc/nodeCUD`,
        method: "POST",
        body: postBody,
      }),
    }),
    getJobDetaills: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/gnc/jobsCUD`,
        method: "POST",
        body: postBody,
      }),
    }),
    getTopSuccessFailure: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/gnc/SFTopCount`,
        method: "POST",
        body: postBody,
      }),
    }),
    // BitBucket
    getMostActiveRepo: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/gnc/BRepoCommitCount`,
        method: "POST",
        body: postBody,
      }),
    }),
    getMostPullRequest: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/gnc/mostPullRequestCount`,
        method: "POST",
        body: postBody,
      }),
    }),
    getTotalCommit: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/gnc/totalCommitCount`,
        method: "POST",
        body: postBody,
      }),
    }),
    getTotalClone: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/gnc/totalCloneCount`,
        method: "POST",
        body: postBody,
      }),
    }),
    getTotalPullRequest: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/gnc/totalPullRequestCount`,
        method: "POST",
        body: postBody,
      }),
    }),
    getCommitTrend: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/gnc/commitTrend`,
        method: "POST",
        body: postBody,
      }),
    }),
    getCreateDeleteDetails: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/gnc/P_R_U_G_CD`,
        method: "POST",
        body: postBody,
      }),
    }),
    getPullRequestCount: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/gnc/pullRequestCount`,
        method: "POST",
        body: postBody,
      }),
    }),
    getPullRequestTrend: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/gnc/pullRequestTrend`,
        method: "POST",
        body: postBody,
      }),
    }),
    getLoginLogoutDetails: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/gnc/B_loginLogoutTrend`,
        method: "POST",
        body: postBody,
      }),
    }),
    getTopRepoDownloads: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/gnc/topRepoDownload`,
        method: "POST",
        body: postBody,
      }),
    }),
    getTopMostCommitRepo: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/gnc/topMostCommitRepo`,
        method: "POST",
        body: postBody,
      }),
    }),
    //DevopsMetrics
    //plan
    getplanActiveSprints: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/home/activeSprint/dates`,
        method: "POST",
        body: postBody,
      }),
    }),
    getplanActiveSprintIssue: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/home/sprintIssueTypes`,
        method: "POST",
        body: postBody,
      }),
    }),
    getplanActiveSprintPriority: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/home/userStories/priority`,
        method: "POST",
        body: postBody,
      }),
    }),
    getActiveSprintProgress: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/home/userStories/status`,
        method: "POST",
        body: postBody,
      }),
    }),
    getProjectMetrics: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/home/projectMetrics`,
        method: "POST",
        body: postBody,
      }),
    }),
    getPlanIssueMetrics: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/home/issueMetrics`,
        method: "POST",
        body: postBody,
      }),
    }),
    getPlanCollaboration: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/home/level/collaboration`,
        method: "POST",
        body: postBody,
      }),
    }),
    getProjectStatus: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/home/project/status`,
        method: "POST",
        body: postBody,
      }),
    }),
    getSprintVelocity: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/home/sprintVelocity`,
        method: "POST",
        body: postBody,
      }),
    }),
    getMonthlyRelease: build.mutation({
      query: (postBody = {}) => ({
        url: `${OBSERVABILITY_BASE_URL}/home/plannedRelease`,
        method: "POST",
        body: postBody,
      }),
    }),
  }),
  overrideExisting: true,
});
