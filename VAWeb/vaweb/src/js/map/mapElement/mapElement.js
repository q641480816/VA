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
    }

    componentWillMount(){
        this.setState({
            mapClass: this.props.mapClass,
            data: this.props.data
        });
    }

    componentDidMount(){
        this.setState({
            map: this.drawMap()
        });
    }

    componentWillReceiveProps(nextProps) {
        this.clearMap();
        this.setState({
            data: nextProps.data,
            map: this.drawMap(nextProps.data)
        })
    }

    componentWillUnmount() {
        this.clearMap();
    }

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
