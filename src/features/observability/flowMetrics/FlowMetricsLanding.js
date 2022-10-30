import React, { useState, useEffect } from "react";
import Filter from "../../common/Filter";
import ChartContainer from "../common/ChartContainer";
import { FlowMetricChartContainers } from "../common/constants";
import "../observability.styles.scss";
import { observabilityApi } from "../../../app/services/observabilityApi";
import { useSelector } from "react-redux";
import { get } from "lodash";
import { getSelectedOptionsValue } from "../../../app/utilities/helpers";

const FlowMetrics = () => {
  const [state, setState] = useState({
    flowMetricsData: {
      flowDistribution:  {},
      flowVelocity:  {},
      flowEfficiency:  {},
      flowLoad:  {},
      flowPredictability:  {},
      activeSprints:  {}
    }
  });
  const { observability } = useSelector((state) => state);

  const {
    data: appList = [],
  } = observabilityApi.useGetAppListQuery({ refetchOnMountOrArgChange: 10 });
  
  const [getFlowDistribution] = observabilityApi.useGetFlowDistributionMutation();
  const [getFlowVelocity] = observabilityApi.useGetFlowVelocityMutation();
  const [getFlowEfficiency] = observabilityApi.useGetFlowEfficiencyMutation();
  const [getFlowLoad] = observabilityApi.useGetFlowLoadMutation();
  const [getFlowPredictability] = observabilityApi.useGetFlowPredictabilityMutation();
  const [getActiveSprints] = observabilityApi.useGetActiveSprintsMutation();

  const getFlowMetrics = async (isInitialLoad = false) => {
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
    
    const flowMetricsData = {
      flowDistribution:  (await getFlowDistribution(payload)).data,
      flowVelocity:  (await getFlowVelocity(payload)).data,
      flowEfficiency:  (await getFlowEfficiency(payload)).data,
      flowLoad:  (await getFlowLoad(payload)).data,
      flowPredictability:  (await getFlowPredictability(payload)).data,
      activeSprints:  (await getActiveSprints(payload)).data
    }
    setState(state => ({flowMetricsData: {...state.flowMetricsData, ...flowMetricsData}}))
  };
  const defaultSelectedDate = get(observability, "filterData.selectedDate", {});
  useEffect(() => {
    //Get flow metrics data on initial load with default date and passing all Applications as selected
    /** Before fetching waiting for default date and applications api call to finish**/
    if(defaultSelectedDate.startDate && appList?.length) {
      getFlowMetrics(true)
    }
  }, [defaultSelectedDate, appList]);

  return (
    <>
      <Filter getFlowMetrics={getFlowMetrics} />
      <div className="dashboardwrap colswrap all-works">
        <div className="row">
          {FlowMetricChartContainers?.map((type) => {
            return (
              <ChartContainer key={type} {...type} flowMetricsData={state.flowMetricsData}>
                {type.component}
              </ChartContainer>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default FlowMetrics;
