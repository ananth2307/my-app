import React from "react";

const ProjectCustomDrillDown = ({title}) => {
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
              <select class="selectpicker" id="type" name="type">
                <option value="Code">Code</option>
                <option value="Build">Build</option>
                <option value="Package">Package</option>
                <option value="Deploy">Deploy</option>
                <option value="Database">Database</option>
                <option value="Plan">Plan</option>
                <option value="Scan">Scan</option>
              </select>
              <button
                type="button"
                tabindex="-1"
                class="btn dropdown-toggle btn-light"
                data-bs-toggle="dropdown"
                role="combobox"
                aria-owns="bs-select-3"
                aria-haspopup="listbox"
                aria-expanded="false"
                title="Code"
                data-id="type"
              >
                <div class="filter-option">
                  <div class="filter-option-inner">
                    <div class="filter-option-inner-inner">Code</div>
                  </div>{" "}
                </div>
              </button>
              <div
                class="dropdown-menu "
                style={{maxHeight: "464px", overflow: "hidden", minHeight: "119px"}}
              >
                <div
                  class="inner show"
                  role="listbox"
                  id="bs-select-3"
                  tabindex="-1"
                  aria-activedescendant="bs-select-3-0"
                  style={{maxHeight: "462px", overflowY: "auto", minHeight: "117px"}}
                >
                  <ul
                    class="dropdown-menu inner show"
                    role="presentation"
                    style={{marginTop: "0px", marginBottom: "0px"}}
                  >
                    <li class="selected active">
                      <a
                        role="option"
                        class="dropdown-item active selected"
                        id="bs-select-3-0"
                        tabindex="0"
                        aria-setsize="7"
                        aria-posinset="1"
                        aria-selected="true"
                      >
                        <span class="text">Code</span>
                      </a>
                    </li>
                    <li>
                      <a
                        role="option"
                        class="dropdown-item"
                        id="bs-select-3-1"
                        tabindex="0"
                      >
                        <span class="text">Build</span>
                      </a>
                    </li>
                    <li>
                      <a
                        role="option"
                        class="dropdown-item"
                        id="bs-select-3-2"
                        tabindex="0"
                      >
                        <span class="text">Package</span>
                      </a>
                    </li>
                    <li>
                      <a
                        role="option"
                        class="dropdown-item"
                        id="bs-select-3-3"
                        tabindex="0"
                      >
                        <span class="text">Deploy</span>
                      </a>
                    </li>
                    <li>
                      <a
                        role="option"
                        class="dropdown-item"
                        id="bs-select-3-4"
                        tabindex="0"
                      >
                        <span class="text">Database</span>
                      </a>
                    </li>
                    <li>
                      <a
                        role="option"
                        class="dropdown-item"
                        id="bs-select-3-5"
                        tabindex="0"
                      >
                        <span class="text">Plan</span>
                      </a>
                    </li>
                    <li>
                      <a
                        role="option"
                        class="dropdown-item"
                        id="bs-select-3-6"
                        tabindex="0"
                      >
                        <span class="text">Scan</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="frmgroup default-input col-lg-6">
            <label>Tool Name</label>
            <div class="dropdown bootstrap-select">
              <select class="selectpicker" id="tool" name="tool"></select>
              <button
                type="button"
                tabindex="-1"
                class="btn dropdown-toggle bs-placeholder btn-light"
                data-bs-toggle="dropdown"
                role="combobox"
                aria-owns="bs-select-4"
                aria-haspopup="listbox"
                aria-expanded="false"
                title="Nothing selected"
                data-id="tool"
              >
                <div class="filter-option">
                  <div class="filter-option-inner">
                    <div class="filter-option-inner-inner">
                      Nothing selected
                    </div>
                  </div>{" "}
                </div>
              </button>
              <div
                class="dropdown-menu "
            style={{maxHeight:"389px", overflow: "hidden", minHeight: "0px"}}
              >
                <div
                  class="inner show"
                  role="listbox"
                  id="bs-select-4"
                  tabindex="-1"
                  aria-activedescendant="bs-select-4-0"
                  style={{maxHeight:"387px", overflowY: "auto",minHeight: "0px" }}
                >
                  <ul
                    class="dropdown-menu inner show"
                    role="presentation"
                    style={{marginTop: "0px", marginBottom: "0px"}}
                  ></ul>
                </div>
              </div>
            </div>
          </div>
          <div class="frmgroup validate default-input col-lg-6">
            <div class="frmhead">
              <label>Name</label>
              <div class="error" style={{display: "none"}}></div>
            </div>
            <input
              type=""
              value=""
              id="name"
              name="name"
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
