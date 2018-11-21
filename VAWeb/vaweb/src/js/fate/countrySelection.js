import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

class CountrySelect extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
    }

    handleChange = event => {
        this.props.selectCountry(event.target.value)
    };

    render() {
        const { classes, countries } = this.props;

        return (
            <form className={classes.root} autoComplete="off">
                <FormControl variant="filled" className={classes.formControl}>
                    <InputLabel htmlFor="filled-age-simple">Country</InputLabel>
                    <Select
                        value={this.props.country}
                        onChange={this.handleChange}
                        input={<FilledInput name="age" id="filled-age-simple" />}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {countries.map((country) => {
                            return(
                                <MenuItem key={country} value={country}>{country}</MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            </form>
        );
    }
}

CountrySelect.propTypes = {
    classes: PropTypes.object.isRequired,
    countries: PropTypes.array,
    selectCountry: PropTypes.func,
    country: PropTypes.string
};

export default withStyles(styles)(CountrySelect);
