import React, { Component } from 'react';
import PropTypes from "prop-types";
import Datamaps from 'datamaps/dist/datamaps.world.hires.min.js';

class MapElement extends Component{

    constructor(props) {
        super(props);
        this.state = {
            mapClass: null,
            map: null
        };

        this.drawMap = this.drawMap.bind(this);
    }

    componentWillMount(){
        this.setState({
            mapClass: this.props.mapClass
        });
    }

    componentDidMount(){
        this.setState({
            map: this.drawMap()
        });

    }

    drawMap = () => {
        let map = new Datamaps({
            scope: 'world',
            element: document.getElementById("container"),
            projection: 'mercator',
            responsive: false,
            dataType: 'json',
            fills: {
                defaultFill: '#ddd'
            },
            highlightOnHover: true,
            highlightFillColor: 'rgba(250, 15, 160, 0)',
            highlightFillOpacity: 0
        });
        return map;
    };

    render() {
        return (
            <div id="container" style={this.state.mapClass} />
        );
    }
}

MapElement.propTypes = {
    mapClass: PropTypes.object.isRequired
};

export default MapElement;
