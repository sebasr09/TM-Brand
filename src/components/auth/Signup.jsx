import React, { useState, useEffect } from 'react';
import { validateAlphabeticInput, validateEmailInput, validateNonEmptyInput } from '../../controllers/validators';
import { Auth } from 'aws-amplify';
import ErrorSnackbar from '../common/ErrorSnackbar';
import LoadingBackdrop from '../common/LoadingBackdrop';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PropTypes from 'prop-types';
import { Autocomplete, Typography, TextField, Container, Button, Avatar, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { postApi, getApi } from '../api/apiManager';
import countries from 'countries-list';
import { useMediaQuery } from 'react-responsive';

export default function Signup({ setAuthState, handleNotify }) {
  const classes = useStyles();
  const [data, setData] = useState({
    email: '', password: '', name: '', identification: '', confirmPassword: '', identificationType: '',
    lastName: '', country: ''
  });
  const [companyData, setCompanyData] = useState({
    companyName: '', companyId: '', companyCountry: ''
  })
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    name: false,
    identification: false,
    confirmPassword: false,
    identificationType: false,
    lastName: false,
    country: false
  });
  const [companyErrors, setCompanyErrors] = useState({
    companyName: false,
    companyId: false,
    companyCountry: false
  })
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openLoading, setOpenLoading] = useState(false);
  const [accountType, setAccountType] = useState('');

  const isMobile = useMediaQuery({ query: '(max-width: 900px)' });
  const identificationTypes = [{ id: 1, name: 'ID Nacional', shortName: 'ID' }, { id: 2, name: 'Pasaporte', shortName: 'PA' }];

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenError(false);
  };

  const handleAttributeChange = (name, value) => {
    setData((previous) => {
      const newObject = { ...previous };
      newObject[name] = value;
      return newObject;
    });
    setErrors((previous) => {
      const newObject = { ...previous };
      if (name in validators) newObject[name] = !validators[name](value);
      else if (name === 'confirmPassword') newObject[name] = value !== data.password;

      return newObject;
    });
  };

  const handleCompanyChange = (name, value) => {
    setCompanyData((previous) => {
      const newObject = { ...previous };
      newObject[name] = value;
      return newObject;
    });
    setCompanyErrors((previous) => {
      const newObject = { ...previous };
      if (name in validators) newObject[name] = !validators[name](value);

      return newObject;
    });
  };

  const existErrors = () => {
    for (let key in errors) {
      if (errors[key]) return true;
    }
    let error = false;
    for (let key in data) {
      if (key in validators) {
        error = error || !validators[key](data[key]);
      }
    }
    error = error || data.confirmPassword !== data.password;
    if (accountType === 'EMPRESA') {
      for (let key in companyErrors) {
        if (companyErrors[key]) return true;
      }
      for (let key in companyData) {
        if (key in validators) {
          error = error || !validators[key](companyData[key]);
        }
      }
    }
    return error;
  };

  const signup = async () => {
    if (!existErrors()) {
      try {
        setOpenLoading(true);
        let body = {
          "user": {
            "name": data.name,
            "lastName": data.lastName,
            "identificationTypeId": data.identificationType.id,
            'identification': data.identification,
            'email': data.email,
            'country': data.country.name
          },
          accountType: accountType
        }
        if (accountType === 'EMPRESA') {
          body['company'] = {
            name: companyData.companyName,
            identification: companyData.companyId,
            countryId: companyData.companyCountry.name
          }
        }
        const result = await postApi(
          'next-activos/signUp',
          body,
          null,
          true
        );
        if (!result) throw new Error();
        if (result.code) {
          switch (result.code) {
            case 'UsernameExistsException':
              setErrorMessage('Un usuario ya existe con el correo especificado');
              setOpenError(true);
              break;
            case 'OrganizationNotValidException':
              setErrorMessage('La organización especificada ya existe');
              setOpenError(true);
              break;
            default:
              setErrorMessage('Ha ocurrido un error, revisa todos los campos e intenta nuevamente');
              setOpenError(true);
              break;
          }
        } else {
          const login = await Auth.signIn(result.email, '123456789');
          await Auth.completeNewPassword(login, data.password);
          handleNotify(
            'Tu usuario ha sido creado. Ingresa con tus credenciales.'
          );
          setAuthState('LOGIN');
        }
      } catch (err) {
        setErrorMessage('Ha ocurrido un error registrandose. Intenta de nuevo más tarde');
        setOpenError(true);
        console.log(err);
      } finally {
        setOpenLoading(false);
      }
    } else {
      setErrorMessage('Revisa que los campos estén correctos e intenta nuevamente.');
      setOpenError(true);
    }
  };

  return (
    <Container component='main' maxWidth={!isMobile && accountType === 'EMPRESA' ? 'md' : 'xs'}>
      <LoadingBackdrop open={openLoading} />
      <div className={classes.paper}>
        <ErrorSnackbar open={openError} duration={6000} handleClose={handleClose} message={errorMessage} />
        <Avatar className={classes.avatar} src="/images/tm-icon.svg" alt="Logo TradeMate" sx={{ width: 55, height: 55 }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5' className={classes.title} >
          Creación de cuenta
        </Typography>
        <Autocomplete
          noOptionsText="No hay opciones"
          options={['PERSONAL', 'EMPRESA']}
          getOptionLabel={(option) => option}
          fullWidth
          sx={{ mt: '1.8em', mb: '0.5em' }}
          onChange={(event, value) => setAccountType(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              id="identificationType"
              value={accountType || ''}
              label="Tipo de cuenta"
              fullWidth
            />
          )}
        />
        <Stack direction={!isMobile ? 'row' : 'column'} sx={{ width: '100%' }}>
          {accountType === 'EMPRESA' && <Stack sx={{ width: '100%', mr: '2em' }}>
            <Typography variant='h7' className={classes.title} marginTop='0.8em' textAlign='center'>
              Información de la empresa
            </Typography>
            <TextField
              type='text'
              variant='outlined'
              margin='normal'
              fullWidth
              label='Nombre empresa'
              name='companyName'
              autoComplete='nombre'
              error={companyErrors.companyName}
              helperText={companyErrors.companyName ? 'Ingresa un nombre válido' : null}
              autoFocus
              value={companyData.companyName}
              onChange={(event) => handleCompanyChange(event.target.name, event.target.value)}
            />
            <TextField
              type='text'
              variant='outlined'
              margin='normal'
              fullWidth
              label='Identificación empresa'
              name='companyId'
              autoComplete='companyId'
              error={companyErrors.companyId}
              helperText={companyErrors.companyId ? 'Ingresa un Id válido' : null}
              autoFocus
              value={companyData.companyId}
              onChange={(event) => handleCompanyChange(event.target.name, event.target.value)}
            />
            <Autocomplete
              noOptionsText="No hay opciones"
              options={Object.values(countries.countries)}
              getOptionLabel={(option) => option.name}
              fullWidth
              sx={{ mt: '1.2em' }}
              onChange={(event, value) => handleCompanyChange("companyCountry", value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  id="companyCountry"
                  value={companyData.companyCountry ? companyData.companyCountry.name : ''}
                  label="País empresa"
                  fullWidth
                />
              )}
            />
          </Stack>}
          {(accountType === 'PERSONAL' || accountType === 'EMPRESA') && (
            <Stack sx={{ width: '100%' }}>
              {accountType === 'EMPRESA' && (<Typography variant='h7' className={classes.title} marginTop='0.8em' textAlign='center'>
                Representante legal
              </Typography>)}
              <TextField
                type='text'
                variant='outlined'
                margin='normal'
                fullWidth
                label='Nombres'
                name='name'
                autoComplete='names'
                error={errors.name}
                helperText={errors.name ? 'Ingresa un nombre válido' : null}
                autoFocus
                value={data.name}
                onChange={(event) => handleAttributeChange(event.target.name, event.target.value)}
              />
              <TextField
                type='text'
                variant='outlined'
                margin='normal'
                fullWidth
                label='Apellidos'
                name='lastName'
                autoComplete='Apellidos'
                sx={{ mb: '1.8em' }}
                error={errors.lastName}
                helperText={errors.lastName ? 'Ingresa un nombre válido' : null}
                autoFocus
                value={data.lastName}
                onChange={(event) => handleAttributeChange(event.target.name, event.target.value)}
              />
              <Autocomplete
                noOptionsText="No hay opciones"
                options={Object.values(countries.countries)}
                getOptionLabel={(option) => option.name}
                fullWidth
                sx={{ mb: '1.8em' }}
                onChange={(event, value) => handleAttributeChange("country", value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    id="identificationType"
                    value={data.country ? data.country.name : ''}
                    label="País"
                    fullWidth
                  />
                )}
              />
              <Autocomplete
                noOptionsText="No hay opciones"
                options={identificationTypes}
                getOptionLabel={(option) => option.name}
                fullWidth
                onChange={(event, value) => handleAttributeChange("identificationType", value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    id="identificationType"
                    value={data.identificationType || ''}
                    label="Tipo de identificación"
                    fullWidth
                  />
                )}
              />
              <TextField
                type='text'
                variant='outlined'
                margin='normal'
                fullWidth
                sx={{ mt: '1.8em' }}
                label='Identificación'
                name='identification'
                autoComplete='Identificación'
                error={errors.identification}
                helperText={errors.identification ? 'Ingresa un id válido' : null}
                autoFocus
                value={data.identification}
                onChange={(event) => handleAttributeChange(event.target.name, event.target.value)}
              />
              <TextField
                type='email'
                variant='outlined'
                margin='normal'
                fullWidth
                label='Correo electrónico'
                name='email'
                autoComplete='email'
                error={errors.email}
                helperText={errors.email ? 'Ingresa un correo válido' : null}
                autoFocus
                value={data.email}
                onChange={(event) => handleAttributeChange(event.target.name, event.target.value)}
              />
              <TextField
                variant='outlined'
                margin='normal'
                fullWidth
                name='password'
                label='Contraseña'
                type='password'
                id='password'
                value={data.password}
                onChange={(event) => handleAttributeChange(event.target.name, event.target.value)}
                autoComplete='current-password'
              />
              <TextField
                variant='outlined'
                margin='normal'
                fullWidth
                name='confirmPassword'
                label='Confirmar contraseña'
                type='password'
                id='confirmPassword'
                error={errors.confirmPassword}
                helperText={errors.confirmPassword ? 'La contraseña no coincide con la especificada.' : null}
                value={data.confirmPassword}
                onChange={(event) => handleAttributeChange(event.target.name, event.target.value)}
                autoComplete='password'
              />
            </Stack>)}
        </Stack>
        <Button
          fullWidth
          variant='contained'
          color='primary'
          className={classes.submit}
          onClick={signup}
          id='logInButton'>
          Crear cuenta
        </Button>
        <Button
          fullWidth
          color='primary'
          className={classes.forgotPasswordButton}
          onClick={() => setAuthState('LOGIN')}
          id='forgotPasswordButton'>
          Ya tengo una cuenta
        </Button>
      </div>
    </Container>
  );
}

const validators = {
  email: validateEmailInput,
  name: validateAlphabeticInput,
  identification: validateNonEmptyInput,
  password: validateNonEmptyInput,
  lastName: validateAlphabeticInput,
  identificationType: validateNonEmptyInput,
  country: validateNonEmptyInput,
  companyName: validateNonEmptyInput,
  companyId: validateNonEmptyInput,
  companyCountry: validateNonEmptyInput,
};

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.white.main,
    borderRadius: 20,
    padding: '1em 3em'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.white.main,
  },
  title: {
    color: theme.palette.primary.main,
    fontFamily: "Montserrat Bold",
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  forgotPasswordButton: {
    textAlign: 'right'
  }
}));

Signup.propTypes = {
  setAuthState: PropTypes.func,
  handleNotify: PropTypes.func
};
