import React, { memo } from "react";
import { useD3 } from "../../../../hooks/useD3";
import * as d3 from "d3";
import { get, isEmpty } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { setIsOffCanvasOpen } from "../../../../app/commonSlice";
import MeanTimeCustomDrillDown from "../MeanTimeCustomDrillDown";
import { observabilityApi } from "../../../../app/services/observabilityApi";
import { getSelectedOptionsById } from "../../../../app/utilities/helpers";
import { getDefaultIncidentClass } from "../../../common/helpers";

const MeanTimetoRecovery = (props) => {
  const dispatch = useDispatch();
  const { observability } = useSelector((state) => state);
  let tmpMeanTimeData = get(
    props,
    "IncidentMangementData.meanTimeRecoveryData[0]",
    []
  );
  const [getIncidentMTTR] = observabilityApi.useGetIncidentMTTRMutation({});
  let meanTimeData = [
    {
      label: "Shortest",
      value: 20,
      days: Math.round(tmpMeanTimeData.shortest) + "d",
    },
    {
      label: "Average",
      value: 30,
      days: Math.round(tmpMeanTimeData.average) + "d",
    },
    {
      label: "Longest",
      value: 50,
      days: Math.round(tmpMeanTimeData.longest) + "d",
    },
  ];
  const getSelectedData = async () => {
    const daysdifference = (firstDate, secondDate) => {
      let millisBetween =
        new Date(secondDate).getTime() - new Date(firstDate).getTime();
      let days = millisBetween / (1000 * 3600 * 24);
      return Math.round(Math.abs(days));
    };
    const defaultPayload = {
      cmdbId: getSelectedOptionsById(
        get(observability, "filterData.selectedApplications", [])
      ),
      fromDt: get(observability, "filterData.selectedDate.startDate"),
      toDt: get(observability, "filterData.selectedDate.endDate"),
    };
    let drillDownData = await getIncidentMTTR(defaultPayload);
    let selectedData = {
      customDrillDownCanvas() {
        return (
          <MeanTimeCustomDrillDown
            TopHeader={{ left: "INCIDENT TYPE", right: "MTTR" }}
          />
        );
      },
      MeanTimeDrillDown: true,
      customSummaryHeader() {
        return "";
      },
      customSummaryList(singleSummary) {
        return (
          <li>
            <div className="fw-10">{singleSummary.issueId}</div>
            <div className="fw-50">{singleSummary.summary}</div>
            <div className="fw-20">{singleSummary.meanTime}</div>
          </li>
        );
      },
    };
    !isEmpty(drillDownData.data) &&
      drillDownData.data.map((items) => {
        const {
          incidentType: label,
          incidents,
          incidentShortest,
          incidentAverage,
          incidentLongest,
        } = items;
        const className = getDefaultIncidentClass(label);
        selectedData[label] = {
          label,
          value: incidents.length,
          open: false,
          className,
          meanTimeData: {
            shortest: Math.round(incidentShortest),
            avarage: Math.round(incidentAverage),
            longest: Math.round(incidentLongest),
          },
          summaryList: incidents.map((incident) => ({
            issueId: incident.incidentNo,
            summary: incident.incidentDescription,
            meanTime:
              daysdifference(incident.createdDt, incident.closureDateTime) +
              "d",
          })),
        };
      });
    return selectedData;
  };
  const openDrillDown = async () => {
    dispatch(
      setIsOffCanvasOpen({
        title: props.title,
        isDrilldownOpen: true,
        selectedData: {
          customDrillDownCanvas() {
            return (
              <MeanTimeCustomDrillDown
                TopHeader={{
                  left: "INCIDENT TYPE",
                  right: "MTTR",
                }}
              />
            );
          },
          MeanTimeDrillDown: true,
          customSummaryHeader() {
            return "";
          },
        },
      })
    );
    dispatch(
      setIsOffCanvasOpen({
        title: props.title,
        isDrilldownOpen: true,
        selectedData: await getSelectedData(),
      })
    );
  };
  const ref = useD3(
    (svg) => {
      svg.html("");
      let width =
        get(props, "chartContainerRefs.current[2].offsetWidth", 1) + 30;
      let height = 0.46 * width; //this is the double because are showing just the half of the pie
      let radius = Math.min(width, height) / 2;
      let labelr = radius + 30; // radius for label anchor
      //array of colors for the pie (in the same order as the dataset)
      let color = d3
        .scaleOrdinal()
        .range(["#522E8E", "#522E8E", "#522E8E", "#522E8E"]);

      let data = meanTimeData;

      const cxBase = width / 3;
      const cxOffset = 50;

      let count = 0;

      for (let t = 0; t < data.length; t++) {
        let obj = data[t];
        count = count + obj.value;
      }

      for (let t = 0; t < data.length; t++) {
        let obj = data[t];
        obj.perc = (obj.value * 100) / count;

        if (obj.perc < 15) obj.perc = 15;
      }

      let tau = 2 * Math.PI;

      let vis = svg //create the SVG element inside the <body>
        .data([data]) //associate our data with the document
        .attr("width", width) //set the width and height of our visualization (these will be attributes of the <svg> tag
        .attr("height", height)
        .on("click", () => openDrillDown())

        .append("svg:g"); //make a group to hold our pie chart

      // This function will iterate your data
      data.map(function (props, index) {
        let cx = cxBase * index + cxOffset; //

        let elem = vis.selectAll("div").data(data);

        let elemEnter = elem.enter().append("g").attr("class", "mcircle");

        let circles = elemEnter
          .append("circle")
          .attr("cx", cx)
          .attr("cy", 100)
          .attr("r", props.perc)
          .style("fill", "#522E8E");

        circles.on("click", function () {});

        elemEnter
          .append("text")
          .attr("class", "labels")
          .style("fill", "#ffffff")
          .attr("dy", function (d) {
            return 105;
          })
          .attr("dx", function (d) {
            return cx - props.days.length * 3.5;
          })
          .text(function (d) {
            return props.days;
          });

        elemEnter.on("click", function () {});

        elemEnter
          .append("text")
          .attr("class", "labels2")
          .style("fill", "#000000")
          .attr("dy", function (d) {
            return 95 - props.perc;
          })
          .attr("dx", function (d) {
            return cx - props.label.length * 3.5;
          })
          .text(function (d) {
            return props.label;
          })
          .on("click", () => openDrillDown());
      });
    },
    [meanTimeData]
  );
  return <svg ref={ref} />;
};

export default memo(MeanTimetoRecovery);
