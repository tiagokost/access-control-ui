import React, { Component } from 'react';
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
import { ApiHostBase, HeaderRequest } from '../../Api';
import { gridStyles } from '../formStyle';
import {
    FilteringState,
    IntegratedFiltering, IntegratedPaging, IntegratedSelection, IntegratedSorting,
    PagingState, SelectionState, SortingState,
} from '@devexpress/dx-react-grid';
import api from '../../Api';



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
            pageSizes: [5, 10, 15]
        };

        this.hiddenColumnNamesChange = (hiddenColumnNames) => {
            this.setState({ hiddenColumnNames });
        };
    }

    componentDidMount() {

        api.get(ApiHostBase + 'application')
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
                           
                            <Grid
                                rows={rows}
                                columns={columns}>

                                <Table
                                    columnExtensions={tableColumnExtensions}
                                />

                                <FilteringState
                                    defaultFilters={[
                                        { columnName: 'name', value: '' },
                                        { columnName: 'alias', value: '' }
                                    ]}
                                />

                                <SortingState
                                    defaultSorting={[
                                        { columnName: 'name', direction: 'asc' },
                                        { columnName: 'alias', direction: 'asc' },
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
                            <strong>Application</strong>
                            <p>Brief description of the content being listed.</p>
                        </Paper>
                    </RGrid>
                </RGrid>
            </div>

        )
    }
}
ListApplication.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(gridStyles)(ListApplication);