import React, {Component} from 'react';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import BaseDialog from "../../component/baseDialog/baseDialog";
import {Sunburst} from 'react-vis';
import Tooltip from '@material-ui/core/Tooltip';

import utilData from "../../common/utils";

class LegendSelectDialog extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedType: null,
            data: null,
            chart: null,
            label: "Please hover to a section to see detail",
            selectedYear: "1990",
            separator: "%",
            title: ""
        };

        this.styles = this.props.classes;

        this.openDialog = this.openDialog.bind(this);
        this.renderChart = this.renderChart.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.updateData = this.updateData.bind(this);
        this.getKeyPath = this.getKeyPath.bind(this);
        this.getSectionDescription = this.getSectionDescription.bind(this);
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.props.onRef(this);
    }

    componentWillReceiveProps(nextProps) {
    }

    componentWillUnmount() {
        this.props.onRef(null);
    }

    openDialog = (data) => {
        this.setState({
            selectedType: utilData.typePair[data.name],
            data: data,
            chart: data.chart,
            selectedYear: data.selectedYear,
            separator: data.separator,
            title: utilData.typePair[data.name].display + " for countries within the range of " + data.legend.display
        });

        this.dialog.handleClickOpen();
    };

    renderChart = () => {
        if (this.state.data !== null) {
            return (
                <Sunburst
                    data={this.state.chart}
                    animation
                    height={400}
                    width={600}
                    style={{
                        stroke: '#ddd',
                        strokeOpacity: 0.3,
                        strokeWidth: '0.5'
                    }}
                    hideRootNode
                    colorType="literal"
                    onValueMouseOver={node => this.handleMouseOver(node)}
                    onValueMouseOut={node => this.handleMouseOut(node)}
                />
            )
        } else {
            return <div/>
        }
    };

    updateData = (chart, keyPath) => {
        if (chart.children) {
            chart.children.map(child => this.updateData(child, keyPath));
        }
        chart.style = {
            fillOpacity: (keyPath && !keyPath[chart.name]) ? 0.2 : 1
        };
        return chart;
    };

    getKeyPath = (node) => {
        if (!node.parent) {
            return ['root'];
        }

        return [(node.data && node.data.name) || node.name].concat(
            this.getKeyPath(node.parent)
        );
    };

    getSectionDescription = (path) => {
        let section = path[path.length - 1];
        let value = null;
        for (let i = 0; i < this.state.chart.children.length; i++) {
            let continent = this.state.chart.children[i];
            if (continent.name === path[1]){
                if (path.length === 2){
                    let sum = 0;
                    let count = 0;
                    continent.children.forEach((c) => {
                        count ++;
                        sum += c.size;
                    });
                    value = (sum/count+"").substring(0,4) + this.state.separator;
                }else {
                    for(let j = 0; j < continent.children.length; j++){
                        let c = continent.children[j];
                        if (c.name === section) value = (c.size + "").substring(0,4) + this.state.separator;
                        break;
                    }
                }
                if (value) break;
            }
        }
        return this.state.selectedType.display + " in " + section + " is " + value + " in " + this.state.selectedYear + (path.length === 2 ? " in average" : "");
    };

    handleMouseOver = (node) => {
        const path = this.getKeyPath(node).reverse();
        console.log(path);
        this.getSectionDescription(path);
        const pathAsMap = path.reduce((res, row) => {
            res[row] = true;
            return res;
        }, {});
        this.setState({
            label: this.getSectionDescription(path),
            chart: this.updateData(this.state.chart, pathAsMap),
        });
    };

    handleMouseOut = (node) => {
        this.setState({
            label: "Please hover to a section to see detail",
            chart: this.updateData(this.state.data.chart, false)
        })
    };

    render() {
        return (
            <BaseDialog title={this.state.title} onRef={instance => {
                this.dialog = instance;
            }}>
                <Tooltip title={this.state.label} placement={"top"} classes={{tooltip: this.styles.tooltip}}>
                    <div className={this.styles.container}>
                        {this.renderChart()}
                    </div>
                </Tooltip>
            </BaseDialog>
        )
    }

}

const styles = theme => ({
    container: {
        display: "flex",
        flexDirection: 'column',
        marginTop: 40
    },
    tooltip: {
        background: theme.palette.common.white,
        boxShadow: theme.shadows[1],
        color: theme.palette.text.primary,
        fontSize: theme.typography.pxToRem(15),
        [theme.breakpoints.down('sm')]: {
            fontSize: theme.typography.pxToRem(10),
        },
    }
});


LegendSelectDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LegendSelectDialog);
