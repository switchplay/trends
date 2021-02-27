/*
import React, { useRef }  from 'react';
import * as d3 from 'd3';

 //recall, if dependencies = [], it acts like componentDidMount => runs first time only
 //if no dependencies argument, it acts like CDM and componentDidUpdate => runs on every re-render
 //but giving it undefined is not the same
export const useD3 = (renderChartFn, dependencies) => {
    const d3Ref = useRef();
    React.useEffect(() => {
        console.log('dependencies', dependencies)
        renderChartFn(d3.select(d3Ref.current));
        return () => {};
      }, );
    return d3Ref;
}
*/