import React,{Component} from 'react';
import {TextField,Button} from '@material-ui/core';
import axios from 'axios';

const contentStyle = {
    padding: '20px'
}

const textFieldStyle = {
    display: 'block',
    width:'100%',
    marginTop: '5%'
}
  
const buttonStyle = {
    marginTop:'20px',
    marginTop: '5%'
}


export default class SignUp extends Component {
    sendForm(e){
        e.preventDefault();

        var config = {
            headers: {'Content-Type': 'application/json'}
          };

        axios.post('http://localhost:8080/account', {
            userName: document.getElementById('userName').value,
            password: document.getElementById('password').value,
            repeatePassword: document.getElementById('repeatePassword').value,
        },config)
        .then(res=>{
            this.setState({
            post: res.data
            })
            console.log('then: '+res.json());
        })
        .catch(res=>{
            console.log('erro: '+res);
        });
  
    }

    render(){
        return(
            <div style={contentStyle}>
                <form onSubmit={(e)=>this.sendForm(e)}>
                    <TextField 
                        placeholder="User Name (E-mail)" 
                        type="text"
                        id="userName"
                        fullWidth={true}
                        maxLength="2"
                        style={textFieldStyle}></TextField>
                    <TextField 
                        placeholder="First Name" 
                        type="text"
                        id="firstName"
                        fullWidth={true}
                        style={textFieldStyle}></TextField>
                    <TextField 
                        placeholder="Last Name" 
                        type="text"
                        id="lastName"
                        fullWidth={true}
                        style={textFieldStyle}></TextField>
                    <TextField 
                        placeholder="Password"
                        type="password"
                        id="password"
                        fullWidth={true}
                        style={textFieldStyle}></TextField>
                    <TextField 
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
          </div>
        );
    }
    
}
