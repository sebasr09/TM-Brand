import React, { useState, useEffect } from 'react';
import { Dialog, Card, CardContent, ToggleButton, Button, Slide, ToggleButtonGroup, Divider, TextField, InputAdornment, Autocomplete, Grid, Stack, Typography, IconButton } from '@mui/material';
import PropTypes from 'prop-types'
import { binancePostApi } from '../../../api/apiManager'
import { LockOpenOutlined, LockOutlined } from '@mui/icons-material';
import ErrorSnackbar from '../../../common/ErrorSnackbar';
import LoadingBackdrop from '../../../common/LoadingBackdrop';
import SpotOrderConfirmation from './SpotOrderConfirmation';

const SpotOrderDialog = ({ openDialog, closeDialog, tokens, success, account }) => {

  const [data, setData] = useState({
    unidades: '',
    precio: '',
    total: '',
    par: '',
    stop: ''
  });
  const [side, setSide] = useState('BUY');
  const [type, setType] = useState('MARKET');
  const [percentage, setPercentage] = useState('');
  const [pairs, setPairs] = useState([]);
  const [baseAsset, setBaseAsset] = useState('');
  const [quoteAsset, setQuoteAsset] = useState('');
  const [stepSize, setStepSize] = useState('');
  const [lock, setLock] = useState(false);
  const [error, setError] = useState('');

  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openError, setOpenError] = useState(false);

  const [info, setInfo] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  const closeConfirmation = () => {
    setOpenConfirm(false);
    setOpenBackdrop(false);
  }


  const handleAttributeChange = (name, value) => {
    setData((previous) => {
      const newObject = { ...previous };
      newObject[name] = value;
      return newObject;
    });
    if (name === 'par' && (value === null)) {
      resetData()
    }
    else if (name === 'unidades' && !lock) {
      setPercentage('')
    }
    else if (name === 'total' && lock) {
      setPercentage('')
    }
  };

  const handleSide = (event, newSide) => {
    if (newSide !== null) {
      setSide(newSide);
    }
  };

  const handleType = (event, newType) => {
    if (newType !== null) {
      setType(newType);
    }
  };

  const handlePercentage = (event, newPercentage) => {
    setPercentage(newPercentage)
    if (newPercentage !== null && newPercentage !== '') {
      if (baseAsset && !lock) {
        setData((previous) => {
          const newObject = { ...previous };
          newObject['unidades'] = (tokens.find((token) => token.asset === baseAsset)?.free || 0) * newPercentage / 100;
          return newObject;
        })
      } else if (quoteAsset && lock) {
        setData((previous) => {
          const newObject = { ...previous };
          newObject['total'] = (tokens.find((token) => token.asset === quoteAsset)?.free || 0) * newPercentage / 100;
          return newObject;
        })
      }
    }
  };

  const checkErrors = () => {
    if (data.par === '' || data.par === null) {
      setError('El campo de par a operar no puede estar vacío.')
      return false;
    }
    if (type === 'LIMIT') {
      if (data.precio === '' || data.precio === null || data.precio === undefined) {
        setError('El campo de precio no puede estar vacío.')
        return false;
      }
    }
    else if (type === 'STOP_LOSS_LIMIT') {
      if (data.precio === '' || data.precio === null || data.precio === undefined) {
        setError('El campo de precio no puede estar vacío.')
        return false;
      }
      else if (data.stop === '' || data.stop === null || data.stop === undefined) {
        setError('El campo de stop no puede estar vacío.')
        return false;
      }
    }
    if (lock) {
      if (data.total === '' || data.total === null) {
        setError('El campo de total no puede estar vacío.')
        return false;
      }
    }
    else {
      if (data.unidades === '' || data.unidades === null) {
        setError('El campo de unidades no puede estar vacío.')
        return false;
      }
    }
    return true;
  }

  const handlePlaceOrder = () => {
    if (checkErrors()) {
      setOpenBackdrop(true);
      setError('');
      let options = {};
      if (type === 'LIMIT') {
        options.price = data.precio;
        options.timeInForce = 'GTC';
      }
      else if (type === 'STOP_LOSS_LIMIT') {
        options.price = data.precio;
        options.stopPrice = data.stop;
        options.timeInForce = 'GTC';
      }
      if (lock) {
        if (type === 'LIMIT') {
          options.quantity = roundUnits(data.total / data.precio).toFixed(8).toString()
        }
        else if (type === 'STOP_LOSS_LIMIT') {
          options.quantity = roundUnits(data.total / data.stop).toFixed(8).toString()
        } else {
          options.quoteOrderQty = Number(data.total).toFixed(8).toString()
        }
      }
      else {
        options.quantity = roundUnits(Number(data.unidades)).toFixed(8).toString()
      }
      const body = {
        symbol: data.par.symbol,
        side: side,
        type: type,
        options: options,
        base: baseAsset,
        quote: quoteAsset,
        account: account
      }
      let infor = body;
      infor.price = data.par.price;
      setInfo(infor);
      setOpenConfirm(true)
    }
  }

  const handleConfirmation = (body) => {
    setOpenConfirm(false);
    binancePostApi('next-activos/placeNewSpotOrder', body)
      .then(response => {
        console.log(response)
        success(`La orden se envió correctamente.
          Client order ID: ${response.clientOrderId}.
          Order ID: ${response.orderId}.
          Symbol: ${response.symbol}. 
          Side: ${response.side}.
          Type: ${response.type}.
          Status: ${response.status}.
          OrigQty: ${response.origQty}.
          ExecutedQty: ${response.executedQty}.
          CummulativeQuoteQty: ${response.cummulativeQuoteQty}.
          Price (LIMIT): ${response.price}.
          `);
        closeDialog()
      })
      .catch((error) => {
        console.log(error.message);
        setErrorMessage(error.message);
        setOpenError(true);
      })
      .finally(() => setOpenBackdrop(false))
  }

  const resetData = () => {
    setData({
      unidades: '',
      precio: '',
      total: '',
      par: '',
      stop: ''
    });
    setBaseAsset('');
    setQuoteAsset('');
    setStepSize('');
    setSide('BUY');
    setType('MARKET');
    setPercentage('');
    setError('');
    setInfo(null);
  }

  useEffect(() => {
    resetData()
    binancePostApi('next-activos/getTickerPrices', { symbols: [], account: account !== 'ALL' ? account : 'TM' }).then((response) => setPairs(response)).catch((error) => {
      console.log(error);
      setErrorMessage('No se pudo obtener los pares.');
      setOpenError(true);
    })
  }, [openDialog])

  useEffect(() => {
    if (data.par === '' || data.par === null) {
      setBaseAsset('');
      setQuoteAsset('');
      setStepSize('');
    } else {
      fetch(`https://api.binance.com/api/v3/exchangeInfo?symbol=${data.par.symbol}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json, text/plain, */*',
        }
      })
        .then((response) => response.json())
        .then((json) => {
          const assets = json.symbols[0];
          setBaseAsset(assets.baseAsset);
          setQuoteAsset(assets.quoteAsset);
          setStepSize(assets.filters.find((el) => el.filterType === 'LOT_SIZE').stepSize);
        })
        .catch((err) => {
          console.log(err);
          setErrorMessage('No se pudo obtener la información del par.');
          setOpenError(true);
        })
    }
  }, [data.par])

  const handleCloseError = () => {
    setOpenError(false);
    setErrorMessage('');
  };

  const roundUnits = (quantity) => {
    const point = stepSize.indexOf('.')
    const one = stepSize.indexOf('1')
    const quantityString = quantity.toString();
    const quantityPoint = quantityString.indexOf('.');
    if (quantityPoint === -1) return quantity;
    if (point < one) {
      return Number(quantityString.slice(0, quantityPoint + one))
    } else {
      return Number(quantityString.slice(0, quantityPoint + point))
    }
  }

  return (
    <Dialog
      open={openDialog}
      onClose={closeDialog}
      TransitionComponent={Transition}
    >
      <LoadingBackdrop open={openBackdrop} />
      <ErrorSnackbar open={openError} message={errorMessage} handleClose={handleCloseError} id='errorSnackbar' />
      <Card sx={{}}>
        <CardContent sx={{}}>
          <Typography variant='h6' ml='0.2em'>
            Cuenta: <strong>{account}</strong>
          </Typography>
          <Grid container m='0.5em 0'>
            <Grid item xs={6}>
              <Autocomplete
                noOptionsText="No hay opciones"
                options={pairs}
                getOptionLabel={(option) => option.symbol}
                onChange={(event, value) => handleAttributeChange("par", value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    id="pair"
                    value={data.par || ''}
                    label="Par a operar"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={5}>
              <ToggleButtonGroup
                value={side}
                exclusive
                onChange={handleSide}
                aria-label="order side"
                fullWidth
              >
                <ToggleButton value="BUY" aria-label="BUY">
                  BUY
                </ToggleButton>
                <ToggleButton value="SELL" aria-label="SELL">
                  SELL
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          </Grid>
          <Stack direction='row' justifyContent='space-between' m='0.5em'>
            <Typography variant='h6'>
              {baseAsset && tokens ? (tokens.find((token) => token.asset === baseAsset)?.free || 0) + ' ' + baseAsset : ''}
            </Typography>
            <Typography variant='h6'>
              {data.par ? data.par.price : ''}
            </Typography>
            <Typography variant='h6'>
              {quoteAsset && tokens ? (tokens.find((token) => token.asset === quoteAsset)?.free || 0) + ' ' + quoteAsset : ''}
            </Typography>
          </Stack>
          <Divider />

          <TextField
            id='unidades'
            name='unidades'
            label='Unidades'
            fullWidth
            type='number'
            autoComplete='unidades'
            value={lock ? (roundUnits(data.total / (type === 'LIMIT' && data.precio ? data.precio : type === 'STOP_LOSS_LIMIT' && data.stop ? data.stop : data.par.price)) || '') : (roundUnits(data.unidades) || '')}
            onChange={(event) => handleAttributeChange(event.target.name, roundUnits(event.target.value))}
            sx={{ m: '1em 0' }}
            InputProps={{
              endAdornment: <InputAdornment position="end"><IconButton onClick={() => setLock(!lock)}>{lock ? <LockOutlined /> : <LockOpenOutlined />}</IconButton>{baseAsset}</InputAdornment>,
            }}
          />
          <ToggleButtonGroup
            value={type}
            exclusive
            onChange={handleType}
            aria-label="order type"
            fullWidth
          >
            <ToggleButton value="MARKET" aria-label="MARKET">
              MARKET
            </ToggleButton>
            <ToggleButton value="LIMIT" aria-label="LIMIT">
              LIMIT
            </ToggleButton>
            <ToggleButton value="STOP_LOSS_LIMIT" aria-label="STOP_LIMIT">
              STOP_LIMIT
            </ToggleButton>
          </ToggleButtonGroup>
          {type !== 'MARKET' && <TextField
            id='precio'
            name='precio'
            label='Precio LIMIT'
            fullWidth
            type='number'
            autoComplete='precio'
            value={data.precio || ''}
            onChange={(event) => handleAttributeChange(event.target.name, event.target.value)}
            sx={{ mt: '1em' }}
            InputProps={{
              endAdornment: <InputAdornment position="end">{quoteAsset}</InputAdornment>,
            }}
          />}
          {type === 'STOP_LOSS_LIMIT' && <TextField
            id='stop_precio'
            name='stop'
            label='Precio STOP'
            fullWidth
            type='number'
            autoComplete='stop'
            value={data.stop || ''}
            onChange={(event) => handleAttributeChange(event.target.name, event.target.value)}
            sx={{ mt: '1em' }}
            InputProps={{
              endAdornment: <InputAdornment position="end">{quoteAsset}</InputAdornment>,
            }}
          />}
          <TextField
            id='total'
            name='total'
            label='Total'
            fullWidth
            type='number'
            autoComplete='total'
            value={!lock ? (data.unidades * (type === 'LIMIT' && data.precio ? data.precio : type === 'STOP_LOSS_LIMIT' && data.stop ? data.stop : data.par.price) || '') : (data.total || '')}
            onChange={(event) => handleAttributeChange(event.target.name, event.target.value)}
            sx={{ m: '1em 0' }}
            InputProps={{
              endAdornment: <InputAdornment position="end">{quoteAsset}</InputAdornment>,
            }}
          />
          <ToggleButtonGroup
            value={percentage}
            exclusive
            onChange={handlePercentage}
            aria-label="total percentage"
            fullWidth
          >
            <ToggleButton value="5" aria-label="5%">
              5%
            </ToggleButton>
            <ToggleButton value="10" aria-label="10%">
              10%
            </ToggleButton>
            <ToggleButton value="25" aria-label="25%">
              25%
            </ToggleButton>
            <ToggleButton value="50" aria-label="50%">
              50%
            </ToggleButton>
            <ToggleButton value="100" aria-label="100%">
              100%
            </ToggleButton>
          </ToggleButtonGroup>
          <Button color='third'
            variant='contained'
            onClick={() => { handlePlaceOrder() }}
            id='place-sportOrder'
            sx={{ m: '1em 0 0 0' }}
            fullWidth>
            Place Order
          </Button>
          <Typography variant='h7' sx={{ color: 'red', mt: '0.5em' }}>
            {error}
          </Typography>
        </CardContent>
      </Card>
      <SpotOrderConfirmation openDialog={openConfirm} closeDialog={closeConfirmation} info={info} handleConfirmation={handleConfirmation} />
    </Dialog>
  )
}

SpotOrderDialog.propTypes = {
  openDialog: PropTypes.bool,
  closeDialog: PropTypes.func,
  tokens: PropTypes.array,
  success: PropTypes.func,
  account: PropTypes.string
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default SpotOrderDialog;