import React, { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { useSelector } from "react-redux";
import { get } from "lodash";
const CustomDrilldown = (props) => {
  const commonSliceState = useSelector((state) => state.common);
  const selectedData = get(commonSliceState, "offcanvasState.selectedData", []);
  const { days, codeAnalysisLineData, codeAnalysisViolationsData } =
    selectedData;
  const ref = useRef(null);
  const [myChart, setMyChart] = useState(null);
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
    setMyChart(myChart)
  }, [ref]);
  useEffect(() => {
    if (!myChart) return;
    myChart.data.datasets[0].data = codeAnalysisLineData;
    myChart.data.datasets[1].data = codeAnalysisViolationsData;
    myChart.data.labels = days;
    myChart.update();
  }, [codeAnalysisLineData, codeAnalysisViolationsData,days,myChart])
  return <canvas ref={ref} id="myChart"/>;
};
export default CustomDrilldown;
