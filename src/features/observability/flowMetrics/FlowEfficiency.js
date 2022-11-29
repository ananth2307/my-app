import React from "react";
import * as d3 from "d3";
import { useD3 } from "../../../hooks/useD3";
import { truncate } from "../../../app/utilities/helpers";
import { cloneDeep, get, isEmpty } from "lodash";
import { metricTypesMapping } from "../../common/constants";
import { useDispatch } from "react-redux";
import { setIsOffCanvasOpen, setSelectedData } from "../../../app/commonSlice";
import { getMetricMatchingStatus } from "../../common/helpers";
import { observabilityApi } from "../../../app/services/observabilityApi";

const FlowEfficiency = (props) => {
  const dispatch = useDispatch();
  const [getFlowEffciencyDrill] =
    observabilityApi.useGetFlowEfficiencyDrillMutation();
  let chartData = [];
  let flowEffData = props?.flowMetricsData?.flowEfficiency;
  if (!isEmpty(flowEffData)) {
    for (let [key, value] of Object.entries(flowEffData)) {
      if (value.efficiency === "NaN") {
        value.efficiency = 0;
      }
      chartData.push({
        middle: Math.round(value.efficiency) + "%",
        name: key,
        details: [
          {
            label: "Active Time",
            value: Math.round(value.activeTime),
          },
          {
            label: "Wait Time",
            value: Math.round(value.waitTime),
          },
        ],
      });
    }
  }
  const formatSummary = (summaryData) => {
    let tmpSummaryData = cloneDeep(summaryData);
    let tempData = [];
    tmpSummaryData.map((items) => {
      Object.keys(items).map((key) => {
        tempData.push({
          issueId: items[key].jiraKey,
          activeTime: items[key].activeTime.toFixed(1),
          waitTime: items[key].waitTime.toFixed(1),
          summary: items[key].summary,
        });
      });
    });
    return tempData;
  };
  const getSelectedData = (drillDownData) => {
    let selectedData = {};
    Object.keys(metricTypesMapping).map((key) => {
      selectedData[key] = selectedData[key] ? selectedData[key] : {};
      const { isMatching, matchedKey } = getMetricMatchingStatus(
        drillDownData,
        metricTypesMapping[key]
      );
      if (isMatching) {
        selectedData[key] = {
          Efficiency: drillDownData[matchedKey].efficiency,
          activeTime: drillDownData[matchedKey].activeTime,
          waitTime: drillDownData[matchedKey].waitTime,
        };
      }
    });
    selectedData.DdLevelOneBoxClick = true;
    selectedData.drillDownflowWrapClass = 'efficiency-wrap floweffi-block'
    selectedData.customSummaryHeader = () => (
      <>
        <div class="fw-5">Sl.No</div>
        <div class="fw-10">Issue Id</div>
        <div class="fw-50">Summary</div>
        <div class="fw-10">Active time</div>{" "}
        <div class="fw-10">Waiting time</div>
      </>
    );
    selectedData.customBoxHeaders = (singleSummary, title) => {
      return (
        <>
          <div class="flownum-labels efficiencyPercent">
            <div class="flownum-block">
              <h4>{title}</h4>
              <div class="flowlabel">Efficiency</div>
              <div class="flownum">
                {!isEmpty(singleSummary)
                  ? singleSummary.Efficiency.toFixed(1)
                  : 0}
                <span>%</span>
              </div>
            </div>
          </div>
          <div class="flownum-ftr">
            <div class="numbox">
              <div class="numlabel">active time</div>
              <div class="numdes">
                {!isEmpty(singleSummary)
                  ? singleSummary.activeTime.toFixed(1)
                  : 0}
                h
              </div>
            </div>
            <div class="numbox">
              <div class="numlabel">waiting time</div>
              <div class="numdes">
                {!isEmpty(singleSummary)
                  ? singleSummary.waitTime.toFixed(1)
                  : 0}
                h
              </div>
            </div>
          </div>
        </>
      );
    };

    selectedData.customSummaryList = (singleSummary) => {
      return (
        <>
          <li>
            <div class="fw-10">{singleSummary.issueId}</div>
            <div class="fw-50 pr-20">{singleSummary.summary}</div>
            <span class="timeblock fw-20">
              <div class="numbox">
                <div class="numdes">{singleSummary.activeTime}h</div>
              </div>
              <div class="numbox">
                <div class="numdes">{singleSummary.waitTime}h</div>
              </div>
            </span>
          </li>
        </>
      );
    };
    selectedData.customSummaryListCall = async (
      selectedProp,
      offcanvasState
    ) => {
      const summaryData = await getFlowEffciencyDrill({
        selectedSprintData: get(offcanvasState, "selectedValue.value", ""),
        issueType: selectedProp,
      });
      const formatedData =
        summaryData.data.length > 0 ? formatSummary(summaryData.data) : [];
      let tempCopy = cloneDeep(offcanvasState);
      let arrCopy = cloneDeep(offcanvasState.selectedData);
      let tempValuCopy = cloneDeep(offcanvasState.selectedData[selectedProp]);
      if (formatedData.length > 0) tempValuCopy.summaryList = formatedData;
      arrCopy[selectedProp] = tempValuCopy;
      tempCopy.selectedData = arrCopy;
      dispatch(setIsOffCanvasOpen(tempCopy));
    };
    return selectedData;
  };

  const getDrillDownData = async (selectedSprint) => await getFlowEffciencyDrill({
    selectedSprintData: selectedSprint,
  });

  const handleDdMenuChange = async ( selectedSprint ) => {
    const drillDownData = await getDrillDownData(selectedSprint.value);
    dispatch(setSelectedData(getSelectedData(drillDownData.data)))
  }

  const openDrilllDown = async (selectedSprint) => {
    const drillDownData = await getDrillDownData(selectedSprint);
    console.log("redis on open", drillDownData)
    dispatch(
      setIsOffCanvasOpen({
        isDrilldownOpen: true,
        title: props.title,
        selectedValue: {
          label: selectedSprint,
          value: selectedSprint,
        },
        dropDownMenuOptions: Object.keys(flowEffData).map((item) => ({
          label: item,
          value: item,
        })),
        selectedData: getSelectedData(drillDownData.data),
        handleDdMenuChange: handleDdMenuChange,
      })
    );
  };
  const ref = useD3(
    (svg) => {
      svg.html("");
      let maindata = chartData;

      let width = 400;
      let height = 400;

      svg
        .attr("width", width) //set the width and height of our visualization (these will be attributes of the <svg> tag
        .attr("height", height)
        .append("svg:g") //make a group to hold our pie chart
        .attr("transform", "translate(" + 0 + ", -" + 100 + ")"); //move the center of the pie chart from 0, 0 to radius, radius

      let divwidth = 415;

      let vist = null;

      for (let ij = 0; ij < maindata.length; ij++) {
        if (ij <= 2) {
          vist = svg
            .select("g")
            .append("svg") //create the SVG element inside the <body>
            .attr("width", divwidth / 3 + 10) //set the width and height of our visualization (these will be attributes of the <svg> tag
            .attr("height", 250)
            .attr("style", "overflow:visible")
            .append("svg:g") //make a group to hold our pie chart
            .attr("transform", "translate(" + (ij + 1) * 80 + "," + 150 + ")");
        } else {
          vist = svg
            .select("g")
            .append("svg") //create the SVG element inside the <body>
            .attr("width", divwidth / 3 + 10) //set the width and height of our visualization (these will be attributes of the <svg> tag
            .attr("height", 250)
            .attr("style", "overflow:visible")
            .append("svg:g") //make a group to hold our pie chart
            .attr("transform", "translate(" + (ij - 2) * 80 + "," + 250 + ")");

          /*
          let svg = d3
          .select('.donut')
          .append('svg') //create the SVG element inside the <body>
          .attr('width', divwidth/3 + 10) //set the width and height of our visualization (these will be attributes of the <svg> tag
          .attr('height', 250)
          .append('svg:g') //make a group to hold our pie chart
          .attr('transform', 'translate(' + 50 + ',' + 180 + ')');
          //.call(responsivefy); //move the center of the pie chart from 0, 0 to radius, radius

*/
        }

        let data = maindata[ij];
        let sprint = data.name;
        let width = divwidth / 3 - 30;
        let middle_text = data.middle;
        let name = truncate(data.name, 8);
        let height = 70; //this is the double because are showing just the half of the pie
        let radius = Math.min(width, height) / 2;
        let labelr = radius + 25; // radius for label anchor
        //array of colors for the pie (in the same order as the dataset)
        let color = d3.scaleOrdinal().range(["#B08AEC", "#EBDC7A", "#eaeaea"]);

        vist.data([data.details]); //associate our data with the document
        //.attr('width', 200) //set the width and height of our visualization (these will be attributes of the <svg> tag
        //.attr('height', 100);
        //.append('svg'); //make a group to hold our pie chart
        //.attr('transform', 'translate(' + (200) + ',' + 100 + ')'); //move the center of the pie chart from 0, 0 to radius, radius

        let arc = d3
          .arc() //this will create <path> elements for us using arc data
          .innerRadius(radius - 7)
          .outerRadius(radius - 4); // full height semi pie
        //.innerRadius(0);
        let outerArc = d3
          .arc()
          .innerRadius(radius * 1.2)
          .outerRadius(radius * 1.2);

        let pie = d3
          .pie() //this will create arc data for us given a list of values
          .startAngle(0 * (Math.PI / 135))
          .endAngle(270 * (Math.PI / 135))
          .padAngle(0.02) // some space between slices
          .sort(null) //No! we don't want to order it by size
          .value(function (d) {
            return d.value;
          }); //we must tell it out to access the value of each element in our data array

        let arcs = vist
          .selectAll("g.slice") //this selects all <g> elements with class slice (there aren't any yet)
          .data(pie) //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties)
          .enter() //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
          .append("svg:g") //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
          .on("click", function (d, i) {
            ("efficiency");
          })
          .attr("class", "slice"); //allow us to style things in the slices (like text)

        arcs
          .append("svg:path")
          .on("click", function (d, i) {
            ("efficiency");
          })
          .attr("fill", function (d, i) {
            return color(i);
          }) //set the color for each slice to be chosen from the color function defined above
          .attr("d", arc); //this creates the actual SVG path using the associated data (pie) with the arc drawing function

        arcs
          .append("svg:text")
          .attr("class", "labels") //add a label to each slice
          .attr("fill", "#000")
          .attr("transform", function (d) {
            let pos = outerArc.centroid(d);
            let midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            return "translate(" + pos + ")";
          })
          .attr("text-anchor", "middle") //center the text on it's origin
          .text(function (d, i) {
            return data.details[i].value + " ";
          }); //get the label from our original data array

        arcs
          .append("svg:text")
          .text(middle_text + " ")
          .attr("dy", "0.3rem")
          .attr("class", "label")
          .attr("text-anchor", "middle")
          .on("click", () => openDrilllDown(get(data, "name", "")));

        arcs
          .append("svg:text")
          .text(name + " ")
          .attr("dy", "55")
          .attr("class", "namelabel")
          .attr("text-anchor", "middle")
          .on("click", (d, i) => openDrilllDown(get(data, "name", "")))
          .attr("sprint", sprint);
        arcs
          .select(".namelabel")
          .append("svg:title")
          .text(function (d, i) {
            return sprint;
          });
      }
    },
    [chartData]
  );
  return (
    <svg
      ref={ref}
      style={{
        height: "100%",
        width: "100%",
        marginRight: "0px",
        marginLeft: "0px",
      }}
    ></svg>
  );
};

export default FlowEfficiency;
