import React, { useState, useEffect, memo, useCallback } from "react";
import Filter from "../../common/Filter";
import ChartContainer from "../common/ChartContainer";
import { FlowMetricChartContainers } from "../common/constants";
import "../observability.styles.scss";
import { observabilityApi } from "../../../app/services/observabilityApi";
import { useSelector } from "react-redux";
import { get } from "lodash";
import { getSelectedOptionsValue } from "../../../app/utilities/helpers";
import { DrillDownOffCanvas } from "../../common";
import { getDefaultSelectedDate } from "../../common/helpers";

const FlowMetrics = () => {
  const [state, setState] = useState({
    flowMetricsData: {
      flowDistribution: {},
      flowVelocity: {},
      flowEfficiency: {},
      flowLoad: {},
      flowPredictability: {},
    },
    isShowDrillDown: false,
  });
  const { observability } = useSelector((state) => state);

  const [getAppList] = observabilityApi.useLazyGetAppListQuery({});

  const [getFlowDistribution] =
    observabilityApi.useGetFlowDistributionMutation();
  const [getFlowVelocity] = observabilityApi.useGetFlowVelocityMutation();
  const [getFlowEfficiency] = observabilityApi.useGetFlowEfficiencyMutation();
  const [getFlowLoad] = observabilityApi.useGetFlowLoadMutation();
  const [getFlowPredictability] =
    observabilityApi.useGetFlowPredictabilityMutation();
  const [getActiveSprints] = observabilityApi.useGetActiveSprintsMutation();

  let appList = [];
  let { initialStartDate , initialEndDate } = getDefaultSelectedDate();
  initialStartDate = new Date(initialStartDate).getTime();
  initialEndDate = new Date(initialEndDate).getTime();
  

  const getFlowMetrics = useCallback(
    async (isInitialLoad = false) => {
      const payload = {
        appCodes: get(observability, "filterData.selectedApplications", [])
          .length
          ? getSelectedOptionsValue(
              get(observability, "filterData.selectedApplications", [])
            )
          : getSelectedOptionsValue(appList),
        projects: getSelectedOptionsValue(
          get(observability, "filterData.selectedProjects", [])
        ),
        sprintName: getSelectedOptionsValue(
          get(observability, "filterData.selectedSprints", [])
        ),
        fromDt: isInitialLoad
          ? initialStartDate/1000
          : get(observability, "filterData.selectedDate.startDate")/1000,
        toDt: isInitialLoad
          ? initialEndDate/1000
          : get(observability, "filterData.selectedDate.endDate")/1000,
      };
      
      const flowEfficiencyPayload = {
        issueTypes: [
            "All"
        ],
        applications:isInitialLoad
        ? getSelectedOptionsValue(appList)
        : getSelectedOptionsValue(
            get(observability, "filterData.selectedApplications", [])
          ),
        sprintNames: [],
        projectNames: [],
        issueIds: [],
        workFlowStages: [],
        fromDt: isInitialLoad
          ? initialStartDate/1000
          : get(observability, "filterData.selectedDate.startDate")/1000,
          toDt: isInitialLoad
          ? initialEndDate/1000
          : get(observability, "filterData.selectedDate.endDate")/1000,
    }

      let flowMetricsPromiseData = await Promise.all([
        getFlowDistribution(payload),
        getFlowVelocity(payload),
        getFlowEfficiency(flowEfficiencyPayload
        ),
        getActiveSprints(payload)
      ]);
      const flowPredicatabilityPayload = {
        issueTypes: [
            "All"
        ],
        applications:isInitialLoad
        ? getSelectedOptionsValue(appList)
        : getSelectedOptionsValue(
            get(observability, "filterData.selectedApplications", [])
          ),
          sprintNames: get(flowMetricsPromiseData, "[3].data", []),
        fromDt: isInitialLoad
          ? initialStartDate/1000
          : get(observability, "filterData.selectedDate.startDate")/1000,
          toDt: isInitialLoad
          ? initialEndDate/1000
          : get(observability, "filterData.selectedDate.endDate")/1000,
    }
  
      const flowLoadPayload = {
        issueTypes: ["All"],
        applications: isInitialLoad
          ? getSelectedOptionsValue(appList)
          : getSelectedOptionsValue(
              get(observability, "filterData.selectedApplications", [])
            ),
        sprintNames: get(flowMetricsPromiseData, "[3].data", []),
        workFlowStages: [],
      };
      const { data: flowLoadData } = await getFlowLoad(flowLoadPayload);

    const { data: flowPredictabilityData} =  await getFlowPredictability(flowPredicatabilityPayload)
 
      const flowMetricsData = {
        flowDistribution: get(flowMetricsPromiseData, "[0].data", []),
        flowVelocity: get(flowMetricsPromiseData, "[1].data", []),
        flowEfficiency: get(flowMetricsPromiseData, "[2].data", []),
        flowPredictability: flowPredictabilityData,
        flowLoad: flowLoadData,
      };

      setState((state) => ({
        ...state,
        flowMetricsData: { ...state.flowMetricsData, ...flowMetricsData },
      }));
    },
    [state.flowMetricsData, observability.filterData]
  );
  useEffect(() => {
    getAppList({})
      .unwrap()
      .then((appListResp) => {
        appList = appListResp;
        getFlowMetrics(true);
      });
  }, []);

  return (
    <>
      <DrillDownOffCanvas flowMetricsData={state.flowMetricsData} />
      <Filter getFilteredData={getFlowMetrics} isShowSprintList={true} />
      <div className="dashboardwrap colswrap all-works">
        <div className="row">
          {FlowMetricChartContainers?.map((type) => {
            return (
              <>
                <ChartContainer
                  key={type}
                  {...type}
                  flowMetricsData={state.flowMetricsData}
                >
                  {type.component}
                </ChartContainer>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default FlowMetrics;
