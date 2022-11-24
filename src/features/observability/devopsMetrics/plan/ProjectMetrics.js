import { get } from "lodash";
import React, { memo } from "react";
import { Doughnut } from "react-chartjs-2";

const ProjectMetrics = (props) => {
  let width = get(props, "chartContainerRefs.current[1].offsetWidth", 0);
  const data = {
    labels: ["Features", "Defects", "Risks", "Enablers", "Debt", "Prod-Fix"],
    datasets: [
      {
        borderColor: "#393b45",
        borderWidth: 1,
        weight: 0.5,
        backgroundColor: [
          "#147ad6",
          "#ff8000",
          "#ec6666",
          "#af8beb",
          "#e9d96d",
          "#fcbb4b",
        ],
        data: [10, 20, 30, 40, 50, 60],
      },
    ],
  };
  const options = {
    title:{
        display:true,
        text:'Chart.js Line Chart - Custom Tooltips'
    },
    tooltips: {
        enabled: true,
        mode: 'index',
        position: 'nearest',
        //Set the name of the custom function here
        title: function (tooltipItem, data) {
          //get the concerned dataset
          let dataset = data.datasets[tooltipItem.datasetIndex];
          //calculate the total of this data set
          let total = dataset.data.reduce(function (
            previousValue,
            currentValue,
            currentIndex,
            array
          ) {
            return previousValue + currentValue;
          });
          //get the current items value
          let currentValue = dataset.data[tooltipItem.index];
          //calculate the precentage based on the total and current item, also this does a rough rounding to give a whole number
          let percentage = Math.floor((currentValue / total) * 100 + 0.5);
          console.log(data);
          return data.labels[tooltipItem.index] + ": " + percentage + "%";
        }
    }
}
    // elements: {
    //   center: {
    //     text: "0 Project",
    //     color: "#030303",
    //     fontStyle: "Avenir",
    //   },
    // },
    // layout: {
    //   padding: {
    //     left: 0,
    //     right: 120,
    //     top: 0,
    //     bottom: 0,
    //   },
    // },
  const plugins = {
    tooltip: {
      yAlign: "top",
      font: {
        size: 20,
      },
      callbacks: {
        title: function (tooltipItem, data) {
          //get the concerned dataset
          let dataset = data.datasets[tooltipItem.datasetIndex];
          //calculate the total of this data set
          let total = dataset.data.reduce(function (
            previousValue,
            currentValue,
            currentIndex,
            array
          ) {
            return previousValue + currentValue;
          });
          //get the current items value
          let currentValue = dataset.data[tooltipItem.index];
          //calculate the precentage based on the total and current item, also this does a rough rounding to give a whole number
          let percentage = Math.floor((currentValue / total) * 100 + 0.5);
          console.log(data);
          return data.labels[tooltipItem.index] + ": " + percentage + "%";
        },
      },
    },
  };
  return <Doughnut data={data} options={options} style={{ width:width }}/>;
};

export default memo(ProjectMetrics);
