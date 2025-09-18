import { Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import Colors from '../../constants/Colors';

export default function MaintenanceView() {
  const mediaMatch = window.matchMedia('(min-width: 600px)');
  const [matches, setMatches] = useState(mediaMatch.matches);

  useEffect(() => {
    const handler = (e) => setMatches(e.matches);
    mediaMatch.addListener(handler);
    return () => mediaMatch.removeListener(handler);
  });

  return (
    <div style={styles.root}>
      <Grid container style={styles.container}>
        <Grid item xs={12} justifyContent='center' alignItems='center' style={{ display: 'flex', placeSelf: 'flex-end' }}>
          <img
            src='https://cdn.financialomejor.com/img/logo.png'
            alt='Logo fináncialo mejor'
            style={matches ? styles.logoImage : styles.logoImageMin}
          />
        </Grid>
        <Grid item xs={12} style={{ display: 'flex' }} justifyContent='center' alignItems='center'>
          <img
            src={`${process.env.PUBLIC_URL}/miscellaneous/beto-vector.png`}
            alt='Logo fináncialo mejor'
            style={matches ? styles.betoImage : styles.betoImageMin}
          />
        </Grid>
        <Grid item xs={12} justifyContent='center' alignItems='center'>
          <Typography style={matches ? styles.title : styles.titleMin}>Estamos trabajando para ti</Typography>
          <Typography style={matches ? styles.subTitle : styles.subTitleMin}>
            Tenemos un mantenimiento programado, en breve estaremos devuelta contigo
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

const styles = {
  root: {
    display: 'flex',
    minHeight: '100vh',
    width: '100%',
    backgroundColor: Colors.primary
  },
  container: {
    maxHeight: '80%'
  },
  betoImage: {
    width: '20%',
    height: 'auto',
    alignSelf: 'center'
  },
  betoImageMin: {
    width: '60%',
    height: 'auto',
    alignSelf: 'center'
  },
  logoImage: {
    width: '40%',
    height: 'auto',
    alignSelf: 'center'
  },
  logoImageMin: {
    width: '70%',
    height: 'auto',
    alignSelf: 'center'
  },
  title: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 50
  },
  titleMin: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: '8vw'
  },
  subTitle: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 30
  },
  subTitleMin: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: '5vw'
  }
};
