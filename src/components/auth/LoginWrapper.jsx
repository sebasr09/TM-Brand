import React, { useState } from 'react';

import ChangePassword from './ChangePassword';
import CssBaseline from '@mui/material/CssBaseline';
import Footer from '../common/Footer';
import ForgotPassword from './ForgotPassword';
import Header from '../common/Header';
import Login from './Login';
import PropTypes from 'prop-types';
import Signup from './Signup';
import SuccessSnackbar from '../common/SuccessSnackbar';
import { makeStyles } from '@mui/styles';
import { useEffect } from 'react';

const LoginWrapper = ({ triggerSessionValidation, setUserInfo }) => {
  const classes = useStyles();

  const [authState, setAuthState] = useState('LOGIN');
  const [localUser, setLocalUser] = useState(null);
  const [openSnackbar, setOpenSnackBar] = useState(false);
  const [message, setMessage] = useState('');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackBar(false);
    setMessage('');
  };

  const handleNotify = (message) => {
    setOpenSnackBar(true);
    setMessage(message);
  };

  return (
    <div className={classes.root}>
      <SuccessSnackbar open={openSnackbar} message={message} handleClose={handleClose} />
      <CssBaseline />
      <div component='main' className={classes.main}>
        <Header />
        {authState === 'LOGIN' ? (
          <Login
            setAuthState={setAuthState}
            triggerSessionValidation={triggerSessionValidation}
            setLocalUser={setLocalUser}
            setUserInfo={setUserInfo}
          />
        ) : authState === 'FORGOT_PASSWORD' ? (
          <ForgotPassword setAuthState={setAuthState} triggerSessionValidation={triggerSessionValidation} />
        ) : authState === 'SIGNUP' ? (
          <Signup setAuthState={setAuthState} handleNotify={handleNotify} />
        ) : (
          <ChangePassword triggerSessionValidation={triggerSessionValidation} localUser={localUser} />
        )}
      </div>
      <footer className={classes.footer}>
        <Footer />
      </footer>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  main: {
    marginTop: theme.spacing(7),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(10)
    }
  },
  footer: {
    marginTop: 'auto'
  }
}));

LoginWrapper.propTypes = {
  triggerSessionValidation: PropTypes.func,
  setUserInfo: PropTypes.func
};

export default LoginWrapper;
