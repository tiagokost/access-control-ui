import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import {lightBlue} from '@material-ui/core/colors';
import getMuiTheme from '@material-ui/core/styles/createMuiTheme';
import DAppBar from './components/DAppBar';
import Login from './forms/account/Login';
import { Switch,Route,Redirect } from 'react-router-dom';
import SignUp from './forms/account/SignUp';
import PasswordReset from './forms/account/PasswordReset';
import RegisterApplication from './forms/application/RegisterApplication';
import _404 from './forms/_404';
import ListApplication from './forms/application/ListApplication';
import ListAccount from './forms/account/ListAccount';
import ListRole from './forms/role/ListRole';
import Activate from './forms/account/Activate';
import {isAuthenticated} from './Auth';


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

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

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
              <Route path="/account/password-reset" component={PasswordReset}/>
              <PrivateRoute path="/application/new" component={RegisterApplication}/>
              <PrivateRoute path="/application/all" component={ListApplication}/>
              <PrivateRoute path="/account/all" component={ListAccount}/>
              <Route path="/account/activate" component={Activate}/>
              <PrivateRoute path="/role/all" component={ListRole}/>
              <Route component={_404}/>

            </Switch>
          </main>

         {/* <footer>
            <div style={phantom} />
            <div style={footerStyles}>
                <DBottom/>   
            </div>
          </footer> */}
        </div>
          
      </MuiThemeProvider>
    );
  }
}