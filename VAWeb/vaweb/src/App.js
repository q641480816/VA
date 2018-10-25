import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';

import Home from "./js/home/home";

class App extends Component {
    componentDidMount(){
        document.title = "Chainsmokers";
    }

    render() {
        return (
            <BrowserRouter>
                <Home/>
            </BrowserRouter>
        );
    }
}

export default App;
