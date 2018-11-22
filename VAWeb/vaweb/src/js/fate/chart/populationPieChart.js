import React from 'react';
import {Pie} from 'react-chartjs-2';
import PropTypes from 'prop-types';
import Button from "@material-ui/core/Button/Button";
import { withStyles } from '@material-ui/core/styles';



class PopulationPieChart extends React.Component {

    handleFlipCoin = () => {
        const randomNum = Math.random() * 100;
        const result = randomNum < this.props.flipCoin;
        this.props.setWillBeSmoker(result);
        this.props.resetFlipCoin();
    };

    renderFlipCoinButton = () => {
        const {classes} = this.props;
        return (
            <Button
                variant="contained"
                color="primary"
                onClick={this.handleFlipCoin}
                className={classes.button}
            >
                Flip A Coin! rate: {parseFloat(this.props.flipCoin).toFixed(2)}%
            </Button>
        )
    };

    render() {
        return (
            <div>
                <h2>{this.props.title}</h2>
                <div>
                    {this.props.flipCoin === null? null : this.renderFlipCoinButton()}
                </div>
                <Pie
                    data={this.props.data}
                    height={300}
                    width={300}
                    devicePixelRatio={2}
                    options={this.props.options}
                    onClick={() => this.handleClick()}
                />
            </div>
        );
    }
}
const styles = theme => ({
    button: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    }
});

PopulationPieChart.propsTypes = {
    classes: PropTypes.object,
    title: PropTypes.string,
    data: PropTypes.object,
    flipCoin: PropTypes.number,
    setWillBeSmoker: PropTypes.func,
    resetFlipCoin: PropTypes.func,
    options: PropTypes.object.isRequired
};

export default withStyles(styles)(PopulationPieChart);