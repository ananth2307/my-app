import React ,{memo, useCallback} from 'react'
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import { observabilityApi } from '../../../app/services/observabilityApi';
import { getDefaultSelectedDate } from '../../common/helpers';
import { getSelectedOptionsValue } from "../../../app/utilities/helpers";
import { get } from 'lodash';
import { DrillDownOffCanvas } from '../../common';
import Filter from '../../common/Filter';

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
   

    let appList = [];
    let { initialStartDate , initialEndDate } = getDefaultSelectedDate();
    initialStartDate = new Date(initialStartDate).getTime();
    initialEndDate = new Date(initialEndDate).getTime();
    
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

              let producivityMetricsPromiseData = await Promise.all([
                getStaticCodeAnalysis(defaultPayload),
                getLinesOfCodes(defaultPayload),

              ]
              );
              const productivityMetricsData ={
                staticCodeAnalysis:get(producivityMetricsPromiseData,'[0].data',[]),
                linesOfCodes:get(producivityMetricsPromiseData,'[1].data',[]),
                
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
            getProductitvityMetrics(true)
        })
    }, []);
  return (
    <><DrillDownOffCanvas peopleMetricsData={state.peopleMetricsData} />
    <Filter getFilteredData={getProductitvityMetrics} isShowSprintList={false}/>
    </>
  )
}
export default memo(ProductivityMetricsLanding);
