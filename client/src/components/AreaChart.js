import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import moment from 'moment';

function AreaChart(props) {

    // var data = props.data;
    var margin = {top: 10, right: 30, bottom: 50, left: 50};
    var width = props.width - margin.left + margin.right;

    var height = props.height - margin.top - margin.bottom;

    const ref = useRef();

    useEffect(() => {
        // const svg = d3.select(ref.current)
        // .append("svg")
        // .attr("width", width + margin.left + margin.right)
        // .attr("height", height + margin.top + margin.bottom)
        // .append("g")
        // .attr("transform",
        //       "translate(" + margin.left + "," + margin.top + ")");

            }, []);

    useEffect(() => {
        d3.select(ref.current).selectAll("*").remove()
        drawChart();
    }, [props.data]);

    const drawChart = () => {
        console.log("PROPS DATA IS", props.data)
        let data = props.data.map(prevObj => ({date: d3.timeParse("%Y-%m-%d")(moment(prevObj.tstamp).format("YYYY-MM-DD")), value: prevObj.networth}))
        console.log("PROPS DATA", data)

        var svg = d3.select(ref.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
    
    // Add X axis --> it is a date format
    var x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.date; }))
      .range([ 0, width+margin.right ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y_extent = d3.extent(data, function(d) { return d.value})
    console.log(y_extent)
    var y_extent_diff = 0.05 * Math.abs(y_extent[1] - y_extent[0])
    var y = d3.scaleLinear()
        .domain([y_extent[0]-y_extent_diff, y_extent[1]])
        .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // Add the area
    svg.append("path")
      .datum(data)
      .attr("fill", "#cce5df")
      .attr("stroke", "#69b3a2")
      .attr("stroke-width", 1.5)
      .attr("d", d3.area()
        .x(function(d) { return x(d.date) })
        .y0(y(y_extent[0]-y_extent_diff))
        .y1(function(d) { return y(d.value) })
        )
    }

    return (
      <div className="areachart" style={{  alignContent:"center", alignItems:"center", }}>
      <svg ref={ref} style={{display: "block", margin:"auto"}} viewBox={`0 0 ${props.width} ${props.height}`} >
      </svg>
  </div>
);


}

export default AreaChart;