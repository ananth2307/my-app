import { get, isEmpty } from "lodash";
import React, { memo } from "react";
import { Bar } from "react-chartjs-2";

const SprintVelocity = (props) => {
  let tmpSprintVelocity = get(props, "planData.sprintvelocityData", []);
  let labels = []
  let planned = [];
  let plannedCompleted = [];
  let unPlanned = [];
 !isEmpty(tmpSprintVelocity) && tmpSprintVelocity.map(item => {
    labels.push(item.label)
    planned.push(item.planned)
    plannedCompleted.push(item.plannedCompleted+item.unplannedCompleted)
    unPlanned.push(item.unPlanned)
  })
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Planned",
        categoryPercentage: 0.5,
        barPercentage: 0.4,
        data: planned,
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
        data: plannedCompleted,
        backgroundColor: "rgb(22,203,92)",
        hoverBackgroundColor: "rgb(22,203,92)",
        hoverBorderWidth: 2,
        hoverBorderColor: "rgb(22,203,92)",
        stack: "stack 1",
      },
      {
        label: "Unplanned",
        categoryPercentage: 0.5,
        barPercentage: 0.4,
        data:unPlanned,
        backgroundColor: "rgb(221,153,38)",
        hoverBackgroundColor: "rgb(221,153,38)",
        hoverBorderWidth: 2,
        hoverBorderColor: "rgb(221,153,38)",
        stack: "stack 0",
      },
    ],
  };
  const options = {
    responsive: true,
    hover:{
      onHover: function(event, chartElement) {
        event.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
    }
    },
    scales:{
      x:{
        grid:{
          display:false,
          drawTicks:true
        },
      },
      y:{
        grid:{
          display:false,
          drawTicks:true
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        labels:{
          usePointStyle:true
        }
      }
    },
  };
  return <Bar data={data} options={options} />;
};

export default memo(SprintVelocity);
