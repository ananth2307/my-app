import React, { memo } from "react";
import DataTable from "../../../app/common-components/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { setIsOffCanvasOpen } from "../../../app/commonSlice";
import { Headers } from "../utils/constants";
import { fromPairs, get, isEmpty } from "lodash";
import { getSortedArr } from "../../common/helpers";
import { observabilityApi } from "../../../app/services/observabilityApi";

const TopRepo = (props) => {
  const tmpTopRepo = get(
    props,
    "bitBucketData.topRepoDownloadData.repository",
    []
  );
  const { observability } = useSelector((state) => state);
  const [getTopRepoDownloads] =
    observabilityApi.useGetTopRepoDownloadsMutation();
  let topDownloadRepo = [];
  !isEmpty(tmpTopRepo) &&
    tmpTopRepo.map((items) => {
      const { download } = items;
      topDownloadRepo = getSortedArr(download);
    });
  const dispatch = useDispatch();
  const getSelectedData = async () => {
    const Payload = {
      fromDt: get(observability, "filterData.selectedDate.startDate") / 1000,
      toDt: get(observability, "filterData.selectedDate.endDate") / 1000,
      topCount: false,
    };
    const response = await getTopRepoDownloads(Payload);
    const drillSortedArray = getSortedArr(
      get(response, "data.repository[0].download", [])
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
    selectedData.summaryToptitle = "Downloads";
    return selectedData;
  };
  const openDrillDown = async () => {
    dispatch(
      setIsOffCanvasOpen({
        isDrilldownOpen: true,
        isDropDownhide: true,
        title: "TOP REPO DOWNLOAD DETAILS",
      })
    );
    dispatch(
      setIsOffCanvasOpen({
        isDrilldownOpen: true,
        isDropDownhide: true,
        title: "TOP REPO DOWNLOAD DETAILS",
        selectedData: await getSelectedData(),
      })
    );
  };
  return (
    <>
      <a class="viewlink" onClick={openDrillDown}>
        View all
      </a>
      <DataTable
        headers={Headers}
        body={topDownloadRepo}
        isPagination={false}
      />
    </>
  );
};

export default memo(TopRepo);
