import React, { Component } from 'react';

import NavigateButton from "../component/navigateButton/navigateButton"

import "./home.css";

export default class Home extends Component{
    render() {
        return (
            <div className="Base">
                <div id={"toolbar"}>
                    <NavigateButton/>
                </div>
                <div id={"content"}>

                </div>
            </div>
        );
    }
}
