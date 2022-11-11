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

let isAlreadyCalledFromMount = false;

const FlowMetrics = () => {
  const [state, setState] = useState({
    flowMetricsData: {
      flowDistribution: {},
      flowVelocity: {},
      flowEfficiency: {},
      flowLoad: {},
      flowPredictability: {},
      activeSprints: {},
    },
    isShowDrillDown: false,
  });
  const { observability } = useSelector((state) => state);

  const { data: appList = [] } = observabilityApi.useGetAppListQuery({
    refetchOnMountOrArgChange: 10,
  });

  const [getFlowDistribution] =
    observabilityApi.useGetFlowDistributionMutation();
  const [getFlowVelocity] = observabilityApi.useGetFlowVelocityMutation();
  const [getFlowEfficiency] = observabilityApi.useGetFlowEfficiencyMutation();
  const [getFlowLoad] = observabilityApi.useGetFlowLoadMutation();
  const [getFlowPredictability] =
    observabilityApi.useGetFlowPredictabilityMutation();
  const [getActiveSprints] = observabilityApi.useGetActiveSprintsMutation();

  const getFlowMetrics = useCallback(
    async (isInitialLoad = false) => {
      const payload = {
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
        startDt: get(observability, "filterData.selectedDate.startDate"),
        toDt: get(observability, "filterData.selectedDate.endDate"),
      };

      let flowMetricsPromiseData = await Promise.all([
        getFlowDistribution(payload),
        getFlowVelocity(payload),
        getFlowEfficiency(payload),
        getFlowLoad(payload),
        getFlowPredictability(payload),
        getActiveSprints(payload),
      ]);

      const flowMetricsData = {
        flowDistribution: get(flowMetricsPromiseData, "[0].data", []),
        flowVelocity: get(flowMetricsPromiseData, "[1].data", []),
        flowEfficiency: get(flowMetricsPromiseData, "[2].data", []),
        flowLoad: get(flowMetricsPromiseData, "[3].data", []),
        flowPredictability: get(flowMetricsPromiseData, "[4].data", []),
        activeSprints: get(flowMetricsPromiseData, "[5].data", []),
      };

      setState((state) => ({
        ...state,
        flowMetricsData: { ...state.flowMetricsData, ...flowMetricsData },
      }));
    },
    [state.flowMetricsData]
  );
  const defaultSelectedDate = get(observability, "filterData.selectedDate", {});
  useEffect(() => {
    //Get flow metrics data on initial load with default date and passing all Applications as selected
    /** Before fetching waiting for default date and applications api call to finish**/
    if (
      defaultSelectedDate.startDate &&
      appList?.length &&
      !isAlreadyCalledFromMount
    ) {
      getFlowMetrics(true);
      isAlreadyCalledFromMount = true;
    }
  }, [defaultSelectedDate, appList]);

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
