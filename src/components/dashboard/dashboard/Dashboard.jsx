import React, { useEffect, useState } from 'react';
import Colors from '../../../constants/Colors';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import WalletView from '../trading/wallet/WalletView';
import InvestmentView from '../pools/InvestmentsView';
import { Grid } from '@mui/material';
import Binance from 'binance-api-node';

export default function Dashboard({ user, userInfo, setUserInfo }) {
  const classes = useStyles();
  const [roles, setRoles] = useState([]);
  const client = Binance();

  const getUserRoles = async () => {
    if (user.signInUserSession.accessToken.payload['cognito:groups']) {
      setRoles(user.signInUserSession.accessToken.payload['cognito:groups']);
      console.log(user.signInUserSession.accessToken.payload['cognito:groups']);
      let result = await client.prices();
      console.log(result);
    }
  };

  useEffect(() => {
    user && getUserRoles();
  }, [user]);

  return (
    <Grid container>
      {roles.includes('investor') && (
        <Grid item xs={12} md={6} lg={6}>
          <InvestmentView setUserInfo={setUserInfo} userInfo={userInfo} />
        </Grid>
      )}
      {roles.includes('trader') && (
        <Grid item xs={12} md={6} lg={6}>
          <WalletView />
        </Grid>
      )}
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    padding: '1% 3% 8%',
    [theme.breakpoints.down('xs')]: {
      width: '82%',
    },
  },
  buttonsGroup: {
    margin: 'auto',
  },
  newUserButton: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  topButtons: {
    padding: '2% 0',
  },
  paper: {
    width: '100%',
    padding: '1em',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  buttonCreate: {
    marginBottom: '2%',
  },
  buttonDelete: {
    backgroundColor: Colors.accent,
    color: Colors.white,
  },
  buttonEdit: {
    backgroundColor: Colors.primary,
    color: Colors.white,
    marginRight: 10,
  },
}));

Dashboard.propTypes = {
  user: PropTypes.object,
  setUserInfo: PropTypes.function,
  userInfo: PropTypes.object,
};
