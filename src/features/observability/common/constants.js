import React from "react";
//Flow Metrics
const FlowDistribution = React.lazy(() =>
  import("../flowMetrics/FlowDistribution")
);
const FlowVelocity = React.lazy(() => import("../flowMetrics/FlowVelocity"));
const FlowEfficiency = React.lazy(() =>
  import("../flowMetrics/FlowEfficiency")
);
const FlowPredictability = React.lazy(() =>
  import("../flowMetrics/FlowPredictability")
);
const FlowLoad = React.lazy(() => import("../flowMetrics/FlowLoad"));

//People Metrics
const IssueMetrics = React.lazy(() => import("../peopleMetrics/IssueMetrics"));
const LevelOfCollaboration = React.lazy(() =>
  import("../peopleMetrics/LevelOfCollaboration")
);
const TopAssignees = React.lazy(() => import("../peopleMetrics/TopAssignees"));
const ProjectChampions = React.lazy(() =>
  import("../peopleMetrics/ProjectChampions")
);
const TopContributors = React.lazy(() =>
  import("../peopleMetrics/TopContributors")
);

//Flow Metrics
export const FlowMetricChartContainers = [
  {
    key: 1,
    title: "FLOW DISTRIBUTION",
    chart: (props) => <FlowDistribution {...props} />,
    navContainerClass: "flowdisnav",
    axisLegend: <div class="x_axis_legend">No. of Issues</div>,
    chartContainerClass: "flowdistribution svg-container",
    navs: [
      {
        text: "Features",
        color: "dark-blue",
      },
      {
        text: "Defects",
        color: "dark-orange",
      },
      {
        text: "Risks",
        color: "pink",
      },
      {
        text: "Enablers",
        color: "purple",
      },
      {
        text: "Debt",
        color: "yellow",
      },
      {
        text: "Prod-Fix",
        color: "orange",
      },
    ],
  },
  {
    key: 2,
    title: "FLOW VELOCITY & TIME",
    chart: (props) => <FlowVelocity {...props} />,
    navContainerClass: "velonav",
    chartContainerClass: "lollipop",
    axisLegend: <div className="axis_legend">No. of Days</div>,
    navs: [
      {
        text: "No. of Issues Completed",
        color: "pink",
      },
      {
        text: "Average No. of Days to Complete",
        color: "dark-blue",
      },
    ],
  },
  {
    key: 3,
    title: "FLOW EFFICIENCY",
    chart: (props) => <FlowEfficiency {...props} />,
    navContainerClass: "floweffnav",
    chartContainerClass: "donut",
    navs: [
      {
        text: "Active Time",
        color: "purple",
      },
      {
        text: "Wait Time",
        color: "yellow",
      },
      {
        text: "Efficiency",
        color: "ptxt",
        iconText: "%",
      },
    ],
  },
  {
    key: 4,
    title: "FLOW PREDICTABILITY",
    chart: (props) => <FlowPredictability {...props} />,
    navContainerClass: "floweffnav",
    chartContainerClass: "predict",
    customClass: "col-lg-4 col-md-6 order-md-4 order-lg-5 filtercol",
    navs: [
      {
        text: "Planned",
        color: "dashline",
      },
      {
        text: "Actual",
        color: "blue",
      },
    ],
  },
  {
    key: 5,
    title: "FLOW LOAD (ACTIVE SPRINT)",
    chart: (props) => <FlowLoad {...props} />,
    customClass: "col-lg-8 col-md-12 order-md-5 order-lg-4 filtercol",
    navContainerClass: "",
    chartContainerClass: "infin",
    navs: [
      {
        text: "Features",
        color: "dark-blue",
      },
      {
        text: "Defects",
        color: "dark-orange",
      },
      {
        text: "Risks",
        color: "pink",
      },
      {
        text: "Enablers",
        color: "purple",
      },
      {
        text: "Debt",
        color: "yellow",
      },
      {
        text: "Prod-Fix",
        color: "orange",
      },
    ],
  },
];

//People Metrics
export const PeopleMetricChartContainers = [
  {
    key: 1,
    title: "ISSUE METRICS",
    chart: (props) => <IssueMetrics {...props} />,
    id: "issue_metrics",
    chartContainerRef: "issueMetricsChart",
    navs: [
      {
        text: "Low",
        color: "dark-blue",
      },
      {
        text: "Medium",
        color: "lgreen",
      },
      {
        text: "High",
        color: "dyellow",
      },
      {
        text: "Critical",
        color: "lorange",
      },
      {
        text: "Blockers ",
        color: "red",
      },
    ],
  },
  {
    key: 2,
    title: "LEVEL OF COLLABORATION BY COMMENTS",
    chart: (props) => <LevelOfCollaboration {...props} />,
    axisLegend: <div class="axis_legend_2">No. of comments</div>,
    navs: [
      {
        text: "Features",
        color: "dark-blue",
      },
      {
        text: "Defects",
        color: "dark-orange",
      },
      {
        text: "Risk",
        color: "pink",
      },
      {
        text: "Enabler",
        color: "purple",
      },
      {
        text: "Debt",
        color: "yellow",
      },
      {
        text: "Prod-Fix",
        color: "orange",
      },
    ],
  },
  {
    key: 3,
    title: "TOP ASSIGNEES",
    chart: (props) => <TopAssignees {...props} />,
    navs: [
      {
        text: "",
        color: "",
      },
    ],
  },
  {
    key: 4,
    title: "PROJECT CHAMPIONS",
    chart: (props) => <ProjectChampions {...props} />,
    customClass: "col-lg-4 col-md-6 order-md-4 order-lg-5 filtercol",
    customHeader: () => (
      <div class="fltrhead">
        <h4>Project Champions</h4>
        <a href="" class="viewlink">
          View All
        </a>
      </div>
    ),
  },
  {
    key: 5,
    title: "TOP CONTRIBUTORS",
    chart: (props) => <TopContributors {...props} />,
    customClass: "col-lg-8 col-md-12 order-md-5 order-lg-4 filtercol",
    customHeader: () => (
      <div class="fltrhead">
        <h4>TOP CONTRIBUTORS</h4>
        <div class="graph-des-nav">
          <ul>
            <li>
              <span class="lightgreen"></span> Commit
            </li>
            <li>
              <span class="pink"></span> Issues
            </li>
          </ul>
        </div>
        <a class="viewlink">
          View All
        </a>
      </div>
    ),
  },
];
