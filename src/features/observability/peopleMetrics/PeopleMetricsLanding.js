import React, { useEffect, useState, useCallback } from "react";
import Filter from "../../common/Filter";
import ChartContainer from "../common/ChartContainer";
import { PeopleMetricChartContainers } from "../common/constants";
import { useSelector } from "react-redux";
import { observabilityApi } from "../../../app/services/observabilityApi";
import { get } from "lodash";
import { getSelectedOptionsValue } from "../../../app/utilities/helpers";
import { DrillDownOffCanvas } from "../../common";
import "../observability.styles.scss";
import { getDefaultSelectedDate } from "../../common/helpers";

const PeopleMetrics = (props) => {
  const [state, setState] = useState({
    peopleMetricsData: {
      issueMetrics: {},
      collaboration: {},
      topAssignee: {},
      commentsDdOne: {},
    },
    isShowDrillDown: false,
  });
  const { observability } = useSelector((state) => state);

  const [getAppList] = observabilityApi.useLazyGetAppListQuery({});

  const [getIsueMetrics] = observabilityApi.useGetIssueMetricsMutation();
  const [getCollaboration] = observabilityApi.useGetCollaborationMutation();
  const [getTopAssignee] = observabilityApi.useGetTopAssigneeMutation();
  const [getCommentsDdOne] = observabilityApi.useGetCommentsDdOneMutation();

  let appList = [];
  let { initialStartDate , initialEndDate } = getDefaultSelectedDate();
  initialStartDate = new Date(initialStartDate).getTime();
  initialEndDate = new Date(initialEndDate).getTime();



  const getPeopleMetrics = useCallback(
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
        applications:isInitialLoad
        ? getSelectedOptionsValue(appList)
        : getSelectedOptionsValue(
            get(observability, "filterData.selectedApplications", [])
          ),
          fromDt:initialStartDate,          
          toDt:initialEndDate
      };

      let peopleMetricsPromiseData = await Promise.all([
        getIsueMetrics(defaultPayload),
        getCollaboration(defaultPayload),
        getTopAssignee(TopAssigneePayload),
        getCommentsDdOne(defaultPayload),
      ]);

      const peopleMetricsData = {
        issueMetrics: get(peopleMetricsPromiseData, "[0].data", []),
        collaboration: get(peopleMetricsPromiseData, "[1].data", []),
        topAssignee: get(peopleMetricsPromiseData, "[2].data", []),
        commentsDdOne: get(peopleMetricsPromiseData, "[3].data", []),
      };

      setState((state) => ({
        ...state,
        peopleMetricsData: { ...state.peopleMetricsData, ...peopleMetricsData },
      }));
    },
    [state.peopleMetricsData]
  );
  useEffect(() => {
    getAppList({})
      .unwrap()
      .then((appListResp) => {
        appList = appListResp;
        getPeopleMetrics(true);
      });
  }, []);

  return (
    <>
      <DrillDownOffCanvas peopleMetricsData={state.peopleMetricsData} />
      <Filter getFilteredData={getPeopleMetrics} isShowSprintList={false} />
      <div className="dashboardwrap colswrap all-works">
        <div className="row">
          {PeopleMetricChartContainers?.map((chartType, index) => {
            return (
              <ChartContainer
                key={chartType}
                index={index}
                {...chartType}
                peopleMetricsData={state.peopleMetricsData}
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
export default PeopleMetrics;
