import { get, isEmpty } from "lodash";
import React, { memo } from "react";
import { Bar } from "react-chartjs-2";

const CodeAnalysis = (props) => {
  const codeAnalysisData = get(props, "scanData.codeAnalysisData", []);
  let label = [];
  let linesArr = [];
  let violationsArr = [];
  !isEmpty(codeAnalysisData) &&
    codeAnalysisData.map((data) => {
      const { date, lines, violations } = data;
      label.push(date);
      linesArr.push(lines);
      violationsArr.push(violations);
    });
  const data = {
    labels: label,
    datasets: [
      {
        label: "Total Lines",
        data: linesArr,
        backgroundColor: "rgb(94,173,195)",
        order: 0,
        fill: true,
        borderRadius: 10,
        barPercentage: 0.5,
        categoryPercentage: 0.4,
      },
      {
        label: "Violations",
        data: violationsArr,
        borderColor: "#ff0404",
        borderWidth: 1,
        fill: "start",
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 150, 0, 250);
          gradient.addColorStop(0, "rgba(255,4,4,1)");
          gradient.addColorStop(1, "rgba(255,255,255,1)");
          return gradient;
        },
        radius: 0,
        tension: 0.3,
        type: "line",
        order: 1,
      },
    ],
  };
  let option = {
    maintainAspectRatio: false,
    responsive: true,
    interaction: {
      intersect: false,
      mode: "index",
    },
    scales: {
      x: {
        grid: {
          color: "#373941", //'rgb(99 97 97)',
          beginAtZero: false,
          drawOnChartArea: false,
          lineWidth: 1,
        },
        ticks: {
          display: true,
          fontColor: "#030303",
        },
      },
      y: {
        grid: {
          display: true,
          drawBorder: true,
          drawOnChartArea: false,
          borderColor: "#373941",
          color: "#373941", //'rgba(99,97,97,1)',
          lineWidth: 1,
        },
        ticks: {
          display: true,
          suggestedMin: 0,
          fontColor: "#030303",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          usePointStyle: true,
          fontColor: "#030303",
          fontSize: 12,
        },
      },
    },
  };

  return <Bar data={data} options={option} />;
};

export default memo(CodeAnalysis);
