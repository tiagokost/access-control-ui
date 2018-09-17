import React, { Component } from "react";
import { Drawer, ListItem } from "@material-ui/core";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';


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
        <ListItem>Menu 1</ListItem>
        <ListItem>Menu 2</ListItem>
        <ListItem>Menu 3</ListItem>
    </List>
    <Divider />
    <List>
        <ListItem>Menu 1</ListItem>
        <ListItem>Menu 2</ListItem>
        <ListItem>Menu 3</ListItem>
    </List>
    </div>
);

const fullList = (
    <div>
    <List>
        <ListItem>Menu 1</ListItem>
        <ListItem>Menu 2</ListItem>
        <ListItem>Menu 3</ListItem>
    </List>
    <Divider />
    <List>
        <ListItem>Menu 1</ListItem>
        <ListItem>Menu 2</ListItem>
        <ListItem>Menu 3</ListItem>
    </List>
    </div>
);

class DDrawer extends Component{

    state = {
        top: false,
        left: false,
        bottom: false,
        right: false,
      };

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

      
    render(){
        return(
            <div>
                <Button onClick={this.toggleDrawer('left', true)}>Open Left</Button>
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
        );
    }

}
  
export default withStyles(styles)(DDrawer);