import React, {Component} from 'react';
import PropTypes from "prop-types";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {withStyles} from "@material-ui/core";

class BaseDialog extends Component{

    constructor(props) {
        super(props);

        this.state = {
            title: "",
            isOpen: false,
            clicked: false
        };

        this.styles = this.props.classes;
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentWillMount(){
        this.setState({
            title: this.props.title
        })
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            title: nextProps.title
        })
    }

    componentWillUnmount() {
        this.props.onRef(null);
    }

    handleClickOpen = () => {
        this.setState({
            isOpen: true
        });
    };

    handleClose = () => {
        this.setState({ isOpen: false });
    };

    render () {
        return(
            <Dialog open={this.state.isOpen} maxWidth = {'lg'} maxheight={'lg'} onClose={this.handleClose}>
                <DialogTitle id="alert-dialog-title">{this.state.title}</DialogTitle>
                <DialogContent>
                    {this.props.children}
                </DialogContent>
            </Dialog>
        )
    }

}

const styles = theme => ({
    dialog: {
        maxHeight: 1000,
        maxWidth: 1000
    },
    container: {}
});


BaseDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired
};

export default withStyles(styles)(BaseDialog);
