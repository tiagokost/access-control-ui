import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import purple from '@material-ui/core/colors/purple';
import red from '@material-ui/core/colors/red';
import getMuiTheme from '@material-ui/core/styles/createMuiTheme';
import DAppBar from './componets/DAppBar';
import Login from './forms/account/Login';
import { Switch,Route } from 'react-router-dom';
import DBottom from './componets/DBottom';
import SignUp from './forms/account/SignUp';
import PasswordReset from './forms/account/PasswordReset';
import _404 from './forms/account/_404';

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

var footerStyles = {
  backgroundColor: "#F8F8F8",
  borderTop: "1px solid #E7E7E7",
  textAlign: "center",
  padding: "20px",
  position: "fixed",
  left: "0",
  bottom: "0",
  height: "50px",
  width: "100%",
}

var phantom = {
  display: 'block',
  padding: '20px',
  height: '60px',
  width: '100%'
}

const muiTheme = getMuiTheme({
  palette:{
      primary: purple,
      secondary: red
  }

})

export default class App extends Component {
  
  constructor(){
    super();
    this.state = {
      post: {},
      drawerOpened:false
    };
  }

  render() {
    
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <MuiThemeProvider theme={muiTheme}>
        <div>
          <header>
            <DAppBar/>
          </header>
          
          <main>
            <Switch>
              <Route path="/login" component={Login}/>
              <Route path="/sigup" component={SignUp}/>
              <Route path="/password-reset" component={PasswordReset}/>
              <Route component={_404}/>

            </Switch>
          </main>

          <footer>
            <div style={phantom} />
            <div style={footerStyles}>
                <DBottom/>   
            </div>
          </footer>
        </div>
          
      </MuiThemeProvider>
    );
  }
}
