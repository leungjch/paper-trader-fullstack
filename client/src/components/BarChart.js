import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

function BarChart(props) {


    const ref = useRef();

    useEffect(() => {
        const svg = d3.select(ref.current)
                        .attr("width", props.width)
                        .attr("height",props.height)
    }, []);

    useEffect(() => {
        drawChart();
    }, []);
    

    const drawChart = () => {
        const data = props.data;
        const svg = d3.select(ref.current);
                svg.selectAll("*").remove();

        const h = props.height;

        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * 70)
            .attr("y", (d, i) => h - 10 * d)
            .attr("width", 65)
            .attr("height", (d, i) => d * 20)
            .attr("fill", "green")

        svg.selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .text((d) => d)
            .attr("x", (d, i) => i * 70)
            .attr("y", (d, i) => h - (10 * d) - 3)

        //selection.attr(“property”, (d, i) => {})
    }

    return (
        <div className="barchart" style={{padding:10}}>
            <svg ref={ref} >
            </svg>
        </div>
    );

}

export default BarChart;