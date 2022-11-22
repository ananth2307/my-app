import { get, isEmpty } from "lodash";
import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsOffCanvasOpen } from "../../../app/commonSlice";
import { observabilityApi } from "../../../app/services/observabilityApi";

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
  const sucessListItems =
    !isEmpty(topSuccessData)&&
    topSuccessData.map((list) => {
      return Object.keys(list).map((key, k) => {
        return (
          <tr>
            <td>{key}</td>
            <td>{list[key]}</td>
          </tr>
        );
      });
    });
  const getSelectedData = async () => {
    const Payload = {
      fromDt: get(observability, "filterData.selectedDate.startDate") / 1000,
      toDt: get(observability, "filterData.selectedDate.endDate") / 1000,
      topCount: false,
    };
    const response = await getTopSuccessFailure(Payload);
    const selectedData = {
      summaryList: get(response, "data.SUCCESS", []),
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
        title: "SUCCESS DETAILS",
      })
    );
    dispatch(
      setIsOffCanvasOpen({
        isDrilldownOpen: true,
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
      <table id="top5SuccessDetails" class="table">
        <thead>
          <tr>
            <th>Project</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>{sucessListItems}</tbody>
      </table>
    </>
  );
};

export default memo(TopSucess);
