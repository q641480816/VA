import React, {Component} from 'react';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import BaseDialog from "../../component/baseDialog/baseDialog";

class CountrySelectDialog extends Component{

    constructor(props) {
        super(props);

        this.state = {
            data: null
        };

        this.styles = this.props.classes;

        this.openDialog = this.openDialog.bind(this);
    }

    componentWillMount(){}

    componentDidMount() {
        this.props.onRef(this);
    }

    componentWillReceiveProps(nextProps){}

    componentWillUnmount() {
        this.props.onRef(null);
    }

    openDialog = (data) => {
        this.setState({
            data: data
        });
        this.dialog.handleClickOpen("title");
        console.log(data)
    };

    render () {
        return(
            <BaseDialog onRef={instance => { this.dialog = instance; }}>
                <div className={this.styles.container}>
                    countrySelect
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


CountrySelectDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CountrySelectDialog);
