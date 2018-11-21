import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const styles = theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing.unit * 3,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
});

class SmokeRadio extends React.Component {

    handleChange = event => {
        console.log(event.target);
        this.props.switchSmoker(event.target.value === 'isSmoker');
    };

    render() {
        const { classes } = this.props;
        console.log(this.props.isSmoker);
        console.log(this.props.isSmoker? "isSmoker" : "notSmoker");
        return (
            <div className={classes.root}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup
                        aria-label="Smoker"
                        name="gender1"
                        className={classes.group}
                        value={this.props.isSmoker? "isSmoker" : "notSmoker"}
                        onChange={this.handleChange}
                    >
                        <FormControlLabel key="isSmoker" value= "isSmoker" control={<Radio />} label="I love smoking" />
                        <FormControlLabel key="notSmoker" value= "notSmoker" control={<Radio />} label="I don't smoke" />
                    </RadioGroup>
                </FormControl>
            </div>
        );
    }
}

SmokeRadio.propTypes = {
    classes: PropTypes.object.isRequired,
    switchSmoker: PropTypes.func,
    isSmoker: PropTypes.bool
};

export default withStyles(styles)(SmokeRadio);
