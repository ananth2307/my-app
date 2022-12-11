import React from "react";

const TableActions = (props) => {
  const { onGetLimit, limit:currentLimit } = props;
  return (
    <div className="filternav toolnav">
      <div className="pagecount">
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
                  <div className="filter-option-inner-inner">{currentLimit}</div>
                </div>{" "}
              </div>
            </button>
            <div className="dropdown-menu ">
              <div className="inner show" tabindex="-1">
                <ul className="dropdown-menu inner show">
                  {[10, 20, 30, 40, 50].map((limit, index) => (
                    <li className="selected active">
                      <a
                        className={
                          currentLimit === limit
                            ? "dropdown-item active selected"
                            : "dropdown-item"
                        }
                        tabindex="0"
                        onClick={() => onGetLimit(parseInt(limit))}
                      >
                        <span className="text">{limit}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableActions;
