import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

function BarChartNegative(props) {

  // var data = props.data;
  var margin = { top: 30, right: 30, bottom: 60, left: props.width/6 };
  var width = props.width - margin.left - margin.right;
  var height = props.height - margin.top - margin.bottom;

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

    // const data = [{ticker: "V", current_total:10}, {ticker:"F", current_total:5}]
    let data = props.data;
    console.log("DATA BARCHART IS", data)

    let maxY = d3.max(data, function (d) { return parseFloat(d.current_total) })
    let minY = d3.min(data, function (d) { return parseFloat(d.current_total) })

    const svg = d3.select(ref.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")")

    // svg.selectAll("*").remove();

    data.sort(function(a, b) {
      return d3.descending(parseFloat(a.current_total), parseFloat(b.current_total))
    })

    var x = d3.scaleBand()
      .range([0, width])
      .domain(data.map((s) => s.ticker))
      .padding(0.2);

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(12,0)rotate(-10)")
      .style("text-anchor", "end")
      .style("font-size","13px");
      ;

    // Add Y axis
    if (props.allowNegative) {
      var y = d3.scaleLinear()
      .domain([1.1*minY, 1.1*maxY])
      .range([height, 0]);
    } else {
      var y = d3.scaleLinear()
      .domain([0, maxY])
      .range([height, 0]);
    }




    svg.append("g")
      .call(
      d3.axisLeft(y)
      .tickFormat(d => props.prefix + d.toString() + props.suffix)
      );

    // Bars
    svg.selectAll("mybar")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", function (d) { return x(d.ticker); })
      .attr("y", function(d) {
        if(y(0) > y(d.current_total))
            return y(d.current_total);
        else
          return y(0);
    })
      .attr("width", x.bandwidth())
      .attr("height", function(d) {
        return Math.abs(y(0) - y(d.current_total));
    })
    .attr("fill", function(d) {
      if(y(0) > y(d.current_total))
          return "#a6d854"
      else
        return "#fc8d62";
  })
 // Add y=0
  svg.append("line")
  .attr("x1",-6)
  .attr("y1",y(0))//so that the line passes through the y 0
  .attr("x2",width)
  .attr("y2",y(0))//so that the line passes through the y 0
  .style("stroke", "black");

    //selection.attr(“property”, (d, i) => {})
  }

  return (
    <div className="barchart" style={{ padding: 0, display:"flex", justifyContent:"center" }}>
      <svg ref={ref} style={{display: "block"}} viewBox={`0 0 ${props.width} ${props.height}`} >
      </svg>
    </div>
  );

}

export default BarChartNegative;