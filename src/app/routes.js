import React from 'react';
const SignIn = React.lazy(() => import('../features/auth/signIn'))
const Counter = React.lazy(() => import('../features/counter/Counter'))
const Count = React.lazy(() => import('../features/count/count'))
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
    name: "Counter",
    path: "/counter",
    component: <Counter />,
    key: 1,
  },
  {
    name: "count",
    path: "/count",
    component: <Count />,
    key: 1,
  },
];
export default routes;
