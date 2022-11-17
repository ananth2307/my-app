import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import { useSelector } from "react-redux";
import { get } from "lodash";
const CustomDrilldown = (props) => {
  const commonSliceState = useSelector((state) => state.common);
  const selectedData = get(commonSliceState, "offcanvasState.selectedData", []);
  const { days, codeAnalysisLineData, codeAnalysisViolationsData } =
    selectedData;
  const ref = useRef(null);
  useEffect(() => {
    if (!ref) return;
    const ctx = ref.current.getContext("2d");
    const data = {
      labels: days,
      datasets: [
        {
          label: "No.Of Lines",
          data: codeAnalysisLineData,
          backgroundColor: ["#7bd1dd"],
          borderWidth: 1,
        },
        {
          label: "Violations",
          data: codeAnalysisViolationsData,
          backgroundColor: ["#f95537"],
          borderWidth: 1,
        },
      ],
    };
    const config = {
      type: "bar",
      data: data,
      options: {
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
            },
          },
        },
      },
    };
    const myChart = new Chart(ctx, config);
  }, [ref]);
  return <canvas ref={ref} id="myChart" />;
};
export default CustomDrilldown;
