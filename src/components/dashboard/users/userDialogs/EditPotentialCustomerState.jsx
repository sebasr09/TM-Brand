import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { putApi } from '../../../api/apiManager';
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
import CloseIcon from '@mui/icons-material/Close';
import ErrorSnackbar from '../../../common/ErrorSnackbar';
import LoadingBackdrop from '../../../common/LoadingBackdrop';

const EditPotentialCustomerState = ({ open, handleClose, user, handleOpenSuccess }) => {

  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openError, setOpenError] = useState(false);
  const [state, setState] = useState(user ? user.state : '');
  const [description, setDescription] = useState(user ? user.description : '');

  const handleCloseError = () => {
    setOpenError(false);
    setErrorMessage('');
  };

  const handleStateUpdate = () => {
    setOpenBackdrop(true);
    putApi('next-activos/updatePotentialCustomerState', {
      id: user.id,
      state: state,
      description: description
    }).then(() => {
      handleOpenSuccess('Estado actualizado exitosamente.')
      handleClose();
    }).catch((err) => {
      console.log(err);
      setErrorMessage('No fue posible actualizar el estado. Intenta de nuevo más tarde.');
      setOpenError(true);
    }).finally(() => setOpenBackdrop(false));
  }

  useEffect(() => {
    setDescription(user ? user.description : '');
    setState(user ? user.state : '')
  }, [user])

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <LoadingBackdrop open={openBackdrop} />
        <ErrorSnackbar open={openError} message={errorMessage} handleClose={handleCloseError} id='errorSnackbar' />
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge='start'
              color='inherit'
              onClick={handleClose}
              aria-label='close'
              id='closeButton'
              size="large">
              <CloseIcon />
            </IconButton>
            <Typography variant='h6' sx={{
              marginLeft: '1em',
              flex: 1
            }}>
              {'Actualizar Estado'}
            </Typography>
          </Toolbar>
        </AppBar>
        <div padding='3%'>
          <Grid container sx={{ marginTop: 1 }}>
            <Grid item xs={12} md={12} sx={{ padding: 1 }}>
              <Card>
                <CardContent>
                  <Grid container sx={{ marginTop: 1 }}>
                    <Grid item xs={12} sm={6} sx={{ padding: 1.5 }}>
                      <Stack>
                        <Typography variant='h6'>
                          Usuario: {user ? user.name : ''}
                        </Typography>
                        <Typography variant='h7' mt='0.5em'>
                          Correo: {user ? user.email : ''}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ padding: 1.5 }}>
                      <Stack>
                        <Typography variant='h6'>
                          Estado Actual: {user ? user.state : ''}
                        </Typography>
                        <Typography variant='h7' mt='0.5em'>
                          Fecha de contacto: {user ? user.contactDate.replace('T', ' ').replace('.000Z', '') : ''}
                        </Typography>
                      </Stack>
                    </Grid>

                    <Grid item xs={12} sm={12} sx={{ padding: 1 }}>
                      <Autocomplete
                        noOptionsText="No hay opciones"
                        options={['CONTACTAR', 'CONTACTADO', 'NEGOCIACIÓN', 'CERRADO', 'RECHAZADO']}
                        getOptionLabel={(option) => option}
                        onChange={(event, value) => setState(value)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            id="commercial"
                            value={state || ''}
                            label="Nuevo Estado"
                            fullWidth
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} sx={{ padding: 1 }}>
                      <TextField
                        rows={4}
                        variant='outlined'
                        margin='normal'
                        label='Descripción'
                        name='Description'
                        autoComplete='Description'
                        autoFocus
                        multiline
                        fullWidth
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              <Grid item xs={12} sx={{
                display: 'flex',
                flexFlow: 'row-reverse',
                padding: 1.5
              }}>
                {

                  (
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={handleStateUpdate}
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
  )
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

EditPotentialCustomerState.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  user: PropTypes.obj,
  handleOpenSuccess: PropTypes.func
};

export default EditPotentialCustomerState;