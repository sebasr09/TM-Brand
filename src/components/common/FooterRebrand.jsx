import { Grid, IconButton, Link, Typography } from '@mui/material';

import Colors from '../../constants/Colors';
import React from 'react';
import TermsAndConditionsDialog from '../common/TermsAndConditionsDialog';
import { list } from '../../data/solutions';
import { makeStyles } from '@mui/styles';

const FooterRebrand = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();

  return (
    <Grid container spacing={2} alignItems="center" className={classes.container}>
      <Grid item xs={12} className={classes.copyrightItem}>
        {/* <Typography className={classes.help}>
          Help
        </Typography> */}
        <Typography className={classes.terminos}>
          <a onClick={handleClickOpen}> Terms and Conditions</a>
        </Typography>
      </Grid>
      <TermsAndConditionsDialog open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} />
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.primary.main,
    color: Colors.gray,
    maxWidth: '100%',
    margin: theme.spacing(10,0,5,0)
  },
  copyrightItem: {
    //marginTop: '10%',
    display: 'flex',
    //justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: '14px',
  },
  help: {
      color: theme.palette.lightgray.main,
      margin: theme.spacing(0,5,0,0),
      fontFamily: "Montserrat Light"
      
  },
  terminos: {
    color: theme.palette.lightgray.main,
    fontFamily: "Montserrat Light"
  }
}));

export default FooterRebrand;