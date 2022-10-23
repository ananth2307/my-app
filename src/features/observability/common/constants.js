import React from "react";
//Flow Metrics
import FlowDistribution from "../flowMetrics/FlowDistribution";
import FlowVelocity from "../flowMetrics/FlowVelocity";

//People Metrics
import IssueMetrics from "../peopleMetrics/IssueMetrics";

//Flow Metrics
export const FlowMetricChartContainers = [
  {
    key: 1,
    title: "FLOW DISTRIBUTION",
    chart: (props) => <FlowDistribution {...props} />,
    navContainerClass: "flowdisnav",
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
    navContainerClass: "floweffnav",
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
    navContainerClass: "floweffnav",
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
    customClass: "col-lg-8 col-md-12 order-md-5 order-lg-4 filtercol",
    navContainerClass: "",
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
    ]
  },
  {
    key: 2,
    title: "LEVEL OF COLLABORATION BY COMMENTS",
    chart: (props) => <FlowDistribution {...props} />,
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
    chart: (props) => <FlowDistribution {...props} />,
    navs: [
      {
        text: "",
        color: "",
      },
    ]
  },
  {
    key: 4,
    title: "PROJECT CHAMPIONS",
    chart: (props) => <FlowDistribution {...props} />,
    navs: [
      {
        text: "",
        color: "",
      },
    ]
  },
  {
    key: 5,
    title: "",
    chart: (props) => <FlowDistribution {...props} />,
    navs: [
      {
        text: "",
        color: "",
      },
    ]
  }
]
