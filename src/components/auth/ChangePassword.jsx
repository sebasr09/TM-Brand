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
import { validatePasswordInput } from '../../controllers/validators';

export default function ChangePassword({ triggerSessionValidation, localUser, setAuthState }) {
  const classes = useStyles();
  const [data, setData] = useState({ password: '', confirmPassword: '' });
  const [error, setError] = useState({ password: false, confirmPassword: false });
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openLoading, setOpenLoading] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenError(false);
  };

  const existingErrors = () => {
    let exists = false;
    for (let key in error) {
      exists = exists || error[key];
    }
    return exists;
  };

  const updateData = async () => {
    if (!existingErrors()) {
      try {
        setOpenLoading(true);
        await Auth.completeNewPassword(localUser, data.password);
        setAuthState('LOGIN');
      } catch (err) {
        setErrorMessage('Revisa que los campos estén correctos e intenta nuevamente.');
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

  const handleInput = (name, value) => {
    setData((previous) => {
      const newObject = { ...previous };
      newObject[name] = value;
      return newObject;
    });
    setError((previous) => {
      const newObject = { ...previous };
      let error = false;
      if (name === 'password') error = !validatePasswordInput(value);
      else if (name === 'confirmPassword') error = value !== data.password;
      newObject[name] = error;
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
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5' className={classes.title}>
          Actualizar Contraseña
        </Typography>
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
        <TextField
          variant='outlined'
          margin='normal'
          fullWidth
          required
          name='confirmPassword'
          label='Confirmar Nueva Contraseña'
          type='password'
          id='confirmPassword'
          error={error.confirmPassword}
          helperText={error.confirmPassword ? 'La contraseña no coincide con la especificada.' : null}
          value={data.confirmPassword}
          onChange={(event) => handleInput(event.target.name, event.target.value)}
          autoComplete='password'
        />
        <Button
          fullWidth
          variant='contained'
          color='primary'
          className={classes.submit}
          onClick={() => {
            return updateData();
          }}
          id='submitButton'>
          Enviar
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
    backgroundColor: theme.palette.white.main,
    borderRadius: 20
  },
  avatar: {
    margin: theme.spacing(3),
    backgroundColor: theme.palette.white.main 
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
    fontSize: 15,
    width: 310,
    height: 50,
    borderRadius: 22,
    fontFamily: "Montserrat Bold"
  },
  title: {
    color: theme.palette.primary.main,
    fontFamily: "Nexa Bold Regular",
    margin: theme.spacing(0,0,3),
  },
}));

ChangePassword.propTypes = {
  triggerSessionValidation: PropTypes.func,
  localUser: PropTypes.object,
  setAuthState: PropTypes.func,
};
