import React, { Component } from "react";
import { AppBar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Drawer, ListItem } from "@material-ui/core";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from 'react-router-dom';

const styles = {
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  };

const sideList = (
    <div >
    <List>
        <ListItem><Link to="/login">Sign In</Link></ListItem>
        <ListItem><Link to="/signup">Sign Up</Link></ListItem>
        <ListItem><Link to="/password-reset"></Link></ListItem>
    </List>
    {/* <Divider />
    <List>
        <ListItem>Menu 1</ListItem>
        <ListItem>Menu 2</ListItem>
        <ListItem>Menu 3</ListItem>
    </List> */}
    </div>
);

const fullList = (
    <div>
    {/* <List>
        <ListItem>Menu 1</ListItem>
        <ListItem>Menu 2</ListItem>
        <ListItem>Menu 3</ListItem>
    </List>
    <Divider />
    <List>
        <ListItem>Menu 1</ListItem>
        <ListItem>Menu 2</ListItem>
        <ListItem>Menu 3</ListItem>
    </List> */}
    </div>
);

class DAppBar extends Component{
    constructor(){
        super();
        this.state = {
          post: {},
          drawerOpened:false
        };
    }
        
    state = {
        top: false,
        left: false,
        bottom: false,
        right: false,
      };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    }  

    handleClose = () => {
        this.setState({ anchorEl: null });
    }

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    render(){
        const {  anchorEl } = this.state;
        const open = Boolean(anchorEl);
        
        return(
            <div>
                <AppBar 
                    position="static"
                    title="Devscape - Access Control">
                    <Toolbar>
                    <IconButton onClick={this.toggleDrawer('left', true)} color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                        <Typography variant="title" color="inherit" >
                            Access Control
                        </Typography>
                        <div>
                            <IconButton
                                aria-owns={open ? 'menu-appbar' : null}
                                aria-haspopup="true"
                                onClick={this.handleMenu}
                                color="inherit"
                            >
                            <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                open={open}
                                onClose={this.handleClose}
                            >
                                <MenuItem onClick={this.handleClose}>Sig In</MenuItem>
                                <MenuItem onClick={this.handleClose}>Sig Up</MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>

                <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer('left', false)}
                        onKeyDown={this.toggleDrawer('left', false)}
                    >
                        {sideList}
                    </div>
                </Drawer>
   
            </div>
        )
    }
}

export default DAppBar