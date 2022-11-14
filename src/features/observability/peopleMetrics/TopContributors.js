import React, { memo } from "react";
import * as d3 from "d3";
import { useD3 } from "../../../hooks/useD3";
import { get } from "lodash";
import { responsivefy } from "../../../app/utilities/helpers";

const TopAssignees = (props) => {
  const ref = useD3((svg) => {
    let data = [
      [
        { month: "May", value1: 15, value2: 5 },
        { month: "Jun", value1: 8, value2: 2 },
        { month: "Jul", value1: 13, value2: 8 },
        { month: "Aug", value1: 17, value2: 5 },
        { month: "Sep", value1: 9, value2: 4 },
      ],
      [
        { month: "May", value1: 10, value2: 3 },
        { month: "Jun", value1: 17, value2: 2 },
        { month: "Jul", value1: 12, value2: 4 },
        { month: "Aug", value1: 7, value2: 2 },
        { month: "Sep", value1: 15, value2: 4 },
      ],
      [
        { month: "May", value1: 17, value2: 5 },
        { month: "Jun", value1: 13, value2: 8 },
        { month: "Jul", value1: 8, value2: 2 },
        { month: "Aug", value1: 9, value2: 5 },
        { month: "Sep", value1: 10, value2: 4 },
      ],
    ];
    let divs = [".contributors", ".contributors2", ".contributors3"];

    var groupSpacing = 0;

    for (var m = 0; m < 3; m++) {
      var datax = data[m];

      var svg = d3
        .select(divs[m])
        .html("")
        .append("svg")
        .attr("width", 230) //set the width and height of our visualization (these will be attributes of the <svg> tag
        .attr("height", 230);
      let margin = { top: 30, right: 30, bottom: 0, left: 20 };
      let width = 200;
      let height = 150;
      let g = svg
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      //g = svg.append("g");

      var x0 = d3.scaleBand().rangeRound([0, width]).paddingInner(0.6);

      var x1 = d3.scaleBand().padding(0.05);

      var y = d3.scaleLinear().rangeRound([height, 0]);

      var z = d3.scaleOrdinal().range(["#c7de86", "#ec6665"]);

      var keys = Object.keys(datax[0]).slice(1);

      console.log(keys);

      x0.domain(
        datax.map(function (d) {
          return d.month;
        })
      );
      x1.domain(keys).rangeRound([0, x0.bandwidth()]);
      y.domain([
        0,
        d3.max(datax, function (d) {
          return d3.max(keys, function (key) {
            return d[key];
          });
        }),
      ]).nice();

      g.append("g")
        .selectAll("g")
        .data(datax)
        .enter()
        .append("g")
        .attr("transform", function (d) {
          return "translate(" + x0(d.month) + ",0)";
        })
        .selectAll("rect")
        .data(function (d) {
          return keys.map(function (key) {
            return { key: key, value: d[key] };
          });
        })
        .enter()
        .append("rect")
        .on("click", function (d, i) {
          console.log("open drill");
        })
        .attr("x", function (d) {
          return x1(d.key) + groupSpacing / 2;
        })
        .attr("y", function (d) {
          return y(d.value);
        })
        .attr("width", x1.bandwidth() - groupSpacing)
        .attr("height", function (d) {
          return height - y(d.value);
        })
        .attr("fill", function (d) {
          return z(d.key);
        });

      g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(
          d3.axisBottom(x0).tickSizeOuter(0).tickSizeInner(0).tickPadding(10)
        );

      g.append("g")
        .attr("class", "axis")
        .call(
          d3
            .axisLeft(y)
            .ticks(null, "s")
            .tickSizeOuter(0)
            .tickSizeInner(0)
            .tickPadding(10)
        )
        .append("text")
        .attr("x", 2)
        .attr("y", y(y.ticks().pop()) + 0.5)
        .attr("dy", "0.32em")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start")
        .text("");

      g.on("click", function () {
        console.log("open drill");
      });
    }
  }, []);

  return (
    <div
      class="contributor-wrap"
      id="contributorsContainer"
      style={{ justifyContent: "center" }}
    >
      <div class="contricol">
        <h3>Shriraam</h3>
        <div class="contributors" id="contributors"></div>
      </div>
      <div class="contricol">
        <h3>Kevin</h3>
        <div class="contributors2" id="contributors2"></div>
      </div>
      <div class="contricol">
        <h3>Lisha</h3>
        <div class="contributors3" id="contributors3"></div>
      </div>
    </div>
  );
};

export default memo(TopAssignees);
