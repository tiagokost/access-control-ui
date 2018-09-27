import React, { Component } from 'react';
import { TextField, Button, Dialog } from '@material-ui/core';
import { paperStyle,textFieldStyle, contentStyle, buttonStyle } from './../formStyle';
import { Paper } from '@material-ui/core';



export default class PasswordReset extends Component {
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
        return (
            <div style={contentStyle}>
                <Paper
                    className={paperStyle}
                >
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
                        >reset password</Button>
                    </form>
                    <Dialog
                        message={this.state.message}
                        open={this.state.openDialog}
                        title={this.state.title}
                        fullScreen={false} />

                </Paper>

            </div>

        );
    }
}