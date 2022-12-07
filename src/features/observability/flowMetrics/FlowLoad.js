import React from "react";
import * as d3 from "d3";
import { useD3 } from "../../../hooks/useD3";
import { cloneDeep, isEmpty, get } from "lodash";
import { metricTypesMapping, sortingArr } from "../../common/constants";
import { getMetricMatchingStatus, statusOrder } from "../../common/helpers";
import { setIsOffCanvasOpen, setSelectedData } from "../../../app/commonSlice";
import { useDispatch } from "react-redux";

const FlowLoad = (props) => {
  const dispatch = useDispatch();
  let chartData = [];
  let data = props?.flowMetricsData?.flowLoad;
  const formatSummary = (summaryData) => {
    let tmpSummaryData = cloneDeep(summaryData);
    delete tmpSummaryData.month;
    let rtData = [];
    Object.keys(tmpSummaryData).map((key) => {
      rtData.push({
        issueId: key,
        summary: tmpSummaryData[key],
      });
    });
    return rtData;
  };
  if (!isEmpty(data)) {
    let totalCount = 0;
    let selectedData = {};
    let tempData = [];
    data.map((list) => {
      selectedData = {};
      tempData = [];
      list.list.map((items) => {
        Object.keys(items).map((keys) => {
          for (let [metricKey, value] of Object.entries(metricTypesMapping)) {
            selectedData[metricKey] = selectedData[metricKey]
              ? selectedData[metricKey]
              : {};
            const { isMatching, matchedKey } = getMetricMatchingStatus(
              keys,
              metricTypesMapping[metricKey]
            );
            if (isMatching) {
              if (
                selectedData[metricKey].summaryList &&
                selectedData[metricKey].count
              ) {
                selectedData[metricKey].count += items[matchedKey];
                selectedData[metricKey].summaryList.push(
                  ...formatSummary(items[`${matchedKey}summary`])
                );
              } else {
                selectedData[metricKey].count = items[matchedKey];
                selectedData[metricKey].summaryList = [
                  ...formatSummary(items[`${matchedKey}summary`]),
                ];
                break;
              }
            }
          }
        });
      });
      Object.keys(metricTypesMapping).map((keys) => {
        tempData.push({
          name: keys,
          count:
            selectedData[keys].count !== undefined
              ? selectedData[keys].count
              : 0,
          parent: list.status,
          summaryList: selectedData[keys].summaryList
            ? selectedData[keys].summaryList
            : [],
        });
      });
      totalCount = 0;
      for (let k = 0; k < tempData.length; k++) {
        totalCount += tempData[k].count;
      }
      chartData.push({
        name: list.status,
        children: tempData,
        count: totalCount,
        items: "13",
      });
    });
    chartData = statusOrder(chartData, sortingArr, "name");
  }
  const getSelectedData = (selectedData) => {
    let tempData = {};
    selectedData.map((items) => {
      Object.defineProperty(tempData, `${items.name}`, {
        value: { count: items.count, summaryList: items.summaryList },
      });
    });
    tempData.drillDownflowWrapClass = 'flload-wrap flowacti-block'
    return tempData;
  };

  const handleDdMenuChange = ( selectedParent ) => {
    console.log("redis123", selectedParent, chartData)
    const selectedParentData = chartData.filter(
      (dt) => dt.name === selectedParent.value
    )[0];
    dispatch(setSelectedData(getSelectedData(selectedParentData.children)))
  }

  const openDrilllDown = async (selectedParent) => {
    const selectedParentData = chartData.filter(
      (dt) => dt.name === selectedParent
    )[0];
    dispatch(
      setIsOffCanvasOpen({
        isDrilldownOpen: true,
        title: props.title,
        selectedValue: {
          label: selectedParent,
          value: selectedParent,
        },
        dropDownMenuOptions: chartData.map((item) => ({
          label: item.name,
          value: item.name,
        })),
        selectedData: getSelectedData(selectedParentData.children),
        handleDdMenuChange: handleDdMenuChange,
      })
    );
  };
  const ref = useD3(
    (svg1) => {
      svg1.html("");
      function truncate(str, n) {
        return str.length > n ? str.substr(0, n - 1) + "..." : str;
      }

      let wrap = function () {
        let self = d3.select(this),
          textLength = self.node().getComputedTextLength(),
          text = self.text();
        while (textLength > 50 && text.length > 0) {
          text = text.slice(0, -1);
          self.text(text + "...");
          textLength = self.node().getComputedTextLength();
        }
      };

      let colorCircle = function (name) {
        let colors = [
          "#167ad6",
          "#ff8000",
          "#ec6667",
          "#ae8ceb",
          "#ead96e",
          "#fcbc4c",
        ];

        if (!name) return "#ffffff";
        else {
          if (name == "features") return colors[0];
          else if (name == "defects") return colors[1];
          else if (name == "risk") return colors[2];
          else if (name == "enablers") return colors[3];
          else if (name == "debt") return colors[4];
          else if (name == "prodFix") return colors[5];
        }
      };

      let datasetfull = chartData;
      let tasksum = 0;
      let maxwidtha = 0;

      for (let r = 0; r < datasetfull.length; r++) {
        tasksum = tasksum + parseInt(datasetfull[r].count);
      }

      for (let r = 0; r < datasetfull.length; r++) {
        datasetfull[r].widtha = (datasetfull[r].count / tasksum) * 700;

        if (datasetfull[r].widtha > 220) {
          datasetfull[r].widtha = 220;
        }

        if (datasetfull[r].widtha < 50) {
          datasetfull[r].widtha = 50;
        }

        if (datasetfull[r].widtha > maxwidtha) {
          maxwidtha = datasetfull[r].widtha;
        }
      }

      for (let i = 0; i < datasetfull.length; i++) {
        let dataset = datasetfull[i];

        let width = dataset.widtha;
        let height = dataset.widtha;
        //Size of the circle pack layout
        let diameter = Math.min(width * 0.9, height * 0.9);

        let bubble = d3.pack().size([diameter, diameter]).padding(12);

        let svg = svg1
          .append("svg")
          .attr("style", "overflow:visible")
          .attr("width", diameter)
          .attr("height", diameter + 100)
          .attr("class", "bubble");

        //svg.attr("transform", "translate(" + 10 + "," + 40 + ")");

        svg
          .append("text")
          .style("fill", "#000000")
          .attr("class", "labela")
          .attr("style", "overflow:visible")
          .attr("dy", 15)
          .attr("dx", diameter / 2)
          .style("text-anchor", "middle")
          .style("font-size", 14)
          .text(function (d) {
            return "Total Items";
          });

        svg
          .append("text")
          .style("fill", "#000000")
          .attr("class", "labelb")
          .attr("style", "overflow:visible")
          .attr("dy", 40)
          .attr("dx", diameter / 2)
          .style("text-anchor", "middle")
          .style("font-size", 22)
          .text(function (d) {
            return dataset.count;
          });
        svg
          .append("text")
          .style("fill", "#000000")
          .attr("class", "labelc")
          .attr("style", "overflow:visible")
          .attr("dy", width + 60 + (maxwidtha - width) / 2)
          .attr("dx", diameter / 2)
          .style("text-anchor", "middle")
          .style("font-size", 16)
          .text(truncate(dataset.name, 10));

        let nodes = d3.hierarchy(dataset).sum(function (d) {
          return d.count;
        });

        let vNodes = nodes.descendants();

        bubble(nodes);

        let vSlices = svg
          .selectAll("circle")
          .data(vNodes)
          .enter()
          .append("circle")
          .attr("transform", "translate(" + 0 + "," + 50 + ")");

        let leaf = svg.selectAll("circle").data(vNodes);

        // Draw on screen
        vSlices
          .attr("cx", function (d) {
            return d.x;
          })
          .attr("cy", function (d) {
            return d.y;
          })
          .attr("r", function (d) {
            return d.r;
          })
          .attr("style", "overflow:visible")
          .attr("class", "innercirc")
          .style("stroke", "#ccc")
          .style("fill", function (d) {
            if (d.depth == 0) return "#ffffff";
            else return colorCircle(d.data.name);
          })
          .on("click", (e, d) => {
            let selectedLabel = get(d, "data.name", "");
            if (get(d, "data.parent", ""))
              selectedLabel = get(d, "data.parent", "");
            openDrilllDown(selectedLabel);
          });

        svg
          .select(".labelc")
          .append("svg:title")
          .text(function (d, i) {
            return dataset.name;
          });
      }
    },
    [chartData]
  );
  return <div ref={ref}></div>;
};

export default FlowLoad;
