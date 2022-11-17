import { get } from 'lodash';
import React, { memo } from 'react'
import { useD3 } from '../../../../hooks/useD3';
import * as d3 from "d3";

const ChangeRequestPerRisk= (props) => {
  const tmpData = [
    { label: 'Low', value: 2 },
    { label: 'Medium', value: 40 },
    { label: 'High', value: 5 },
    { label: 'Very High', value: 3 }
];
  const ref = useD3(svg => {
    let width = get(props,"chartContainerRefs.current[2].offsetWidth",1)
    let height = 350; //this is the double because are showing just the half of the pie
    let radius = 130;
    let labelr = radius + 30; // radius for label anchor
    //array of colors for the pie (in the same order as the dataset)
    let color = d3.scaleOrdinal()
        .range(['#98bddf', '#ffc830', '#ff9250', '#fc543a']);

    let data = tmpData


    let tau = 2 * Math.PI;

    let vis = svg //create the SVG element inside the <body>
        .data([data]) //associate our data with the document
        .attr('width', width) //set the width and height of our visualization (these will be attributes of the <svg> tag
        .attr('height', height)
        .append('svg:g') //make a group to hold our pie chart
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')'); //move the center of the pie chart from 0, 0 to radius, radius

    let arc = d3.arc() //this will create <path> elements for us using arc data
        .innerRadius(radius - 60)
        //                                .outerRadius(radius);
        .outerRadius(radius - 10); // full height semi pie
    //.innerRadius(0);
    let outerArc = d3.arc()
        .innerRadius(radius * 1.1)
        .outerRadius(radius * 1.1)

    let outeroArc = d3.arc()
        .innerRadius(radius * 1.3)
        .outerRadius(radius * 1.3)

    let pie = d3.pie() //this will create arc data for us given a list of values
        .startAngle(-Math.PI / 2)
        .endAngle(Math.PI / 2)
        .padAngle(0.01) // some space between slices
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



    arcs
        .append('svg:text')
        .attr('class', 'labels') //add a label to each slice
        .attr('fill', '#000')
        .attr('transform', function(d) {
            let pos = outerArc.centroid(d);
            let midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
            let t = pos[0];
            //pos[0] = 0 - pos[1] ;
            //pos[1] = t ;
            return 'translate(' + pos + ')';
        })
        .attr('text-anchor', 'middle') //center the text on it's origin
        .text(function(d, i) {
            return data[i].value;
        })
        .text(function(d, i) {
            return data[i].value;
        }); //get the label from our original data array


    arcs
        .append('svg:text')
        .attr('class', 'labels2') //add a label to each slice
        .attr('fill', '#000')
        .attr('transform', function(d) {
            let pos = outerArc.centroid(d);
            let midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
            let t = pos[0];
            pos[1] = pos[1] - 20;
            //pos[1] = t ;


            return 'translate(' + pos + ')';
        })
        .attr('text-anchor', 'middle') //center the text on it's origin
        .text(function(d, i) {
            return data[i].label;
        })
        .text(function(d, i) {
            return data[i].label;
        }); //get the label from our original data array

},[tmpData]) 
  return (
    <svg ref={ref}/>
  )
}

export default memo(ChangeRequestPerRisk)