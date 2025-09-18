import { Card, CardContent, Grid, TextField, Typography } from '@mui/material';

import PropTypes from 'prop-types';
import React from 'react';

const UsagePlanCard = ({ service, handleUsagePlanChange, usagePlansErrors, usagePlans }) => {
  return (
    <Card style={styles.card}>
      <CardContent>
        <Typography gutterBottom variant='h5' component='h2'>
          Plan {service}
        </Typography>
        <Grid container>
          <Grid item xs={12} md={6} style={styles.fieldContainer}>
            <TextField
              id={`${service}Plan`}
              name={`${service}Plan`}
              label='Paquete de consultas'
              fullWidth
              type='number'
              autoComplete='plan'
              helperText={usagePlansErrors[`${service}Plan`] && 'El plan debe ser un número'}
              error={usagePlansErrors[`${service}Plan`]}
              value={usagePlans[`${service}Plan`] || ''}
              onChange={(event) => handleUsagePlanChange(event.target.name, event.target.value)}
            />
          </Grid>
          {typeof usagePlans[`${service}Done`] === 'number' && (
            <Grid item xs={12} md={6} style={styles.fieldContainer}>
              <TextField
                id={`${service}Done`}
                name={`${service}Done`}
                label='Consultas hechas'
                fullWidth
                disabled={true}
                type='number'
                value={typeof usagePlans[`${service}Done`] === 'number' ? usagePlans[`${service}Done`] : ''}
              />
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

const styles = {
  card: {
    marginTop: '20px'
  },
  fieldContainer: {
    padding: '10px'
  }
};

UsagePlanCard.propTypes = {
  service: PropTypes.string,
  handleUsagePlanChange: PropTypes.func,
  usagePlansErrors: PropTypes.object,
  usagePlans: PropTypes.object
};

export default UsagePlanCard;
