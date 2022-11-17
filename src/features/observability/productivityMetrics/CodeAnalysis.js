import React, { memo, useRef } from "react";
import { useD3 } from "../../../hooks/useD3";
import * as d3 from "d3";
import { cloneDeep, get, set } from "lodash";
import * as bootstrap from "bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setIsOffCanvasOpen } from "../../../app/commonSlice";
import { observabilityApi } from "../../../app/services/observabilityApi";
import { getMonth } from "../../common/constants";
import { getSelectedOptionsValue } from "../../../app/utilities/helpers";
import Chart from 'chart.js/auto'
const CodeAnalysis = (props) => {
  const codeAnalysisRef = useRef();
  const dispatch = useDispatch();
  const [getLineOfCodeDatewise] =
    observabilityApi.useGetLineOfCodeDatewiseMutation();
  const tmpCodeAnalysisData = get(
    props,
    "productivityMetricsData.codeAnalysisData",
    []
  );
  let codeAnalysisData =
    tmpCodeAnalysisData.length > 0 &&
    tmpCodeAnalysisData?.map((items) => {
      const { date, lines, violations } = items;
      return {
        month: date.replace(/[\s\d+]/g, ""),
        value1: lines,
        value2: violations,
      };
    });
  const dropDownLabels = codeAnalysisData.length > 0 && [
    ...new Set(codeAnalysisData.map((item) => item.month)),
  ];
  const getDrillDownData = async () =>
    await getLineOfCodeDatewise({
      appCodes: [
        "ACT",
        "CODE8",
        "DAAS",
        "DOME",
        "AIFT",
        "MAT",
        "PII",
        "PROMOKART",
      ],
      projects: [],
      sprintName: [],
      startDt: 1664562600000,
      toDt: 1668623340000,
      // startDt: get(observability,'filterData.selectedDate.startDate'),
      // toDt: get(observability,'filterData.selectedDate.endDate')
    });
  const getDaysInMonth = (month, year) => {
    console.log("dasds", month, year);
    let monthIndex = getMonth.findIndex((item) => item === month);
    var date = new Date(year, monthIndex, 1);
    var days = [];
    while (date.getMonth() === monthIndex) {
      days.push(
        new Date(date).getDate() +
          " " +
          getMonth[monthIndex] +
          " " +
          new Date(date).getFullYear().toString().slice(2)
      );
      date.setDate(date.getDate() + 1);
    }
    return days;
  };
  const getSelectedData = (data, month) => {
    let tmpData = cloneDeep(data);
    let codeAnalysisViolationsData = [];
    let codeAnalysisLineData = [];
    let selectedData = {};
    selectedData.days = getDaysInMonth(month, new Date().getFullYear());
    selectedData.days.map(dayMonth => {
      let dataforCurrent = tmpData.find((item) => item.date === dayMonth);
        if (dataforCurrent !== undefined && dataforCurrent !== null) {
          codeAnalysisViolationsData.push(dataforCurrent.violations);
          codeAnalysisLineData.push(dataforCurrent.lines);
        }
        else{
          codeAnalysisViolationsData.push(0)
          codeAnalysisLineData.push(0)
        }
  })
  selectedData.codeAnalysisLineData = codeAnalysisLineData;
  selectedData.codeAnalysisViolationsData = codeAnalysisViolationsData;
    selectedData.customDrillDownCanvas = (days,codeAnalysisLineData,codeAnalysisViolationsData,codeAnalysisRef) => {
      const canvasRef = codeAnalysisRef.current.getContext("2d")
      const data = {
        labels: days,
        datasets: [
          {
            label: "No.Of Lines",
            data: codeAnalysisLineData,
            backgroundColor: ["#7bd1dd"],
            borderWidth: 1,
          },
          {
            label: "Violations",
            data: codeAnalysisViolationsData,
            backgroundColor: ["#f95537"],
            borderWidth: 1,
          },
        ],
      };
      const config = {
        type: "bar",
        data: data,
        options: {
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              grid: {
                display: false,
              },
            },
          },
        },
      };
      const myChart = new Chart(
        canvasRef,
        config
    );
    return(
      <canvas ref={canvasRef} id='myChart'></canvas>
    )
    };
    return selectedData;
    
  };
  const openDrillDown = async (selectedMonth) => {
    const LineOfCodeDatewiseData = await getDrillDownData();
    dispatch(
      setIsOffCanvasOpen({
        isDrilldownOpen: true,
        title: props.title,
        selectedValue: {
          label: selectedMonth,
          value: selectedMonth,
        },
        dropDownMenuOptions: dropDownLabels.map((month) => ({
          label: month,
          value: month,
        })),
        selectedData: getSelectedData(
          LineOfCodeDatewiseData.data,
          selectedMonth
        ),
        // handleDdMenuChange: handleDdMenuChange,
      })
    );
  };
  const ref = useD3(
    (svg) => {
      let data = codeAnalysisData;
      let width = get(props, "chartContainerRefs.current[1].offsetWidth", 1);
      var height = 0.75 * width;
      if (data.length) {
        var groupSpacing = 0;
        svg
          .attr("width", width) //set the width and height of our visualization (these will be attributes of the <svg> tag
          .attr("height", height);
        let margin = { top: 30, right: 30, bottom: 0, left: 40 };
        let g = svg
          .append("g")
          .attr(
            "transform",
            "translate(" + margin.left + "," + margin.top + ")"
          );
        width = 240;
        height = 200;
        //g = svg.append("g");

        var x0 = d3.scaleBand().rangeRound([0, width]).paddingInner(0.4);

        var x1 = d3.scaleBand().padding(0.01);

        var y = d3.scaleLinear().rangeRound([height, 0]);

        var z = d3.scaleOrdinal().range(["#7bd1dd", "#f95537"]);

        var keys = Object.keys(data[0]).slice(1);
        x0.domain(
          data.map(function (d) {
            return d.month;
          })
        );
        x1.domain(keys).rangeRound([0, x0.bandwidth()]);
        y.domain([
          0,
          d3.max(data, function (d) {
            return d3.max(keys, function (key) {
              return d[key];
            });
          }),
        ]).nice();

        g.append("g")
          .selectAll("g")
          .data(data)
          .enter()
          .append("g")
          .attr("transform", function (d) {
            return "translate(" + x0(d.month) + ",0)";
          })
          .selectAll("rect")
          .data(function (d) {
            return keys.map(function (key) {
              return { key: key, value: d[key], data: d.month };
            });
          })
          .enter()
          .append("rect")
          .on("click", (e, d) => {
            openDrillDown(get(d, "data", ""));
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
          .attr("rx", 5)
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
              .tickPadding(20)
          )
          .append("text")
          .attr("x", 2)
          .attr("y", y(y.ticks().pop()) + 0.5)
          .attr("dy", "0.32em")
          .attr("fill", "#000")
          .attr("font-weight", "bold")
          .attr("text-anchor", "start")
          .text("");
      }
    },
    [codeAnalysisData]
  );
  return (
    <>
      <svg ref={ref}></svg>
    </>
  );
};
export default memo(CodeAnalysis);
