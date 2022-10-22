import React from "react";
import Filter from "../common/Filter";
import ChartContainer from "../common/ChartContainer";
import { FlowMetricChartContainers } from "../common/constants";

const FlowMetrics = () => {
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
