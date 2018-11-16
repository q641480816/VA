import React, {Component} from 'react';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import BaseDialog from "../../component/baseDialog/baseDialog";
import {Sunburst, LabelSeries } from 'react-vis';

import utilData from "../../common/utils";

class LegendSelectDialog extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedType: null,
            data: null,
            chart: null,
            label: null
        };

        this.styles = this.props.classes;

        this.openDialog = this.openDialog.bind(this);
        this.renderChart = this.renderChart.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.updateData = this.updateData.bind(this);
        this.getKeyPath = this.getKeyPath.bind(this);
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
            chart: data.chart
        });

        this.dialog.handleClickOpen(utilData.typePair[data.name].display + " for countries within the range of " + data.legend.display);
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
                >
                    {this.state.label && (
                        <LabelSeries
                            data={[{x: 0, y: 0, label: this.state.label}]}
                        />
                    )}
                </Sunburst>
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

    handleMouseOver = (node) => {
        const path = this.getKeyPath(node).reverse();
        console.log(path)
        const pathAsMap = path.reduce((res, row) => {
            res[row] = true;
            return res;
        }, {});
        this.setState({
            label: path.length === 2 ? 'continent' : 'country',
            chart: this.updateData(this.state.chart, pathAsMap)
        });
    };

    handleMouseOut = (node) => {
        this.setState({
            label : null,
            chart: this.updateData(this.state.data.chart, false)
        })
    };

    render() {
        return (
            <BaseDialog onRef={instance => {
                this.dialog = instance;
            }}>
                <div className={this.styles.container}>
                    {this.renderChart()}
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
