import React, { memo, useCallback, useEffect, useState } from "react";
import { PlanContainer1, PlanContainer2 } from "../../common/constants";
import PanelChartContainer from "../../common/PanelChartContainer";
import { useSelector } from "react-redux";
import { observabilityApi } from "../../../../app/services/observabilityApi";
import { getSelectedOptionsValue } from "../../../../app/utilities/helpers";
import { get } from "lodash";
import 'chart.js/auto'
const PlanLanding = (props) => {
  const panelState = useSelector((state) => state.observability?.panelState);
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

  const getPlanData = useCallback(
    async () => {
      const defaultPayload = {
        appCodes:getSelectedOptionsValue(
              get(observability, "filterData.selectedApplications", [])
            ),
        projects: getSelectedOptionsValue(
          get(observability, "filterData.selectedProjects", [])
        ),
        sprintName: getSelectedOptionsValue(
          get(observability, "filterData.selectedSprints", [])
        ),
        startDt: get(observability, "filterData.selectedDate.startDate"),
        toDt:get(observability, "filterData.selectedDate.endDate"),
      };
      let planPromiseData = await Promise.all([
        getPlanActiveSprint(defaultPayload),
        getActiveSprintIssue(defaultPayload),
        getActiveSprintPriority(defaultPayload),
        getActiveSprintProgress(defaultPayload),
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
    [state.planData,observability.filterData]
  );
  useEffect(() => {
    get(panelState, `isPlanOpen`,false) && getPlanData();
  }, [observability.filterData,panelState]);
  return PlanContainer1.map((chartType, index) => (
    <>
      <PanelChartContainer
        key={chartType}
        index={index}
        {...chartType}
        planData={state.planData}
      >
        {chartType.component}
      </PanelChartContainer>
      <div class="col-md-12 p-0 row">
        {PlanContainer2.map((chartType, index) => (
          <PanelChartContainer
            key={chartType}
            index={index}
            {...chartType}
            planData={state.planData}
          >
            {chartType.component}
          </PanelChartContainer>
        ))}
      </div>
    </>
  ));
};

export default memo(PlanLanding);
