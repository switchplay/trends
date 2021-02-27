import * as d3 from 'd3';

export default class TimeSeriesChart {
    constructor(element){
       const svg = d3.select(element)
            .append("svg")
                .attr("width", 300)
                .attr("height", 200)
        
        svg.style("border", "solid")
    }
}