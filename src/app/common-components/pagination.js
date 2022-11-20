import React from "react";

const Pagination = (props) => {
  const { totalPages, rows, onPageChange } = props;
  return (
    <div className="filternav toolnav">
      <div class="pagecount">
        <label>Go to page</label>
        <a class="pagelink firstpage" value="">
          First
        </a>
        <div class="frmgroup">
          <label>Rows per page</label>
          <div className="dropdown bootstrap-select">
            <select className="selectpicker" id="tableRow_count" title="10">
              <option className="bs-title-option" value=""></option>
              <option value="10">0</option>
              <option value="20">1</option>
              <option value="30">2</option>
              <option value="40">3</option>
              <option value="50">4</option>
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
                <ul className="dropdown-menu inner show" role="presentation">
                  {Array.from(Array(totalPages).keys()).map((m, index) => (
                    <li class="selected">
                      <a
                        role="option"
                        class="dropdown-item active selected"
                        id="bs-select-1-0"
                        tabindex="0"
                        aria-setsize="5"
                        aria-posinset="1"
                        aria-selected="true"
                        onClick={() => onPageChange(index)}
                      >
                        <span class="text">{index+1}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <a class="pagelink lastpage" value="1">
          Last
        </a>
      </div>
    </div>
  );
};

export default Pagination;
