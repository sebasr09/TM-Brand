import CurrencyFormat from '../../../common/CurrencyFormat';
import { Grid } from '@mui/material';
import LabelField from '../../../common/LabelField';
import PropTypes from 'prop-types';
import React from 'react';
import UnavailableInformation from '../../../common/UnavailableInformation';
import corporateEconomicActivityTypes from '../../../../data/corporateEconomicActivityTypes';

const renderCreditDeadline = (creditDeadline) => {
  if (creditDeadline) {
    if (creditDeadline < 1) return creditDeadline * 30 + ' días';
    return creditDeadline + ' meses';
  }
  return '-';
};

const renderEconomicActivity = (economicActivity) => {
  let resp = economicActivity;
  corporateEconomicActivityTypes.forEach((element) => {
    const value = element.value;
    if (value === economicActivity) resp = element.description;
  });
  return resp;
};

const renderDate = (date) => {
  if (date) {
    const dateToFormate = new Date(date);
    const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(dateToFormate);
    const month = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(dateToFormate);
    const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(dateToFormate);
    return `${day}-${month}-${year}`;
  }
  return '-';
};

const CreditInformationDetail = ({ creditInformation }) => {
  return (
    <React.Fragment>
      {creditInformation ? (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} lg={4}>
            <LabelField
              fullWidth
              defaultValue={creditInformation.amount}
              label='Monto Solicitado'
              id='amount'
              disabled
              InputProps={{
                inputComponent: CurrencyFormat
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <LabelField
              fullWidth
              id='creditDeadline'
              defaultValue={renderCreditDeadline(creditInformation.creditDeadline)}
              label='Plazo'
              disabled
            />
          </Grid>
          {creditInformation.vehicleValue && (
            <Grid item xs={12} sm={6} lg={4}>
              <LabelField
                fullWidth
                id='vehicleValue'
                defaultValue={creditInformation.vehicleValue}
                label='Valor del vehículo'
                disabled
                InputProps={{
                  inputComponent: CurrencyFormat
                }}
              />
            </Grid>
          )}
          {creditInformation.vehicleCondition && (
            <Grid item xs={12} sm={6} lg={4}>
              <LabelField
                fullWidth
                id='vehicleCondition'
                defaultValue={creditInformation.vehicleCondition}
                label='Estado del vehículo'
                disabled
              />
            </Grid>
          )}
          {creditInformation.vehicleConditionDetail && (
            <Grid item xs={12} sm={6} lg={4}>
              <LabelField
                fullWidth
                id='vehicleConditionDetail'
                defaultValue={creditInformation.vehicleConditionDetail}
                label='Modelo del vehículo'
                disabled
              />
            </Grid>
          )}
          {creditInformation.useType && (
            <Grid item xs={12} sm={6} lg={4}>
              <LabelField
                fullWidth
                defaultValue={creditInformation.useType}
                label='Tipo de uso'
                disabled
                id='useType'
              />
            </Grid>
          )}
          {creditInformation.useTypeDetail && (
            <Grid item xs={12} sm={6} lg={4}>
              <LabelField
                fullWidth
                defaultValue={creditInformation.useTypeDetail}
                label='Actividad de uso'
                disabled
                id='useTypeDetail'
              />
            </Grid>
          )}
          {creditInformation.economicActivity && (
            <Grid item xs={12} sm={6} lg={4}>
              <LabelField
                fullWidth
                id='economicActivity'
                defaultValue={renderEconomicActivity(creditInformation.economicActivity)}
                label='Actividad económica'
                disabled
              />
            </Grid>
          )}
          {creditInformation.startDate && (
            <Grid item xs={12} sm={6} lg={4}>
              <LabelField
                fullWidth
                id='startDate'
                defaultValue={renderDate(creditInformation.startDate)}
                label='Fecha de constitución'
                disabled
              />
            </Grid>
          )}
          {creditInformation.income && (
            <Grid item xs={12} sm={6} lg={4}>
              <LabelField
                fullWidth
                id='income'
                defaultValue={creditInformation.income}
                label='Ingresos'
                disabled
                InputProps={{
                  inputComponent: CurrencyFormat
                }}
              />
            </Grid>
          )}
          {creditInformation.assets && (
            <Grid item xs={12} sm={6} lg={4}>
              <LabelField
                fullWidth
                id='assets'
                defaultValue={creditInformation.assets}
                label='Activos'
                disabled
                InputProps={{
                  inputComponent: CurrencyFormat
                }}
              />
            </Grid>
          )}
          {creditInformation.resourceDestination && (
            <Grid item xs={12} sm={6} lg={4}>
              <LabelField
                fullWidth
                id='resourceDestination'
                defaultValue={creditInformation.resourceDestination}
                label='Destino de los recursos'
                disabled
              />
            </Grid>
          )}
          {creditInformation.resourceDestinationDescription && (
            <Grid item xs={12} sm={6} lg={4}>
              <LabelField
                fullWidth
                id='resourceDestinationDescription'
                defaultValue={creditInformation.resourceDestinationDescription}
                label='Detalle destino de los recursos'
                disabled
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

CreditInformationDetail.propTypes = {
  creditInformation: PropTypes.object
};

export default CreditInformationDetail;
