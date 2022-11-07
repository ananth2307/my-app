import { useD3 } from "../../../hooks/useD3";
import React, { memo } from "react";
import * as d3 from "d3";
import { get, isEmpty, truncate } from "lodash";
import { getMonth } from "../../common/constants";

function FlowVelocity(props) {
  let chartData = []
  if(!isEmpty(props?.flowMetricsData?.flowVelocity)){
  // eslint-disable-next-line array-callback-return
  props?.flowMetricsData?.flowVelocity.filter((items) => {
    if(items.month !== undefined && items.daysToComplete!==undefined &&items.issuesCompleted!==undefined){
    let tempData ={
      month:getMonth[items.month-1],
      days:items.daysToComplete/items.issuesCompleted,
      issues:items.issuesCompleted,
      monthno:items.month.toString()
    }
    chartData.push(tempData)
    }
  })
}

  const ref = useD3(
    (svg1) => {
      svg1.html("");
      // set the dimensions and margins of the graph
      const margin = { top: 50, right: 30, bottom: 20, left: 40 },
        width = 438 - margin.left - margin.right,
        height = 257 - margin.top - margin.bottom;

      // append the svg object to the body of the page
      var svg = svg1
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      let json_data = chartData;

      var tdays = 0,
        tissues = 0,
        daysmax = 0,
        issuesmax = 0;
      for (var t = 0; t < json_data.length; t++) {
        tdays = tdays + json_data[t].days;
        tissues = tissues + json_data[t].issues;

        if (json_data[t].days > daysmax) {
          daysmax = json_data[t].days;
        }

        if (json_data[t].issues > issuesmax) {
          issuesmax = json_data[t].issues;
        }
      }

      for (var t = 0; t < json_data.length; t++) {
        json_data[t].daysx = (json_data[t].days / tdays) * 100;

        if (json_data[t].daysx > 25) json_data[t].daysx = 25;

        if (json_data[t].daysx < 10) json_data[t].daysx = 10;

        json_data[t].issuesx = (json_data[t].issues / tissues) * 100;

        if (json_data[t].issuesx > 25) json_data[t].issuesx = 25;

        if (json_data[t].issuesx < 10) json_data[t].issuesx = 10;
      }

      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          json_data.map(function (d) {
            return d.month;
          })
        )
        .padding(1);

      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("text-anchor", "middle");

      // Add Y axis
      var y = d3
        .scaleLinear()
        .domain([0, daysmax + 10])
        .range([height, 0]);

      var q = d3.scaleLinear().domain([0, 100]).range([height, 0]);

      svg.append("g").call(d3.axisLeft(y).tickSizeOuter(0).tickSizeInner(0));

      // Lines
      svg
        .selectAll("myline")
        .data(json_data)
        .enter()
        .append("line")
        .attr("x1", function (d) {
          return x(d.month);
        })
        .attr("x2", function (d) {
          return x(d.month);
        })
        .attr("y1", function (d) {
          return y(d.days);
        })
        .attr("y2", y(0))
        .attr("stroke", "#4E9BE1")
        .style("stroke-width", "8px");

      // Circles
      svg
        .selectAll("mycircle")
        .data(json_data)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
          return x(d.month);
        })
        .attr("cy", function (d) {
          return y(d.days) - d.issuesx;
        })
        .attr("r", function (d) {
          return d.issuesx;
        })
        .style("fill", "#F28B8C")
        .attr("stroke", "#F28B8C");

      svg
        .append("g")
        .selectAll("text")
        .data(json_data)
        .enter()
        .append("text")
        .text((d) => d.issues)
        .attr("font-size", 12) //font size
        .attr("fill", "#fff")
        .attr("class", "islabel")
        .attr("dx", function (d) {
          return x(d.month) - 5;
        }) //positions text towards the left of the center of the circle
        .attr("dy", function (d) {
          return y(d.days) - d.issuesx + 5;
        });
    },
    [chartData]
  );
  // }

  return (
    <div
      ref={ref}
    ></div>
  );
}

export default memo(FlowVelocity);
