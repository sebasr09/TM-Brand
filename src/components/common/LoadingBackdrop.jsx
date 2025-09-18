import { Backdrop, CircularProgress } from '@mui/material';

import Colors from '../../constants/Colors';
import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@mui/styles';

const LoadingBackdrop = ({ open }) => {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={open}>
      <CircularProgress color='inherit' />
    </Backdrop>
  );
};

LoadingBackdrop.propTypes = {
  open: PropTypes.bool
};

export default LoadingBackdrop;

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 10,
    color: Colors.primary,
    backgroundColor: `${Colors.grayTransparent} !important`
  }
}));
