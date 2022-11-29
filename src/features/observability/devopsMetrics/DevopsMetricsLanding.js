import React from "react";
import "./styles.devOps.scss";
import "../../../assets/css/dash-style.scss";
import PanelContainer from "./PanelContainer";
import { panels } from "../common/constants";
import 'chart.js/auto';
import Filter from "./Filter";
// import { CategoryScale,Chart,LinearScale,BarElement,ArcElement,Tooltip, Legend,PointElement,LineElement } from "chart.js";

const DevopsMetrics = () => {
  // Chart.register(CategoryScale,LinearScale,BarElement,ArcElement,PointElement,LineElement,Legend);

  return (
    <div className="row devops-metrics-container">
      <div className="col-md-12 p-0">
        <Filter />
        {panels.map((panel) => (
          <PanelContainer {...panel} />
        ))}
      </div>
    </div>
  );
};
export default DevopsMetrics;
