import { cloneDeep, get, isEmpty } from "lodash";
import React, { memo } from "react";
import { useD3 } from "../../../../hooks/useD3";
import * as d3 from "d3";
import { useDispatch, useSelector } from "react-redux";
import {
  getSelectedOptionsById,
  responsivefy,
} from "../../../../app/utilities/helpers";
import { setIsOffCanvasOpen } from "../../../../app/commonSlice";
import OpsMetricsCustomDrillDown from "../OpsMetricsCustomDrillDown";
import { observabilityApi } from "../../../../app/services/observabilityApi";

const ChangeRequest = (props) => {
  const dispatch = useDispatch();
  const tmpCategoryData = get(
    props,
    "ChangeMangementData.changeRequestData",
    []
  );
  const [getRootCause] = observabilityApi.useGetRootCauseMutation();
  const { observability } = useSelector((state) => state);
  let categoryData = [];
  !isEmpty(tmpCategoryData) &&
    tmpCategoryData.map((items) => {
      const { type: label, changeReqList } = items;
      if (label === "Normal")
        categoryData.push({
          label,
          changeReqList,
          value: changeReqList.length,
          className: "managecol dark-blue-border",
        });
      else if (label === "Standard")
        categoryData.push({
          label,
          changeReqList,
          value: changeReqList.length,
          className: "managecol blue-border",
        });
      else if (label === "Emergency")
        categoryData.push({
          label,
          changeReqList,
          value: changeReqList.length,
          className: "managecol pink-border",
        });
    });
  categoryData.push({
    total: categoryData.reduce(
      (accumulator, currentValue) => accumulator + currentValue.value,
      0
    ),
  });
  const getSelectedData = () => {
    let selectedData = {
      driiDownTopHeaderBoxData: categoryData,
      isMTBIhide: true,
      customDrillDownCanvas() {
        return (
          <OpsMetricsCustomDrillDown
            boxTitle={"NO. OF CHANGE REQUESTS (PER ROOT CAUSE)"}
            summaryTitle={"CHANGE LIST"}
          />
        );
      },
      opsMetricsCustomDrillDown: true,
      customSummaryHeader() {
        return "";
      },
    };
    selectedData.customSummaryListCall = async (label) => {
      let SelectedBoxData = {};
      const defaultPayload = {
        cmdbId: getSelectedOptionsById(
          get(observability, "filterData.selectedApplications", [])
        ),
        fromDt: get(observability, "filterData.selectedDate.startDate"),
        toDt: get(observability, "filterData.selectedDate.endDate"),
        type: label,
      };
      const RootCauseData = await getRootCause(defaultPayload);
      RootCauseData.data.map((data) => {
        if (data.type === label) {
          data.changeMgnt.map((items) => {
            let key = data.rootCause;
            SelectedBoxData[key] = SelectedBoxData[key]
              ? SelectedBoxData[key]
              : {};
            SelectedBoxData[key].count = SelectedBoxData[key].count
              ? SelectedBoxData[key].count + 1
              : 1;
            if (SelectedBoxData[key].summaryList) {
              SelectedBoxData[key].summaryList.push({
                id: items.changeRequestNo,
                summary: items.description,
              });
            } else {
              SelectedBoxData[key].summaryList = [
                {
                  id: items.changeRequestNo,
                  summary: items.description,
                },
              ];
            }
          });
        }
      });
      SelectedBoxData.customSummaryList = (singleSummary) => (
        <li>
          <div class="fw-20">{singleSummary.id}</div>
          <div class="fw-50">{singleSummary.summary}</div>
        </li>
      );
      dispatch(
        setIsOffCanvasOpen({
          title: props.title,
          isDrilldownOpen: true,
          selectedData: {
            ...selectedData,
            ...SelectedBoxData,
          },
        })
      );
    };
    return selectedData;
  };
  const openDrillDown = () => {
    dispatch(
      setIsOffCanvasOpen({
        title: props.title,
        isDrilldownOpen: true,
        selectedData: getSelectedData(),
      })
    );
  };
  const ref = useD3(
    (svg) => {
      svg.html("");
      let width = get(props, "chartContainerRefs.current[0].offsetWidth", 1);
      let middle_text_2 = "TOTAL CHANGE";
      let middle_text_3 = "REQUESTS";
      let height = width * 0.6; //this is the double because are showing just the half of the pie
      let radius = Math.min(width, height) / 2;
      let labelr = radius + 30; // radius for label anchor
      //array of colors for the pie (in the same order as the dataset)
      let color = d3.scaleOrdinal().range(["#157bd6", "#7ad2de", "#ec6665"]);

      let data = cloneDeep(categoryData);
      let middle_text = data.pop().total;

      let vis = svg //create the SVG element inside the <body>
        .data([data]) //associate our data with the document
        .attr("width", width) //set the width and height of our visualization (these will be attributes of the <svg> tag
        .attr("height", height)
        .call(responsivefy)
        .append("svg:g") //make a group to hold our pie chart
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"); //move the center of the pie chart from 0, 0 to radius, radius

      let arc = d3
        .arc() //this will create <path> elements for us using arc data
        .innerRadius(radius - 35)
        //                                .outerRadius(radius);
        .outerRadius(radius - 25); // full height semi pie
      //.innerRadius(0);

      /*
    let outerArc = d3.arc()
        .innerRadius(radius * 0.9)
        .outerRadius(radius * 0.9)
*/

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
        .selectAll("g.slice") //this selects all <g> elements with class slice (there aren't any yet)
        .data(pie) //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties)
        .enter() //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
        .append("svg:g") //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
        .attr("class", "slice"); //allow us to style things in the slices (like text)

      arcs.on("click", function () {
        openDrillDown();
      });

      arcs
        .append("svg:path")
        .attr("fill", function (d, i) {
          return color(i);
        }) //set the color for each slice to be chosen from the color function defined above
        .attr("d", arc); //this creates the actual SVG path using the associated data (pie) with the arc drawing function

      let pos = d3.arc().innerRadius(radius).outerRadius(radius);

      arcs
        .append("svg:text")
        .attr("transform", function (d) {
          return "translate(" + pos.centroid(d) + ")";
        })
        //.attr("dy", 15)
        .attr("text-anchor", "middle")
        .attr("fill", function (d, i) {
          return color(i);
        }) //Colorarray Labels
        .attr("display", function (d) {
          return d.value >= 0 ? null : "none";
        })
        .attr("font-size", "12")
        .text(function (d, i) {
          return Math.round((d.value / middle_text) * 100) + "%";
        })
        .on("click", () => openDrillDown());

      arcs
        .append("svg:text")
        .text(middle_text)
        .attr("dy", "0")
        .attr("class", "label")
        .attr("text-anchor", "middle")
        .on("click", () => openDrillDown());

      arcs
        .append("svg:text")
        .text(middle_text_2)
        .attr("dy", "20")
        .attr("class", "label2")
        .attr("text-anchor", "middle")
        .on("click", () => openDrillDown());

      arcs
        .append("svg:text")
        .text(middle_text_3)
        .attr("dy", "35")
        .attr("class", "label3")
        .attr("text-anchor", "middle")
        .on("click", () => openDrillDown());
    },
    [categoryData]
  );
  return <svg ref={ref} />;
};

export default memo(ChangeRequest);
