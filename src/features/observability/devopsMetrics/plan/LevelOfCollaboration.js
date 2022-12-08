import {  get, isEmpty, last } from "lodash";
import React, { memo } from "react";
import { Line } from "react-chartjs-2";
import { getMonth } from "../../../common/constants";

const LevelOfCollaboration = (props) => {
  let collabData = get(props, "planData.collaborationData", []);
  let Features = [0];
  let Defects = [0];
  let Risks = [0];
  let ProdFix = [0];
  let Enablers = [0];
  let Debt = [0];
  let labels = [];
  const getIntialEndLabel = (dateYear, labelPos) => {
    let splitDate = dateYear.split(" ");
    let Month = getMonth.indexOf(splitDate[0]);
    let Year = splitDate[1];
    if (Month === 0) {
      Month = 11;
      Year = parseInt(Year) - 1;
    } else if (Month === 11) {
      Month = 0;
      Year = parseInt(Year) + 1;
    } else {
      Month =
        labelPos === "start"
          ? parseInt(Month) - 1
          : (Month = parseInt(Month) + 1);
    }
    return getMonth[Month] + " " + Year;
  };
  if (!isEmpty(collabData)) {
    let startLabel = getIntialEndLabel(collabData[0].month, "start");
    let endLabel =
      collabData.length === 1
        ? getIntialEndLabel(collabData[0].month, "end")
        : getIntialEndLabel(last(collabData).month, "end");
    labels.push(startLabel);
    collabData.map((items) => {
      const {
        month,
        epic,
        features,
        task,
        bugs,
        risk,
        changeRequest,
        enablers,
        debt,
        prodFix,
      } = items;
      labels.push(month);
      Features.push(epic + features + task);
      Defects.push(bugs);
      Risks.push(risk);
      Enablers.push(changeRequest + enablers);
      Debt.push(debt);
      ProdFix.push(prodFix);
      console.log(startLabel, endLabel);
    });
    labels.push(endLabel);
    Features.push(0);
    Defects.push(0);
    Risks.push(0);
    Enablers.push(0);
    Debt.push(0);
    ProdFix.push(0);
  }
  const data = {
    labels: labels,
    datasets: [
      {
        data: Features,
        label: "Features",
        borderWidth: 1,
        borderColor: "#147ad6",
        fill: "start",
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 220);
          gradient.addColorStop(0, "rgba(20,122,214, 0.6)");
          gradient.addColorStop(1, "rgba(20, 122, 214, 0.1)");
          return gradient;
        },
        radius: 0,
        tension: 0.3,
        // fill: true,
      },
      {
        data: Defects,
        label: "Defects",
        borderWidth: 1,
        borderColor: "#ff8000",
        fill: "start",
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 220);
          gradient.addColorStop(0, "rgba(255, 128, 0,  0.6)");
          gradient.addColorStop(1, "rgba(255, 128, 0, 0.1)");
          return gradient;
        },
        radius: 0,
        tension: 0.3,
      },
      {
        data: Risks,
        label: "Risks",
        borderWidth: 1,
        borderColor: "#ec6666",
        fill: "start",
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 220);
          gradient.addColorStop(0, "rgba(236, 102, 102, 0.6)");
          gradient.addColorStop(1, "rgba(236, 102, 102, 0.1)");

          return gradient;
        },
        radius: 0,
        tension: 0.3,
      },
      {
        data: Enablers,
        label: "Enablers",
        borderColor: "#af8beb",
        borderWidth: 1,
        fill: "start",
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 220);
          gradient.addColorStop(0, "rgba(175, 139, 235, 0.6)");
          gradient.addColorStop(1, "rgba(175, 139, 235, 0.1)");
          return gradient;
        },
        radius: 0,
        tension: 0.3,
      },
      {
        data: Debt,
        label: "Debt",
        borderWidth: 1,
        borderColor: "#e9d96d",
        fill: "start",
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 220);
          gradient.addColorStop(0, "rgba(233, 217, 109, 0.6)");
          gradient.addColorStop(1, "rgba(233, 217, 109, 0.1)");
          return gradient;
        },
        radius: 0,
        tension: 0.3,
      },
      {
        data: ProdFix,
        label: "Prod-Fix",
        borderColor: "#fcbb4b",
        borderWidth: 1,
        fill: "start",
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 220);
          gradient.addColorStop(0, "rgba(252, 187, 75, 0.6)");
          gradient.addColorStop(1, "rgba(252, 187, 75, 0.1)");
          return gradient;
        },
        radius: 0,
        tension: 0.3,
      },
    ],
  };
  let collaborationOption = {
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

  return <Line data={data} options={collaborationOption} />;
};

export default memo(LevelOfCollaboration);
