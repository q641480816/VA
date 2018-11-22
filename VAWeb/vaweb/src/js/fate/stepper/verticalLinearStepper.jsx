import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

class VerticalLinearStepper extends React.Component {


    constructor(props) {
       super(props);
        this.state = {
            activeStep: 0,
        };

        this.handleNext = this.handleNext.bind(this);
        this.handleBack =  this.handleBack.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleNext = () => {
        if (this.state.activeStep !== 2) {
            this.props.setStep(this.state.activeStep + 1);
        }
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));
    };

    handleBack = () => {
        this.props.setStep(this.state.activeStep - 1);
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    handleReset = () => {
        this.props.setStep(0);
        this.setState({
            activeStep: 0,
        });
    };

    render() {
        const { classes } = this.props;
        const steps = this.props.steps();
        const { activeStep } = this.state;

        return (
            <div className={classes.root}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((label, index) => {
                        return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                                <StepContent>
                                    <Typography>{this.props.stepDescription(index)}</Typography>
                                    <div className={classes.actionsContainer}>
                                        <div>
                                            {this.props.stepContent(index)}
                                        </div>
                                        <div>
                                            <Button
                                                disabled={activeStep === 0}
                                                onClick={this.handleBack}
                                                className={classes.button}
                                            >
                                                Back
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={this.handleNext}
                                                className={classes.button}
                                            >
                                                {activeStep === steps.length - 1 ? 'Final Fate' : 'Next'}
                                            </Button>
                                        </div>
                                    </div>
                                </StepContent>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === steps.length && (
                    <Paper square elevation={0} className={classes.resetContainer}>
                        <Button onClick={this.handleReset} className={classes.button}>
                            Try Again!
                        </Button>
                    </Paper>
                )}
            </div>
        );
    }
}

VerticalLinearStepper.propTypes = {
    classes: PropTypes.object,
    stepDescription: PropTypes.func,
    stepContent: PropTypes.func,
    steps: PropTypes.array,
    step: PropTypes.number,
    setStep: PropTypes.func


};

const styles = theme => ({
    root: {
        width: '40%',
    },
    button: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    actionsContainer: {
        marginBottom: theme.spacing.unit * 2,
    },
    resetContainer: {
        padding: theme.spacing.unit * 3,
    },
});

export default withStyles(styles)(VerticalLinearStepper);
