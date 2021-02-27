import * as d3 from 'd3';
import { addWeeks } from '../../util/TimeHelpers';
import { updateDatapoints, updateXAxis, updateYAxis } from './UpdateTimeSeriesComponents';

/**
* 
* 
*/
function timeSeriesChart(){
	//flags and identifiers
	var svg;
	//settings
	var sizes = {
		//default is MS sizes
		width:600, height:400,
		margin: {top:50, bottom:50, left:50, right:50},
		chartWidth:500, chartHeight:300
	}
	const { chartWidth, chartHeight, margin } = sizes;
	
	function chart(selection){
		selection.each(function(data){
			console.log('chart', data)
			svg = d3.select(this);
			/*d3 way to render once only (not needed as we use React)
			  svg.selectAll('xAxisG').data([0, 1]).enter().append('g')....*/
			//extents
			const xExtent = d3.extent(data, d => d.date);
			const yExtent = d3.extent(data, d => d.value);
			//scales
			const xScale = d3.scaleTime()
				.domain(xExtent[0] ? xExtent : [addWeeks(-12, new Date()), addWeeks(12, new Date())] ) 
				.range([margin.left, chartWidth + margin.left])
				.nice()

			const yScale = d3.scaleLinear()
				.domain(yExtent[0] ? yExtent : [0, 100])
				.range([chartHeight + margin.top, margin.top])
				.nice()

			updateXAxis(svg, xScale, margin.top+chartHeight);
			updateYAxis(svg, yScale, margin.left);
			updateDatapoints(svg, data, xScale, yScale);
		})
	}
	//api
	chart.sizes = function(value){
		if(!arguments.length)
			return sizes;
		sizes = {...sizes, ...value}; 
		return chart;
	}
	return chart;
}

export default timeSeriesChart;