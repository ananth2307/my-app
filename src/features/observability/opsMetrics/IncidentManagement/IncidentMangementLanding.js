import React, {memo, useCallback} from 'react'
import Filter from '../../../common/Filter'
import ChartContainer from '../../common/ChartContainer';
import { OpsIncidentMangement } from '../../common/constants';
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { observabilityApi } from '../../../../app/services/observabilityApi';
import { getDefaultSelectedDate } from '../../../common/helpers';
import { get } from "lodash";
import { getSelectedOptionsById,getSelectedOptionsValue } from '../../../../app/utilities/helpers';
import { DrillDownOffCanvas } from '../../../common';

const IncidentMangementLanding = () => {
  const [state, setstate] = useState({
      incidentMangementData: {
      incidentsData:{},
      incidentsPerCategoryData: {},
      meanTimeRecoveryData:{}
    },
    isShowDrillDown: false,
  });
  const { observability } = useSelector((state) => state);
  const [getAppList] = observabilityApi.useLazyGetAppListQuery({});
  const [getIncidents] = observabilityApi.useGetIncidentsMutation();
  const [getIncidentsPerCategory] = observabilityApi.useGetIncidentsPercategoryMutation();
  const [getMeanTimetoRecover] = observabilityApi.useGetMeanTimetoRecoverMutation();
  let appList = [];
  let { initialStartDate, initialEndDate } = getDefaultSelectedDate();
  initialStartDate = new Date(initialStartDate).getTime();
  initialEndDate = new Date(initialEndDate).getTime();
  let std = initialStartDate.toString();
  std = std.slice(0, -3);
  std = parseInt(std);
  let etd = initialEndDate.toString();
  etd = etd.slice(0, -3);
  etd = parseInt(etd);
  const getIncidentManagement = useCallback(
    async (isInitialLoad = false) => {
      const defaultPayload = {
        cmdbId: isInitialLoad
          ? getSelectedOptionsById(appList)
          : getSelectedOptionsById(
              get(observability, "filterData.selectedApplications", [])
            ),
        fromDt: isInitialLoad
        ? initialStartDate
        : get(observability, "filterData.selectedDate.startDate"),
        toDt: isInitialLoad
        ? initialEndDate
        : get(observability, "filterData.selectedDate.endDate")
      };


      let incidentManagementPromiseData = await Promise.all([
        getIncidents(defaultPayload),
        getIncidentsPerCategory(defaultPayload),
        getMeanTimetoRecover(defaultPayload),
      ]);
      const IncidentManagementData = {
        incidentsData: get(
          incidentManagementPromiseData,
          "[0].data",
          []
        ),
        incidentsPerCategoryData: get(incidentManagementPromiseData, "[1].data", []),
        meanTimeRecoveryData: get(incidentManagementPromiseData, "[2].data", []),
      };
      setstate((state) => ({
        ...state,
        incidentMangementData: {
          ...state.incidentMangementData,
          ...IncidentManagementData,
        },
      }));
    },
    [state.incidentMangementData]
  );
  useEffect(() => {
    getAppList({})
      .unwrap()
      .then((appListResp) => {
        appList = appListResp;
        getIncidentManagement(true);
      });
  }, []);
  return (
  <>
  <DrillDownOffCanvas
        IncidentMangementData={state.incidentMangementData}
      />
  <Filter
      getFilteredData={getIncidentManagement}
      isShowSprintList={false} />
       <div className="dashboardwrap colswrap all-works">
        <div className="row">
          {OpsIncidentMangement?.map((chartType, index) => {
            return (
              <ChartContainer
                key={chartType}
                index={index}
                {...chartType}
                 IncidentMangementData={state.incidentMangementData}
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

export default memo(IncidentMangementLanding)