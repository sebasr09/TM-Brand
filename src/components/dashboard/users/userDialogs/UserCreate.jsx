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
} from '@mui/material';
import Autocomplete from '@mui/lab/Autocomplete';
import React, { useEffect, useState , useCallback } from 'react';
import { getApi, postApi, putApi } from '../../../api/apiManager';
import {
  validateAlphabeticInput,
  validateEmailInput,
  validateNumericInput
} from '../../../../controllers/validators';

import CloseIcon from '@mui/icons-material/Close';
import ErrorSnackbar from '../../../common/ErrorSnackbar';
import LoadingBackdrop from '../../../common/LoadingBackdrop';
import PropTypes from 'prop-types';
import SuccessSnackbar from '../../../common/SuccessSnackbar';
import { makeStyles } from '@mui/styles';

export default function UserCreate({ open, handleModifyClose, user, isEdit }) {

  const classes = useStyles();

  const [userData, setUserData] = useState({
    name: '',
    lastName: '',
    email: '',
    identification: '',
    identificationType: '',
    country: '',   
    carlaid: '',
    kycid: '',
    lastLoginDate: '',
    userStateId: '',
    userState: ''
  });

  const [dataErrors, setDataErrors] = useState({
    name: false,
    lastName: false,
    email: false,
    identification: false,
    identificationType: false,
    country: false
  });

  const requiredFields = 6;
  const [identificationTypes, setIdentificationTypes] = useState([]);
  const [countries, setCountries] = useState([]);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [completedFields, setCompletedFields] = useState(0);

  const updateCompletedFieldCount = useCallback(() => {
    let completed = 0;
    if (userData.email) completed++;
    if (userData.name) completed++;
    if (userData.lastName) completed++;
    if (userData.country) completed++;
    if (userData.identification) completed++;
    if (userData.identificationType) completed++;
    setCompletedFields(completed);
  }, [userData]);

  useEffect(() => {
    updateCompletedFieldCount();
  }, [updateCompletedFieldCount])

  const existErrors = () => {
    let error = false;
    for (let key in dataErrors) {
      if (dataErrors[key]) {
        error = true;
        break;
      }
    }
    return error;
  };

  const handleUserCreate = async () => {
    if (existErrors()) {
      setErrorMessage('Revisa que los campos sean correctos e intenta nuevamente.');
      setOpenError(true);
    } else {
      setOpenBackdrop(true);
      try {
        userData.userStateId = 1;
        userData.identificationTypeId=userData.identificationType.id;
        let body = {
          "name": userData.name,
          "lastName": userData.lastName,
          "identificationTypeId":userData.identificationType.id,
          "identification": userData.identification,
          "email": userData.email
        }
        
        await postApi('next-activos/createUser', body);
        setOpenSuccess(true);
        setSuccessMessage(`El usuario se creó exitosamente`);
        handleClose();
      } catch (err) {
        console.log(err);
        setErrorMessage('No fue posible crear un nuevo usuario. Intenta de nuevo más tarde.');
        setOpenError(true);
      } finally {
        setOpenBackdrop(false);
      }
    }
  };

  const handleUserEdit = async () => {
    if (existErrors()) {
      setErrorMessage('Revisa que los campos sean correctos e intenta nuevamente.');
      setOpenError(true);
    } else {
      setOpenBackdrop(true);
      try {
        await putApi(`next-activos/updateUser/${user.id}`, { ...userData});
        setOpenSuccess(true);
        setSuccessMessage(`El usuario se editó exitosamente`);
      } catch (err) {
        console.log(err);
        setErrorMessage('No fue posible editar el usuario. Intenta de nuevo más tarde.');
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

  const handleAttributeChange = (name, value) => {
    setUserData((previous) => {
      const newObject = { ...previous };
      newObject[name] = value;
      return newObject;
    });
    setDataErrors((previous) => {
      const newObject = { ...previous };
      if(newObject[name] && validators[name])
        newObject[name] = !validators[name](value);
      return newObject;
    });
  };

  const handleClose = () => {
    setUserData((previous) => {
      const newObject = { ...previous };
      for (let key in newObject) {
        if (key === 'roles') newObject[key] = [];
        else newObject[key] = '';
      }
      return newObject;
    });
    handleModifyClose();
  };

  //Api Calls
  const getIdentificationTypes = async () => {
    try{
      let response = await getApi(`next-activos/getIdentificationTypes`);
      return response;
    }
    catch(e){
      setErrorMessage('Error consultando la abse de datos.');
      setOpenError(true);
    }
  };

  const getFilteredIDTypes = () => {
    return userData.country? identificationTypes.filter((id) => id.countryId == null || id.countryId == userData.country.id) : identificationTypes;
  }

  const getParams = async () => {
    try {
      const countries = await getApi(`next-activos/getAllCountries`);
      setCountries(countries);
    } catch (err) {
      setErrorMessage('No fue posible cargar la información de la base de datos.');
    }
  };

  useEffect(() => {
    isEdit &&
      user &&
      
      setUserData((previous) => {
        const newObject = { ...previous };
        for (let key in user) {
          if (key in newObject) {
            newObject[key] = user[key];
          }
        }
        return newObject;
      });
  }, [user]);

  useEffect(() => {
    const initParams = async () => {
      await getParams();
      const identifications = await getIdentificationTypes();
      setIdentificationTypes(identifications);
    };
    open && identificationTypes.length === 0 && initParams();
  }, [open]);
  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
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
              onClick={handleClose}
              aria-label='close'
              id='closeButton'
              size="large">
              <CloseIcon />
            </IconButton>
            <Typography variant='h6' className={classes.title}>
              {isEdit ? 'Editar usuario' : 'Nuevo usuario'}
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={styles.userInfoCardContainer}>
          <Grid container style={styles.formContainer}>
            <Grid item xs={12} md={12} style={styles.standardInput}>
              <Card>
                <CardContent>
                  <Grid container style={styles.formContainer}>
                    <Grid item xs={12} md={6} style={styles.standardInput}>
                      <TextField
                        id='name'
                        name='name'
                        label='Nombres'
                        fullWidth
                        disabled={isEdit}
                        type='text'
                        autoComplete='name'
                        helperText={dataErrors.name && 'El nombre no puede estar vacío y debe contener solo letras'}
                        error={dataErrors.name}
                        value={userData.name || ''}
                        onChange={(event) => handleAttributeChange(event.target.name, event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} style={styles.standardInput}>
                      <TextField
                        id='lastName'
                        name='lastName'
                        label='Apellidos'
                        fullWidth
                        disabled={isEdit}
                        type='text'
                        autoComplete='lastName'
                        helperText={dataErrors.lastName && 'El apellido no puede estar vacío y debe contener solo letras'}
                        error={dataErrors.lastName}
                        value={userData.lastName || ''}
                        onChange={(event) => handleAttributeChange(event.target.name, event.target.value)}
                      />
                    </Grid>
                    {!isEdit && (
                    <>
                      <Grid item xs={12} sm={6} style={styles.standardInput}>
                        <Autocomplete
                          noOptionsText="No hay opciones"
                          options={countries}
                          disabled={isEdit}
                          getOptionLabel={(option) => option.name}
                          onChange={(event, value) => handleAttributeChange("country", value)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              id="country"
                              value={userData.country || ''}
                              label="Pais"
                              fullWidth
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} style={styles.standardInput}>
                        <Autocomplete
                          noOptionsText="No hay opciones"
                          options={getFilteredIDTypes()}
                          disabled={isEdit}
                          getOptionLabel={(option) => option.name}
                          onChange={(event, value) => handleAttributeChange("identificationType", value)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              id="identificationType"
                              value={userData.identificationType || ''}
                              label="Tipo de identificación"
                              fullWidth
                            />
                          )}
                        />
                      </Grid>
                    </>
                    )}
                    {isEdit && (
                    <>
                      <Grid item xs={12} sm={6} style={styles.standardInput}>
                        <TextField
                          id="country"
                          value={userData.identificationType.country && userData.identificationType.country.name || ''}
                          label="Pais"
                          fullWidth
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} style={styles.standardInput}>
                        <TextField
                          id="identificationType"
                          value={userData.identificationType.name}
                          label="Tipo de identificación"
                          fullWidth
                          disabled
                        />
                      </Grid>
                    </>
                    )}
                    <Grid item xs={12} md={6} style={styles.standardInput}>
                      <TextField
                        id="identification"
                        name="identification"
                        label='Identificación'
                        type="number"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        required
                        fullWidth
                        disabled={isEdit}
                        helperText={dataErrors.identification && 'Revisa que sea un número válido'}
                        error={dataErrors.identification}
                        value={userData.identification || ''}
                        onChange={(event) => handleAttributeChange(event.target.name, event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} style={styles.standardInput}>
                      <TextField
                        id='email'
                        name='email'
                        label='Correo electrónico'
                        fullWidth
                        type='email'
                        autoComplete='email'
                        helperText={dataErrors.email && 'El correo es inválido'}
                        error={dataErrors.email}
                        value={userData.email || ''}
                        onChange={(event) => handleAttributeChange(event.target.name, event.target.value)}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              <Grid item xs={12} style={styles.createUserButtonContainer}>
              {
                  isEdit ? '' : (
                  completedFields == requiredFields ? (
                    <Button
                    variant='contained' 
                    color='primary' 
                    onClick={isEdit ? handleUserEdit : handleUserCreate}
                  >
                    {isEdit ? 'Guardar cambios' : 'Crear'}
                  </Button>
                  ) : 
                  <Typography className={classes.progress}>
                      {`${completedFields} de ${requiredFields} campos completos`}
                  </Typography>)}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Dialog>
    </div>
  );
}

const validators = {
  name: validateAlphabeticInput,
  lastName: validateAlphabeticInput,
  email: validateEmailInput,
  identification: validateNumericInput
};

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

UserCreate.propTypes = {
  open: PropTypes.bool,
  handleModifyClose: PropTypes.func,
  user: PropTypes.object,
  isEdit: PropTypes.bool
};