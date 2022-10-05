import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/css/common.scss";
import "./assets/css/internal.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./app/routes";
import { store } from "./app/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.key}
              path={route.path}
              element={route.component}
            />
          ))}
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
