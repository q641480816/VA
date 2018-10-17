import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withRouter } from 'react-router-dom';

class Default extends Component{

    constructor(props) {
        super(props);
        this.state = {
        };

    }

    render() {
        return (
            <div>
                Default
            </div>
        );
    }
}

Default.propTypes = {

};

export default Default;
