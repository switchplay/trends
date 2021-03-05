import React, {/*useState, */}  from 'react';
//import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { mockData } from './data/MockData';
import ChartWrapper from './charts/ClassChartWrapperViewbox';

const useStyles = makeStyles(theme => ({

	root:{
        color:'black',
        display:'flex',
        flexDirection:'column'
    },
    topRow:{
        display:'flex',
        alignItems:'stretch', //warning  - this only works if flex item has no height prop
        flex:props => props.row1Flex,
        border:'solid', borderWidth:'thin',
    },
    middleRow:{
        display:'flex',
        alignItems:'stretch',
        flex:props => props.row2Flex
    },
    bottomRow:{
        display:'flex',
        alignItems:'stretch',
        flex:props => props.row3Flex
    },
    leftCorner:{
        flex:props => props.col1Flex,
        border:'solid', borderWidth:'thin', borderColor:'blue',
    },
    playerSelector:{
        border:'solid', borderWidth:'thin',borderColor:'blue',
        flex:props => props.col2Flex,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    kpiSelector:{
        border:'solid', borderWidth:'thin',
        flex:props => props.col1Flex,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    timeSelector:{
        border:'solid', borderWidth:'thin',
        flex:props => props.col2Flex,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    timeSeriesContainer:{
        border:'solid', borderWidth:'thin',
        flex:props => props.col2Flex,
    }
}));

const TrendsHome = () =>{
    const styleProps = {
        col1Flex:'150px 0 0', col2Flex:'60vw 0 0',
        row1Flex:'50px 0 0', row2Flex:'40vw 0 0', row3Flex:'50px 0 0',
    }
	const classes = useStyles(styleProps);
	//const [playerId, setPlayerId] = useState('');
    //const [kpiId, setKpiId] = useState('');
	return (
		<section className={classes.root}>
            <div className={classes.topRow}>
                <div className={classes.leftCorner}></div>
                <div className={classes.playerSelector}>
                    player selector
                </div>
            </div>
            <div className={classes.middleRow}>
                <div className={classes.kpiSelector}>kpi selector</div>
                <div className={classes.timeSeriesContainer}>
                    <ChartWrapper data={mockData}/>
                </div>
            </div>
            <div className={classes.bottomRow}>
                <div className={classes.leftCorner}></div>
                <div className={classes.timeSelector}>
                    time selector
                </div>
            </div>
        </section>
	)
}
TrendsHome.propTypes = {
}
TrendsHome.defaultProps = {

}

export default TrendsHome