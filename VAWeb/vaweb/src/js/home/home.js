import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withRouter, Route } from 'react-router-dom';

import NavigationButton from "../component/navigateButton/navigateButton";
import Map from "../map/map";
import Data from "../data/data";
import Default from "../default/default";

import utilData from "../common/utils";

import "./home.css";

class Home extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            history: null
        };

        this.getNavigationBar = this.getNavigationBar.bind(this);
        this.onMapShow = this.onMapShow.bind(this);
        this.onDataShow = this.onDataShow.bind(this);
        this.renderMap = this.renderMap.bind(this);
        this.getCountryYear = this.getCountryYear.bind(this);
    }

    componentWillMount(){
        this.setState({
            history: this.props.history
        });
        this.getCountryYear();
    }

    getNavigationBar = ()=>{
        return [
            {
                url: 'https://imgcs.artprintimages.com/img/print/print/pela-design-old-world-map_a-l-9730967-0.jpg?w=550&h=550',
                title: 'World',
                width: '50%',
                func: this.onMapShow
            },
            {
                url: 'https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/3531131/1360/906/m1/fpnw/wm1/wyxjobfaj3tqsfffecuvn3asvh9jutaao5tv8wmi2petimokkb1ksubbpbazinh2-.jpg?1509966990&s=5858246a1eae64c71c048b64d355653b',
                title: 'Data',
                width: '50%',
                func: this.onDataShow
            },
        ];
    };

    getCountryYear = () => {
        fetch(utilData.fetchUrl, {
            method: 'get',
            headers: {
                'Content-Type':'application/json'
            }})
            .then(response => response.json())
            .then(data => {
                utilData.allData = data;
                this.setState({data: data});
            })
            .catch(e => console.log(e));
    };

    onMapShow = ()=>{
        this.state.history.push('/map');
    };

    onDataShow = ()=>{
        this.state.history.push('/data');
    };

    renderMap = () => {
        if (this.state.data != null){
            return (<Map data={this.state.data}/>);
        }
        return <div/>
    };

    renderData = () => {
        if (this.state.data != null){
            return(<Data data={this.state.data}/>);
        }
        return <div/>
    }

    render() {
        return (
            <div className="base">
                <div id={"toolbar"}>
                    <NavigationButton images={this.getNavigationBar()}/>
                </div>
                <div id={"content"}>
                    <Route exact path="/" component={Default} />
                    <Route path="/map" component={this.renderMap} />
                    <Route path="/data" component={this.renderData} />
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default withRouter(Home);
