import React from "react";
import "./styles.devOps.scss";
import "../../../assets/css/dash-style.scss";
import PanelContainer from "./PanelContainer";
import { panels } from "./constants";
import Filter from "./Filter";


const DevopsMetrics = () => {

  return (
    <div className="row">
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
