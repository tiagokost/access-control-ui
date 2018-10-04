import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
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

class ListRole extends Component {

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

    render() {
        const { classes } = this.props;

        const { columns, rows, defaultHiddenColumnNames, tableColumnExtensions, hiddenColumnNames } = this.state;
      
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <h2>Role</h2>
                    <Grid
                        rows={rows}
                        columns={columns}>
                        <Table
                            columnExtensions={tableColumnExtensions} />
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
        );
    }
}
ListRole.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(gridStyles)(ListRole);