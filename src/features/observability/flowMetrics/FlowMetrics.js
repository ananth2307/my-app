import React, { useState } from "react";
import Filter from "../../common/Filter";
import ChartContainer from "../common/ChartContainer";
import { FlowMetricChartContainers } from "../common/constants";

const FlowMetrics = () => {
  const [state, setState] = useState({});
  return (
    <>
      <Filter />
      <div className="dashboardwrap colswrap all-works">
        <div className="row">
          {FlowMetricChartContainers?.map((type) => {
            return (
              <ChartContainer key={type} {...type}>
                {type.component}
              </ChartContainer>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default FlowMetrics;
