import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withRouter } from 'react-router-dom';
import Datamaps from 'datamaps/dist/datamaps.world.hires.min.js';

import MapElement from "./mapElement/mapElement";

import './map.css';

class Map extends Component{

    constructor(props) {
        super(props);
        this.state = {
            mapClass: null
        };

        this.prepareMapClass = this.prepareMapClass.bind(this);
    }

    componentWillMount(){
        this.setState({
            mapClass: this.prepareMapClass()
        })
    }

    componentDidMount(){

    }

    prepareMapClass = () => {
        let height =  document.documentElement.clientHeight * 0.75;
        let width = height/500*750;
        return {
            position: 'relative',
            margin: "auto",
            height: height+"px",
            width: width+"px"
        }
    };

    render() {
        return (
            <div className={"map-base"}>
                <MapElement mapClass={this.state.mapClass}/>
            </div>
        );
    }
}

Map.propTypes = {

};

export default Map;
