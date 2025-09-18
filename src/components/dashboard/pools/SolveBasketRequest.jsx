import { AssignmentTurnedIn, Search } from '@mui/icons-material';
import { AppBar, Autocomplete, Card, CardContent, Dialog, Divider, Grid, IconButton, InputAdornment, ListItem, ListItemText, Paper, Slide, TextField, Toolbar, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getApi, postApi } from '../../api/apiManager';
import ErrorSnackbar from '../../common/ErrorSnackbar';
import LoadingBackdrop from '../../common/LoadingBackdrop';
import SuccessSnackbar from '../../common/SuccessSnackbar';
import Close from '@mui/icons-material/Close';
import Colors from '../../../constants/Colors';
import { formatNumber } from '../../../utils';

export default function SolveBasketRequest({open, request, handleClose}) {
  const classes = useStyles();
  const [redoFetch, setRedoFetch] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openSuccess, setOpenSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [ids, setIds] = useState([]);
  const [total, setTotal] = useState(0)
  const [filled, setFilled] = useState(true)
  const [coins, setCoins] = useState([])

  const toggleReDoFetch = () => {
    setRedoFetch(!redoFetch);
  };

  const handleCloseError = () => {
    setOpenError(false);
    setErrorMessage('');
  };

  const handleDeleteCancel = () => {
    setConfirmationOpen(false);
    setSelectedUser(null);
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
    setSuccessMessage('');
  };

  const solveRequest = async () => {
    try{
      setOpenBackdrop(true)
      await postApi('next-activos/createBasketEntries', {entries: ids, transactionId: request.id})
      setSuccessMessage('Se completó el basket.')
      setOpenSuccess(true);
      handleClose()
    } catch(err) {
      setOpenError(true);
      setErrorMessage('No fue posible crear los entries.');
    } finally {
      setOpenBackdrop(false)
    }
  };

  //llamar servicio para obtener el basket de una transacción
  const setBasketEntriesData = () => {
    console.log(request && request.finalCoin && request.finalCoin.basketToken.coins)
    request && request.finalCoin && setIds(request.finalCoin.basketToken.coins.sort((a, b) => a.shortName.localeCompare(b.shortName)).map((e)=> {
      return {
        token: e,
        aditional: false,
        krakenTxId: '',
        price: 0,
        tokenQuantity: 0
      }
    }))
  }

  const retrieveKrakenData = async (index) => {
    try {
      const txID = ids[index].krakenTxId.toUpperCase();
      let response = await postApi('kraken/QueryTrades', {
        txid: txID
      });
      handleAttributeChange(index, 'price', response.result[txID].price)
      handleAttributeChange(index, 'tokenQuantity', response.result[txID].vol)
    }
    catch(e){
      console.log(e);
    }
  }

  const calculateTotal = () => {
    return ids.length > 0 ? (ids.map((id) => id.tokenQuantity * id.price).reduce((a, b) => a + b)) : 0
  }

  const calculateFilled = () => {
    return (ids.filter((id) => id.price == 0 || id.quantity == 0)).length > 0
  }

  const getCoins = async () => {
    let coins =await  getApi('next-activos/getAllCryptos')
    setCoins(coins)
  }

  const addId = () => {
    setIds((previous) => {
      let newObject = [...previous];
      newObject.push({
        token: {},
        aditional: true,
        krakenTxId: '',
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

  const handleAttributeChange = (index, propName, value) => {
    console.log(propName, value, index, 'edit')
    setIds((previous) => {
      let newObject = [...previous];
      newObject[index][propName] = value;
      return newObject
    })
  }

  useEffect(() => {
    setTotal(calculateTotal())
    setFilled(calculateFilled())
  }, [ids])

  useEffect(() => {
    setIds([])
    setBasketEntriesData()
  }, [request])

  useEffect(() => {
    getCoins()
  }, [open])

  return (
    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
      <LoadingBackdrop open={openBackdrop} />
      <ErrorSnackbar open={openError} message={errorMessage} handleClose={handleCloseError} />
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
            Compra de Basket # {request && request.id}
          </Typography>
        </Toolbar>
      </AppBar>
      <Card className={classes.root} sx={{overflow: 'overlay'}}> 
        <CardContent>
          <Grid container>
            {ids.map((row, index) => {
              return (
                <>
                  <Grid item xs={2} key={index} sx={{m: '0.5em 0'}}>
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
                  <Grid item xs={4} sx={{m: '0.5em 0'}}>
                    {row.token.shortName ? 
                    <TextField
                      name="krakenTxId"
                      label={`Kraken Tx Id ${row.token.shortName}`}
                      required
                      size="small"
                      value={row.krakenTxId}
                      onChange={(event) => handleAttributeChange(index, event.target.name, event.target.value)}
                      InputProps={{endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="search kraken id"
                            onClick={() => retrieveKrakenData(index)}
                            edge="end"
                          ><Search />
                          </IconButton>
                        </InputAdornment>)}}
                    /> : 
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
                  <Grid item xs={3} sx={{m: '0.5em 0'}}>
                    <TextField
                      name="tokenQuantity"
                      label="Cantidad"
                      required
                      onChange={(event) => handleAttributeChange(index, event.target.name, event.target.value)}
                      size="small"
                      value={row.tokenQuantity}
                    />
                  </Grid>
                  <Grid item xs={3} sx={{m: '0.5em 0'}}>
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
            <Grid item xs={2}>
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
            <Grid item xs={4}>
              <Button
                color="primary"
                variant="contained"
                disabled={filled}
                id={`solveRequestBtn`}
                onClick={() => {
                  solveRequest()
                }}
              >
                Finalizar
              </Button>
            </Grid>
            <Grid item xs={2}>
              Total:
            </Grid>
            <Grid item xs={4}>
              {`${formatNumber(total.toFixed(2))} ${request.originCoin && request.originCoin.shortName} / ${formatNumber(request.originValue | 0)} ${request.originCoin && request.originCoin.shortName}`}
            </Grid>
          </Grid>

        </CardContent>
      </Card>
    </Dialog>
  )
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  root: {
    width: '100%',
    maxWidth: '100%',
    padding: '1% 3% 8%',
    [theme.breakpoints.down('sm')]: {
      padding: '1% 3% 20%',
      width: '100%'
    }
  },
  container: {
    backgroundColor: Colors.primaryTransparent, 
    borderRadius: '1em',
    margin: '1em',
    boxShadow: 'rgb(74 74 104 / 10%) 2px 2px 2px -5px inset',
    color: Colors.primary
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

SolveBasketRequest.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  request: PropTypes.object
}