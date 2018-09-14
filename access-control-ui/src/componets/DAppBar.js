import React, { Component } from "react";
import { AppBar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';

class DAppBar extends Component{
    constructor(){
        super();
        this.state = {
          post: {},
          drawerOpened:false
        };
    }

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    }  

    handleClose = () => {
        this.setState({ anchorEl: null });
    }

    render(){
        const {  anchorEl } = this.state;
        const open = Boolean(anchorEl);
        
        return(
                <AppBar 
                position="static"
                title="Devscape - Access Control">
                <Toolbar>
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
        )
    }
}

export default DAppBar