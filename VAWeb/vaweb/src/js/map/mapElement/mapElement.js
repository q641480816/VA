import React, {Component} from 'react';
import PropTypes from "prop-types";
import Datamaps from "datamaps/dist/datamaps.world.hires.min";

import './mapElement.css';

class MapElement extends Component{

    constructor(props) {
        super(props);
        this.state = {
            mapClass: null,
            map: null,
            data: null
        };

        this.mapRef = React.createRef();

        this.drawMap = this.drawMap.bind(this);
        this.clearMap = this.clearMap.bind(this);
        this.getPupUp = this.getPupUp.bind(this);
    }

    componentWillMount(){
        window.addEventListener("resize", ()=>{});
        this.setState({
            mapClass: this.props.mapClass,
            data: this.props.data,
        });
    }

    componentDidMount(){
        this.setState({
            map: this.drawMap()
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.state.data) {
            let map = this.state.map;
            map.updateChoropleth(nextProps.data);
            this.setState({
                data: nextProps.data,
                map: map,
                mapClass: nextProps.mapClass
            });
        }
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

    drawMap = (data) => {
        let map = new Datamaps({
            scope: 'world',
            element: document.getElementById("container"),
            projection: 'equirectangular',
            responsive: false,
            dataType: 'json',
            fills: {
                defaultFill: '#ddd'
            },
            data: data == null ? this.state.data : data,
            geographyConfig: {
                borderColor: '#DEDEDE',
                borderWidth: 0.45,
                highlightBorderColor: 'black',
                highlightBorderWidth: 2,
                highlightFillColor: (o) => {
                    return o['fillColor'] || '#ddd';
                },
                highlightOnHover: true,
                popupTemplate: (geography, data) => this.getPupUp(geography, data)
            }
        });
        return map;
    };

    clearMap = () => {
        const map = this.mapRef.current;
        for (const child of Array.from(map.childNodes)) {map.removeChild(child);}
    };

    render() {
        return (
            <div id="container" style={this.state.mapClass} ref={this.mapRef} />
        );
    }
}

MapElement.propTypes = {
    mapClass: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
};

export default MapElement;
