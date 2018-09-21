import React,{Component} from 'react';
import {TextField,Button} from '@material-ui/core';
import axios from 'axios';
import Dialog from './../../components/DDialog';
import {textFieldStyle,contentStyle,buttonStyle} from './../formStyle';


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

    componentDidMount(){


        // axios.post('http://127.0.0.1:8080/application',       
        //     {
        //         alias:"apLLLp-det",
        //         name:"Aplicativo DETANI",
        //         description:"Sistema para emissão de multa."
        //     },
        //     {
        //         headers: {
   
        //             'Authorization':'Basic ZGV2c2NhcGU6MTIzNDU2',
        //             'Content-Type': 'application/json'
        //     }})
        //     .then(res=>{
        //         console.log('then'+res.data);
        //     }
        //     )
        //     .catch(res=>{
        //         console.log(res.message);
        // });

    }
    sendForm(e){
        e.preventDefault();

        axios.post('http://localhost:8080/account',
        {
            userName: this.state.userName,
            password: this.state.password,
            repeatePassword: this.state.repeatePassword
        },
        {
            'Origin':'http://127.0.0.1:3000',
            'Authorization':'Basic ZGV2c2NhcGU6MTIzNDU2',
            'Content-Type': 'application/json'
        }
        )
        .then(res=>{
            console.log(res.json());


            this.clearForm();

            console.log('then: '+res.json());
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
