import React, { useState, useEffect } from 'react';
import { Paper, Pagination, Box, Grid, TableSortLabel, TextField, Autocomplete, Divider, Stack, Typography, IconButton, Button } from '@mui/material';
import { getApi, binancePostApi } from '../../api/apiManager';
import SpotOrder from './SpotOrder';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Sync } from '@mui/icons-material';
import SuccessSnackbar from '../../common/SuccessSnackbar';
import ErrorSnackbar from '../../common/ErrorSnackbar';
import LoadingBackdrop from '../../common/LoadingBackdrop';

const SpotHistory = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [initialDate, setInitialDate] = useState(null);
  const [finalDate, setFinalDate] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState({
    symbol: [],
    side: '',
    type: '',
    status: []
  });
  const [pairs, setPairs] = useState([]);
  const [redoFetch, setRedoFetch] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openError, setOpenError] = useState(false);
  const [reset, setReset] = useState(false);
  const [account, setAccount] = useState('ALL');

  const headCells = [
    { id: 'id', label: 'Id' },
    { id: 'symbol', label: 'Par' },
    { id: 'updateTime', label: 'Fecha ejecución' },
    { id: 'origQty', label: 'Posición Inicial' },
    { id: 'transactTime', label: 'Status / Fecha creación' },
    { id: 'executedQty', label: 'Posición Final' },
  ];


  useEffect(() => {
    setOpenBackdrop(true);
    getApi(`next-activos/getAllSpotTransactions/${account}`)
      .then((response) => setOrders(response))
      .catch((error) => {
        console.log(error)
        getApi(`next-activos/getAllSpotTransactions/${account}`)
          .then((response) => setOrders(response));
      }).finally(() => setOpenBackdrop(false));
  }, [redoFetch, account])

  useEffect(() => {
    binancePostApi('next-activos/getTickerPrices', { symbols: [], account: 'TM' }).then((response) => setPairs(response.map((el) => { return el.symbol }))).catch((error) => {
      console.log(error);
      setErrorMessage('No se pudo obtener los pares.');
      setOpenError(true);
    })
  }, [])

  useEffect(() => {
    setFilteredData(orders.filter((order) => {
      if (initialDate && order.transactTime < initialDate) {
        return false
      }
      if (finalDate && order.updateTime && order.updateTime > finalDate) {
        return false
      }
      if (data.symbol.length > 0 && !data.symbol.includes(order.symbol)) {
        return false
      }
      if (data.type && data.type !== order.type) {
        return false
      }
      if (data.side && data.side !== order.side) {
        return false
      }
      if (data.status.length > 0 && !data.status.includes(order.status)) {
        return false
      }
      return true;
    }))
    setPage(1)
  }, [data, initialDate, finalDate, orders])

  const resetFilters = () => {
    setData({
      symbol: [],
      side: '',
      type: '',
      status: []
    });
    setInitialDate(null);
    setFinalDate(null);
    setReset(!reset);
  }

  const toggleReDoFetch = () => {
    setRedoFetch(!redoFetch);
  };

  const handlePageChange = (event, value) => {
    setPage(value)
  }

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const onRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleInitialDateChange = (value) => {
    if (value) {
      setInitialDate(new Date(value.getFullYear(), value.getMonth(), value.getDate()));
    } else {
      setInitialDate(value)
    }
  };

  const handleFinalDateChange = (value) => {
    if (value) {
      setFinalDate(new Date(value.getFullYear(), value.getMonth(), value.getDate(), 23, 59, 59));
    } else {
      setFinalDate(value)
    }
  };

  const handleAttributeChange = (name, value) => {
    setData((previous) => {
      const newObject = { ...previous };
      newObject[name] = value;
      return newObject;
    });
  };

  const cancelOrder = (order) => {
    setOpenBackdrop(true);
    const body = {
      symbol: order.symbol,
      id: order.id,
      options: {
        orderId: order.orderId
      },
      account: order.account
    }
    binancePostApi('next-activos/cancelOpenOrder', body)
      .then((response) => {
        setSuccessMessage(`Orden #${response.orderId} fue cancelada correctamente.`);
        setOpenSuccess(true);
      }).catch((error) => {
        console.log(error)
        setErrorMessage(error.message);
        setOpenError(true);
      }).finally(() => {
        setOpenBackdrop(false);
        toggleReDoFetch()
      });
  }

  const checkLimitOrders = () => {
    setOpenBackdrop(true);
    getApi('next-activos/checkLimitOrders')
      .then((response) => {
        setSuccessMessage(`${response.length} ordenes actualizadas.`);
        setOpenSuccess(true);
      })
      .catch((err) => {
        console.log(error)
        setErrorMessage('Hubo un error actualizando las ordenes. Intenta de nuevo más tarde.');
        setOpenError(true);
      }).finally(() => {
        setOpenBackdrop(false);
        toggleReDoFetch()
      });
  }

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
    setSuccessMessage('');
  };

  const handleCloseError = () => {
    setOpenError(false);
    setErrorMessage('');
  };


  return (
    <Paper sx={{ width: '100%', marginBottom: '2em', justifyContent: 'center', minWidth: 1100, bgcolor: theme => theme.palette.lightgray.main }}>
      <SuccessSnackbar
        open={openSuccess}
        message={successMessage}
        handleClose={handleCloseSuccess}
        id='successSnackbar'
      />
      <LoadingBackdrop open={openBackdrop} />
      <ErrorSnackbar open={openError} message={errorMessage} handleClose={handleCloseError} id='errorSnackbar' />
      <Grid container p='1em'>
        <Grid item xs={5}>
          <Typography variant='h4'>
            {<strong>Historial: {account}</strong>}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Autocomplete
            noOptionsText="No hay opciones"
            options={['ALL', 'TM', 'BTC', 'OTC', 'TEST']}
            getOptionLabel={(option) => option}
            onChange={(event, value) => value ? setAccount(value) : ''}
            renderInput={(params) => (
              <TextField
                {...params}
                id="account"
                value={account || ''}
                label="Cuenta"
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={4} textAlign='right'>
          <Button color='lightgray'
            variant='contained'
            onClick={() => { checkLimitOrders() }}
            id='open-sportOrder'
            sx={{ mr: '2em', width: 150 }}>
            Actualizar Limits
          </Button>
          <Button color='lightgray'
            variant='contained'
            onClick={() => { resetFilters() }}
            id='open-sportOrder'
            sx={{ mr: '2em', width: 150 }}>
            Quitar Filtros
          </Button>
          <IconButton
            onClick={toggleReDoFetch}
            sx={{
              marginRight: '1%',
              padding: 1.5,
              backgroundColor: (theme) => theme.palette.white.main,
              transition: '0.2s',
              '&:hover': {
                background: (theme) => theme.palette.secondary.main,
              },
            }}
            size='medium'
          >
            <Sync
              fontSize='medium'
              sx={{ color: (theme) => theme.palette.primary.main }}
            />
          </IconButton>
        </Grid>
      </Grid>
      <Grid container sx={{ p: '0 1em 1em 1em', }}>
        <Grid item xs={2} pr='0.3em'>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
          >
            <DatePicker
              disableToolbar
              variant='inline'
              inputFormat='MM/dd/yyyy'
              margin='normal'
              id='date'
              label='Creado en'
              value={initialDate}
              onChange={handleInitialDateChange}
              renderInput={(props) => (
                <TextField {...props} />
              )}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={2} pl='0.3em' pr='0.3em'>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
          >
            <DatePicker
              disableToolbar
              variant='inline'
              inputFormat='MM/dd/yyyy'
              margin='normal'
              id='date'
              label='Cerrado el'
              value={finalDate}
              onChange={handleFinalDateChange}
              renderInput={(props) => (
                <TextField {...props} />
              )}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={2} pl='0.3em' pr='0.3em'>
          <Autocomplete
            key={reset}
            multiple
            limitTags={2}
            noOptionsText="No hay opciones"
            options={pairs}
            getOptionLabel={(option) => option}
            onChange={(event, value) => handleAttributeChange("symbol", value)}
            renderInput={(params) => (
              <TextField
                {...params}
                id="pair"
                value={data.symbol || ''}
                label="Par"
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={2} pl='0.3em' pr='0.3em'>
          <Autocomplete
            key={reset}
            noOptionsText="No hay opciones"
            options={['MARKET', 'LIMIT', 'STOP_LOSS_LIMIT']}
            getOptionLabel={(option) => option}
            onChange={(event, value) => handleAttributeChange("type", value)}
            renderInput={(params) => (
              <TextField
                {...params}
                id="type"
                value={data.type || ''}
                label="Type"
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={2} pl='0.3em' pr='0.3em'>
          <Autocomplete
            key={reset}
            noOptionsText="No hay opciones"
            options={['BUY', 'SELL']}
            getOptionLabel={(option) => option}
            onChange={(event, value) => handleAttributeChange("side", value)}
            renderInput={(params) => (
              <TextField
                {...params}
                id="side"
                value={data.side || ''}
                label="Side"
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={2} pl='0.3em'>
          <Autocomplete
            key={reset}
            multiple
            noOptionsText="No hay opciones"
            options={['NEW', 'FILLED', 'EXPIRED', 'CANCELLED']}
            getOptionLabel={(option) => option}
            onChange={(event, value) => handleAttributeChange("status", value)}
            renderInput={(params) => (
              <TextField
                {...params}
                id="status"
                value={data.status || ''}
                label="Status"
                fullWidth
              />
            )}
          />
        </Grid>
      </Grid>
      <Divider />
      <Grid container sx={{ m: '1.2em 0', pr: '1.5em' }}>
        {headCells.map((headCell) => (
          <Grid item xs={headCell.id === 'id' ? 1 : 2}
            key={headCell.id}
            align={'center'}
            sortDirection={orderBy === headCell.id ? order : false}
            id={headCell.id}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <strong>{headCell.label}</strong>
              {orderBy === headCell.id ? (
                <span
                  style={{
                    border: 0,
                    clip: 'rect(0 0 0 0)',
                    height: 1,
                    margin: -1,
                    overflow: 'hidden',
                    padding: 0,
                    position: 'absolute',
                    top: 20,
                    width: 1,
                  }}
                >
                  {order === 'desc'
                    ? 'sorted descending'
                    : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </Grid>
        ))}
        <Grid item xs={1}
          key={'delete'}
          align={'center'}
          id={'delete'}
        >
          <strong>{'Cancel'}</strong>
        </Grid>
      </Grid>
      {stableSort(filteredData, getComparator(order, orderBy)).slice((page - 1) * 10, (page * 10)).map((order, index) => {
        return (
          <div key={order.id}>
            <SpotOrder order={order} id={index + (page - 1) * 10} cancelOrder={cancelOrder} />
          </div>
        )
      }
      )}
      <Box sx={{ display: 'flex', justifyContent: 'right', m: '1em 2em' }}>
        <Pagination count={filteredData.length > 0 ? Math.ceil(filteredData.length / 10) : 1} page={page} onChange={handlePageChange} shape="rounded" showFirstButton showLastButton />
      </Box>
    </Paper>
  )
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}


export default SpotHistory;