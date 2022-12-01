import { get } from "lodash";
import React, { memo } from "react";
import { getPercentage, getSelectedOptionsValue } from "../../../../app/utilities/helpers";
import ProgressBar from "../../../../app/common-components/ProgressBar";
import { useSelector } from "react-redux";
import { observabilityApi } from "../../../../app/services/observabilityApi";

const ActiveSprintPriority = (props) => {
  const { observability } = useSelector((state) => state);
  const [getplanIssueMetricsDrill] = observabilityApi.useGetplanIssueMetricsDrillMutation({})
  let activeSprintPriorityData = get(
    props,
    "planData.activeSprintPrioritydata",
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
  const planDrill = async (label) => {
    const drillPayload = {
      appCodes:  getSelectedOptionsValue(
          get(observability, "filterData.selectedApplications", [])
        ),
    projects: getSelectedOptionsValue(
      get(observability, "filterData.selectedProjects", [])
    ),
    sprintName: getSelectedOptionsValue(
      get(observability, "filterData.selectedSprints", [])
    ),
    startDt:get(observability, "filterData.selectedDate.startDate"),
    toDt:  get(observability, "filterData.selectedDate.endDate"),
    progressType:label,
    type:"Metrics"
    }
    const issueMetricsDrillData = await getplanIssueMetricsDrill(drillPayload)
    console.log(issueMetricsDrillData)
  }
  return (
    <div class="col-md-12 p-0 us-propanal pascroll">
      {progressBarData.map((item, idx) => (
        <ProgressBar
          key={idx}
          bgcolor={item.bgColor}
          completed={item.value}
          label={item.label}
          onClick={planDrill}
        />
      ))}
    </div>
  );
};

export default memo(ActiveSprintPriority);
