import { Close } from "@mui/icons-material";
import { AppBar, Autocomplete, Button, Card, CardContent, Dialog, Grid, IconButton, Slide, TextField, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getApi, postApi } from "../../api/apiManager";
import ErrorSnackbar from "../../common/ErrorSnackbar";
import LoadingBackdrop from "../../common/LoadingBackdrop";
import SuccessSnackbar from "../../common/SuccessSnackbar";
import PropTypes from 'prop-types';
import { makeStyles } from "@mui/styles";
import CurrencyFormat from "../../common/CurrencyFormat";

export default function BasketRequestCreate({open, user, handleClose }) {
  
  const classes = useStyles();

  const [userData, setUserData] = useState({
    user: '',
    basket: '',
    type: '',
    amount: 0,
    units: 0,
    price: 0
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const [users, setUsers] = useState([])
  const [baskets, setBaskets] = useState([])
  const [coins, setCoins] = useState([])

  const getBaskets = async () => {
    try {
      setBaskets(await getApi('next-activos/getAllBaskets'))
    } catch(err) {
      setErrorMessage('No fue posible cargar la información de la base de datos.');
      setOpenError(true)
    }
  };

  const getUsers = async () => {
    try {
      setUsers(await getApi('next-activos/getAllUsers'))
    } catch(err) {
      setErrorMessage('No fue posible cargar la información de la base de datos.');
      setOpenError(true)
    }
  };

  /* const getCoins = async () => {
    try {
      setCoins(await getApi('next-activos/getAllCoins'))
    } catch(err) {
      setErrorMessage('No fue posible cargar la información de la base de datos.');
      setOpenError(true)
    }
  }; */

  const handleRequestCreate = async() => {
    setOpenBackdrop(true)
    try {
      let body = {
        "user": userData.user,
        "entryQuantity": Number(userData.amount),
        "basket":userData.basket.token,
        "tokenUnits": Number(userData.units),
        "price": Number(userData.price),
        "type": userData.type
      }
      await postApi('next-activos/createUserTransaction', body)
      setOpenSuccess(true);
      setSuccessMessage(`El request se creó exitosamente`);
      handleClose();
    } catch (err) {
      console.log(err);
      setErrorMessage('No fue posible crear el request. Intenta de nuevo más tarde.');
      setOpenError(true);
    } finally {
      setOpenBackdrop(false);
      setOpenSuccess(false);
      setOpenError(false);
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
    console.log(name, value)
    setUserData((previous) => {
      const newObject = { ...previous };
      newObject[name] = value;
      return newObject;
    });
  };

  useEffect(() => {
    setUserData((previous) => {
      const newObject = { ...previous };
      for (let key in newObject) {
        newObject[key] = '';
      }
      return newObject;
    });
    const init = async () => {
      await getBaskets();
      await getUsers();
    };
    open && baskets.length === 0 || users.length === 0 && init();
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
              <Close />
            </IconButton>
            <Typography variant='h6' className={classes.title}>
              Nuevo Basket Request
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={styles.userInfoCardContainer}>
          <Grid container style={styles.formContainer}>
            <Grid item xs={12} md={12} style={styles.standardInput}>
              <Card>
                <CardContent>
                  <Grid container style={styles.formContainer}>
                    <Grid item xs={12} sm={6} style={styles.standardInput}>
                      <Autocomplete
                        noOptionsText="No hay opciones"
                        options={users}
                        getOptionLabel={(option) => option.name + ' ' + option.lastName}
                        onChange={(event, value) => handleAttributeChange("user", value)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            id="user"
                            value={userData.user || ''}
                            label="Usuario"
                            fullWidth
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} style={styles.standardInput}>
                      <Autocomplete
                        noOptionsText="No hay opciones"
                        options={baskets}
                        getOptionLabel={(option) => option.name}
                        onChange={(event, value) => handleAttributeChange("basket", value)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            id="basket"
                            value={userData.basket || ''}
                            label="Basket"
                            fullWidth
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} style={styles.standardInput}>
                    <TextField
                        id="amount"
                        name="amount"
                        label='Inversión'
                        type='number'
                        fullWidth
                        value={userData.amount || ''}
                        onChange={(event) => handleAttributeChange('amount', event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} style={styles.standardInput}>
                      <TextField
                        id="units"
                        name="units"
                        label='Unidades'
                        type='number'
                        fullWidth
                        value={userData.units || ''}
                        onChange={(event) => handleAttributeChange('units', event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} style={styles.standardInput}>
                      <TextField
                        id="price"
                        name="price"
                        label='Precio'
                        type='number'
                        fullWidth
                        value={userData.price || ''}
                        onChange={(event) => handleAttributeChange('price', event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} style={styles.standardInput}>
                      <Autocomplete
                        noOptionsText="No hay opciones"
                        options={["BUY", "SELL"]}
                        getOptionLabel={(option) => option}
                        onChange={(event, value) => handleAttributeChange("type", value)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            id="type"
                            value={userData.type || ''}
                            label="Tipo"
                            fullWidth
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              <Grid item xs={12} style={styles.createUserButtonContainer}>
                <Button
                  variant='contained' 
                  color='primary' 
                  onClick={handleRequestCreate}
                  > Crear
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Dialog>
    </div>
  )
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
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

BasketRequestCreate.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  user: PropTypes.object,
};