import * as d3 from 'd3';
import tooltipChart from '../tooltip/TooltipChart';

export const updateDatapoints = (container, data, xScale, yScale) =>{

    const updatedDatapointG = container.selectAll('g.datapointG')
        .data(data, d => d.date)

    const datapointGEnter = updatedDatapointG
        .enter()
        .append('g')
            .attr('class', 'datapointG')
            .attr('transform', d => 'translate('+xScale(d.date) +',' + yScale(d.value) +')');
    
        datapointGEnter
            .append('circle')
                .attr('r', 15)
                .attr('fill', 'red')

        datapointGEnter
                .on('mouseover', handleMouseover)
                .on('mouseout', handleMouseout);
        
        //note - function declarations are hoisted 
        function handleMouseover(e){
            const tooltip = tooltipChart().x(e.pageX +10).y(e.pageY +10);
            //add a tooltip on the circle
            const tooltipContainer = d3.select(this);
            tooltipContainer.data(['data here']).call(tooltip)
        }
        function handleMouseout(e){
            //remove tooltip
            //todo - this couples this func to tooltip chart - maybe we should pass
            //through the classname
            d3.select('.tooltip-container').remove();
        }

        //If we attach tooltip to datapointGs, then the boxes are rendered before circles from some reason,
        //even though they are not rendered until mouseover. Dont know why.
        //in teh book, they are attached to a separate container div, so thats
        //what ive done here, diffrently to teh book
        //and the circles are just used to position them, via the event properties
        //pageX and pageY
}



export const updateXAxis = (container, scale, vertShift) =>{
    const axis = d3.axisBottom().scale(scale).ticks(10)
    const g = container.select("g.xAxisG");

    g.attr("transform", 'translate(0,' +vertShift +')')
    .call(axis)
   
   //style lines, paths and texts together
   g.selectAll('*')
       .style("stroke-width", 0.6)
       .style("stroke", "black")
       .style("opacity", 0.6);
    
    g.selectAll('text')
        .attr('transform', 'translate(15,15) rotate(45) ')
}

    
export const updateYAxis = (container, scale, horizontalShift) =>{
    const axis = d3.axisLeft().scale(scale).ticks(5)
    const g = container.select("g.yAxisG");

	g.attr("transform", 'translate(' +horizontalShift +',0)')
	 .call(axis)
    
    //style lines, paths and texts together
    g.selectAll('*')
        .style("stroke-width", 0.6)
        .style("stroke", "black")
        .style("opacity", 0.6);

}
