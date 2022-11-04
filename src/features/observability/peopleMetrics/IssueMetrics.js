import React from "react";
import { get } from "lodash";
import $ from "jquery";
import * as d3 from "d3";
const data1 = [
  {
    name: "blocker",
    value: 13,
    fill: "#fc543a",
  },
  {
    name: "critical",
    value: 59,
    fill: "#fda26b",
  },
  {
    name: "high",
    value: 118,
    fill: "#fec82f",
  },
  {
    name: "medium",
    value: 15,
    fill: "#81A71A",
  },
  {
    name: "low",
    value: 65,
    fill: "#167ad6",
  },
];

function responsivefy(svg) {
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
}

let intl;

function process_issuemetrics(issuedata = data1) {
  intl = setInterval(() => {
    $("#issue_metrics").empty();
    var width = document.getElementById("issue_metrics").offsetWidth;
    if (width) {
      clearInterval(intl);
    }
    var height = 0.8 * width; //this is the double because are showing just the half of the pie

    var radius = width / 2 - width / 4;
    var labelr = radius + 30; // radius for label anchor
    //array of colors for the pie (in the same order as the dataset)
    var color = d3
      .scaleOrdinal()
      .range(["#fc543a", "#fda26b", "#fec82f", "#81A71A", "#167ad6"]);

    let data = issuedata;
    /*data = [
        { label: 'Low', value: 55 },
        { label: 'Medium', value: 20 },
        { label: 'High', value: 10 },
        { label: 'Critical', value: 10 },
        { label: 'Blockers', value: 5 }
    ];*/

    var count = 0;

    for (var t = 0; t < data.length; t++) {
      var obj = data[t];
      count = count + obj.value;
    }

    for (var t = 0; t < data.length; t++) {
      var obj = data[t];
      obj.perc = (obj.value * 100) / count;
      if (obj.perc == "NaN") {
        obj.perc = 0;
      }
      /*if(obj.perc > 40)
            obj.perc = 40;

        if(obj.perc < 15)
            obj.perc = 15;*/
      data[t].value = obj.perc.toFixed(2);
    }

    var vis = d3
      .select("#issuemetrics")
      .append("svg") //create the SVG element inside the <body>
      .data([data]) //associate our data with the document
      .attr("width", width) //set the width and height of our visualization (these will be attributes of the <svg> tag
      .attr("height", height)
      // .call(responsivefy)
      .append("svg:g") //make a group to hold our pie chart

      .attr("transform", "translate(" + width / 2 + "," + 150 + ")"); //move the center of the pie chart from 0, 0 to radius, radius

    var arc = d3
      .arc() //this will create <path> elements for us using arc data
      .innerRadius(radius - 20)
      //                                .outerRadius(radius);
      .outerRadius(radius - 10); // full height semi pie
    //.innerRadius(0);
    var outerArc = d3
      .arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

    var pie = d3
      .pie() //this will create arc data for us given a list of values
      .startAngle(0 * (Math.PI / 135))
      .endAngle(270 * (Math.PI / 135))
      .padAngle(0.1) // some space between slices
      .sort(null) //No! we don't want to order it by size
      .value(function (d) {
        return d.value;
      }); //we must tell it out to access the value of each element in our data array

    var arcs = vis
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
      .attr("d", arc); //this creates the actual SVG path using the associated data (pie) with the arc drawing function

    var pos = d3
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
    // .text(function(d, i) { return d.perc + "%" });
    //.text(function(d, i) { return data[i].label + " " + d.value + "%" });
  }, 500);
}
// process_issuemetrics()

const IssueMetrics = (props) => {
  const width = get(
    props,
    "chartContainerRefs.current[props.index].offsetWidth",
    415
  );
  const radius = width / 2 - width / 4;
  return <></>;
};

export default IssueMetrics;
