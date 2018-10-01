import React, { Component } from 'react';
import { TextField, Button, withStyles } from '@material-ui/core';
import axios from 'axios';
import Dialog from './../../components/DDialog';
import { textFieldStyle, buttonStyle, gridStyles } from './../formStyle';
import { ApiHostBase } from '../../Api';
import { Paper } from '@material-ui/core';


class SignUp extends Component {

    clearForm() {
        this.state = {
            title: 'Dialog',
            message: '',
            openDialog: false,
            userName: '',
            password: '',
            repeatePassword: '',
            firstName: '',
            lastName: ''
        }
    }
    constructor() {

        super();

        this.clearForm();

        this.onChange = (event) => {
            const state = Object.assign({}, this.state);
            const fieldName = event.target.id;
            state[fieldName] = event.target.value;
            this.setState(state);
            this.setState({
                openDialog: false
            });
        }
    }

    componentDidMount() {


    }

    sendForm(e) {
        e.preventDefault();

        axios.post(ApiHostBase + 'account',
            {
                userName: this.state.userName,
                password: this.state.password,
                repeatePassword: this.state.repeatePassword
            },
            {
                'Origin': 'http://127.0.0.1:3000',
                'Authorization': 'Basic ZGV2c2NhcGU6MTIzNDU2',
                'Content-Type': 'application/json'
            }
        )
            .then(res => {

                this.setState({
                    title: 'Success!',
                    message: "A conta foi criada, você receberá um código para desbloquea-la.",
                    openDialog: true
                }
                );
            })
            .catch(ex => {
                this.setState({
                    title: 'Server error',
                    message: ex.response.data.message,
                    openDialog: true
                }
                );
            });
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <h1>Sign Up</h1>
                    <form onSubmit={(e) => this.sendForm(e)}>
                        <TextField
                            required={true}
                            onChange={this.onChange}
                            value={this.state.userName}
                            placeholder="User Name (E-mail)"
                            type="text"
                            id="userName"
                            fullWidth={true}
                            style={textFieldStyle}></TextField>
                        <TextField
                            required={true}
                            value={this.state.password}
                            onChange={this.onChange}
                            placeholder="Password"
                            type="password"
                            id="password"
                            fullWidth={true}
                            style={textFieldStyle}></TextField>
                        <TextField
                            required={true}
                            value={this.state.repeatePassword}
                            onChange={this.onChange}
                            placeholder="Password repeat"
                            type="password"
                            id="repeatePassword"
                            fullWidth={true}
                            style={textFieldStyle}></TextField>

                        <Button
                            type="submit"
                            style={buttonStyle}
                            fullWidth={true}
                            label="Submit"
                        >create account</Button>
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
export default withStyles(gridStyles)(SignUp);
