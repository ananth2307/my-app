import React, { memo } from "react";
import { useD3 } from "../../../hooks/useD3";
import * as d3 from "d3";
import { get } from "lodash";
import * as bootstrap from "bootstrap";
import { failedCross, successCheck } from "../../../assets/images";

const BuildMterics = (props) => {
  const tmpBuildMetricsData = get(
    props,
    "productivityMetricsData.buildMetricsData",
    []
  );
  const buildMetricsData = [];
  let totalViolations = 0;
  let totalLines = 0;
  tmpBuildMetricsData.length > 0 &&
    tmpBuildMetricsData.map((dt) => {
      if (dt.hasOwnProperty("month") && dt?.status) {
        let violations = 0;
        let lines = 0;
        dt.status.map((items) => {
          const { FAILURE, SUCCESS } = items;
          buildMetricsData.push({
            date: dt.month.slice(0, 3),
            violation: (violations += FAILURE),
            lines: (lines += SUCCESS),
          });
          totalViolations += FAILURE;
          totalLines += SUCCESS;
        });
      }
    });
  let buildCount = totalViolations + totalLines;
  let buildObject = {
    failure: totalViolations,
    sucess: totalLines,
    buildCount: buildCount,
    sucessPercent: ((totalViolations / buildCount) * 100).toFixed(1),
  };
  console.log(
    totalViolations,
    totalLines,
    buildMetricsData,
    tmpBuildMetricsData
  );
  const ref = useD3(
    (svg) => {
      var initStackedBarChart = {
        draw: function (config) {
          let me = this;
          let domEle = config.element;
          let stackKey = config.key;
          let data = config.data;
          let margin = { top: 20, right: 10, bottom: 30, left: 20 };
          let parseDate = d3.timeParse("%m/%Y");
          let width = 290 - margin.left - margin.right;
          let height = 250 - margin.top - margin.bottom;
          let xScale = d3.scaleBand().range([0, width]).padding(0.7);
          let yScale = d3.scaleLinear().range([height, 0]);
          //    let //color = d3.scaleOrdinal(d3.schemeCategory20),
          //    let //xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%b")),
          let yAxis = d3.axisLeft(yScale);
          svg
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr(
              "transform",
              "translate(" + margin.left + "," + margin.top + ")"
            );
          var color = d3.scaleOrdinal().range(["#A6CE38", "#EC6666"]);

          var x0 = d3.scaleBand().rangeRound([0, width]).paddingOuter(0.2);

          x0.domain(
            data.map(function (d) {
              return d.date;
            })
          );

          var stack = d3
            .stack()
            .keys(stackKey)
            .order(d3.stackOrderNone)
            .offset(d3.stackOffsetNone);

          var layers = stack(data);
          //data.sort(function(a, b) { return b.total - a.total; });
          xScale.domain(
            data.map(function (d) {
              return d.date;
            })
          );
          yScale
            .domain([
              0,
              d3.max(layers[layers.length - 1], function (d) {
                return d[0] + d[1];
              }),
            ])
            .nice();

          var layer = svg
            .selectAll(".layer")
            .data(layers)
            .enter()
            .append("g")
            .attr("class", "layer")
            .on("click", function (d, i) {})
            .style("fill", function (d, i) {
              return color(i);
            });

          layer
            .selectAll("rect")
            .data(function (d) {
              return d;
            })
            .enter()
            .append("rect")
            //.attr("transform", function (d) {  return "translate(" + x0(d.date) + ",0)"; })
            //.attr("x", function (d) { return x0(d.date); })
            .attr("x", function (d) {
              return xScale(d.data.date);
            })
            .attr("rx", 5)
            .attr("class", "getMonth")
            .attr("month", function (d) {
              return d.data.date;
            })
            .attr("y", function (d) {
              return yScale(d[1]);
            })
            .attr("height", function (d) {
              return yScale(d[0]) - yScale(d[1]);
            })
            .attr("width", xScale.bandwidth());

          svg
            .append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + (height + 5) + ")")
            .call(
              d3
                .axisBottom(x0)
                .tickSizeOuter(0)

                .tickPadding(1)
            );
          //.tickPadding(10);

          svg
            .append("g")
            .attr("class", "axis axis--y")
            .attr("transform", "translate(40,0)")
            .call(yAxis);
        },
      };
      var data = buildMetricsData;
      if (data.length > 0) {
        var key = ["lines", "violation"];
        initStackedBarChart.draw({
          data: data,
          key: key,
          element: "buildmetrics",
        });
      }
    },
    [buildMetricsData]
  );
  return (
    <>
      <div class="bldmtr-block">
        <div class="bldmtr-left" id="buildCount">
          <h3>
            Build <span>{buildObject?.buildCount}</span>
          </h3>
        </div>
        <div class="bldmtr-right" id="successPerc">
          <h3>
            Success Rate <span>{buildObject?.sucessPercent}%</span>
          </h3>
        </div>
      </div>
      <div class="graphcontainer">
        <div class="graphdes">
          <div class="destxt">
            <img src={successCheck} alt="sucess-check" />
            <p id="successCount">
              Success <span>{buildObject?.sucess}</span>
            </p>
          </div>
          <div class="destxt">
            <img src={failedCross} alt="failed-crosss" />
            <p id="failedCount">
              Failed <span>{buildObject?.failure}</span>
            </p>
          </div>
        </div>
        <svg ref={ref}></svg>
      </div>
    </>
  );
};
export default memo(BuildMterics);
