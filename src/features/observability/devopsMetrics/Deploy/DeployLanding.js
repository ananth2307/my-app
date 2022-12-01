import { get, isEmpty } from "lodash";
import React, { memo, useCallback, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { observabilityApi } from "../../../../app/services/observabilityApi";
import {
  getPercentage,
  getSelectedOptionsValue,
} from "../../../../app/utilities/helpers";
import { chartColors } from "../../../common/constants";

const DeployLanding = (props) => {
  const panelState = useSelector((state) => state.observability?.panelState);
  const [state, setState] = useState({
    deployData: {},
  });
  const [getDevopsDeployment] = observabilityApi.useGetDevopsDeploymentMutation(
    {}
  );
  const { observability } = useSelector((state) => state);
  const getDeployData = useCallback(async () => {
    const defaultPayload = {
      appCodes: getSelectedOptionsValue(
        get(observability, "filterData.selectedApplications", [])
      ),
      projects: getSelectedOptionsValue(
        get(observability, "filterData.selectedProjects", [])
      ),
      sprintName: getSelectedOptionsValue(
        get(observability, "filterData.selectedSprints", [])
      ),
      // startDt: get(observability, "filterData.selectedDate.startDate"),
      // toDt:get(observability, "filterData.selectedDate.endDate"),
      startDt: 1668687091262,
      toDt: 1669896691264,
    };
    let deployPromiseData = await getDevopsDeployment(defaultPayload);

    setState((state) => ({
      ...state,
      deployData: { ...state.deployData, ...deployPromiseData.data },
    }));
  }, [state.deployData, observability.filterData]);
  useEffect(() => {
    get(panelState, "isDeployOpen", false) && getDeployData();
  }, [observability.filterData, panelState]);

  const { dates, deployByStatus, deployCount, deployEnv } = state.deployData;
  const data = {
    labels: dates,
    datasets: [],
  };
  let i = 0;
  !isEmpty(deployByStatus) &&
    deployByStatus.map((items) => {
      const { envName, abortedList, failedList, successList } = items;
      data.datasets.push({
        label: "Success",
        data: successList,
        backgroundColor: chartColors[i].success,
        hoverBackgroundColor: chartColors[i].success,
        stack: envName.replace("ilens", "Dev"),
        barPercentage: 0.7,
        categoryPercentage: 0.4,
      });

      data.datasets.push({
        label: "Failed",
        data: failedList,
        backgroundColor: chartColors[i].failed,
        hoverBackgroundColor: chartColors[i].failed,
        stack: envName.replace("ilens", "Dev"),
        barPercentage: 0.7,
        categoryPercentage: 0.4,
      });

      data.datasets.push({
        label: "Aborted",
        data: abortedList,
        backgroundColor: "rgb(250,166,8)",
        hoverBackgroundColor: "rgb(250,176,2)",
        stack: envName.replace("ilens", "Dev"),
        barPercentage: 0.7,
        categoryPercentage: 0.4,
      });
      i++;
    });
  let option = {
    maintainAspectRatio: true,
    scales: {
      x: {
        grid: {
          color: "#373941", //'rgb(99 97 97)',
          beginAtZero: false,
          drawOnChartArea: false,
          lineWidth: 1,
        },
        ticks: {
          display: true,
          fontColor: "#030303",
        },
      },
      y: {
        grid: {
          display: true,
          drawBorder: true,
          drawOnChartArea: false,
          borderColor: "#373941",
          color: "#373941", //'rgba(99,97,97,1)',
          lineWidth: 1,
        },
        ticks: {
          display: true,
          suggestedMin: 0,
          fontColor: "#030303",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return (
              context.dataset.stack +
              ": " +
              context.dataset.label +
              ": " +
              context.formattedValue
            );
          },
        },
      },
    },
  };
  return (
    <div class="panel-inner_class" id="bulidId">
      <div class="col-md-12 panel-inner_head">
        Deployment{" "}
        <span class="panel-inner_head_count" id="totDeploy">
          {deployCount}
        </span>
      </div>
      <div class="col-md-12 row p-0">
        <div class="col-md-1"></div>
        <div class="col-md-10 row" id="deployCountByEnv">
          {!isEmpty(deployEnv) &&
            deployEnv.map((env) => (
              <div class="col">
                <div class="white-panal deploy-panal">
                  <div class="p-2">
                    {env.environment}{" "}
                    <span>
                      {env.deployCount} [Success Rate:{" "}
                      {Math.round(getPercentage(env.success, env.deployCount))}{" "}
                      %]
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <div
                      class="pull-left box-content white_border"
                      style={{ backgroundColor: "rgb(71,145,255)" }}
                    >
                      Success <div id="depCnt">{env.success}</div>
                    </div>{" "}
                    <div
                      class="pull-left box-content"
                      style={{ backgroundColor: "rgb(242,172,4)" }}
                    >
                      Failed <div id="failCnt">{env.error}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div class="col-md-1"></div>
      </div>
      <div class="col-md-12 row pt-5">
        <Bar data={data} options={option} />
      </div>
    </div>
  );
};

export default memo(DeployLanding);
