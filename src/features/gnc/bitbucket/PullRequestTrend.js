import { isEmpty } from 'lodash';
import React, { memo } from 'react'
import { Line } from 'react-chartjs-2';
import { ChartLineColor1 } from '../../common/constants';

const PullRequestTrend = (props) => {
  const temp = [
    {
        "15 Aug, 2022": 27,
        "16 Aug, 2022": 4
    }
]
  let labels = [];
  let lineData = [];
  !isEmpty(temp.length) && temp.map((items)=>{
    Object.keys(items).map(key=>{
       labels.push(key)
       lineData.push(items[key])
    });
  });
  const data = {
    labels: labels,
    datasets: [{
        label: "Pull Request Trend",
        data: lineData,
        fill: false,
        borderColor: ChartLineColor1,
        tension: 0.1
    }]
};
const options =   {
  responsive: true,
  maintainAspectRatio: true,
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
  }
}
const plugins = [{
  beforeDraw: function(c) {
     var legends = c.legend.legendItems;
     legends.forEach(function(e) {
         e.fillStyle = ChartLineColor1;
     });
  }
}]
  return (
    <Line data={data} options={options} plugins={plugins}/>
  )
}

export default memo(PullRequestTrend)