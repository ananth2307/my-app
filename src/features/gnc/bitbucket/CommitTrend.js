import { get } from 'lodash'
import React, { memo } from 'react'
import { Line } from 'react-chartjs-2'

const CommitTrend = (props) => {
  const commitTrendData =  get(props,'bitBucketData.commitTrendData.commitTrend',[]);
  let labels = [];
  let lineData = [];
  commitTrendData.length > 0 && commitTrendData.map((items)=>{
    Object.keys(items).map(key=>{
       labels.push(key)
       lineData.push(items[key])
    });
  });
  const data = {
    labels: labels,
    datasets: [{
        label: "Commit Trend",
        data: lineData,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor:'rgb(75, 192, 192)',
        tension: 0.1
    }]
};
const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
      x: {
          grid: {
              display: false,
          }
      },
      y: {
          grid: {
              display: false,
          },
      }
  },
  animations: {
        tension: {
          duration: 1000,
          easing: 'linear',
          from: 1,
          to: 0,
          loop: true
        }
  }
}
  return (
    <Line data={data} options={options}/>
  )
}

export default memo(CommitTrend)