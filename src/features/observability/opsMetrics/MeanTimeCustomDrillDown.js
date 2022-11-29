import { get, isEmpty } from "lodash";
import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import MeanTimeDrill from "./MeanTimeDrill";
import DdDefaultSummary from "../../common/DrillDown/DdDefaultSummary";
import { getDefaultIncidentClass } from "../../common/helpers";
import { useState } from "react";
import { setSelectedLevelOne } from "../../../app/commonSlice";
import { Collapse } from "react-bootstrap";
import { IncidentLabels, ChangeLabels } from "../../common/constants";

const MeanTimeCustomDrillDown = ({ TopHeader }) => {
  const dispatch = useDispatch();
  const commonSliceState = useSelector((state) => state.common);
  const selectedLevelOne = get(
    commonSliceState,
    "drillDownSelectionState.selectedLevelOne",
    []
  );
  const selectedData = get(commonSliceState, "offcanvasState.selectedData", []);
  const [state, setState] = useState({
    labels: TopHeader.left === "INCIDENT TYPE" ? IncidentLabels : ChangeLabels,
  });
  const onSelectLvlOne = (label) => {
    setState((state) => ({
      ...state,
      labels: state.labels.map((item) =>
        item.label === label ? { ...item, open: !item.open } : item
      ),
    }));
    dispatch(setSelectedLevelOne(label));
  };
  return (
    <div class="accordian-wrap">
      <div class="meantime-head btmline">
        <div class="intype">{TopHeader.left}</div>
        <div class="mtr">{TopHeader.right}</div>
      </div>
      <div class="accordion accordion-flush">
        {!isEmpty(state.labels) &&
          state.labels.map((items, i) => (
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button
                  class={
                    state.labels.find((labels) => labels.label === items.label)
                      .open
                      ? "accordion-button"
                      : "accordion-button collapsed"
                  }
                  onClick={() => onSelectLvlOne(items.label)}
                >
                  <div class="intype">
                    <div
                      class={`${getDefaultIncidentClass(items.label)} ${
                        selectedLevelOne === items.label ? "active" : ""
                      }`}
                      key={items.label}
                    >
                      <h4>{items.label}</h4>
                      <h2>
                        {selectedData[items.label]
                          ? selectedData[items.label].value
                          : 0}
                      </h2>
                    </div>
                  </div>
                  <MeanTimeDrill
                    meanTimeData={
                      selectedData[items.label]
                        ? selectedData[items.label].meanTimeData
                        : {}
                    }
                  />
                </button>
              </h2>
              <Collapse
                in={
                  state.labels.find((labels) => labels.label === items.label)
                    .open
                }
              >
                <div class="accordion-collapse">
                  <div class="accordion-body">
                    <DdDefaultSummary
                      summaryTitle={TopHeader}
                      summaryList={get(
                        selectedData[selectedLevelOne],
                        "summaryList",
                        []
                      )}
                    />
                  </div>
                </div>
              </Collapse>
            </div>
          ))}
      </div>
    </div>
  );
};

export default memo(MeanTimeCustomDrillDown);
