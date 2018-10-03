import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { TableCell, Paper } from '@material-ui/core';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableColumnVisibility,
    Toolbar,
    ColumnChooser
} from '@devexpress/dx-react-grid-material-ui';
import { ApiHostBase } from '../../Api';
import { gridStyles } from '../formStyle';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary
    },
});

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.lightBlue
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);



class ListApplication extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            columns: [
                { name: 'alias', title: 'alias' },
                { name: 'name', title: 'Name' },
                { name: 'description', title: 'Description' },
                { name: 'id', title: '#ID' },
            ],
            tableColumnExtensions: [
                { columnName: 'alias' },
            ],
            rows: [],
            hiddenColumnNames: ['description', 'id'],
        };

        this.hiddenColumnNamesChange = (hiddenColumnNames) => {
            this.setState({ hiddenColumnNames });
        };
    }

    componentDidMount() {

        axios.get(ApiHostBase + 'application',
            {
                alias: this.state.alias,
                name: this.state.name,
                description: this.state.description
            },
            {
                'Origin': 'http://127.0.0.1:3000',
                'Authorization': 'Basic ZGV2c2NhcGU6MTIzNDU2',
                'Content-Type': 'application/json'
            }
        )
            .then(res => {
                this.setState({
                    rows: res.data
                });
            })
            .catch(res => {
                this.setState({
                    title: 'Error',
                    message: res.message,
                    openDialog: true
                }
                );
                console.log('erro: ' + res);
            });
    }

    render() {
        const { classes } = this.props;

        const { columns, rows, defaultHiddenColumnNames, tableColumnExtensions, hiddenColumnNames } = this.state;
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <h2>Application</h2>
                    <Grid
                        rows={rows}
                        columns={columns}>
                        <Table
                            columnExtensions={tableColumnExtensions}/>
                        <TableHeaderRow />
                        <TableColumnVisibility
                            hiddenColumnNames={hiddenColumnNames}
                            onHiddenColumnNamesChange={this.hiddenColumnNamesChange}
                        />
                        <Toolbar />
                        <ColumnChooser />
                    </Grid>
                </Paper>
            </div>

        )
    }
}
ListApplication.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(gridStyles)(ListApplication);