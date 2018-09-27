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



class ListApplication extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data:[],
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
            hiddenColumnNames: ['description','id'],
        };

        this.hiddenColumnNamesChange = (hiddenColumnNames) => {
            this.setState({ hiddenColumnNames });
          };
    }

    componentDidMount() {

        axios.get(ApiHostBase +'application',
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

        const { columns, rows, defaultHiddenColumnNames ,tableColumnExtensions,hiddenColumnNames} = this.state;
        return (
      
            <Paper
                >
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

            // <Paper>
            //     <Grid
            //         rows={rows}
            //         columns={columns}
            //     >
            //         <Table />
            //         <TableHeaderRow />
            //         <TableColumnVisibility
            //             defaultHiddenColumnNames={defaultHiddenColumnNames}
            //         />
            //         <Toolbar />
            //         <ColumnChooser />
            //     </Grid>
            // </Paper>
            /*  <div clasName={classes.root}>
                  <Paper>
                     <Grid
                         rows={20}
                         columns={4}>
                         <Table>
                            <TableHeaderRow>
                                 <TableRow>
                                     <CustomTableCell>#ID</CustomTableCell>
                                     <CustomTableCell >Name</CustomTableCell>
                                     <CustomTableCell >Alias</CustomTableCell>
                                     <CustomTableCell >Description</CustomTableCell>
                                 </TableRow>
                                 <TableColumnVisibility
                                     defaultHiddenColumnNames={true} />
                             </TableHeaderRow>
                             <TableBody>
                                 {
                                     this.state.data.map(function (row, i) {
                                         return (
                                             <TableRow className={classes.row} key={row.id}>
                                                 <CustomTableCell >{row.id}</CustomTableCell>
                                                 <CustomTableCell component="th" scope="row">
                                                     {row.name}
                                                 </CustomTableCell>
                                                 <CustomTableCell >{row.alias}</CustomTableCell>
                                                 <CustomTableCell >{row.description}</CustomTableCell>
                                             </TableRow>
                                         )
                                     })
                                 }
                             </TableBody> 
                         </Table>
                     </Grid>
                 </Paper>
             </div>*/
        )
    }
}
ListApplication.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListApplication);