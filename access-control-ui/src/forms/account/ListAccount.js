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
import {ApiHostBase} from '../../Api'; 

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



class ListAccount extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            columns: [
                { name: 'userName', title: 'E-mail' },
                { name: 'name', title: 'Name' },
                { name: 'lastName', title: 'Last Name' },
                { name: 'id', title: '#ID' },
            ],
            tableColumnExtensions: [
                { columnName: 'userName' },
            ],
            rows: [],
            hiddenColumnNames: ['lastName', 'id'],
        };

        this.hiddenColumnNamesChange = (hiddenColumnNames) => {
            this.setState({ hiddenColumnNames });
        };
    }

    componentDidMount() {

        axios.get( ApiHostBase + 'account/inactive',
            {
                userName: this.state.userName,
                firstName: this.state.firstName,
                lastName: this.state.lastName
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
            <Paper>
                <Grid
                    rows={rows}
                    columns={columns}
                >
                    <Table
                        columnExtensions={tableColumnExtensions}
                    />
                    <TableHeaderRow />
                    <TableColumnVisibility
                        hiddenColumnNames={hiddenColumnNames}
                        onHiddenColumnNamesChange={this.hiddenColumnNamesChange}
                    />
                    <Toolbar />
                    <ColumnChooser />
                </Grid>
            </Paper>
        )
    }
}
ListAccount.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListAccount);