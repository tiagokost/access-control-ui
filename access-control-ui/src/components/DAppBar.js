import React, { Component } from "react";
import { AppBar, Divider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Drawer, ListItem } from "@material-ui/core";
import List from '@material-ui/core/List';
import PropTypes from 'prop-types';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import SendIcon from '@material-ui/icons/Send';
import ListSubheader from '@material-ui/core/ListSubheader';

const styles = {
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    listItem: {
        color: 'inherit',
        textDecoration: 'inherit',
        '&:hover': {
            textDecoration: 'bold'
        }
    },
    icon: {
        padding: '5px'

    },
};

function SignInIcon(props) {
    return (
        <SvgIcon {...props}>
            <path fill="#000000" d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z" />
        </SvgIcon>
    );
}

function SignUpIcon(props) {
    return (
        <SvgIcon {...props}>
            <path fill="#000000" d="M21.7,13.35L20.7,14.35L18.65,12.3L19.65,11.3C19.86,11.09 20.21,11.09 20.42,11.3L21.7,12.58C21.91,12.79 21.91,13.14 21.7,13.35M12,18.94L18.06,12.88L20.11,14.93L14.06,21H12V18.94M12,14C7.58,14 4,15.79 4,18V20H10V18.11L14,14.11C13.34,14.03 12.67,14 12,14M12,4A4,4 0 0,0 8,8A4,4 0 0,0 12,12A4,4 0 0,0 16,8A4,4 0 0,0 12,4Z" />
        </SvgIcon>
    )
}

function RecoverPasswordIcon(props) {
    return (
        <SvgIcon {...props}>
            <path fill="#000000" d="M10,4A4,4 0 0,1 14,8A4,4 0 0,1 10,12A4,4 0 0,1 6,8A4,4 0 0,1 10,4M10,14C14.42,14 18,15.79 18,18V20H2V18C2,15.79 5.58,14 10,14M20,12V7H22V12H20M20,16V14H22V16H20Z" />
        </SvgIcon>
    )
}


class DAppBar extends Component {
    constructor() {
        super();
        this.state = {
            post: {},
            drawerOpened: false
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



    render() {

        const { classes } = this.props;

        const sideList = (


            <div className={classes.list}>
                <List
                    subheader={<ListSubheader component="div">Application</ListSubheader>}
                >
                    <ListItem
                        button={true}
                        dense={true}
                        selected={true}>
                        <SendIcon className={classes.icon} />
                        <Link
                            className={classes.listItem} to="/application/all">
                            Applications</Link>
                    </ListItem>
                    <ListItem
                        button={true}
                        dense={false}
                    >
                        <SignUpIcon className={classes.icon} />
                        <Link className={classes.listItem} to="/application/new">New</Link></ListItem>
                </List>
                <Divider />
                <List
                    subheader={<ListSubheader component="div">Account</ListSubheader>}
                >
                    <ListItem
                        button={true}
                        dense={true}
                    >
                        <SignInIcon className={classes.icon} />
                        <Link
                            className={classes.listItem} to="/account/all">
                            Account</Link>
                    </ListItem>
                    <ListItem
                        button={true}
                        dense={true}
                    >
                        <SignInIcon className={classes.icon} />
                        <Link
                            className={classes.listItem} to="/login">
                            Sign In</Link>
                    </ListItem>
                    <ListItem
                        button={true}
                        dense={false}
                    >
                        <SignUpIcon className={classes.icon} />
                        <Link className={classes.listItem} to="/signup">Sign Up</Link></ListItem>
                    <ListItem
                        button={true}
                        dense={false}
                    >
                        <SignUpIcon className={classes.icon} />
                        <Link className={classes.listItem} to="/account/activate">Activate</Link></ListItem>
                    <ListItem
                        button={true}
                        dense={true}
                    >
                        <RecoverPasswordIcon className={classes.icon} />
                        <Link className={classes.listItem} to="/password-reset">Reset password</Link></ListItem>
                </List>

            </div>
        );

        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div>
                <AppBar
                    position="static"
                    title="Devscape - Access Control">
                    <Toolbar>
                        <IconButton onClick={this.toggleDrawer('left', true)} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" >
                            <span>Devscape</span>
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

DAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DAppBar);
