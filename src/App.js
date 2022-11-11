import React, { Suspense, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/css/common.scss";
import "./assets/css/internal.scss";
import "./assets/css/bootstrap_extended.scss";
import "./assets/css/common-overrides.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { authRoutes, routes } from "./app/routes";
import { store } from "./app/store";
import { Provider } from "react-redux";
import Container from "./app/common-components/Container";
import ContainerLoader from "./app/common-components/ContainerLoader";

function App() {
  const renderRoutes = (allRoutes) => {
    return allRoutes.map((route) =>
      route.childNavs ? (
        renderRoutes(route.childNavs)
      ) : (
        <Route key={route.key} path={route.path} element={route.component} />
      )
    );
  };
  return (
    <Provider store={store}>
      <Suspense fallback={<ContainerLoader />}>
        <Router>
          <Routes>
            {authRoutes.map((route) => (
              <Route
                key={route.key}
                path={route.path}
                element={route.component}
              />
            ))}
            <Route path="/" element={<Container />}>
              {renderRoutes(routes)}
            </Route>
          </Routes>
        </Router>
      </Suspense>
    </Provider>
  );
}

export default App;
