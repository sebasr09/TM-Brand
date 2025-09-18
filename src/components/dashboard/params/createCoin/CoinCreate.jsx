import {
  AppBar,
  Card,
  CardContent,
  Dialog,
  Grid,
  IconButton,
  Slide,
  TextField,
  Toolbar,
  Typography,
  Button,
  Checkbox, 
  FormControlLabel
} from '@mui/material';
import React, { useEffect, useState , useCallback } from 'react';
import { postApi } from '../../../api/apiManager';
import CloseIcon from '@mui/icons-material/Close';
import ErrorSnackbar from '../../../common/ErrorSnackbar';
import PropTypes from 'prop-types';
import SuccessSnackbar from '../../../common/SuccessSnackbar';
import { makeStyles } from '@mui/styles';


export default function CountryCreate({ open, handleModifyClose, isEdit, setInformationMessage, setOpenInformation}) {
  
  
  const classes = useStyles();

  const [userData, setUserData] = useState({
    name:'',
    code:'',
    is_digital_asset: false
  });
  const [dataErrors, setDataErrors] = useState({
    name: false,
    email: false,
    organization: false,
    kycPlan: false,
    carlaidPlan: false,
    contractsPlan: false,
    roles: false
  });

  const requiredFields = 2;
  const [errorMessage, setErrorMessage] = useState('');
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  //Disable the Autocompletes for companies

  const [completedFields, setCompletedFields] = useState(0);

  const updateCompletedFieldCount = useCallback(() => {
    let completed = 0;
    if (userData.name) completed++;
    if (userData.code) completed++;
    setCompletedFields(completed);
  }, [userData]);

  useEffect(() => {
    updateCompletedFieldCount();
  }, [updateCompletedFieldCount])

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
  }; 

  const createCountry = async () => {
    try{
      let body = {
        "name": userData.name,
        "short_name": userData.code,
        "is_digital_asset": userData.is_digital_asset
      }
      const response = await postApi(`activos/createCoin`, body);
      setInformationMessage(`País creado, id: ${response.result.id}`);
      setOpenInformation(true);
      handleClose();
    }
    catch(e){
      setErrorMessage("Error creando la moneda.");
      setOpenError(true);
    }
  }

  const handleDigitalAsset = () => {
    setUserData((previous) => {
      const newObject = { ...previous };
      newObject.is_digital_asset = !previous.is_digital_asset
      return newObject;
    });
  }

  const handleClose = () => {
    setDataErrors({
      name: false,
      email: false,
      organization: false,
      kycPlan: false,
      carlaidPlan: false,
      contractsPlan: false,
      roles: false
    });
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

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
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
              Crear moneda
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={styles.userInfoCardContainer}>
          <Card>
            <CardContent>
              <Grid container style={styles.formContainer}>
                <Grid item xs={12} md={6} style={styles.standardInput}>
                    <TextField
                      id="name"
                      inputProps={{ inputMode: 'text'}}
                      name="name"
                      label="Nombre"
                      fullWidth
                      autoComplete="off"
                      helperText={dataErrors.name && 'Revisa el nombre'}
                      error={dataErrors.name}
                      value={userData.name || ''}
                      onChange={(event) => handleAttributeChange("name", event.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={6} style={styles.standardInput}>
                    <TextField
                      id="code"
                      inputProps={{ inputMode: 'text'}}
                      name="code"
                      label="Código"
                      fullWidth
                      autoComplete="off"
                      helperText={dataErrors.code && 'Revisa el código'}
                      error={dataErrors.code}
                      value={userData.code || ''}
                      onChange={(event) => handleAttributeChange("code", event.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={6} style={styles.standardInput}>
                  <FormControlLabel
                  control={
                    <Checkbox
                      checked={userData.is_digital_asset}
                      onChange={handleDigitalAsset}
                      name="Es cativo digital"
                      color="primary"
                    />
                  }
                  label="Es activo digital"
                />
                </Grid>
              </Grid>
              <Grid container style={styles.formContainer}>
                <Grid item xs={10} style={styles.createUserButtonContainer}>
                  {
                  isEdit ? '' : (
                  completedFields == requiredFields ? (
                    <Button
                    variant='contained' 
                    color='primary' 
                    onClick={ createCountry }
                  >
                    Crear moneda
                  </Button>
                  ) : 
                  <Typography className={classes.progress}>
                      {`${completedFields} de ${requiredFields} campos completos`}
                  </Typography>)}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
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
  },
  progress: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(1)
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

CountryCreate.propTypes = {
  open: PropTypes.bool,
  handleModifyClose: PropTypes.func,
  user: PropTypes.object,
  isEdit: PropTypes.bool,
  userInfo: PropTypes.object, 
  setInformationMessage: PropTypes.func, 
  setOpenInformation: PropTypes.func, 
  request: PropTypes.object
};
