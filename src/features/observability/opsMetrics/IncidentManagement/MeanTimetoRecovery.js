import React, { memo } from "react";
import { useD3 } from "../../../../hooks/useD3";
import * as d3 from "d3";
import { get } from "lodash";

const MeanTimetoRecovery = (props) => {
  let meanTimeData = [
    { label: "Shortest", value: 20, days: "1d" },
    { label: "Average", value: 30, days: "3d" },
    { label: "Longest", value: 50, days: "11d" },
  ];
  const ref = useD3(
    (svg) => {
      let width = get(props, "chartContainerRefs.current[2].offsetWidth", 1)+30;
      let height = 300; //this is the double because are showing just the half of the pie
      let radius = Math.min(width, height) / 2;
      let labelr = radius + 30; // radius for label anchor
      //array of colors for the pie (in the same order as the dataset)
      let color = d3
        .scaleOrdinal()
        .range(["#522E8E", "#522E8E", "#522E8E", "#522E8E"]);

      let data = meanTimeData;

      const cxBase = 120;
      const cxOffset = 50;

      let tau = 2 * Math.PI;

      let vis = svg //create the SVG element inside the <body>
        .data([data]) //associate our data with the document
        .attr("width", width) //set the width and height of our visualization (these will be attributes of the <svg> tag
        .attr("height", height)

        .append("svg:g"); //make a group to hold our pie chart

      // This function will iterate your data
      data.map(function (props, index) {
        let cx = cxBase * index + cxOffset; //

        let elem = vis.selectAll("div").data(data);

        let elemEnter = elem.enter().append("g").attr("class", "mcircle");

        let circles = elemEnter
          .append("circle")
          .attr("cx", cx)
          .attr("cy", 100)
          .attr("r", props.value)
          .style("fill", "#522E8E");

        elemEnter
          .append("text")
          .attr("class", "labels")
          .style("fill", "#ffffff")
          .attr("dy", function (d) {
            return 105;
          })
          .attr("dx", function (d) {
            return cx - props.days.length * 3.5;
          })
          .text(function (d) {
            return props.days;
          });

        elemEnter
          .append("text")
          .attr("class", "labels2")
          .style("fill", "#000000")
          .attr("dy", function (d) {
            return 95 - props.value;
          })
          .attr("dx", function (d) {
            return cx - props.label.length * 3.5;
          })
          .text(function (d) {
            return props.label;
          });
      });
    },
    [meanTimeData]
  );
  return <svg ref={ref} />;
};

export default memo(MeanTimetoRecovery);
