import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

function VerticalBarChartNegative(props) {

  // var data = props.data;
  var margin = ({top: 10, right: 60, bottom: 10, left: 20})
  var height = props.height
  var width = props.width


  var barHeight = 25

  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
  }, []);

  useEffect(() => {
    const svg = d3.select(ref.current)
    svg.selectAll("*").remove();
    drawChart();
  }, [props.data]);

  const drawChart = () => {

    var data = Array.from(props.data, x=> ({name: x.name, value: parseFloat(x.value)}));
    // data = props.data

    const svg = d3.select(ref.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height )
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")")


    console.log(d3.extent(data, d => d.value))
    var x = d3.scaleLinear()
    .domain(d3.extent(data, d => d.value))
    .rangeRound([margin.left, width - margin.right])

    var y = d3.scaleBand()
    .domain(d3.range(data.length))
    .rangeRound([margin.top, height - margin.bottom])
    .padding(0.1)

    var yAxis = g => g
    .attr("transform", `translate(${x(0)},0)`)
    .call(d3.axisLeft(y).tickFormat(i => data[i].name).tickSize(0).tickPadding(6))
    .call(g => g.selectAll(".tick text").filter(i => data[i].value < 0)
        .attr("text-anchor", "start")
        .attr("x", 6))
        .style("font-size","13px");


    var xAxis = g => g
    .attr("transform", `translate(0,${margin.top})`)
    .call(g => g.select(".domain").remove())

    y = d3.scaleBand()
    .domain(d3.range(data.length))
    .rangeRound([margin.top, height - margin.bottom])
    .padding(0.1)

    // svg.selectAll("*").remove();

    data.sort(function(a, b) {
      return d3.ascending(parseFloat(a.value), parseFloat(b.value))
    })

    
    svg.append("g")
    .selectAll("rect")
    .data(data)
    .join("rect")
      // .attr("fill", d => d3.schemeSet2[d.value > 0 ? 1 : 0])
      .attr("fill", d => d.value>0? "#a6d854" : "#fc8d62")
      .attr("x", d => x(Math.min(d.value, 0)))
      .attr("y", (d, i) => y(i))
      .attr("width", d => Math.abs(x(d.value) - x(0)))
      .attr("height", y.bandwidth());


      x = d3.scaleLinear()
    .domain(d3.extent(data, d => d.value))
    .rangeRound([margin.left, width - margin.right])

  svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
    .selectAll("text")
    .data(data)
    .join("text")
      .attr("text-anchor", d => d.value < 0 ? "end" : "start")
      .attr("x", d => x(d.value) + Math.sign(d.value - 0) * 4)
      .attr("y", (d, i) => y(i) + y.bandwidth() / 2)
      .attr("dy", "0.1em")
      .text(d => d.value + props.suffix)
      .style("font-size","13px");

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  // return svg.node();

  }

  return (
    <div className="piechart" style={{ padding: 0, margin:0, display:"flex", justifyContent:"center" }}>
    <svg ref={ref} style={{padding:"0px",  display: "block", margin:"0%"}} preserveAspectRatio={"xMidYMid meet"} viewBox={`0 0 ${props.width} ${props.height}`} >
  </svg>
    </div>
  );

}

export default VerticalBarChartNegative;