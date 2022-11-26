import React, { memo } from "react";
import * as d3 from "d3";
import { useD3 } from "../../../../hooks/useD3";
import { cloneDeep, get, isEmpty } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { setIsOffCanvasOpen } from "../../../../app/commonSlice";
import OpsMetricsCustomDrillDown from "../OpsMetricsCustomDrillDown";
import { getSelectedOptionsById } from "../../../../app/utilities/helpers";
import { observabilityApi } from "../../../../app/services/observabilityApi";

const Incidents = (props) => {
  const dispatch = useDispatch();
  const [getMTBI] = observabilityApi.useGetMTBIMutation();
  const { observability } = useSelector((state) => state);
  const tmpIncidentData = get(props, "IncidentMangementData.incidentsData", []);
  let IncidentsData = [];
  !isEmpty(tmpIncidentData) &&
    tmpIncidentData.map((items) => {
      const { incidentType: label, incidents } = items;
      if (label === "Performance")
        IncidentsData.push({
          label,
          incidents,
          value: incidents.length,
          className: "managecol dark-blue-border",
        });
      else if (label === "Availability")
        IncidentsData.push({
          label,
          incidents,
          value: incidents.length,
          className: "managecol blue-border",
        });
      else if (label === "Network")
        IncidentsData.push({
          label,
          incidents,
          value: incidents.length,
          className: "managecol pink-border",
        });
      else if (label === "Others")
        IncidentsData.push({
          label,
          incidents,
          value: incidents.length,
          className: "managecol purple-border",
        });
    });
  IncidentsData.push({
    total: IncidentsData.reduce(
      (accumulator, currentValue) => accumulator + currentValue.value,
      0
    ),
  });
  const getSelectedData = () => {
    let selectedData = {
      driiDownTopHeaderBoxData: IncidentsData,
      customDrillDownCanvas() {
        return (
          <OpsMetricsCustomDrillDown
            boxTitle={"NO. OF INCIDENTS (PER ROOT CAUSE)"}
            summaryTitle={"INCIDENT LIST"}
          />
        );
      },
      opsMetricsCustomDrillDown: true,
      customSummaryHeader() {
        return "";
      },
    };
    selectedData.customSummaryListCall = async (label) => {
      const defaultPayload = {
        cmdbId: getSelectedOptionsById(
          get(observability, "filterData.selectedApplications", [])
        ),
        fromDt: get(observability, "filterData.selectedDate.startDate"),
        toDt: get(observability, "filterData.selectedDate.endDate"),
      };
      const MTBIdata = await getMTBI(defaultPayload);
      let SelectedBoxData = {};
      SelectedBoxData.MTBIdata = {
        ...MTBIdata.data.filter((date) => date.incidentType === label)[0],
      };
      IncidentsData.map((data) => {
        if (data.label === label) {
          data.incidents.map((items) => {
            let key = items.causeCategory;
            SelectedBoxData[key] = SelectedBoxData[key]
              ? SelectedBoxData[key]
              : {};
            SelectedBoxData[key].count = SelectedBoxData[key].count
              ? SelectedBoxData[key].count + 1
              : 1;
            if (SelectedBoxData[key].summaryList) {
              SelectedBoxData[key].summaryList.push({
                id: items.incidentNo,
                summary: items.incidentDescription,
              });
            } else {
              SelectedBoxData[key].summaryList = [
                {
                  id: items.incidentNo,
                  summary: items.incidentDescription,
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

      let middle_text_2 = "Total Incidents";
      let height = 230; //this is the double because are showing just the half of the pie
      let radius = Math.min(width, height) / 2;
      let total = 0;
      let labelr = radius + 30; // radius for label anchor
      //array of colors for the pie (in the same order as the dataset)
      let color = d3
        .scaleOrdinal()
        .range(["#147AD6", "#31BACC", "#FF715B", "#AF8BEB"]);
      let data = cloneDeep(IncidentsData);
      total = data.pop().total;
      //   if(IncidentsData.length > 0){
      //    total = IncidentsData.reduce((accumulator, currentValue) => accumulator + currentValue.value,
      //    0,)
      //   }
      let middle_text = total;
      let vis = svg //create the SVG element inside the <body>
        .data([data]) //associate our data with the document
        .attr("width", width) //set the width and height of our visualization (these will be attributes of the <svg> tag
        .attr("height", height)
        .append("svg:g") //make a group to hold our pie chart
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"); //move the center of the pie chart from 0, 0 to radius, radius

      let arc = d3
        .arc() //this will create <path> elements for us using arc data
        .innerRadius(radius - 20)
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

      arcs
        .append("svg:path")
        .attr("fill", function (d, i) {
          return color(i);
        }) //set the color for each slice to be chosen from the color function defined above
        .attr("d", arc)
        .on("click", (e, d) => openDrillDown()); //this creates the actual SVG path using the associated data (pie) with the arc drawing function

      let pos = d3
        .arc()
        .innerRadius(radius + 5)
        .outerRadius(radius + 5);

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
          return d.value >= 1 ? null : "none";
        })
        .attr("font-size", "12")
        .text(function (d, i) {
          return Math.round((d.value / total) * 100) + "%";
        })
        .on("click", (e, d) => openDrillDown());

      arcs
        .append("svg:text")
        .text(middle_text)
        .attr("dy", "-0.5rem")
        .attr("class", "label")
        .attr("text-anchor", "middle")
        .on("click", (e, d) => openDrillDown());

      arcs
        .append("svg:text")
        .text(middle_text_2)
        .attr("dy", "1rem")
        .attr("class", "label2")
        .attr("text-anchor", "middle")
        .on("click", (e, d) => openDrillDown());

      /*arcs.append("svg:text")
	    	.text(middle_text_3)
	    	.attr("dy", "2.2rem")
	    	.attr("class", "label3")
	    	.attr("text-anchor", "middle")	    		    	

*/
    },
    [IncidentsData]
  );
  return <svg ref={ref}></svg>;
};

export default memo(Incidents);
