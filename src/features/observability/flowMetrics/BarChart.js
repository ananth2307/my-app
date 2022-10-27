import { useD3 } from "../../../hooks/useD3";
import React from "react";
import * as d3 from "d3";

function BarChart({data}) {
  const ref = useD3(
    (svg) => {
        svg.html("");
      const divheight = 415;
      const divwidth = 500;
      let g = svg.append("g").attr("transform", "translate(" + 60 + "," + 10 + ")");

      var y = d3
        .scaleBand() // x = d3.scaleBand()
        .range([0, divheight - 0.25 * divheight])
        .round(true) // .rangeRound([0, width])
        .paddingInner(0.7)
        .align(0.2);

      var x = d3
        .scaleLinear() // y = d3.scaleLinear()
        .range([25, divwidth * 0.68]) // .rangeRound([height, 0]);

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

      let columns = [
        "sprint",
        "value1",
        "value2",
        "value3",
        "value4",
        "value5",
        "value6",
      ];

      var keys = columns.slice(1);
      y.domain(
        data.map(function (d) {
          return d.sprint;
        })
      ); // x.domain...
      x.domain([
        0,
        d3.max(data, function (d) {
          return d.total;
        }),
      ]).nice(); // y.domain...
      z.domain(keys);

      g.append("g")
        .selectAll("g")
        .data(d3.stack().keys(keys)(data))
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
        .attr("x", 25) //.attr("y", function(d) { return y(d[1]); })
        .attr("width", 30) //.attr("height", function(d) { return y(d[0]) - y(d[1]); })
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

      console.log(yaxis);

      svg
        .select(".y.axis")
        .selectAll(".tick")
        .append("svg:title")
        .text(function (d, i) {
          return data[i].sprint;
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
        .attr("text-anchor", "start")
    },
    [data.length]
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
