import { Card, CardContent, Grid, Typography } from '@mui/material';

import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@mui/styles';

const RequestsState = ({ requestsDone, requestsPlan }) => {
  const classes = useStyles();
  return (
    <Grid container spacing={2} className={classes.consultContainer}>
      <Grid item xs={12} lg={4}>
        <Card>
          <CardContent>
            <Typography component='h5' variant='h5'>
              Información de contratos
            </Typography>
            <Typography id='requestsDone'>
              <strong>Número de contratos hechos: </strong> {requestsDone}
            </Typography>
            <Typography id='requestsRemaining'>
              <strong>Número de contratos restantes: </strong> {requestsPlan - requestsDone}
            </Typography>
            <Typography id='requestsLimit'>
              <strong>Límite de contratos: </strong> {requestsPlan}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles(() => ({
  consultContainer: {
    marginBottom: '1%'
  }
}));

RequestsState.propTypes = {
  requestsDone: PropTypes.number,
  requestsPlan: PropTypes.number
};

export default RequestsState;
