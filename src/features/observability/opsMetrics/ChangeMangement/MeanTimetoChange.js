import React, { memo } from "react";
import { useD3 } from "../../../../hooks/useD3";
import * as d3 from "d3";
import { get, isEmpty } from "lodash";
import { getSelectedOptionsById, responsivefy } from "../../../../app/utilities/helpers";
import { useDispatch, useSelector } from "react-redux";
import { setIsOffCanvasOpen } from "../../../../app/commonSlice";
import MeanTimeCustomDrillDown from "../MeanTimeCustomDrillDown";
import { observabilityApi } from "../../../../app/services/observabilityApi";
import { getDefaultIncidentClass } from "../../../common/helpers";
const MeanTimetoChange = (props) => {
    
  const { observability } = useSelector((state) => state);
    const dispatch = useDispatch();
    let tmpMeanTimeChangeData = get(
        props,
        "ChangeMangementData.meanTimetoChangeData[0]",
        []
      )
      const [getMeanTimeChangeType] = observabilityApi.useGetMeanTimeChangeTypeMutation()
  let meanTimeChangeData = [
    {
      label: "Shortest",
      value: 20,
      days: Math.round(tmpMeanTimeChangeData.shortest) + "d",
    },
    {
      label: "Average",
      value: 30,
      days: Math.round(tmpMeanTimeChangeData.average) + "d",
    },
    {
      label: "Longest",
      value: 50,
      days: Math.round(tmpMeanTimeChangeData.longest) + "d",
    },
  ];
  const getSelectedData = async () => {
    const  daysdifference = (firstDate, secondDate) => {  
      let millisBetween = new Date(secondDate).getTime() - new Date(firstDate).getTime(); 
      let days = millisBetween / (1000 * 3600 * 24);   
      return Math.round(Math.abs(days));  
  } 
    const defaultPayload = {
      cmdbId: getSelectedOptionsById(
        get(observability, "filterData.selectedApplications", [])
      ),
      fromDate: get(observability, "filterData.selectedDate.startDate"),
      toDate: get(observability, "filterData.selectedDate.endDate"),
      type:''
    };
    let drillDownData = await getMeanTimeChangeType(defaultPayload);
    let selectedData = {
      customDrillDownCanvas() {
        return (
          <MeanTimeCustomDrillDown
            TopHeader={{ left: "CHANGE TYPE", right: "MTTC" }}
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
        changeType: label,
          changeList,
          changeShortest,
          changeAverage,
          changeLongest,
        } = items;
        const className = getDefaultIncidentClass(label);
        selectedData[label] = {
        label,
          value: changeList.length,
          open:false,
          className,
          meanTimeData: {
            shortest: Math.round(changeShortest),
            avarage: Math.round(changeAverage),
            longest: Math.round(changeLongest),
          },
          summaryList: changeList.map((change) => ({
            issueId: change.changeRequestNo,
            summary: change.description,
            meanTime:daysdifference(change.createdDt,change.completionDate) + 'd'
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
                  left: "CHANGE TYPE",
                  right: "MTTC",
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
        svg.html('')
      let width = get(props,"chartContainerRefs.current[3].offsetWidth",1);
    let height = 0.46*width; //this is the double because are showing just the half of the pie
    let radius = Math.min(width, height) / 2;
    let labelr = radius + 30; // radius for label anchor
    //array of colors for the pie (in the same order as the dataset)
    let color = d3.scaleOrdinal()
        .range(['#522E8E', '#522E8E', '#522E8E', '#522E8E']);

    let data = meanTimeChangeData;

    const cxBase = width/3;
    const cxOffset = 50;


    let count = 0;

    for(let t=0; t < data.length; t++) {

        let obj = data[t];
        count = count + obj.value;
    }

    for(let t=0; t < data.length; t++) {

        let obj = data[t];
        obj.perc = obj.value*100/count;
    }


    let tau = 2 * Math.PI;

    let vis = svg//create the SVG element inside the <body>
        .data([data]) //associate our data with the document
        .attr('width', width) //set the width and height of our visualization (these will be attributes of the <svg> tag
        .attr('height', height)
        .on('click',()=>(openDrillDown()))
//        .on("click", function(d,i) { 
//          let bsOffcanvas = new bootstrap.Offcanvas("#meantimechange-popup");
//          bsOffcanvas.show() })
        .call(responsivefy)

    .append('svg:g'); //make a group to hold our pie chart
    // This function will iterate your data
    data.map(function(props, index) {
        let cx = cxBase * (index) + cxOffset; // 

        let elem = vis.selectAll("div").data(data);

        let elemEnter = elem.enter()
            .append("g")
            .attr('class', 'mcircle')

        let circles = elemEnter.append("circle")
            .attr("cx", cx)
            .attr("cy", 100)
            .attr("r", props.perc)
            .style("fill", "#522E8E")
            .on("click", )

        elemEnter
            .append("text")
            .attr('class', 'labels')
            .style("fill", "#ffffff")
            .attr("dy", function(d) {
                return 105;
            })
            .attr("dx", function(d) {
                return cx - (props.days.length * 3.5);
            })
            .text(function(d) {
                return props.days
            })
            .on("click",);


        elemEnter
            .append("text")
            .attr('class', 'labels2')
            .style("fill", "#000000")
            .attr("dy", function(d) {
                return 95 - props.perc;
            })
            .attr("dx", function(d) {
                return cx - (props.label.length * 3.5);
            })
            .text(function(d) {
                return props.label
            });


    });
    },
    [meanTimeChangeData]
  );
  return <svg ref={ref} />;
};

export default memo(MeanTimetoChange);
