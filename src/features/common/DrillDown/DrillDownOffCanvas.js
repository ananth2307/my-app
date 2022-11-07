import React from "react";
import CustomOffCanvas from "../../../app/common-components/CustomOffCanvas";
import { useSelector } from "react-redux";
import Dropdown from "./Dropdown";
import {dDDefaultLevelOne} from "./constants";
import DdDefaultLevelOne from "./DdDefaultLevelOne";

const DrillDownOffCanvas = (props) => {
  const offcanvasState = useSelector((state) => state.common?.offcanvasState)
  return (
    <CustomOffCanvas className="custom-off-canvas">
      <div class="flowblock custom_scroll">
        <h3 class="flowhead">{offcanvasState?.title}</h3>
        <div class="flowact-nav">
          <div class="frmgroup col-lg-2 dd_picker">
            <Dropdown 
              options={offcanvasState?.dropDownMenuOptions ? offcanvasState.dropDownMenuOptions : []}
              hideSelectedOptions={false}
              placeholder="Select Sprint"
              closeMenuOnSelect={true}
              defaultValue={offcanvasState.selectedValue}
            />
          </div>
        </div>
        <div class="flowbox-row distribute-wrap flowacti-block">
          {dDDefaultLevelOne.map(level => <DdDefaultLevelOne level={level} />)}
        </div>
        <div class="flow-descriptions-block">
          <div class="stories-list">
            <h5>Defects</h5>
            <div class="summary_header" id="distribute_summary">
              <div class="fw-5">Sl.No</div>
              <div class="fw-20">Issue Id</div>
              <div class="fw-50">Summary</div>
            </div>
            <ol id="distribute_data" class="summary_part">
              <li>
                <div class="fw-10">ACPK-402</div>
                <div class="fw-50">
                  The Proceed to Pay option is not working.
                </div>
              </li>
              <li>
                <div class="fw-10">ACPK-415</div>
                <div class="fw-50">
                  SAVE button is not working in Login page.
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </CustomOffCanvas>
  );
};

export default DrillDownOffCanvas;
