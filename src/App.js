import React, { Suspense } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/css/common.scss";
import "./assets/css/internal.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { authRoutes, routes } from "./app/routes";
import { store } from "./app/store";
import { Provider } from "react-redux";
import Container from "./features/common/Container";
import ContainerLoader from "./features/common/ContainerLoader";

function App() {
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
              {routes.map((route) => (
                <Route
                  key={route.key}
                  path={route.path}
                  element={route.component}
                />
              ))}
            </Route>
          </Routes>
        </Router>
      </Suspense>
    </Provider>
  );
}

export default App;
