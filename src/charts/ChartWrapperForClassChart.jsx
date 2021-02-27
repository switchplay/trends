import React, { useState, useEffect, useRef }  from 'react';
//import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TimeSeriesChart from './time-series-class/TimeSeriesChart';

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
    const chartContainer = useRef(null);
    useEffect(() =>{
        if(!chart){
            //create chart instance
            setChart(() => new TimeSeriesChart(chartContainer.current));
        }else{
            //update chart
           //chart.update();
            //d3.select(d3Ref.current).datum(data).call(chart);
        }
    },[data, chart])
    //todo - consider how safari handles svg height='100% and how best to accomodate
    return (
        <div className={classes.root} ref={chartContainer}>
        </div>
    )
}
ChartWrapper.propTypes = {
}
ChartWrapper.defaultProps = {

}

export default ChartWrapper