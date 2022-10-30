import React from "react";
import * as d3 from "d3";
import { useD3 } from "../../../hooks/useD3";
const data = [
  {
    sprint: "ACPK Sprint 10.1_2022",
    value1: 2,
    value2: 4,
    value3: 1,
    value4: 2,
    value5: 3,
    value6: 5,
    total: 17,
  },
  {
    sprint: "ACPK Sprint 7.2_2022",
    value1: 0,
    value2: 8,
    value3: 0,
    value4: 3,
    value5: 0,
    value6: 0,
    total: 11,
  },
  {
    sprint: "ACPK Sprint 8.2_2022",
    value1: 1,
    value2: 3,
    value3: 0,
    value4: 4,
    value5: 0,
    value6: 0,
    total: 8,
  },
  {
    sprint: "ACPK Sprint 9.2_2022",
    value1: 4,
    value2: 3,
    value3: 4,
    value4: 6,
    value5: 2,
    value6: 2,
    total: 21,
  },
  {
    sprint: "ACPK Sprint 8.1_2022",
    value1: 3,
    value2: 0,
    value3: 1,
    value4: 3,
    value5: 1,
    value6: 0,
    total: 8,
  },
  {
    sprint: "ACPK Sprint 9.1_2022",
    value1: 9,
    value2: 6,
    value3: 5,
    value4: 10,
    value5: 5,
    value6: 9,
    total: 44,
  },
  {
    sprint: "ACPK Sprint 7.1_2022",
    value1: 0,
    value2: 1,
    value3: 0,
    value4: 0,
    value5: 0,
    value6: 0,
    total: 1,
  },
  {
    sprint: "ACPK Sprint 10.2_2022",
    value1: 4,
    value2: 11,
    value3: 2,
    value4: 5,
    value5: 1,
    value6: 2,
    total: 25,
  },
];

const FlowDistribution = (props) => {
  const ref = useD3(
    (svg) => {
      let divwidth = 415,
        divheight = 500;
      let g = svg
        .append("g")
        .attr("transform", "translate(" + 60 + "," + 10 + ")");

      var y = d3
        .scaleBand() // x = d3.scaleBand()
        .rangeRound([0, divheight - 0.25 * divheight]) // .rangeRound([0, width])
        .paddingInner(0.7)
        .align(0.2);

      var x = d3
        .scaleLinear() // y = d3.scaleLinear()
        .rangeRound([25, divwidth * 0.68]); // .rangeRound([height, 0]);

      var z = d3
        .scaleOrdinal()
        .range([
          "#4E9BE1",
          "#ff8000",
          "#F08C8C",
          "#C3A7F1",
          "#F6EB9C",
          "#FCCC78",
        ]);

      let json_data = data;

      var columns = Object.keys(json_data[0]);

      var keys = columns.slice(1);

      y.domain(
        json_data.map(function (d) {
          return d.sprint;
        })
      ); // x.domain...
      x.domain([
        0,
        d3.max(json_data, function (d) {
          return d.total;
        }),
      ]).nice(); // y.domain...
      z.domain(keys);

      g.append("g")
        .selectAll("g")
        .data(d3.stack().keys(keys)(json_data))
        .enter()
        .append("g")
        .attr("fill", function (d) {
          return z(d.key);
        })
        .selectAll("rect")
        .data(function (d) {
          return d;
        })
        .enter()
        .append("rect")
        .attr("rx", 6)
        .attr("ry", 6)
        .attr("y", function (d) {
          return y(d.data.sprint);
        }) //.attr("x", function(d) { return x(d.data.State); })
        .attr("x", function (d) {
          return x(d[0]);
        }) //.attr("y", function(d) { return y(d[1]); })
        .attr("width", function (d) {
          return x(d[1]) - x(d[0]);
        }) //.attr("height", function(d) { return y(d[0]) - y(d[1]); })
        .attr("height", y.bandwidth()); //.attr("width", x.bandwidth());

      var yaxis = g
        .append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(0,0)")
        .call(d3.axisLeft(y).tickSizeOuter(0).tickSizeInner(0))
        .selectAll("text")
        .attr("text-anchor", "start")
        .attr("x", -35) //padding of 4px
        .attr("fill", "#000")
        .attr("font-weight", "400"); //   .call(d3.axisBottom(x));

      svg
        .select(".y.axis")
        .selectAll(".tick")
        .append("svg:title")
        .text(function (d, i) {
          return json_data[i].sprint;
        });

      g.append("g")
        .attr("transform", "translate(0," + 0.8 * divheight + ")") // New line
        .call(d3.axisBottom(x).tickSizeOuter(0).tickSizeInner(0).ticks(6)) //  .call(d3.axisLeft(y).ticks(null, "s"))
        .append("text")
        .selectAll("text")
        .attr("y", 0) //     .attr("y", 2)
        .attr("x", x(x.ticks().pop()) + 1.5) //     .attr("y", y(y.ticks().pop()) + 0.5)
        .attr("dy", "0.32em") //     .attr("dy", "0.32em")
        .attr("fill", "#000")
        .attr("transform", "rotate(-65)")
        .attr("font-weight", "100")
        .attr("text-anchor", "start");
    },
    [data]
  );
  console.log("redis fd", props.flowMetricsData);
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

export default FlowDistribution;
