import React, { Component } from 'react';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";

class Default extends Component{

    constructor(props) {
        super(props);
        this.state = {

        };

        this.styles = this.props.classes;

    }

    render() {
        return (
            <div className={this.styles.container}>
                <div className={this.styles.titleWrapper}>
                    <span className={this.styles.mainTitle}>Smoke Till My Last Breath</span>
                </div>
                <div className={this.styles.titleWrapper} style={{marginTop: '22px'}}>
                    <span className={this.styles.subTitle}>Is So Good</span>
                </div>
            </div>
        );
    }
}

const styles = theme => ({
    container: {
        width: '100vw',
        marginTop: '100px'
    },
    titleWrapper:{
        textAlign: 'center',
        color: 'black',
        fontFamily: 'Verdana, Geneva, sans-serif'
    },
    mainTitle: {
        [theme.breakpoints.down('xs')]: {
            fontSize: '24px !important',
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: '40px !important',
            fonWeight: 'bold',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '55px !important',
            fonWeight: 'bold',
        }
    },
    subTitle: {
        [theme.breakpoints.down('xs')]: {
            fontSize: '8px !important',
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: '14px !important',
            fonWeight: 'bold',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '20px !important',
            fonWeight: 'bold',
        }
    }
});

Default.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Default);
