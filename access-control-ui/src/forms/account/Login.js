import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { textFieldStyle, buttonStyle, gridStyles } from './../formStyle';
import { withStyles } from '@material-ui/core';
import { Paper } from '@material-ui/core';

class Login extends Component {
    sendForm(e) {
        e.preventDefault();
        var data = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };

    }

    render() {
        const { classes } = this.props;
        return (

            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <h2>Login</h2>
                    <form onSubmit={(e) => this.sendForm(e)}>
                        <TextField
                            placeholder="E-mail"
                            type="email"
                            id="email"
                            fullWidth={true}
                            style={textFieldStyle}></TextField>
                        <TextField
                            placeholder="Senha"
                            type="password"
                            id="password"
                            fullWidth={true}
                            style={textFieldStyle}></TextField>
                        <Button
                            type="submit"
                            style={buttonStyle}
                            fullWidth={true}
                            label="Login"
                        >Login</Button>
                    </form>

                </Paper>

            </div>
        );
    }
}

export default withStyles(gridStyles)(Login);