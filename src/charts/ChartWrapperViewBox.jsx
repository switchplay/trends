import React, {useState, useEffect, useRef}  from 'react';
//import PropTypes from 'prop-types';
//import { useD3 } from './hooks';
import * as d3 from 'd3';
import { makeStyles } from '@material-ui/core/styles';
import timeSeriesChart from './time-series/TimeSeriesChart';

const useStyles = makeStyles(theme => ({
	root:{
        border:'solid', borderWidth:'thin',
        height:'100%'
    },
    svg:{
        border:'solid', 
        borderColor:'red', 
        borderWidth:'thin' 
    }
}));

const ChartWrapper = ({data}) =>{
    const classes = useStyles();
    const [chart, setChart] = useState(null);
    const d3Ref = useRef(null);
    useEffect(() =>{
        if(!chart){
            //create chart instance
            setChart(() => timeSeriesChart());
        }else{
            //update chart
            d3.select(d3Ref.current).datum(data).call(chart);
        }
    },[data, chart])
    //todo - consider how safari handles svg height='100% and how best to accomodate
    return (
        <div className={classes.root}>
            <svg id='time-series-svg' width='100%' height='100%' 
                className={classes.svg}
                viewBox="0 0 600 400"
                preserveAspectRatio="xMinYMin" 
                ref={d3Ref}>
                    <g className='xAxisG axisG'/>
                    <g className='yAxisG axisG'/>
            </svg>
        </div>
    )
}
ChartWrapper.propTypes = {
}
ChartWrapper.defaultProps = {

}

export default ChartWrapper