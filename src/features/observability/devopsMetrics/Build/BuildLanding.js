import { get } from "lodash";
import React, { memo, useCallback, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { observabilityApi } from "../../../../app/services/observabilityApi";
import {
  getPercentage,
  getSelectedOptionsValue,
} from "../../../../app/utilities/helpers";
import { close, pencil, twick } from "../../../../assets/images";

const BuildLanding = () => {
  const panelState = useSelector((state) => state.observability?.panelState);
  const [state, setState] = useState({
    buildData: {},
  });
  const [getDevopsBuild] = observabilityApi.useGetDevopsBuildMutation({});
  const { observability } = useSelector((state) => state);
  const getBuildData = useCallback(async () => {
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
      startDt: 1668671572937,
      toDt: 1669881172938,
    };
    let buildPromiseData = await getDevopsBuild(defaultPayload);

    setState((state) => ({
      ...state,
      buildData: { ...state.buildData, ...buildPromiseData.data },
    }));
  }, [state.buildData, observability.filterData]);
  useEffect(() => {
    get(panelState, `isBuildOpen`, false) && getBuildData();
  }, [observability.filterData, panelState]);
  const labels = get(state.buildData, "dates", []);
  const successList = get(state.buildData, "succList", []);
  const failedList = get(state.buildData, "failList", []);
  const abortedList = get(state.buildData, "abortedList", []);
  const { success, failed, aborted, totalBuild } = state.buildData;
  let sucessRate = Math.round(getPercentage(success, totalBuild));
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Success",
        categoryPercentage: 0.5,
        barPercentage: 0.4,
        data: successList,
        backgroundColor: "rgb(22,203,92)",
        hoverBackgroundColor: "rgb(22,203,92)",
        stack: 0,
      },
      {
        label: "Failed",
        categoryPercentage: 0.5,
        barPercentage: 0.4,
        data: failedList,
        backgroundColor: "#FF6565",
        hoverBackgroundColor: "#FF6565",
        stack: 0,
      },
      {
        label: "Aborted",
        categoryPercentage: 0.5,
        barPercentage: 0.4,
        data: abortedList,
        backgroundColor: "rgb(173,173,159)",
        hoverBackgroundColor: "rgb(173,173,159)",
        stack: 0,
      },
    ],
  };
  let option = {
    maintainAspectRatio: true,
    // responsive: true,
    interaction: {
      intersect: false,
      mode: "index",
    },
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
    },
  };
  return (
    <div class="panel-inner_class">
      <div class="col-md-12 panel-inner_head">
        Build{" "}
        <span class="panel-inner_head_count" id="totBuild">
          {totalBuild}
        </span>{" "}
        <span class="or-color s-rate fs-15">[Success Rate:</span>{" "}
        <span class="pl-0 fs-15">{sucessRate} %</span>
        <span class="or-color fs-15">]</span>
      </div>
      <div class="col-md-12 row p-0">
        <div class="col-md-3"></div>
        <div class="col-md-6 row">
          <div class="Ap-pa col">
            <div class="Approval_panal row" id="approved">
              <div class="sm-icon-part">
                <img src={twick} class="sm-success_icon" alt="sucess" />
              </div>
              <div class="sm-count-part">
                <div class="mycount">
                  <span>Success</span>{" "}
                  <span class="pl-2" id="bmSucc">
                    {success}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="Ap-pa col">
            <div class="Approval_panal row" id="reject">
              <div class="sm-icon-part">
                <img src={close} class="sm-fail_icon" />
              </div>
              <div class="sm-count-part">
                <div class="mycount">
                  <span>Failed</span>{" "}
                  <span class="pl-2" id="bmFail">
                    {failed}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="Ap-pa col">
            <div class="Approval_panal row" id="review">
              <div class="sm-icon-part">
                <img src={pencil} class="sm-aborted_icon" />
              </div>
              <div class="sm-count-part">
                <div class="mycount">
                  <span>Aborted</span>{" "}
                  <span class="pl-2" id="bmAborted">
                    {aborted}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Bar data={data} options={option} />
    </div>
  );
};

export default memo(BuildLanding);
