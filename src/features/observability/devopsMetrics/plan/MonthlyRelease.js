import { get, isEmpty } from "lodash";
import React, { memo } from "react";
import { Bar } from "react-chartjs-2";

const MonthlyRelease = (props) => {
  let monthlyRelease = get(props, "planData.monthlyReleaseData", []);
  let Features = [];
  let Defects = [];
  let Risks=[];
  let ProdFix=[];
  let Enablers=[];
  let Debt=[];
  let labels = []
    !isEmpty(monthlyRelease) && monthlyRelease.map((items)=>{
      const {month,epic,features,task,bugs,risk,changeRequest,enablers,debt,prodFix} = items
      labels.push(month)
      Features.push(epic + features + task)
      Defects.push(bugs)
      Risks.push(risk)
      Enablers.push(changeRequest + enablers)
      Debt.push(debt)
      ProdFix.push(prodFix)
  })
  const data =  {
    labels: labels,
    datasets: [
      {
        label: "Features",
        categoryPercentage: 0.5,
        barPercentage: 0.4,
        backgroundColor: "#147ad6",
        data: Features,
      },
      {
        label: "Defects",
        categoryPercentage: 0.5,
        barPercentage: 0.4,
        backgroundColor: "#ff8000",
        data: Defects,
      },
      {
        label: "Risks",
        categoryPercentage: 0.5,
        barPercentage: 0.4,
        backgroundColor: "#ec6666",
        data: Risks,
      },
      {
        label: "Enablers",
        categoryPercentage: 0.5,
        barPercentage: 0.4,
        backgroundColor: "#af8beb",
        data: Enablers,
      },
      {
        label: "Debt",
        categoryPercentage: 0.5,
        barPercentage: 0.4,
        backgroundColor: "#e9d96d",
        data: Debt,
      },
      {
        label: "Prod-Fix",
        categoryPercentage: 0.5,
        barPercentage: 0.4,
        backgroundColor: "#fcbb4b",
        data: ProdFix,
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
  return <Bar data={data} options={options}/>
};

export default memo(MonthlyRelease);
