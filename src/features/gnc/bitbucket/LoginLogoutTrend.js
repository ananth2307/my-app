import React, { memo } from "react";
import { Line } from "react-chartjs-2";
import { loginColor, logoutColor } from "../../common/constants";

const LoginLogoutTrend = (props) => {
  const labels = [
    "08 Nov, 2022",
    "09 Nov, 2022",
    "10 Nov, 2022",
    "11 Nov, 2022",
    "12 Nov, 2022",
    "13 Nov, 2022",
    "14 Nov, 2022",
    "15 Nov, 2022",
    "16 Nov, 2022",
    "17 Nov, 2022",
    "18 Nov, 2022",
    "19 Nov, 2022",
    "20 Nov, 2022",
    "21 Nov, 2022",
    "22 Nov, 2022",
  ];
  const lineDataLogin = [1, 0, 2, 5, 1, 0, 3, 3, 5, 5, 2, 2, 6, 5, 3];
  const lineDataLogout = [0, 4, 3, 4, 5, 0, 3, 2, 5, 1, 2, 2, 4, 2, 3];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Login Trend",
        data: lineDataLogin,
        fill: false,
        borderColor: loginColor,
        backgroundColor: loginColor,
        tension: 0.1,
      },
      {
        label: "Logout Trend",
        data: lineDataLogout,
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
