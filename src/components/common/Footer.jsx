import { Facebook, Instagram, LinkedIn, WhatsApp } from '@mui/icons-material';
import { Grid, IconButton, Link, Typography } from '@mui/material';

import Colors from '../../constants/Colors';
import React from 'react';
import TermsAndConditionsDialog from '../common/TermsAndConditionsDialog';
import { list } from '../../data/solutions';
import { makeStyles } from '@mui/styles';

const Footer = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();

  return (
    <Grid container spacing={2} alignItems="center" justifyContent="center" className={classes.container}>
      <Grid item xs={12} className={classes.logoContainer}>
        <img className={classes.fmLogo} src="/images/TradeMate.svg" alt="Logo Fináncialo Mejor" />
      </Grid>
      <Grid container spacing={1} alignItems="center" justifyContent="center" className={classes.snRow}>
        <Grid item xs={3} className={classes.logoContainer}>
          <IconButton
            className={classes.snIcon}
            target="_blank"
            href="https://wa.me/573054083007"
            size="large">
            <WhatsApp />
          </IconButton>
        </Grid>
        <Grid item xs={3} className={classes.logoContainer}>
          <IconButton
            className={classes.snIcon}
            target="_blank"
            href="https://www.linkedin.com/company/financialo-mejor"
            size="large">
            <LinkedIn />
          </IconButton>
        </Grid>
        <Grid item xs={3} className={classes.logoContainer}>
          <IconButton
            className={classes.snIcon}
            target="_blank"
            href="https://www.instagram.com/financialomejor"
            size="large">
            <Instagram />
          </IconButton>
        </Grid>
        <Grid item xs={3} className={classes.logoContainer}>
          <IconButton
            className={classes.snIcon}
            target="_blank"
            href="https://www.facebook.com/financialomejor"
            size="large">
            <Facebook />
          </IconButton>
        </Grid>
      </Grid>
      <hr className={classes.hr} />
      <Grid item xs={12} sm={4} className={classes.copyrightItem}>
        <Typography>
          <strong>© 2021 - Carla Tech</strong>{' '}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={4} className={classes.copyrightItem}>
        <a target="_blank" rel="noopener noreferrer" href="https://aws.amazon.com/">
          <img className={classes.allyLogo} alt="Logo AWS" height="100%" src="/images/aws.png" />
        </a>
        <a target="_blank" rel="noopener noreferrer" href="https://www.colombiafintech.co/">
          <img className={classes.allyLogo} alt="Logo Colombia Fintech" height="100%" src="/images/fintech.png" />
        </a>
      </Grid>
      <TermsAndConditionsDialog open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} />
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.lightGray,
    backgroundColor: Colors.white,
    color: Colors.gray,
    padding: '3% 10%',
    maxWidth: '100%',
    marginRight: 0,
    marginLeft: 0,
  },
  logoContainer: {
    textAlign: 'center',
  },
  copyrightItem: {
    marginTop: '3%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: '15px',
  },
  allyLogo: {
    maxHeight: '6vh',
    marginRight: '3vw',
  },
  fmLogo: {
    maxHeight: '6vh',
    maxWidth: '100%',
    [theme.breakpoints.down('md')]: {
      maxHeight: '4vh',
    },
  },
  link: {
    whiteSpace: 'nowrap',
    textAlign: 'center',
    color: Colors.gray,
    cursor: 'pointer',
    textDecoration: 'none !important',
    padding: '1% 0',
    margin: '4% 0',
    transition: '0.3s',
    '&:hover': {
      color: Colors.yellow,
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '0.95em',
    },
  },
  sectionTitle: {
    textAlign: 'center',
    color: Colors.gray,
    fontWeight: 600,
    textDecoration: 'none',
    padding: '2% 1% 6%',
  },
  hr: {
    margin: '3% 0',
    width: '100%',
    border: `1.5px solid ${Colors.lightGray}`,
    [theme.breakpoints.down('md')]: {
      margin: '6% 0',
    },
  },
  buttonsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  linksContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 'auto',
  },
  snRow: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: '50%',
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: '30%',
    },
  },
  snIcon: {
    backgroundColor: Colors.primary,
    color: Colors.white,
    backgroundImage: 'linear-gradient(to right, #403999 0%, #8580d1 51%, #403999 100%)',
    backgroundSize: '300% 100%',
    'moz-transition': 'all .4s ease-in-out',
    '-o-transition': 'all .4s ease-in-out',
    '-webkit-transition': 'all .4s ease-in-out',
    transition: 'all .4s ease-in-out',
    '&:hover': {
      backgroundPosition: '100% 0',
      'moz-transition': 'all .4s ease-in-out',
      '-o-transition': 'all .4s ease-in-out',
      '-webkit-transition': 'all .4s ease-in-out',
      transition: 'all .4s ease-in-out',
    },
  },
}));

export default Footer;
