import React, { memo, useCallback, useEffect, useState } from "react";
import { codeContainer } from "../../common/constants";
import PanelChartContainer from "../../common/PanelChartContainer";
import { useSelector } from "react-redux";
import { observabilityApi } from "../../../../app/services/observabilityApi";
import { getSelectedOptionsValue } from "../../../../app/utilities/helpers";
import { get } from "lodash";
const CodeLanding = (props) => {
  const panelState = useSelector((state) => state.observability?.panelState);
  const [state, setState] = useState({
    codeData: {
      topContributorsData: {},
      projectChampionsData: {},
    },
  });

  const { observability } = useSelector((state) => state);
  const [getCodeTopContributors] =
    observabilityApi.useGetCodeTopContributorsMutation();
  const [getCodeProjectChampions] =
    observabilityApi.useGetCodeProjectChampionsMutation();

  const getcodeData = useCallback(async () => {
    const defaultPayload = {
      appCodes: getSelectedOptionsValue(
        get(observability, "filterData.selectedApplications", [])
      ),
      projects: getSelectedOptionsValue(
        get(observability, "filterData.selectedProjects", [])
      ),
      sprintName: getSelectedOptionsValue(
        get(observability, "filterData.selectedSprints", [])
      ),
      // startDt: get(observability, "filterData.selectedDate.startDate"),
      // toDt:get(observability, "filterData.selectedDate.endDate"),
      startDt: 1648751400000,
      toDt: 1669873594667,
    };
    let codePromiseData = await Promise.all([
      getCodeTopContributors(defaultPayload),
      getCodeProjectChampions(defaultPayload),
    ]);

    const codeData = {
      topContributorsData: get(codePromiseData, "[0].data", []),
      projectChampionsData: get(codePromiseData, "[1].data", []),
    };

    setState((state) => ({
      ...state,
      codeData: { ...state.codeData, ...codeData },
    }));
  }, [state.codeData, observability.filterData]);
  useEffect(() => {
    get(panelState, "isCodeOpen", false) && getcodeData();
  }, [observability.filterData, panelState]);
  return (
    <>
      {codeContainer.map((chartType, index) => (
        <PanelChartContainer
          key={chartType}
          index={index}
          {...chartType}
          codeData={state.codeData}
        >
          {chartType.component}
        </PanelChartContainer>
      ))}
    </>
  );
};

export default memo(CodeLanding);
