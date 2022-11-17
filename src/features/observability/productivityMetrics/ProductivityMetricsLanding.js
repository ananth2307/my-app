import React ,{memo, useCallback} from 'react'
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import { observabilityApi } from '../../../app/services/observabilityApi';
import { getDefaultSelectedDate } from '../../common/helpers';
import { getSelectedOptionsValue } from "../../../app/utilities/helpers";
import { get } from 'lodash';
import { DrillDownOffCanvas } from '../../common';
import Filter from '../../common/Filter';
import ChartContainer from "../common/ChartContainer";
import { ProductMetricChartContainers } from "../common/constants";

const  ProductivityMetricsLanding = () =>{
    const [state, setstate] = useState({
        productivityMetricsData:{
          staticCodeAnalysisData:{},
          codeAnalysisData:{},
          buildMetricsData:{},
          deploymentMetricsData:{}

        },
        isShowDrillDown:false
    });
    const {observability} = useSelector((state) => state);
    const [getAppList] = observabilityApi.useLazyGetAppListQuery({});
    const [getStaticCodeAnalysis] = observabilityApi.useGetStaticCodeAnalysisMutation();
    const [getLinesOfCodes] = observabilityApi.useGetLinesOfCodesMutation();
    const [getBuildMetrics] = observabilityApi.useGetBulidMetricsMutation();

    let appList = [];
    let { initialStartDate , initialEndDate } = getDefaultSelectedDate();
    initialStartDate = new Date(initialStartDate).getTime();
    initialEndDate = new Date(initialEndDate).getTime();
    var std = initialStartDate.toString();
    std=std.slice(0, -3);
    std=parseInt(std);
    var etd = initialEndDate.toString();
    etd=etd.slice(0, -3);
    etd=parseInt(etd);
    
    const getProductitvityMetrics = useCallback(
        async(isInitialLoad = false) => {
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
              const tmpPayload = {
                appCodes: [
                    "ACT",
                    "CODE8",
                    "DAAS",
                    "DOME",
                    "AIFT",
                    "MAT",
                    "PII",
                    "PROMOKART"
                ],
                projects: [],
                sprintName: [],
                startDt: 1664562600000,
                toDt: 1668623340000
            }
              const buildMetricsPayload = {
                applications:[
                  "ACT",
                  "CODE8",
                  "DAAS",
                  "DOME",
                  "AIFT",
                  "MAT",
                  "PII",
                  "PROMOKART"
              ],
                  fromDt:std,          
                  toDt:etd
              };

              let producivityMetricsPromiseData = await Promise.all([
                getStaticCodeAnalysis(defaultPayload),
                getLinesOfCodes(tmpPayload),
                getBuildMetrics(buildMetricsPayload)

              ]
              );
              const productivityMetricsData ={
                staticCodeAnalysisData:get(producivityMetricsPromiseData,'[0].data',[]),
                codeAnalysisData:get(producivityMetricsPromiseData,'[1].data',[]),
                buildMetricsData:get(producivityMetricsPromiseData,'[2].data',[])
                
              }
              setstate((state)=>({
                ...state,
                productivityMetricsData:{
                    ...state.productivityMetricsData,...productivityMetricsData
                }
              }));
        },[state.productivityMetricsData]
    );
    useEffect(() => {
        getAppList({})
        .unwrap()
        .then((appListResp)=>{
            appList = appListResp;
            console.log("appp",appList)
            getProductitvityMetrics(true)
        })
    }, []);
  return (
    <><DrillDownOffCanvas productivityMetricsData={state.productivityMetricsData} />
    <Filter getFilteredData={getProductitvityMetrics} isShowSprintList={false}/>
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
  )
}
export default memo(ProductivityMetricsLanding);
