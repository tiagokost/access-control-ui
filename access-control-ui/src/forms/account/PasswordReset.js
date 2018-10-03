import React, { Component } from 'react';
import { TextField, Button, withStyles } from '@material-ui/core';
import { textFieldStyle, buttonStyle, gridStyles } from './../formStyle';
import { Paper } from '@material-ui/core';
import Dialog from './../../components/DDialog';

class PasswordReset extends Component {

    constructor() {
        super();
        this.state = {
            title: 'Dialog',
            message: '',
            openDialog: false,
            userName: ''
        }
    }
    sendForm(e) {
        this.preventDefault();

    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <h2>Recover Password</h2>
                    <form onSubmit={(e) => this.sendForm(e)}>
                        <TextField
                            required={true}
                            onChange={this.onChange}
                            placeholder="E-mail: "
                            type="text"
                            id="userName"
                            fullWidth={true}
                            style={textFieldStyle}></TextField>


                        <Button
                            type="submit"
                            style={buttonStyle}
                            fullWidth={true}
                            label="Submit"
                        >send</Button>
                    </form>

                </Paper>
                <Dialog
                    message={this.state.message}
                    open={this.state.openDialog}
                    title={this.state.title}
                    fullScreen={false} />
            </div>


        );
    }
}
export default withStyles(gridStyles)(PasswordReset);