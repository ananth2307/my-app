import { get, isEmpty } from "lodash";
import React, { memo } from "react";
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';

const BuildTrend = (props) => {
  const buildTrendData = get(props, "jenkinsData.buildTrendData", {});
  let width = get(props, "chartContainerRefs.current[0].offsetWidth", 1);
  const { SUCCESS, FAILURE } = buildTrendData;
  let dates = [];
  let successData = [];
  let failureData = [];

 !isEmpty(SUCCESS) &&
    SUCCESS.map((datas) => {
      Object.keys(datas).map((key) => {
        dates.push(key);
        successData.push(datas[key]);
      });
    });
    !isEmpty(FAILURE) &&
    FAILURE.map((datas) => {
      Object.keys(datas).map((key) => {
        failureData.push(datas[key]);
      });
    });
  const data = {
    labels: dates,
    datasets: [
      {
        label: "SUCCESS",
        data: successData,
        fill: false,
        backgroundColor: "green",
        borderColor: "green",
      },
      {
        label: "FAILURE ",
        data: failureData,
        fill: false,
        backgroundColor: "red",
        borderColor: "red",
      },
    ],
  };
  return (
      <Line class='buildtrend' data={data}/>
  );
};

export default memo(BuildTrend);
