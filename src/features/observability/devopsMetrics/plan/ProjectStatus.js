import { get } from "lodash";
import React, { memo, useState, useRef } from "react";
import { Doughnut, getElementAtEvent } from "react-chartjs-2";
import { getSelectedOptionsValue } from "../../../../app/utilities/helpers";
import { useSelector } from "react-redux";
import { observabilityApi } from "../../../../app/services/observabilityApi";
import DevopsMetricsDrill from "../../../../app/common-components/DevopsMetricsDrill";

const ProjectStatus = (props) => {
  let projectMetrics = get(props, "planData.projectStatusData", {});

  const [state, setState] = useState({
    open: false,
    drillData: {},
  });
  const chartRef = useRef();
  const { observability } = useSelector((state) => state);

  const [getProjectStatusDrill] =
    observabilityApi.useGetProjectStatusDrillMutation({});
  const onClose = () => {
    setState((state) => ({
      ...state,
      open: !state.open,
    }));
  };
  const planDrill = async (element) => {
    if (!element.length) return;

    const { index } = element[0];
    let label = data.labels[index];
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
      type: "Status",
    };
    const { data: projectStatusData } = await getProjectStatusDrill(
      drillPayload
    );
    let popDrillData = {
      label,
      appName:projectStatusData.appName
    };
    setState((state) => ({
      ...state,
      drillData: popDrillData,
      open: true,
    }));
  };

  const data = {
    labels: ["Delayed", "Warning", "On-Track", "Ahead"],
    datasets: [
      {
        backgroundColor: ["#f7351c", "#ff8373", "#ffda83", "#55d8fe"],
        borderColor: "transparent",
        data: [
          projectMetrics.delayed,
          projectMetrics.warning,
          projectMetrics.onTrack,
          projectMetrics.ahead,
        ],
      },
    ],
  };
  data.datasets[0].centerValue = projectMetrics.projects || 0;
  const drawInnerText = (chart) => {
    let ctx = chart.ctx;
    let { centerValue } = chart.config._config.data.datasets[0];
    ctx.restore();
    ctx.font = 15 + "Avenir";
    ctx.textBaseline = "middle";
    let text = `${centerValue} Project`;
    let textX = Math.round((chart.width - ctx.measureText(text).width) / 2);
    let textY = chart.height / 2 + chart.legend.height / 2;
    ctx.fillText(text, textX, textY);
    ctx.save();
  };
  const options = {
    responsive: true,
    onHover: (event,chartElement) => {
      if(chartElement.length === 1){
         event.native.target.style.cursor = "pointer"
      }
     },
    hover: {
      mode: 'nearest',
      intersect: false
      },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label;
            let currentValue = context.parsed;
            let total = context.dataset.data.reduce(
              (acc, current) => acc + current,
              0
            );
            let percentage = Math.floor((currentValue / total) * 100 + 0.5);
            if (label) {
              label = label + ": " + percentage + "%";
            }
            return label;
          },
        },
      },
    },
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
      <Doughnut
      ref={chartRef}
        data={data}
        options={options}
        onClick={onClick}
        plugins={[
          {
            beforeDraw: function (chart) {
              drawInnerText(chart);
            },
          },
        ]}
      />
      {state.open && (
        <DevopsMetricsDrill
          className={"modal-plan.modal-priority"}
          data={state.drillData}
          onClose={onClose}
          projectStatus={true}
        />
      )}
    </>
  );
};

export default memo(ProjectStatus);
