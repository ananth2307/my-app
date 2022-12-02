import React, { memo } from "react";
import { BsXLg } from "react-icons/bs";
const DevopsMetricsDrill = ({ className, data, onClose, projectStatus }) => {
  return (
    <div class={`modal-plan ${className}`}>
      <div class="mod-header row">
        <h4 class="header">
        <span class="white"> {data.label}</span></h4>
        <div class="close_head">
          <BsXLg
            className="close-btn"
            onClick={() => {
              onClose();
            }}
          />
        </div>
      </div>
      <div class="data row col-md-12 common_scroll">
        <ul class="list-group-progress ">
          {projectStatus && data.appName.length > 0 ? (
            data.appName.map((appname, index) => (
              <li class="list-groups">{appname}</li>
            ))
          ) : (
            <>
              <li class="list-group">
                Features<span>{data.features}</span>
              </li>
              <li class="list-group">
                Defects<span>{data.defects}</span>
              </li>
              <li class="list-group">
                Risks<span>{data.risks}</span>
              </li>
              <li class="list-group">
                Enablers<span>{data.enablers}</span>
              </li>
              <li class="list-group">
                Debt<span>{data.debt}</span>
              </li>
              <li class="list-group">
                Prod-Fix<span>{data.prodFix}</span>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default memo(DevopsMetricsDrill);
