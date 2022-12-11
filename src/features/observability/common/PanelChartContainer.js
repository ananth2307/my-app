import React, { useRef } from "react";

const PanelChartContainer = (props) => {
  const chartContainerRefs = useRef([]);
  return (
    <div class={`${props.customClass ? props.customClass : "col-md-4"}`}>
      <div
        class={`${
          props.customPanelClass ? props.customPanelClass : "panel-inner_class"
        }`}
      >
        {props.customHeader ? (
          props.customHeader()
        ) : (
          <label>{props.title}</label>
        )}
        <div className={props.chartContainerClass ?props.chartContainerClass:'chartContainerClass' }>
          {props?.chart?.({ ...props, chartContainerRefs })}
        </div>
      </div>
    </div>
  );
};

export default PanelChartContainer;
