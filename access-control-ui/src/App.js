import React, { Component } from 'react';
import ReactDOM from 'react-dom'; 
import './App.css';
import axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Drawer from '@material-ui/core/Drawer';
import {List,ListItem} from '@material-ui/core/List';
import {blue500,pink500} from '@material-ui/core/styles';
import getMuiTheme from '@material-ui/core/styles/createMuiTheme';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const muiTheme = getMuiTheme({
  palette:{
      primary1Color:blue500,
      accent1Color: pink500
  }
})

const contentStyle = {
  padding: '20px'
};

const textFieldStyle = {
  display: 'block',
  width:'100%'
};

const buttonStyle = {
  marginTop:'20px'
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      post: {},
      drawerOpened:false
    };
  }

  componentDidMount(){
    axios.get('https://jsonplaceholder.typicode.com/users')
         .then(res=>{
            this.setState({
              post: res.data
            })
            console.log(res);
         })
         .catch(res=>{
           console.log(res);

         });
  }
  togglerDraw(){
    this.setState({
        drawerOpened: !this.state.drawerOpened
    });
  }
  sendForm(e){
      e.preventDefault();
      var data={
          email: document.getElementById('email').value,
          password: document.getElementById('password').value
      };

      console.log(data);
  }

  render() {
    return (
      <MuiThemeProvider theme={muiTheme}>
          
        <div>
          <AppBar 
              title="My App reactJs"
              //onLeftIconButtonClick={()=> this.togglerDraw()}
          >
            <Typography variant="title" color="inherit">
              Title
            </Typography>

          </AppBar>
          <Drawer 
              open={this.state.drawerOpened}  
              docked={false}
              onRequestChange={()=>this.togglerDraw()}>

          </Drawer>
          <div style={contentStyle}>
              <form onSubmit={(e)=>this.sendForm(e)}>
                  <TextField 
                      floatinglabeltext="E-mail" 
                      type="email"
                      id="email"
                      style={textFieldStyle}></TextField>
                  <TextField 
                      floatingLabelText="Senha"
                      type="password"
                      id="password"
                      style={textFieldStyle}></TextField>
                  <Button 
                      type="submit"
                      style={buttonStyle}
                      fullWidth={true}
                      label="Login"
                      secondary={true}
                  ></Button>
              </form>
          </div>
        </div>
          
  </MuiThemeProvider>
    );
  }
}

export default App;
