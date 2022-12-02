import { get } from "lodash";
import React, { memo, useState } from "react";
import ProgressBar from "../../../../app/common-components/ProgressBar";
import {
  getPercentage,
  getSelectedOptionsValue,
} from "../../../../app/utilities/helpers";
import { progressBarData } from "../../../common/constants";
import { useSelector } from "react-redux";
import { observabilityApi } from "../../../../app/services/observabilityApi";
import DevopsMetricsDrill from "../../../../app/common-components/DevopsMetricsDrill";

const IssueMetrics = (props) => {
  let activeSprintPriorityData = get(props, "planData.issueMetricsData", {});
  const [state, setState] = useState({
    open: false,
    drillData: {},
  });
  const { observability } = useSelector((state) => state);
  const [getplanIssueMetricsDrill] =
    observabilityApi.useGetplanIssueMetricsDrillMutation({});
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
  const onClose = () => {
    setState((state) => ({
      ...state,
      open: !state.open,
    }));
  };
  const planDrill = async (label) => {
    const drillPayload = {
      appCodes: getSelectedOptionsValue(
        get(observability, "filterData.selectedApplications", [])
      ),
      projects: getSelectedOptionsValue(
        get(observability, "filterData.selectedProjects", [])
      ),
      sprintName: getSelectedOptionsValue(
        get(observability, "filterData.selectedSprints", [])
      ),
      // startDt:get(observability, "filterData.selectedDate.startDate"),
      // toDt:  get(observability, "filterData.selectedDate.endDate"),
      startDt: 1668764376028,
      toDt: 1669973976030,
      progressType: label,
      type: "Metrics",
    };
    const { data: issueMetricsDrillData } = await getplanIssueMetricsDrill(
      drillPayload
    );
    let popDrillData = {
      label,
      features:
        issueMetricsDrillData.features +
        issueMetricsDrillData.task +
        issueMetricsDrillData.epic +
        issueMetricsDrillData.story,
      defects: issueMetricsDrillData.bug,
      risks: issueMetricsDrillData.risk,
      enablers:
        issueMetricsDrillData.enablers + issueMetricsDrillData.changeReq,
      debt: issueMetricsDrillData.debt,
      prodFix: issueMetricsDrillData.prodFix,
    };
    setState((state) => ({
      ...state,
      drillData: popDrillData,
      open: true,
    }));
  };
  return (
    <>
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
      {state.open && (
        <DevopsMetricsDrill
          className={"modal-plan.modal-priority"}
          data={state.drillData}
          onClose={onClose}
        />
      )}
    </>
  );
};

export default memo(IssueMetrics);
