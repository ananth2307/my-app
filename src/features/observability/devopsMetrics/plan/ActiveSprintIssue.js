import { get } from "lodash";
import React, { memo } from "react";
import { Doughnut } from "react-chartjs-2";

const ActiveSprintIssue = (props) => {
  let activeSprintTmpData = get(props, "planData.activeSprintIssueData", {});
  let width = get(props, "chartContainerRefs.current[1].offsetWidth", 0);
  const data = {
    labels: ["Features", "Defects", "Risks", "Enablers", "Debt", "ProdFix"],
    datasets: [
      {
        borderColor: "#393b45",
        borderWidth: 1,
        weight: 0.5,
        backgroundColor: [
          "#147ad6",
          "#ff8000",
          "#ec6666",
          "#af8beb",
          "#e9d96d",
          "#fcbb4b",
        ],
        data: [
          activeSprintTmpData.features,
          activeSprintTmpData.issues,
          activeSprintTmpData.risk,
          activeSprintTmpData.enablers,
          activeSprintTmpData.debt,
          activeSprintTmpData.prodFix
        ],
      },
    ],
  };
  const drawInnerText = (chart) => {
    let ctx = chart.ctx;
    let { centerValue } = chart.config._config.data.datasets[0];
    ctx.restore();
    ctx.font = 15 + "Avenir";
    ctx.textBaseline = "middle";
    let text = `${centerValue} Projects`;
    let textX = Math.round((chart.width - ctx.measureText(text).width) / 2);
    let textY = chart.height / 2 + chart.legend.height / 2;
    ctx.fillText(text, textX, textY);
    ctx.save();
  };
  data.datasets[0].centerValue = activeSprintTmpData.projects || 0;
  const options = {
    responsive: true,
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
  return (
    <>
      <Doughnut
        data={data}
        options={options}
        plugins={[
          {
            beforeDraw: function (chart) {
              drawInnerText(chart);
            },
          },
        ]}
      />
    </>
  );
};

export default memo(ActiveSprintIssue);
