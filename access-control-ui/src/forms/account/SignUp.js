import React,{Component} from 'react';
import {TextField,Button} from '@material-ui/core';
import axios from 'axios';
import Dialog from './../../components/DDialog';

const contentStyle = {
    padding: '20px',
    maxWidth: '800px'
}

const textFieldStyle = {
    display: 'block',
    marginTop: '5%'
}
  
const buttonStyle = {
    marginTop:'20px',
    marginTop: '5%'
}

export default class SignUp extends Component {
   
    clearForm(){
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
    constructor(){
        super();

        this.clearForm();

        this.onChange = (event)=>{
            const state = Object.assign({},this.state);
            const fieldName = event.target.id;
            state[fieldName] = event.target.value;
            this.setState(state);
        }

    }
    sendForm(e){
        e.preventDefault();


        const axiosRequest = axios.create({
            baseURL: 'http://localhost:8080',
            headers:{
               'Authorization':'Basic ZGV2c2NhcGU6MTIzNDU2',
               // 'WWW-Authenticate': 'Basic realm="Realm"'
               'Content-Type': 'application/json;charset=UTF-8',
               "Access-Control-Allow-Origin": "*",
            }
          });

        axiosRequest.post('account',
        {
            userName: this.state.userName,
            password: this.state.password,
            repeatePassword: this.state.repeatePassword
        }
        )
        .then(res=>{
            console.log(res.data);
            this.clearForm();
        })
        .catch(res=>{
            this.setState({
                    title: 'Error',
                    message: res.message,
                    openDialog: true
                }
            );
            console.log('erro: '+res);
        });
    }

    render(){
        return(
            <div style={contentStyle}>
                <form onSubmit={(e)=>this.sendForm(e)}>
                    <TextField 
                        required={true}
                        onChange={this.onChange}
                        value={this.state.userName}
                        placeholder="User Name (E-mail)" 
                        type="text"
                        id="userName"
                        fullWidth={true}
                        style={textFieldStyle}></TextField>
                    {/* <TextField 
                        value={this.state.firstName}
                        onChange={this.onChange}
                        placeholder="First Name" 
                        type="text"
                        id="firstName"
                        fullWidth={true}
                        style={textFieldStyle}></TextField>
                    <TextField 
                        value={this.state.lastName}
                        onChange={this.onChange}
                        placeholder="Last Name" 
                        type="text"
                        id="lastName"
                        fullWidth={true}
                        style={textFieldStyle}></TextField> */}
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
                <Dialog
                    message={this.state.message}
                    open={this.state.openDialog} 
                    title={this.state.title}
                    fullScreen={false}/>
          </div>
   
        );
    }
    
}
