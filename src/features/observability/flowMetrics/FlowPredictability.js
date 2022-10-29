import React from "react";
import * as d3 from "d3";
import { useD3 } from "../../../hooks/useD3";
import { truncate, responsivefy } from "../../../app/utilities/helpers";

const chartData = [
  {
    label: "ACPK Sprint 10.1_2022",
    value: 2,
    value2: 4,
  },
  {
    label: "ACPK Sprint 9.1_2022",
    value: 7,
    value2: 19,
  },
  {
    label: "ACPK Sprint 10.2_2022",
    value: 4,
    value2: 8,
  },
];

const FlowPredictability = (props) => {
  const ref = useD3(
    (svg) => {
      svg.html("");
      var ht = 415 / 2;

      var width = 415;
      var height = ht;
      /*var width = 500;
    var height = 250;*/ //this is the double because are showing just the half of the pie
      var radius = Math.min(width, height) / 2;
      var labelr = radius + 30; // radius for label anchor
      //array of colors for the pie (in the same order as the dataset)
      var color = d3
        .scaleOrdinal()
        .range(["#522e8e", "#522e8e", "#522e8e", "#522e8e"]);

      let data = chartData;

      var countv = 0,
        countv2 = 0;

      var vmin = 10000,
        vmax = 0;
      var v2min = 10000,
        v2max = 0;

      for (var t = 0; t < data.length; t++) {
        var obj = data[t];

        if (obj.value > vmax) vmax = obj.value;

        if (obj.value < vmin) vmin = obj.value;

        if (obj.value2 < vmin) vmin = obj.value2;

        if (obj.value2 > vmax) vmax = obj.value2;
      }

      /*
    for(var t=0; t < data.length; t++) {

        var obj = data[t];
        countv2 = countv2 + obj.value2;
    }


    countvavg = countv / data.length;
    countv2avg = countv2 / data.length;
*/

      var v1 = vmax + vmin;
      if (v1 < 1) v1 = 1;

      for (var t = 0; t < data.length; t++) {
        data[t].value3 = 8 + (12 * data[t].value) / v1;
      }

      for (var t = 0; t < data.length; t++) {
        data[t].value4 = 8 + (12 * data[t].value2) / v1;
      }

      const cxBase = (60 * width) / 390;
      const cxOffset = 40;

      var tau = 2 * Math.PI;

      var vis = svg //create the SVG element inside the <body>
        .data([data]) //associate our data with the document
        .attr("width", width) //set the width and height of our visualization (these will be attributes of the <svg> tag
        .attr("height", height)
        .append("svg:g"); //make a group to hold our pie chart

      // This function will iterate your data
      data.map(function (props, index) {
        var cx = cxBase * index + cxOffset; //

        var elem = vis.selectAll("div").data(data);

        var elemEnter = elem.enter().append("g").attr("class", "click_part");

        if (props.value2 > props.value) {
          elemEnter
            .append("circle")
            .attr("cx", cx)
            .attr("cy", 80)
            .attr("r", props.value4)
            .style("fill", "transparent")
            .style("stroke", "#9B9B9B")
            .style("stroke-dasharray", "3, 3");

          var circles = elemEnter
            .append("circle")
            .attr("cx", cx)
            .attr("cy", 80)
            .attr("r", props.value3)
            .on("click", function (d, i) {
              ("predict");
            })
            .style("fill", "#7AD2DE");
        } else if (props.value >= props.value2) {
          var circles = elemEnter
            .append("circle")
            .attr("cx", cx)
            .attr("cy", 80)
            .attr("r", props.value3)
            .style("fill", "#7AD2DE");

          elemEnter
            .append("circle")
            .attr("cx", cx)
            .attr("cy", 80)
            .attr("r", props.value4)
            .on("click", function (d, i) {
              ("predict");
            })
            .style("fill", "transparent")
            .style("stroke", "#9B9B9B")
            .style("stroke-dasharray", "3, 3");
        }

        elemEnter
          .append("text")
          .style("fill", "#9B9B9B")
          .attr("class", "glabel")
          .attr("dy", function (d) {
            return 25;
          })
          .attr("dx", function (d) {
            return cx - 20;
          })
          .text(function (d) {
            return props.value2;
          });

        elemEnter
          .append("text")
          .style("fill", "#7AD2DE")
          .attr("class", "blabel")
          .attr("dy", function (d) {
            return 25;
          })
          .attr("dx", function (d) {
            return cx + 5;
          })
          .text(function (d) {
            return props.value; /*+ " | "*/
          });

        elemEnter
          .append("text")
          .style("fill", "#000000")
          .attr("class", "labels")
          .attr("dy", function (d) {
            return 140;
          })
          .attr("sprint", props.label)
          .attr("dx", function (d) {
            return cx - truncate(props.label, 7).length * 3 + 3;
          })
          .text(function (d) {
            return truncate(props.label, 7);
          });

        elemEnter
          .select(".labels")
          .append("svg:title")
          .text(function (d, i) {
            return props.label;
          });
      });
    },
    [chartData]
  );
  return (
    <svg
      ref={ref}
      style={{
        height: 500,
        width: "100%",
        marginRight: "0px",
        marginLeft: "0px",
      }}
    ></svg>
  );
};

export default FlowPredictability;
