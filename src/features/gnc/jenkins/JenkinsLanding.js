import React, { memo, useCallback } from "react";
import { JenkinsContainer } from "../common/constants";
import { useState, useEffect } from "react";
import { observabilityApi } from "../../../app/services/observabilityApi";
import { getDefaultSelectedDate } from "../../common/helpers";
import { get } from "lodash";
import { DrillDownOffCanvas } from "../../common";
import Filter from "../../common/Filter";
import ChartContainer from "../../observability/common/ChartContainer";
import { useSelector } from "react-redux";

const JenkinsLanding = (props) => {
  const [state, setstate] = useState({
    jenkinsData: {
      buildTrendData: {},
      successFailureData: {},
      jobNodeData: {},
      topSuccessFailureData: {},
    },
    isShowDrillDown: false,
  });
  const { observability } = useSelector((state) => state);
  const [getBuildTrend] = observabilityApi.useGetBuildTrendMutation();
  const [getSuccessFailCountRatio] =
    observabilityApi.useGetSuccessFailCountRatioMutation();
  const [getNodeDetails] = observabilityApi.useGetNodeDetailsMutation();
  const [getJobDetaills] = observabilityApi.useGetJobDetaillsMutation();
  const [getTopSuccessFailure] =
    observabilityApi.useGetTopSuccessFailureMutation();
  let { initialStartDate, initialEndDate } = getDefaultSelectedDate();
  initialStartDate = new Date(initialStartDate).getTime();
  initialEndDate = new Date(initialEndDate).getTime();

  const getJenkinsData = useCallback(async (InitialLoad=false) => {

    const defaultPayload = {
      fromDt: InitialLoad ? initialStartDate : get(observability, "filterData.selectedDate.startDate")/1000,
      toDt:InitialLoad ? initialEndDate : get(observability, "filterData.selectedDate.endDate")/1000
      // toDt: initialEndDate / 1000,
    };
    const topCountPayload = {
      fromDt: InitialLoad ? initialStartDate : get(observability, "filterData.selectedDate.startDate")/1000,
      toDt:InitialLoad ? initialStartDate : get(observability, "filterData.selectedDate.endDate")/1000,
      topCount: true,
    };
    let JenkinsPromiseData = await Promise.all([
      getBuildTrend(defaultPayload),
      getSuccessFailCountRatio(defaultPayload),
      getNodeDetails(defaultPayload),
      getJobDetaills(defaultPayload),
      getTopSuccessFailure(topCountPayload),
    ]);
    const jenkinsData = {
      buildTrendData: get(JenkinsPromiseData, "[0].data", {}),
      successFailureData: get(JenkinsPromiseData, "[1].data", []),
      jobNodeData: {
        NodeDetails: get(JenkinsPromiseData, "[2].data", {}),
        JobDetaills: get(JenkinsPromiseData, "[3].data", {}),
      },
      topSuccessFailureData: get(JenkinsPromiseData, "[4].data", {}),
    };
    setstate((state) => ({
      ...state,
      jenkinsData: {
        ...state.jenkinsData,
        ...jenkinsData,
      },
    }));
  }, [state.jenkinsData,observability.filterData]);
  useEffect(() => {
    getJenkinsData(true);
  }, []);
  return (
    <>
      <DrillDownOffCanvas jenkinsData={state.jenkinsData} />
      <div className="dashboardwrap colswrap all-works">
        <Filter
          getFilteredData={getJenkinsData}
          isShowSprintList={false}
          isApplicationHide={true}
        />
        <div className="row">
          {JenkinsContainer.map((chartType, index) => {
            return (
              <ChartContainer
                key={chartType}
                index={index}
                {...chartType}
                jenkinsData={state.jenkinsData}
              >
                {chartType.component}
              </ChartContainer>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default memo(JenkinsLanding);
