import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

function TreeMap(props) {

  // var data = props.data;
  var margin = { top: 30, right: 10, bottom: 10, left: 10 },
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  const ref = useRef();

  useEffect(() => {
  //   const svg = d3.select(ref.current)
  //   .append("svg")
  //   .attr("width", width + margin.left + margin.right)
  //   .attr("height", height + margin.top + margin.bottom)
  // .append("g")
  //   .attr("transform",
  //         "translate(" + margin.left + "," + margin.top + ")");
    }, []);

  useEffect(() => {
    drawChart();
  }, [props.data]);

  const drawChart = () => {

    const svg = d3.select(ref.current)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

    // Read data
    d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_dendrogram_full.json", function (data) {

      // Give the data to this cluster layout:
      var root = d3.hierarchy(data).sum(function (d) { return d.value }) // Here the size of each leave is given in the 'value' field in input data
      console.log("ROOT IS", root.leaves())
      // Then d3.treemap computes the position of each element of the hierarchy
      d3.treemap()
        .size([width, height])
        .padding(2)
        (root)

      // use this information to add rectangles:
      svg
        .selectAll("rect")
        .data(root.leaves())
        .enter()
        .append("rect")
        .attr('x', function (d) { return d.x0; })
        .attr('y', function (d) { return d.y0; })
        .attr('width', function (d) { return d.x1 - d.x0; })
        .attr('height', function (d) { return d.y1 - d.y0; })
        .style("stroke", "black")
        .style("fill", "black")

      // and to add the text labels
      svg
        .selectAll("text")
        .data(root.leaves())
        .enter()
        .append("text")
        .attr("x", function (d) { return d.x0 + 5 })    // +10 to adjust position (more right)
        .attr("y", function (d) { return d.y0 + 20 })    // +20 to adjust position (lower)
        .text(function (d) { return d.data.name })
        .attr("font-size", "15px")
        .attr("fill", "white")
    })
  }

  return (
    <div className="treeMap" style={{ padding: 10, height:'500px', width:"100%"}}>
    <svg ref={ref} style={{width:"100%", height:"100%"}} >
    </svg>
</div>
);

}

export default TreeMap;