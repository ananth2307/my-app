import React from "react";

const TableActions = () => {
    return (
        <div className="filternav toolnav">
        <div className="pagecount">
          <div className="frmgroup">
            <label>Rows per page</label>
            <div className="dropdown bootstrap-select">
              <select className="selectpicker" id="tableRow_count" title="10">
                <option className="bs-title-option" value=""></option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
              </select>
              <button
                type="button"
                tabindex="-1"
                className="btn dropdown-toggle bs-placeholder btn-light"
                data-bs-toggle="dropdown"
                role="combobox"
                aria-owns="bs-select-1"
                aria-haspopup="listbox"
                aria-expanded="false"
                title="10"
                data-id="tableRow_count"
              >
                <div className="filter-option">
                  <div className="filter-option-inner">
                    <div className="filter-option-inner-inner">10</div>
                  </div>{" "}
                </div>
              </button>
              <div className="dropdown-menu ">
                <div
                  className="inner show"
                  role="listbox"
                  id="bs-select-1"
                  tabindex="-1"
                >
                  <ul className="dropdown-menu inner show" role="presentation"></ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default TableActions;