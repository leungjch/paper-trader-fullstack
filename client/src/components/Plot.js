// Plot.js
import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';

function Plot({ width, height, data, usingLinear }){

    // https://stackoverflow.com/a/23398499
    function getMinMaxOf2DIndex (arr, idx) {
        return {
            min: Math.min.apply(null, arr.map(function (e) { return e[idx]})),
            max: Math.max.apply(null, arr.map(function (e) { return e[idx]}))
        }
    } 

    const ref = useRef();

    useEffect(() => {
        const svg = d3.select(ref.current)
            .attr("width", width)
            .attr("height", height)
    }, []);

    useEffect(() => {
        draw();
    }, [data, usingLinear]);

    const draw = () => {


        const svg = d3.select(ref.current);
        // Clear svg before drawing
        svg.selectAll("*").remove();

        // svg.append("rect")
        // .attr("width", "100%")
        // .attr("height", "100%")
        // .attr("fill", "pink")
        // .attr("rx", "2%")								// how much to round corners - to be transitioned below
     
        
        var selection = svg.selectAll("circle").remove().data(data);
        console.log(data)

        var yMinMax = getMinMaxOf2DIndex(data, 1);
        var xMinMax = getMinMaxOf2DIndex(data, 0);
        var avgY = (yMinMax.max-yMinMax.max)/2

        console.log("max data is", yMinMax, xMinMax)


        var scaleX = d3.scaleLinear()
                            .domain([xMinMax.min - 1, xMinMax.max + 1])
                            .range([105, width-50]);

        if (usingLinear) {
            var scaleY = d3.scaleLinear()

        }
        else {
            var scaleY = d3.scaleSymlog()
        }

        scaleY.domain([yMinMax.min, yMinMax.max])
        .range([height*5/6, 20]);

        // Add axes
        var xAxis = d3.axisBottom()
                    .scale(scaleX);
        var yAxis = d3.axisLeft()
                    .scale(scaleY);

        
        // Draw lolipop lines
        // svg.selectAll("myline")
        // .data(data).enter()
        // .append("line")
        // .attr("x1", function(d) { return scaleX(d[0]); })
        // .attr("x2", function(d) { return scaleX(d[0]); })
        // .attr("y1", function(d) {return scaleY(d[1])})
        // .attr("y2", scaleY(yMinMax.min))
        // .attr("stroke", "grey")


        // Plot points
        selection
        .data(data).enter()
        .append("circle")
        .attr('transform', 'translate(' + 0 +',' + '0)')

        .attr("cx", function(d) {return scaleX(d[0])})
        .attr("cy", function(d) {return scaleY(d[1])})
        .attr("r", 2)
        .attr("fill", "orange")
        




        // selection
        //     .exit()
        //     .transition().duration(300)
        //         .attr("y", (d) => height)
        //         .attr("height", 0)
        //     .remove()

        var xAxisTranslate = height*5/6 + 10;

        svg.append("g")
        .attr("class", "axis x")
        .attr("transform", "translate(0, " + xAxisTranslate  +")")
        .call(xAxis)

         svg.append("g")
        .attr("class", "axis y")
        .attr("transform", "translate(100, 10)")
        .call(yAxis.tickFormat(d3.format("~g")));
        

         }


    return (
        <div className="chart" style={{padding:10}}>
            <svg ref={ref} >
            </svg>
        </div>
        
    )

}

export default Plot;