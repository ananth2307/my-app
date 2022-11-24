import React from "react";
// Jenkins
const BuildTrend = React.lazy(() =>
  import("../jenkins/BuildTrend")
);
const SuccessFailurePercentage = React.lazy(() =>
import("../jenkins/SuccessFailurePercentage"));
const JobsNodeDetails = React.lazy(() =>
import("../jenkins/JobsNodeDetails"));
const SucessFailureRatio = React.lazy(() =>
import("../jenkins/SuccessFailureRatio"));
const TopSuccess = React.lazy(() =>
import("../jenkins/TopSucess"));
const TopFailure = React.lazy(() =>
import("../jenkins/TopFailure"));
// BitBuket Trend
const CommitTrend = React.lazy(()=>
import('../bitbucket/CommitTrend'));
const CreateDeleteDetails = React.lazy(()=>
import('../bitbucket/CreateDeletedDetails'));
const PullRequestCount = React.lazy(()=>
import('../bitbucket/PullRequestCount'));
const PullRequestTrend = React.lazy(()=>
import('../bitbucket/PullRequestTrend'));
const LoginLogoutTrend = React.lazy(()=>
import('../bitbucket/LoginLogoutTrend'));
const TopCommit = React.lazy(()=>
import('../bitbucket/TopCommit'));
const TopRepo = React.lazy(()=>
import('../bitbucket/TopRepo'));
//Jenkins
export const JenkinsContainer = [
  {
    key: 1,
    title: "BUILD TREND",
    chart: (props) => <BuildTrend {...props} />,
    navContainerClass: "flowdisnav",
    customClass:'col-lg-8 col-md-8 filtercol'
  },
  {
    key: 2,
    title: "SUCCESS & FAILURE - PERCENTAGE",
    chart: (props) => <SuccessFailurePercentage {...props} />,
    navContainerClass: "flowdisnav",
    customClass:'col-lg-4 col-md-4 filtercol'
  },
  {
    key: 3,
    title: "JOBS AND NODE DETAILS",
    chart: (props) => <JobsNodeDetails {...props} />,
    navContainerClass: "flowdisnav",
    customClass:'col-lg-7 col-md-7 filtercol'
  },
  {
    key: 4,
    title: "SUCCESS & FAILURE - RATIO",
    chart: (props) => <SucessFailureRatio {...props} />,
    navContainerClass: "flowdisnav",
    customClass:'col-lg-5 col-md-5 filtercol'
  },
  {
    key: 5,
    title: "TOP 5 SUCCESS",
    chart: (props) => <TopSuccess {...props} />,
    navContainerClass: "flowdisnav",
    customClass:'col-lg-6 col-md-12 filtercol'
  },
  {
    key: 6,
    title: "TOP 5 FAILURE",
    chart: (props) => <TopFailure {...props} />,
    navContainerClass: "flowdisnav",
    customClass:'col-lg-6 col-md-12 filtercol'
  }
];
export const BitBuketTrendContainer1 = [
  {
    key: 1,
    title: "COMMIT TREND",
    chart: (props) => <CommitTrend {...props} />,
    navContainerClass: "flowdisnav",
    customClass:'col-lg-8 col-md-8 filtercol'
  },
  {
    key: 2,
    title: "CREATED DELETED DETAILS",
    chart: (props) => <CreateDeleteDetails {...props} />,
    navContainerClass: "flowdisnav",
    customClass:'col-lg-4 col-md-4 filtercol'
  }]
  export const BitBuketTrendContainer2 = [
  {
    key: 1,
    title: "PULL REQUEST TREND",
    chart: (props) => <PullRequestCount {...props} />,
    navContainerClass: "flowdisnav",
    customClass:'col-lg-5 col-md-5 filtercol'
  },
  {
    key:2 ,
    title: "PULL REQUEST TREND",
    chart: (props) => <PullRequestTrend {...props} />,
    navContainerClass: "flowdisnav",
    customClass:'col-lg-7 col-md-7 filtercol'
  }]
  export const BitBuketTrendContainer3 = [
  {
    key: 1,
    title: "LOGIN LOGOUT TREND",
    chart: (props) => <LoginLogoutTrend {...props} />,
    navContainerClass: "flowdisnav",
    customClass:'col-lg-12 col-md-12 filtercol'
  }
];
export const BitBuketTrendContainer4 = [
  {
    key: 1,
    title: "TOP REPO DOWNLOADS",
    chart: (props) => <TopRepo {...props} />,
    navContainerClass: "flowdisnav",
    customClass:'col-lg-4 col-md-4 filtercol'
  },
  {
    key: 2,
    title: "TOP MOST COMMIT",
    chart: (props) => <TopCommit {...props} />,
    navContainerClass: "flowdisnav",
    customClass:'col-lg-4 col-md-4 filtercol'
  }
];