import { get } from "lodash";
import React, { memo, useState } from "react";
import {
  getPercentage,
  getSelectedOptionsValue,
} from "../../../../app/utilities/helpers";
import ProgressBar from "../../../../app/common-components/ProgressBar";
import { useSelector } from "react-redux";
import { observabilityApi } from "../../../../app/services/observabilityApi";
import DevopsMetricsDrill from "../../../../app/common-components/DevopsMetricsDrill";
import { progressBarData } from "../../../common/constants";

const ActiveSprintPriority = (props) => {
  const [state, setState] = useState({
    open: false,
    drillData: {},
  });
  const { observability } = useSelector((state) => state);
  const [getplanActiveSprintPriorityDrill] =
    observabilityApi.useGetplanActiveSprintPriorityDrillMutation({});
  let activeSprintPriorityData = get(
    props,
    "planData.activeSprintPrioritydata",
    {}
  );

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
      type: "Priority",
    };
    const { data: priorityDrillData } = await getplanActiveSprintPriorityDrill(
      drillPayload
    );
    let popDrillData = {
      label,
      features:
        priorityDrillData.features +
        priorityDrillData.task +
        priorityDrillData.epic +
        priorityDrillData.story,
      defects: priorityDrillData.bug,
      risks: priorityDrillData.risk,
      enablers: priorityDrillData.enablers + priorityDrillData.changeReq,
      debt: priorityDrillData.debt,
      prodFix: priorityDrillData.prodFix,
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

export default memo(ActiveSprintPriority);
