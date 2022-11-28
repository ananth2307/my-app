import React, { memo } from "react";
import { useD3 } from "../../../../hooks/useD3";
import * as d3 from "d3";
import { get } from "lodash";
import { useDispatch } from "react-redux";
import { setIsOffCanvasOpen } from "../../../../app/commonSlice";

const MeanTimetoRecovery = (props) => {
  const dispatch = useDispatch()
  let tmpMeanTimeData = get(
    props,
    "IncidentMangementData.meanTimeRecoveryData[0]",
    []
  );
 let meanTimeData=[
    { label: 'Shortest', value: 20, days: Math.round(tmpMeanTimeData.shortest)+"d" },
    { label: 'Average', value: 30, days: Math.round(tmpMeanTimeData.average)+"d" },
    { label: 'Longest', value: 50, days: Math.round(tmpMeanTimeData.longest)+"d" }
  ];
  const getSelectedData = () =>{
    
  }
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
      svg.html('')
      let width = get(props, "chartContainerRefs.current[2].offsetWidth", 1)+30;
    var height = 0.46*width; //this is the double because are showing just the half of the pie
    var radius = Math.min(width, height) / 2;
    var labelr = radius + 30; // radius for label anchor
    //array of colors for the pie (in the same order as the dataset)
    var color = d3.scaleOrdinal()
        .range(['#522E8E', '#522E8E', '#522E8E', '#522E8E']);

   let data = meanTimeData;

    const cxBase = width/3;
    const cxOffset = 50;


    var count = 0;

    for(var t=0; t < data.length; t++) {

        var obj = data[t];
        count = count + obj.value;
    }

    for(var t=0; t < data.length; t++) {

        var obj = data[t];
        obj.perc = obj.value*100/count;

        if(obj.perc < 15)
            obj.perc = 15;
    }


    var tau = 2 * Math.PI;

    var vis = svg //create the SVG element inside the <body>
        .data([data]) //associate our data with the document
        .attr('width', width) //set the width and height of our visualization (these will be attributes of the <svg> tag
        .attr('height', height)
        .on('click',()=>(openDrillDown()))
        
    .append('svg:g'); //make a group to hold our pie chart

    // This function will iterate your data
    data.map(function(props, index) {
        var cx = cxBase * (index) + cxOffset; // 

        var elem = vis.selectAll("div").data(data);

        var elemEnter = elem.enter()
            .append("g")
            .attr('class', 'mcircle')

        var circles = elemEnter.append("circle")
            .attr("cx", cx)
            .attr("cy", 100)
            .attr("r", props.perc)
            .style("fill", "#522E8E");

    circles.on("click", function() {
    })

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
            ;


    elemEnter.on("click", function() {
      openDrillDown()
    })


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
            })
            .on('click',()=>(openDrillDown()));


    });
/*circles.on("click", function() {
        var bsOffcanvas = new bootstrap.Offcanvas("#meantime")
        bsOffcanvas.show()
    });*/


    console.log("meantimeend");
    },
    [meanTimeData]
  );
  return <svg ref={ref} />;
};

export default memo(MeanTimetoRecovery);
