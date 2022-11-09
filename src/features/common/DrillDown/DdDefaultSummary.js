import { get, isEmpty } from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
const DdDefaultSummary = (props) => {
  const commonSliceState = useSelector((state) => state.common);
  const selectedData = get(commonSliceState, "offcanvasState.selectedData", []);
  const selectedLevelOne = get(
    commonSliceState,
    "drillDownSelectionState.selectedLevelOne",
    []
  );
  return (
    <div className="stories-list">
      <div class="row">
        <div class="col-md-6">
          <h5>{selectedLevelOne.toUpperCase()}</h5>
        </div>
        {selectedData.rightSummaryHeader
          ? selectedData.rightSummaryHeader(selectedData, selectedLevelOne)
          : ""}
      </div>
      <div class="summary_header" id="VTC_summary">
        {selectedData.customSummaryHeader ? (
          selectedData.customSummaryHeader()
        ) : (
          <>
            <div class="fw-5">Sl.No</div>
            <div class="fw-10">Issue Id</div>
            <div class="fw-70">Summary</div>
          </>
        )}
      </div>
      {!isEmpty(selectedData[selectedLevelOne]) &&
        selectedData[selectedLevelOne]?.summaryList && (
          <ol className="summary_part">
            {selectedData[selectedLevelOne]?.summaryList?.map((summaryData) => {
              return selectedData.customSummaryList ? (
                selectedData.customSummaryList(summaryData)
              ) : (
                <li>
                  <div className="fw-10">{summaryData.issueId}</div>
                  <div className="fw-50">{summaryData.summary}</div>
                </li>
              );
            })}
          </ol>
        )}
    </div>
  );
};

export default DdDefaultSummary;
