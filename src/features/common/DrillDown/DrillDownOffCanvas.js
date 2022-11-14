import React  from "react";
import CustomOffCanvas from "../../../app/common-components/CustomOffCanvas";
import { useSelector} from "react-redux";
import Dropdown from "./Dropdown";
import { dDDefaultLevelOne } from "./constants";
import DdDefaultLevelOne from "./DdDefaultLevelOne";
import DdDefaultSummary from "./DdDefaultSummary";
import {get} from 'lodash'

const DrillDownOffCanvas = (props) => {
  const offcanvasState = useSelector((state) => state.common?.offcanvasState);
  const commonSliceState = useSelector((state) => state.common);
  const selectedData = get(commonSliceState, "offcanvasState.selectedData", []);
  const selectedLevelOne = get(
    commonSliceState,
    "drillDownSelectionState.selectedLevelOne",
    []
  );
  const OpenIssueSummaryList = get(selectedData[selectedLevelOne],'summaryList.openIssue',[])
  const predictabilityPlannedSummary = get(selectedData[selectedLevelOne],'summaryList.plannedSummary',[])
  return (
    <CustomOffCanvas className="custom-off-canvas">
      <div class="flowblock custom_scroll">
        <h3 class="flowhead">{offcanvasState?.title}</h3>
        <div class="flowact-nav">
          <div class="frmgroup col-lg-2 dd_picker">
            <Dropdown
              options={
                offcanvasState?.dropDownMenuOptions
                  ? offcanvasState.dropDownMenuOptions
                  : []
              }
              hideSelectedOptions={false}
              placeholder="Select Sprint"
              closeMenuOnSelect={true}
              defaultValue={offcanvasState.selectedValue}
            />
          </div>
        </div>
        <div class={`flowbox-row ${selectedData.drillDownflowWrapClass ? selectedData.drillDownflowWrapClass : "distribute-wrap flowacti-block"}`}>
          {dDDefaultLevelOne.map((level) => (
            <DdDefaultLevelOne level={level} {...props}/>
          ))}
        </div>
        <div class="flow-descriptions-block flowpredi-des ">
          <DdDefaultSummary
            summaryTitle={selectedData?.summaryToptitle}
            summaryList={selectedData.DdtopAssigneeCustomSummary ? OpenIssueSummaryList : selectedData.DdFlowPredictCustomSummary ? predictabilityPlannedSummary : get(selectedData[selectedLevelOne],'summaryList',[])}
           />
        </div>
        {selectedData.DdtopAssigneeCustomSummary || selectedData.DdFlowPredictCustomSummary &&
        <div class="flow-descriptions-block flowpredi-des ">
        <div class="stories-list">
        <DdDefaultSummary
            summaryTitle={selectedData?.summaryBottomtitle}
            summaryList={selectedData.DdtopAssigneeCustomSummary ? get(selectedData[selectedLevelOne],'summaryList.doneIssue',[]) : get(selectedData[selectedLevelOne],'summaryList.unplannedSummary',[])}
           />
        </div>
        </div>
        }
      </div>
    </CustomOffCanvas>
  );
};

export default DrillDownOffCanvas;
