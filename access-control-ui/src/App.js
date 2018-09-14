import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Drawer from '@material-ui/core/Drawer';
import purple from '@material-ui/core/colors/purple';
import red from '@material-ui/core/colors/red';
import getMuiTheme from '@material-ui/core/styles/createMuiTheme';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DAppBar from './componets/DAppBar';


const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const muiTheme = getMuiTheme({
  palette:{
      primary: purple,
      secondary: red
  }

})

const contentStyle = {
  padding: '20px'
};

const textFieldStyle = {
  display: 'block',
  width:'100%',
  marginTop: '5%'
};

const buttonStyle = {
  marginTop:'20px',
  marginTop: '5%'
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
    
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <MuiThemeProvider theme={muiTheme}>
        <div>
          <DAppBar />
          <Drawer 
              open={this.state.drawerOpened}  
              docked={false}
              onRequestChange={()=>this.togglerDraw()}>

          </Drawer>
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
        </div>
          
  </MuiThemeProvider>
    );
  }
}

export default App;
