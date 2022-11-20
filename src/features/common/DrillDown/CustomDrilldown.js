import React, { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { useSelector } from "react-redux";
import { get } from "lodash";
import { useChartjs } from "../../../hooks/useD3";
const CustomDrilldown = (props) => {
  const commonSliceState = useSelector((state) => state.common);
  const selectedData = get(commonSliceState, "offcanvasState.selectedData", []);
  const { days, codeAnalysisLineData, codeAnalysisViolationsData } =
    selectedData;
    const canvasRef = useRef(null)
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
    useChartjs(canvasRef,config)
  return <canvas ref={canvasRef}/>;
};
export default CustomDrilldown;
