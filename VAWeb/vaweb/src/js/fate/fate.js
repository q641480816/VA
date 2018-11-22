import React, {Component} from 'react';
import PropTypes from "prop-types";
import VerticalLinearStepper from "./stepper/verticalLinearStepper";
import CountrySelect from "./stepper/countrySelection";
import GenderRadio from "./stepper/genderRadio"
import SmokeRadio from "./stepper/smokeRadio"
import Grid from '@material-ui/core/Grid';
import PopulationPieChart from './chart/populationPieChart'

class Fate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            country: 'Singapore',
            gender: 'female',
            isSmoker: true,
            step: 0,
            willBeSmoker: null,
            flipCoin: null,
        };
        this.countries = new Set();
        this.countryData = {};
        this.countryGenderData = {
            male : {},
            female : {}
        };
        this.countryDeathData = {
            cancer : {},
            death : {}
        };

        this.prepareSteps = this.prepareSteps.bind(this);
        this.prepareStepContent = this.prepareStepContent.bind(this);
    }

    componentWillMount() {
        this.preCalculateData();
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextState.flipCoin === null && nextState.step === 2 && !nextState.isSmoker && this.state.isSmoker) {
            if (this.state.gender) {
                this.setState({flipCoin: this.countryGenderData[this.state.gender][this.state.country]});
            } else {
                this.setState({flipCoin: this.countryData[this.state.country]});
            }
        }

        if (nextState.flipCoin === null && nextState.step === 2 && !nextState.isSmoker && this.state.step === 1) {
            this.setState({flipCoin: this.countryGenderData[this.state.gender][this.state.country]});
        }

        if (nextState.step === 1 && this.state.step === 2) {
            this.setState({
                flipCoin: null,
                willBeSmoker: null
            })
        }

        if (nextState.isSmoker && this.state.isSmoker === false) {
            this.setState({
                flipCoin: null,
                willBeSmoker: null,
            })
        }

        if (nextState.step === 0 && this.state.step === 2) {
            this.setState({
                flipCoin: null,
                willBeSmoker: null,
            })
        }

    };

    preCalculateData = () => {
        const computeCountryDataAndCounties = () => {
            const prevData = this.props.data.typeYearDataSet.prevalenceInPercent.data;
            const prevDataYears = Object.keys(prevData);
            prevDataYears.forEach((key) => {
                prevData[key].forEach((record) => {
                    const country = record.countryName;
                    this.countries.add(country);
                    this.countryData[country] = this.countryData[country] ? this.countryData[country] + record.prevalenceInPercent : record.prevalenceInPercent;
                });
            });
            this.countries.forEach((key) => {
                this.countryData[key] = this.countryData[key] / (prevDataYears.length)
            });
        };

        const computeCountryGenderData = (gender) => {
            const genderData = gender === 'male'?
                this.props.data.typeYearDataSet.maleInPercent.data : this.props.data.typeYearDataSet.femaleInPercent.data;
            const genderDataYears = Object.keys(genderData);
            genderDataYears.forEach((key) => {
                genderData[key].forEach((record) => {
                  const country = record.countryName;
                  if (this.countryGenderData[gender][country]) {
                      this.countryGenderData[gender][country] += gender === 'male'?
                          record.maleInPercent : record.femaleInPercent;
                  } else {
                      this.countryGenderData[gender][country] = gender === 'male'?
                          record.maleInPercent : record.femaleInPercent;
                  }
               })
            });
            this.countries.forEach((key) => {
                this.countryGenderData[gender][key] = this.countryGenderData[gender][key] / (genderDataYears.length)
            });
        };

        const computeCountryDeathData = (type) => {
            const deathData = type === 'cancer'?
                this.props.data.typeYearDataSet.cancerDeathInPercent.data : this.props.data.typeYearDataSet.death.data;
            const deathDataYears = Object.keys(deathData);
            deathDataYears.forEach((key) => {
                deathData[key].forEach((record) => {
                    const country = record.countryName;
                    if (this.countryDeathData[type][country]) {
                        this.countryDeathData[type][country] += type === 'cancer'?
                            record.cancerDeathInPercent : record.death;
                    } else {
                        this.countryDeathData[type][country] = type === 'cancer'?
                            record.cancerDeathInPercent : record.death;
                    }
                })
            });
            this.countries.forEach((key) => {
                this.countryDeathData[type][key] = this.countryDeathData[type][key] / (deathDataYears.length)
            });
        };

        const clearCountriesWithoutData = () => {
            let countriesWithoutData = new Set();
            Object.keys(this.countryGenderData).forEach((gender) => {
                Object.keys(this.countryGenderData[gender]).forEach((country) => {
                    if (!this.countryGenderData[gender][country]) {
                        countriesWithoutData.add(country);
                    }
                });
            });
            this.countries.forEach((country) => {
                if (countriesWithoutData.has(country)){
                    this.countries.delete(country);
                }

            })
        };
        computeCountryDataAndCounties();
        computeCountryGenderData('male');
        computeCountryGenderData('female');
        computeCountryDeathData('cancer');
        computeCountryDeathData('death');
        clearCountriesWithoutData();
    };

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

    prepareStepContent = (step) => {
        switch (step) {
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

    preparePieChartTitle = (step) => {
        const {country, gender} = this.state;
        switch (step) {
            case 0:
                return 'Smokers in ' + country;
            case 1:
                return this.state.gender? gender.replace(/^./, str => str.toUpperCase()) + ' smokers in ' + country : 'Please Select Your Gender';
            case 2:
                if (this.state.isSmoker) {
                   return 'Died Of Smoking in ' + country;
                } else {
                    if (this.state.willBeSmoker === null) {
                       return 'Will you become a somker?';
                    } else if (this.state.willBeSmoker) {
                        return 'You might be smoker one day!';
                    } else if (this.state.willBeSmoker === false) {
                        return 'You will not smoke forever!';
                    }
                }
        }
    };

    preparePieChartData = (step, isSmoker) => {
        switch (step) {
            case 0:
                return this.prepareCountryData(this.state.country);
            case 1:
                return this.prepareGenderData(this.state.country, this.state.gender);
            case 2:
                return this.prepareDeathData(this.state.country, isSmoker);
        }
    };

    prepareCountryData(country) {
        const smokers = parseFloat(this.countryData[country]).toFixed(2);
        const nonSmokers = 100 - smokers;
        const data = {
            labels: [
                'Smokers',
                'Non-smokers',
            ],
            datasets: [{
                data: [smokers, nonSmokers],
                backgroundColor: [
                    '#4f3618',
                    '#e2ceb5',
                ],
                hoverBackgroundColor: [
                    '#845d2d',
                    '#e2ceb5',
                ]
            }]
        };
        return data;
    };

    prepareGenderData(country, gender) {
        if (gender) {
            const smokers = parseFloat(this.countryGenderData[gender][country]).toFixed(2);
            const nonSmokers = 100 - smokers;
            const data = {
                labels: [
                    'Smokers',
                    'Non-smokers',
                ],
                datasets: [{
                    data: [smokers, nonSmokers],
                    backgroundColor: [
                        '#4f3618',
                        '#e2ceb5',
                    ],
                    hoverBackgroundColor: [
                        '#845d2d',
                        '#e2ceb5',
                    ]
                }]
            };
            return data;
        } else {
            return ({
                labels: [
                ],
                datasets: [{
                    data: [100],
                    backgroundColor: [
                        '#e2ceb5',
                    ],
                    hoverBackgroundColor: [
                        '#e2ceb5',
                    ]
                }]
            });
        }
    };

    prepareDeathData = (country, isSmoker) => {
       if (isSmoker || this.state.willBeSmoker) {
           const cancerData = this.countryDeathData['cancer'];
           const deathData = this.countryDeathData['death'];
           const cancerDeaths = cancerData[country]? parseFloat(cancerData[country]).toFixed(2) : 0;
           const deaths = deathData[country]? parseFloat(deathData[country]).toFixed(2) : 0;
           const otherDeaths = deaths - cancerDeaths;
           const normalDeaths = 100 - cancerDeaths - otherDeaths;
           const data = {
               labels: [
                   'Die of Cancer',
                   'Die of other smoking diseases',
                   'Normal Death'
               ],
               datasets: [{
                   data: [cancerDeaths, otherDeaths, normalDeaths],
                   backgroundColor: [
                       '#00073d',
                       '#4f3618',
                       '#e2ceb5',
                   ],
                   hoverBackgroundColor: [
                       '#1f3b5e',
                       '#845d2d',
                       '#e2ceb5',
                   ]
               }]
           };
           return data;
       } else {
           return ({
               labels: [
               ],
               datasets: [{
                   data: [100],
                   backgroundColor: [
                       '#e2ceb5',
                   ],
                   hoverBackgroundColor: [
                       '#e2ceb5',
                   ]
               }]
           });
       }
   };

    preparePieOption = () => {
        return {
            tooltips: {
                mode: 'label',
                position: 'nearest',
                callbacks: {
                    label: (tooltipItem, data) => {
                        let value = data['labels'][tooltipItem.index] + ": " + data['datasets'][0]['data'][tooltipItem.index] + "%";
                        return value;
                    }
                },
            }
        }
    };

    renderCountrySelection = () => {
        return (
            <CountrySelect
                countries={[...this.countries]}
                Reset
                country={this.state.country}
                selectCountry={(country) => {
                    this.setState({country: country})
                }}

            />
        );
    };

    renderGenderSelection = () => {
        return (
            <GenderRadio
                gender={this.state.gender}
                switchGender={(gender) => {
                    this.setState({gender: gender})
                }}
            />
        );
    };

    renderSmokeSelection = () => {
        return (
            <SmokeRadio
                isSmoker={this.state.isSmoker}
                switchSmoker={(isSmoker) => {
                    this.setState({isSmoker: isSmoker})
                }}
            />
        )
    };

    renderStepper = () => {
        return (
            <VerticalLinearStepper
                steps={this.prepareSteps}
                stepDescription={(index) => this.prepareStepDescription(index)}
                stepContent={(index) => this.prepareStepContent(index)}
                countries={this.countries}
                step={this.state.step}
                setStep={(index) => this.setState({step: index})}
            />
        );
    };

    renderPieChart = () => {
        return (
            <PopulationPieChart
                title={this.preparePieChartTitle(this.state.step)}
                data={this.preparePieChartData(this.state.step, this.state.isSmoker)}
                step={this.state.step}
                options={this.preparePieOption()}
                flipCoin={this.state.flipCoin}
                setWillBeSmoker={(result) => this.setState({willBeSmoker: result})}
                resetFlipCoin={() => this.setState({flipCoin: null})}
            />
        );
    };

    render() {
        console.log(this.state);
        return (
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                {this.renderStepper()}
                {this.renderPieChart()}
            </Grid>
        );
    }
}

Fate.propTypes = {
    data: PropTypes.object.isRequired,
};

export default Fate;
