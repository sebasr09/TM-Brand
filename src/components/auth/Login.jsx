import React, { useState } from 'react';

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
import { getApi } from '../api/apiManager';
import Terms from './Terms';

const validateEmailInput = (input) => {
  return /^([A-Za-z0-9\-_]+\.?)+@[A-Za-z0-9]+\.([A-Za-z]+\.?)+$/.test(input);
};

export default function Login({ triggerSessionValidation, setAuthState, setLocalUser, setUserInfo }) {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openWarning, setOpenWarning] = useState(false);
  const [openLoading, setOpenLoading] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);
  const [user, setUser] = useState({});

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenError(false);
    setOpenWarning(false);
  };
  
  const handleCloseTerms = () => {
    setOpenTerms(false);
    findUserByEmail()
  }

  const findUserByEmail = async () => {
    const result = await getApi(`next-activos/findUserByEmail/${email}`);
    setUserInfo(result);
    setUser(result);
    if(result.acceptedTerms) {
      window.localStorage.setItem('user-info', JSON.stringify(result));
      triggerSessionValidation();
    } else {
      console.log(user)
      setOpenTerms(true)
    }
  }

  const login = async () => {
    try {
      setOpenLoading(true);
      const result = await Auth.signIn(email, password);
      setLocalUser(result);
      if (result.challengeName === 'NEW_PASSWORD_REQUIRED' || result.challengeName === 'RESET_REQUIRED') setAuthState('CHANGE_PASSWORD');
      else {
        await findUserByEmail()
      }
    } catch (err) {
      switch (err.code) {
        case 'NotAuthorizedException':
          setErrorMessage('Las credenciales son incorrectas, intenta de nuevo.');
          setOpenError(true);
          break;
        case 'UserNotFoundException':
          setErrorMessage('El usuario especificado no existe.');
          setOpenError(true);
          break;
        case 'UserNotConfirmedException':
          setErrorMessage('Verifica tu cuenta antes de iniciar sesión.');
          setOpenError(true);
          break;
        default:
          break;
      }
      console.log(err);
    } finally {
      setOpenLoading(false);
    }
  };

  const handleEmail = (event) => {
    const error = !validateEmailInput(event.target.value);
    setEmailError(error);
    setEmail(event.target.value);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <LoadingBackdrop open={openLoading} />
      <Terms open={openTerms} user={user} handleClose={handleCloseTerms}/>
      <div className={classes.paper}>
        <Snackbar open={openError} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity='error'>
            {errorMessage}
          </Alert>
        </Snackbar>
        <Snackbar open={openWarning} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity='warning'>
            Ingresa un correo válido y tu contraseña
          </Alert>
        </Snackbar>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Inicio de Sesión
        </Typography>
        <TextField
          type='email'
          variant='outlined'
          margin='normal'
          fullWidth
          label='Correo electrónico'
          name='email'
          autoComplete='email'
          error={emailError}
          helperText={emailError ? 'Ingresa un correo válido' : null}
          autoFocus
          value={email}
          onChange={handleEmail}
        />
        <TextField
          variant='outlined'
          margin='normal'
          fullWidth
          name='password'
          label='Contraseña'
          type='password'
          id='password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete='current-password'
        />
        <Button
          fullWidth
          color='primary'
          className={classes.forgotPasswordButton}
          onClick={() => setAuthState('FORGOT_PASSWORD')}
          id='forgotPasswordButton'>
          Olvidé mi contraseña
        </Button>
        <Button
          fullWidth
          variant='contained'
          color='primary'
          className={classes.submit}
          onClick={() => {
            return !emailError && login();
          }}
          id='logInButton'>
          Ingresar
        </Button>
        <Button
          fullWidth
          variant='outlined'
          color='primary'
          className={classes.createAccount}
          onClick={() => setAuthState('SIGNUP')}
          id='signupButton'>
          Crear una cuenta
        </Button>
      </div>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  createAccount: {
    margin: theme.spacing(0, 0, 2)
  },
  forgotPasswordButton: {
    textAlign: 'right'
  }
}));

Login.propTypes = {
  triggerSessionValidation: PropTypes.func,
  setAuthState: PropTypes.func,
  setLocalUser: PropTypes.func,
  setUserInfo: PropTypes.func
};
