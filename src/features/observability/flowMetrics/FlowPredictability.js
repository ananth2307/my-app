import React from "react";
import * as d3 from "d3";
import { useD3 } from "../../../hooks/useD3";
import { truncate, responsivefy } from "../../../app/utilities/helpers";
import { cloneDeep, get, isEmpty } from "lodash";
import { getMonth, metricTypesMapping } from "../../common/constants";
import { useDispatch, useSelector } from "react-redux";
import { setIsOffCanvasOpen } from "../../../app/commonSlice";
import { getMetricMatchingStatus } from "../../common/helpers";
import { observabilityApi } from "../../../app/services/observabilityApi";
import { completed } from "../../../assets/images";

const FlowPredictability = (props) => {
  const dispatch = useDispatch();
  const [getFlowPredicabilityDrill] =
    observabilityApi.useGetFlowPredictabilityDrillMutation();
  const [getFlowPredictSummary] = observabilityApi.useGetFlowPredictabilitySummaryMutation()
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
      let plannedSummary = []
      let unplannedSummary = []
      Object.keys(tmpSummaryData).map((keys) => {
        if(keys === "planned summary" ||  keys === "planned completed summary" ){
       for(let [key , value] of Object.entries(tmpSummaryData[keys])){
        let temp = {};
        if(key !== 'CompletedFlag'){
         temp = {
          issueId:key,
          summary:value,
        }
      }
        if(tmpSummaryData[keys].hasOwnProperty('CompletedFlag')){
           temp.completed = true
        }
        key !== 'CompletedFlag'&& plannedSummary.push(temp)
        }  
        }
        else{
          for(let [key , value] of Object.entries(tmpSummaryData[keys])){
            let temp = {};
            if(key !== 'CompletedFlag'){
             temp = {
              issueId:key,
              summary:value,
            }
          }
            if(tmpSummaryData[keys].hasOwnProperty('CompletedFlag')){
               temp.completed = true
            }
            key !== 'CompletedFlag'&& unplannedSummary.push(temp)
          } 
        }
        })
      return {
        plannedSummary:plannedSummary,
        unplannedSummary:unplannedSummary
      };
    };
  const getSelectedData = (drillDownData) => {
    let selectedData = {};
    for(let [keys,value] of Object.entries(drillDownData)){
    Object.keys(metricTypesMapping).map((key) => {
      selectedData[key] = selectedData[key] ? selectedData[key] : {};
      const { isMatching, matchedKey } = getMetricMatchingStatus(
        keys,
        metricTypesMapping[key]
      );
      if (isMatching) {
        selectedData[key] = {
          planned:
          selectedData[key].planned ? selectedData[key].planned + drillDownData[matchedKey].planned: drillDownData[matchedKey].planned,
          plannedCompleted:
          selectedData[key].plannedCompleted ? selectedData[key].plannedCompleted +
               drillDownData[matchedKey].plannedCompleted : drillDownData[matchedKey].plannedCompleted,
          unplanned: selectedData[key].unplanned ? selectedData[key].unplanned+drillDownData[matchedKey].unplanned : drillDownData[matchedKey].unplanned,
          unplannedCompleted:selectedData[key].unplannedCompleted ? selectedData[key].unplannedCompleted+drillDownData[matchedKey].unplannedCompleted: drillDownData[matchedKey].unplannedCompleted,
        };
      }
    });
  }
    selectedData.DdLevelOneBoxClick = true
    selectedData.DdFlowPredictCustomSummary = true
    selectedData.customSummaryHeader = () =>(
      <div class="summary_header pre_summary" >
            <div class="fw-5">Sl.No</div>
            <div class="fw-20">Issue Id</div>
            <div class="fw-50">Summary</div>
       </div>
    )

    
    selectedData.customBoxHeaders = (singleSummary) => {
      return (
        <div class="flowbox-num-block">
          <div class="numbox dark-blue">
            <div class="numlabel">Planned</div>
            <div class="numdes">{ singleSummary.planned ? singleSummary.planned : 
              isEmpty(singleSummary) ? 0: 0}</div>
          </div>
          <div class="numbox">
            <div class="numlabel">Completed</div>
            <div class="numdes" id="features_plannedcompleted">
              { singleSummary.plannedCompleted ? singleSummary.plannedCompleted : isEmpty(singleSummary) ? 0 : 0}
            </div>
          </div>
          <div class="numbox dark-blue">
            <div class="numlabel">Unplanned</div>
            <div class="numdes" id="features_unplanned">
              {singleSummary.unplanned ? singleSummary.unplanned : isEmpty(singleSummary) ? 0 : 0} 
            </div>
          </div>
          <div class="numbox">
            <div class="numlabel">Completed</div>
            <div class="numdes" id="features_unplancompleted">
              {singleSummary.unplannedCompleted ? singleSummary.unplannedCompleted :isEmpty(singleSummary) ? 0 : 0}
            </div>
          </div>
        </div>
      );
    };
    selectedData.customSummaryListCall =  async(selectedProp,offcanvasState) => {
      const summaryData = await getFlowPredictSummary({
        selectedSprintData:get(offcanvasState,'selectedValue.value',''),
        issueType:selectedProp
       })
       const formatedData = summaryData.data ? formatSummary(summaryData.data) : {}
       let tempCopy = {...offcanvasState}
       let arrCopy = {...offcanvasState.selectedData}
       let tempValuCopy = {...offcanvasState.selectedData[selectedProp]}
       if(formatedData) tempValuCopy.summaryList = formatedData
       arrCopy[selectedProp]=tempValuCopy
      tempCopy.selectedData = arrCopy
      dispatch(setIsOffCanvasOpen(tempCopy))
    };
    selectedData.customSummaryList = (singleSummary) => {
      console.log(singleSummary)
      return (
          <li>
            <div class="fw-10">{singleSummary.issueId}</div>
            <div class="fw-50">{singleSummary.summary}</div>
            {singleSummary.completed &&
            <div class='comact-block'>
            <span class='comico'>
            <img src={completed} alt='flowPredictCompletd'/></span>
            </div>
            }
          </li>
       
      );
    };
    return selectedData;
  };
  const openDrilllDown = async (selectedSprint) => {
    const drillDownData = await getFlowPredicabilityDrill({
      selectedSprintData: selectedSprint,
    });
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
      })
    );
  };
  const ref = useD3(
    (svg) => {
      svg.html("");
      var ht = 415 / 2;

      var width = 415;
      var height = ht;
      /*var width = 500;
    var height = 250;*/ //this is the double because are showing just the half of the pie
      var radius = Math.min(width, height) / 2;
      var labelr = radius + 30; // radius for label anchor
      //array of colors for the pie (in the same order as the dataset)
      var color = d3
        .scaleOrdinal()
        .range(["#522e8e", "#522e8e", "#522e8e", "#522e8e"]);

      let data = chartData;

      var countv = 0,
        countv2 = 0;

      var vmin = 10000,
        vmax = 0;
      var v2min = 10000,
        v2max = 0;

      for (var t = 0; t < data.length; t++) {
        var obj = data[t];

        if (obj.value > vmax) vmax = obj.value;

        if (obj.value < vmin) vmin = obj.value;

        if (obj.value2 < vmin) vmin = obj.value2;

        if (obj.value2 > vmax) vmax = obj.value2;
      }

      /*
    for(var t=0; t < data.length; t++) {

        var obj = data[t];
        countv2 = countv2 + obj.value2;
    }


    countvavg = countv / data.length;
    countv2avg = countv2 / data.length;
*/

      var v1 = vmax + vmin;
      if (v1 < 1) v1 = 1;

      for (var t = 0; t < data.length; t++) {
        data[t].value3 = 8 + (12 * data[t].value) / v1;
      }

      for (var t = 0; t < data.length; t++) {
        data[t].value4 = 8 + (12 * data[t].value2) / v1;
      }

      const cxBase = (60 * width) / 390;
      const cxOffset = 40;

      var tau = 2 * Math.PI;

      var vis = svg //create the SVG element inside the <body>
        .data([data]) //associate our data with the document
        .attr("width", width) //set the width and height of our visualization (these will be attributes of the <svg> tag
        .attr("height", height)
        .append("svg:g"); //make a group to hold our pie chart

      // This function will iterate your data
      data.map(function (props, index) {
        var cx = cxBase * index + cxOffset; //

        var elem = vis.selectAll("div").data(data);

        var elemEnter = elem.enter().append("g").attr("class", "click_part");

        if (props.value2 > props.value) {
          elemEnter
            .append("circle")
            .attr("cx", cx)
            .attr("cy", 80)
            .attr("r", props.value4)
            .style("fill", "transparent")
            .style("stroke", "#9B9B9B")
            .style("stroke-dasharray", "3, 3");

          var circles = elemEnter
            .append("circle")
            .attr("cx", cx)
            .attr("cy", 80)
            .attr("r", props.value3)
            .on("click", function (d, i) {
              ("predict");
            })
            .style("fill", "#7AD2DE")
            .on("click", () => openDrilllDown(get(props, "label", "")));
        } else if (props.value >= props.value2) {
          var circles = elemEnter
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
          .on("click", () => openDrilllDown(get(props, "label", "")));

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
          .on("click", () => openDrilllDown(get(props, "label", "")));

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
          .on("click", () => openDrilllDown(get(props, "label", "")));

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
