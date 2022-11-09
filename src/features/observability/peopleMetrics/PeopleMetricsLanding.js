import React from "react";
import Filter from "../../common/Filter";
import ChartContainer from "../common/ChartContainer";
import { PeopleMetricChartContainers } from "../common/constants";

const PeopleMetrics = (props) => {
  return (
    <>
      <Filter 
        isShowSprintList={false}
      />
      <div className="dashboardwrap colswrap all-works">
        <div className="row">
          {PeopleMetricChartContainers?.map((chartType, index) => {
            return (
              <ChartContainer key={chartType} index={index} {...chartType}>
                {chartType.component}
              </ChartContainer>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default PeopleMetrics;
