import React from "react";
import Filter from "../common/Filter";
import ChartContainer from "../common/ChartContainer";
import { PeopleMetricChartContainers } from "../common/constants";

const PeopleMetrics = () => {
  return (
    <>
      <Filter />
      <div className="dashboardwrap colswrap all-works">
        <div className="row">
          {PeopleMetricChartContainers?.map((type) => {
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
export default PeopleMetrics;
