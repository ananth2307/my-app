import React, { memo } from "react";
import DataTable from "../../../app/common-components/DataTable";
import { useDispatch } from "react-redux";
import { setIsOffCanvasOpen } from "../../../app/commonSlice";

const TopRepo = () => {
  const dispatch = useDispatch();
  const Headers = [
    {
      text: "Project",
      key: 1,
      value: 0,
    },
    {
      text: "Count",
      key: 2,
      value: 1,
    },
  ];
  const body = [
    ["dtop", 886],
    ["fury", 134],
    ["keys-cdone", 24],
    ["dome-data_jira", 31],
    ["admin-activities-plugin", 3] 
  ];
  const openDrillDown = async () => {
    dispatch(
      setIsOffCanvasOpen({
        isDrilldownOpen: true,
        title: "TOP REPO DOWNLOAD DETAILS",
      })
    );
    dispatch(
      setIsOffCanvasOpen({
        isDrilldownOpen: true,
        title: "TOP REPO DOWNLOAD DETAILS",
        // selectedData: await getSelectedData(),
      })
    );
  };
  return (
    <><a class='viewlink' onClick={openDrillDown}>View all</a>
    <DataTable headers={Headers} body={body} />
    </>
  );
};

export default memo(TopRepo);
