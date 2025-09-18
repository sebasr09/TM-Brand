import React, { useState } from 'react';
import { validateEmailInput, validateNumericInput, validatePasswordInput } from '../../controllers/validators';

import Alert from '@mui/lab/Alert';
import { Auth } from 'aws-amplify';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LoadingBackdrop from '../common/LoadingBackdrop';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PropTypes from 'prop-types';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

const validations = {
  email: validateEmailInput,
  password: validatePasswordInput,
  code: validateNumericInput
};

export default function ForgotPassword({ setAuthState, triggerSessionValidation }) {
  const classes = useStyles();
  const [data, setData] = useState({ email: '', password: '', code: '' });
  const [error, setError] = useState({ email: false, password: false, code: false });
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openLoading, setOpenLoading] = useState(false);
  const [verify, setVerify] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenError(false);
  };

  const resetErrors = () => {
    setError((previous) => {
      const newObject = { ...previous };
      for (let key in newObject) {
        newObject[key] = false;
      }
      return newObject;
    });
  };

  const existingErrors = () => {
    let exists = false;
    for (let key in error) {
      exists = exists || error[key];
    }
    return exists;
  };

  const forgotPassword = async () => {
    if (!existingErrors()) {
      try {
        setOpenLoading(true);
        await Auth.forgotPassword(data.email);
        resetErrors();
        setVerify(true);
      } catch (err) {
        if (err.code === 'UserNotFoundException') {
          setErrorMessage('El usuario especificado no existe.');
          setOpenError(true);
        } else if (err.code === 'NotAuthorizedException') {
          setErrorMessage(
            'El usuario no ha sido verificado. Ingresa por primera vez con las credenciales que te llegaron al correo.'
          );
          setOpenError(true);
        } else if (err.code === 'LimitExceededException') {
          setErrorMessage('La cantidad de intentos fue excedida, intenta de nuevo más tarde.');
          setOpenError(true);
        }
        console.log(err);
      } finally {
        setOpenLoading(false);
      }
    } else {
      setErrorMessage('Revisa que los campos estén correctos e intenta nuevamente.');
      setOpenError(true);
    }
  };

  const verifyCode = async () => {
    if (!existingErrors()) {
      try {
        setOpenLoading(true);
        await Auth.forgotPasswordSubmit(data.email, data.code, data.password);
        await Auth.signIn(data.email, data.password);
        triggerSessionValidation();
      } catch (err) {
        if (err.code === 'CodeMismatchException') {
          setErrorMessage('El código especificado es incorrecto.');
          setOpenError(true);
        }
        console.log(err);
      } finally {
        setOpenLoading(false);
      }
    } else {
      setErrorMessage('Revisa que los campos estén correctos e intenta nuevamente.');
      setOpenError(true);
    }
  };

  const handleInput = (name, value) => {
    setData((previous) => {
      const newObject = { ...previous };
      newObject[name] = value;
      return newObject;
    });
    setError((previous) => {
      const newObject = { ...previous };
      newObject[name] = !validations[name](value);
      return newObject;
    });
  };

  return (
    <Container component='main' maxWidth='xs'>
      <LoadingBackdrop open={openLoading} />
      <div className={classes.paper}>
        <Snackbar open={openError} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity='error'>
            {errorMessage}
          </Alert>
        </Snackbar>
        <Avatar className={classes.avatar} src= "/images/tm-icon.svg" alt= "Logo TradeMate" sx={{width: 55, height: 55}}>
        </Avatar>
        <Typography className={classes.title} component='h1' variant='h5'>
          Recuperar contraseña
        </Typography>
        {verify && (
          <React.Fragment>
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              required
              name='code'
              label='Código de Verificación'
              type='number'
              id='code'
              error={error.code}
              helperText={error.code ? 'Este campo solo debe tener números' : null}
              value={data.code}
              onChange={(event) => handleInput(event.target.name, event.target.value)}
              autoComplete='code'
            />
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              required
              name='password'
              label='Nueva Contraseña'
              type='password'
              id='password'
              error={error.password}
              helperText={error.password ? 'Debe tener por lo menos 8 caracteres, 1 mayúscula y 1 número' : null}
              value={data.password}
              onChange={(event) => handleInput(event.target.name, event.target.value)}
              autoComplete='new-password'
            />
          </React.Fragment>
        )}
        {!verify && (
          <TextField
            variant='outlined'
            margin='normal'
            sx={{width: 300}}
            required
            name='email'
            label='Correo Electrónico'
            type='email'
            id='email'
            error={error.email}
            helperText={error.email ? 'El correo electrónico ingresado no es válido.' : null}
            value={data.email}
            onChange={(event) => handleInput(event.target.name, event.target.value)}
            autoComplete='email'
          />
        )}
        <Button
          variant='contained'
          color='third'
          className={classes.submit}
          onClick={() => {
            return verify ? verifyCode() : forgotPassword();
          }}
          id='submitButton'>
          {verify ? 'Recuperar Cuenta' : 'Enviar Correo'}
        </Button>
        <Button
          fullWidth
          color='primary'
          className={classes.toLoginButton}
          onClick={() => setAuthState('LOGIN')}
          id='forgotPasswordButton'>
          Volver a inicio de sesión
        </Button>
      </div>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20
  },
  avatar: {
    margin: theme.spacing(3),
    backgroundColor: theme.palette.white.main
  },
  title: {
    color: theme.palette.primary.main,
    fontFamily: "Nexa Bold Regular",
    margin: theme.spacing(0,0,3),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    fontSize: 15,
    width: 310,
    height: 50,
    borderRadius: 22,
    fontFamily: "Montserrat Bold"
  },
  toLoginButton: {
    textAlign: 'right',
    fontSize: 10,
    margin: theme.spacing(0, 0, 2),
    fontFamily: "Montserrat Light"
  }
}));

ForgotPassword.propTypes = {
  setAuthState: PropTypes.func,
  triggerSessionValidation: PropTypes.func
};
