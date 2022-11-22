import { get } from "lodash";
import React, { memo } from "react";

const JobsNodeDetails = (props) => {
  const jobsData = get(props,'jenkinsData.jobNodeData.JobDetaills',{});
  const nodeData = get(props,'jenkinsData.jobNodeData.NodeDetails',{});
  return (
    <>
      <div class="container">
        <div class="row" style={{
          backgroundColor: "#eaeaea",
          padding: "20px"}}>
          <div class="col">No. of Jobs</div>
          <div class="col">
            <button
              type="button"
              class="btn btn-success"
              style={{minWidth:"120px"}}
            >
              Created{" "}
              <span class="badge text-bg-secondary" >
              {jobsData?.Created || 0}
              </span>
            </button>
          </div>
          <div class="col">
            <button
              type="button"
              class="btn btn-warning"
              style={{minWidth:"120px"}}
            >
              Updated{" "}
              <span class="badge text-bg-secondary" >
              {jobsData?.Updated || 0}
              </span>
            </button>
          </div>
          <div class="col">
            <button
              type="button"
              class="btn btn-danger"
              style={{minWidth:"120px"}}
            >
              Deleted{" "}
              <span class="badge text-bg-secondary" >
              {jobsData?.Deleted || 0}
              </span>
            </button>
          </div>
        </div>
      </div>
      <div class="container" style={{marginTop:"20px"}}>
        <div class="row" style={{backgroundColor: "#eaeaea",padding: "20px"}}>
          <div class="col">No. of Nodes</div>
          <div class="col">
            <button
              type="button"
              class="btn btn-success"
              style={{minWidth:"120px"}}
            >
              Created{" "}
              <span class="badge text-bg-secondary" >
              {nodeData?.Created || 0}
              </span>
            </button>
          </div>
          <div class="col">
            <button
              type="button"
              class="btn btn-warning"
              style={{minWidth:"120px"}}
            >
              Updated{" "}
              <span class="badge text-bg-secondary">
              {nodeData?.Updated || 0}
              </span>
            </button>
          </div>
          <div class="col">
            <button
              type="button"
              class="btn btn-danger"
              style={{minWidth:"120px"}}
            >
              Deleted{" "}
              <span class="badge text-bg-secondary">
              {nodeData?.Deleted || 0}
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(JobsNodeDetails);
