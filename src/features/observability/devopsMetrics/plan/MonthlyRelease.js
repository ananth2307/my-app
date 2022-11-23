import React, { memo } from "react";
import { Bar } from "react-chartjs-2";

const MonthlyRelease = (props) => {
  let features = [12,5,6];
  let changeRequest =[23, 5, 43];
  let bugs = [11, 12, 10];
  let epics = [10,5, 10];
  let tasks = [20, 10, 20];
  const data = {
    labels: ["Jan", "Feb"],
    datasets: [
      {
        label: "Features",
        categoryPercentage: 0.5,
        barPercentage: 0.4,
        backgroundColor: "#147ad6",
        data: features,
      },
      {
        label: "Defects",
        categoryPercentage: 0.5,
        barPercentage: 0.4,
        backgroundColor: "#ff8000",
        data: bugs,
      },
      {
        label: "Risks",
        categoryPercentage: 0.5,
        barPercentage: 0.4,
        backgroundColor: "#ec6666",
        data: tasks,
      },
      {
        label: "Enablers",
        categoryPercentage: 0.5,
        barPercentage: 0.4,
        backgroundColor: "#af8beb",
        data: bugs,
      },
      {
        label: "Debt",
        categoryPercentage: 0.5,
        barPercentage: 0.4,
        backgroundColor: "#e9d96d",
        data: changeRequest,
      },
      {
        label: "Prod-Fix",
        categoryPercentage: 0.5,
        barPercentage: 0.4,
        backgroundColor: "#fcbb4b",
        data: changeRequest,
      },
    ],
  };
  return <Bar data={data}/>
};

export default memo(MonthlyRelease);
