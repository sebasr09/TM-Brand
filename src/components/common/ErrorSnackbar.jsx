import MuiAlert from '@mui/lab/Alert';
import PropTypes from 'prop-types';
import React from 'react';
import { Snackbar } from '@mui/material';

export default function ErrorSnackbar({ message, open, handleClose, duration }) {
  return (
    <Snackbar open={open} autoHideDuration={duration || 6000} onClose={handleClose}>
      <MuiAlert onClose={handleClose} severity='error'>
        {message}
      </MuiAlert>
    </Snackbar>
  );
}

ErrorSnackbar.propTypes = {
  message: PropTypes.string,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  duration: PropTypes.number
};
