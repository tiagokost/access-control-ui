import React, { Component } from 'react';
import { TextField, Button, withStyles } from '@material-ui/core';
import axios from 'axios';
import Dialog from './../../components/DDialog';
import { Paper } from '@material-ui/core';
import { gridStyles, textFieldStyle, buttonStyle } from './../formStyle';
import { ApiHostBase, HeaderRequest } from '../../Api';
import RGrid from '@material-ui/core/Grid';
import {titleDefaultDialog} from '../../Config';
import { Redirect } from 'react-router-dom';



class RegisterApplication extends Component {


    constructor() {

        super();
        this.state = {
            title: titleDefaultDialog,
            message: '',
            openDialog: false,
            alias: '',
            name: '',
            description: '',
            redirect: false
        }
        this.onChange = (event) => {
            const state = Object.assign({}, this.state);
            const fieldName = event.target.id;
            state[fieldName] = event.target.value;
            this.setState(state);
        }
    }

    clearForm = () =>{
        document.getElementById("form").reset();
    }

    componentDidMount() {

    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/application/all' />
        }
    }

    sendForm(e) {
        e.preventDefault();

        axios.post(ApiHostBase + 'application',
            {
                alias: this.state.alias,
                name: this.state.name,
                description: this.state.description
            },
            HeaderRequest
        )
            .then(res => {
               
                this.setState({
                    title: 'Sucesso!',
                    message: 'Aplitivo cadastrado com sucesso!',
                    openDialog: true,
                    redirect: true
                });
                this.clearForm();

            })
            .catch(res => {
                this.setState({
                    title: 'Erro!',
                    message: res.message,
                    openDialog: true,
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
                            <form id="form" onSubmit={(e) => this.sendForm(e)}>
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
                                    required={false}
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

                        </Paper>
                    </RGrid>
                    <RGrid item xs={2}>
                        <Paper className={classes.paper}>
                            <strong>Register Application</strong>
                            <p>Brief description of the content being listed.</p>
                        </Paper>
                    </RGrid>
                </RGrid>

                <Dialog
                    message={this.state.message}
                    open={this.state.openDialog}
                    title={this.state.title}
                    fullScreen={false} />
   

            </div>
        );
    }

}

export default withStyles(gridStyles)(RegisterApplication);
