import React, {Component} from 'react';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import BaseDialog from "../../component/baseDialog/baseDialog";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import utilData from "../../common/utils";
import CountryLineChart from "./charts/countryLineChart";
import CountryRaderChart from "./charts/countryRadarChart";

class CountrySelectDialog extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: 0,
            data: null,
            selectedType: null,
            worldDataSet: {},
            title: "",
            selectedYear: "1980",
            groupedDataSet: {}
        };

        this.styles = this.props.classes;

        this.openDialog = this.openDialog.bind(this);
        this.onTabChange = this.onTabChange.bind(this);
    }

    componentWillMount() {
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {
        this.props.onRef(null);
    }

    openDialog = (data, selectedType, selectedYear) => {
        //prepare world dataset
        let worldDataSet = {};
        Object.keys(data.source.data).forEach((year) => {
            worldDataSet[year] = data.source.data[year].map((d) => {
                return d[selectedType]
            }).sort((a, b) => b - a);
        });

        this.setState({
            data: Object.values(data.selectedCountry).length !== 0 ? data : null,
            selectedType: selectedType,
            worldDataSet: worldDataSet,
            title: utilData.typePair[selectedType].display + " in " + Object.values(data.selectedCountry)[0].countryName,
            selectedYear: selectedYear,
        });

        if (Object.values(data.selectedCountry).length !== 0) {
            this.dialog.handleClickOpen();
        } else {
            alert("N/A");
        }
    };

    onTabChange = (event, index) => {
        this.setState({
            value: index,
            title: index === 0 ? utilData.typePair[this.state.selectedType].display + " in " + Object.values(this.state.data.selectedCountry)[0].countryName : "Overview in " + Object.values(this.state.data.selectedCountry)[0].countryName
        })
    };

    render() {
        if (this.state.data != null) {
            return (
                <BaseDialog onRef={instance => {
                    this.dialog = instance;
                }} title={this.state.title}>
                    <AppBar position="static" color="default">
                        <Tabs
                            value={this.state.value}
                            onChange={(event, value) => this.onTabChange(event, value)}
                            indicatorColor="primary"
                            textColor="primary"
                            fullWidth
                        >
                            <Tab
                                label={this.state.selectedType ? utilData.typePair[this.state.selectedType].display : "Null"}/>
                            <Tab label="Country Overview"/>
                        </Tabs>
                    </AppBar>
                    <div className={this.styles.container}>
                        {this.state.value === 0 &&
                        <CountryLineChart data={this.state.data} selectedType={this.state.selectedType}
                                          worldDataSet={this.state.worldDataSet}/>}
                        {this.state.value === 1 &&
                        <CountryRaderChart data={this.state.data} selectedType={this.state.selectedType} selectedYear={this.state.selectedYear}/>}
                    </div>
                </BaseDialog>
            )
        } else {
            return (
                <div/>
            )
        }
    }

}

const styles = theme => ({
    container: {
        display: "flex",
        flexDirection: 'column',
        [theme.breakpoints.down('xs')]: {
            padding: '6px',
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: '24px !important',
            padding: '9px',
        },
        [theme.breakpoints.up('md')]: {
            padding: '12px',
        }
    }
});


CountrySelectDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CountrySelectDialog);
