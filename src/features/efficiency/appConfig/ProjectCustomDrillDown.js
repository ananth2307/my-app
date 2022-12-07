import { get } from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import Select  from 'react-select'

const ProjectCustomDrillDown = ({title}) => {

  const offcanvasState = useSelector((state) => state.common?.offcanvasState);
  
  const dropDownData = get(offcanvasState,'selectedData',{})


  return (
    <div class="flowblock toolwrap custom_scroll">
      <h3 class="flowhead" id="newhead">
        {title} <span>Please enter your Project data.</span>
      </h3>
     
      <form id="projectFrom">
        <div class="row">
          <div class="frmgroup default-input col-lg-6">
            <input type="hidden" value="" id="cmdbId" name="cmdbId" />
            <label>Type</label>
            <div class="dropdown bootstrap-select">
              <Select 
              options={get(dropDownData,'type',[])}
              value={{label: get(dropDownData,'selected.selectedType',"Nothing Selected")}}
              />
             </div>
          </div>
          <div class="frmgroup default-input col-lg-6">
            <label>Tool Name</label>
            <Select 
            options={get(dropDownData,'tools',[])}
            value={{label: get(dropDownData,'selected.selectedTool',"Nothing Selected")}}  
            />
          </div>
          <div class="frmgroup validate default-input col-lg-6">
            <div class="frmhead">
              <label>Name</label>
              <div class="error" style={{display: "none"}}></div>
            </div>
            <input
              type=""
              id="name"
              name="name"
              value={get(dropDownData,'selected.projectName',"Enter Project Name")}
              placeholder="Enter Project Name"
              autocomplete="off"
              onkeypress="allowAlphaNumericWithSpace(event)"
              maxlength="50"
            />
          </div>
        </div>
        <div class="btnwrap save-btn">
          <a
            class="solid-btn graybtn"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            Cancel
          </a>
          <a class="solid-btn" onclick="saveProject();">
            Save
          </a>
        </div>
      </form>
    </div>
  );
};

export default ProjectCustomDrillDown;
