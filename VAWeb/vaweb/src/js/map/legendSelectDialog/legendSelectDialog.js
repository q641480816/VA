import React, {Component} from 'react';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import BaseDialog from "../../component/baseDialog/baseDialog";
import {Line} from 'react-chartjs-2';

import utilData from "../../common/utils";

class LegendSelectDialog extends Component {

    constructor(props) {
        super(props);

        this.state = {};

        this.styles = this.props.classes;

        this.openDialog = this.openDialog.bind(this);
    }

    componentWillMount() {
    }

    componentDidMount() {
        this.props.onRef(this);
        //
    }

    componentWillReceiveProps(nextProps) {
    }

    componentWillUnmount() {
        this.props.onRef(null);
    }

    openDialog = (data) => {
        this.setState({});

        this.dialog.handleClickOpen("Legend");
    };

    render() {
        return (
            <BaseDialog onRef={instance => {
                this.dialog = instance;
            }}>
                <div className={this.styles.container}>

                </div>
            </BaseDialog>
        )
    }

}

const styles = theme => ({
    container: {
        display: "flex",
        flexDirection: 'column'
    }
});


LegendSelectDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LegendSelectDialog);
