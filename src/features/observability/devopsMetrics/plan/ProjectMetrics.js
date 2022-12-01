import { get } from "lodash";
import React, { memo } from "react";
import { Doughnut } from "react-chartjs-2";

const ProjectMetrics = (props) => {
  let ProgressMetrics = get(props, "planData.projectMetricsData", {});
  let width = get(props, "chartContainerRefs.current[1].offsetWidth", 0);
  const data = {
    labels: ["Features", "Defects", "Risks", "Enablers", "Debt", "Prod-Fix"],
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
          ProgressMetrics.features,
          ProgressMetrics.issues,
          ProgressMetrics.risk,
          ProgressMetrics.enablers,
          ProgressMetrics.debt,
          ProgressMetrics.prodFix,
        ],
      },
    ],
  };
  data.datasets[0].centerValue = ProgressMetrics.members || 0;
  const drawInnerText = (chart) => {
    let ctx = chart.ctx;
    let { centerValue } = chart.config._config.data.datasets[0];
    ctx.restore();
    ctx.font = 15 + "Avenir";
    ctx.textBaseline = "middle";
    let text = `${centerValue} Members`;
    let textX = Math.round((chart.width - ctx.measureText(text).width) / 2);
    let textY = chart.height / 2 + chart.legend.height / 2;
    ctx.fillText(text, textX, textY);
    ctx.save();
  };
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
  );
};

export default memo(ProjectMetrics);
