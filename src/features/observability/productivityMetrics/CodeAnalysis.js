import React, { memo, useRef, } from "react";
import { useD3 } from "../../../hooks/useD3";
import * as d3 from "d3";
import { cloneDeep, get,  } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { setIsOffCanvasOpen, setSelectedData } from "../../../app/commonSlice";
import { observabilityApi } from "../../../app/services/observabilityApi";
import { getMonth } from "../../common/constants";
import { getSelectedOptionsValue } from "../../../app/utilities/helpers";
const CodeAnalysis = (props) => {
  const dispatch = useDispatch();
  const { observability } = useSelector((state) => state);
  const { data: appList = [] } = observabilityApi.useGetAppListQuery({});
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
  // const getDrillDownData = async () =>{
  //   const selectedAppList = get(
  //     observability,
  //     "filterData.selectedApplications",
  //     []
  //   );
  //   const payload = {
  //     appCodes: selectedAppList.length
  //       ? getSelectedOptionsValue(selectedAppList)
  //       : getSelectedOptionsValue(appList),
  //       projects:[],
  //     sprintNames: [],
  //     startDt: 1664562600000,
  //     toDt: 1668709740000,
  //     // startDt: get(observability, "filterData.selectedDate.startDate"),
  //     // toDt: get(observability, "filterData.selectedDate.endDate"),
  //   };
  //   const response = await getLineOfCodeDatewise(payload);
  //  return response;
  // }
  const getDaysInMonth = (month, year) => {
    let monthIndex = getMonth.findIndex((item) => item === month);
    let date = new Date(year, monthIndex, 1);
    let days = [];
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
  const getSelectedData = async (month) => {
    const selectedAppList = get(
      observability,
      "filterData.selectedApplications",
      []
    );
    const payload = {
      appCodes: selectedAppList.length
        ? getSelectedOptionsValue(selectedAppList)
        : getSelectedOptionsValue(appList),
        projects:[],
      sprintNames: [],
      startDt: 1664562600000,
      toDt: 1668709740000,
      // startDt: get(observability, "filterData.selectedDate.startDate"),
      // toDt: get(observability, "filterData.selectedDate.endDate"),
    };
    const LineOfCodeDatewiseData = await getLineOfCodeDatewise(payload);
    let tmpData = cloneDeep(LineOfCodeDatewiseData.data);
    let codeAnalysisViolationsData = [];
    let codeAnalysisLineData = [];
    let selectedData = {};
    selectedData.days = getDaysInMonth(month, new Date().getFullYear());
    selectedData.days.map((dayMonth) => {
      let dataforCurrent = tmpData.find((item) => item.date === dayMonth);
      if (dataforCurrent !== undefined && dataforCurrent !== null) {
        codeAnalysisViolationsData.push(dataforCurrent.violations);
        codeAnalysisLineData.push(dataforCurrent.lines);
      } else {
        codeAnalysisViolationsData.push(0);
        codeAnalysisLineData.push(0);
      }
    });
    selectedData.codeAnalysisLineData = codeAnalysisLineData;
    selectedData.codeAnalysisViolationsData = codeAnalysisViolationsData;
    selectedData.customDrillDownCanvas = true;
    return selectedData;
  };
  const handleDdMenuChange = async (selectedValue) => {
    dispatch(
      setSelectedData(
        await getSelectedData(selectedValue.label)
      )
    );
  };
  const openDrillDown = async (selectedMonth) => {
    dispatch(setIsOffCanvasOpen({
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
      selectedData:{
        customDrillDownCanvas:true
      }
    }));
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
        selectedData: await getSelectedData(
          selectedMonth
        ),
        handleDdMenuChange: handleDdMenuChange,
      })
    );
  };
  const ref = useD3(
    (svg) => {
      let data = codeAnalysisData;
      let width = get(props, "chartContainerRefs.current[1].offsetWidth", 1);
      let height = 0.75 * width;
      if (data.length) {
        let groupSpacing = 0;
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

        let x0 = d3.scaleBand().rangeRound([0, width]).paddingInner(0.4);

        let x1 = d3.scaleBand().padding(0.01);

        let y = d3.scaleLinear().rangeRound([height, 0]);

        let z = d3.scaleOrdinal().range(["#7bd1dd", "#f95537"]);

        let keys = Object.keys(data[0]).slice(1);
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
