import CurrencyFormat from '../../../common/CurrencyFormat';
import { Grid } from '@mui/material';
import LabelField from '../../../common/LabelField';
import PropTypes from 'prop-types';
import React from 'react';
import UnavailableInformation from '../../../common/UnavailableInformation';

const SelectedLenderDetail = ({ selectedLender }) => {
  return (
    <React.Fragment>
      {selectedLender && selectedLender.name ? (
        <Grid container spacing={3}>
          {selectedLender.name && (
            <Grid item xs={12} sm={6} lg={4}>
              <LabelField fullWidth defaultValue={selectedLender.name} label="Nombre" disabled />
            </Grid>
          )}

          {selectedLender.interestResult && selectedLender.interestResult.interest && (
            <Grid item xs={12} sm={6} lg={4}>
              <LabelField
                fullWidth
                id="interest"
                defaultValue={selectedLender.interestResult.interest + '%'}
                label="Interés"
                disabled
              />
            </Grid>
          )}
          {selectedLender.interestResult && selectedLender.interestResult.interestRange && (
            <Grid item xs={12} sm={6} lg={4}>
              <LabelField
                fullWidth
                id="interestRange"
                defaultValue={selectedLender.interestResult.interestRange}
                label="Rango de intereses"
                disabled
              />
            </Grid>
          )}
          <Grid item xs={12} sm={6} lg={4}>
            <LabelField
              fullWidth
              id="isEstimated"
              defaultValue={selectedLender.interestResult && selectedLender.interestResult.isEstimated ? 'Sí' : 'No'}
              label="¿Es estimado?"
              disabled
            />
          </Grid>
          {selectedLender.amount && (
            <Grid item xs={12} sm={6} lg={4}>
              <LabelField
                fullWidth
                id="approvedAmount"
                defaultValue={selectedLender.amount}
                label="Monto aprobado"
                disabled
                InputProps={{
                  inputComponent: CurrencyFormat
                }}
              />
            </Grid>
          )}
          {selectedLender.term && (
            <Grid item xs={12} sm={6} lg={4}>
              <LabelField
                fullWidth
                id="term"
                defaultValue={selectedLender.term}
                label="Plazo aprobado (Meses)"
                disabled
              />
            </Grid>
          )}
          {selectedLender.selectedAccount && selectedLender.selectedAccount.bank && (
            <Grid item xs={12} sm={6} lg={4}>
              <LabelField
                fullWidth
                id="bank"
                defaultValue={selectedLender.selectedAccount.bank}
                label="Entidad bancaria"
                disabled
              />
            </Grid>
          )}
          {selectedLender.selectedAccount && selectedLender.selectedAccount.type && (
            <Grid item xs={12} sm={6} lg={4}>
              <LabelField
                fullWidth
                id="accountType"
                defaultValue={selectedLender.selectedAccount.type === 'checkings' ? 'Ahorros' : 'Corriente'}
                label="Tipo de cuenta"
                disabled
              />
            </Grid>
          )}
          {selectedLender.selectedAccount && selectedLender.selectedAccount.confirmedNumber && (
            <Grid item xs={12} sm={6} lg={4}>
              <LabelField
                fullWidth
                id="accountNumber"
                defaultValue={selectedLender.selectedAccount.confirmedNumber}
                label="Número de cuenta"
                disabled
              />
            </Grid>
          )}
          {selectedLender.monthlyFee && (
            <Grid item xs={12} sm={6} lg={4}>
              <LabelField
                fullWidth
                id="monthlyFee"
                defaultValue={Math.ceil(selectedLender.monthlyFee)}
                label="Cuota mensual"
                disabled
                InputProps={{
                  inputComponent: CurrencyFormat
                }}
              />
            </Grid>
          )}
          {selectedLender.monthlyFee && selectedLender.feeComponents.insurance && (
            <Grid item xs={12} sm={6} lg={4}>
              <LabelField
                fullWidth
                id="insuranceFee"
                defaultValue={Math.ceil(selectedLender.feeComponents.insurance)}
                label="Seguro"
                disabled
                InputProps={{
                  inputComponent: CurrencyFormat
                }}
              />
            </Grid>
          )}
          {selectedLender.monthlyFee && selectedLender.feeComponents.administration && (
            <Grid item xs={12} sm={6} lg={4}>
              <LabelField
                fullWidth
                id="administrationFee"
                defaultValue={Math.ceil(selectedLender.feeComponents.administration)}
                label="Administración"
                disabled
                InputProps={{
                  inputComponent: CurrencyFormat
                }}
              />
            </Grid>
          )}
          {selectedLender.monthlyFee && selectedLender.feeComponents.technology && (
            <Grid item xs={12} sm={6} lg={4}>
              <LabelField
                fullWidth
                id="techFee"
                defaultValue={Math.ceil(selectedLender.feeComponents.technology)}
                label="Tecnología"
                disabled
                InputProps={{
                  inputComponent: CurrencyFormat
                }}
              />
            </Grid>
          )}
          {selectedLender.monthlyFee && selectedLender.feeComponents.iva && (
            <Grid item xs={12} sm={6} lg={4}>
              <LabelField
                fullWidth
                id="taxFee"
                defaultValue={Math.ceil(selectedLender.feeComponents.iva)}
                label="IVA"
                disabled
                InputProps={{
                  inputComponent: CurrencyFormat
                }}
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

SelectedLenderDetail.propTypes = {
  selectedLender: PropTypes.object
};

export default SelectedLenderDetail;
