import React, { memo } from "react";
import { Doughnut } from "react-chartjs-2";

const ProjectStatus = (props) => {
  const data = {
    labels: ["Delayed", "Warning", "On-Track", "Ahead"],
    datasets: [
      {
        backgroundColor: ["#f7351c", "#ff8373", "#ffda83", "#55d8fe"],
        borderColor: "transparent",
        data: [10, 32, 34,37],
      },
    ],
  };
  return <Doughnut data={data}/>;
};

export default memo(ProjectStatus);
