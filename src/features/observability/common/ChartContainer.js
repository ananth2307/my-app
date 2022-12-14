import React, { useRef } from "react";

const ChartContainer = (props) => {
  const chartContainerRefs = useRef([]);
  return (
    <>
      <div
        className={`${
          props.customClass ? props.customClass : "col-lg-4 col-md-6 filtercol"
        }`}
      >
        <div className="dashcol bg-white">
          {props.customHeader ? props.customHeader() : <h4>{props.title}</h4>}
          <div
            className="graphblock"
            ref={(el) => (chartContainerRefs.current[props.index] = el)}
          >
            {props.navs && <div className={`graph-des-nav ${props.navContainerClass}`}>
              <ul>
                {props.navs?.map((nav, index) => (
                  <li key={index}>
                    <span className={nav.color}>{nav?.iconText}</span>{" "}
                    {nav.text}
                  </li>
                ))}
              </ul>
            </div>}
            <div className={props.chartContainerClass}>
              {props?.chart?.({ ...props, chartContainerRefs })}
            </div>
            <div className="chart-legend-container"></div>
            {props?.axisLegend}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChartContainer;
