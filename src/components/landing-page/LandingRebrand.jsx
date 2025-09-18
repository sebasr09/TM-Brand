import React, { useState } from 'react';

import { Link, Grid } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { useEffect } from 'react';
import LoginWrapperRebrand from '../auth/LoginWrapperRebrand';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import FooterRebrand from '../common/FooterRebrand';
import MediaQuery from 'react-responsive';
import ContactDialog from '../common/dialogs/ContactDialog';
import SuccessSnackbar from '../common/SuccessSnackbar';


const LandingRebrand = ({ user, triggerSessionValidation, setUserInfo }) => {
  const classes = useStyles();
  const history = useHistory();

  const [openSnackbar, setOpenSnackBar] = useState(false);
  const [openContactDialog, setOpenContactDialog] = useState(false);
  const [message, setMessage] = useState('');

  const closeDialog = () => {
    setOpenContactDialog(false);
  };

  function handleClick() {
    history.push("/login");
  }

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
    <React.Fragment>
      <MediaQuery maxDeviceWidth={900}>
        <div className={classes.root} >
          <CssBaseline />

          <div component='main' className={classes.main}>
            <div className={classes.logo}>
              <Link href='https://carlatech.co/'>
                <img
                  src={'/images/TradeMate-w.svg'}
                  alt='Logo Carla Tech'
                  width='180'
                  height='auto'
                  id='homeButton'
                />
              </Link>
            </div>
            <Typography className={classes.phrase} component='div' variant='h5'>
              <span className={classes.span}> TradeMate,</span> the best way to own a balanced portfolio of crypto assets.
            </Typography>
            <Button

              variant='contained'
              color='third'
              className={classes.contact}
              onClick={() => {
                setOpenContactDialog(true)
              }}
              id='contactButton'>
              Contact
            </Button>
            <Button

              variant='contained'
              color='white'
              className={classes.login}
              onClick={handleClick}
              id='loginButton'>
              Login
            </Button>
            <FooterRebrand></FooterRebrand>
          </div>
        </div>
      </MediaQuery>

      <MediaQuery minDeviceWidth={901}>
        <Grid container>
          <Grid item md={6}>
            <div className={classes.root} >
              <CssBaseline />

              <div component='main' className={classes.mainDesktop}>
                <div className={classes.logo}>

                  <img
                    src={'/images/TradeMate-w.svg'}
                    alt='Logo TradeMate'
                    width='180'
                    height='auto'
                    id='homeButton'
                  />

                </div>
                <Typography className={classes.phraseDesktop} component='div' variant='h4'>
                  <span className={classes.span}> TradeMate,</span> the best way to own a balanced portfolio of crypto assets.
                </Typography>
                <Button

                  variant='contained'
                  color='third'
                  className={classes.contactDesktop}
                  onClick={() => {
                    setOpenContactDialog(true)
                  }}
                  id='contactButton'>
                  Contact
                </Button>
                <FooterRebrand></FooterRebrand>
              </div>
            </div>
          </Grid>
          <Grid item md={6}>
            <img
              src={'/images/divisor.png'}
              alt='arrow'
              width='6%'
              height='auto'
              className={classes.arrow}
            />
            <LoginWrapperRebrand user={user} triggerSessionValidation={triggerSessionValidation} setUserInfo={setUserInfo} />
          </Grid>
        </Grid>

      </MediaQuery>
      <ContactDialog openDialog={openContactDialog} closeDialog={closeDialog} handleNotify={handleNotify} />
      <SuccessSnackbar open={openSnackbar} message={message} handleClose={handleClose} />
    </React.Fragment>
  );
};

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: theme.palette.primary.main,
    height: "100%",
  },
  main: {
    marginTop: theme.spacing(20),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(15),
      marginBottom: theme.spacing(10)
    },
    marginLeft: '12%',
    marginRight: '12%'

  },
  mainDesktop: {
    marginTop: theme.spacing(20),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(15),
      marginBottom: theme.spacing(10)
    },
    marginLeft: '20%',
    marginRight: '20%'

  },
  logo: {
    margin: theme.spacing(2, 0, 14, 0),

  },
  phrase: {
    color: theme.palette.white.main,
    fontWeight: "bold",
    margin: theme.spacing(0, 0, 3),
    lineHeight: "2.5",
    fontFamily: "Nexa Bold Regular"
  },
  phraseDesktop: {
    color: theme.palette.white.main,
    fontWeight: "bold",
    margin: theme.spacing(0, 0, 2),
    lineHeight: "2",
    fontFamily: "Nexa Bold Regular"
  },
  span: {
    color: theme.palette.third.main
  },
  arrow: {
    position: "absolute",
    top: "47.5%",
    //left: "50%",
    transform: "translate(-50%)",
  },
  contact: {
    margin: theme.spacing(2, 3, 2, 0),
    fontSize: 14,
    width: 150,
    height: 45,
    borderRadius: 22,
    fontFamily: "Montserrat Bold"
  },
  contactDesktop: {
    margin: theme.spacing(2, 3, 2, 0),
    fontSize: 14,
    width: 170,
    height: 45,
    borderRadius: 22,
    fontFamily: "Montserrat Bold"
  },
  login: {
    margin: theme.spacing(2, 0, 2),
    fontSize: 14,
    width: 110,
    height: 45,
    borderRadius: 22,
    fontFamily: "Montserrat Bold"
  },
}));

LandingRebrand.propTypes = {
  user: PropTypes.object,
  triggerSessionValidation: PropTypes.func,
  setUserInfo: PropTypes.func
};

export default LandingRebrand;