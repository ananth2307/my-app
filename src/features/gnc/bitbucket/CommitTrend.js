import { get, isEmpty } from 'lodash'
import React, { memo } from 'react'
import { Line } from 'react-chartjs-2'
import Chart from 'chart.js/auto';
import { ChartLineColor1 } from '../../common/constants';

const CommitTrend = (props) => {
  const commitTrendData =  get(props,'bitBucketData.commitTrendData.commitTrend',[]);
  let labels = [];
  let lineData = [];
 !isEmpty(commitTrendData) && commitTrendData.map((items)=>{
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
        borderColor: ChartLineColor1,
        backgroundColor:ChartLineColor1,
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