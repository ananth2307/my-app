import {  get, isEmpty } from "lodash";
import React, { memo } from "react";
import { useD3 } from "../../../../hooks/useD3";
import * as d3 from "d3";
import { useDispatch } from "react-redux";
import { setIsOffCanvasOpen } from "../../../../app/commonSlice";
import OpsMetricsCustomDrillDown from "../OpsMetricsCustomDrillDown";
import { getDefaultIncidentClass } from "../../../common/helpers";

const ChangeRequestPerCategory = (props) => {
  const dispatch = useDispatch();
  const tmpChangeCategoryData = get(
    props,
    "ChangeMangementData.changeRequestPerCategoryData",
    []
  );
  let ChangeRequestPerCategory = [];
  !isEmpty(tmpChangeCategoryData) &&
  tmpChangeCategoryData.map((items) => {
    const { category: label, changeCatList } = items;
    const className = getDefaultIncidentClass(label)
    ChangeRequestPerCategory.push({
        label,
        changeCatList,
        value: changeCatList.length,
        className
      });
  });
  ChangeRequestPerCategory.push({
    total: ChangeRequestPerCategory.reduce(
      (accumulator, currentValue) => accumulator + currentValue.value,
      0
    ),
  });
  const getSelectedData = () => {
    let selectedData = {
      driiDownTopHeaderBoxData: ChangeRequestPerCategory,
      isMTBIhide: true,
      customDrillDownCanvas() {
        return (
          <OpsMetricsCustomDrillDown
           totalTitle = {'TOTAL CHANGE REQUESTS'}
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
    selectedData.customSummaryListCall = (label) => {
      let SelectedBoxData = {};
      ChangeRequestPerCategory.map((data) => {
        if (data.label === label) {
          data.changeCatList.map((items) => {
            let key = items.relatedIssueType;
            SelectedBoxData[key] = SelectedBoxData[key]
              ? SelectedBoxData[key]
              : {};
            SelectedBoxData[key].count = SelectedBoxData[key].count
              ? SelectedBoxData[key].count + 1
              : 1;
            if (SelectedBoxData[key].summaryList) {
              SelectedBoxData[key].summaryList.push({
                issueId: items.changeRequestNo,
                summary: items.description,
              });
            } else {
              SelectedBoxData[key].summaryList = [
                {
                  issueId: items.changeRequestNo,
                  summary: items.description,
                },
              ];
            }
          });
        }
      });
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
      svg.html("")
      let width = get(props, "chartContainerRefs.current[1].offsetWidth", 1);
      let height = 250; //this is the double because are showing just the half of the pie
      let radius = Math.min(width, height) / 2;
      let labelr = radius + 30; // radius for label anchor
      //array of colors for the pie (in the same order as the dataset)
      let color = d3.scaleOrdinal().range(["#59abf7", "#e9d96c", "#ec6666"]);

      let data = ChangeRequestPerCategory;

      let vis = svg //create the SVG element inside the <body>
        .data([data]) //associate our data with the document
        .attr("width", width) //set the width and height of our visualization (these will be attributes of the <svg> tag
        .attr("height", height)
        .append("svg:g") //make a group to hold our pie chart
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"); //move the center of the pie chart from 0, 0 to radius, radius

      let arc = d3
        .arc() //this will create <path> elements for us using arc data
        .innerRadius(radius - 50)
        //                                .outerRadius(radius);
        .outerRadius(radius - 10); // full height semi pie
      //.innerRadius(0);
      let outerArc = d3
        .arc()
        .innerRadius(radius * 0.9)
        .outerRadius(radius * 0.9);

      let pie = d3
        .pie() //this will create arc data for us given a list of values
        .startAngle(0 * (Math.PI / 135))
        .endAngle(270 * (Math.PI / 135))
        .padAngle(0.03) // some space between slices
        .sort(null) //No! we don't want to order it by size
        .value(function (d) {
          return d.value;
        }); //we must tell it out to access the value of each element in our data array

      let arcs = vis
        .selectAll("g.slice") //this selects all <g> elements with class slice (there aren't any yet)
        .data(pie) //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties)
        .enter() //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
        .append("svg:g") //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
        .attr("class", "slice") //allow us to style things in the slices (like text)
        .on('click',()=>(openDrillDown()));

      arcs
        .append("svg:path")
        .attr("fill", function (d, i) {
          return color(i);
        }) //set the color for each slice to be chosen from the color function defined above
        .attr("d", arc); //this creates the actual SVG path using the associated data (pie) with the arc drawing function

      arcs
        .append("circle")
        .attr("class", "circ") //add a label to each slice
        .attr("fill", "#fff")
        .attr("r", "22px")
        .style("stroke", "#bbb")
        .attr("transform", function (d) {
          let pos = outerArc.centroid(d);

          return "translate(" + pos + ")";
        })
        .on('click',()=>(openDrillDown()));;

      arcs
        .append("svg:text")
        .attr("class", "labels") //add a label to each slice
        .attr("fill", "#000")
        .attr("transform", function (d) {
          let pos = outerArc.centroid(d);
          let midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
          pos[1] = pos[1] + 5;
          return "translate(" + pos + ")";
        })
        .attr("text-anchor", "middle") //center the text on it's origin
        .text(function (d, i) {
          return data[i].value;
        })
        .on('click',()=>(openDrillDown()));
    },
    [ChangeRequestPerCategory]
  );
  return <svg ref={ref} />;
};

export default memo(ChangeRequestPerCategory);
