import { get } from "lodash";
import React, { memo, useState, useRef } from "react";
import { Doughnut, getElementAtEvent } from "react-chartjs-2";
import {
  getSelectedOptionsValue,
} from "../../../../app/utilities/helpers";
import { useSelector } from "react-redux";
import { observabilityApi } from "../../../../app/services/observabilityApi";
import DevopsMetricsDrill from "../../../../app/common-components/DevopsMetricsDrill";

const ActiveSprintProgress = (props) => {
  const [state, setState] = useState({
    open: false,
    drillData: {},
  });
  const chartRef = useRef();

  let activeSprinttmpProgressData = get(
    props,
    "planData.activeSprintProgressData",
    {}
  );
  const { observability } = useSelector((state) => state);

  const [getActiveSprintProgressDrill] =
    observabilityApi.useGetActiveSprintProgressDrillMutation({});
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
      type: "Progress",
    };
    const { data: activeProgressData } = await getActiveSprintProgressDrill(
      drillPayload
    );
    let popDrillData = {
      label,
      features:
        activeProgressData.features +
        activeProgressData.task +
        activeProgressData.epic +
        activeProgressData.story,
      defects: activeProgressData.bug,
      risks: activeProgressData.risk,
      enablers:
        activeProgressData.enablers + activeProgressData.changeReq,
      debt: activeProgressData.debt,
      prodFix: activeProgressData.prodFix,
    };
    setState((state) => ({
      ...state,
      drillData: popDrillData,
      open: true,
    }));
  };

  const activeSprintProgressData = [
    activeSprinttmpProgressData.inDefined,
    activeSprinttmpProgressData.inDev,
    activeSprinttmpProgressData.inTest,
    activeSprinttmpProgressData.completed,
  ];
  const options = {
    responsive: true,
    interaction: {
      mode: "point",
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
  const drawInnerText = (chart) => {
    let ctx = chart.ctx;
    let { centerValue } = chart.config._config.data.datasets[0];
    ctx.restore();
    ctx.font = 15 + "Avenir";
    ctx.textBaseline = "middle";
    let text = `${centerValue} Issues`;
    let textX = Math.round((chart.width - ctx.measureText(text).width) / 2);
    let textY = chart.height / 2 + chart.legend.height / 2;
    ctx.fillText(text, textX, textY);
    ctx.save();
  };

  const data = {
    labels: ["In-Define", "In-Dev", "In-Test", "Done"],
    datasets: [
      {
        borderColor: "#393b45",
        borderWidth: 1,
        weight: 0.5,
        backgroundColor: ["#55d8fe", "#ff8373", "#ffda83", "#5ee2a0"],
        data: activeSprintProgressData,
      },
    ],
  };
  const onClick = (event) => {
    const { current: chart } = chartRef;
    if (!chart) {
      return;
    }
    planDrill(getElementAtEvent(chart, event));
  };
  data.datasets[0].centerValue = activeSprinttmpProgressData.totStory || 0;
  return (
    <>
      <Doughnut
        ref={chartRef}
        data={data}
        options={options}
        plugins={[
          {
            beforeDraw: function (chart) {
              drawInnerText(chart);
            },
          },
        ]}
        onClick={onClick}
      />
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

export default memo(ActiveSprintProgress);
