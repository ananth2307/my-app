import { get, omit } from "lodash";
import React, { memo } from "react";
import { Line } from "react-chartjs-2";

const BuildTrend = (props) => {
  const buildTrendData = get(props, "jenkinsData.buildTrendData", {});
  let width = get(props, "chartContainerRefs.current[0].offsetWidth", 1);
  const { SUCCESS, FAILURE } = buildTrendData;
  let dates = [];
  let successData = [];
  let failureData = [];

  SUCCESS &&
    SUCCESS.length > 0 &&
    SUCCESS.map((datas) => {
      Object.keys(datas).map((key) => {
        dates.push(key);
        successData.push(datas[key]);
      });
    });
  FAILURE &&
    FAILURE.length > 0 &&
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
    <div
      class="graphblock"
      style={{ position: "relative", height: "32vh", width: width }}
    >
      <Line data={data} />
    </div>
  );
};

export default memo(BuildTrend);
