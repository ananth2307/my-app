import { get } from "lodash";
import React, { memo } from "react";
import ProgressBar from "../../../../app/common-components/ProgressBar";
import { getPercentage } from "../../../../app/utilities/helpers";

const IssueMetrics = (props) => {
  let activeSprintPriorityData = get(
    props,
    "planData.issueMetricsData",
    {}
  );
  const progressBarData = [
    {
      label: "Blocker",
      value: 0,
      bgColor: "#ff0404",
    },
    {
      label: "Critical",
      value: 0,
      bgColor: "#ff8000",
    },
    {
      label: "High",
      value: 0,
      bgColor: "#ff8373",
    },
    {
      label: "Medium",
      value: 0,
      bgColor: "#e5d349",
    },
    {
      label: "Low",
      value: 0,
      bgColor: "#5eadc3",
    },
  ];
  progressBarData.map((progressData) => {
    Object.keys(activeSprintPriorityData).map((key) => {
      if (progressData.label.toLowerCase() === key.toLowerCase()) {
        progressData.value = getPercentage(
          activeSprintPriorityData[key],
          activeSprintPriorityData.total
        );
      }
    });
  });
  return (
    <div class="col-md-12 p-0 us-propanal pascroll">
    {progressBarData.map((item, idx) => (
      <ProgressBar
        key={idx}
        bgcolor={item.bgColor}
        completed={item.value}
        label={item.label}
      />
    ))}
  </div>
  );
};

export default memo(IssueMetrics);
