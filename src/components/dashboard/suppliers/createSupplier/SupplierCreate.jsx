import {
  AppBar,
  Button,
  Card,
  CardContent,
  Dialog,
  Divider,
  Grid,
  IconButton,
  Slide,
  TextField,
  Toolbar,
  Typography,
  Checkbox, 
  FormControlLabel
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

import Autocomplete from '@mui/lab/Autocomplete';
import React, { useEffect, useState } from 'react';
import { getApi, postApi, putApi } from '../../../api/apiManager';
import { getCarlaApi } from '../../../api/apiManagerCarla';
import {
  validateAlphabeticInput,
  validateEmailInput,
  validateNonEmptyInput,
  validateNumericInput
} from '../../../../controllers/validators';

import CloseIcon from '@mui/icons-material/Close';
import ErrorSnackbar from '../../../common/ErrorSnackbar';
import LoadingBackdrop from '../../../common/LoadingBackdrop';
import PropTypes from 'prop-types';
import SuccessSnackbar from '../../../common/SuccessSnackbar';
import { makeStyles } from '@mui/styles';
import Carla from '../../../common/Carla';
import CompanyCreate from '../../params/createCompany/CompanyCreate';
export default function SupplierCreate({ open, handleModifyClose, user, isEdit }) {
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
  const [companyData, setCompanyData] = useState({
    id: '',
    name: '',
    country : '',
    type: ''
  });
  const [dataErrors, setDataErrors] = useState({
    name: false,
    email: false,
    identification: false
  });
  const [identificationTypes, setIdentificationTypes] = useState([]);
  const [countries, setCountries] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [carlaDetail, setCarlaDetail]= useState('');
  const [userStates, setUserStates]= useState([]);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openCreateCompany, setOpenCreateCompany] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isCompany, setIsCompany] = useState(false);

  const existErrors = () => {
    for (let key in dataErrors) {
      if (dataErrors[key]) return true;
    }
    let error = false;
    for (let key in userData) {
      if (key in validators) error = error || !validators[key](userData[key]);
    }
    if(isCompany) (error = error || validateNonEmptyInput(companyData.id));
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
        if(isCompany) userData.company = companyData;
        await postApi('activos/createSupplier', { ...userData});
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
        await putApi(`activos/updateUser/${user.id}`, { ...userData});
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

  const handleModifyCloseCompany = (company) => {
    setOpenCreateCompany(false);
    setCompanyData(company);
    getAllCompanies()
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
    setCarlaDetail('');
    setUserData('');
    setIsCompany(false);

    handleModifyClose();
  };

  //Api Calls
  const getIdentificationTypes = async () => {
    try{
      let response = await getApi(`activos/getIdentificationTypes`);
      return response;
    }
    catch(e){
      setErrorMessage('Error consultando la abse de datos.');
      setOpenError(true);
    }
  };

  const getUserStates = async () => {
    try{
      let response = await getApi(`activos/getUserStates`);
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
      const data = await getApi(`activos/params`);
      const countries = data.countries;
      setCountries(countries);
    } catch (err) {
      setErrorMessage('No fue posible cargar la información de la base de datos.');
    }
  };

  const getAllCompanies = async function (){
    try{
      const data = await getApi(`activos/getAllCompanies`);
      setCompanies(data)
    }
    catch(e){
      setErrorMessage("Error consultando la base de datos, intente mas tarde");
      setOpenError(true)
    }
  };

  const getCarlaTxInfo = async (transactionId) => {
    try{
      let result = await getCarlaApi(`carlaid/transaction/`+transactionId);
      return result;
    } catch (err) {
      setErrorMessage('No fue posible cargar la información de la base de datos.');
    }
  };

  useEffect(() => {
    const getCarla = async () => {
      const carla = await getCarlaTxInfo(user.carlaid);
      setCarlaDetail(carla);
    };

    isEdit &&
      user &&
      getCarla() &&
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
      await getAllCompanies()
      const identifications = await getIdentificationTypes();
      setIdentificationTypes(identifications);
      const userStates = await getUserStates();
      setUserStates(userStates);
    };
    open && identificationTypes && identificationTypes.length === 0 && initParams();
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
        <CompanyCreate open={openCreateCompany} handleModifyClose={handleModifyCloseCompany} setInformationMessage={setSuccessMessage} setOpenInformation={setOpenSuccess} />
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
            <Grid item xs={12} md={8} style={styles.standardInput}>
              <Card>
                <CardContent>
                  <Grid container style={styles.formContainer}>
                    <Grid item xs={12} md={12}>
                      {!isEdit &&
                      <>
                        <Grid item xs={12} md={6} style={styles.standardInput}>
                          <FormControlLabel
                            control={<Checkbox />}
                            checked={isCompany}
                            disabled={userData.id}
                            onClick={()=>{setIsCompany(!isCompany)}}
                            label="Es Empresa"
                          />
                        </Grid>
                        { isCompany &&
                      <>
                        <Grid item xs={12} md={6} style={styles.standardInput}>
                          <Autocomplete
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            required
                            defaultValue={isEdit ? companyData : ''}
                            noOptionsText="No hay opciones"
                            options={companies}
                            disabled={userData.id}
                            getOptionLabel={(option) => option.name}
                            onChange={(event, value) => setCompanyData(value)}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                required
                                id="sendingCompanies"
                                value={companyData || ''}
                                label="Empresa que envia"
                                fullWidth
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} md={6} style={styles.standardInput}>
                          <Button
                            color='primary'
                            variant='contained'
                            className={classes.createButton}
                            startIcon={<AddIcon />}
                            disabled={userData.id}
                            onClick={() => setOpenCreateCompany(true)}
                            id='company'>
                            Crear Empresa
                          </Button>
                        </Grid>
                        <Grid item xs={12} md={6} style={styles.standardInput}>
                          <Typography variant='h6'>
                            Representante Legal:
                          </Typography>
                        </Grid>
                      </>
                      }
                      </>
                    }
                    </Grid>
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
                          value={userData.identificationType && userData.identificationType.country && userData.identificationType.country.name || ''}
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
                <Button variant='contained' color='primary' onClick={isEdit ? handleUserEdit : handleUserCreate} disabled={!isEdit && userData.carlaid && userData.carlaid.length <= 1}>
                  {isEdit ? 'Guardar Cambios' : 'Crear Usuario'}
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4} style={styles.standardInput}>
              <Card>
                <AppBar className={classes.appBar}>
                  <Toolbar>
                    <Typography variant='h6' className={classes.title}>
                      Estado: <strong>{userData.carlaid? userData.userState.name : 'Pendiente por Enviar Link'}</strong>
                    </Typography>
                  </Toolbar>
                </AppBar>
                <CardContent>
                  <Typography variant="subtitle1">
                    CarlaId: <strong>{userData.carlaid?userData.carlaid : 'Pendiente por Enviar Link'}</strong>
                  </Typography>
                  <Typography variant="subtitle1">
                    Estado: <strong>{carlaDetail ? carlaDetail.status : ''}</strong>
                  </Typography>
                  <Typography variant="subtitle1">
                    Generado: <strong>{carlaDetail ? carlaDetail.issueDate.slice(0, 19).replace(/-/g, "/").replace("T", " "): ''}</strong>
                  </Typography>
                  {userData.identification && userData.identificationType &&
                    <Carla
                      userData={userData}
                      setUserData={setUserData}
                      saveUser={handleUserEdit}
                      createUser={handleUserCreate}
                      />
                  }
                  <Divider />
                  <Typography variant="subtitle1">
                    Ultima conexión: <strong>{userData.lastLoginDate && userData.lastLoginDate.slice(0, 19).replace(/-/g, "/").replace("T", " ")}</strong>
                  </Typography>
                  <Autocomplete
                    noOptionsText="No hay opciones"
                    options={userStates}
                    disabled={!isEdit}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, value) => handleAttributeChange("userState", value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        id="userState"
                        value={userData.userState || ''}
                        label="Estado"
                        fullWidth
                      />
                    )}
                  />
                </CardContent>
              </Card>
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

SupplierCreate.propTypes = {
  open: PropTypes.bool,
  handleModifyClose: PropTypes.func,
  user: PropTypes.object,
  isEdit: PropTypes.bool
};
