import { get, isEmpty } from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
const DdDefaultSummary = ({title}) => {
  const commonSliceState = useSelector((state) => state.common);
  const selectedData = get(commonSliceState, 'offcanvasState.selectedData', []);
  const selectedLevelOne = get(commonSliceState, 'drillDownSelectionState.selectedLevelOne', []);
  console.log("selected",selectedLevelOne)
  console.log("selectedData",selectedData)
  let avgDays = 0
  title === 'FLOW VELOCITY' && !isEmpty(selectedData[selectedLevelOne])&& 
    selectedData[selectedLevelOne]?.summaryList.map((items)=>{
      avgDays += items.daysToComplete;
    })
  return (
    <div className="stories-list">
      <h5>Defects</h5>
      {title ==='FLOW VELOCITY'&& <h5 className="avg_day_summary">Average Days to Complete  { selectedData[selectedLevelOne]?.summaryList ? Math.round(avgDays/selectedData[selectedLevelOne]?.summaryList.length): 0}</h5>}
      <div className="summary_header" id="distribute_summary">
        <div className="fw-5">Sl.No</div>
        <div className="fw-10">Issue Id</div>
        {title ==='FLOW VELOCITY' && <div className="fw-20">Days to Complete</div>}
        <div className="fw-50">Summary</div>
        
      </div>
      { !isEmpty(selectedData[selectedLevelOne]) && selectedData[selectedLevelOne]?.summaryList.length > 0 &&
      <ol id="distribute_data" className="summary_part">
        {selectedData[selectedLevelOne]?.summaryList?.map(summaryData => (<li>
            <div className="fw-10">{summaryData.issueId}</div>
            {title ==='FLOW VELOCITY' &&<div className="fw-10">{summaryData.daysToComplete}</div>}
            <div className="fw-50">{summaryData.summary}</div>
          </li>))
        }
      </ol>}
    </div>
  );
};

export default DdDefaultSummary;
