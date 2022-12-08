import React from "react";
import * as d3 from "d3";
import { useD3 } from "../../../hooks/useD3";
import { truncate } from "../../../app/utilities/helpers";
import { cloneDeep, get, isEmpty } from "lodash";
import { metricTypesMapping } from "../../common/constants";
import { useDispatch, useSelector } from "react-redux";
import { setIsOffCanvasOpen, setSelectedData } from "../../../app/commonSlice";
import { getMetricMatchingStatus } from "../../common/helpers";
import { observabilityApi } from "../../../app/services/observabilityApi";
import { completed } from "../../../assets/images";
import { getSelectedOptionsValue } from "../../../app/utilities/helpers";

const FlowPredictability = (props) => {
  const dispatch = useDispatch();
  const { data: appList } = observabilityApi.useGetAppListQuery({});
  const observability = useSelector((state) => state.observability);

  const [getFlowPredicabilityDrill] =
    observabilityApi.useGetFlowPredictabilityDrillMutation();
  const [getFlowPredictSummary] =
    observabilityApi.useGetFlowPredictabilitySummaryMutation();
  let chartData = [];
  !isEmpty(props?.flowMetricsData?.flowPredictability.sprint) &&
    props?.flowMetricsData?.flowPredictability.sprint.map((items) => {
      chartData.push({
        label: items.sprintName,
        value: items.actual,
        value2: items.planned,
      });
    });
  const formatSummary = (summaryData) => {
    let tmpSummaryData = cloneDeep(summaryData);
    let plannedSummary = [];
    let unplannedSummary = [];
    Object.keys(tmpSummaryData).map((keys) => {
      if (keys.replace(" ",'') === "planned summary" || keys.replace(" ",'') === "planned completed summary") {
        for (let [key, value] of Object.entries(tmpSummaryData[keys])) {
          let temp = {};
          if (key !== "CompletedFlag") {
            temp = {
              issueId: key,
              summary: value,
            };
          }
          if (tmpSummaryData[keys].hasOwnProperty("CompletedFlag")) {
            temp.completed = true;
          }
          key !== "CompletedFlag" && plannedSummary.push(temp);
        }
      } else {
        for (let [key, value] of Object.entries(tmpSummaryData[keys])) {
          let temp = {};
          if (key !== "CompletedFlag") {
            temp = {
              issueId: key,
              summary: value,
            };
          }
          if (tmpSummaryData[keys].hasOwnProperty("CompletedFlag")) {
            temp.completed = true;
          }
          key !== "CompletedFlag" && unplannedSummary.push(temp);
        }
      }
    });
    console.log({ plannedSummary,
      unplannedSummary})
    return {
      plannedSummary,
      unplannedSummary,
    };
  };
  const getSelectedData = (drillDownData) => {
    let selectedData = {};
    for (let [keys, value] of Object.entries(drillDownData)) {
      Object.keys(metricTypesMapping).map((key) => {
        selectedData[key] = selectedData[key] ? selectedData[key] : {};
        const { isMatching, matchedKey } = getMetricMatchingStatus(
          keys,
          metricTypesMapping[key]
        );
        if (isMatching) {
          selectedData[key] = {
            planned: selectedData[key].planned
              ? selectedData[key].planned + drillDownData[matchedKey].planned
              : drillDownData[matchedKey].planned,
            plannedCompleted: selectedData[key].plannedCompleted
              ? selectedData[key].plannedCompleted +
                drillDownData[matchedKey].plannedCompleted
              : drillDownData[matchedKey].plannedCompleted,
            unplanned: selectedData[key].unplanned
              ? selectedData[key].unplanned +
                drillDownData[matchedKey].unplanned
              : drillDownData[matchedKey].unplanned,
            unplannedCompleted: selectedData[key].unplannedCompleted
              ? selectedData[key].unplannedCompleted +
                drillDownData[matchedKey].unplannedCompleted
              : drillDownData[matchedKey].unplannedCompleted,
            plannedIssueId: selectedData[key].plannedIssueId
              ? selectedData[key].plannedIssueId.concat(
                  drillDownData[matchedKey].plannedIssueId
                )
              : drillDownData[matchedKey].plannedIssueId,
            plannedCompletedIssueId: selectedData[key].plannedCompletedIssueId
              ? selectedData[key].plannedCompletedIssueId.concat(
                  drillDownData[matchedKey].plannedCompletedIssueId
                )
              : drillDownData[matchedKey].plannedCompletedIssueId,
            unplannedIssueId: selectedData[key].unplannedIssueId
              ? selectedData[key].unplannedIssueId.concat(
                  drillDownData[matchedKey].unplannedIssueId
                )
              : drillDownData[matchedKey].unplannedIssueId,
            unplannedCompletedIssueId: selectedData[key]
              .unplannedCompletedIssueId
              ? selectedData[key].unplannedCompletedIssueId.concat(
                  drillDownData[matchedKey].unplannedCompletedIssueId
                )
              : drillDownData[matchedKey].unplannedCompletedIssueId,
          };
        }
      });
    }
    selectedData.DdLevelOneBoxClick = true;
    selectedData.DdFlowPredictCustomSummary = true;
    selectedData.summaryToptitle = "PLANNED";
    selectedData.summaryBottomtitle = "UNPLANNED";
    selectedData.drillDownflowWrapClass = "predictwrap flow-predi-block";
    selectedData.customSummaryHeader = () => (
      <div class="summary_header pre_summary">
        <div class="fw-5">Sl.No</div>
        <div class="fw-20">Issue Id</div>
        <div class="fw-50">Summary</div>
      </div>
    );

    selectedData.customBoxHeaders = (singleSummary, title) => {
      return (
        <>
          <h4>{title}</h4>
          <div class="flowbox-num-block">
            <div class="numbox dark-blue">
              <div class="numlabel">Planned</div>
              <div class="numdes">
                {singleSummary.planned
                  ? singleSummary.planned
                  : isEmpty(singleSummary)
                  ? 0
                  : 0}
              </div>
            </div>
            <div class="numbox">
              <div class="numlabel">Completed</div>
              <div class="numdes" id="features_plannedcompleted">
                {singleSummary.plannedCompleted
                  ? singleSummary.plannedCompleted
                  : isEmpty(singleSummary)
                  ? 0
                  : 0}
              </div>
            </div>
            <div class="numbox dark-blue">
              <div class="numlabel">Unplanned</div>
              <div class="numdes" id="features_unplanned">
                {singleSummary.unplanned
                  ? singleSummary.unplanned
                  : isEmpty(singleSummary)
                  ? 0
                  : 0}
              </div>
            </div>
            <div class="numbox">
              <div class="numlabel">Completed</div>
              <div class="numdes" id="features_unplancompleted">
                {singleSummary.unplannedCompleted
                  ? singleSummary.unplannedCompleted
                  : isEmpty(singleSummary)
                  ? 0
                  : 0}
              </div>
            </div>
          </div>
        </>
      );
    };
    selectedData.customSummaryListCall = async (
      selectedProp,
      offcanvasState
    ) => {
      const summaryData = await getFlowPredictSummary({
        sprintNames: [get(offcanvasState, "selectedValue.value", "")],
        plannedIssueId: get(offcanvasState, `selectedData.${selectedProp}`)
          .plannedIssueId,
        unplannedIssueId: get(offcanvasState, `selectedData.${selectedProp}`)
          .unplannedIssueId,
        plannedCompletedIssueId: get(
          offcanvasState,
          `selectedData.${selectedProp}`
        ).plannedCompletedIssueId,
        unplannedCompletedIssueId: get(
          offcanvasState,
          `selectedData.${selectedProp}`
        ).unplannedCompletedIssueId,
      });
      const formatedData = summaryData.data
        ? formatSummary(summaryData.data)
        : {};
      let tempCopy = cloneDeep(offcanvasState);
      let arrCopy = cloneDeep(offcanvasState.selectedData);
      let tempValuCopy = cloneDeep(offcanvasState.selectedData[selectedProp]);
      if (formatedData) tempValuCopy.summaryList = formatedData;
      arrCopy[selectedProp] = tempValuCopy;
      tempCopy.selectedData = arrCopy;
      dispatch(setIsOffCanvasOpen(tempCopy));
    };
    selectedData.customSummaryList = (singleSummary) => {
      return (
        <li>
          <div class="fw-10">{singleSummary.issueId}</div>
          <div class="fw-50">{singleSummary.summary}</div>
          {singleSummary.completed && (
            <div class="comact-block">
              <span class="comico">
                <img src={completed} alt="flowPredictCompletd" />
                completed
              </span>
            </div>
          )}
        </li>
      );
    };
    return selectedData;
  };

  const getDrillDownData = async (selectedSprint) =>
    await getFlowPredicabilityDrill({
      issueTypes: ["All"],
      applications: getSelectedOptionsValue(get(observability, "filterData.selectedApplications", [])),
      sprintNames: [selectedSprint],
      projectNames: [],
      issueIds: [],
      workFlowStages: [],
      fromDt: get(observability, "filterData.selectedDate.startDate"),
      toDt: get(observability, "filterData.selectedDate.endDate"),
    });

  const handleDdMenuChange = async (selectedSprint) => {
    const drillDownData = await getDrillDownData(selectedSprint.value);
    dispatch(setSelectedData(getSelectedData(drillDownData.data)));
  };

  const openDrillDown = async (selectedSprint) => {
    const drillDownData = await getDrillDownData(selectedSprint);
    dispatch(
      setIsOffCanvasOpen({
        isDrilldownOpen: true,
        title: props.title,
        selectedValue: {
          label: selectedSprint,
          value: selectedSprint,
        },
        dropDownMenuOptions: chartData.map((item) => ({
          label: item.label,
          value: item.label,
        })),
        selectedData: getSelectedData(drillDownData.data),
        handleDdMenuChange: handleDdMenuChange,
      })
    );
  };
  const ref = useD3(
    (svg) => {
      svg.html("");
      let ht = 415 / 2;

      let width = 415;
      let height = ht;
      /*let width = 500;
    let height = 250;*/ //this is the double because are showing just the half of the pie
      let radius = Math.min(width, height) / 2;
      let labelr = radius + 30; // radius for label anchor
      //array of colors for the pie (in the same order as the dataset)
      // let color = d3
      //   .scaleOrdinal()
      //   .range(["#522e8e", "#522e8e", "#522e8e", "#522e8e"]);

      let data = chartData;

      let countv = 0,
        countv2 = 0;

      let vmin = 10000,
        vmax = 0;
      let v2min = 10000,
        v2max = 0;

      for (let t = 0; t < data.length; t++) {
        let obj = data[t];

        if (obj.value > vmax) vmax = obj.value;

        if (obj.value < vmin) vmin = obj.value;

        if (obj.value2 < vmin) vmin = obj.value2;

        if (obj.value2 > vmax) vmax = obj.value2;
      }

      let v1 = vmax + vmin;
      if (v1 < 1) v1 = 1;

      for (let t = 0; t < data.length; t++) {
        data[t].value3 = 8 + (12 * data[t].value) / v1;
      }

      for (let t = 0; t < data.length; t++) {
        data[t].value4 = 8 + (12 * data[t].value2) / v1;
      }

      const cxBase = (60 * width) / 390;
      const cxOffset = 40;

      let tau = 2 * Math.PI;

      let vis = svg //create the SVG element inside the <body>
        .data([data]) //associate our data with the document
        .attr("width", width) //set the width and height of our visualization (these will be attributes of the <svg> tag
        .attr("height", height)
        .append("svg:g"); //make a group to hold our pie chart

      // This function will iterate your data
      data.map(function (props, index) {
        let cx = cxBase * index + cxOffset; //

        let elem = vis.selectAll("div").data(data);

        let elemEnter = elem.enter().append("g").attr("class", "click_part");

        if (props.value2 > props.value) {
          elemEnter
            .append("circle")
            .attr("cx", cx)
            .attr("cy", 80)
            .attr("r", props.value4)
            .style("fill", "transparent")
            .style("stroke", "#9B9B9B")
            .style("stroke-dasharray", "3, 3");

          let circles = elemEnter
            .append("circle")
            .attr("cx", cx)
            .attr("cy", 80)
            .attr("r", props.value3)
            .on("click", function (d, i) {
              ("predict");
            })
            .style("fill", "#7AD2DE")
            .on("click", () => openDrillDown(get(props, "label", "")));
        } else if (props.value >= props.value2) {
          let circles = elemEnter
            .append("circle")
            .attr("cx", cx)
            .attr("cy", 80)
            .attr("r", props.value3)
            .style("fill", "#7AD2DE");

          elemEnter
            .append("circle")
            .attr("cx", cx)
            .attr("cy", 80)
            .attr("r", props.value4)
            .on("click", function (d, i) {
              ("predict");
            })
            .style("fill", "transparent")
            .style("stroke", "#9B9B9B")
            .style("stroke-dasharray", "3, 3");
        }

        elemEnter
          .append("text")
          .style("fill", "#9B9B9B")
          .attr("class", "glabel")
          .attr("dy", function (d) {
            return 25;
          })
          .attr("dx", function (d) {
            return cx - 20;
          })
          .text(function (d) {
            return props.value2;
          })
          .on("click", () => openDrillDown(get(props, "label", "")));

        elemEnter
          .append("text")
          .style("fill", "#7AD2DE")
          .attr("class", "blabel")
          .attr("dy", function (d) {
            return 25;
          })
          .attr("dx", function (d) {
            return cx + 5;
          })
          .text(function (d) {
            return props.value; /*+ " | "*/
          })
          .on("click", () => openDrillDown(get(props, "label", "")));

        elemEnter
          .append("text")
          .style("fill", "#000000")
          .attr("class", "labels")
          .attr("dy", function (d) {
            return 140;
          })
          .attr("sprint", props.label)
          .attr("dx", function (d) {
            return cx - truncate(props.label, 7).length * 3 + 3;
          })
          .text(function (d) {
            return truncate(props.label, 7);
          })
          .on("click", () => openDrillDown(get(props, "label", "")));

        elemEnter
          .select(".labels")
          .append("svg:title")
          .text(function (d, i) {
            return props.label;
          });
      });
    },
    [chartData]
  );
  return (
    <svg
      ref={ref}
      style={{
        height: 208,
        width: "100%",
        marginRight: "0px",
        marginLeft: "0px",
      }}
    ></svg>
  );
};

export default FlowPredictability;
