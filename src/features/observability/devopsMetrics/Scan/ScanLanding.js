import React, { memo, useCallback, useEffect, useState } from "react";
import { scanContainer } from "../../common/constants";
import PanelChartContainer from "../../common/PanelChartContainer";
import { useSelector } from "react-redux";
import { observabilityApi } from "../../../../app/services/observabilityApi";
import { getSelectedOptionsValue } from "../../../../app/utilities/helpers";
import { get } from "lodash";

const ScanLanding = (props) => {
  const panelState = useSelector((state) => state.observability?.panelState);
  const [state, setState] = useState({
    scanData: {
        codeAnalysisData:{},
        staticCodeAnalysisData:{}
  },
  });

  const { observability } = useSelector((state) => state);
  const [getScanLineOfCode] = observabilityApi.useGetScanLineOfCodeMutation();
  const [getScanStaticCodeAnalysis] = observabilityApi.useGetScanStaticCodeAnalysisMutation();

  const getscanData = useCallback(
    async () => {
      const defaultPayload = {
        appCodes:getSelectedOptionsValue(
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
        startDt: 1667241000000,
        toDt: 1669832999999
      };
      let scanPromiseData = await Promise.all([
        getScanLineOfCode(defaultPayload),
        getScanStaticCodeAnalysis(defaultPayload)
      ]);

      const scanData = {
        codeAnalysisData: get(scanPromiseData, "[0].data", []),
        staticCodeAnalysisData: get(scanPromiseData, "[1].data", []),
        
      };

      setState((state) => ({
        ...state,
        scanData: { ...state.scanData, ...scanData },
      }));
    },
    [state.scanData,observability.filterData]
  );
  useEffect(() => {
    get(panelState, "isScanOpen",false) && getscanData();
  }, [observability.filterData,panelState]);
  return(
    <div class='row'>  
        {scanContainer.map((chartType, index) => (
          <PanelChartContainer
            key={chartType}
            index={index}
            {...chartType}
            scanData={state.scanData}
          >
            {chartType.component}
          </PanelChartContainer>
        ))}
      
    </div>
  );
};

export default memo(ScanLanding);
