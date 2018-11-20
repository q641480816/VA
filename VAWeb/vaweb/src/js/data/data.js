import React, { Component } from 'react';
import PropTypes from "prop-types";
import LineChart from './LineChart';

class Data extends Component{

    constructor(props) {
        super(props);
        this.state = {
        };

    }

    render() {
        return (
            <LineChart
                elementWidth = {600}
                elementHeight = {270}
                data = {this.props.data}
            />
        );
    }
}

Data.propTypes = {
    data: PropTypes.object.isRequired
};

export default Data;
