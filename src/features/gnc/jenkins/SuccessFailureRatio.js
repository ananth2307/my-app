import { get, isEmpty } from "lodash";
import React, { memo } from "react";
import { Bar } from "react-chartjs-2";

const SuccessFailureRatio = (props) => {
  const sucessFailureData = get(props, "jenkinsData.successFailureData", {});
  let width = get(props,"chartContainerRefs.current[3].offsetWidth", 1)
  let successData = 0;
  let failureData = 0;
   !isEmpty(sucessFailureData) &&
    sucessFailureData.map((data) => {
      if (data.hasOwnProperty("success ratio")) successData += data['success ratio'];
    });
    !isEmpty(sucessFailureData) &&
    sucessFailureData.map((data) => {
      if (data.hasOwnProperty("failure ratio")) failureData += data['failure ratio'];
    });
  const  options = {
    indexAxis: 'y',
    plugins: {
        legend: {
            display: false
        }
    },
    scales: {
        x: {
            grid: {
                display: false,
            }
        },
        y: {
            grid: {
                display: false,
            },
            barThickness: 6,
            maxBarThickness: 8,
            barPercentage: 0.5
        }
    }
}
  const data = {
    labels: ["SUCCESS", "FAILURE"],
    datasets: [
      {
        axis: 'y',
        label: 'Jenkins',
        data: [successData,failureData],
        fill: true,
        backgroundColor: ["green","red"],
        borderColor: [
          "green","red"
      ],
      borderWidth: 1
      }
    ],
  };
  return (
    <div
      class="buildtrend"
      style={{ position: "relative", height: "32vh", width: width }}
    >
      <Bar data={data} options={options} />
    </div>
  );
};

export default memo(SuccessFailureRatio);
