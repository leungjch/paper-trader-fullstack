import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

function TreeMap(props) {


  // var data = props.data;
  
  var margin = { top: 10, right: 10, bottom: 10, left: 10 },
    width = props.width - margin.left - margin.right,
    height = props.height - margin.top - margin.bottom;

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
    const svg = d3.select(ref.current)
    svg.selectAll("*").remove();


    drawChart();
  }, [props.data]);

  const drawChart = () => {
    var data  = {
      "children":[
         {
            "name":"Automobiles",
            "children":[
               {
                  "name":"TSLA",
                  "value":9,
                  "colname":"level3"
               },
               {
                  "name":"HONDA",
                  "value":19,
                  "colname":"level3"
               },
               {
                  "name":"mister_c",
                  "value":18,
                  "colname":"level3"
               },
               {
                  "name":"mister_d",
                  "value":19,
                  "colname":"level3"
               }
            ],
            "colname":"level2"
         },
         {
            "name":"Financial Services",
            "children":[
               {
                  "name":"mister_e",
                  "value":14,
                  "colname":"level3"
               },
               {
                  "name":"mister_f",
                  "value":11,
                  "colname":"level3"
               },
               {
                  "name":"mister_g",
                  "value":15,
                  "colname":"level3"
               },
               {
                  "name":"mister_h",
                  "value":16,
                  "colname":"level3"
               }
            ],
            "colname":"level2"
         },
         {
            "name":"boss3",
            "children":[
               {
                  "name":"mister_i",
                  "value":10,
                  "colname":"level3"
               },
               {
                  "name":"mister_j",
                  "value":13,
                  "colname":"level3"
               },
               {
                  "name":"mister_k",
                  "value":13,
                  "colname":"level3"
               },
               {
                  "name":"mister_l",
                  "value":25,
                  "colname":"level3"
               },
               {
                  "name":"mister_m",
                  "value":16,
                  "colname":"level3"
               },
               {
                  "name":"mister_n",
                  "value":50,
                  "colname":"level3"
               }
            ],
            "colname":"level2"
         }
      ],
      "name":"CEO"
   };
   var data = props.data;
    const svg = d3.select(ref.current);

    // Give the data to this cluster layout:
    var root = d3.hierarchy(data).sum(function(d){ return d.value});

    // initialize treemap
    d3.treemap()
        .size([width, height])
        .paddingTop(28)
        .paddingRight(7)
        .paddingInner(3)
        (root);
    
    const color = d3.scaleOrdinal()
        .domain(["boss1", "boss2", "boss3"])
        .range([ "#402D54", "#D18975", "#8FD175"]);

    const opacity = d3.scaleLinear()
        .domain([10, 30])
        .range([.5,1]);


    // Select the nodes
    var nodes = svg
                .selectAll("rect")
                .data(root.leaves())

    // draw rectangles
    nodes.enter()
        .append("rect")
        .attr('x', function (d) { return d.x0; })
        .attr('y', function (d) { return d.y0; })
        .attr('width', function (d) { return d.x1 - d.x0; })
        .attr('height', function (d) { return d.y1 - d.y0; })
        .style("stroke", "black")
        .style("fill", function(d){ return color(d.parent.data.name)} )
        .style("opacity", function(d){ return opacity(d.data.value)})

    nodes.exit().remove()

    // select node titles
    var nodeText = svg
        .selectAll("text")
        .data(root.leaves())

    // add the text
    nodeText.enter()
        .append("text")
        .attr("x", function(d){ return d.x0+5})    // +10 to adjust position (more right)
        .attr("y", function(d){ return d.y0+20})    // +20 to adjust position (lower)
        .text(function(d){ return d.data.name })
        .attr("font-size", "15px")
        .attr("fill", "white")
    
    // select node titles
    var nodeVals = svg
        .selectAll("vals")
        .data(root.leaves())  

    // add the values
    nodeVals.enter()
        .append("text")
        .attr("x", function(d){ return d.x0+5})    // +10 to adjust position (more right)
        .attr("y", function(d){ return d.y0+35})    // +20 to adjust position (lower)
        .text(function(d){ return "$"+d.data.value })
        .attr("font-size", "11px")
        .attr("fill", "white")

    // add the parent node titles
    svg
    .selectAll("titles")
    .data(root.descendants().filter(function(d){return d.depth==1}))
    .enter()
    .append("text")
        .attr("x", function(d){ return d.x0})
        .attr("y", function(d){ return d.y0+21})
        .text(function(d){ return d.data.name })
        .attr("font-size", "15px")
        .attr("fill",  function(d){ return color(d.data.name)} )

    // Add the chart heading
    // svg
    // .append("text")
    //     .attr("x", 0)
    //     .attr("y", 14)    // +20 to adjust position (lower)
    //     .text("Three group leaders and 14 employees")
    //     .attr("font-size", "19px")
    //     .attr("fill",  "grey" )
}

  return (
    <div className="treeMap" style={{ padding: 10, height:props.height, width:props.width}}>
    <svg ref={ref} style={{width:"100%", height:"100%"}} >
    </svg>
</div>
);

}

export default TreeMap;