import { useD3 } from "../../../hooks/useD3";
import React from "react";
import * as d3 from "d3";

function FlowVelocity() {
  const data = [
    {
      month: "Oct",
      days: 30,
      issues: 130000,
      year: 2021,
      monthno: "10",
    },
    {
      month: "Nov",
      days: 10.846153846153847,
      issues: 100,
      year: 2021,
      monthno: "10",
    },
    {
      month: "Dec",
      days: 15,
      issues: 1,
      year: 2021,
      monthno: "10",
    },
    {
      month: "Jan",
      days: 10.5,
      issues: 13,
      year: 2022,
      monthno: "10",
    },
    {
      month: "Feb",
      days: 8.3,
      issues: 53,
      year: 2022,
      monthno: "10",
    },
  ];
  const ref = useD3(
    (svg) => {
      svg.html("");
      // set the dimensions and margins of the graph
      const margin = { top: 10, right: 30, bottom: 90, left: 40 },
        width = 415 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

      // append the svg object to the body of the page
      svg
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // X axis
      const x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.month;
          })
        )
        .padding(1);
      var tdays = 0,
        tissues = 0,
        daysmax = 0,
        issuesmax = 0;

      for (let t = 0; t < data.length; t++) {
        tdays = tdays + data[t].days;
        tissues = tissues + data[t].issues;

        if (data[t].days > daysmax) {
          daysmax = data[t].days;
        }

        if (data[t].issues > issuesmax) {
          issuesmax = data[t].issues;
        }
      }
      for (let t = 0; t < data.length; t++) {
        data[t].daysx = (data[t].days / tdays) * 100;

        if (data[t].daysx > 25) data[t].daysx = 25;

        if (data[t].daysx < 10) data[t].daysx = 10;

        data[t].issuesx = (data[t].issues / tissues) * 100;

        if (data[t].issuesx > 25) data[t].issuesx = 25;

        if (data[t].issuesx < 10) data[t].issuesx = 10;
      }
      svg
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      // Add Y axis
      const y = d3
        .scaleLinear()
        .domain([0, daysmax + 10])
        .range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      svg.append("g").call(d3.axisLeft(y).tickSizeOuter(0).tickSizeInner(0));

      // Lines
      svg
        .selectAll("myline")
        .data(data)
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
        .data(data)
        .join("circle")
        .attr("cx", function (d) {
          return x(d.month);
        })
        .attr("cy", function (d) {
          return y(d.days);
        })
        .attr("r", function (d) {
          return d.issuesx;
        })
        .style("fill", "#F28B8C")
        .attr("stroke", "#F28B8C");

      svg
        .append("g")
        .selectAll("text")
        .data(data)
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
    [data]
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
}

export default FlowVelocity;
