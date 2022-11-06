import React from "react";
import * as d3 from "d3";
import { useD3 } from "../../../hooks/useD3";
import { truncate } from "../../../app/utilities/helpers";
import { isEmpty } from "lodash";

// const chartData1 = [
//   {
//     middle: "28%",
//     name: "ACPK Sprint 10.1_2022",
//     details: [
//       {
//         label: "Active Time",
//         value: 77,
//       },
//       {
//         label: "Wait Time",
//         value: 195,
//       },
//     ],
//   },
//   {
//     middle: "25%",
//     name: "ACPK Sprint 10.2_2022",
//     details: [
//       {
//         label: "Active Time",
//         value: 93,
//       },
//       {
//         label: "Wait Time",
//         value: 275,
//       },
//     ],
//   },
// ];

const FlowEfficiency = (props) => {
  let chartData = [];
  if (!isEmpty(props?.flowMetricsData?.flowEfficiency)) {
    for (let [key, value] of Object.entries(
      props?.flowMetricsData?.flowEfficiency
    )) {
      if (value.efficiency === "NaN") {
        value.efficiency = 0;
      }
      chartData.push({
        middle: Math.round(value.efficiency) + "%",
        name: key,
        details: [
          {
            label: "Active Time",
            value: Math.round(value.activeTime),
          },
          {
            label: "Wait Time",
            value: Math.round(value.waitTime),
          },
        ],
      });
    }
  }
  const ref = useD3(
    (svg) => {
      svg.html("");
      let maindata = chartData;

      let width = 400;
      let height = 400;

      svg
        .attr("width", width) //set the width and height of our visualization (these will be attributes of the <svg> tag
        .attr("height", height)
        .append("svg:g") //make a group to hold our pie chart
                 .attr('transform', 'translate(' + 0 + ', -' + 100 + ')'); //move the center of the pie chart from 0, 0 to radius, radius

      var divwidth = 415;

      var vist = null;

      for (var ij = 0; ij < maindata.length; ij++) {
        if (ij <= 2) {
          vist = svg
            .select("g")
            .append("svg") //create the SVG element inside the <body>
            .attr("width", divwidth / 3 + 10) //set the width and height of our visualization (these will be attributes of the <svg> tag
            .attr("height", 250)
            .attr("style", "overflow:visible")
            .append("svg:g") //make a group to hold our pie chart
            .attr("transform", "translate(" + (ij + 1) * 80 + "," + 150 + ")");
        } else {
          vist = svg
            .select("g")
            .append("svg") //create the SVG element inside the <body>
            .attr("width", divwidth / 3 + 10) //set the width and height of our visualization (these will be attributes of the <svg> tag
            .attr("height", 250)
            .attr("style", "overflow:visible")
            .append("svg:g") //make a group to hold our pie chart
            .attr("transform", "translate(" + (ij - 2) * 80 + "," + 250 + ")");

          /*
          var svg = d3
          .select('.donut')
          .append('svg') //create the SVG element inside the <body>
          .attr('width', divwidth/3 + 10) //set the width and height of our visualization (these will be attributes of the <svg> tag
          .attr('height', 250)
          .append('svg:g') //make a group to hold our pie chart
          .attr('transform', 'translate(' + 50 + ',' + 180 + ')');
          //.call(responsivefy); //move the center of the pie chart from 0, 0 to radius, radius

*/
        }

        let data = maindata[ij];
        var sprint = data.name;
        let width = divwidth / 3 - 30;
        var middle_text = data.middle;
        var name = truncate(data.name, 8);
        let height = 70; //this is the double because are showing just the half of the pie
        var radius = Math.min(width, height) / 2;
        var labelr = radius + 25; // radius for label anchor
        //array of colors for the pie (in the same order as the dataset)
        var color = d3.scaleOrdinal().range(["#B08AEC", "#EBDC7A", "#eaeaea"]);

        vist.data([data.details]); //associate our data with the document
        //.attr('width', 200) //set the width and height of our visualization (these will be attributes of the <svg> tag
        //.attr('height', 100);
        //.append('svg'); //make a group to hold our pie chart
        //.attr('transform', 'translate(' + (200) + ',' + 100 + ')'); //move the center of the pie chart from 0, 0 to radius, radius

        var arc = d3
          .arc() //this will create <path> elements for us using arc data
          .innerRadius(radius - 7)
          .outerRadius(radius - 4); // full height semi pie
        //.innerRadius(0);
        var outerArc = d3
          .arc()
          .innerRadius(radius * 1.2)
          .outerRadius(radius * 1.2);

        var pie = d3
          .pie() //this will create arc data for us given a list of values
          .startAngle(0 * (Math.PI / 135))
          .endAngle(270 * (Math.PI / 135))
          .padAngle(0.02) // some space between slices
          .sort(null) //No! we don't want to order it by size
          .value(function (d) {
            return d.value;
          }); //we must tell it out to access the value of each element in our data array

        var arcs = vist
          .selectAll("g.slice") //this selects all <g> elements with class slice (there aren't any yet)
          .data(pie) //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties)
          .enter() //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
          .append("svg:g") //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
          .on("click", function (d, i) {
            ("efficiency");
          })
          .attr("class", "slice"); //allow us to style things in the slices (like text)

        arcs
          .append("svg:path")
          .on("click", function (d, i) {
            ("efficiency");
          })
          .attr("fill", function (d, i) {
            return color(i);
          }) //set the color for each slice to be chosen from the color function defined above
          .attr("d", arc); //this creates the actual SVG path using the associated data (pie) with the arc drawing function

        arcs
          .append("svg:text")
          .attr("class", "labels") //add a label to each slice
          .attr("fill", "#000")
          .attr("transform", function (d) {
            var pos = outerArc.centroid(d);
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            return "translate(" + pos + ")";
          })
          .attr("text-anchor", "middle") //center the text on it's origin
          .text(function (d, i) {
            return data.details[i].value + " ";
          }); //get the label from our original data array

        arcs
          .append("svg:text")
          .text(middle_text + " ")
          .attr("dy", "0.3rem")
          .attr("class", "label")
          .attr("text-anchor", "middle");

        arcs
          .append("svg:text")
          .text(name + " ")
          .attr("dy", "55")
          .attr("class", "namelabel")
          .attr("text-anchor", "middle")
          .attr("sprint", sprint);
        arcs
          .select(".namelabel")
          .append("svg:title")
          .text(function (d, i) {
            return sprint;
          });
      }
    },
    [chartData]
  );
  return (
    <svg
      ref={ref}
      style={{
        height: 219,
        width: "100%",
        marginRight: "0px",
        marginLeft: "0px",
      }}
    ></svg>
  );
};

export default FlowEfficiency;
