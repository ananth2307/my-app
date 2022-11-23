import React, { memo } from "react";
import { Doughnut } from "react-chartjs-2";

const ActiveSprintProgress = (props) => {
  const data = {
    labels: ["In-Define", "In-Dev", "In-Test", "Done"],
    datasets: [
      {
        borderColor: "#393b45",
        borderWidth: 1,
        weight: 0.5,
        backgroundColor: ["#55d8fe", "#ff8373", "#ffda83", "#5ee2a0"],
        /*borderColor:"transparent",*/ data: [5, 6, 34, 25],
      },
    ],
  };
  return (
    <>
      <Doughnut data={data} />
      {/* <div class="ps-legend">
        <div class="row mb-10">
          <div class="b-ring legend-ring"></div>
          <div class="legend-text">In-Define</div>
          <span class="legend-val" id="usInDefine">
            20
          </span>
        </div>
        <div class="row mb-10">
          <div class="p-ring legend-ring"></div>
          <div class="legend-text">In-Dev</div>
          <span class="legend-val" id="usInDev">
            18
          </span>
        </div>
        <div class="row mb-10">
          <div class="y-ring legend-ring"></div>
          <div class="legend-text">In-Test</div>
          <span class="legend-val" id="usInTest">
            12
          </span>
        </div>
        <div class="row mb-10">
          <div class="bb-ring legend-ring"></div>
          <div class="legend-text">Done</div>
          <span class="legend-val" id="completed">
            53
          </span>
        </div>
      </div> */}
    </>
  );
};

export default memo(ActiveSprintProgress);
