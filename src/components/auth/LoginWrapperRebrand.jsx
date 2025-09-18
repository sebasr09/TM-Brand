import React, { useState } from 'react';

import ChangePassword from './ChangePassword';
import CssBaseline from '@mui/material/CssBaseline';
import ForgotPassword from './ForgotPassword';
import PropTypes from 'prop-types';
import Signup from './Signup';
import SuccessSnackbar from '../common/SuccessSnackbar';
import { makeStyles } from '@mui/styles';
import { useEffect } from 'react';
import LoginRebrand from './LoginRebrand';

const LoginWrapperRebrand = ({ triggerSessionValidation, setUserInfo }) => {
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
    <div className={classes.root} id='wrapperBackground' >
      <SuccessSnackbar open={openSnackbar} message={message} handleClose={handleClose} />
      <CssBaseline />
      <div component='main'  className={classes.main}>
        {authState === 'LOGIN' ? (
          <LoginRebrand
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
          <ChangePassword triggerSessionValidation={triggerSessionValidation} localUser={localUser} setAuthState={setAuthState}/>
        )}
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh', 
    height: '100%'
  },
  main: {
    marginTop: theme.spacing(20),
    marginBottom: theme.spacing(20),
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(15),
      marginBottom: theme.spacing(15)
    },
   
  }
}));

LoginWrapperRebrand.propTypes = {
  triggerSessionValidation: PropTypes.func,
  setUserInfo: PropTypes.func
};

export default LoginWrapperRebrand;
