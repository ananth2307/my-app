import React from "react";

const TableActions = () => {
    return (
        <div class="filternav toolnav">
        <div class="pagecount">
          <div class="frmgroup">
            <label>Rows per page</label>
            <div class="dropdown bootstrap-select">
              <select class="selectpicker" id="tableRow_count" title="10">
                <option class="bs-title-option" value=""></option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
              </select>
              <button
                type="button"
                tabindex="-1"
                class="btn dropdown-toggle bs-placeholder btn-light"
                data-bs-toggle="dropdown"
                role="combobox"
                aria-owns="bs-select-1"
                aria-haspopup="listbox"
                aria-expanded="false"
                title="10"
                data-id="tableRow_count"
              >
                <div class="filter-option">
                  <div class="filter-option-inner">
                    <div class="filter-option-inner-inner">10</div>
                  </div>{" "}
                </div>
              </button>
              <div class="dropdown-menu ">
                <div
                  class="inner show"
                  role="listbox"
                  id="bs-select-1"
                  tabindex="-1"
                >
                  <ul class="dropdown-menu inner show" role="presentation"></ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default TableActions;