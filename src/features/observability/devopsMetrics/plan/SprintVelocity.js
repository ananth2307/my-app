import { get, isEmpty } from "lodash";
import React, { memo,useState,useRef } from "react";
import { Bar,getElementAtEvent } from "react-chartjs-2";
import {
  getSelectedOptionsValue,
} from "../../../../app/utilities/helpers";
import { useSelector } from "react-redux";
import { observabilityApi } from "../../../../app/services/observabilityApi";
import DevopsMetricsDrill from "../../../../app/common-components/DevopsMetricsDrill";

const SprintVelocity = (props) => {
  let tmpSprintVelocity = get(props, "planData.sprintvelocityData", []);
  const [state, setState] = useState({
    open: false,
    drillData: {},
  });

  const chartRef = useRef();

  let labels = []
  let planned = [];
  let plannedCompleted = [];
  let unPlanned = [];
 !isEmpty(tmpSprintVelocity) && tmpSprintVelocity.map(item => {
    labels.push(item.label)
    planned.push(item.planned)
    plannedCompleted.push(item.plannedCompleted+item.unplannedCompleted)
    unPlanned.push(item.unPlanned)
  })
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Planned",
        categoryPercentage: 0.5,
        barPercentage: 0.4,
        data: planned,
        backgroundColor: "rgb(229,211,73)",
        hoverBackgroundColor: "rgb(229,211,73)",
        hoverBorderWidth: 2,
        hoverBorderColor: "rgb(229,211,73)",
        stack: "stack 0",
      },
      {
        label: "Completed",
        categoryPercentage: 0.5,
        barPercentage: 0.4,
        data: plannedCompleted,
        backgroundColor: "rgb(22,203,92)",
        hoverBackgroundColor: "rgb(22,203,92)",
        hoverBorderWidth: 2,
        hoverBorderColor: "rgb(22,203,92)",
        stack: "stack 1",
      },
      {
        label: "Unplanned",
        categoryPercentage: 0.5,
        barPercentage: 0.4,
        data:unPlanned,
        backgroundColor: "rgb(221,153,38)",
        hoverBackgroundColor: "rgb(221,153,38)",
        hoverBorderWidth: 2,
        hoverBorderColor: "rgb(221,153,38)",
        stack: "stack 0",
      },
    ],
  };
  const options = {
    responsive: true,
    onHover: (event,chartElement) => {
      if(chartElement.length === 1){
         event.native.target.style.cursor = "pointer"
      }
     },
    scales:{
      x:{
        grid:{
          display:false,
          drawTicks:true
        },
      },
      y:{
        grid:{
          display:false,
          drawTicks:true
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        labels:{
          usePointStyle:true
        }
      }
    },
  };


  const { observability } = useSelector((state) => state);

  const [getSprintVelocityDrill] =
    observabilityApi.useGetSprintVelocityDrillMutation({});
  const onClose = () => {
    setState((state) => ({
      ...state,
      open: !state.open,
    }));
  };
  const planDrill = async (element) => {
    if (!element.length) return;

    const {datasetIndex } = element[0];
    let label =data.datasets[datasetIndex].label;
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
      type: "sprint_velocity",
    };
    const { data: sprintVelocityData } = await getSprintVelocityDrill(
      drillPayload
    );
    let popDrillData = {
      label,
      features:
        sprintVelocityData.features +
        sprintVelocityData.task +
        sprintVelocityData.epic +
        sprintVelocityData.story,
      defects: sprintVelocityData.bug,
      risks: sprintVelocityData.risk,
      enablers:
        sprintVelocityData.enablers + sprintVelocityData.changeReq,
      debt: sprintVelocityData.debt,
      prodFix: sprintVelocityData.prodFix,
    };
    setState((state) => ({
      ...state,
      drillData: popDrillData,
      open: true,
    }));
  };
  const onClick = (event) => {
    const { current: chart } = chartRef;
    if (!chart) {
      return;
    }
    planDrill(getElementAtEvent(chart, event));
  };

  return (
    <>
  <Bar ref={chartRef} data={data} options={options} onClick={onClick}/>
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

export default memo(SprintVelocity);
