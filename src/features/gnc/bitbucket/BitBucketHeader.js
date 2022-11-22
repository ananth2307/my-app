import { isEmpty } from "lodash";
import React, { memo } from "react";

const BitBucketHeader = (props) => {
  const {
    mostActiveRepoData,
    mostPullRequstData,
    totalCommitData,
    totalCloneData,
    totalPullRequestData,
  } = props.data;
  return (
    <>
      <div
        class="col-lg-2 col-md-2 filtercol"
        style={{ marginRight: "30px", marginLeft: "30px" }}
      >
        <div class="card mb-3" style={{ maxWidth: "18rem" }}>
          <div
            class="card-header text-center"
            style={{ background: "#a6e7ff" }}
          >
            Most Active Repo
          </div>
          <div class="card-body text-center">
            <span id="mostActiveRepo">
              {!isEmpty(mostActiveRepoData?.topRepoCount)
                ? Object.values(mostActiveRepoData?.topRepoCount)[0]
                : 0}
            </span>
          </div>
        </div>
      </div>
      <div class="col-lg-2 col-md-2 filtercol" style={{ marginRight: "30px" }}>
        <div class="card mb-3" style={{ maxWidth: "18rem" }}>
          <div
            class="card-header text-center"
            style={{ background: "#efc5b5" }}
          >
            Most Pull Request
          </div>
          <div class="card-body text-center">
            <span id="mostPullRequest">0</span>
          </div>
        </div>
      </div>
      <div class="col-lg-2 col-md-2 filtercol" style={{ marginRight: "30px" }}>
        <div class="card mb-3" style={{ maxWidth: "18rem" }}>
          <div
            class="card-header text-center"
            style={{ background: "#f2dea4" }}
          >
            Total Commit
          </div>
          <div class="card-body text-center">
            <span id="totalCommit">
              {totalCommitData?.totalCommitCount || 0}
            </span>
          </div>
        </div>
      </div>
      <div class="col-lg-2 col-md-2 filtercol" style={{ marginRight: "30px" }}>
        <div class="card mb-3" style={{ maxWidth: "18rem" }}>
          <div
            class="card-header text-center"
            style={{ background: "#a6fbb2" }}
          >
            Total Clone
          </div>
          <div class="card-body text-center">
            <span id="totalClone">0</span>
          </div>
        </div>
      </div>
      <div class="col-lg-2 col-md-2" style={{ marginRight: "30px" }}>
        <div class="card mb-3" style={{ maxWidth: "18rem" }}>
          <div
            class="card-header text-center"
            style={{ background: "#ffc0cb" }}
          >
            Total Pull Request
          </div>
          <div class="card-body text-center">
            <span id="totalPullRequest">
              {!isEmpty(totalPullRequestData?.totalPullRequestCount)
                ? totalPullRequestData?.totalPullRequestCount[0]?.pullRequest
                : 0}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(BitBucketHeader);
