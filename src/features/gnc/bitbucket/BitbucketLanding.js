import React, { memo, useCallback } from "react";
import {
  BitBuketTrendContainer1,
  BitBuketTrendContainer2,
  BitBuketTrendContainer3,
  BitBuketTrendContainer4,
} from "../common/constants";
import { useState, useEffect } from "react";
import { observabilityApi } from "../../../app/services/observabilityApi";
import { getDefaultSelectedDate } from "../../common/helpers";
import { get } from "lodash";
import { DrillDownOffCanvas } from "../../common";
import Filter from "../../common/Filter";
import ChartContainer from "../../observability/common/ChartContainer";
import BitBucketHeader from "./BitBucketHeader";
import { useSelector } from "react-redux";

const BitbucketLanding = (props) => {
  const { observability } = useSelector((state) => state);
  const [state, setstate] = useState({
    bitBucketData: {
      BitBucketHeaderData: {
        mostActiveRepoData: {},
        mostPullRequstData: {},
        totalCommitData: {},
        totalCloneData: {},
        totalPullRequestData: {},
      },
      commitTrendData: {},
      createDeleteDetailsData: {},
      pullRequestCountData: {},
      pullRequestTrendData: {},
      loginLogoutData: {},
      topRepoDownloadData: {},
      topMostCommitData: {},
    },
    isShowDrillDown: false,
  });
  const [getMostActiveRepo] = observabilityApi.useGetMostActiveRepoMutation();
  const [getMostPullRequest] = observabilityApi.useGetMostPullRequestMutation();
  const [getTotalCommit] = observabilityApi.useGetTotalCommitMutation();
  const [getTotalClone] = observabilityApi.useGetTotalCloneMutation();
  const [getTotalPullRequest] =
    observabilityApi.useGetTotalPullRequestMutation();
  const [getCommitTrend] = observabilityApi.useGetCommitTrendMutation();
  const [getCreateDeleteDetails] =
    observabilityApi.useGetCreateDeleteDetailsMutation();
  const [getPullRequestCount] =
    observabilityApi.useGetPullRequestCountMutation();
  const [getPullRequestTrend] =
    observabilityApi.useGetPullRequestTrendMutation();
  const [getLoginLogoutDetails] =
    observabilityApi.useGetLoginLogoutDetailsMutation();
  const [getTopRepoDownloads] =
    observabilityApi.useGetTopRepoDownloadsMutation();
  const [getTopMostCommitRepo] =
    observabilityApi.useGetTopMostCommitRepoMutation();
  let { initialStartDate, initialEndDate } = getDefaultSelectedDate();
  initialStartDate = new Date(initialStartDate).getTime();
  initialEndDate = new Date(initialEndDate).getTime();

  const getBitBucketData = useCallback(async (InitialLoad=false) => {
    const defaultPayload = {
      fromDt: InitialLoad ? initialStartDate : get(observability, "filterData.selectedDate.startDate")/1000,
      toDt:InitialLoad ? initialEndDate : get(observability, "filterData.selectedDate.endDate")/1000
    };
    const topCountPayload = {
      fromDt: InitialLoad ? initialStartDate : get(observability, "filterData.selectedDate.startDate")/1000,
      toDt:InitialLoad ? initialStartDate : get(observability, "filterData.selectedDate.endDate")/1000,
      topCount: true,
    };
    let bitBucketPromiseData = await Promise.all([
      getMostActiveRepo(defaultPayload),
      getMostPullRequest(defaultPayload),
      getTotalCommit(defaultPayload),
      getTotalClone(defaultPayload),
      getTotalPullRequest(defaultPayload),
      getCommitTrend(defaultPayload),
      getCreateDeleteDetails(defaultPayload),
      getPullRequestCount(defaultPayload),
      getPullRequestTrend(defaultPayload),
      getLoginLogoutDetails(defaultPayload),
      getTopRepoDownloads(topCountPayload),
      getTopMostCommitRepo(topCountPayload),
    ]);
    const bitBucketData = {
      BitBucketHeaderData: {
        mostActiveRepoData: get(bitBucketPromiseData, "[0].data", {}),
        mostPullRequstData: get(bitBucketPromiseData, "[1].data", {}),
        totalCommitData: get(bitBucketPromiseData, "[2].data", {}),
        totalCloneData: get(bitBucketPromiseData, "[3].data", {}),
        totalPullRequestData: get(bitBucketPromiseData, "[4].data", {}),
      },
      commitTrendData: get(bitBucketPromiseData, "[5].data", {}),
      createDeleteDetailsData: get(bitBucketPromiseData, "[6].data", {}),
      pullRequestCountData: get(bitBucketPromiseData, "[7].data", {}),
      pullRequestTrendData: get(bitBucketPromiseData, "[8].data", {}),
      loginLogoutData: get(bitBucketPromiseData, "[9].data", {}),
      topRepoDownloadData: get(bitBucketPromiseData, "[10].data", {}),
      topMostCommitData: get(bitBucketPromiseData, "[11].data", {}),
    };
    setstate((state) => ({
      ...state,
      bitBucketData: {
        ...state.bitBucketData,
        ...bitBucketData,
      },
    }));
  }, [state.bitBucketData,observability.filterData]);
  useEffect(() => {
    getBitBucketData(true);
  }, []);
  return (
    <>
      <DrillDownOffCanvas bitBucketData={state.bitBucketData} />
      <div className="dashboardwrap colswrap all-works">
        <Filter
          getFilteredData={getBitBucketData}
          isShowSprintList={false}
          isApplicationHide={true}
        />
        <div class="row">
          <BitBucketHeader
            data = {state.bitBucketData.BitBucketHeaderData}
          />
          <div className="row">
            {BitBuketTrendContainer1.map((chartType, index) => {
              return (
                <ChartContainer
                  key={chartType}
                  index={index}
                  {...chartType}
                  bitBucketData={state.bitBucketData}
                >
                  {chartType.component}
                </ChartContainer>
              );
            })}
          </div>
          <div className="row">
            {BitBuketTrendContainer2.map((chartType, index) => {
              return (
                <ChartContainer
                  key={chartType}
                  index={index}
                  {...chartType}
                  bitBucketData={state.bitBucketData}
                >
                  {chartType.component}
                </ChartContainer>
              );
            })}
          </div>
          <div className="row">
            {BitBuketTrendContainer3.map((chartType, index) => {
              return (
                <ChartContainer
                  key={chartType}
                  index={index}
                  {...chartType}
                  bitBucketData={state.bitBucketData}
                >
                  {chartType.component}
                </ChartContainer>
              );
            })}
          </div>
          <div className="row">
            {BitBuketTrendContainer4.map((chartType, index) => {
              return (
                <ChartContainer
                  key={chartType}
                  index={index}
                  {...chartType}
                  bitBucketData={state.bitBucketData}
                >
                  {chartType.component}
                </ChartContainer>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(BitbucketLanding);
