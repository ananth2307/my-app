import React from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Collapse } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setPanelVisibility } from "../observabilitySlice";
import { get } from "lodash";
import PanelChartContainer from "../common/PanelChartContainer";

const PanelContainer = (props) => {
  const dispatch = useDispatch();
  const panelState = useSelector((state) => state.observability?.panelState);
  return (
    <div class="panel panel-filled panel-collapse home-pipes">
      <div
        class="panel-heading"
        // onClick={() => {
        //   dispatch(setPanelVisibility(props.name));
        // }}
      >
        <div class="panel-tools" id="plan-toggle" data-part="false">
          <a
            class="panel-toggle"
            onClick={() => {
              dispatch(setPanelVisibility(props.name));
            }}
          >
            {get(panelState, `is${props.name}Open`, false) ? (
              <FaChevronUp />
            ) : (
              <FaChevronDown />
            )}
          </a>
        </div>
        <span
          className={
            get(panelState, `is${props.name}Open`, false) ? "activespan" : ""
          }
        >
          {props.title}
        </span>
      </div>
      <Collapse in={get(panelState, `is${props.name}Open`, false)}>
        <div>
          <div class="panel-body ld-loading">
          {props.body }
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default PanelContainer;
