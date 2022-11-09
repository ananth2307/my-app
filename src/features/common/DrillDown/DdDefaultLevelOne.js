import { cloneDeep, get } from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { observabilityApi } from "../../../app/services/observabilityApi";
import { setSelectedLevelOne } from "../../../app/commonSlice";
import { setIsOffCanvasOpen } from "../../../app/commonSlice";

const DdDefaultLevelOne = (props) => {
  const dispatch = useDispatch();
  const offcanvasState = useSelector((state) => state.common?.offcanvasState);
  const selectedData = get(offcanvasState, "selectedData", []);
  const drillDownSelectionState = useSelector(
    (state) => state?.common?.drillDownSelectionState
  );
  const [getFlowEffciencyDrill] =
  observabilityApi.useGetFlowEfficiencyDrillMutation();
  const formatSummary = (summaryData) => {
    let tmpSummaryData = cloneDeep(summaryData);
    let tempData = []
    tmpSummaryData.map((items) => {
       Object.keys(items).map((key)=>{
        console.log("key",items)
        tempData.push({
          issueId:items[key].jiraKey,
          activeTime:items[key].activeTime.toFixed(1),
          waitTime:items[key].waitTime.toFixed(1),
          summary:items[key].summary
        })
       })
      
      })
    return tempData;
  };
  const onSelectLvlOne =  async() => {
    if(selectedData.onClickCanvas){
    const summaryData = selectedData.onClickCanvas &&  await getFlowEffciencyDrill({
      selectedSprintData:get(offcanvasState,'selectedValue.value',''),
      issueType:props.level.name
     })
     const formatedData = summaryData.data.length > 0 ? formatSummary(summaryData.data) : []
     let tempCopy = {...offcanvasState}
     let arrCopy = {...offcanvasState.selectedData}
     let tempValuCopy = {...offcanvasState.selectedData[props.level.name]}
     if(formatedData.length > 0) tempValuCopy.summaryList = formatedData
     arrCopy[props.level.name]=tempValuCopy
    tempCopy.selectedData = arrCopy
    dispatch(setIsOffCanvasOpen(tempCopy))
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
      <h4>{props?.level?.title}</h4>
      {selectedData.customBoxHeaders ?  selectedData.customBoxHeaders(selectedData[props?.level?.name]):<h2 class="fdcount">{get(offcanvasState, `selectedData.${props.level.name}.count`, 0)}</h2>}
    </div>
  );
};

export default DdDefaultLevelOne;
