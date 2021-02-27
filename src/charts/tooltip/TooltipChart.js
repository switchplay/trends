import * as d3 from 'd3';

/**
* 
* 
*/
//todo - make this a flexible comp which can show a chart for comparison purposes. 
//this chart would be passed through as a setting via the api eg chartToShow
function tooltipChart(){
	//flags and identifiers
	var container;
	var x,y;
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
			//container = d3.select(this);
			container = d3.select('body').append('div')
				.datum(data)
				.attr('class', 'tooltip-container')
				.style('position', 'absolute')
				.style('left', x || 0)
				.style('top', y || 0)
				.style('width', '100px')
				.style('height', '40px')
				.style('background', 'yellow')
			console.log('container', container)

			//todo - use EUE pattern to display the data text in the tooltip
	
		})
	}
	//api
	chart.sizes = function(value){
		if(!arguments.length)
			return sizes;
		sizes = {...sizes, ...value}; 
		return chart;
	}
	chart.x = function(value){
		if(!arguments.length)
			return x;
		if(typeof value === 'number'){
			x = value + 'px'
		}else{
			x = value;
		}
		return chart;
	}
	chart.y = function(value){
		if(!arguments.length)
			return x;
			if(typeof value === 'number'){
				y = value + 'px'
			}else{
				y = value;
			} 
		return chart;
	}

	return chart;
}

export default tooltipChart;