import React, { memo } from "react";

const FilterModal = () => {
  return (
    <div class="modal-body">
      <h4 class="sectitle">Filters</h4>
      <div class="fltrwrap" id="filterForm">
        <div class="fltrcol">
          <label class="selectlabel">Application Details</label>
          <div class="frmgroup">
            <input
              type="text"
              class="typeahead_App"
              id="appcodeFil"
              placeholder="Enter Application Code"
            />
          </div>
          <div class="frmgroup">
            <input
              type="text"
              class="typeahead_App"
              id="appNameFil"
              placeholder="Enter Application Name"
            />
          </div>
        </div>
        <div class="fltrcol">
          <label class="selectlabel">Manager Details</label>
          <div class="frmgroup">
            <input
              type="text"
              class="typeahead_Manager"
              id="primarymanagerFil"
              placeholder="Enter Primary Manager"
            />
          </div>
          <div class="frmgroup">
            <input
              type="text"
              class="typeahead_Manager"
              id="secondarymanagerFil"
              placeholder="Enter Secondary Manager"
            />
          </div>
        </div>
        <div class="fltrcol">
          <label class="selectlabel">Group Details</label>
          <div class="frmgroup">
            <input
              type="text"
              id="businessunitFil"
              placeholder="Enter Business Unit"
            />
          </div>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id="checkbox2"
            value="Is authorization required for all requests?"
          />
          <label class="form-check-label" for="auth_required">
            Is authorization required for all requests?
          </label>
        </div>
      </div>
      <div class="btnwrap">
        <button
          data-bs-dismiss="modal"
          aria-label="Close"
          onclick="filterReset();"
          class="default-btn"
        >
          Clear
        </button>
        <button
          data-bs-dismiss="modal"
          aria-label="Close"
          onclick="callfillter();"
          class="primary-btn"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default memo(FilterModal);
