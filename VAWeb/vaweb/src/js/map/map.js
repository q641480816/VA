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
import {PlayArrow, Pause, Lens} from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';

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
            isAutoPlay: false,
            mapBoxHeight: 72,
            selectedArea: utilData.mapProjection['world'].key
        };

        this.styles = this.props.classes;

        this.prepareMapClass = this.prepareMapClass.bind(this);
        this.processData = this.processData.bind(this);
        this.renderDescription = this.renderDescription.bind(this);
        this.renderSelect = this.renderSelect.bind(this);
        this.renderSlider = this.renderSlider.bind(this);
        this.onSelectTypeChange = this.onSelectTypeChange.bind(this);
        this.onSelectedAreaChange = this.onSelectedAreaChange.bind(this);
        this.play = this.play.bind(this);
        this.togglePlay = this.togglePlay.bind(this);
        this.mapResize = this.mapResize.bind(this);
    }

    componentWillMount(){
        this.setState({
            mapClass: this.prepareMapClass(),
            data: this.props.data,
            yearSet: this.props.data["typeYearDataSet"][this.state.selectedType]["years"],
        });
    }

    componentDidMount(){
        window.addEventListener("resize", this.mapResize);
    }

    componentWillUnmount(){
        window.removeEventListener("resize", this.mapResize);
    }

    renderSelect = (name, valueSource, dataSource, onChange, displayName) => {
        return (
            <FormControl disabled={this.state.isAutoPlay} style={{marginRight: '15px'}}>
                <Select name={name} displayEmpty value={this.state[valueSource]} onChange={(event) => onChange(event)} disableUnderline={true}>
                    <MenuItem value="" disabled key={""}>
                        {displayName}
                    </MenuItem>
                    {Object.keys(dataSource).map((key) => {
                        return (
                            <MenuItem value={dataSource[key].key} key={dataSource[key].key} style={{textAlign: 'center'}}>
                                <span className={this.styles.menuItem}>{dataSource[key].display}</span>
                            </MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        )
    };

    renderSlider = () => {
        return (
            <div className={"timeBar"}>
                <Slider className={"slider"} value={this.state.yearSelected} min={0} max={this.state.yearSet.length-1} step={1}
                    onChange={(event, value)=>{this.setState({yearSelected:value})}}
                    thumb={<Tooltip title={this.state.yearSet[this.state.yearSelected]}><Lens style={{ color: utilData.colors.world.medium }} /></Tooltip>}/>
            </div>
        );
    };

    renderDescription = () => {
        return (
            <div className={'description'}>
                <span className={this.styles.descriptionContent}>
                    {utilData.typePair[this.state.selectedType].description + "in " + this.state.yearSet[this.state.yearSelected]}
                 </span>
            </div>
        );
    };

    mapResize = () => {
        this.setState({mapClass: this.prepareMapClass()});
    };

    prepareMapClass = () => {
        let height =  document.documentElement.clientHeight * 0.65;
        let width = height*11/5;
        if (width >= document.documentElement.clientWidth){
            width = document.documentElement.clientWidth - 20;
            height = width/11*5;
        }
        return {
            position: 'relative',
            marginLeft: "auto",
            marginRight: 'auto',
            height: height+"px",
            width: width+"px",
        }
    };

    processData = () => {
        let resource = {};
        let key = utilData.typePair[this.state.selectedType]["key"];
        let data = this.state.data["typeYearDataSet"][key]["data"][this.state.yearSet[this.state.yearSelected]];
        let legend = this.state.data["typeYearDataSet"][key]["legend"];

        let rawData = {};
        let dataset = {};

        let onlyValues = data.map((o) => {
            return o[key];
        });

        //calculate color
        let paletteScale = scaleLinear()
            .domain([0, legend != null ? legend[legend.length - 1] : Math.max.apply(null, onlyValues)])
            .range(["#EFEFFF",utilData.colors.world.dark]);

        //prepare legend
        let separator = this.state.data["typeYearDataSet"][key]["legendSeparator"];
        let legendSet = [];
        if (legend){
            for (let i = 0; i < legend.length - 1; i++){
                legendSet.push({
                    display: legend[i] + separator + " - " + legend[i + 1] + separator,
                    color: paletteScale(legend[i]),
                    value: [legend[i], legend[i + 1]],
                    valueSet: []
                })
            }
            legendSet.push({
                display: "> " + legend[legend.length-1] + separator,
                color: paletteScale(legend[legend.length-1]),
                value: [legend[legend.length-1], Number.MAX_SAFE_INTEGER],
                valueSet: []
            })
        }

        //prepare data
        data.forEach((o) => {//
            let iso = o.countryCode, value = o[key];
            dataset[iso] = { numberOfThings: value, fillColor: paletteScale(value)};
            for(let i = 0; i < legendSet.length; i++){
                let l = legendSet[i];
                if (l.value[0] <= value && l.value[1] > value) {
                    l.valueSet.push(iso);
                }
                legendSet[i] = l;
            }
            rawData[iso] = o;
        });

        resource.dataset = dataset;
        resource.legendSet = legendSet;
        resource.fullData = {};
        resource.fullData.data = this.state.data["typeYearDataSet"][key]["data"];
        resource.fullData.worldAverage = this.state.data["typeYearDataSet"][key]["average"];
        resource.separator = separator;
        resource.rawData = rawData;

        return resource;
    };

    onSelectTypeChange = (event) => {
        this.setState({
            selectedType: event.target.value,
            yearSet: this.state.data["typeYearDataSet"][event.target.value]["years"],
            yearSelected: 0
        })
    };

    onSelectedAreaChange = (event) => {
        this.setState({
            selectedArea: event.target.value
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
                        <Toolbar style={{minHeight: '35px', height:'6vh'}}>
                            {this.renderSelect("type", "selectedType", utilData.typePair, this.onSelectTypeChange, "Types")}
                            {this.renderSelect("area", "selectedArea", utilData.mapProjection, this.onSelectedAreaChange, "Areas")}
                        </Toolbar>
                    </AppBar>
                    {this.renderDescription()}
                    <div className={this.styles.mapContainer}>
                        <MapElement mapClass={this.state.mapClass} data={this.processData()} selectedArea={utilData.mapProjection[this.state.selectedArea]} selectedType={this.state.selectedType}/>
                    </div>
                </Card>
                <div style={{width: '100vw', height: '6vh'}}>
                    <div className={"bottom"}>
                        <div style={{width: '3vw', minWidth:'25px'}}>
                            {this.state.isAutoPlay ? <Pause onClick={()=>this.togglePlay(false)}/> : <PlayArrow onClick={()=>this.togglePlay(true)}/>}
                        </div>
                        {this.renderSlider()}
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
        minHeight: '35px',
        backgroundColor: '#ffffff'
    },
    descriptionContent: {
        [theme.breakpoints.down('xs')]: {
            fontSize: '17px !important',
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: '24px !important',
            fonWeight: 'bold',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '33px !important',
            fonWeight: 'bold',
        }
    },
    mapContainer: {
        width: '100vw',
        height: '65vh',
        paddingTop: '4.5vh',
        paddingBottom: '2.5vh'
    }
});

export default withStyles(styles)(Map);
