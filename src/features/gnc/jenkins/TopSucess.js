import { fromPairs, get, isEmpty } from "lodash";
import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../../app/common-components/DataTable";
import { setIsOffCanvasOpen } from "../../../app/commonSlice";
import { observabilityApi } from "../../../app/services/observabilityApi";
import { getSortedArr } from "../../common/helpers";
import { Headers } from "../utils/constants";

const TopSucess = (props) => {
  const dispatch = useDispatch();
  const { observability } = useSelector((state) => state);
  const [getTopSuccessFailure] =
    observabilityApi.useGetTopSuccessFailureMutation();
  const topSuccessData = get(
    props,
    "jenkinsData.topSuccessFailureData.SUCCESS",
    []
  );
  let sortedArr = !isEmpty(topSuccessData) ? getSortedArr(topSuccessData.at(0)) : []
  const getSelectedData = async () => {
    const Payload = {
      fromDt: get(observability, "filterData.selectedDate.startDate") / 1000,
      toDt: get(observability, "filterData.selectedDate.endDate") / 1000,
      topCount: false,
    };
    const response = await getTopSuccessFailure(Payload);
    const drillSortedArray = getSortedArr(get(response, "data.SUCCESS[0]", []))
    const tempSortList = [fromPairs(drillSortedArray)]
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
      return Object.keys(selectedData).map((key) => (
        <li>
          <div class="fw-40">{key}</div>
          <div class="fw-20">{selectedData[key]}</div>
        </li>
      ));
    };
    selectedData.summaryToptitle = "SUCCESS";
    return selectedData;
  };
  const openDrillDown = async () => {
    dispatch(
      setIsOffCanvasOpen({
        isDrilldownOpen: true,
        isDropDownhide:true,
        title: "SUCCESS DETAILS",
      })
    );
    dispatch(
      setIsOffCanvasOpen({
        isDrilldownOpen: true,
        isDropDownhide:true,
        title: "SUCCESS DETAILS",
        selectedData: await getSelectedData(),
      })
    );
  };
  return (
    <>
      <a class="viewlink" onClick={openDrillDown}>
        View All
      </a>
      <DataTable
      headers={Headers}
      body={sortedArr}
      isPagination={false}
      />
    </>
  );
};

export default memo(TopSucess);
