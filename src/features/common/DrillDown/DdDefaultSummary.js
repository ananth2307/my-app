import { get } from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
const DdDefaultSummary = () => {
  const commonSliceState = useSelector((state) => state.common);
  const selectedData = get(commonSliceState, 'offcanvasState.selectedData', []);
  const selectedLevelOne = get(commonSliceState, 'drillDownSelectionState.selectedLevelOne', []);
  return (
    <div class="stories-list">
      <h5>Defects</h5>
      <div class="summary_header" id="distribute_summary">
        <div class="fw-5">Sl.No</div>
        <div class="fw-20">Issue Id</div>
        <div class="fw-50">Summary</div>
      </div>
      <ol id="distribute_data" class="summary_part">
        {selectedData[selectedLevelOne]?.summaryList?.map(summaryData => (<li>
            <div class="fw-10">{summaryData.issueId}</div>
            <div class="fw-50">{summaryData.summary}</div>
          </li>))
        }
      </ol>
    </div>
  );
};

export default DdDefaultSummary;
