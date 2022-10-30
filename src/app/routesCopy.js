import React from "react";
import {
  observability,
  gnc,
  efficiency,
  configuration,
} from "../assets/images/index";

const SignIn = React.lazy(() => import("../features/auth/SignIn"));

const FlowMetrics = React.lazy(() =>
  import("../features/observability/flowMetrics/FlowMetricsLanding")
);

export const authRoutes = [
  {
    name: "SignIn",
    path: "/logout",
    component: <SignIn />,
    key: 0,
  },
  {
    name: "SignIn",
    path: "/auth",
    component: <SignIn />,
    key: 0,
  },
];

export const routes = [
  //CODE8 Observability
  {
    name: "Code8 Observability",
    path: "observability",
    component: <FlowMetrics />,
    key: "1",
    icon: observability,
  },
];
