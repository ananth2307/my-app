import { get } from "lodash";
import React, { memo } from "react";
import { Doughnut } from "react-chartjs-2";

const ProjectStatus = (props) => {
  let projectMetrics = get(props, "planData.projectStatusData", {});
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

export default memo(ProjectStatus);
