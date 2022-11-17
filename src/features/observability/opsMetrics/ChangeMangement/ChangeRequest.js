import { get } from 'lodash';
import React, { memo } from 'react'
import { useD3 } from '../../../../hooks/useD3';
import * as d3 from "d3";

const ChangeRequest= (props) => {
  const tmpData = [
    { label: 'Normal', value: 60 },
    { label: 'Standard', value: 25 },
    { label: 'Emergency', value: 15 }
];
  const ref = useD3(svg => {
    let width = get(props,"chartContainerRefs.current[0].offsetWidth",1);
    let middle_text = "50";
    let middle_text_2 = "TOTAL CHANGE";
    let middle_text_3 = "REQUESTS";
    let height = 250; //this is the double because are showing just the half of the pie
    let radius = Math.min(width, height) / 2;
    let labelr = radius + 30; // radius for label anchor
    //array of colors for the pie (in the same order as the dataset)
    let color = d3.scaleOrdinal()
        .range(['#157bd6', '#7ad2de', '#ec6665']);

    let data = tmpData

    let vis = svg //create the SVG element inside the <body>
        .data([data]) //associate our data with the document
        .attr('width', width) //set the width and height of our visualization (these will be attributes of the <svg> tag
        .attr('height', height)
        .append('svg:g') //make a group to hold our pie chart
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')'); //move the center of the pie chart from 0, 0 to radius, radius

    let arc = d3
        .arc() //this will create <path> elements for us using arc data
        .innerRadius(radius - 20)
        //                                .outerRadius(radius);
        .outerRadius(radius - 10); // full height semi pie
    //.innerRadius(0);
    let outerArc = d3.arc()
        .innerRadius(radius * 0.9)
        .outerRadius(radius * 0.9)

    let pie = d3
        .pie() //this will create arc data for us given a list of values
        .startAngle(0 * (Math.PI / 135))
        .endAngle(270 * (Math.PI / 135))
        .padAngle(0.10) // some space between slices
        .sort(null) //No! we don't want to order it by size
        .value(function(d) {
            return d.value;
        }); //we must tell it out to access the value of each element in our data array

    let arcs = vis
        .selectAll('g.slice') //this selects all <g> elements with class slice (there aren't any yet)
        .data(pie) //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties)
        .enter() //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
        .append('svg:g') //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
        .attr('class', 'slice'); //allow us to style things in the slices (like text)

    arcs
        .append('svg:path')
        .attr('fill', function(d, i) {
            return color(i);
        }) //set the color for each slice to be chosen from the color function defined above
        .attr('d', arc); //this creates the actual SVG path using the associated data (pie) with the arc drawing function


    arcs.append("svg:text")
        .text(middle_text)
        .attr("dy", "-0.5rem")
        .attr("class", "label")
        .attr("text-anchor", "middle")

    arcs.append("svg:text")
        .text(middle_text_2)
        .attr("dy", "1rem")
        .attr("class", "label2")
        .attr("text-anchor", "middle")

    arcs.append("svg:text")
        .text(middle_text_3)
        .attr("dy", "2.2rem")
        .attr("class", "label3")
        .attr("text-anchor", "middle")
},[tmpData]) 
  return (
    <svg ref={ref}/>
  )
}

export default memo(ChangeRequest)