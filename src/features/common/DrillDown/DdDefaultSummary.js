import { get, isEmpty } from "lodash";
import React from "react";
import { useSelector } from "react-redux";
const DdDefaultSummary = (props) => {
  const { summaryTitle, summaryList } = props;
  const commonSliceState = useSelector((state) => state.common);
  const selectedData = get(commonSliceState, "offcanvasState.selectedData", []);
  const selectedLevelOne = get(
    commonSliceState,
    "drillDownSelectionState.selectedLevelOne",
    []
  );
  return (
    <>
      <div className="stories-list">
        <div class="row">
          <div class="col-md-6">
            <h5>
              {summaryTitle ? summaryTitle : selectedLevelOne.toUpperCase()}
            </h5>
          </div>
          {selectedData.rightSummaryHeader
            ? selectedData.rightSummaryHeader(selectedData, selectedLevelOne)
            : ""}
        </div>
        {selectedData.DdFlowPredictCustomSummary ? (
          selectedData.customSummaryHeader()
        ) : (
          <div class="summary_header" id="VTC_summary">
            {selectedData.customSummaryHeader
              ? selectedData.customSummaryHeader()
              : !selectedData.DdtopAssigneeCustomSummary && (
                  <>
                    <div class="fw-5">Sl.No</div>
                    <div class="fw-20">Issue Id</div>
                    <div class="fw-50">Summary</div>
                  </>
                )}
          </div>
        )}
        {selectedData.DdFlowPredictCustomSummary && summaryList ? (
          <ol class="accordion">
            {summaryList.map((summaryData) => {
              return selectedData.customSummaryList(summaryData);
            })}
          </ol>
        ) : (
          <ol className="summary_part">
            {summaryList?.map((summaryData) => {
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
    </>
  );
};

export default DdDefaultSummary;
