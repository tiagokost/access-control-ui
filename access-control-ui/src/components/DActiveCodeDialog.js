import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { TextField, Button, DialogContent, DialogContentText } from '@material-ui/core';
import axios from 'axios';
import { textFieldStyle, buttonStyle, gridStyles } from './../forms/formStyle';
import { ApiHostBase } from './../Api';


class DActiveCodeDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: props.open,
            title: this.props.title,
            userName: props.userName,
            message: props.message,
            activeCode: '',
            showField: true
        }
        this.onChange = (event) => {
            const state = Object.assign({}, this.state);
            const fieldName = event.target.id;
            state[fieldName] = event.target.value;
            this.setState(state);
            this.setState({
                openDialog: false
            });
        }
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleOk = () => {

        axios.put(ApiHostBase + 'account/activate',
            {
                activeCode: this.state.activeCode,
                userName: this.props.userName
            },
            {
                'Origin': 'http://127.0.0.1:3000',
                'Authorization': 'Basic ZGV2c2NhcGU6MTIzNDU2',
                'Content-Type': 'application/json'
            }
        )
            .then(res => {

                this.setState({
                    title: 'Success!',
                    message: "Sua conta foi ativada com sucesso!",
                    openDialog: false,
                    showField: false
                });
            })
            .catch(ex => {
                this.setState({
                    title: 'Server error',
                    message: ex.response.data.message,
                    openDialog: true
                }
                );
            });
    };

    handleClose = () => {
        this.setState({ open: false });

    };

    componentWillReceiveProps(props) {
        this.setState({ open: props.open });
    }

    sendForm(e) {
        e.preventDefault();
    }

    render() {
        const { fullScreen } = this.props;

        return (
            <div>
                <Dialog
                    fullScreen={fullScreen}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="responsive-dialog-title">
                    <DialogTitle id="responsive-dialog-title">{this.props.title}</DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            <p>{this.props.message}</p>
                            <p>{this.state.message}</p>
                            <TextField
                                hidden={this.state.showField}
                                margin="dense"
                                id="activeCode"
                                label="Active code"
                                type="text"
                                fullWidth
                                onChange={this.onChange}
                            />

                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            cancel
                        </Button>
                        <Button onClick={this.handleOk} color="primary" autoFocus>
                            ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

DActiveCodeDialog.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string.isRequired,
    fullScreen: PropTypes.bool.isRequired,
    open: PropTypes.bool.isRequired,
    userName: PropTypes.string.isRequired
};

export default withMobileDialog()(DActiveCodeDialog);