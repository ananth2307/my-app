import React, { memo } from "react";

const NewApplicationConfig = () => {
  return (
    <div class="config-wrap bg-white">
      <h4 class="sectitle updatehead" style={{display: "none"}}>
        Application
      </h4>
      <h4 class="sectitle newhead">New Application Configuration</h4>
      <div class="confingform" id="appFrom">
        <div class="confingform-wrap">
          <div class="confingformcol">
            <label>Application Details</label>
            <div class="frmgroup">
              <div class="frmhead">
                <div class="error" style={{display: "none"}}></div>
              </div>
              <input
                type=""
                value=""
                id="appCode"
                name="appCode"
                placeholder="Enter Application Code"
                autocomplete="off"
              />
            </div>
            <div class="frmgroup">
              <div class="frmhead">
                <div class="error" style={{display: "none"}}></div>
              </div>
              <input
                type=""
                value=""
                id="appName"
                name="appName"
                placeholder="Enter Application Name"
                autocomplete="off"
              />
            </div>
          </div>
          <div class="confingformcol">
            <label>Manager Details</label>
            <div class="frmgroup">
              <div class="frmhead">
                <div class="error" style={{display: "none"}}></div>
              </div>
              <input
                type=""
                value=""
                class="typeahead_Manager"
                id="primaryManager"
                name="primaryManager"
                placeholder="Enter Primary Manager"
                autocomplete="off"
              />
            </div>
            <div class="frmgroup">
              <div class="frmhead">
                <div class="error" style={{display: "none"}}></div>
              </div>
              <input
                type=""
                value=""
                class="typeahead_Manager"
                id="secondaryManager"
                name="secondaryManager"
                placeholder="Enter Secondzary Manager"
                autocomplete="off"
              />
            </div>
          </div>
          <div class="confingformcol">
            <label>Group Details</label>
            <div class="frmgroup">
              <div class="frmhead">
                <div class="error" style={{display: "none"}}></div>
              </div>
              <input
                type=""
                value=""
                id="businessUnit"
                name="businessUnit"
                placeholder="Enter Business Unit"
                autocomplete="off"
              />
            </div>
            <div class="frmgroup">
              <div class="frmhead">
                <div class="error" style={{display: "none"}}></div>
              </div>
              <input
                type=""
                value=""
                class="typeahead_Manager"
                id="businessHead"
                name="businessHead"
                placeholder="Enter Business Head"
                autocomplete="off"
              />
            </div>
          </div>
          <div class="form-check checkboxrow">
            <input
              class="form-check-input"
              type="checkbox"
              id="checkbox3"
              value=""
            />
            <label class="form-check-label" for="auth_required">
              Is authorization required for all requests?
            </label>
          </div>
          <div class="btnwrap">
            <button type="" class="default-btn" onclick="cancel_cmdb();">
              Cancel
            </button>
            <button type="button" class="default-btn" onclick="CheckAppCode();">
              Save
            </button>
            <div class="dropdown navigatebtn updatehead" style={{display: "none"}}>
              <a
                class="dropdown-toggle"
                href="#"
                role="button"
                id="navigateto"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Navigate to
              </a>
              <ul class="dropdown-menu" aria-labelledby="navigateto">
                <li>
                  <a onclick="callOnboarding_code();">Onboarding Tools</a>
                </li>
                <li>
                  <a href="/accessManagement">Access Management</a>
                </li>
              </ul>
            </div>
            <button
              type="submit"
              onclick="callOnboarding_code();"
              class="primary-btn newhead"
            >
              Proceed to Onboard Tools
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(NewApplicationConfig);
