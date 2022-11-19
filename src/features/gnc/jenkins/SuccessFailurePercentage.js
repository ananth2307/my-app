import { get } from "lodash";
import React, { memo } from "react";
import { Doughnut } from "react-chartjs-2";

const SuccessFailurePercentage = (props) => {
  const sucessFailureData = get(props, "jenkinsData.successFailureData", {});
  let width = get(props,"chartContainerRefs.current[1].offsetWidth", 1)
  console.log(props);
  let successData = 0;
  let failureData = 0;
  sucessFailureData.length > 0 &&
    sucessFailureData.map((data) => {
      if (data.hasOwnProperty("SUCCESS")) successData += data.SUCCESS;
    });
  sucessFailureData.length > 0 &&
    sucessFailureData.map((data) => {
      if (data.hasOwnProperty("FAILURE")) failureData += data.FAILURE;
    });
  let total = successData + failureData;
  const options = {
    cutout:"80%",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
          position: 'top',
      },
      title: {
          display: false
      }
  },
  };
  const data = {
    labels: ["SUCCESS", "FAILURE"],
    datasets: [
      {
        label:'SUCCESS AND FAILURE',
        data: [(successData/total)*100,(failureData/total)*100],
        fill: false,
        backgroundColor: ["green","red"],
      }
    ],
  };
  return (
    <div
      class="buildtrend"
      style={{ position: "relative", height: "32vh", width: width }}
    >
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default memo(SuccessFailurePercentage);
