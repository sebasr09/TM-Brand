import { Chip, Grid } from '@mui/material';

import LabelField from '../../../common/LabelField';
import PropTypes from 'prop-types';
import React from 'react';
import UnavailableInformation from '../../../common/UnavailableInformation';

const classes = {
  indicator: {
    marginRight: 10
  }
};

const BasicInformationDetail = ({ basicInformation }) => {
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

  return (
    <React.Fragment>
      {basicInformation ? (
        <Grid container spacing={3}>
          {basicInformation.name && (
            <Grid item xs={12} sm={6} lg={4}>
              <LabelField
                fullWidth
                defaultValue={basicInformation.name}
                label='Nombres'
                disabled
                id='name'
                name='name'
              />
            </Grid>
          )}
          {basicInformation.lastName && (
            <Grid item xs={12} sm={6} lg={4}>
              <LabelField
                fullWidth
                defaultValue={basicInformation.lastName}
                label='Apellidos'
                disabled
                id='lastName'
                name='lastName'
              />
            </Grid>
          )}
          {(basicInformation.isReported !== null || basicInformation.isReported !== undefined) && (
            <Grid item xs={12} sm={6} lg={4}>
              <LabelField
                fullWidth
                defaultValue={basicInformation.isReported ? 'Sí' : 'No'}
                id='isReported'
                name='isReported'
                label='Reportado en centrales de riesgo'
                disabled
              />
            </Grid>
          )}
          {basicInformation.businessName && (
            <Grid item xs={12} sm={6} lg={4}>
              <LabelField
                fullWidth
                id='businessName'
                name='businessName'
                defaultValue={basicInformation.businessName}
                label='Nombre de la empresa'
                disabled
              />
            </Grid>
          )}
          {basicInformation.businessType && (
            <Grid item xs={12} sm={6} lg={4}>
              <LabelField
                fullWidth
                id='businessType'
                defaultValue={basicInformation.businessType}
                label='Tipo de sociedad'
                disabled
              />
            </Grid>
          )}
          {basicInformation.businessTypeDetail && (
            <Grid item xs={12} sm={6} lg={4}>
              <LabelField
                fullWidth
                id='businessTypeDetail'
                name='businessTypeDetail'
                defaultValue={basicInformation.businessTypeDetail}
                label='Detalle de tipo de sociedad'
                disabled
              />
            </Grid>
          )}
          {basicInformation.contactName && (
            <Grid item xs={12} sm={6} lg={4}>
              <LabelField
                fullWidth
                name='contactName'
                defaultValue={basicInformation.contactName}
                label='Nombre de Contacto'
                disabled
                id='contactName'
              />
            </Grid>
          )}
          {basicInformation.isLegalRepresentative && (
            <Grid item xs={12} sm={6} lg={4}>
              <LabelField
                fullWidth
                name='isLegalRepresentative'
                id='isLegalRepresentative'
                defaultValue={basicInformation.isLegalRepresentative ? 'Sí' : 'No'}
                label='Es representante legal'
                disabled
              />
            </Grid>
          )}
          {basicInformation.identificationType && (
            <Grid item xs={12} sm={6} lg={4}>
              <LabelField
                fullWidth
                id='identificationType'
                defaultValue={basicInformation.identificationType}
                label='Tipo de Documento'
                disabled
              />
            </Grid>
          )}
          {basicInformation.identification && (
            <Grid item xs={12} sm={6} lg={4}>
              <LabelField
                fullWidth
                id='identification'
                defaultValue={basicInformation.identification}
                label='Número de Identificación'
                disabled
              />
            </Grid>
          )}
          {basicInformation.birthday && (
            <Grid item xs={12} sm={6} lg={4}>
              <LabelField
                fullWidth
                id='birthday'
                defaultValue={renderDate(basicInformation.birthday)}
                label='Fecha de nacimiento'
                disabled
              />
            </Grid>
          )}
          {basicInformation.expeditionDate && (
            <Grid item xs={12} sm={6} lg={4}>
              <LabelField
                fullWidth
                id='expeditionDate'
                defaultValue={renderDate(basicInformation.expeditionDate)}
                label='Fecha de expedición'
                disabled
              />
            </Grid>
          )}
          {basicInformation.maritalStatus && (
            <Grid item xs={12} sm={6} lg={4}>
              <LabelField
                fullWidth
                defaultValue={basicInformation.maritalStatus}
                label='Estado civil'
                disabled
                id='maritalStatus'
              />
            </Grid>
          )}
          {basicInformation.email && (
            <Grid item xs={12} sm={6} lg={4}>
              <LabelField
                fullWidth
                defaultValue={basicInformation.email}
                label='Correo Electrónico'
                disabled
                id='email'
              />
            </Grid>
          )}
          {basicInformation.phone && (
            <Grid item xs={12} sm={6} lg={4}>
              <LabelField
                fullWidth
                id='phone'
                defaultValue={basicInformation.phone}
                label='Número Telefónico'
                disabled
                InputProps={{
                  startAdornment: <Chip label='+57' color='secondary' style={classes.indicator} />
                }}
              />
            </Grid>
          )}
          {basicInformation.residenceCity && (
            <Grid item xs={12} sm={6} lg={4}>
              <LabelField
                fullWidth
                id='residenceCity'
                defaultValue={basicInformation.residenceCity}
                label='Ciudad de Residencia'
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

BasicInformationDetail.propTypes = {
  basicInformation: PropTypes.object
};

export default BasicInformationDetail;
