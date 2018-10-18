import React, {Component} from 'react';
import PropTypes from "prop-types";
import {scaleLinear} from "d3-scale";
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Slider from '@material-ui/lab/Slider';
import {PlayArrow, Pause} from '@material-ui/icons'

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
            yearSet: [],
            yearSelected: 0,
            isAutoPlay: false
        };

        this.styles = this.props.classes;

        this.prepareMapClass = this.prepareMapClass.bind(this);
        this.processData = this.processData.bind(this);
        this.renderSelectType = this.renderSelectType.bind(this);
        this.onSelectTypeChange = this.onSelectTypeChange.bind(this);
        this.play = this.play.bind(this);
        this.togglePlay = this.togglePlay.bind(this);
    }

    componentWillMount(){
        this.setState({
            mapClass: this.prepareMapClass(),
            data: this.props.data,
            yearSet: this.props.data["typeYearDataSet"][this.state.selectedType]["years"],
        });
        console.log(this.props.data["typeYearDataSet"][this.state.selectedType]["years"])
    }

    componentDidMount(){}

    renderSelectType = () => {
        return (
            <FormControl disabled={this.state.isAutoPlay}>
                <Select name="type" displayEmpty value={this.state.selectedType} onChange={(event) => this.onSelectTypeChange(event)}>
                    <MenuItem value="" disabled key={""}>
                        Types
                    </MenuItem>
                    {Object.keys(utilData.typePair).map((key) => {
                            return (
                                <MenuItem value={utilData.typePair[key].key} key={utilData.typePair[key].key}>
                                    <span className={this.styles.menuItem}>{utilData.typePair[key].display}</span>
                                </MenuItem>
                            )
                    })}
                </Select>
            </FormControl>
        )
    };

    prepareMapClass = () => {
        let height =  document.documentElement.clientHeight * 0.83;
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
        let data = this.state.data["typeYearDataSet"][key]["data"][this.state.yearSet[this.state.yearSelected]];

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
            yearSet: this.state.data["typeYearDataSet"][event.target.value]["years"],
            yearSelected: 0
        })
    };

    togglePlay = (isPlay) => {
        this.setState({isAutoPlay: isPlay});
        if (isPlay) this.play(isPlay);
    };

    play = (isPlay) => {
        if (isPlay || this.state.isAutoPlay){
            let year = this.state.yearSelected + 1;
            this.setState({
                yearSelected: year,
                isAutoPlay: year !== this.state.yearSet.length - 1
            });
            setTimeout(() => {
                this.play()
            }, 200);
        }else if (this.state.yearSelected === this.state.yearSet.length - 1) {
            this.setState({yearSelected: 0})
        }
    };

    render() {
        return (
            <div className={"map-base"}>
                <Card>
                    <AppBar position="static" className={this.styles.configBar}>
                        <Toolbar style={{minHeight: '50px'}}>
                            {this.renderSelectType()}
                        </Toolbar>
                    </AppBar>
                    <MapElement mapClass={this.state.mapClass} data={this.processData()}/>
                </Card>
                <div style={{width: '100vw', height: '5vh'}}>
                    <div className={"bottom"}>
                        <div style={{width: '3vw', minWidth:'25px'}}>
                            {this.state.isAutoPlay ? <Pause onClick={()=>this.togglePlay(false)}/> : <PlayArrow onClick={()=>this.togglePlay(true)}/>}
                        </div>
                        <div className={"timeBar"}>
                            <Slider className={"slider"} value={this.state.yearSelected} min={0} max={this.state.yearSet.length-1} step={1} onChange={(event, value)=>{this.setState({yearSelected:value})}}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Map.propTypes = {
    data: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};

const styles = theme => ({
    menuItem: {
        [theme.breakpoints.down('sm')]: {
            fontSize: '12px !important',
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: '17px !important',
        }
    },
    configBar: {
        borderRadius: 0,
        height: '6vh',
        minHeight: '45px',
        backgroundColor: '#ffffff'
    }
});

export default withStyles(styles)(Map);
