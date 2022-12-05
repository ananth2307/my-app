import React, { memo } from "react";
import DataTable from "../../../app/common-components/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { setIsOffCanvasOpen } from "../../../app/commonSlice";
import { Headers } from "../utils/constants";
import { fromPairs, get, isEmpty } from "lodash";
import { getSortedArr } from "../../common/helpers";
import { observabilityApi } from "../../../app/services/observabilityApi";

const TopCommit = (props) => {
  const tmpTopCommitRepo = get(
    props,
    "bitBucketData.topMostCommitData.pullRequest",
    []
  );
  const { observability } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [getTopMostCommitRepo] =
    observabilityApi.useGetTopMostCommitRepoMutation();
  let topCommitRepo = [];
  !isEmpty(tmpTopCommitRepo) &&
    tmpTopCommitRepo.map((items) => {
      const { created } = items;
      topCommitRepo = getSortedArr(created);
    });
  const getSelectedData = async () => {
    const Payload = {
      fromDt: get(observability, "filterData.selectedDate.startDate") / 1000,
      toDt: get(observability, "filterData.selectedDate.endDate") / 1000,
      topCount: false,
    };
    const response = await getTopMostCommitRepo(Payload);
    const drillSortedArray = getSortedArr(
      get(response, "data.pullRequest[0].created", [])
    );
    const tempSortList = [fromPairs(drillSortedArray)];

    const selectedData = {
      summaryList: tempSortList,
    };
    selectedData.customSummaryHeader = () => (
      <>
        <div class="fw-5">Sl.No</div>
        <div class="fw-70">Project</div>
        <div class="fw-20">Count</div>
      </>
    );
    selectedData.customSummaryList = (selectedData) => {
      return Object.keys(selectedData).map((key, k) => (
        <li>
          <div class="fw-40">{key}</div>
          <div class="fw-20">{selectedData[key]}</div>
        </li>
      ));
    };
    selectedData.summaryToptitle = "Commit";
    return selectedData;
  };
  const openDrillDown = async () => {
    dispatch(
      setIsOffCanvasOpen({
        isDrilldownOpen: true,
        title: "TOP MOST COMMIT DETAILS",
        isDropDownhide: true,
      })
    );
    dispatch(
      setIsOffCanvasOpen({
        isDrilldownOpen: true,
        isDropDownhide: true,
        title: "TOP MOST COMMIT DETAILS",
        selectedData: await getSelectedData(),
      })
    );
  };
  return (
    <>
      <a class="viewlink" onClick={openDrillDown}>
        View all
      </a>
      <DataTable headers={Headers} body={topCommitRepo} />
    </>
  );
};

export default memo(TopCommit);
