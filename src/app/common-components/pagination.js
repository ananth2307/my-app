import React, { useState } from "react";

const Pagination = (props) => {
  const { totalPages, onPageChange } = props;
  const [state, setState] = useState({
    page: 0,
  });
  return (
    <div className="filternav toolnav">
      <div className="pagecount">
        <label>Go to page</label>
        <a className="pagelink firstpage" onClick={() => onPageChange(0)}>
          First
        </a>
        <div className="frmgroup">
          <label>Rows per page</label>
          <div className="dropdown bootstrap-select">
            <button
              type="button"
              tabindex="-1"
              className="btn dropdown-toggle bs-placeholder btn-light"
              data-bs-toggle="dropdown"
            >
              <div className="filter-option">
                <div className="filter-option-inner">
                  <div className="filter-option-inner-inner">10</div>
                </div>{" "}
              </div>
            </button>
            <div className="dropdown-menu ">
              <div className="inner show" tabindex="-1">
                <ul className="dropdown-menu inner show">
                  {Array.from(Array(totalPages).keys()).map((m, index) => (
                    <li className="selected">
                      <a
                        className={
                          state.page === index
                            ? "dropdown-item active selected"
                            : "dropdown-item"
                        }
                        tabindex="0"
                        onClick={() => {
                          setState({ ...state, page: index });
                          onPageChange(index);
                        }}
                      >
                        <span className="text">{index + 1}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <a className="pagelink lastpage" onClick={() => onPageChange(totalPages-1)}>
          Last
        </a>
      </div>
    </div>
  );
};

export default Pagination;
