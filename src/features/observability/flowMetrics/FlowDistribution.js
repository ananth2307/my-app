import React, { memo } from "react";
import * as d3 from "d3";
import { useD3 } from "../../../hooks/useD3";
import { metricTypesMapping } from "../../common/constants";
import {
  getMetricTypeMappedCount,
  getMetricMatchingStatus,
} from "../../common/helpers";
import { cloneDeep, get, isEmpty, map, truncate } from "lodash";
import { useDispatch } from "react-redux";
import { setIsOffCanvasOpen } from "../../../app/commonSlice";

const FlowDistribution = (props) => {
  const dispatch = useDispatch();
  let data = [];
  !isEmpty(props?.flowMetricsData?.flowDistribution) &&
    props?.flowMetricsData?.flowDistribution.map((sprint) => {
      let tmpdata = { sprint: sprint.sprintName };
      let featureCount = 0,
        defectsCount = 0,
        riskCount = 0,
        enablerCount = 0,
        debtCount = 0,
        prodFixCount = 0;
      sprint.list.map((metricType) => {
        featureCount =
          featureCount +
          getMetricTypeMappedCount(metricType, metricTypesMapping.features);
        defectsCount =
          defectsCount +
          getMetricTypeMappedCount(metricType, metricTypesMapping.defects);
        riskCount =
          riskCount +
          getMetricTypeMappedCount(metricType, metricTypesMapping.risk);
        enablerCount =
          enablerCount +
          getMetricTypeMappedCount(metricType, metricTypesMapping.enablers);
        debtCount =
          debtCount +
          getMetricTypeMappedCount(metricType, metricTypesMapping.debt);
        prodFixCount =
          prodFixCount +
          getMetricTypeMappedCount(metricType, metricTypesMapping.prodFix);
        tmpdata = {
          ...tmpdata,
          value1: featureCount,
          value2: defectsCount,
          value3: riskCount,
          value4: enablerCount,
          value5: debtCount,
          value6: prodFixCount,
          total:
            featureCount +
            defectsCount +
            riskCount +
            prodFixCount +
            enablerCount +
            debtCount,
        };
      });
      data.push(tmpdata);
    });

  const formatSummary = (summaryData) => {
    let tmpSummaryData = cloneDeep(summaryData)
    delete tmpSummaryData.sprintName
    let rtData = [];
    Object.keys(tmpSummaryData).map(key => {
      rtData.push({
        issueId: key,
        summary: tmpSummaryData[key]
      })
    })
    return rtData;
  };

  const getSelectedData = (selectedSprint) => {
    const selectedSprintData = props.flowMetricsData?.flowDistribution?.filter(
      (dt) => dt.sprintName === selectedSprint
    )[0];
    let selectedData = {};
    selectedSprintData.list.map((data, index) => {
      Object.keys(metricTypesMapping).map((key) => {
        selectedData[key] = selectedData[key] ? selectedData[key] : {}
        const { isMatching, matchedKey } = getMetricMatchingStatus(
          data,
          metricTypesMapping[key]
        );
        if (isMatching) {
          selectedData[key] = {
            count: selectedData[key].count
              ? selectedData[key].count + data[matchedKey]
              : data[matchedKey],
            summaryList: selectedData[key].summaryList
              ? selectedData[key].summaryList.push(
                  ...formatSummary(data[`${matchedKey}summary`])
                )
              : [...formatSummary(data[`${matchedKey}summary`])],
          };
          console.log("redis12", selectedData[key].summaryList, formatSummary(data[`${matchedKey}summary`]))
          // console.log("redis", data, matchedKey, key)
        }
      });
    });
    return selectedData;
  };

  const openDrillDown = (selectedSprint) => {
    dispatch(
      setIsOffCanvasOpen({
        isDrilldownOpen: true,
        title: props.title,
        selectedValue: {
          label: selectedSprint,
          value: selectedSprint,
        },
        dropDownMenuOptions: data.map((dt) => ({
          label: dt.sprint,
          value: data.sprint,
        })),
        selectedData: getSelectedData(selectedSprint),
      })
    );
  };

  const ref = useD3(
    (svg) => {
      if (data && data.length) {
        const wrap = function () {
          let self = d3.select(this),
            text = self.text();
          self.text(truncate(text, { length: 9, omission: "..." }));
        };
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
          .on("click", (e, data) => {
            openDrillDown(get(data, "data.sprint", ""));
          })
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
          .each(wrap)
          .attr("text-anchor", "start")
          .attr("x", -35)
          .attr("fill", "#000")
          .attr("font-weight", "400")
          .attr("text-overflow", "ellipsis");

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
      }
      svg.selectAll(".y.axis .tick").on("click", (e, sprint) => {
        openDrillDown(sprint);
      });
    },
    [data]
  );

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

export default memo(FlowDistribution);
