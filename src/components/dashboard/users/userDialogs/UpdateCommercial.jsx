import {
  AppBar,
  Button,
  Card,
  CardContent,
  Dialog,
  Grid,
  IconButton,
  Slide,
  TextField,
  Toolbar,
  Typography,
  Stack
} from '@mui/material';
import Autocomplete from '@mui/lab/Autocomplete';
import React, { useEffect, useState, useCallback } from 'react';
import { getApi, postApi, putApi } from '../../../api/apiManager';

import CloseIcon from '@mui/icons-material/Close';
import ErrorSnackbar from '../../../common/ErrorSnackbar';
import LoadingBackdrop from '../../../common/LoadingBackdrop';
import PropTypes from 'prop-types';
import SuccessSnackbar from '../../../common/SuccessSnackbar';
import { makeStyles } from '@mui/styles';

export default function UpdateCommercial({ open, handleModifyClose, user }) {

  const classes = useStyles();

  const [userData, setUserData] = useState(null);
  const [prevCommercial, setPrevCommercial] = useState(null);
  const [commercials, setCommercials] = useState([]);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleCommercialUpdate = async () => {
    if (userData === null) {
      setErrorMessage('Selecciona una opción para actualizar.');
      setOpenError(true);
    } else {
      setOpenBackdrop(true);
      try {
        await putApi(`next-activos/updateCommercial/${user.id}`, { commercialId: userData.id });
        setOpenSuccess(true);
        setSuccessMessage(`El comercial se actualizó exitosamente`);
        handleModifyClose();
      } catch (err) {
        console.log(err);
        setErrorMessage('No fue posible actualizar el comercial. Intenta de nuevo más tarde.');
        setOpenError(true);
      } finally {
        setOpenBackdrop(false);
      }
    }
  };

  const handleCloseError = () => {
    setOpenError(false);
    setErrorMessage('');
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
    setSuccessMessage('');
  };


  //Api Calls

  useEffect(() => {

    const getCommercials = async () => {
      getApi(`next-activos/getAllLlc`)
        .then(response => setCommercials([{ id: -1, name: 'No', lastName: 'asignar' }].concat(response)))
        .catch(err => console.log(err))
    }

    const getCommercialFromUser = async () => {
      getApi(`next-activos/getCommercialFromUser/${user.id}`)
        .then(response => setPrevCommercial(response))
        .catch(err => console.log(err))
    }

    user && getCommercialFromUser();
    user && getCommercials();
  }, [open])

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleModifyClose} TransitionComponent={Transition}>
        <LoadingBackdrop open={openBackdrop} />
        <ErrorSnackbar open={openError} message={errorMessage} handleClose={handleCloseError} id='errorSnackbar' />
        <SuccessSnackbar
          open={openSuccess}
          message={successMessage}
          handleClose={handleCloseSuccess}
          id='successSnackbar'
        />
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge='start'
              color='inherit'
              onClick={handleModifyClose}
              aria-label='close'
              id='closeButton'
              size="large">
              <CloseIcon />
            </IconButton>
            <Typography variant='h6' className={classes.title}>
              {'Actualizar Comercial'}
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={styles.userInfoCardContainer}>
          <Grid container style={styles.formContainer}>
            <Grid item xs={12} md={12} style={styles.standardInput}>
              <Card>
                <CardContent>
                  <Grid container style={styles.formContainer}>
                    <Grid item xs={12} sm={6} style={styles.typos}>
                      <Stack>
                        <Typography variant='h6'>
                          Usuario: {user ? user.name + ' ' + user.lastName : ''}
                        </Typography>
                        <Typography variant='h7' mt='0.5em'>
                          Correo: {user ? user.email : ''}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6} style={styles.typos}>
                      <Stack>
                        <Typography variant='h6'>
                          Comercial Actual: {prevCommercial ? prevCommercial.name + ' ' + prevCommercial.lastName : 'No asignado.'}
                        </Typography>
                        <Typography variant='h7' mt='0.5em'>
                          Correo: {prevCommercial ? prevCommercial.email : ''}
                        </Typography>
                      </Stack>
                    </Grid>

                    <Grid item xs={12} sm={12} style={styles.standardInput}>
                      <Autocomplete
                        noOptionsText="No hay opciones"
                        options={commercials}
                        getOptionLabel={(option) => option.name + ' ' + option.lastName}
                        onChange={(event, value) => setUserData(value)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            id="commercial"
                            value={userData || ''}
                            label="Nuevo Comercial"
                            fullWidth
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              <Grid item xs={12} style={styles.createUserButtonContainer}>
                {

                  (
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={handleCommercialUpdate}
                    >
                      {'Actualizar'}
                    </Button>
                  )}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Dialog>
    </div>
  );
}

const styles = {
  userInfoCardContainer: {
    padding: '3%'
  },
  formContainer: {
    marginTop: 10
  },
  standardInput: {
    padding: 10
  },
  typos: {
    padding: 15
  },
  roleSelectContainer: {
    padding: 10,
    display: 'flex',
    flexDirection: 'column'
  },
  roleSelectInput: {
    marginTop: 'auto'
  },
  roleChipsContainer: {},
  createUserButtonContainer: {
    display: 'flex',
    flexFlow: 'row-reverse',
    padding: 15
  }
};

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

UpdateCommercial.propTypes = {
  open: PropTypes.bool,
  handleModifyClose: PropTypes.func,
  user: PropTypes.obj
};