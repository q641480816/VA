import React, {Component} from 'react';
import PropTypes from "prop-types";
import {scaleLinear} from "d3-scale";
import Card from '@material-ui/core/Card';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';

import MapElement from "./mapElement/mapElement";

import utilData from "../common/utils";

import './map.css';

class Map extends Component{

    constructor(props) {
        super(props);
        this.state = {
            mapClass: null,
            data: null,
            selectedType: "prevalenceInPercent",
            year: "1980"
        };

        this.prepareMapClass = this.prepareMapClass.bind(this);
        this.processData = this.processData.bind(this);
        this.renderSelectType = this.renderSelectType.bind(this);
        this.onSelectTypeChange = this.onSelectTypeChange.bind(this);
    }

    componentWillMount(){
        this.setState({
            mapClass: this.prepareMapClass(),
            data: this.props.data
        });
    }

    componentDidMount(){}

    renderSelectType = () => {
        return (
            <FormControl>
                <Select name="type" displayEmpty value={this.state.selectedType} onChange={(event) => this.onSelectTypeChange(event)}>
                    <MenuItem value="" disabled>
                        Types
                    </MenuItem>
                    {Object.keys(utilData.typePair).map((key) => {
                            return (<MenuItem value={utilData.typePair[key].key}>
                                {utilData.typePair[key].display}
                            </MenuItem>)
                    })}
                </Select>
            </FormControl>
        )
    };

    prepareMapClass = () => {
        let height =  document.documentElement.clientHeight * 0.78;
        let width = height/5*9;
        return {
            position: 'relative',
            marginLeft: "auto",
            marginRight: 'auto',
            marginBottom: '-50px',
            height: height+"px",
            width: width+"px",
        }
    };

    processData = () => {
        let key = utilData.typePair[this.state.selectedType]["key"];
        let data = this.state.data["typeYearDataSet"][key]["data"][this.state.year];

        let dataset = {};
        let onlyValues = data.map((o) => {
            return o[key];
        });

        //calculate color
        let minValue = Math.min.apply(null, onlyValues), maxValue = Math.max.apply(null, onlyValues);
        let paletteScale = scaleLinear()
            .domain([minValue,maxValue])
            .range(["#EFEFFF","#02386F"]);

        //prepare data
        data.forEach((o) => { //
            let iso = o.countryCode, value = o[key];
            dataset[iso] = { numberOfThings: value, fillColor: paletteScale(value) };
        });

        return dataset;
    };

    onSelectTypeChange = (event) => {
        this.setState({
            selectedType: event.target.value,
            year: this.state.data["typeYearDataSet"][event.target.value]["years"][0]
        })
    };

    render() {
        return (
            <div className={"map-base"}>
                <Card>
                    <AppBar position="static" color="white" className={"configBar"}>
                        <Toolbar>
                            {this.renderSelectType()}
                        </Toolbar>
                    </AppBar>
                    <MapElement mapClass={this.state.mapClass} data={this.processData()}/>
                </Card>
            </div>
        );
    }
}

Map.propTypes = {
    data: PropTypes.object.isRequired
};

export default Map;
