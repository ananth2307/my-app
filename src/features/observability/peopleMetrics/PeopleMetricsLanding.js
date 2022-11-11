import React, { useEffect, useState, useCallback } from "react";
import Filter from "../../common/Filter";
import ChartContainer from "../common/ChartContainer";
import { PeopleMetricChartContainers } from "../common/constants";
import { useSelector } from "react-redux";
import { observabilityApi } from "../../../app/services/observabilityApi";
import { get } from "lodash";
import { getSelectedOptionsValue } from "../../../app/utilities/helpers";

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

  const { data: appList = [] } = observabilityApi.useGetAppListQuery({
    refetchOnMountOrArgChange: 10,
  });

  const [getIsueMetrics] = observabilityApi.useGetIssueMetricsMutation();
  const [getCollaboration] = observabilityApi.useGetCollaborationMutation();
  const [getTopAssignee] = observabilityApi.useGetTopAssigneeMutation();
  const [getCommentsDdOne] = observabilityApi.useGetCommentsDdOneMutation();

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
        startDt: get(observability, "filterData.selectedDate.startDate"),
        toDt: get(observability, "filterData.selectedDate.endDate"),
      };

      let peopleMetricsPromiseData = await Promise.all([
        getIsueMetrics(defaultPayload),
        getCollaboration(defaultPayload),
        getTopAssignee(defaultPayload),
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
  const defaultSelectedDate = get(observability, "filterData.selectedDate", {});
  useEffect(() => {
    //Get flow metrics data on initial load with default date and passing all Applications as selected
    /** Before fetching waiting for default date and applications api call to finish**/
    if (defaultSelectedDate.startDate && appList?.length) {
      getPeopleMetrics(true);
    }
  }, [defaultSelectedDate, appList]);

  return (
    <>
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
