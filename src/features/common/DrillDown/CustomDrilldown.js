import React from "react";
import { useSelector } from "react-redux";
import { get } from "lodash";
import { Bar } from "react-chartjs-2";
import { ChartLineColor1 } from "../constants";
const CustomDrilldown = (props) => {
  const commonSliceState = useSelector((state) => state.common);
  const selectedData = get(commonSliceState, "offcanvasState.selectedData", []);
  const { days, codeAnalysisLineData, codeAnalysisViolationsData } =
    selectedData;
  const data = {
    labels: days,
    datasets: [
      {
        label: "No.Of Lines",
        data: codeAnalysisLineData,
        backgroundColor: [ChartLineColor1],
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
  const options = {
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
  };
  return <Bar data={data} options={options} />;
};
export default CustomDrilldown;
