import React, { memo, useCallback } from "react";
import Filter from "../../../common/Filter";
import ChartContainer from "../../common/ChartContainer";
import { OpsChangeMangement } from "../../common/constants";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { observabilityApi } from "../../../../app/services/observabilityApi";
import { getDefaultSelectedDate } from "../../../common/helpers";
import { get } from "lodash";
import { getSelectedOptionsById } from "../../../../app/utilities/helpers";
import { DrillDownOffCanvas } from "../../../common";

const ChangeMangementLanding = () => {
  const [state, setstate] = useState({
    changeMangementData: {
      changeRequestData: {},
      changeRequestPerCategoryData: {},
      changeRequestPerRiskData: {},
      meanTimetoChangeData: {},
    },
    isShowDrillDown: false,
  });
  const { observability } = useSelector((state) => state);
  const [getAppList] = observabilityApi.useLazyGetAppListQuery({});
  const [getChangeRequest] = observabilityApi.useGetChangeRequestMutation();
  const [getChangeRequestPerCategory] =
    observabilityApi.useGetChangeRequestPerCategoryMutation();
  const [getChangeRequestPerRisk] =
    observabilityApi.useGetChangeRequestPerRiskMutation();
  const [getMeanTimetoChange] =
    observabilityApi.useGetMeanTimetoChangeMutation();
  let appList = [];
  let { initialStartDate, initialEndDate } = getDefaultSelectedDate();
  initialStartDate = new Date(initialStartDate).getTime();
  initialEndDate = new Date(initialEndDate).getTime();
  const getChangeManagement = useCallback(
    async (isInitialLoad = false) => {
      const defaultPayload = {
        cmdbId: isInitialLoad
          ? getSelectedOptionsById(appList)
          : getSelectedOptionsById(
              get(observability, "filterData.selectedApplications", [])
            ),
        fromDate: isInitialLoad
          ? initialStartDate
          : get(observability, "filterData.selectedDate.startDate"),
        toDate: isInitialLoad
          ? initialEndDate
          : get(observability, "filterData.selectedDate.endDate"),
        type: "",
      };

      let changeMangementDataPromiseData = await Promise.all([
        getChangeRequest(defaultPayload),
        getChangeRequestPerCategory(defaultPayload),
        getChangeRequestPerRisk(defaultPayload),
        getMeanTimetoChange(defaultPayload),
      ]);
      const changeManagementData = {
        changeRequestData: get(changeMangementDataPromiseData, "[0].data", []),
        changeRequestPerCategoryData: get(
          changeMangementDataPromiseData,
          "[1].data",
          []
        ),
        changeRequestPerRiskData: get(
          changeMangementDataPromiseData,
          "[2].data",
          []
        ),
        meanTimetoChangeData: get(
          changeMangementDataPromiseData,
          "[3].data",
          []
        ),
      };
      setstate((state) => ({
        ...state,
        changeMangementData: {
          ...state.changeMangementData,
          ...changeManagementData,
        },
      }));
    },
    [state.changeMangementData, observability.filterData]
  );
  useEffect(() => {
    getAppList({})
      .unwrap()
      .then((appListResp) => {
        appList = appListResp;
        getChangeManagement(true);
      });
  }, []);
  return (
    <>
      <DrillDownOffCanvas ChangeMangementData={state.changeMangementData} />
      <Filter getFilteredData={getChangeManagement} isShowSprintList={false} />
      <div className="dashboardwrap colswrap all-works">
        <div className="row">
          {OpsChangeMangement?.map((chartType, index) => {
            return (
              <ChartContainer
                key={chartType}
                index={index}
                {...chartType}
                ChangeMangementData={state.changeMangementData}
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

export default memo(ChangeMangementLanding);
