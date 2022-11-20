import React from 'react';
import * as d3 from 'd3';
import Chart from 'chart.js/auto'

export const useD3 = (renderChartFn, dependencies) => {
    const ref = React.useRef();
    React.useEffect(() => {
        renderChartFn(d3.select(ref.current));
        return () => {};
      }, [dependencies]);
    return ref;
}
export const useChartjs = (nodeRef, chartOptions) => {
  React.useEffect(() => {
    const renderedChart = new Chart(nodeRef.current, chartOptions);
    return () => {
      renderedChart.destroy();
    };
  }, [nodeRef, chartOptions]);

  return;
};