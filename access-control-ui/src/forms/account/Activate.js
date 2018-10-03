import React, { Component } from 'react';
import { TextField, Button, withStyles } from '@material-ui/core';
import axios from 'axios';
import Dialog from './../../components/DDialog';
import { textFieldStyle, buttonStyle, gridStyles } from './../formStyle';
import { ApiHostBase } from '../../Api';
import { Paper } from '@material-ui/core';

class Activate extends Component {
    constructor() {
        super();
        this.state = {
            title: 'Dialog',
            message: '',
            openDialog: false,
            userName: '',
            activeCode: ''
        }
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
    sendForm(e) {
        e.preventDefault();

        axios.put(ApiHostBase +'account/activate',
            {
                activeCode: this.state.activeCode,
                userName: this.state.userName
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
                    message: "Sua conta foi ativada com sucesso!",
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
                    <h2>Activate Account</h2>
                    <form onSubmit={(e) => this.sendForm(e)}>
                        <TextField
                            placeholder="User Name (E-mail)"
                            type="text"
                            onChange={this.onChange}
                            id="userName"
                            fullWidth={true}
                            style={textFieldStyle}></TextField>
                        <TextField
                            placeholder="Active code"
                            type="text"
                            onChange={this.onChange}
                            id="activeCode"
                            fullWidth={true}
                            style={textFieldStyle}></TextField>
                        <Button
                            type="submit"
                            style={buttonStyle}
                            fullWidth={true}
                            label="Submit"
                        >confirm</Button>
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

export default withStyles(gridStyles)(Activate);