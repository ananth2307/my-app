import React from "react";
import CustomOffCanvas from "../../../app/common-components/CustomOffCanvas";
import { useSelector } from "react-redux";
import Dropdown from "./Dropdown";
import { dDDefaultLevelOne } from "./constants";
import DdDefaultLevelOne from "./DdDefaultLevelOne";
import DdDefaultSummary from "./DdDefaultSummary";

const DrillDownOffCanvas = (props) => {
  const offcanvasState = useSelector((state) => state.common?.offcanvasState);
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
        <div class="flowbox-row distribute-wrap flowacti-block">
          {dDDefaultLevelOne.map((level) => (
            <DdDefaultLevelOne level={level} {...props}/>
          ))}
        </div>
        <div class="flow-descriptions-block">
          <DdDefaultSummary />
        </div>
      </div>
    </CustomOffCanvas>
  );
};

export default DrillDownOffCanvas;
