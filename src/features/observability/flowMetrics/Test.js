import { useD3 } from "../../../hooks/useD3";
import React from "react";
import * as d3 from "d3";

function BarChart({data1}) {
  const ref = useD3(
    (svg) => {
      // set the dimensions and margins of the graph
      const margin = { top: 10, right: 30, bottom: 90, left: 40 },
        width = 460 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

      // append the svg object to the body of the page
      svg
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Parse the Data
      d3.csv(
        "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv"
      ).then(function (data) {
        // X axis
        const x = d3
          .scaleBand()
          .range([0, width])
          .domain(
            data.map(function (d) {
              return d.Country;
            })
          )
          .padding(1);
        svg
          .append("g")
          .attr("transform", `translate(0, ${height})`)
          .call(d3.axisBottom(x))
          .selectAll("text")
          .attr("transform", "translate(-10,0)rotate(-45)")
          .style("text-anchor", "end");

        // Add Y axis
        const y = d3.scaleLinear().domain([0, 13000]).range([height, 0]);
        svg.append("g").call(d3.axisLeft(y));

        // Lines
        svg
          .selectAll("myline")
          .data(data)
          .enter()
          .append("line")
          .attr("x1", function (d) {
            return x(d.Country);
          })
          .attr("x2", function (d) {
            return x(d.Country);
          })
          .attr("y1", function (d) {
            return y(d.Value);
          })
          .attr("y2", y(0))
          .attr("stroke", "grey");

        // Circles
        svg
          .selectAll("mycircle")
          .data(data)
          .join("circle")
          .attr("cx", function (d) {
            return x(d.Country);
          })
          .attr("cy", function (d) {
            return y(d.Value);
          })
          .attr("r", "4")
          .style("fill", "#69b3a2")
          .attr("stroke", "black");
      });
    },
    [data1]
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

export default BarChart;