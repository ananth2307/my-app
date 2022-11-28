import { get } from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedLevelOne } from "../../../app/commonSlice";

const DdDefaultLevelOne = (props) => {
  const dispatch = useDispatch();
  const offcanvasState = useSelector((state) => state.common?.offcanvasState);
  const selectedData = get(offcanvasState, "selectedData", []);
  const drillDownSelectionState = useSelector(
    (state) => state?.common?.drillDownSelectionState
  );
  const count = get(
    offcanvasState,
    `selectedData.${props.level.name}.count`,
    0
  );
  const onSelectLvlOne = () => {
    selectedData.DdLevelOneBoxClick &&
      selectedData.customSummaryListCall(props.level.name, offcanvasState);

    dispatch(setSelectedLevelOne(props.level.name));
  };

  return (
    <div
      className={`${props.level.className} ${
        selectedData.opsMetricsCustomDrillDown
          ? count > 0
            ? "vaild"
            : "disabled"
          : drillDownSelectionState?.selectedLevelOne === props?.level?.name
          ? "active"
          : ""
      }`}
      onClick={onSelectLvlOne}
      key={props.level.name}
    >
      {!selectedData.customBoxHeaders && <h4>{props?.level?.title}</h4>}
      {selectedData.customBoxHeaders ? (
        selectedData.customBoxHeaders(
          selectedData[props?.level?.name],
          props.level.title
        )
      ) : (
        <h2 class="fdcount">{count}</h2>
      )}
    </div>
  );
};

export default DdDefaultLevelOne;
