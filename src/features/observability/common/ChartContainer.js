import React, {useRef} from "react";

const ChartContainer = (props) => {
  const chartContainerRefs = useRef([])
  return (
    <>
      <div className={`${props.customClass ? props.customClass : "col-lg-4 col-md-6 filtercol"}`}>
        <div className="dashcol bg-white">
          <h4>{props.title}</h4>
          <div className="graphblock"  ref={el => (chartContainerRefs.current[props.index] = el)}>
            <div className={`graph-des-nav ${props.navContainerClass}`}>
              <ul>
                {props.navs?.map((nav, index) => (
                  <li key={index}>
                    <span className={nav.color}>{nav?.iconText}</span> {nav.text}
                  </li>
                ))}
              </ul>
            </div>
            {props?.axisLegend}
            {props?.chart({...props, chartContainerRefs})}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChartContainer;
