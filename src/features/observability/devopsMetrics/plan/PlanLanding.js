import React, { memo, useCallback, useEffect, useState } from "react";
import { PlanContainer1, PlanContainer2 } from "../../common/constants";
import PanelContainer from "../../common/PanelContainer";
import { useSelector } from "react-redux";
import { observabilityApi } from "../../../../app/services/observabilityApi";
import { getSelectedOptionsValue } from "../../../../app/utilities/helpers";
import { getDefaultSelectedDate } from "../../../common/helpers";
import { get } from "lodash";
import { Chart } from "chart.js";
const PlanLanding = (props) => {
  const [state, setState] = useState({
    planData: {
      activeSprintData: {},
      activeSprintIssueData: {},
      activeSprintPrioritydata: {},
      activeSprintProgressData: {},
      projectMetricsData: {},
      issueMetricsData: {},
      collaborationData: {},
      projectStatusData: {},
      sprintvelocityData: {},
      monthlyReleaseData: {},
    },
    isShowDrillDown: false,
  });

  const { observability } = useSelector((state) => state);
  const [getAppList] = observabilityApi.useLazyGetAppListQuery({});
  const [getPlanActiveSprint] =
    observabilityApi.useGetplanActiveSprintsMutation();
  const [getActiveSprintIssue] =
    observabilityApi.useGetplanActiveSprintIssueMutation();
  const [getActiveSprintPriority] =
    observabilityApi.useGetplanActiveSprintPriorityMutation();
  const [getActiveSprintProgress] =
    observabilityApi.useGetActiveSprintProgressMutation();
  const [getProjectMetrics] = observabilityApi.useGetProjectMetricsMutation();
  const [getPlanIssueMetrics] =
    observabilityApi.useGetPlanIssueMetricsMutation();
  const [getPlanCollaboration] =
    observabilityApi.useGetPlanCollaborationMutation();
  const [getProjectStatus] = observabilityApi.useGetProjectStatusMutation();
  const [getSprintVelocity] = observabilityApi.useGetSprintVelocityMutation();
  const [getMonthlyRelease] = observabilityApi.useGetMonthlyReleaseMutation();
  let appList = [];
  let { initialStartDate, initialEndDate } = getDefaultSelectedDate();
  initialStartDate = new Date(initialStartDate).getTime();
  initialEndDate = new Date(initialEndDate).getTime();

  const getPlanData = useCallback(
    async (isInitialLoad = false) => {
      const defaultPayload = {
        appCodes: isInitialLoad
          ? getSelectedOptionsValue(appList)
          : getSelectedOptionsValue(
              get(observability, "filterData.selectedApplications", [])
            ),
        projects: getSelectedOptionsValue(
          get(observability, "filterData.selectedProjects", [])
        ),
        sprintName: getSelectedOptionsValue(
          get(observability, "filterData.selectedSprints", [])
        ),
        startDt: initialStartDate,
        toDt: initialEndDate,
      };
      const TopAssigneePayload = {
        applications: isInitialLoad
          ? getSelectedOptionsValue(appList)
          : getSelectedOptionsValue(
              get(observability, "filterData.selectedApplications", [])
            ),
        startDt: initialStartDate,
        toDt: initialEndDate,
      };
      let planPromiseData = await Promise.all([
        getPlanActiveSprint(defaultPayload),
        getActiveSprintIssue(defaultPayload),
        getActiveSprintPriority(defaultPayload),
        getActiveSprintProgress(TopAssigneePayload),
        getProjectMetrics(defaultPayload),
        getPlanIssueMetrics(defaultPayload),
        getPlanCollaboration(defaultPayload),
        getProjectStatus(defaultPayload),
        getSprintVelocity(defaultPayload),
        getMonthlyRelease(defaultPayload),
      ]);

      const planData = {
        activeSprintData: get(planPromiseData, "[0].data", []),
        activeSprintIssueData: get(planPromiseData, "[1].data", []),
        activeSprintPrioritydata: get(planPromiseData, "[2].data", []),
        activeSprintProgressData: get(planPromiseData, "[3].data", []),
        projectMetricsData: get(planPromiseData, "[4].data", []),
        issueMetricsData: get(planPromiseData, "[5].data", []),
        collaborationData: get(planPromiseData, "[6].data", []),
        projectStatusData: get(planPromiseData, "[7].data", []),
        sprintvelocityData: get(planPromiseData, "[8].data", []),
        monthlyReleaseData: get(planPromiseData, "[9].data", []),
      };

      setState((state) => ({
        ...state,
        planData: { ...state.planData, ...planData },
      }));
    },
    [state.planData]
  );
  useEffect(() => {
    getAppList({})
      .unwrap()
      .then((appListResp) => {
        appList = appListResp;
        getPlanData(true);
      });
  }, []);
  return PlanContainer1.map((chartType, index) => (
    <>
      <PanelContainer
        key={chartType}
        index={index}
        {...chartType}
        planData={state.planData}
      >
        {chartType.component}
      </PanelContainer>
      <div class="col-md-12 p-0 row">
        {PlanContainer2.map((chartType, index) => (
          <PanelContainer
            key={chartType}
            index={index}
            {...chartType}
            planData={state.planData}
          >
            {chartType.component}
          </PanelContainer>
        ))}
      </div>
    </>
  ));
};

export default memo(PlanLanding);
