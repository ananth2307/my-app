import React, { memo } from "react";
import * as d3 from "d3";
import { useD3 } from "../../../hooks/useD3";
import { cloneDeep, get, isEmpty, map, truncate } from "lodash";
import { responsivefy } from "../../../app/utilities/helpers";

const LevelOfCOllabaration = (props) => {
  const collaborationdata = [
    {
      type: "features",
      comments: 35,
      month: "Oct",
      monthnum: 1,
    },
    {
      type: "debt",
      comments: 3,
      month: "Oct",
      monthnum: 1,
    },
    {
      type: "enablers",
      comments: 25,
      month: "Oct",
      monthnum: 1,
    },
    {
      type: "prodFix",
      comments: 0,
      month: "Oct",
      monthnum: 1,
    },
    {
      type: "risk",
      comments: 0,
      month: "Oct",
      monthnum: 1,
    },
    {
      type: "bugs",
      comments: 32,
      month: "Oct",
      monthnum: 1,
    },
    {
      type: "features",
      comments: 14,
      month: "Nov",
      monthnum: 2,
    },
    {
      type: "debt",
      comments: 3,
      month: "Nov",
      monthnum: 2,
    },
    {
      type: "enablers",
      comments: 10,
      month: "Nov",
      monthnum: 2,
    },
    {
      type: "prodFix",
      comments: 0,
      month: "Nov",
      monthnum: 2,
    },
    {
      type: "risk",
      comments: 0,
      month: "Nov",
      monthnum: 2,
    },
    {
      type: "bugs",
      comments: 17,
      month: "Nov",
      monthnum: 2,
    },
  ];
  const ref = useD3((svg) => {
    // let width = get(props, "chartContainerRefs.current[1].offsetWidth", 415);
    const width = 415;
    let data = collaborationdata;
    let dataGroup = d3
      .group(data, d => d.type)

    let color = d3
      .scaleOrdinal()
      .range([
        "#147ad6",
        "#ff8000",
        "#ec6666",
        "#af8beb",
        "#e9d96d",
        "#fcbb4b",
      ]);

    let vis = svg
      .attr("width", width)
      .attr("height", width * 0.7)
      .call(responsivefy);
    const WIDTH = width,
      HEIGHT = width * 0.6,
      MARGINS = {
        top: 20,
        right: 20,
        bottom: 10,
        left: 30,
      },
      lSpace = WIDTH / dataGroup.length;

    let xScale = d3
      .scaleBand()
      .range([0, WIDTH])
      .domain(
        data.map(function (d) {
          return d.month;
        })
      )
      .padding(1);

    let yScale = d3
      .scaleLinear()
      .range([HEIGHT - MARGINS.top, MARGINS.bottom])
      .domain([
        d3.min(data, function (d) {
          return 0;
        }),
        d3.max(data, function (d) {
          return d.comments;
        }),
      ]);
    let xAxis = d3.axisBottom().scale(xScale).tickSizeOuter(0).tickSizeInner(0);

    let yAxis = d3.axisLeft().scale(yScale).tickSizeOuter(0).tickSizeInner(0);

    vis
      .append("svg:g")
      .attr("class", "x axis specialaxis")
      .attr(
        "transform",
        "translate(" + MARGINS.left + "," + (HEIGHT - MARGINS.bottom) + ")"
      )
      .call(xAxis);

    vis
      .append("svg:g")
      .attr("class", "y axis specialaxis")
      .attr("transform", "translate(" + MARGINS.left + ",10)")
      .call(yAxis);

    let lineGen = d3
      .line()
      .x(function (d) {
        return xScale(d.month);
      })
      .y(function (d) {
        return yScale(d.comments);
      })
      .curve(d3.curveBasis);

    dataGroup.forEach(function (d, i) {
      vis
        .append("svg:path")
        .attr("d", lineGen(d.values))
        .attr("stroke", function (d, j) {
          return color(i);
        })
        .attr("stroke-width", 2)
        .attr("id", "line_" + d.key)
        .attr("fill", "none")
        .attr("transform", "translate(" + MARGINS.left + ",10)")
    });
  }, []);

  return (
    <>
      <svg
        ref={ref}
        style={{
          viewBox: "0 0 300 150",
          preserveAspectRatio: "xMinYMid",
          width: "100%",
          height: "251",
          overflow: "scroll",
        }}
      ></svg>
    </>
  );
};

export default memo(LevelOfCOllabaration);
