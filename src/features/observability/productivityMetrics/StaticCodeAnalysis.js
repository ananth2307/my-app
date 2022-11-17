import React, { memo } from "react";
import { useD3 } from "../../../hooks/useD3";
import { responsivefy } from "../../../app/utilities/helpers";
import * as d3 from "d3";
import { get } from "lodash";
import { useDispatch } from "react-redux";
import { setIsOffCanvasOpen } from "../../../app/commonSlice";

const StaticCodeAnalysis = (props) => {
  const dispatch = useDispatch();
  let tmpstaticCodedata = get(
    props,
    "productivityMetricsData.staticCodeAnalysisData",
    []
  );
  let staticCodedata = [];
  tmpstaticCodedata &&
    Object.keys(tmpstaticCodedata).map((key) => {
      key !== "totalIssues" &&
        staticCodedata.push({
          label: key,
          value: tmpstaticCodedata[key],
        });
    });
  const openDrillDown = (selectedIssue) => {
    dispatch(
      setIsOffCanvasOpen({
        isDrilldownOpen: true,
        title: props.title,
      })
    );
  };
  const ref = useD3(
    (svg) => {
      let data = staticCodedata;
      if (data.length) {
        let width = get(props, "chartContainerRefs.current[0].offsetWidth", 0);
        let height = 0.75 * width; //this is the double because are showing just the half of the pie
        let radius = 100;
        let labelr = radius + 30; // radius for label anchor
        //array of colors for the pie (in the same order as the dataset)
        let color = d3
          .scaleOrdinal()
          .range(["#167ad6", "#81A71A", "#fec82f", "#fda26b", "#fc543a"]);

        let vis = svg
          //create the SVG element inside the <body>
          .data([data]) //associate our data with the document
          .attr("width", width) //set the width and height of our visualization (these will be attributes of the <svg> tag
          .attr("height", height)
          .call(responsivefy)
          .append("svg:g") //make a group to hold our pie chart
          .on("click", function (d, i) {
          })
          .attr("transform", "translate(" + width / 2 + "," + 150 + ")"); //move the center of the pie chart from 0, 0 to radius, radius

        let arc = d3
          .arc() //this will create <path> elements for us using arc data
          .innerRadius(radius - 20)
          //                                .outerRadius(radius);
          .outerRadius(radius - 10); // full height semi pie
        //.innerRadius(0);
        let outerArc = d3
          .arc()
          .innerRadius(radius * 0.9)
          .outerRadius(radius * 0.9);

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
          .attr("class", "slice"); //allow us to style things in the slices (like text)

        arcs
          .append("svg:path")
          .attr("fill", function (d, i) {
            return color(i);
          }) //set the color for each slice to be chosen from the color function defined above
          .attr("d", arc) //this creates the actual SVG path using the associated data (pie) with the arc drawing function
          .on("click", (e, d) => {
            openDrillDown(d);
          });

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
            return d.value >= 2 ? null : "none";
          })
          .attr("font-size", "13")
          .text(function (d, i) {
            return d.value + "%";
          });

        //.text(function(d, i) { return data[i].label + " " + d.value + "%" });
      }
    },
    [staticCodedata]
  );
  return (
    <>
      <svg ref={ref}></svg>
    </>
  );
};
export default memo(StaticCodeAnalysis);
