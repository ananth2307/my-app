import React, { memo, useCallback } from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { observabilityApi } from "../../../app/services/observabilityApi";
import { getDefaultSelectedDate } from "../../common/helpers";
import { getSelectedOptionsValue } from "../../../app/utilities/helpers";
import { get } from "lodash";
import { DrillDownOffCanvas } from "../../common";
import Filter from "../../common/Filter";
import ChartContainer from "../common/ChartContainer";
import { ProductMetricChartContainers } from "../common/constants";

const ProductivityMetricsLanding = () => {
  const [state, setstate] = useState({
    productivityMetricsData: {
      staticCodeAnalysisData: {},
      codeAnalysisData: {},
      buildMetricsData: {},
      deploymentMetricsData: {},
    },
    isShowDrillDown: false,
  });
  const { observability } = useSelector((state) => state);
  const [getAppList] = observabilityApi.useLazyGetAppListQuery({});
  const [getStaticCodeAnalysis] =
    observabilityApi.useGetStaticCodeAnalysisMutation();
  const [getLinesOfCodes] = observabilityApi.useGetLinesOfCodesMutation();
  const [getBuildMetrics] = observabilityApi.useGetBulidMetricsMutation();

  let appList = [];
  let { initialStartDate, initialEndDate } = getDefaultSelectedDate();
  initialStartDate = new Date(initialStartDate).getTime();
  initialEndDate = new Date(initialEndDate).getTime();

  const getProductitvityMetrics = useCallback(
    async (isInitialLoad = false) => {
      const defaultPayload = {
        appCodes: isInitialLoad
          ? getSelectedOptionsValue(appList)
          : getSelectedOptionsValue(
              get(observability, "filterData.selectedApplications", [])
            ),
        projects: getSelectedOptionsValue(
          get(observability, "filterData.selectedProjects", [])
        ),
        sprintName: getSelectedOptionsValue(
          get(observability, "filterData.selectedSprints", [])
        ),
        startDt: initialStartDate,
        toDt: initialEndDate,
      };
      const buildMetricsPayload = {
        applications: [
          "ACT",
          "CODE8",
          "DAAS",
          "DOME",
          "AIFT",
          "MAT",
          "PII",
          "PROMOKART",
        ],
        fromDt: initialStartDate/1000,
        toDt: initialEndDate/1000,
      };

      let producivityMetricsPromiseData = await Promise.all([
        getStaticCodeAnalysis(defaultPayload),
        getLinesOfCodes(defaultPayload),
        getBuildMetrics(buildMetricsPayload),
      ]);
      const productivityMetricsData = {
        staticCodeAnalysisData: get(
          producivityMetricsPromiseData,
          "[0].data",
          []
        ),
        codeAnalysisData: get(producivityMetricsPromiseData, "[1].data", []),
        buildMetricsData: get(producivityMetricsPromiseData, "[2].data", []),
      };
      setstate((state) => ({
        ...state,
        productivityMetricsData: {
          ...state.productivityMetricsData,
          ...productivityMetricsData,
        },
      }));
    },
    [state.productivityMetricsData]
  );
  useEffect(() => {
    getAppList({})
      .unwrap()
      .then((appListResp) => {
        appList = appListResp;
        getProductitvityMetrics(true);
      });
  }, []);
  return (
    <>
      <DrillDownOffCanvas
        productivityMetricsData={state.productivityMetricsData}
      />
      <Filter
        getFilteredData={getProductitvityMetrics}
        isShowSprintList={false}
      />
      <div className="dashboardwrap colswrap all-works">
        <div className="row">
          {ProductMetricChartContainers?.map((chartType, index) => {
            return (
              <ChartContainer
                key={chartType}
                index={index}
                {...chartType}
                productivityMetricsData={state.productivityMetricsData}
              >
                {chartType.component}
              </ChartContainer>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default memo(ProductivityMetricsLanding);
