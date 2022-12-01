import { get } from "lodash";
import React, { memo } from "react";
import { Doughnut } from "react-chartjs-2";

const StaticCodeAnalysis = (props) => {
  const staticCodeAnalysisData = get(
    props,
    "scanData.staticCodeAnalysisData",
    []
  );
  const { blocker, critical, info, major, minor } = staticCodeAnalysisData;
  const data = {
    labels: ["Blockers", "Critical", "Major", "Minor", "Info"],
    datasets: [
      {
        borderColor: "#393b45",
        borderWidth: 1,
        weight: 0.5,
        backgroundColor: ["#ff0404", "#ff8000", "#ff8373", "#e5d349", "#3dc5d"],
        data: [blocker, critical, major, minor, info],
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label;
            let currentValue = context.parsed;
            let total = context.dataset.data.reduce(
              (acc, current) => acc + current,
              0
            );
            let percentage = Math.floor((currentValue / total) * 100 + 0.5);
            if (label) {
              label = label + ": " + percentage + "%";
            }
            return label;
          },
        },
      },
    },
  };
  return (
    <>
      <Doughnut data={data} options={options} />
      {/* <div class="ps-legend spl-case" id="scalegen">
        <div class="row mb-10"></div>
        <div class="row mb-10">
          <div class="sr-ring legend-ring"></div>
          <div class="legend-text">Blockers</div>
          <span class="legend-val" id="scaBlocker">
            234
          </span>
        </div>
        <div class="row mb-10">
          <div class="sp-ring legend-ring"></div>
          <div class="legend-text">Critical</div>
          <span class="legend-val" id="scaCritical">
            665
          </span>
        </div>
        <div class="row mb-10">
          <div class="sy-ring legend-ring"></div>
          <div class="legend-text">Major</div>
          <span class="legend-val" id="scaMajor">
            1604
          </span>
        </div>
        <div class="row mb-10">
          <div class="sb-ring legend-ring"></div>
          <div class="legend-text">Minor</div>
          <span class="legend-val" id="scaMinor">
            1693
          </span>
        </div>
        <div class="row mb-10">
          <div class="info legend-ring"></div>
          <div class="legend-text">Info</div>
          <span class="legend-val" id="scaInfo">
            0
          </span>
        </div>
      </div> */}
    </>
  );
};

export default memo(StaticCodeAnalysis);
