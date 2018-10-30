import React, {Component} from 'react';
import PropTypes from "prop-types";
import Datamaps from "datamaps/dist/datamaps.world.hires.min";
import {withStyles} from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';
import * as d3 from "d3";
import utilData from "../../common/utils";
import CountrySelectDialog from "../countrySelectDialog/countrySelectDialog";

console.log(d3);

class MapElement extends Component{

    constructor(props) {
        super(props);
        this.state = {
            mapClass: null,
            map: null,
            data: null,
            legendBlockSize: 7,
            borderDefault: '#DEDEDE',
            highlightBorderColor: '#FFFF00',
            highlightStrokeWidth: 1,
            defaultStrokeWidth: 0.45,
            selectedArea: utilData.mapProjection[0]
        };

        this.mapRef = React.createRef();
        this.styles = this.props.classes;

        this.drawMap = this.drawMap.bind(this);
        this.clearMap = this.clearMap.bind(this);
        this.getPupUp = this.getPupUp.bind(this);
        this.renderLegend = this.renderLegend.bind(this);
        this.onLegendBlockMouseOver = this.onLegendBlockMouseOver.bind(this);
        this.onLegendBlockMouseOut = this.onLegendBlockMouseOut.bind(this);
    }

    componentWillMount(){
        window.addEventListener("resize", ()=>{});
        this.setState({
            mapClass: this.props.mapClass,
            data: this.props.data,
            selectedArea: this.props.selectedArea
        });
    }

    componentDidMount(){
        this.setState({
            map: this.drawMap()
        });
    }

    componentWillReceiveProps(nextProps) {
        let map = this.state.map;

        if (nextProps.data !== this.state.data) {
            map.updateChoropleth(nextProps.data.dataset);
        }

        if (nextProps.selectedArea !== this.state.selectedArea) {
            map.svg.selectAll("g").attr("transform", nextProps.selectedArea.projection);
        }

        this.setState({
            data: nextProps.data,
            map: map,
            mapClass: nextProps.mapClass,
            selectedArea: nextProps.selectedArea
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //responsive map
        if (this.state.mapClass !== prevState.mapClass) {
            this.clearMap();
            this.setState({map: this.drawMap()});
        }
    }

    componentWillUnmount() {
        this.clearMap();
    }

    getPupUp = (geography, data) => {
        let content = data === null ? 'No Data Available' : data.numberOfThings;
        return(
            '<div class="hoverinfo" style="display: flex; flex-direction: column">' +
                '<span>' + geography.properties.name + '</span>' +
                '<span style="margin-top: 5px;">' + content + '</span>' +
            '</div>'
            )
    };

    drawMap = () => {
        //USA
        let map = new Datamaps({
            scope: 'world',
            element: document.getElementById("mapContainer"),
            projection: 'equirectangular',
            responsive: false,
            dataType: 'json',
            fills: {
                defaultFill: '#ddd'
            },
            done: (datamap) => {
                datamap.svg.selectAll('.datamaps-subunit').on('click', (geography) => {
                    //console.log(geography.properties);
                    this.countrySelectDialog.openDialog(this.state.data.fullData);
                });
            },
            data: this.state.data.dataset,
            geographyConfig: {
                borderColor: this.state.borderDefault,
                borderWidth: this.state.defaultStrokeWidth,
                highlightBorderColor: this.state.highlightBorderColor,
                highlightBorderWidth: this.state.highlightStrokeWidth,
                highlightFillColor: (o) => {
                    return o['fillColor'] || '#ddd';
                },
                highlightOnHover: true,
                popupTemplate: (geography, data) => this.getPupUp(geography, data)
            }
        });

        map.svg.selectAll("g").attr("transform", this.state.selectedArea.projection);
        return map;
    };

    renderLegend = () => {
        if (this.state.data.legendSet){
            return(
                <div className={this.styles.legendContainer}>
                    <div className={this.styles.legendWrapper}
                         style={{width: this.state.data.legendSet.length*this.state.legendBlockSize + "vw", minWidth: 38*this.state.data.legendSet.length+"px"}}>
                        {this.state.data.legendSet.map((legend) => (
                            <Tooltip title={legend.display} placement={"top"} key={legend.display}>
                                <div className={this.styles.legendBlock} style={{backgroundColor: legend.color, width: this.state.legendBlockSize + "vw"}}
                                     onMouseOver={() => this.onLegendBlockMouseOver(legend.valueSet)} onMouseOut={() => this.onLegendBlockMouseOut()}/>
                            </Tooltip>
                        ))}
                    </div>
                </div>
            )
        }
    };

    clearMap = () => {
        const map = this.mapRef.current;
        for (const child of Array.from(map.childNodes)) {map.removeChild(child);}
    };

    onLegendBlockMouseOver = (values) => {
        values.forEach((iso) => {
            this.state.map.svg
                .selectAll('.' + iso)
                .transition()
                .style('stroke-width', this.state.highlightStrokeWidth)
                .style('stroke', this.state.highlightBorderColor);
        });
    };

    onLegendBlockMouseOut = () => {
        this.state.map.svg
            .selectAll('.datamaps-subunit')
            .transition()
            .style('stroke', this.state.borderDefault);
    };

    render() {
        return (
            <div>
                <div id="mapContainer" style={this.state.mapClass} ref={this.mapRef} />
                {this.renderLegend()}
                <CountrySelectDialog onRef={instance => { this.countrySelectDialog = instance; }}/>
            </div>
        );
    }
}

MapElement.propTypes = {
    mapClass: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    selectedArea: PropTypes.object.isRequired,
};

const styles = theme => ({
    legendContainer: {
        position: 'relative',
        width: '100vw',
        [theme.breakpoints.down('xs')]: {
            marginTop: '-5px',
        },
        [theme.breakpoints.up('sm')]: {
            marginTop: '-10px',
        },
        [theme.breakpoints.up('md')]: {
            marginTop: '-17px',
        },
    },
    legendWrapper: {
        position: 'relative',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'row'
    },
    legendBlock: {
        borderTop: '2px solid #ffffff',
        borderBottom: '2px solid #ffffff',
        position: 'relative',
        zIndex: 100,
        minWidth: '38px',
        [theme.breakpoints.down('xs')]: {
            height: '4px',
        },
        [theme.breakpoints.up('sm')]: {
            height: '10px',
        },
        [theme.breakpoints.up('md')]: {
            height: '12px'
        },
        '&:hover': {
            borderTop: '2px solid #FFFF00',
            borderBottom: '2px solid #FFFF00',
        },
    }
});

export default withStyles(styles)(MapElement);
