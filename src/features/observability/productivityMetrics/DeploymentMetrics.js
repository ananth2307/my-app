import React, { memo } from "react";
import { useD3 } from "../../../hooks/useD3";
import * as d3 from "d3";
import { failedCross, successCheck } from "../../../assets/images";

const DeploymentMetrics = (props) => {
  const data = [
    { date: "Mar", violation: 600, lines: 1500 },
    { date: "Apr", violation: 1002, lines: 1200 },
    { date: "May", violation: 2000, lines: 3500 },
    { date: "Jun", violation: 2400, lines: 5000 },
    { date: "Jul", violation: 2400, lines: 5500 },
  ];
  const ref = useD3(
    (svg) => {
      let initStackedBarChart = {
        draw: function (config) {
          let me = this;
          let domEle = config.element;
          let stackKey = config.key;
          let data = config.data;
          let margin = { top: 20, right: 20, bottom: 30, left: 50 };
          let parseDate = d3.timeParse("%m/%Y");
          let width = 400 - margin.left - margin.right;
          let height = 200 - margin.top - margin.bottom;
          let xScale = d3.scaleBand().range([0, width]).padding(0.7);
          let yScale = d3.scaleLinear().range([height, 0]);
          //  let //color = d3.scaleOrdinal(d3.schemeCategory20),
          //  let //xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%b")),
          let yAxis = d3.axisLeft(yScale);
          svg
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
            //.attr("transform", function (d) {  return "translate(" + x0(d.date) + ",0)"; })
            //.attr("x", function (d) { return x0(d.date); })
            .on("click", function (d, i) {
              console.log(d);
            })
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
            .attr("width", xScale.bandwidth());

          svg
            .append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + (height + 5) + ")")
            .call(d3.axisBottom(x0).tickSizeOuter(0).tickPadding(1));
          //.tickPadding(10);
          svg
            .append("g")
            .attr("class", "axis axis--y")
            .attr("transform", "translate(35,20)")
            .call(yAxis);
        },
      };
      let key = ["lines", "violation"];
      initStackedBarChart.draw({
        data: data,
        key: key,
        element: "sitdeploymentmetrics",
      });
    },
    [data]
  );
  return (
    <>
      <div class="row deprow">
        <div class="col-lg-4 depcol">
          <div class="depmtr-block">
            <div class="depmtr-top">
              <h3>
                Deployment <span id="to_deploy">376</span>
              </h3>
            </div>
            <div class="depmtr-btm">
              <h3>
                Average Success Rate <span id="AVSR_id">0%</span>
              </h3>
            </div>
          </div>
        </div>
        <div class="col-lg-8">
          <div class="row deploycharts">
            <div class="col-lg-4 col-md-6 sratecol">
              <div class="sraterow">
                <div class="srate-unit sunit-red">
                  SIT <span>119</span>
                </div>
                <div class="srate-des">
                  <div class="sdestxt">
                    <img src={successCheck} />
                    <p>
                      Success <span>82</span>
                    </p>
                  </div>
                  <div class="sdestxt">
                    <img src={failedCross} />
                    <p>
                      Failed <span>37</span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="srate-mtr">Success Rate: 69%</div>
              <div class="srtae-graph">
                <div class="sitdeploymentmetrics" id="sitdeploymentmetrics">
                  {" "}
                  <svg ref={ref}></svg>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 sratecol">
              <div class="sraterow">
                <div class="srate-unit sunit-pink">
                  UAT <span>130</span>
                </div>
                <div class="srate-des">
                  <div class="sdestxt">
                    <img src={successCheck} />
                    <p>
                      Success <span>88</span>
                    </p>
                  </div>
                  <div class="sdestxt">
                    <img src={failedCross} />
                    <p>
                      Failed <span>42</span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="srate-mtr">Success Rate: 67%</div>
              <div class="srtae-graph">
                <div class="sitdeploymentmetrics2" id="sitdeploymentmetrics2">
                  {" "}
                  <svg ref={ref}></svg>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 sratecol">
              <div class="sraterow">
                <div class="srate-unit sunit-blue">
                  Qa <span>127</span>
                </div>
                <div class="srate-des">
                  <div class="sdestxt">
                    <img src={successCheck} />
                    <p>
                      Success <span>89</span>
                    </p>
                  </div>
                  <div class="sdestxt">
                    <img src={failedCross} />
                    <p>
                      Failed <span>38</span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="srate-mtr">Success Rate: 70%</div>
              <div class="srtae-graph">
                <div class="sitdeploymentmetrics3" id="sitdeploymentmetrics3">
                  {" "}
                  <svg ref={ref}></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default memo(DeploymentMetrics);
