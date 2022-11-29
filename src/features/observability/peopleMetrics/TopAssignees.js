import React, { memo } from "react";
import * as d3 from "d3";
import { useD3 } from "../../../hooks/useD3";
import { get, isEmpty } from "lodash";
import { responsivefy } from "../../../app/utilities/helpers";
import { useDispatch } from "react-redux";
import { setIsOffCanvasOpen, setSelectedData } from "../../../app/commonSlice";
import { getMetricMatchingStatus } from "../../common/helpers";
import { metricTypesMapping } from "../../common/constants";
import { cloneDeep } from "lodash";

const TopAssignees = (props) => {
  const dispatch = useDispatch();
  let topAssigneetempData = get(props, "peopleMetricsData.topAssignee", []);
  const topAssigneeColor = ["#7bd2de", "#81A71A", "#fec830"];
  const topAssigneeData = [];
  let topCount = 0;
  if (!isEmpty(topAssigneetempData)) {
    let { TopValues } = topAssigneetempData[topAssigneetempData.length - 1];
    let convertedData = JSON.parse(TopValues);
    Object.keys(convertedData).map((key) => {
      topCount < 3 &&
        topAssigneeData.push({
          label: key,
          value: convertedData[key],
          color: topAssigneeColor[topCount],
        });
      topCount++;
    });
  }
  const formatSummary = (summaryData, matchedKey) => {
    let tmpSummaryData = cloneDeep(summaryData);
    let rtData = {};
    let openIssue = [];
    let doneIssue = [];
    tmpSummaryData.map((items) => {
      if (items[`${matchedKey}summary`].status === "Done") {
        doneIssue.push(items[`${matchedKey}summary`]);
      } else {
        openIssue.push(items[`${matchedKey}summary`]);
      }
    });
    rtData.openIssue = openIssue;
    rtData.doneIssue = doneIssue;
    return rtData;
  };
  const getSelectedData = ( selectedName) => {
    let selectedData = {};
    let selectedEmpData = cloneDeep(topAssigneetempData)
    selectedEmpData.map((items) => {
      if (items.assignee === selectedName) {
        for (let [key, value] of Object.entries(items.list)) {
          if (Array.isArray(value) && !key.includes("Summary")) {
            for (let [metricKeys] of Object.entries(metricTypesMapping)) {
              selectedData[metricKeys] = selectedData[metricKeys]
                ? selectedData[metricKeys]
                : { summaryList: {} };
              const { isMatching, matchedKey } = getMetricMatchingStatus(
                key,
                metricTypesMapping[metricKeys]
              );
              if (isMatching) {
                if (value.length > 0) {
                  if (
                    selectedData[metricKeys].summaryList &&
                    selectedData[metricKeys].count
                  ) {
                    selectedData[metricKeys].count += value.length;
                    selectedData[metricKeys].summaryList.openIssue.push(
                      ...formatSummary(value, matchedKey).openIssue
                    );
                    selectedData[metricKeys].summaryList.doneIssue.push(
                      ...formatSummary(value, matchedKey).doneIssue
                    );
                  } else {
                    selectedData[metricKeys].count = value.length;
                    selectedData[metricKeys].summaryList.openIssue = [
                      ...formatSummary(value, matchedKey).openIssue,
                    ];
                    selectedData[metricKeys].summaryList.doneIssue = [
                      ...formatSummary(value, matchedKey).doneIssue,
                    ];
                  }
                }
                break;
              }
            }
          }
        }
      }
    });
    selectedData.summaryToptitle = `Open Issues`;
    selectedData.summaryBottomtitle = "Done Issues";
    selectedData.DdtopAssigneeCustomSummary = true;
    selectedData.drillDownflowWrapClass = "flload-wrap flowacti-block";
    selectedData.customSummaryHeader = () => (
      <>
        <div class="fw-10">Sl.No</div>
        <div class="fw-20">Jira Key</div>
        <div class="fw-50">Summary</div>
        <div class="fw-20">Created Date</div>
        <div class="fw-20">Reporter</div>
        <div class="fw-20">Priority</div>
        <div class="fw-20">Hours Spent</div>
        <div class="fw-20">Status</div>
      </>
    );
    selectedData.customSummaryList = (selectedData) => {
      return (
        <>
          <li>
            <div class="fw-20">{selectedData?.jiraId}</div>
            <div class="fw-50">{selectedData.summary} </div>
            <div class="fw-20">
              {new Date(selectedData.createDate).toLocaleDateString()}
            </div>
            <div class="fw-20">{selectedData.reportedBy}</div>
            <div class="fw-20">{selectedData.priority}</div>
            <div class="fw-20">
              {(selectedData.totalTimeSpent / 36000).toFixed(1)}h
            </div>
            <div class="fw-20">{selectedData.status}</div>
          </li>
        </>
      );
    };
    return selectedData;
  };
  const handleDdMenuChange = (selectedValue) =>{
    dispatch(setSelectedData(getSelectedData(selectedValue.label)))
  }
  const openDrillDown = (selectedName) => {
    dispatch(
      setIsOffCanvasOpen({
        isDrilldownOpen: true,
        title: props.title,
        selectedValue: {
          label: selectedName,
          value: selectedName,
        },
        dropDownMenuOptions: topAssigneeData.map((name) => ({
          label: name.label,
          value: name.label,
        })),
        selectedData: getSelectedData(selectedName),
        handleDdMenuChange:handleDdMenuChange,
      })
    );
  };
  const ref = useD3(
    (svg) => {
      let width = get(props, "chartContainerRefs.current[2].offsetWidth", 0);
      let height = width * 0.75; //this is the double because are showing just the half of the pie
      let radius = Math.min(width, height) / 2;
      //let labelr = radius + 30; // radius for label anchor
      //array of colors for the pie (in the same order as the dataset)
      let color = d3
        .scaleOrdinal()
        .range(["#522e8e", "#522e8e", "#522e8e", "#522e8e"]);

      let data = topAssigneeData;
      /*data = [
       { label: 'Ahead', value: 50, color: "#7bd2de" },
       { label: 'On Track', value: 90, color: "#81A71A" },
       { label: 'Warning', value: 40, color: "#fec830" },
       { label: 'Delayed', value: 60, color: "#fc543a" }
   ];*/

      const cxBase = (width - 20) / 3;
      const cxOffset = cxBase / 3 + 40;

      //let tau = 2 * Math.PI;

      let count = 0;

      for (let t = 0; t < data.length; t++) {
        let obj = data[t];
        count = count + obj.value;
        /*let option = "<option value='"+data[t].fullName+"'>"+data[t].label+"</option>";
              $("#assignee_drop").append(option);*/
      }
      for (let t = 0; t < data.length; t++) {
        let obj = data[t];
        obj.perc = (obj.value * 100) / count;
        if (obj.perc == "NaN") {
          obj.perc = 0;
        }
        if (obj.perc > 40) obj.perc = 40;

        if (obj.perc < 15) obj.perc = 15;
      }

      let vis = svg //create the SVG element inside the <body>
        .data([data]) //associate our data with the document
        .attr("width", width) //set the width and height of our visualization (these will be attributes of the <svg> tag
        .attr("height", height)
        .call(responsivefy)
        .append("svg:g"); //make a group to hold our pie chart

      // This function will iterate your data
      data.map(function (props, index) {
        let cx = cxBase * index + cxOffset;

        let elem = vis.selectAll("div").data(data);

        let elemEnter = elem.enter().append("g");

        let circles = elemEnter
          .append("circle")
          .attr("cx", cx)
          .attr("cy", (height * 2) / 3)
          .attr("r", props.perc * 1.1)
          .on("click", function (d, i) {
            openDrillDown(get(props, "label", ""));
          })
          .style("fill", props.color);

        elemEnter
          .append("text")
          .style("fill", "#ffffff")
          .attr("dy", function (d) {
            return (height * 2) / 3 + 5;
          })
          .attr("dx", function (d) {
            return cx - 9;
          })
          .text(function (d) {
            return props.value;
          })
          .on("click", function (d, i) {
            openDrillDown(get(props, "label", ""));
          });

        elemEnter
          .append("text")
          .style("fill", "#000000")
          .attr("font-size", 12)
          .attr("dy", function (d) {
            return (height * 2) / 3 - 30 - props.perc / 2;
          })
          .attr("dx", function (d) {
            return cx - props.label.length * 3.5;
          })
          .text(function (d) {
            return props.label;
          })
          .on("click", function (d, i) {
            openDrillDown(get(props, "label", ""));
          });
      });
    },
    [topAssigneeData]
  );

  return (
    <>
      <svg ref={ref}></svg>
    </>
  );
};

export default memo(TopAssignees);
