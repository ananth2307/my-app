import { findLast, get } from "lodash";
import React, { memo, useState } from "react";
import { useSelector } from "react-redux";
import DdDefaultLevelOne from "../../common/DrillDown/DdDefaultLevelOne";
import DdDefaultSummary from "../../common/DrillDown/DdDefaultSummary";
import { dDDefaultLevelOne } from "../common/constants";
import MeanTimeCustomDrillDown from "./MeanTimeCustomDrillDown";
import MeanTimeDrill from "./MeanTimeDrill";

const OpsMetricsCustomDrillDown = ({ boxTitle, summaryTitle,totalTitle }) => {
  const commonSliceState = useSelector((state) => state.common);
  const selectedData = get(commonSliceState, "offcanvasState.selectedData", []);
  const topBoxHeaders = get(selectedData, "driiDownTopHeaderBoxData", []);
  const selectedLevelOne = get(
    commonSliceState,
    "drillDownSelectionState.selectedLevelOne",
    []
  );
  const [state, setstate] = useState({
    activeHeader: "",
  });
  const onSelectLvlOne = (label) => {
    selectedData.customSummaryListCall &&
      selectedData.customSummaryListCall(label);
    setstate({ activeHeader: label });
  };
  return (
    <>
      <div class="managerow">
        <div class="manage-fst-col">
          <h4>{totalTitle}</h4>
          <h2>{findLast(topBoxHeaders)?.total}</h2>
        </div>
        {topBoxHeaders.map((items) => (
          <div
            class={`${items.className} ${
              state.activeHeader === items.label ? "active" : ""
            }`}
            onClick={() => onSelectLvlOne(items.label)}
            key={items.label}
          >
            <h4>{items.label}</h4>
            <h2>{items.value}</h2>
          </div>
        ))}
      </div>
      {selectedData.isMTBIhide ? " " : <MeanTimeDrill
      meanTimeData={get(selectedData, "meanTimeData", [])} />}
      <div class="incidnt-wrap">
        <h3 class="txt-upper">{boxTitle}</h3>
        <div class="incidnt-numbox">
          {dDDefaultLevelOne.map((level) => (
            <DdDefaultLevelOne key={level.name} level={level} />
          ))}
        </div>
      </div>
      <div class="flow-descriptions-block">
        <DdDefaultSummary
          summaryTitle={summaryTitle}
          summaryList={get(selectedData[selectedLevelOne], "summaryList", [])}
        />
      </div>
    </>
  );
};

export default memo(OpsMetricsCustomDrillDown);
