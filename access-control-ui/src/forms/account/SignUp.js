import React, { Component } from 'react';
import { TextField, Button, withStyles } from '@material-ui/core';
import axios from 'axios';
import ActiveCodeDialog from './../../components/DActiveCodeDialog';
import { textFieldStyle, buttonStyle, gridStyles } from './../formStyle';
import { ApiHostBase, HeaderRequest } from '../../Api';
import { Paper } from '@material-ui/core';
import RGrid from '@material-ui/core/Grid';
import { Redirect } from 'react-router-dom';
import Dialog from './../../components/DDialog';


class SignUp extends Component {

    clearForm() {
        this.state = {
            title: 'Dialog',
            message: '',
            openDialogActiveAccount: false,
            openMessage: false,
            userName: '',
            password: '',
            repeatePassword: '',
            firstName: '',
            lastName: '',
            redirect: false
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

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/account/activate' />
        }
    }

    sendForm(e) {
        e.preventDefault();

        axios.post(ApiHostBase + 'account',
            {
                userName: this.state.userName,
                password: this.state.password,
                repeatePassword: this.state.repeatePassword
            },
            HeaderRequest
        )
            .then(res => {

                this.setState({
                    title: 'Informe o código para desbloqueio: ',
                    message: "A conta foi criada, você receberá um código para desbloquea-la.",
                    openDialogActiveAccount: true,
                    openMessage: false,
                    redirect: true
                });
            })
            .catch(ex => {
                this.setState({
                    title: 'Alerta!',
                    message: ex.response.data.message,
                    openDialogActiveAccount: false,
                    openMessage: true,
                    redirect: false
                });
            });
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <RGrid container spacing={24}>
                    <RGrid item xs={10}>
                        <Paper className={classes.paper}>
                            <h2>Sign Up</h2>
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
                                    fullWidth
                                    style={textFieldStyle}></TextField>

                                <Button
                                    type="submit"
                                    style={buttonStyle}
                                    fullWidth={true}
                                    label="Submit">
                                    create account</Button>
                            </form>

                        </Paper>
                    </RGrid>
                    <RGrid item xs={2}>
                        <Paper className={classes.paper}>
                            <strong>Register account</strong>
                            <p>Brief description of the content being listed.</p>
                        </Paper>
                    </RGrid>
                </RGrid>

                <Dialog
                    message={this.state.message}
                    open={this.state.openMessage}
                    title={this.state.title}
                    fullScreen={false} />
                <ActiveCodeDialog
                    message={this.state.message}
                    open={this.state.openDialogActiveAccount}
                    title={this.state.title}
                    fullScreen={false}
                    userName={this.state.userName} />
            </div>

        );
    }

}
export default withStyles(gridStyles)(SignUp);
