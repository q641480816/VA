import React, {Component} from 'react';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import {Line} from 'react-chartjs-2';

import utilData from "../../../common/utils";

class CountryLineChart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: null,
            selectedType: null,
            worldDataSet: {}
        };

        this.styles = this.props.classes;

        this.prepareLineChart = this.prepareLineChart.bind(this);
        this.prepareOption = this.prepareOption.bind(this);
    }

    componentWillMount() {
        this.setState({
            data: this.props.data,
            selectedType: this.props.selectedType,
            worldDataSet: this.props.worldDataSet
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data,
            selectedType: nextProps.selectedType,
            worldDataSet: nextProps.worldDataSet
        });
    }

    prepareLineChart = () => {
        let prepareLineChartData = () => {
            let d = [];
            data.labels.forEach((year) => d.push(this.state.data.selectedCountry[year][this.state.selectedType]));
            return d;
        };
        let prepareWorldData = () => {
            let d = [];
            data.labels.forEach((year) => d.push(this.state.data.world[year]));
            return d;
        };
        let data = {};
        data.labels = Object.keys(this.state.data.selectedCountry).sort();
        data.datasets = [];
        let selectDataset = {
            label: this.state.data.selectedCountry[data.labels[0]].countryName,
            fill: false,
            lineTension: 0.1,
            backgroundColor: utilData.colors.country.main,
            borderColor: utilData.colors.country.medium,
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: utilData.colors.country.light,
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: utilData.colors.country.main,
            pointHoverBorderColor: utilData.colors.country.medium,
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: prepareLineChartData()
        };
        let worldDataset = {
            label: "World",
            fill: false,
            lineTension: 0.1,
            backgroundColor: utilData.colors.world.main,
            borderColor: utilData.colors.world.medium,
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: utilData.colors.world.light,
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: utilData.colors.world.main,
            pointHoverBorderColor: utilData.colors.world.medium,
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: prepareWorldData()
        };

        data.datasets.push(selectDataset, worldDataset);
        return data;
    };

    prepareOption = () => {
        return {
            maintainAspectRatio: false,
            tooltips: {
                mode: 'label',
                position: 'nearest',
                callbacks: {
                    label: (tooltipItem, data) => {
                        let label = data.datasets[tooltipItem.datasetIndex].label || '';
                        return (" " + label + ':  ' + (tooltipItem.yLabel + "").substring(0, 5) + this.state.data.separator);
                    },
                    afterBody: (tooltipItems, data) => {
                        return '\n' + data.datasets[0].label + "is ranked NO." + (this.state.worldDataSet[tooltipItems[0].xLabel].indexOf(tooltipItems[0].yLabel) + 1) + " in the World";
                    }
                },
            },
            scales: {
                yAxes: [{
                    ticks: {
                        padding: 10,
                        callback: (value, index) => {
                            return value + this.state.data.separator;
                        }
                    },
                    scaleLabel: {
                        display: true,
                        labelString: this.state.data.yLabel
                    },
                }],
                xAxes: [{
                    ticks: {
                        padding: 10
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Year'
                    },
                }]
            },
        }
    };

    render() {
        return (
            <Line width={600} height={350} options={this.prepareOption()} data={this.prepareLineChart()}/>
        )
    }
}

const styles = theme => ({
    container: {
        display: "flex",
        flexDirection: 'column',
    }
});

CountryLineChart.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    selectedType: PropTypes.string.isRequired,
    worldDataSet: PropTypes.object.isRequired
};

export default withStyles(styles)(CountryLineChart);
