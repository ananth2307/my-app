import {  get } from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedLevelOne } from "../../../app/commonSlice";

const DdDefaultLevelOne = (props) => {
  const dispatch = useDispatch();
  const offcanvasState = useSelector((state) => state.common?.offcanvasState);
  const selectedData = get(offcanvasState, "selectedData", []);
  const drillDownSelectionState = useSelector(
    (state) => state?.common?.drillDownSelectionState
  );
  const onSelectLvlOne =() => {
    if(selectedData.DdLevelOneBoxClick){
         selectedData.customSummaryListCall(props.level.name,offcanvasState)
    }
    dispatch(setSelectedLevelOne(props.level.name));
     
  };
  
  return (
    <div
      className={`flowbox dark-blueline ${props.level.className} ${
        drillDownSelectionState?.selectedLevelOne === props?.level?.name
          ? "active"
          : ""
      }`}
      onClick={onSelectLvlOne}
      key={props.level.name}
    >
     { !selectedData.customBoxHeaders && <h4>{props?.level?.title}</h4>}
      {selectedData.customBoxHeaders ?  selectedData.customBoxHeaders(selectedData[props?.level?.name],props.level.title):<h2 class="fdcount">{get(offcanvasState, `selectedData.${props.level.name}.count`, 0)}</h2>}
    </div>
  );
};

export default DdDefaultLevelOne;
