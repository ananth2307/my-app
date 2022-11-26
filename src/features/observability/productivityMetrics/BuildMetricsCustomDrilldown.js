import React, { memo, useState } from "react";
import { useD3 } from "../../../hooks/useD3";
import * as d3 from "d3";
import { useSelector } from "react-redux";
import { cloneDeep, get, isEmpty } from "lodash";
import { failedCross, successCheck } from "../../../assets/images";
import DdDefaultSummary from "../../common/DrillDown/DdDefaultSummary";

const BuildMetricsCustomDrilldown = () => {
  const [state, setState] = useState({
    topSummary: [],
    bottomSummary: [],
  });
  const commonSliceState = useSelector((state) => state.common);
  const selectedData = get(commonSliceState, "offcanvasState.selectedData", []);
  const chartData = get(selectedData, "dateListItems", []);
  const totalLines = get(selectedData, "totalLines", 0);
  const totalViolations = get(selectedData, "totalViolations", 0);
  const deploySummary = (selectedMonth) => {
    let tempChartData = cloneDeep(chartData);
    !isEmpty(tempChartData) &&
      tempChartData.map((summary) => {
        if (summary.date == selectedMonth) {
          const { sucessData, failureData } = summary;
          setState({
            topSummary: sucessData,
            bottomSummary: failureData,
          });
        }
      });
  };
  const ref = useD3(
    (svg) => {
      svg.html("");
      let initStackedBarChart = {
        draw(config) {
          let me = this;
          let domEle = config.element;
          let stackKey = config.key;
          let data = config.data;
          let margin = { top: 20, right: 20, bottom: 30, left: 50 };
          let parseDate = d3.timeParse("%m/%Y");
          let width = 1000 - margin.left - margin.right;
          let height = 400 - margin.top - margin.bottom;
          let xScale = d3.scaleBand().range([0, width]).padding(0.7);
          let yScale = d3.scaleLinear().range([height, 0]);
          //color = d3.scaleOrdinal(d3.schemeCategory20),
          //xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%b")),
          let yAxis = d3.axisLeft(yScale);
          svg = svg
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr(
              "transform",
              "translate(" + margin.left + "," + margin.top + ")"
            );
          let color = d3.scaleOrdinal().range(["#A6CE38", "#EC6666"]);

          let x0 = d3.scaleBand().rangeRound([0, width]).paddingOuter(0.2);

          x0.domain(
            data.map(function (d) {
              return d.date;
            })
          );

          let stack = d3
            .stack()
            .keys(stackKey)
            .order(d3.stackOrderNone)
            .offset(d3.stackOffsetNone);

          let layers = stack(data);
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

          let layer = svg
            .selectAll(".layer")
            .data(layers)
            .enter()
            .append("g")
            .attr("class", "layer")
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
            .attr("class", "getdate")
            .on("click", function (d) {})
            .attr("Date", function (d) {
              return d.data.fullDate;
            })
            //.attr("transform", function (d) {  return "translate(" + x0(d.date) + ",0)"; })
            //.attr("x", function (d) { return x0(d.date); })
            .attr("x", function (d) {
              return xScale(d.data.date);
            })
            .attr("rx", 5)
            .attr("y", function (d) {
              return yScale(d[1]);
            })
            .attr("height", function (d) {
              return yScale(d[0]) - yScale(d[1]);
            })
            .attr("width", xScale.bandwidth())
            .on("click", (e, d) => deploySummary(get(d, "data.date", "")));

          svg
            .append("g")
            .attr("class", "")
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
            .attr("class", "")
            .attr("transform", "translate(0,0)")
            .call(yAxis);
        },
      };
      let key = ["lines", "violation"];
      initStackedBarChart.draw({
        data: chartData,
        key: key,
        element: "buildmetrics",
      });
    },
    [chartData]
  );
  return (
    <>
      <div class="graphdes drill_grap">
        <div class="destxt">
          <img src={successCheck} alt="sucess" />
          <p id="successCount">
            Success <span>{totalLines}</span>
          </p>
        </div>
        <div class="destxt">
          <img src={failedCross} alt="failed" />
          <p id="failedCount">
            Failed <span>{totalViolations}</span>
          </p>
        </div>
      </div>
      <svg ref={ref} />
      <div class="flow-descriptions-block flowpredi-des ">
        <DdDefaultSummary
          summaryTitle={`${selectedData?.summaryToptitle}: ${state.topSummary.length}`}
          summaryList={state.topSummary}
        />
      </div>
      <div class="flow-descriptions-block flowpredi-des ">
        <div class="stories-list">
          <DdDefaultSummary
            summaryTitle={`${selectedData?.summaryBottomtitle}: ${state.bottomSummary.length}`}
            summaryList={state.bottomSummary}
          />
        </div>
      </div>
    </>
  );
};

export default memo(BuildMetricsCustomDrilldown);
