import React from "react";
import CustomOffCanvas from "../../../app/common-components/CustomOffCanvas";

const DrillDownOffCanvas = (props) => {
  return (
    <CustomOffCanvas isShow={props.isShowDrillDown} className="custom-off-canvas">
      <div class="flowblock custom_scroll">
        <h3 class="flowhead">Flow Distribution</h3>
        <div class="flowact-nav">
          <div class="frmgroup col-lg-2 dd_picker">
            <div class="dropdown bootstrap-select Drill_Sprint">
              <select
                class="selectpicker Drill_Sprint"
                id="DD_Sprint"
                name="DD_Sprint"
              >
                <option value="ACPK Sprint 10.2_2022">
                  ACPK Sprint 10.2_2022
                </option>
                <option value="ACPK Sprint 11.1_2022">
                  ACPK Sprint 11.1_2022
                </option>
              </select>
              <button
                type="button"
                tabindex="-1"
                class="btn dropdown-toggle btn-light"
                data-bs-toggle="dropdown"
                role="combobox"
                aria-owns="bs-select-1"
                aria-haspopup="listbox"
                aria-expanded="false"
                title="ACPK Sprint 10.2_2022"
                data-id="DD_Sprint"
              >
                <div class="filter-option">
                  <div class="filter-option-inner">
                    <div class="filter-option-inner-inner">
                      ACPK Sprint 10.2_2022
                    </div>
                  </div>{" "}
                </div>
              </button>
              <div
                class="dropdown-menu"
              >
                <div
                  class="inner show"
                  role="listbox"
                  id="bs-select-1"
                  tabindex="-1"
                  aria-activedescendant="bs-select-1-0"
                >
                  <ul
                    class="dropdown-menu inner show"
                    role="presentation"
                  >
                    <li class="selected active">
                      <a
                        role="option"
                        class="dropdown-item active selected"
                        id="bs-select-1-0"
                        tabindex="0"
                        aria-setsize="2"
                        aria-posinset="1"
                        aria-selected="true"
                      >
                        <span class="text">ACPK Sprint 10.2_2022</span>
                      </a>
                    </li>
                    <li>
                      <a
                        role="option"
                        class="dropdown-item"
                        id="bs-select-1-1"
                        tabindex="0"
                      >
                        <span class="text">ACPK Sprint 11.1_2022</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
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
