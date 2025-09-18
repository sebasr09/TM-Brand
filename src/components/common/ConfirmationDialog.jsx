import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import Colors from '../../constants/Colors';
import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@mui/styles';

export default function ConfirmationDialog({ open, handleAccept, handleCancel, title, content }) {
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      BackdropProps={{ classes: { root: classes.backdrop } }}>
      <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color='primary' id='cancelConfirmationDialog'>
          Cancelar
        </Button>
        <Button onClick={handleAccept} color='primary' autoFocus id='acceptConfirmationDialog'>
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const useStyles = makeStyles(() => ({
  backdrop: {
    backgroundColor: `${Colors.grayTransparent} !important`
  }
}));

ConfirmationDialog.propTypes = {
  open: PropTypes.bool,
  handleAccept: PropTypes.func,
  handleCancel: PropTypes.func,
  title: PropTypes.string,
  content: PropTypes.string
};
