import MuiAlert from '@mui/lab/Alert';
import PropTypes from 'prop-types';
import React from 'react';
import { Snackbar } from '@mui/material';

export default function SuccessSnackbar({ message, open, handleClose }) {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <MuiAlert onClose={handleClose} severity='success'>
        {message}
      </MuiAlert>
    </Snackbar>
  );
}

SuccessSnackbar.propTypes = {
  message: PropTypes.string,
  open: PropTypes.bool,
  handleClose: PropTypes.func
};
