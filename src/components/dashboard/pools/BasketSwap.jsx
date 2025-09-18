import {
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Button,
  Stack,
  Divider,
  Dialog,
  Slide,
  IconButton,
  TextField,
  Autocomplete,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import CIcon from 'react-crypto-icons';
import Close from '@mui/icons-material/Close';
import LoadingBackdrop from '../../common/LoadingBackdrop';

import React, { useEffect, useState } from 'react';
import { getApi, postApi } from '../../api/apiManager';
import ErrorSnackbar from '../../common/ErrorSnackbar';
import SuccessSnackbar from '../../common/SuccessSnackbar';
import Colors from '../../../constants/Colors';
import { ArrowDownward } from '@mui/icons-material';

export default function BasketSwap({ open, handleClose, basket }) {

  const USD_COP = 3800;

  const classes = useStyles();

  const [errorMessage, setErrorMessage] = useState('');
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [enabledButton, setEnabledButton] = useState(true);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [ids, setIds] = useState([]);
  const [idsSell, setIdsSell] = useState([]);
  const [coins, setCoins] = useState([])
  const [dataSell, setDataSell] = useState({
    token: {},
    price: 0,
    tokenQuantity: 0
  })

  //Api Calls
  const masiveBasketSell = async () => {
    try {
        setOpenBackdrop(true)
        console.log({ buyedTokens: ids, basket: basket.token.id, selledToken: dataSell })
        await postApi('next-activos/masiveBasketSell', { buyedTokens: ids, basket: basket.token.id, selledToken: dataSell })
        setSuccessMessage('Se completó el cambio de tokens.')
        setOpenSuccess(true);
        handleClose()
    } catch (err) {
        setOpenError(true);
        setErrorMessage('No fue posible cambiar los tokens.');
    } finally {
        setOpenBackdrop(false)
    }
};

  useEffect(() => {
    getCoins()
  }, [open]);

  const handleCloseError = () => {
    setOpenError(false);
    setErrorMessage('');
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
    setSuccessMessage('');
  };

  useEffect(() => {
    setIds([{
      token: {},
      aditional: true,
      price: 0,
      tokenQuantity: 0
    }]);
    removeIdSell()
    setBasketEntriesData()
    setEnabledButton(true)
  }, [basket])

  const getCoins = async () => {
    let coins = await getApi('next-activos/getAllCryptos')
    setCoins(coins)
  }

  const addId = () => {
    setIds((previous) => {
      let newObject = [...previous];
      newObject.push({
        token: {},
        aditional: true,
        price: 0,
        tokenQuantity: 0
      })
      return newObject
    })
  }

  const removeId = (index) => {
    setIds((previous) => {
      let newObject = [...previous];
      newObject.splice(index, 1)
      return newObject
    })
  }

  const removeIdSell = () => {
    setDataSell({
      token: {},
      price: 0,
      tokenQuantity: 0
    })
  }

  const enableButton = () => {
    return (dataSell.price == 0 || dataSell.tokenQuantity == 0) || (ids.filter((id) => id.price == 0 || id.quantity == 0)).length > 0;
  }

  const handleAttributeChange = (index, propName, value) => {
    console.log(propName, value, index, 'edit')
    setIds((previous) => {
      let newObject = [...previous];
      newObject[index][propName] = value;
      return newObject
    })
    setEnabledButton(enableButton())
  }

  const handleAttributeChange2 = (propName, value) => {
    setDataSell((previous) => {
      let newObject = { ...previous };
      newObject[propName] = value;
      return newObject
    })
    setEnabledButton(enableButton())
  }

  const setBasketEntriesData = () => {
    basket && basket.coins && setIdsSell(basket.coins)
  }

  return (
    <Dialog open={open} onClose={handleClose} TransitionComponent={Transition} keepMounted>
      <LoadingBackdrop open={openBackdrop} />
      <ErrorSnackbar open={openError} message={errorMessage} handleClose={handleCloseError} id='errorSnackbar' />
      <SuccessSnackbar
        open={openSuccess}
        message={successMessage}
        handleClose={handleCloseSuccess}
        id='successSnackbar'
      />
      <Card>
        <CardContent>
          <Stack>
            <Typography variant='h5' color={Colors.primary}>
              <strong>Swap</strong>
            </Typography>
            <Typography variant='body2' color={Colors.primary}>
              Intercambia tus activos digitales al instante.
            </Typography>
          </Stack>
          <Divider />
          <Grid container marginTop="1em">
            <Grid item xs={2} sx={{ m: '0.5em 0' }}>
              {
                <IconButton
                  aria-label="search kraken id"
                  onClick={() => removeIdSell()}
                  edge="end"
                ><Close />
                </IconButton>

              }
            </Grid>
            <Grid item xs={4} sx={{ m: '0.5em 0' }}>
              {dataSell.token.shortName ?
                <>
                  <Typography >
                    <CIcon
                      name={dataSell.token.shortName.toLowerCase()}
                      size={17}
                    />
                    {dataSell.token.shortName}
                  </Typography>
                </> :
                <Autocomplete
                  required
                  name="token"
                  noOptionsText="No hay opciones"
                  size="small"
                  options={idsSell}
                  getOptionLabel={(option) => option.shortName}
                  onChange={(event, value) => handleAttributeChange2("token", value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      name="token"
                      id="token"
                      size="small"
                      value={dataSell.token}
                      label="Seleccione el activo a usar"
                    />
                  )}
                />
              }
            </Grid>
            <Grid item xs={3} sx={{ m: '0.5em 0' }}>
              <TextField
                name="tokenQuantity"
                label="Cantidad"
                required
                onChange={(event) => handleAttributeChange2(event.target.name, event.target.value)}
                size="small"
                value={dataSell.tokenQuantity}
              />
            </Grid>
            <Grid item xs={3} sx={{ m: '0.5em 0' }}>
              <TextField
                name="price"
                label="Precio"
                required
                onChange={(event) => handleAttributeChange2(event.target.name, event.target.value)}
                size="small"
                value={dataSell.price}
              />
            </Grid>
          </Grid>

          <Stack direction='row' justifyContent='center' color={Colors.primary}>
            <ArrowDownward />
          </Stack>
          <Grid container marginTop="1em">
            {ids.map((row, index) => {
              return (
                <>
                  <Grid item xs={2} key={index} sx={{ m: '0.5em 0' }}>
                    {row.aditional ?
                      <IconButton
                        aria-label="search kraken id"
                        onClick={() => removeId(index)}
                        edge="end"
                      ><Close />
                      </IconButton>
                      : <Typography>
                        {row.token.shortName}
                      </Typography>
                    }
                  </Grid>
                  <Grid item xs={4} sx={{ m: '0.5em 0' }}>
                    {row.token.shortName ?
                      <>
                        <Typography >
                          <CIcon
                            name={row.token.shortName.toLowerCase()}
                            size={17}
                          />
                          {row.token.shortName}
                        </Typography>
                      </> :
                      <Autocomplete
                        required
                        name="token"
                        noOptionsText="No hay opciones"
                        size="small"
                        options={coins}
                        getOptionLabel={(option) => option.shortName}
                        onChange={(event, value) => handleAttributeChange(index, "token", value)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            required
                            name="token"
                            id="token"
                            size="small"
                            value={row.token}
                            label="Seleccione el activo a usar"
                          />
                        )}
                      />
                    }
                  </Grid>
                  <Grid item xs={3} sx={{ m: '0.5em 0' }}>
                    <TextField
                      name="tokenQuantity"
                      label="Cantidad"
                      required
                      onChange={(event) => handleAttributeChange(index, event.target.name, event.target.value)}
                      size="small"
                      value={row.tokenQuantity}
                    />
                  </Grid>
                  <Grid item xs={3} sx={{ m: '0.5em 0' }}>
                    <TextField
                      name="price"
                      label="Precio"
                      required
                      onChange={(event) => handleAttributeChange(index, event.target.name, event.target.value)}
                      size="small"
                      value={row.price}
                    />
                  </Grid>
                </>
              )
            })}
            <Grid item margin={'0.5em'}>
              <Button
                color="primary"
                variant="contained"
                id={`addIdtBtn`}
                onClick={() => {
                  addId()
                }}
              >
                Añadir
              </Button>
            </Grid>
          </Grid>
          <Button
            disabled={enabledButton}
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={() => {
              masiveBasketSell()
            }}
            id='buyButton'
          >
            Comprar
          </Button>
        </CardContent>
      </Card>

    </Dialog>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    padding: '1% 3% 8%',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  appBar: {
    position: 'relative'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  container: {
    display: 'flex',
    justifyContent: 'left'
  },
  progress: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(1)
  },
  centerContainer: {
    margin: '1em auto'
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

BasketSwap.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  basket: PropTypes.object
};