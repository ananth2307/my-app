import React, { memo } from "react";
import { Bar } from "react-chartjs-2";

const SprintVelocity = (props) => {
  var plannedDS = [10, 20,];
  var completed = [10, 40,];
  var unPlanedDS = [0, 0, 0, 0, 0];
  var numberWithCommas = function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
  const data = {
    labels: ["WEEK 1", "WEEK 2"],
    datasets: [
      {
        label: "Planned",
        categoryPercentage: 0.5,
        barPercentage: 0.4,
        data: plannedDS,
        backgroundColor: "rgb(229,211,73)",
        hoverBackgroundColor: "rgb(229,211,73)",
        hoverBorderWidth: 2,
        hoverBorderColor: "rgb(229,211,73)",
        stack: "stack 0",
      },
      {
        label: "Completed",
        categoryPercentage: 0.5,
        barPercentage: 0.4,
        data: completed,
        backgroundColor: "rgb(11,152,65)",
        hoverBackgroundColor: "rgb(11,152,65)",
        hoverBorderWidth: 2,
        hoverBorderColor: "rgb(11,152,65)",
        stack: "stack 1",
      },
    ],
  };
  let svOption = {
    animation: {
        duration: 10,
    },
    hover: {
      onHover: function(event, chartElement) {
            event.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
        }
    },
    scales: {
        xAxes: [{
            stacked: true,
            gridLines: {
                display: false,
                beginAtZero: true,
                drawOnChartArea: false,
                color: '#373941',
                lineWidth: 1
            },
            ticks: {
                fontColor: '#030303',
                fontSize:12
            }
        }],

        yAxes: [{
            stacked: true,
            gridLines: {
                display:false,
                drawOnChartArea: false,
                color: '#373941',
                lineWidth: 1
            },
            ticks: {
                fontColor: '#030303',
                suggestedMin: 0,
                suggestedMax: 10,
                autoSkip: true,
                callback: function(value) { return numberWithCommas(value); }
            }
        }],
    }, 
    legend: {
        display: true,
        position:"top",
        labels: {
            usePointStyle:true, //remove this to show rectangle box
            fontColor:'#030303',
            fontSize:12,
            //boxWidth: 18
        }
    }
}
  return <Bar data={data} options={svOption} />;
};

export default memo(SprintVelocity);
