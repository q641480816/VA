import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import './line-chart.css';

class LineChart extends Component {

    constructor(props){
        super(props);

        let {elementWidth, elementHeight} = props;
        this.margin = {top: 30, right: 20, bottom: 30, left: 50};

        this.x = d3.scaleLinear().range([0, elementWidth - this.margin.left - this.margin.right]);
        this.y = d3.scaleLinear().range([0, elementHeight - this.margin.top - this.margin.bottom]);
        this.elementWidth = elementWidth;
        this.elementHeight = elementHeight;

        this.state = {
            data: null
        };

    }

    componentDidMount(){
        this.prepareData();
    }

    get xAxis(){
        return d3.axisBottom(this.x).ticks(5);
    }

    get yAxis(){
        return d3.axisLeft(this.y).ticks(20);
    }

    drawXAxis(){
        d3.select(this.refs.x).call(this.xAxis);
    }

    drawYAxis(){
        d3.select(this.refs.y).call(this.yAxis);
    }

    get line(){
        return d3.line()
            .x((d)=> (this.x(d.year)))
            .y((d)=> (this.y(d.value)));
    }

    path(){
        return (<path className="line" d={this.line(this.state.data)}/>);
    }

    prepareData(){
        let rowData = this.props.data['typeYearDataSet']['cancerDeathInPercent']['average'];
        console.log(rowData);
        let data = Object.keys(rowData).map((year)=>({
            value : rowData[year],
            year : year
        }));
        console.log(data);
        this.x.domain([d3.min(data, (d) => (d.year)), d3.max(data, (d) => (d.year))]);
        const minValue = d3.min(data, (d) => (d.value))
        const maxValue = d3.max(data, (d) => (d.value))
        this.y.domain([minValue*1.1, maxValue*0.9]);
        this.setState({data: data});

    }


    render() {
        return (
            <svg width={this.elementWidth} height={this.elementHeight}>

                <g transform={`translate(${this.margin.left}, ${this.margin.top})`}>
                    {this.state.data ? this.path() : null}

                    <g ref="x" className="x axis" transform={`translate(0, ${this.elementHeight - this.margin.top - this.margin.bottom})`}>
                        {this.state.data ? this.drawXAxis() : null}
                    </g>

                    <g ref='y' className="y axis">
                        {this.state.data ? this.drawYAxis() : null}
                    </g>

                </g>

            </svg>
        );
    }
}


LineChart.propTypes = {
    elementWidth: PropTypes.number.isRequired,
    elementHeight: PropTypes.number.isRequired
};

export default LineChart;
