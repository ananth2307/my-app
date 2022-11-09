import React, { memo } from "react";
import * as d3 from "d3";
import { useD3 } from "../../../hooks/useD3";
import { cloneDeep, get, isEmpty, map, truncate } from "lodash";
import { responsivefy } from "../../../app/utilities/helpers";

const IssueMetrics = (props) => {
  const issuedata = [
    {
        "label": "blocker",
        "value": 0
    },
    {
        "label": "critical",
        "value": 6
    },
    {
        "label": "high",
        "value": 127
    },
    {
        "label": "medium",
        "value": 17
    },
    {
        "label": "low",
        "value": 13
    }
]
  const ref = useD3((svg) => {
    let width = get(props, 'chartContainerRefs.current[0].offsetWidth', 0);
    let height = 0.8 * width; //this is the double because are showing just the half of the pie

    let radius = width / 2 - width / 4;

    //array of colors for the pie (in the same order as the dataset)
    let color = d3
      .scaleOrdinal()
      .range(["#fc543a", "#fda26b", "#fec82f", "#81A71A", "#167ad6"]);

    let data = issuedata;

    let count = 0;

    for (let t = 0; t < data.length; t++) {
      let obj = data[t];
      count = count + obj.value;
    }

    for (let t = 0; t < data.length; t++) {
      let obj = data[t];
      obj.perc = (obj.value * 100) / count;
      console.log(obj.perc);
      if (obj.perc == "NaN") {
        obj.perc = 0;
      }
      data[t].value = obj.perc.toFixed(2);
    }

    let vis = svg //create the SVG element inside the <body>
      .data([data]) //associate our data with the document
      .attr("width", width) //set the width and height of our visualization (these will be attributes of the <svg> tag
      .attr("height", height)
      .call(responsivefy)
      .append("svg:g") //make a group to hold our pie chart

      .attr("transform", "translate(" + width / 2 + "," + 150 + ")"); //move the center of the pie chart from 0, 0 to radius, radius

    let arc = d3
      .arc() //this will create <path> elements for us using arc data
      .innerRadius(radius - 20)
      .outerRadius(radius - 10); // full height semi pie

    let pie = d3
      .pie() //this will create arc data for us given a list of values
      .startAngle(0 * (Math.PI / 135))
      .endAngle(270 * (Math.PI / 135))
      .padAngle(0.1) // some space between slices
      .sort(null) //No! we don't want to order it by size
      .value(function (d) {
        return d.value;
      }); //we must tell it out to access the value of each element in our data array

    let arcs = vis
      .selectAll("g.slice") //this selects all <g> elements with class slice (there aren't any yet)
      .data(pie) //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties)
      .enter() //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
      .append("svg:g") //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
      .attr("class", "slice");

    arcs
      .append("svg:path")
      .attr("fill", function (d, i) {
        return color(i);
      }) //set the color for each slice to be chosen from the color function defined above
      .attr("d", arc); //this creates the actual SVG path using the associated data (pie) with the arc drawing function

    let pos = d3
      .arc()
      .innerRadius(radius + 20)
      .outerRadius(radius + 20);

    arcs
      .append("svg:text")
      .attr("transform", function (d) {
        return "translate(" + pos.centroid(d) + ")";
      })
      .attr("dy", 5)
      .attr("text-anchor", "middle")
      .attr("fill", function (d, i) {
        return color(i);
      }) //Colorarray Labels
      .attr("display", function (d) {
        return d.value >= 1 ? null : "none";
      })
      // .attr("display", function(d) { return d.perc >= 1 ? null : "none"; })
      .attr("font-size", "13")
      .text(function (d, i) {
        return d.value + "%";
      });
  }, [issuedata]);

  return (
    <>
      <svg
        ref={ref}
        style={{
          viewBox: "0 0 300 150",
          preserveAspectRatio: "xMinYMid",
          width: "100%",
          height: "251",
          overflow: "scroll",
        }}
      ></svg>
    </>
  );
};

export default memo(IssueMetrics);
