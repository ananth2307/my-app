import React from "react";
import CustomOffCanvas from "../../../app/common-components/CustomOffCanvas";
import { useSelector } from "react-redux";
import Dropdown from "./Dropdown";

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
              isCheckboxSelect={true}
              placeholder="Select Application"
              isSearchable={true}
              closeMenuOnSelect={false}
              onChange={(selectedApplications) =>
                props.getFlowDistributionBySprint()
              }
            />
          </div>
        </div>
        <div class="flowbox-row distribute-wrap flowacti-block">
          <div id="fb1" flag="distribute" class="flowbox dark-blueline">
            <h4>Features</h4>
            <h2 class="fdcount" id="Features_distri">
              0
            </h2>
          </div>
          <div id="fb2" flag="distribute" class="flowbox blueline active">
            <h4>Defects</h4>
            <h2 class="fdcount" id="Bug_distri">
              2
            </h2>
          </div>
          <div id="fb3" flag="distribute" class="flowbox pinkline">
            <h4>Risks</h4>
            <h2 class="fdcount" id="Risk_distri">
              2
            </h2>
          </div>
          <div id="fb4" flag="distribute" class="flowbox purpleline">
            <h4>Enablers</h4>
            <h2 class="fdcount" id="Enablers_distri">
              1
            </h2>
          </div>
          <div id="fb5" flag="distribute" class="flowbox yellowline">
            <h4>Debt</h4>
            <h2 class="fdcount" id="Debt_distri">
              1
            </h2>
          </div>
          <div id="fb6" flag="distribute" class="flowbox orangeline">
            <h4>Prod-Fix</h4>
            <h2 class="fdcount" id="prodFix_distri">
              1
            </h2>
          </div>
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
