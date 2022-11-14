import React, { memo } from "react";
import * as d3 from "d3";
import { useD3 } from "../../../hooks/useD3";
import { cloneDeep, get, omit, pick } from "lodash";
import { responsivefy } from "../../../app/utilities/helpers";
import { metricTypesMapping } from "../../common/constants";
import {
  getMetricTypeMappedCount,
  getMetricMatchingStatus,
} from "../../common/helpers";
import { useDispatch, useSelector } from "react-redux";
import { setIsOffCanvasOpen } from "../../../app/commonSlice";
import { observabilityApi } from "../../../app/services/observabilityApi";
import { getSelectedOptionsValue } from "../../../app/utilities/helpers";

const IssueMetrics = (props) => {
  const dispatch = useDispatch();
  const { observability } = useSelector((state) => state);
  const { data: appList = [] } = observabilityApi.useGetAppListQuery({});
  const [getIssueMetricsDdOne] =
    observabilityApi.useGetIssueMetricsDdOneMutation();

  let issueMetricsData = get(props, "peopleMetricsData.issueMetrics", []);
  var filteredIssueMetricsData = omit(issueMetricsData, ["total"]);
  let { total } = pick(issueMetricsData, ["total"]);
  let data = filteredIssueMetricsData
    ? Object.keys(filteredIssueMetricsData).map((key) => ({
        label: key,
        value: filteredIssueMetricsData[key],
      }))
    : [];

  const formatSummary = (summaryData) => {
    let rtData = {
      issueKey: summaryData.key,
      summary: summaryData.summary,
      assignedTo: summaryData.assignedTo,
      status: summaryData.status,
    };
    return [rtData];
  };

  const getSelectedData = async (selectedIssue) => {
    const selectedAppList = get(
      observability,
      "filterData.selectedApplications",
      []
    );
    let selectedData = {};
    const payload = {
      applications: selectedAppList.length
        ? getSelectedOptionsValue(selectedAppList)
        : getSelectedOptionsValue(appList),
      priorities: [selectedIssue],
      sprintNames: [],
      startDt: get(observability, "filterData.selectedDate.startDate"),
      toDt: get(observability, "filterData.selectedDate.endDate"),
    };
    const { data: issueMetricsDdOneData } = await getIssueMetricsDdOne(payload);
    const issuesData = get(issueMetricsDdOneData, "[0].issues");
    issuesData.map((issue, index) => {
      let data = issue.data;
      Object.keys(metricTypesMapping).map((key) => {
        selectedData[key] = selectedData[key] ? selectedData[key] : {};
        const { isMatching, matchedKey } = getMetricMatchingStatus(
          data.issueType,
          metricTypesMapping[key]
        );
        if (isMatching) {
          selectedData[key] = {
            count: selectedData[key].count ? selectedData[key].count + 1 : 1,
            summaryList: selectedData[key].summaryList
              ? selectedData[key].summaryList.concat(formatSummary(data))
              : [...formatSummary(data)],
          };
        }
      });
    });
    selectedData.customSummaryHeader = () => (
      <>
        <div className="fw-5">Sl.No</div>
        <div className="fw-20">Issue Key</div>
        <div className="fw-70">Summary</div>
        <div className="fw-20">User Asignee</div>
        <div className="fw-10">Status</div>
        <div className="fw-10"></div>
      </>
    );
    selectedData.customSummaryList = (singleSummary) => {
      return (
        <li>
          <div className="fw-20">{singleSummary.issueKey}</div>
          <div className="fw-70">{singleSummary.summary}</div>
          <div className="fw-20">{singleSummary.assignedTo}</div>
          <div className="fw-10">{singleSummary.status}</div>
          <div className="fw-10"><a type="submit" className="followup-btn box-shade">Follow Up</a></div>
        </li>
      );
    };
    return selectedData;
  };

  const openDrillDown = async ({ data: selectedIssue, index }) => {
    dispatch(
      setIsOffCanvasOpen({
        isDrilldownOpen: true,
        title: props.title,
      })
    );
    dispatch(
      setIsOffCanvasOpen({
        isDrilldownOpen: true,
        title: props.title,
        selectedValue: {
          label: selectedIssue.label,
          value: selectedIssue.label,
        },
        dropDownMenuOptions: data.map((dt) => ({
          label: dt.label,
          value: dt.label,
        })),
        selectedData: await getSelectedData(selectedIssue.label),
      })
    );
  };
  const ref = useD3(
    (svg) => {
      if (data.length) {
        let width = get(props, "chartContainerRefs.current[0].offsetWidth", 0);
        let height = 0.8 * width; //this is the double because are showing just the half of the pie

        let radius = width / 2 - width / 4;

        //array of colors for the pie (in the same order as the dataset)
        let color = d3
          .scaleOrdinal()
          .range(["#fc543a", "#fda26b", "#fec82f", "#81A71A", "#167ad6"]);

        for (let t = 0; t < data.length; t++) {
          let obj = data[t];
          obj.perc = total ? (obj.value * 100) / total : 0;
          data[t].value = obj.perc.toFixed(2);
        }

        let vis = svg //create the SVG element inside the <body>
          .data([data]) //associate our data with the document
          .attr("width", width) //set the width and height of our visualization (these will be attributes of the <svg> tag
          .attr("height", height)
          .call(responsivefy)
          .append("svg:g") //make a group to hold our pie chart

          .attr("transform", "translate(" + width / 2 + "," + 150 + ")"); //move the center of the pie chart from 0, 0 to radius, radius

        let arc = d3
          .arc() //this will create <path> elements for us using arc data
          .innerRadius(radius - 20)
          .outerRadius(radius - 10); // full height semi pie

        let pie = d3
          .pie() //this will create arc data for us given a list of values
          .startAngle(0 * (Math.PI / 135))
          .endAngle(270 * (Math.PI / 135))
          .padAngle(0.1) // some space between slices
          .sort(null) //No! we don't want to order it by size
          .value(function (d) {
            return d.value;
          }); //we must tell it out to access the value of each element in our data array

        let arcs = vis
          .selectAll("g.slice") //this selects all <g> elements with className slice (there aren't any yet)
          .data(pie) //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties)
          .enter() //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
          .append("svg:g") //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
          .attr("className", "slice")
          .on("click", (e, data) => openDrillDown(data));

        arcs
          .append("svg:path")
          .attr("fill", function (d, i) {
            return color(i);
          }) //set the color for each slice to be chosen from the color function defined above
          .attr("d", arc); //this creates the actual SVG path using the associated data (pie) with the arc drawing function

        let pos = d3
          .arc()
          .innerRadius(radius + 20)
          .outerRadius(radius + 20);

        arcs
          .append("svg:text")
          .attr("transform", function (d) {
            return "translate(" + pos.centroid(d) + ")";
          })
          .attr("dy", 5)
          .attr("text-anchor", "middle")
          .attr("fill", function (d, i) {
            return color(i);
          }) //Colorarray Labels
          .attr("display", function (d) {
            return d.value >= 1 ? null : "none";
          })
          // .attr("display", function(d) { return d.perc >= 1 ? null : "none"; })
          .attr("font-size", "13")
          .text(function (d, i) {
            return d.value + "%";
          });
      }
    },
    [data]
  );

  return (
    <>
      <svg ref={ref}></svg>
    </>
  );
};

export default memo(IssueMetrics);
