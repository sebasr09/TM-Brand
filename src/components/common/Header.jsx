import React, { useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Colors from '../../constants/Colors';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { Link } from '@mui/material';
import MediaQuery from 'react-responsive';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import WhatsappLogo from '../../logos/wa.png';
import { makeStyles } from '@mui/styles';

const Header = () => {
  const classes = useStyles();
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  
  return (
    <React.Fragment>
      <div className={classes.root}>
        <AppBar className={openMobileMenu ? classes.appBarMobile : classes.appBar} position='absolute'>
          <MediaQuery minDeviceWidth={801}>
            <Toolbar className={classes.topBar}>
              <div className={classes.header}>
                <Link href='https://carlatech.co/'>
                  <img
                    src={'/images/TradeMate-w.svg'}
                    alt='Logo Carla Trade'
                    width='200'
                    height='auto'
                    id='fmLogo'
                  />
                </Link>
              </div>
            </Toolbar>
          </MediaQuery>
          <MediaQuery maxDeviceWidth={800}>
            <Toolbar className={classes.toolbarMobile}>
              <div className={classes.headerMobile}>
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
              {openMobileMenu ? (
                <div className={classes.containerMobile}>
                  <IconButton
                    edge='start'
                    className={classes.menuButton}
                    color='inherit'
                    aria-label='menu'
                    id='closeMenuMobile'
                    onClick={() => setOpenMobileMenu(false)}
                    size="large">
                    X
                  </IconButton>
                  <Divider light={true} />
                  <Link
                    target='_blank'
                    href='https://financialomejor.com/credito'
                    className={classes.RouterLink}
                    id='closeMenuMobile'>
                    <Typography className={classes.titleHeaderMobile}>ENCUENTRA TU CRÉDITO</Typography>
                  </Link>

                  <a
                    href='https://wa.me/573054083007'
                    target='_blank'
                    rel='noopener noreferrer'
                    style={{ textDecoration: 'none' }}
                    id='waLink'>
                    <Typography className={classes.btnTelephoneMobile}>
                      (305) 408 3007&nbsp;
                      <img src={WhatsappLogo} alt='Whatsapp logo' height='20px' width='20px' />
                    </Typography>
                  </a>
                </div>
              ) : (
                <div>
                  <IconButton
                    edge='start'
                    className={classes.menuButton}
                    color='inherit'
                    aria-label='menu'
                    id='openMenuMobile'
                    onClick={() => setOpenMobileMenu(true)}
                    size="large">
                    <MenuIcon />
                  </IconButton>
                </div>
              )}
            </Toolbar>
          </MediaQuery>
        </AppBar>
      </div>
    </React.Fragment>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1
  },
  RouterLink: {
    textDecoration: 'none',
    color: 'white',
    transition: '0.3s',
    '&:hover': {
      color: Colors.yellow
    }
  },
  whiteRouterLink: {
    textDecoration: 'none',
    color: 'white'
  },
  menuButton: {
    position: 'absolute',
    right: '0',
    bottom: '25%'
  },
  topBar: {
    height: theme.spacing(10),
    margin: 'auto'
  },
  appBarMobile: {
    height: '100%'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '4%',
    marginBottom: '4%'
  },
  headerMobile: {
    display: 'inline-block',
    alignItems: 'center',
    position: 'relative',
    padding: '5%'
  },
  toolbarMobile: {
    display: 'inline-block'
  },
  containerMobile: {
    height: '100%'
  },
  titleHeader: {
    fontSize: '14px',
    marginBottom: '-7px',
    marginLeft: '50px'
  },
  titleHeaderMobile: {
    textAlign: 'center',
    padding: '2%'
  },
  btnTelephone: {
    background: 'transparent',
    display: 'flex',
    border: `3px solid ${Colors.secondary}`,
    borderRadius: '6px',
    height: '45px',
    color: 'white',
    fontSize: '14px',
    width: '150px',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    marginTop: '4px',
    marginLeft: '15px',
    transition: '0.3s',
    '&:hover': {
      borderColor: 'white'
    }
  },
  btnTelephoneMobile: {
    background: 'transparent',
    display: 'flex',
    border: `3px solid ${Colors.secondary}`,
    borderRadius: '6px',
    height: '45px',
    color: 'white',
    fontSize: '14px',
    width: '150px',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    margin: 'auto',
    '&:hover': {
      borderColor: 'white'
    }
  },
  btnContact: {
    height: '45px',
    background: '#186dc4',
    fontSize: '14px',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    paddingLeft: '15px',
    paddingRight: '15px',
    marginTop: '4px',
    marginLeft: '24px',
    transition: '0.2s',
    '&:hover': {
      background: Colors.accent
    }
  },
  btnContactMobile: {
    height: '45px',
    background: Colors.primary,
    fontSize: '14px',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    marginLeft: '35%',
    marginRight: '35%',
    marginBottom: '2%',
    marginTop: '2%',
    '&:hover': {
      background: Colors.accent
    }
  }
}));

export default Header;
