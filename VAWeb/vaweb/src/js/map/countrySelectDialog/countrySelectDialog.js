import React, {Component} from 'react';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import BaseDialog from "../../component/baseDialog/baseDialog";
import {Line} from 'react-chartjs-2';

import utilData from "../../common/utils";

class CountrySelectDialog extends Component{

    constructor(props) {
        super(props);

        this.state = {
            data: null,
            chart: null,
            selectedType: null
        };

        this.styles = this.props.classes;

        this.openDialog = this.openDialog.bind(this);
        this.drawChart = this.drawChart.bind(this);
        this.prepareLineChart = this.prepareLineChart.bind(this);
    }

    componentWillMount(){}

    componentDidMount() {
        this.props.onRef(this);
        //
    }

    componentWillReceiveProps(nextProps){}

    componentWillUnmount() {
        this.props.onRef(null);
    }

    openDialog = (data, selectedType) => {
        this.setState({
            data: Object.values(data.selectedCountry).length !== 0? data : null,
            selectedType: selectedType
        });

        if (Object.values(data.selectedCountry).length !== 0) {
            this.dialog.handleClickOpen(utilData.typePair[this.state.selectedType].display + " in " + Object.values(data.selectedCountry)[0].countryName);
        }else {
            alert("N/A")
        }
    };

    drawChart = () => {

    };

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

    render () {
        if (this.state.data != null) {
            return (
                <BaseDialog onRef={instance => {
                    this.dialog = instance;
                }}>
                    <div className={this.styles.container}>
                        <Line width={600} height={350} options={{maintainAspectRatio: false}} data={this.prepareLineChart()}/>
                    </div>
                </BaseDialog>
            )
        }else {
            return(
                <div/>
            )
        }
    }

}

const styles = theme => ({
    container: {
        display: "flex",
        flexDirection: 'column'
    }
});


CountrySelectDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CountrySelectDialog);
