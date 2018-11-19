import React, {Component} from 'react';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import {Line, Radar} from 'react-chartjs-2';

import utilData from "../../../common/utils";

class CountryRaderChart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: null,
            selectedType: null,
        };

        this.styles = this.props.classes;
        this.keys = [];

        this.prepareRadarChart = this.prepareRadarChart.bind(this);
        this.prepareOption = this.prepareOption.bind(this);
    }

    componentWillMount() {
        this.setState({
            data: this.props.data,
            selectedType: this.props.selectedType,
            selectedYear: this.props.selectedYear,
            selectedData: this.props.data.groupedDataSet[Object.values(this.props.data.selectedCountry)[0].countryName + Object.values(this.props.data.selectedCountry)[0].year]
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data,
            selectedType: nextProps.selectedType,
            selectedYear: nextProps.selectedYear,
            selectedData: nextProps.data.groupedDataSet[Object.values(nextProps.data.selectedCountry)[0].countryName + Object.values(nextProps.data.selectedCountry)[0].year]
        });
    }

    prepareRadarChart = () => {
        let labels = [];
        let data = [];
        let keys = [];
        Object.values(utilData.typePair).forEach((p) => {
            if (p.separator.length > 0){
                labels.push(p.display + " in " + p.separator);
                data.push(this.state.selectedData[p.key]);
                keys.push(p.key);
            }
        });

        this.keys = keys;

        return {
            labels: labels,
            datasets: [
                {
                    label: 'Overview of ' + this.state.selectedData.countryName + " in year of " + this.state.selectedData.year,
                    backgroundColor: utilData.colors.world.main,
                    borderColor: utilData.colors.world.medium,
                    pointBorderColor: utilData.colors.world.light,
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: utilData.colors.world.main,
                    pointHoverBorderColor: utilData.colors.world.medium,
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: data
                }
            ]
        };
    };

    prepareOption = () => {
        let data = [];
        let scale = 0;
        Object.values(utilData.typePair).forEach((p) => {
            if (p.separator.length > 0){
                data.push(this.state.selectedData[p.key]);
            }

        });

        scale = data.sort()[data.length - 1];
        return {
            maintainAspectRatio: true,
            scale: {
                ticks: {
                    beginAtZero: true,
                    max: (scale+20) < 100 ? (parseInt(scale/10, 10) + 2) * 10 : 100
                }
            },
            tooltips: {
                mode: 'label',
                position: 'nearest',
                callbacks: {
                    label: (tooltipItem, data) => {
                        let key = this.keys[tooltipItem.index];
                        return utilData.typePair[key].display + ": " + (this.state.selectedData[key] === 0 ? "No data available for this country in this year" : this.state.selectedData[key] + utilData.typePair[key].separator);
                    }
                },
            },
        }
    };

    render(){
        console.log(this.state.selectedData);
        return (
            <Radar data={this.prepareRadarChart()} width={600} height={350} options={this.prepareOption()}/>
        )
    }

}

const styles = theme => ({
    container: {
        display: "flex",
        flexDirection: 'column',
    }
});

CountryRaderChart.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    selectedType: PropTypes.string.isRequired,
    selectedYear: PropTypes.string.isRequired
};

export default withStyles(styles)(CountryRaderChart);
