import React, { Component } from 'react';
import PropTypes from "prop-types";
import VerticalLinearStepper from "./verticalLinearStepper";
import CountrySelect from "./countrySelection";
import GenderRadio from "./genderRadio"
import SmokeRadio from "./smokeRadio"

class Fate extends Component{

    constructor(props) {
        super(props);
        this.state = {
            country: 'Singapore',
            gender: null,
            isSmoker: null
        };
        this.prepareSteps = this.prepareSteps.bind(this);
        this.prepareStepContent = this.prepareStepContent.bind(this);
    }

    prepareSteps = () => {
        return ['Where are you from?', 'Male or female?', 'Do you smoke?']
    };

    prepareStepDescription = (step) => {
        switch (step) {
            case 0:
                return 'Select your country.';
            case 1:
                return 'Select your gender.';
            case 2:
                return 'Select whether you smoke.';
            default:
                return 'Unknown step';
        }
    };

    prepareSelections = () => {
        return ({
            country : null,
            gender : null,
            isSmoker : null,
        });
    };

    prepareStepContent = (step) => {
        switch(step) {
            case 0:
                return this.renderCountrySelection();
            case 1:
                return this.renderGenderSelection();
            case 2:
                return this.renderSmokeSelection();
            default:
                return
        }
    };

    prepareCountries = () => {
        const data = this.props.data;
        let countries = data.typeYearDataSet.death.data[1990].map((data) => {
           return data.countryName;
        });
        return countries;
    };

    renderCountrySelection = () => {
        return (
            <CountrySelect
                countries={this.prepareCountries()}
                country={this.state.country}
                selectCountry={(country) => {this.setState({country: country})}}

            />
        );
    };

    renderGenderSelection = () => {
        return (
            <GenderRadio
                gender={this.state.gender}
                switchGender={(gender) => {this.setState({gender: gender})}}
            />
        );
    }

    renderSmokeSelection = () => {
        return (
            <SmokeRadio
                isSmoker={this.state.isSmoker}
                switchSmoker={(isSmoker) => {this.setState({isSmoker: isSmoker})}}
            />
        )
    }

    renderStepper = () => {
        return (
            <VerticalLinearStepper
                steps = {this.prepareSteps}
                stepDescription = {(index) => this.prepareStepDescription(index)}
                stepContent = {(index) => this.prepareStepContent(index)}
                countries = {this.prepareCountries}
                selections = {this.prepareSelections}
            />
        );
    };

    render() {
        console.log(this.state);
        return (
            <div>
                {this.renderStepper()}
            </div>
        );
    }
}

Fate.propTypes = {
    data: PropTypes.object.isRequired,
};

export default Fate;
