import { useDispatch } from "react-redux";
import React  from "react";
import CustomOffCanvas from "../../../app/common-components/CustomOffCanvas";
import { useSelector } from "react-redux";
import Dropdown from "./Dropdown";
import { dDDefaultLevelOne } from "./constants";
import DdDefaultLevelOne from "./DdDefaultLevelOne";
import DdDefaultSummary from "./DdDefaultSummary";
import { chartClass } from "./constants";
import {get,isEmpty} from 'lodash'

const DrillDownOffCanvas = (props) => {
  const offcanvasState = useSelector((state) => state.common?.offcanvasState);
  const commonSliceState = useSelector((state) => state.common);
  const selectedData = get(commonSliceState, "offcanvasState.selectedData", []);
  const selectedLevelOne = get(
    commonSliceState,
    "drillDownSelectionState.selectedLevelOne",
    []
  );
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
        <div class={`flowbox-row ${chartClass[offcanvasState.title.replaceAll(" ",'')]}`}>
          {dDDefaultLevelOne.map((level) => (
            <DdDefaultLevelOne level={level} {...props}/>
          ))}
        </div>
        <div class="flow-descriptions-block flowpredi-des ">
          <DdDefaultSummary />
        </div>
        {selectedData.DdFlowPredictCustomSummary &&
        <div class="flow-descriptions-block flowpredi-des ">
        <div class="stories-list">
        <h5>UNPLANNED</h5>
        {selectedData.customSummaryHeader()}
        {
          !isEmpty(selectedData[selectedLevelOne]) &&
        selectedData[selectedLevelOne]?.summaryList && selectedData[selectedLevelOne].summaryList.unplannedSummary && (
            <ol class='accordion'>
            {selectedData[selectedLevelOne].summaryList.unplannedSummary.map((summaryData)=>{
            return selectedData.customSummaryList(summaryData)
          })
            }
            </ol>
          )
        }
        </div>
        </div>
        }
      </div>
    </CustomOffCanvas>
  );
};

export default DrillDownOffCanvas;
