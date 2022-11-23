import React, { memo, useRef } from "react";
import { Line } from "react-chartjs-2";

const LevelOfCollaboration = (props) => {

  let cFeatures = [0, 10, 20, 30, 40, 30, 20, 10];
  let cDefects = [10, 30, 50, 110, 50, 30, 40, 50];
  let cRisks = [40, 50, 60, 30, 20, 10, 50, 20];
  let cEnablers = [30, 20, 10, 40, 20, 40, 50, 60];
  let cDebt = [30, 20, 40, 0, 40, 20, 10, 0];
  let cProdFix = [50, 50, 40, 60, 0, 30, 30, 20];

  // let gradientFeatures = collaborationCTX.createLinearGradient(0, 0, 0, 220);
  // gradientFeatures.addColorStop(0, "rgba(20,122,214, 0.6)");
  // gradientFeatures.addColorStop(1, "rgba(20, 122, 214, 0.1)");

  // let gradientDefects = collaborationCTX.createLinearGradient(0, 0, 0, 220);
  // gradientDefects.addColorStop(0, "rgba(255, 128, 0,  0.6)");
  // gradientDefects.addColorStop(1, "rgba(255, 128, 0, 0.1)");

  // let gradientRisks = collaborationCTX.createLinearGradient(0, 0, 0, 220);
  // gradientRisks.addColorStop(0, "rgba(236, 102, 102, 0.6)");
  // gradientRisks.addColorStop(1, "rgba(236, 102, 102, 0.1)");

  // let gradientEnablers = collaborationCTX.createLinearGradient(0, 0, 0, 220);
  // gradientEnablers.addColorStop(0, "rgba(175, 139, 235, 0.6)");
  // gradientEnablers.addColorStop(1, "rgba(175, 139, 235, 0.1)");

  // let gradientDebt = collaborationCTX.createLinearGradient(0, 0, 0, 220);
  // gradientDebt.addColorStop(0, "rgba(233, 217, 109, 0.6)");
  // gradientDebt.addColorStop(1, "rgba(233, 217, 109, 0.1)");

  // let gradientProdFix = collaborationCTX.createLinearGradient(0, 0, 0, 220);
  // gradientProdFix.addColorStop(0, "rgba(252, 187, 75, 0.6)");
  // gradientProdFix.addColorStop(1, "rgba(252, 187, 75, 0.1)");
  const data = {
    labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug"],
    datasets: [
      {
        data: cFeatures,
        label: "Features",
        borderWidth: 1,
        borderColor: "#147ad6",
        // backgroundColor: 'red',
        // fill: true,
      },
      {
        data: cDefects,
        label: "Defects",
        borderWidth: 1,
        borderColor: "#ff8000",
        // backgroundColor: 'blue',
        // fill: true,
      },
      {
        data: cRisks,
        label: "Risks",
        borderWidth: 1,
        borderColor: "#ec6666",
        // backgroundColor: "yellow",
        // fill: true,
      },
      {
        data: cEnablers,
        label: "Enablers",
        borderColor: "#af8beb",
        borderWidth: 1,
        // backgroundColor: "orange",
        // fill: true,
      },
      {
        data: cDebt,
        label: "Debt",
        borderWidth: 1,
        borderColor: "#e9d96d",
        // backgroundColor: 'purple',
        // fill: true,
      },
      {
        data: cProdFix,
        label: "Prod-Fix",
        borderColor: "#fcbb4b",
        borderWidth: 1,
        // backgroundColor: 'pink',
        // fill: true,
      },
    ],
  };
  let collaborationOption = {
    elements: {
        point:{
            radius: 0
        }
    },
    scales: {
        xAxes: [{
            gridLines: {
                color: '#373941', //'rgb(99 97 97)',
                beginAtZero: false,
                drawOnChartArea: false,
                lineWidth: 1
            },
            ticks: {
                display:true,
                fontColor:'#030303'
            }
        }],
        yAxes: [{
            gridLines: {
                display:true,
                drawBorder: true,
                drawOnChartArea: false,
                borderColor: "#373941",
                color: "#373941", //'rgba(99,97,97,1)',
                lineWidth: 1
            },
            ticks: {
                display:true,
                suggestedMin: 0,
                fontColor: '#030303'
            }
        }]
    },
    legend: {
        display: true,
        position:"top",
        labels: {
            usePointStyle:true,
            fontColor:'#030303',
            fontSize:12
        }
    },
    tooltips: {
        mode: 'index',
        intersect: false,
    }
}

  return <Line data={data} options={collaborationOption}/>;
};

export default memo(LevelOfCollaboration);
