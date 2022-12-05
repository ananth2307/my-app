import { get, isEmpty } from "lodash";
import React, { memo } from "react";
import { Line } from "react-chartjs-2";
import { loginColor, logoutColor } from "../../common/constants";

const LoginLogoutTrend = (props) => {
  const tmploginLogoutData = get(props, "bitBucketData.loginLogoutData", []);
  const { bitbucketLogin } = !isEmpty(tmploginLogoutData)
    ? tmploginLogoutData.at(0)
    : [];
  const { bitbucketLogout } = !isEmpty(tmploginLogoutData)
    ? tmploginLogoutData.at(1)
    : [];
  const labels = [];
  const loginData = [];
  const logoutData = [];
  !isEmpty(bitbucketLogin) &&
    bitbucketLogin.map((items) => {
      Object.keys(items).map((key) => {
        labels.push(key);
        loginData.push(items[key]);
      });
    });
  !isEmpty(bitbucketLogout) &&
    bitbucketLogout.map((items) => {
      Object.keys(items).map((key) => {
        logoutData.push(items[key]);
      });
    });
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Login Trend",
        data: loginData,
        fill: false,
        borderColor: loginColor,
        backgroundColor: loginColor,
        tension: 0.1,
      },
      {
        label: "Logout Trend",
        data: logoutData,
        fill: false,
        borderColor: logoutColor,
        backgroundColor: logoutColor,
        tension: 0.1,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
  return <Line data={data} options={options} />;
};

export default memo(LoginLogoutTrend);
