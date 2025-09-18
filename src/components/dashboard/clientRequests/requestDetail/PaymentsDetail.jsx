import { Grid, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';

import CurrencyFormat from '../../../common/CurrencyFormat';
import LabelField from '../../../common/LabelField';
import PropTypes from 'prop-types';
import UnavailableInformation from '../../../common/UnavailableInformation';
import { postApi } from '../../../api/apiManager';

const PaymentsDetail = ({ creditNumber }) => {
  const [payments, setPayments] = useState([]);

  const fetchPaymentInformation = useCallback(async () => {
    try {
      const result = await postApi('marketplace/find-payments', {
        entity: 'Bancatek',
        creditNumber: creditNumber
      });
      result && setPayments(result.data);
    } catch (err) {
      console.log(err);
    }
  }, [creditNumber]);

  useEffect(() => {
    if (creditNumber !== undefined) {
      fetchPaymentInformation();
    } else {
      setPayments(null);
    }
  }, [creditNumber]);

  const getStateLabel = (state) => {
    let text;
    switch (state) {
      case 'OK':
        text = 'Pago satisfactorio';
        break;
      case 'PENDING':
        text = 'Pago pendiente';
        break;
      case 'FAILED':
        text = 'Pago fallido';
        break;
    }
    return text;
  };

  return (
    <React.Fragment>
      {payments && payments.length > 0 ? (
        <Grid container spacing={3}>
          {payments.map((payment, index) => {
            return (
              <React.Fragment key={index}>
                <Grid item xs={12}>
                  <Typography>
                    {' '}
                    <strong>Pago No. {index + 1}</strong>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                  <LabelField
                    fullWidth
                    id={`date-${index}`}
                    defaultValue={payment.issueDate}
                    label="Fecha de pago"
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                  <LabelField
                    fullWidth
                    id={`state-${index}`}
                    defaultValue={getStateLabel(payment.state)}
                    label="Estado del pago"
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                  <LabelField
                    fullWidth
                    id={`number-${index}`}
                    defaultValue={payment.number}
                    label="Número de comprobante de pago"
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                  <LabelField
                    fullWidth
                    id={`paymentValue-${index}`}
                    defaultValue={payment.value}
                    label="Valor del pago"
                    disabled
                    InputProps={{
                      inputComponent: CurrencyFormat
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                  <LabelField fullWidth id={`name-${index}`} defaultValue={payment.name} label="Nombre" disabled />
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                  <LabelField
                    fullWidth
                    id={`identificationType-${index}`}
                    defaultValue={payment.identificationType}
                    label="Tipo de identificación"
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                  <LabelField
                    fullWidth
                    id={`identification-${index}`}
                    defaultValue={payment.identification}
                    label="Número de identificación"
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                  <LabelField
                    fullWidth
                    id={`bank-${index}`}
                    defaultValue={payment.bank && payment.bank.name}
                    label="Entidad bancaria"
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                  <LabelField
                    fullWidth
                    id={`trazabilityCode-${index}`}
                    defaultValue={payment.trazabilityCode}
                    label="Código único de seguimiento (CUS)"
                    disabled
                  />
                </Grid>
              </React.Fragment>
            );
          })}
        </Grid>
      ) : (
        <UnavailableInformation />
      )}
    </React.Fragment>
  );
};

PaymentsDetail.propTypes = {
  creditNumber: PropTypes.string
};

export default PaymentsDetail;
