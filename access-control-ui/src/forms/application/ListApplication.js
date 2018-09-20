import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Table, TableHead,TableBody,TableRow ,TableCell,Paper,TableColumnVisibility} from '@material-ui/core';
import {lightBlue} from '@material-ui/core/colors';

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
    constructor() {
        super();
        this.state = {
            data: [],
        };
    }

    componentDidMount() {

        axios.get('http://localhost:8080/application',
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
                    data: res.data
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
        return (
            <div clasName={classes.root}>
                <Grid container spacing={24}>
                    <Grid item >
                        <Paper>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <CustomTableCell>#ID</CustomTableCell>
                                        <CustomTableCell >Name</CustomTableCell>
                                        <CustomTableCell >Alias</CustomTableCell>
                                        <CustomTableCell >Description</CustomTableCell>
                                    </TableRow>
                                </TableHead>
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

                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}
ListApplication.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListApplication);