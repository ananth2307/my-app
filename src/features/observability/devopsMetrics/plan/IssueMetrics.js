import React, { memo } from "react";

const IssueMetrics = (props) => {
  return (
    <div id="priority" class="col-md-12 p-0 us-propanal pascroll">
      <span class="progress-name">Blocker</span>
      <span class="pull-right progress-name" id="uspBlocker">
        0 %
      </span>
      <div class="progress us-progress" value="Blocker">
        <div
          class="progress-bar"
          id="us-scale-3"
          data-toggle="tooltip"
          title="4"
          style={{width:'90%'}}
          role="progressbar"
          aria-valuenow="0"
          aria-valuemin="0"
          aria-valuemax="100"
          data-original-title=""
        ></div>
      </div>
      <span class="progress-name">Critical</span>
      <span class="pull-right progress-name" id="uspCritical">
        0 %
      </span>
      <div class="progress us-progress" value="Critical">
        <div
          class="progress-bar"
          id="us-scale-1"
          data-toggle="tooltip"
          title=""
          role="progressbar"
          aria-valuenow="0"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
      <span class="progress-name">High</span>
      <span class="pull-right progress-name" id="uspHigh">
        0 %
      </span>
      <div class="progress us-progress" value="High">
        <div
          class="progress-bar"
          id="us-scale-4"
          data-toggle="tooltip"
          title=""
          role="progressbar"
          aria-valuenow="0"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
      <span class="progress-name">Medium</span>
      <span class="pull-right progress-name" id="uspMedium">
        0 %
      </span>
      <div class="progress us-progress" value="Medium">
        <div
          class="progress-bar"
          id="us-scale-2"
          data-toggle="tooltip"
          title="89"
          role="progressbar"
          style={{width:'54%'}}
          aria-valuenow="0"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
      <span class="progress-name">Low</span>
      <span class="pull-right progress-name" id="uspLow">
        0 %
      </span>
      <div class="progress us-progress" value="Low">
        <div
          class="progress-bar"
          id="us-scale-5"
          data-toggle="tooltip"
          title=""
          role="progressbar"
          aria-valuenow="0"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </div>
  );
};

export default memo(IssueMetrics);
