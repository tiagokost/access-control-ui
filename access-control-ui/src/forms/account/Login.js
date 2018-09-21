import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { paperStyle,textFieldStyle, contentStyle, buttonStyle } from './../formStyle';

// const contentStyle = {
//     padding: '20px'
// }

// const textFieldStyle = {
//     display: 'block',
//     width:'100%',
//     marginTop: '5%'
// }
  
// const buttonStyle = {
//     marginTop:'20px',
//     marginTop: '5%'
// }


class Login extends Component{
    sendForm(e){
        e.preventDefault();
        var data={
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };
  
        console.log(data);
    }
    
    // componentDidMount(){
    //     axios.get('https://jsonplaceholder.typicode.com/users')
    //     .then(res=>{
    //         this.setState({
    //         post: res.data
    //         })
    //         console.log(res);
    //     })
    //     .catch(res=>{
    //         console.log(res);
    //     });
    // }
  
    render(){
        return (
            <div style={contentStyle}>
                <form onSubmit={(e)=>this.sendForm(e)}>
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
          </div>
        );
    }
}

export default Login