import CurrencyFormat from '../../../common/CurrencyFormat';
import { Grid } from '@mui/material';
import LabelField from '../../../common/LabelField';
import PropTypes from 'prop-types';
import React from 'react';
import UnavailableInformation from '../../../common/UnavailableInformation';

const FinancialInformationDetail = ({ financialInformation }) => {
  return (
    <React.Fragment>
      {financialInformation ? (
        <Grid container spacing={3}>
          {financialInformation.income && financialInformation.income !== '0' && (
            <Grid item xs={12} sm={6} lg={4}>
              <LabelField
                fullWidth
                defaultValue={financialInformation.income}
                id='income'
                label='Ingresos'
                disabled
                InputProps={{
                  inputComponent: CurrencyFormat
                }}
              />
            </Grid>
          )}
          {financialInformation.outcome && (
            <Grid item xs={12} sm={6} lg={4}>
              <LabelField
                fullWidth
                id='outcome'
                defaultValue={financialInformation.outcome}
                label='Gastos'
                disabled
                InputProps={{
                  inputComponent: CurrencyFormat
                }}
              />
            </Grid>
          )}
          {financialInformation.assets && (
            <Grid item xs={12} sm={6} lg={4}>
              <LabelField
                fullWidth
                id='assets'
                defaultValue={financialInformation.assets}
                label='Activos'
                disabled
                InputProps={{
                  inputComponent: CurrencyFormat
                }}
              />
            </Grid>
          )}
          {financialInformation.economicActivity && (
            <Grid item xs={12} sm={6} lg={4}>
              <LabelField
                fullWidth
                defaultValue={financialInformation.economicActivity}
                label='Trabajo'
                disabled
                id='economicActivity'
              />
            </Grid>
          )}
          {financialInformation.economicActivityDetail && (
            <Grid item xs={12} sm={6} lg={4}>
              <LabelField
                fullWidth
                id='economicActivityDetail'
                defaultValue={financialInformation.economicActivityDetail}
                label='Tipo contrato/Actividad económica'
                disabled
              />
            </Grid>
          )}
          {financialInformation.antiquity && (
            <Grid item xs={12} sm={6} lg={4}>
              <LabelField
                fullWidth
                defaultValue={financialInformation.antiquity}
                label='Antigüedad'
                disabled
                id='antiquity'
              />
            </Grid>
          )}
        </Grid>
      ) : (
        <UnavailableInformation />
      )}
    </React.Fragment>
  );
};

FinancialInformationDetail.propTypes = {
  financialInformation: PropTypes.object
};

export default FinancialInformationDetail;
