import React from "react";
// Jenkins
const BuildTrend = React.lazy(() =>
  import("../BuildTrend")
);
const SuccessFailurePercentage = React.lazy(() =>
import("../SuccessFailurePercentage"));
const JobsNodeDetails = React.lazy(() =>
import("../JobsNodeDetails"));
const SucessFailureRatio = React.lazy(() =>
import("../SuccessFailureRatio"));
const TopSuccess = React.lazy(() =>
import("../TopSucess"));
const TopFailure = React.lazy(() =>
import("../TopFailure"));

//Jenkins
export const JenkinsContainer = [
  {
    key: 1,
    title: "BUILD TREND",
    chart: (props) => <BuildTrend {...props} />,
    navContainerClass: "flowdisnav",
  },
  {
    key: 2,
    title: "SUCCESS & FAILURE - PERCENTAGE",
    chart: (props) => <SuccessFailurePercentage {...props} />,
    navContainerClass: "flowdisnav",
  },
  {
    key: 3,
    title: "JOBS AND NODE DETAILS",
    chart: (props) => <JobsNodeDetails {...props} />,
    navContainerClass: "flowdisnav",
  },
  {
    key: 4,
    title: "SUCCESS & FAILURE - RATIO",
    chart: (props) => <SucessFailureRatio {...props} />,
    navContainerClass: "flowdisnav",
  },
  {
    key: 5,
    title: "TOP 5 SUCCESS",
    chart: (props) => <TopSuccess {...props} />,
    navContainerClass: "flowdisnav",
  },
  {
    key: 6,
    title: "TOP 5 FAILURE",
    chart: (props) => <TopFailure {...props} />,
    navContainerClass: "flowdisnav",
  }
];