import { get } from "lodash";
import React, { memo } from "react";
import { Doughnut } from "react-chartjs-2";

const ActiveSprintProgress = (props) => {
  let activeSprinttmpProgressData = get(
    props,
    "planData.activeSprintProgressData",
    {}
  );
  let activeSprintProgressData = [
    activeSprinttmpProgressData.inDefined,
    activeSprinttmpProgressData.inDev,
    activeSprinttmpProgressData.inTest,
    activeSprinttmpProgressData.completed,
  ];
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
  data.datasets[0].centerValue = activeSprinttmpProgressData.totStory || 0;
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

export default memo(ActiveSprintProgress);
