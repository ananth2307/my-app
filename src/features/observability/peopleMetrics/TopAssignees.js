import React, { memo } from "react";
import * as d3 from "d3";
import { useD3 } from "../../../hooks/useD3";
import { get } from "lodash";
import { responsivefy } from "../../../app/utilities/helpers";

const TopAssignees = (props) => {
  const projectstatusdata = [
    {
      label: "Vignesh",
      value: 8,
      color: "#fec830",
      fullName: "Vignesh Ramankutty",
    },
    {
      label: "Kevin",
      value: 8,
      color: "#fec830",
      fullName: "Kevin Ramachandran",
    },
    {
      label: "Arun",
      value: 10,
      color: "#81A71A",
      fullName: "Arun Paramasivam",
    },
    {
      label: "Ramkumar",
      value: 22,
      color: "#7bd2de",
      fullName: "Ramkumar Ramaselvan",
    },
  ];
  const ref = useD3((svg) => {
    let width = get(props, "chartContainerRefs.current[2].offsetWidth", 0);
    var height = width * 0.75; //this is the double because are showing just the half of the pie
    var radius = Math.min(width, height) / 2;
    //var labelr = radius + 30; // radius for label anchor
    //array of colors for the pie (in the same order as the dataset)
    var color = d3
      .scaleOrdinal()
      .range(["#522e8e", "#522e8e", "#522e8e", "#522e8e"]);

    let data = projectstatusdata;
    /*data = [
       { label: 'Ahead', value: 50, color: "#7bd2de" },
       { label: 'On Track', value: 90, color: "#81A71A" },
       { label: 'Warning', value: 40, color: "#fec830" },
       { label: 'Delayed', value: 60, color: "#fc543a" }
   ];*/

    const cxBase = (width - 20) / 3;
    const cxOffset = cxBase / 3 + 40;

    //var tau = 2 * Math.PI;

    var count = 0;

    for (var t = 0; t < data.length; t++) {
      var obj = data[t];
      count = count + obj.value;
      console.log(data);
      /*var option = "<option value='"+data[t].fullName+"'>"+data[t].label+"</option>";
              $("#assignee_drop").append(option);*/
    }
    for (var t = 0; t < data.length; t++) {
      var obj = data[t];
      obj.perc = (obj.value * 100) / count;
      if (obj.perc == "NaN") {
        obj.perc = 0;
      }
      if (obj.perc > 40) obj.perc = 40;

      if (obj.perc < 15) obj.perc = 15;
    }

    var vis = svg //create the SVG element inside the <body>
      .data([data]) //associate our data with the document
      .attr("width", width) //set the width and height of our visualization (these will be attributes of the <svg> tag
      .attr("height", height)
      .call(responsivefy)
      .append("svg:g"); //make a group to hold our pie chart

    // This function will iterate your data
    data.map(function (props, index) {
      var cx = cxBase * index + cxOffset;

      var elem = vis.selectAll("div").data(data);

      var elemEnter = elem.enter().append("g");

      var circles = elemEnter
        .append("circle")
        .attr("cx", cx)
        .attr("cy", (height * 2) / 3)
        .attr("r", props.perc * 1.1)
        .on("click", function (d, i) {
          console.log("open drill")
        })
        .style("fill", props.color);

      elemEnter
        .append("text")
        .style("fill", "#ffffff")
        .attr("dy", function (d) {
          return (height * 2) / 3 + 5;
        })
        .attr("dx", function (d) {
          return cx - 9;
        })
        .text(function (d) {
          return props.value;
        })
        .on("click", function (d, i) {
          console.log("Open Drill")
        });

      elemEnter
        .append("text")
        .style("fill", "#000000")
        .attr("font-size", 12)
        .attr("dy", function (d) {
          return (height * 2) / 3 - 30 - props.perc / 2;
        })
        .attr("dx", function (d) {
          return cx - props.label.length * 3.5;
        })
        .text(function (d) {
          return props.label;
        })
        .on("click", function (d, i) {
          console.log("Open Drill")
        });
    });
  }, []);

  return (
    <>
      <svg
        ref={ref}
      ></svg>
    </>
  );
};

export default memo(TopAssignees);
