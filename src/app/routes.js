import React from 'react';
const SignIn = React.lazy(() => import('../features/auth/SignIn'))
const FlowMetrics = React.lazy(() => import('../features/observability/flowMetrics/FlowMetrics'))
const routes = [
  {
    name: "Sign In",
    path: "/",
    component: <SignIn />,
    key: 1,
  },
  {
    name: "Sign In",
    path: "/auth",
    component: <SignIn />,
    key: 1,
  },
  {
    name: "FlowMetrics",
    path: "/flowMetrics",
    component: <FlowMetrics />,
    key: 2,
  },
];
export default routes;
