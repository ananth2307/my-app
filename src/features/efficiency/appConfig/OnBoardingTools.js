import React, { memo , useState} from "react";
import CustomSelection from "../../../app/common-components/customSelect";
import CustomSelect from "../../../app/common-components/select";


const OnBoardingTools = () => {

  const [state, setState] = useState();

  const dropDownState = (input, type) => {
    input && type
      ? setState((state) => ({
          ...state,
          [`${type}MenuOpen`]: true,
        }))
      : setState((state) => ({
          ...state,
          [`${type}MenuOpen`]: false,
        }));
  };

  const handleOnChange = (name, { value}) => {
  }
  return (
    <div class="config-wrap bg-white">
      <div class="configsts-wrap">
        <div class="configsts-col">
          <label>Application Details</label>
          <h4 id="de_appcode">-----</h4>
          <h4 id="de_appname">-----</h4>
        </div>
        <div class="configsts-col">
          <label>Managers</label>
          <h5 class="on_detail">
            <span>P</span>
            <div id="p_manager">-----</div>
          </h5>
          <h5 class="on_detail">
            <span>S</span>
            <div id="s_manager">-----</div>
          </h5>
        </div>
        <div class="configsts-col">
          <label>Approval Gate</label>
          <h4 id="de_appgate">-----</h4>
        </div>
        <div class="configsts-col">
          <label>Business Unit</label>
          <h4 id="de_Bunit">-----</h4>
        </div>
      </div>
      <div class="projectsts-wrap">
        <h5>Project Name</h5>
        <div class="projectsts-container">
         {/* <CustomSelection
              name="businessHead"
              options={[]}
              onInputChange={{ dropDownState, selectedField: "businessHead" }}
              onChange={handleOnChange}
              menuIsOpen={false}
              placeholder={"Select Project"}
            /> */}
            <CustomSelect options={[]} isCheckboxSelect={true}/>
          <div class="frmgroup">
            <label>Select Project</label>
            <select
              class="selectpicker"
              data-live-search="true"
              id="selectProject"
              title="Select Project"
            ></select>
          </div>
          <div class="orgrp">
            <span>OR</span>
          </div>
          <div class="frmgroup default-input">
            <label>Add New Project</label>
            <div class="frmhead">
              <div class="error"></div>
            </div>
            <input
              type="text"
              id="newProject"
              name="newProject"
              placeholder="Enter Project Name"
              autocomplete="off"
            />
          </div>
          <button onclick="addNewProject()" class="primary-btn">
            Add
          </button>
        </div>
      </div>
      <div class="projectsts-wrap">
        <h5>Select Type</h5>
        <div class="frmgroup radiogroup selecttypes-radio">
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              checked
              type="radio"
              name="selectType"
              id="sltype1"
              value="DevOps Tools"
            />
            <label class="form-check-label checked" for="sltype1">
              DevOps Tools
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="selectType"
              id="sltype2"
              value="Database"
            />
            <label class="form-check-label" for="sltype2">
              Database
            </label>
          </div>
        </div>
      </div>
      <div class="selecttools-wrap">
        <div class="sltools-head">
          <h5>Select Tools</h5>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="aplytemplate"
              value="Apply Template"
            />
            <label class="form-check-label" for="aplytemplate">
              Apply Template
            </label>
          </div>
        </div>
        <div class="sltools-container" id="DevOps_tools">
          <div class="sltoolrow enabledrow">
            <div class="sltool-left">
              <h5>Plan</h5>
            </div>
            <div class="sltool-right">
              <div id="Plan" class="sltool-logos"></div>
              <div class="sltypes Jira-data Jiracloud-data onboart_inputs">
                <div class="row">
                  <div class="frmgroup col">
                    <select
                      class="selectpicker form-control resetform"
                      id="plan_type"
                      title="Select Type"
                    ></select>
                  </div>
                  <div class="frmgroup col">
                    <input
                      type=""
                      class="typeahead form-control"
                      value=""
                      id="projectKey"
                      name="projectKey"
                      placeholder="Project Key"
                      autocomplete="off"
                      maxlength="10"
                    />
                  </div>
                  <div class="frmgroup col">
                    <input
                      type=""
                      value=""
                      id="projectLead"
                      class="typeahead form-control"
                      name="projectLead"
                      placeholder="Project Lead"
                      autocomplete="off"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="sltoolrow disabledrow">
            <div class="sltool-left">
              <h5>Code</h5>
            </div>
            <div class="sltool-right">
              <div id="Code" class="sltool-logos"></div>
              <div class="sltypes GitLab-data GitLabcloud-data onboart_inputs">
                <div class="row">
                  <div class="frmgroup col-4">
                    <select
                      class="selectpicker form-control resetform"
                      id="gitvisibility_Type"
                      title="Select Type"
                    >
                      <option value="">Select Visibility Type</option>
                      <option value="public">public</option>
                      <option value="private">private</option>
                      <option value="internal">internal</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="sltoolrow disabledrow">
            <div class="sltool-left">
              <h5>Build</h5>
            </div>
            <div class="sltool-right">
              <div id="Build" class="sltool-logos"></div>
            </div>
          </div>
          <div class="sltoolrow disabledrow">
            <div class="sltool-left">
              <h5>Test</h5>
            </div>
            <div class="sltool-right">
              <div id="Test" class="sltool-logos"></div>
            </div>
          </div>
          <div class="sltoolrow disabledrow">
            <div class="sltool-left">
              <h5>Scan</h5>
            </div>
            <div class="sltool-right">
              <div id="Scan" class="sltool-logos"></div>
              <div class="sltypes SonarQube-data onboart_inputs">
                <div class="row">
                  <div class="frmgroup col-4">
                    <select
                      class="selectpicker form-control resetform"
                      id="visibility_Type"
                      title="Select Type"
                    >
                      <option value="">Type</option>
                      <option value="public">public</option>
                      <option value="private">private</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="sltypes NexusIQ-data onboart_inputs">
                <div class="row">
                  <div class="frmgroup col-4">
                    <select
                      class="selectpicker form-control"
                      id="Organization_ID"
                      title="Select Organization ID"
                    >
                      <option value="">Select Organization ID</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="sltoolrow disabledrow">
            <div class="sltool-left">
              <h5>Package</h5>
            </div>
            <div class="sltool-right">
              <div id="Package" class="sltool-logos"></div>
              <div class="sltypes JFrog-data onboart_inputs">
                <div class="row">
                  <div class="frmgroup col-4">
                    <select
                      class="selectpicker form-control resetform"
                      id="Package_type"
                      title="Select Type"
                    ></select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="sltoolrow disabledrow">
            <div class="sltool-left">
              <h5>Deploy</h5>
            </div>
            <div class="sltool-right">
              <div id="Deploy" class="sltool-logos"></div>
            </div>
          </div>
        </div>
        <div class="sltools-container" id="Database_tools">
          <div class="sltoolrow enabledrow">
            <div class="sltool-left">
              <h5>Database</h5>
            </div>
            <div class="sltool-right">
              <div id="mariaDB" class="sltool-logos"></div>
              <div class="sltypes Mariadb-data onboart_inputs">
                <div class="row">
                  <div class="frmgroup col">
                    <input
                      type=""
                      class="form-control"
                      value=""
                      id="DBname"
                      name="DBname"
                      placeholder="Database Name"
                      autocomplete="off"
                    />
                  </div>
                  <div class="frmgroup col">
                    <input
                      type=""
                      class="form-control"
                      value=""
                      id="userName"
                      name="userName"
                      placeholder="User Name"
                      autocomplete="off"
                    />
                  </div>
                  <div class="frmgroup col">
                    <input
                      type="password"
                      value=""
                      id="password"
                      class="form-control"
                      name="password"
                      placeholder="Password"
                      autocomplete="off"
                    />
                  </div>
                  <div class="form-check col">
                    <input
                      class="form-check-input checkbox"
                      type="checkbox"
                      id="checkbox3"
                      value="0"
                      name="checkbox3"
                    />
                    <label class="form-check-label" for="checkbox3">
                      Remote Access
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btnsrow">
        <a href="/appConfig" class="backlink">
          Back
        </a>
        <div class="btnwrap">
          <button type="reset" class="default-btn" id="reset">
            Reset
          </button>
          <button
            type="button"
            class="default-btn submitbutton"
            onclick="onBoardingReq();"
          >
            Submit
          </button>
          <button
            type="submit"
            onclick="location.href='/accessManagement'"
            class="primary-btn"
          >
            Proceed to Access Mgmnt.
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(OnBoardingTools);
