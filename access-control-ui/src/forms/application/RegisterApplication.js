import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import axios from 'axios';
import Dialog from './../../components/DDialog';
import { Paper } from '@material-ui/core';
import { paperStyle,textFieldStyle, contentStyle, buttonStyle } from './../formStyle';


export default class RegisterApplication extends Component {

    clearForm() {
        this.state = {
            title: 'Dialog',
            message: '',
            openDialog: false,
            alias: '',
            name: '',
            description: ''
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
        }
    }

    componentDidMount() {

    }

    sendForm(e) {
        e.preventDefault();

        axios.post('http://localhost:8080/application',
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
                console.log(res.data);

                this.clearForm();

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
        return (
            <Paper>
                <div style={contentStyle}>

                    <form onSubmit={(e) => this.sendForm(e)}>
                        <TextField
                            required={true}
                            onChange={this.onChange}
                            value={this.state.userName}
                            placeholder="Name"
                            type="text"
                            id="name"
                            fullWidth={true}
                            style={textFieldStyle}></TextField>
                        <TextField
                            required={true}
                            value={this.state.password}
                            onChange={this.onChange}
                            placeholder="Alias"
                            type="text"
                            id="alias"
                            fullWidth={true}
                            style={textFieldStyle}></TextField>
                        <TextField
                            required={true}
                            value={this.state.repeatePassword}
                            onChange={this.onChange}
                            placeholder="Description"
                            type="text"
                            id="description"
                            fullWidth={true}
                            style={textFieldStyle}></TextField>

                        <Button
                            type="submit"
                            style={buttonStyle}
                            fullWidth={true}
                            label="Submit"
                        >save</Button>
                    </form>
                    <Dialog
                        message={this.state.message}
                        open={this.state.openDialog}
                        title={this.state.title}
                        fullScreen={false} />
                </div>
            </Paper>

        );
    }

}
