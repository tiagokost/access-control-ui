import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import RGrid from '@material-ui/core/Grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableColumnVisibility,
    Toolbar,
    ColumnChooser,
    PagingPanel,
    TableFilterRow,
    TableSelection
} from '@devexpress/dx-react-grid-material-ui';
import { ApiHostBase } from '../../Api';
import { gridStyles } from '../formStyle';
import {
    Column,
    FilteringState,
    IntegratedFiltering, IntegratedPaging, IntegratedSelection, IntegratedSorting,
    PagingState, SelectionState, SortingState,
} from '@devexpress/dx-react-grid';

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
            pageSizes: [5, 10, 15],
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

        axios.get(ApiHostBase + 'account/inactive',
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

        const { columns, rows, tableColumnExtensions, hiddenColumnNames, pageSizes } = this.state;

        return (
            <div className={classes.root}>
                <RGrid container spacing={24}>
                    <RGrid item xs={10}>
                        <Paper className={classes.paper}>
                            <h2>Account</h2>
                            <Grid
                                rows={rows}
                                columns={columns}>

                                <Table
                                    columnExtensions={tableColumnExtensions}
                                />

                                <FilteringState
                                    defaultFilters={[
                                        { columnName: 'userName', value: '' },
                                        { columnName: 'name', value: '' }
                                    ]}
                                />

                                <SortingState
                                    defaultSorting={[
                                        { columnName: 'name', direction: 'asc' },
                                        { columnName: 'userName', direction: 'asc' },
                                    ]}
                                />

                                <SelectionState />

                                <PagingState />

                                <IntegratedFiltering />

                                <IntegratedSorting />

                                <IntegratedPaging />

                                <IntegratedSelection />

                                <TableSelection showSelectAll={true} />

                                <TableHeaderRow showSortingControls={true} />

                                <TableColumnVisibility
                                    hiddenColumnNames={hiddenColumnNames}
                                    onHiddenColumnNamesChange={this.hiddenColumnNamesChange}
                                />

                                <TableFilterRow showFilterSelector={true} />

                                <PagingPanel pageSizes={pageSizes} />

                                <Toolbar />

                                <ColumnChooser />

                            </Grid>

                        </Paper>
                    </RGrid>

                    <RGrid item xs={2}>
                        <Paper className={classes.paper}>
                            <strong>Info or descripition..</strong>
                            <p>Brief description of the content being listed.</p>
                        </Paper>
                    </RGrid>
                </RGrid>
            </div>

        )
    }
}
ListAccount.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(gridStyles)(ListAccount);