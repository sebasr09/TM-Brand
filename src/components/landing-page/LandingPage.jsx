import CssBaseline from '@mui/material/CssBaseline';
import LandingPageRouter from './LandingPageRouter';
import MaintenanceView from '../maintenance/MaintenanceView';
import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  main: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(2)
  },
  footer: {
    marginTop: 'auto'
  }
}));

const LandingPage = ({ user, triggerSessionValidation , setUserInfo, userInfo}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {process.env.REACT_APP_FOR_MAINTENANCE ? (
        <MaintenanceView />
      ) : (
        <React.Fragment>
          <CssBaseline />
          <div component='main' className={user? classes.main : ""}>
            <LandingPageRouter user={user} triggerSessionValidation={triggerSessionValidation} setUserInfo={setUserInfo} userInfo={userInfo}/>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

LandingPage.propTypes = {
  user: PropTypes.object,
  triggerSessionValidation: PropTypes.func,
  setUserInfo: PropTypes.func, 
  userInfo: PropTypes.object
};

export default LandingPage;
