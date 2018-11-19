import React, {Component} from 'react';
import PropTypes from "prop-types";
import Datamaps from "datamaps/dist/datamaps.world.hires.min";
import {withStyles} from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';
import utilData from "../../common/utils";
import CountrySelectDialog from "../countrySelectDialog/countrySelectDialog";
import LegendSelectDialog from "../legendSelectDialog/legendSelectDialog";
import {scaleLinear} from "d3-scale";

class MapElement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mapClass: null,
            map: null,
            data: null,
            legendBlockSize: 7,
            borderDefault: '#DEDEDE',
            highlightBorderColor: utilData.colors.highlight.dark,
            highlightStrokeWidth: 1,
            defaultStrokeWidth: 0.45,
            selectedArea: utilData.mapProjection[0],
            selectedType: "prevalenceInPercent",
            selectedYear: "1990"
        };

        this.mapRef = React.createRef();
        this.styles = this.props.classes;

        this.drawMap = this.drawMap.bind(this);
        this.clearMap = this.clearMap.bind(this);
        this.getPupUp = this.getPupUp.bind(this);
        this.renderLegend = this.renderLegend.bind(this);
        this.onLegendBlockMouseOver = this.onLegendBlockMouseOver.bind(this);
        this.onLegendBlockMouseOut = this.onLegendBlockMouseOut.bind(this);
        this.prepareCountrySelectData = this.prepareCountrySelectData.bind(this);
        this.prepareLegendSelectData = this.prepareLegendSelectData.bind(this);
        this.openLegendDialog = this.openLegendDialog.bind(this);
    }

    componentWillMount() {
        window.addEventListener("resize", () => {
        });
        this.setState({
            mapClass: this.props.mapClass,
            data: this.props.data,
            selectedArea: this.props.selectedArea,
            selectedType: this.props.selectedType,
            selectedYear: this.props.selectedYear
        });
    }

    componentDidMount() {
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
            selectedArea: nextProps.selectedArea,
            selectedType: nextProps.selectedType,
            selectedYear: nextProps.selectedYear
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
        let content = data.numberOfThings === -1 ? 'No Data Available' : data.numberOfThings;
        return (
            '<div class="hoverinfo" style="display: flex; flex-direction: column">' +
            '<span>' + geography.properties.name + '</span>' +
            '<span style="margin-top: 5px;">' + content + '</span>' +
            '</div>'
        )
    };

    openLegendDialog = (legend) => {
        this.legendSelectDialog.openDialog(this.prepareLegendSelectData(legend));
    };

    prepareCountrySelectData = (iso) => {
        let source = this.state.data.fullData;
        let data = {
            selectedCountry: {},
            world: source.worldAverage,
            source: source,
            groupedDataSet: this.state.data.groupedDataSet,
            separator: this.state.data.separator,
            selectType: this.state.selectedType
        };
        let label = utilData.typePair[this.state.selectedType].description;
        data.yLabel = (this.state.data.separator.length === 0 ? label : label + " in " + this.state.data.separator);

        Object.keys(source.data).forEach((year) => {
            for (let i = 0; i < source.data[year].length; i++) {
                if (source.data[year][i].countryCode === iso) {
                    data.selectedCountry[year] = source.data[year][i];
                    break;
                }
            }
        });
        return data;
    };

    prepareLegendSelectData = (legend) => {
        let paletteScale = scaleLinear().domain([legend.value[0], legend.value[1] > 100 ? legend.value[0] + 20 : legend.value[1]]).range(["#EFEFFF", utilData.colors.world.dark]);
        let data = {name: this.state.selectedType, rawData: this.state.data, legend: legend, selectedYear: this.state.selectedYear, separator: this.state.data.separator,};
        let chart = {name: legend.display, color: utilData.colors.world.dark, children: []};
        Object.keys(utilData.mapProjection).forEach((key) => {
            let mapP = utilData.mapProjection[key];
            if (mapP.key !== "world") {
                let continent = {name: mapP.display, color: utilData.colors.world.medium, children: []};
                legend.valueSet.forEach((iso) => {
                    let country = this.state.data.rawData[iso];
                    if (mapP.countries.indexOf(iso) >= 0) {
                        continent.children.push({
                            name: country.countryName,
                            color: paletteScale(country[this.state.selectedType]),
                            size: country[this.state.selectedType],
                        });
                    }
                });
                if (continent.children.length > 0) {
                    let sum = 0;
                    continent.children.forEach((c) => {sum += c.size});
                    let paletteScale = scaleLinear().domain([legend.value[0], legend.value[1] > 100 ? legend.value[0] + 20 : legend.value[1]]).range(["#EFEFFF", utilData.colors.country.dark]);
                    continent.color = paletteScale(sum/continent.children.length);
                    chart.children.push(continent);
                }
            }
        });
        if (chart.children.length > 0) data.chart = chart;
        return data;
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
                    this.countrySelectDialog.openDialog(this.prepareCountrySelectData(geography.properties.iso), this.state.selectedType, this.state.selectedYear);
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
        if (this.state.data.legendSet) {
            return (
                <div className={this.styles.legendContainer}>
                    <div className={this.styles.legendWrapper}
                         style={{
                             width: this.state.data.legendSet.length * this.state.legendBlockSize + "vw",
                             minWidth: 38 * this.state.data.legendSet.length + "px"
                         }}>
                        {this.state.data.legendSet.map((legend) => (
                            <Tooltip title={legend.display} placement={"top"} key={legend.display}>
                                <div className={this.styles.legendBlock}
                                     style={{backgroundColor: legend.color, width: this.state.legendBlockSize + "vw"}}
                                     onMouseOver={() => this.onLegendBlockMouseOver(legend.valueSet)}
                                     onMouseOut={() => this.onLegendBlockMouseOut()}
                                     onClick={() => this.openLegendDialog(legend)}/>
                            </Tooltip>
                        ))}
                    </div>
                </div>
            )
        }
    };

    clearMap = () => {
        const map = this.mapRef.current;
        for (const child of Array.from(map.childNodes)) {
            map.removeChild(child);
        }
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
                <div id="mapContainer" style={this.state.mapClass} ref={this.mapRef}/>
                {this.renderLegend()}
                <CountrySelectDialog onRef={instance => {
                    this.countrySelectDialog = instance;
                }}/>
                <LegendSelectDialog onRef={instance => {
                    this.legendSelectDialog = instance;
                }}/>
            </div>
        );
    }
}

MapElement.propTypes = {
    mapClass: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    selectedArea: PropTypes.object.isRequired,
    selectedType: PropTypes.string.isRequired,
    selectedYear: PropTypes.string.isRequired
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
            borderTop: '2px solid ' + utilData.colors.highlight.dark,
            borderBottom: '2px solid ' + utilData.colors.highlight.dark,
        },
    }
});

export default withStyles(styles)(MapElement);
