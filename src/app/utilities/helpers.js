import * as d3 from "d3";
import { map } from "lodash";

export const getSelectedOptionsValue = (options=[]) => {
  return map(options, "value");
};
export const getSelectedOptionsById = (options=[]) => {
  const stringArray = map(options, "id")
  return stringArray.map(item => item.toString());
  // return map(options, "id")
}; 
export const filterOptions = (optionsProps, searchText, setState) => {
  setState(
    optionsProps?.filter((option) => option.label?.includes(searchText))
  );
};
export const getPercentage = (value,total) => {
  let percentVal = 0;
  if(value !== 0 && total !== 0) {
      percentVal = (value/total)*100;
      percentVal = percentVal.toFixed(2);
  }
  return percentVal;
}
export const truncate = (input, leng) => {
  if (input.length > leng) {
    return input.substring(0, leng) + "...";
  }
  return input;
};

export const responsivefy = (svg) => {
  // container will be the DOM element
  // that the svg is appended to
  // we then measure the container
  // and find its aspect ratio
  const container = d3.select(svg.node().parentNode),
    width = parseInt(svg.style("width"), 10),
    height = parseInt(svg.style("height"), 10),
    aspect = width / height;

  var doit;
  // set viewBox attribute to the initial size
  // control scaling with preserveAspectRatio
  // resize svg on inital page load
  svg
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMinYMid")
    .call(resize);

  // add a listener so the chart will be resized
  // when the window resizes
  // multiple listeners for the same event type
  // requires a namespace, i.e., 'click.foo'
  // api docs: https://goo.gl/F3ZCFr
  d3.select(window).on("resize." + container.attr("id"), resize);

  // this is the code that resizes the chart
  // it will be called on load
  // and in response to window resizes
  // gets the width of the container
  // and resizes the svg to fill it
  // while maintaining a consistent aspect ratio

  function resizedw() {
    const w = parseInt(container.style("width"));
    svg.attr("width", w);
    svg.attr("height", Math.round(w / aspect));
  }

  function resize() {
    clearTimeout(doit);
    doit = setTimeout(resizedw, 200);
  }
};
