import React, { memo } from "react";

const DevopsMetricsDrill = (props) => {
  return (
    <div class="modal-plan modal-issueMetrics">
      <div class="mod-header row">
        <h4 class="header p-0-10"></h4>
        <div class="close_head">
          <i class="fa fa-close close-btn"></i>
        </div>
      </div>
      <div class="data row col-md-12 common_scroll">
        <ul class="list-group-progress ">
          <li class="list-group">
            Features<span ></span>
          </li>
          <li class="list-group">
            Defects<span ></span>
          </li>
          <li class="list-group">
            Risks<span ></span>
          </li>
          <li class="list-group">
            Enablers<span ></span>
          </li>
          <li class="list-group">
            Debt<span ></span>
          </li>
          <li class="list-group">
            Prod-Fix<span ></span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default memo(DevopsMetricsDrill);
