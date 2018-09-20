import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import {lightBlue} from '@material-ui/core/colors';

import getMuiTheme from '@material-ui/core/styles/createMuiTheme';
import DAppBar from './components/DAppBar';
import Login from './forms/account/Login';
import { Switch,Route } from 'react-router-dom';
import DBottom from './components/DBottom';
import SignUp from './forms/account/SignUp';
import PasswordReset from './forms/account/PasswordReset';
import RegisterApplication from './forms/application/RegisterApplication';
import _404 from './forms/account/_404';
import ListApplication from './forms/application/ListApplication';

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
    primary: {
      main: '#c62828',
    },
    secondary: lightBlue
  }

})


export default class App extends Component {
  
  constructor(){
    super();
    this.state = {
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
              <Route path="/signup" component={SignUp}/>
              <Route path="/password-reset" component={PasswordReset}/>
              <Route path="/application/new" component={RegisterApplication}/>
              <Route path="/application/all" component={ListApplication}/>

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