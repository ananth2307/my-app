import { get, isEmpty } from "lodash";
import React, { memo } from "react";
import { Line } from "react-chartjs-2";
import { ChartLineColor1 } from "../../common/constants";

const PullRequestTrend = (props) => {
  const pullRequestTrendData = get(
    props,
    "bitBucketData.pullRequestTrendData",
    {}
  );
  const { pullRequest } = pullRequestTrendData;
  let labels = [];
  let lineData = [];
  !isEmpty(pullRequest) &&
    pullRequest.map((items) => {
      Object.keys(items).map((key) => {
        labels.push(key);
        lineData.push(items[key]);
      });
    });
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Pull Request Trend",
        data: lineData,
        fill: false,
        borderColor: ChartLineColor1,
        tension: 0.1,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };
  const plugins = [
    {
      beforeDraw: function (c) {
        let legends = c.legend.legendItems;
        legends.forEach(function (e) {
          e.fillStyle = ChartLineColor1;
        });
      },
    },
  ];
  return <Line data={data} options={options} plugins={plugins} />;
};

export default memo(PullRequestTrend);
