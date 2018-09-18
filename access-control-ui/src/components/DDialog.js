import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

class DDialog extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      open: this.props.open,
      title: this.props.title
    }
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentWillReceiveProps(props) {
    this.setState({open: props.open});
  }

  render() {
    const { fullScreen } = this.props;

    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{this.props.title}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.props.message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              cancel
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

DDialog.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  fullScreen: PropTypes.bool.isRequired,
  open:PropTypes.bool.isRequired
};

export default withMobileDialog()(DDialog);