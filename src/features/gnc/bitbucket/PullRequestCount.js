import { isEmpty } from 'lodash';
import React, { memo } from 'react'
import { Doughnut } from 'react-chartjs-2';

const PullRequestCount = (props) => {
  const PullRequestCountData = {
    "pullRequest": [
        {
            "deleted": 6,
            "reopened": 2,
            "rejected": 2,
            "created": 8,
            "merged": 3,
            "updated": 3
        }
    ]
} 
const {pullRequest} = PullRequestCountData;
let chartLabel = [];
let chartData = [];
!isEmpty(pullRequest) && pullRequest.map(items=>{
  Object.keys(items).map(key=>{
    chartLabel.push(key)
    chartData.push(items[key])
  })
})
  const data = {
    labels: chartLabel,
    datasets: [{
        data: chartData,
        backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
        ],
        hoverOffset: 4
    }]
};
const  options = {
  cutout: '80%',
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
      legend: {
          position: 'top',
      },
      title: {
          display: false
      }
  }
}
  return (
   <Doughnut data={data} options={options}/>
  )
}

export default memo(PullRequestCount)