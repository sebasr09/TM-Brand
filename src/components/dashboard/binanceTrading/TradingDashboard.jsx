import React, { useState, useEffect } from 'react';
import { getApi } from '../../api/apiManager';
import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableSortLabel,
  Grid,
  Container,
  Typography,
  Divider,
  IconButton,
  Stack,
  Button,
  Autocomplete,
  TextField
} from '@mui/material';
import { Doughnut, Line } from 'react-chartjs-2';
import { getBackgrounds } from '../../../utils';
import { Sync } from '@mui/icons-material';
import SpotOrderDialog from './dialogs/SpotOrderDialog';
import SuccessSnackbar from '../../common/SuccessSnackbar';
import CIcon from 'react-crypto-icons';
import ErrorSnackbar from '../../common/ErrorSnackbar';
import LoadingBackdrop from '../../common/LoadingBackdrop';

const headCells = [
  { id: 'asset', numeric: false, label: 'Token' },
  { id: 'percentage', numeric: false, label: 'Distribucion %' },
  { id: 'free', numeric: false, label: 'Cantidad' },
  { id: 'locked', numeric: false, label: 'Bloqueado'},
  { id: 'price', numeric: false, label: 'Precio' },
  { id: 'total', numeric: false, label: 'Total' },
];

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
    },
    
  },
  scales: {
    x: {
      display: true,
      grid: {
        display: false
      }
    },
    y: {
      display: true,
      grid: {
        display: false
      }
    },
  },
  maintainAspectRatio: true,
};

const pooly = { "comparison": [38743,	45534, 37680,	31760,	19845,	23360], "data": [38743,	49280,	41188,	35055,	24557,	28324], labels: ['Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'] };

const TradingDashboard = () => {
  const [tokens, setTokens] = useState([]);
  const [total, setTotal] = useState(1);
  const [coinLabels, setCoinLabels] = useState([]);
  const [coinQuantity, setCoinQuantity] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('token');
  const [redoFetch, setRedoFetch] = useState(false);
  const [openNewOrder, setOpenNewOrder] = useState(false)
  const [openSuccess, setOpenSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [account, setAccount] = useState('ALL');
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openError, setOpenError] = useState(false);

  const toggleReDoFetch = () => {
    setRedoFetch(!redoFetch);
  };

  useEffect(() => {
    if (account === 'ALL') {
      let tmTokens = []
      setOpenBackdrop(true)
      getApi(`next-activos/getAccountInfo/TM`)
        .then((response) => {
          tmTokens = response.balances.map((bal) => {
            bal.free = Number(bal.free);
            bal.locked = Number(bal.locked);
            bal.price = Number(bal.price);
            bal.total = (bal.free + bal.locked) * bal.price;
            return bal;
          })
        })
        .then(() => getApi(`next-activos/getAccountInfo/BTC`)
          .then((response) => {
            response.balances.forEach((bal) => {
              const index = tmTokens.findIndex((el) => el.asset === bal.asset);
              if (index < 0) {
                bal.free = Number(bal.free);
                bal.locked = Number(bal.locked);
                bal.price = Number(bal.price);
                bal.total = (bal.free + bal.locked) * bal.price;
                tmTokens.push(bal)
              } else {
                tmTokens[index].free += Number(bal.free);
                tmTokens[index].locked += Number(bal.locked);
                tmTokens[index].price = Number(bal.price);
                tmTokens[index].total = (tmTokens[index].free + tmTokens[index].locked) * tmTokens[index].price;
              }
            })
            let subTotal = 0;
            tmTokens.forEach((el) => subTotal += el.total);
            setTokens(tmTokens);
            setTotal(subTotal)
          })
          .catch((err) => {
            console.log(err);
            setErrorMessage('No se pudo obtener la información del par.');
            setOpenError(true);
          }))
        .catch((err) => {
          console.log(err);
          setErrorMessage('No se pudo obtener la información del par.');
          setOpenError(true);
        })
        .finally(() => setOpenBackdrop(false))
    } else {
      setOpenBackdrop(true);
      getApi(`next-activos/getAccountInfo/${account}`).then((response) => {
        let subTotal = 0;
        setTokens(
          response.balances.map((bal) => {
            bal.free = Number(bal.free);
            bal.locked = Number(bal.locked);
            bal.price = Number(bal.price);
            bal.total = (bal.free + bal.locked) * bal.price;
            subTotal += bal.total;
            return bal;
          })
        );
        setTotal(subTotal);
      }).catch((err) => {
        console.log(err);
        setErrorMessage('No se pudo obtener la información del par.');
        setOpenError(true);
      }).finally(() => setOpenBackdrop(false));
    }

  }, [redoFetch, account]);

  useEffect(() => {
    let labels = [];
    let quantities = [];
    setTokens(
      tokens.map((bal) => {
        bal.percentage = (bal.total * 100) / total;
        labels.push(bal.asset);
        quantities.push(bal.total);
        return bal;
      })
    );
    setCoinQuantity(quantities);
    setCoinLabels(labels);
  }, [total]);

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const onRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleNewOrderClose = () => {
    setOpenNewOrder(false);
    toggleReDoFetch();
  }

  const success = (message) => {
    setSuccessMessage(message);
    setOpenSuccess(true);
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
    <div style={{ width: '100%', maxWidth: '100%', padding: '1% 3% 8%', m: 0 }}>
      <SuccessSnackbar
        open={openSuccess}
        message={successMessage}
        handleClose={handleCloseSuccess}
        id='successSnackbar'
      />
      <LoadingBackdrop open={openBackdrop} />
      <ErrorSnackbar open={openError} message={errorMessage} handleClose={handleCloseError} id='errorSnackbar' />
      <Grid container mb='0.5em'>
        <Grid item xs={6}>
          <Typography variant='h4'>
            {<strong>DashBoard: {account}</strong>}
          </Typography>
        </Grid>
        <Grid item xs={4}>
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
        <Grid item xs={2} textAlign='right'>
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
            size='large'
          >
            <Sync
              fontSize='large'
              sx={{ color: (theme) => theme.palette.primary.main }}
            />
          </IconButton>
        </Grid>
      </Grid>
      <Divider />
      <Grid container fullWidth sx={{ m: '2em 0' }}>
        <Grid item xs={12} md={4}>
          {coinLabels && (
            <Doughnut
              style={{ margin: '0 5em' }}
              data={{
                labels: coinLabels,
                datasets: [
                  {
                    data: coinQuantity,
                    backgroundColor: getBackgrounds(coinQuantity.length),
                  },
                ],
              }}
            />
          )}
        </Grid>
        <Grid item xs={12} md={5} p='0em 2em'>
          <Container sx={{ bgcolor: theme => theme.palette.white.main, borderRadius: '15px' }}>
          <Line
            datasetIdKey='id'
              data={{
                labels: pooly.labels,
                datasets: [
                  {
                    id: 1,
                    label: 'BTC',
                    data: pooly.comparison,
                    pointRadius: 1,
                    borderWidth: 3,
                    borderColor: 'rgb(33, 33, 71)',
                    backgroundColor: 'rgb(33, 33, 71, 0.5)',
                    tension: 0.1,
                    fill: true,
                  },
                  {
                    id: 2,
                    label: 'Bitcoin Trust',
                    data: pooly.data,
                    borderColor: 'rgb(33, 218, 185)',
                    backgroundColor: 'rgb(33, 218, 185, 0.5)',
                    pointRadius: 1,
                    borderWidth: 3,
                    tension: 0.1,
                    fill: true,
                  },
                ],
              }}
              options={options}
            />
          </Container>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper mr='2em'>
            <Stack direction='row' justifyContent='space-between' p='2em 2.5em'>
              <Stack alignItems='center' justifyContent='center'>
                <Typography
                  variant='h6'
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    fontWeight: '500',
                    mb: '0.7em',
                    color: (theme) => theme.palette.primary.main,
                    svg: {
                      color: (theme) => theme.palette.third.main,
                    },
                  }}
                >
                  <strong>NAV {account}</strong>{' '}
                </Typography>
                <Typography
                  variant='h7'
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    fontWeight: '500',
                    mb: '0.5em',
                    color: (theme) => theme.palette.primary.main,
                    svg: {
                      color: (theme) => theme.palette.third.main,
                    },
                  }}
                >
                  <strong>$ {total.toFixed(2)}</strong>{' '}
                </Typography>
                <Typography
                  variant='h7'
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    fontWeight: '500',
                    color: (theme) => theme.palette.primary.main,

                    svg: {
                      color: (theme) => theme.palette.third.main,
                    },
                  }}
                >
                  <strong>
                    ₿{' '}
                    {tokens.length > 0
                      ? (
                        total /
                        tokens.find((token) => token.asset === 'BTC').price
                      ).toFixed(4)
                      : 0}
                  </strong>{' '}
                </Typography>
              </Stack>
              <Stack alignItems='center' justifyContent='center'>
                <Typography
                  variant='h6'
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    fontWeight: '500',
                    mb: '0.7em',
                    color: (theme) => theme.palette.primary.main,
                    svg: {
                      color: (theme) => theme.palette.third.main,
                    },
                  }}
                >
                  <strong>Cambio 24H</strong>{' '}
                </Typography>
                <Typography
                  variant='h7'
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    fontWeight: '500',
                    mb: '0.5em',
                    color: (theme) => theme.palette.primary.main,
                    svg: {
                      color: (theme) => theme.palette.third.main,
                    },
                  }}
                >
                  <strong>$ {total.toFixed(2)}</strong>{' '}
                </Typography>
                <Typography
                  variant='h7'
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    fontWeight: '500',
                    color: (theme) => theme.palette.primary.main,

                    svg: {
                      color: (theme) => theme.palette.third.main,
                    },
                  }}
                >
                  <strong>
                    ₿{' '}
                    {tokens.length > 0
                      ? (
                        total /
                        tokens.find((token) => token.asset === 'BTC').price
                      ).toFixed(4)
                      : 0}
                  </strong>{' '}
                </Typography>
              </Stack>
            </Stack>
          </Paper>
          {account !== 'ALL' && <Button color='third'
            variant='contained'
            onClick={() => { setOpenNewOrder(true) }}
            id='open-sportOrder'
            sx={{ m: '0.5em 0' }}
            fullWidth>
            Nueva Orden
          </Button>}
        </Grid>
      </Grid>
      <Paper sx={{ width: '100%', marginBottom: '2em' }}>
        <TableContainer>
          <Table
            stickyHeader
            sx={{ minWidth: 750 }}
            aria-labelledby='tableTitle'
            aria-label='enhanced table'
            id='usersTable'
          >
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.numeric ? 'center' : 'left'}
                    sortDirection={orderBy === headCell.id ? order : false}
                    id={headCell.id}
                  >
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={createSortHandler(headCell.id)}
                    >
                      {headCell.label}
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
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {stableSort(tokens, getComparator(order, orderBy)).map(
                (row, index) => {
                  return (
                    <TableRow
                      hover
                      role='checkbox'
                      tabIndex={-1}
                      key={index}
                      id={`tokenDetail${index}`}
                    >
                      <TableCell >
                        <Stack direction='row' alignItems='center'>
                          <CIcon
                            name={row.asset.toLowerCase()}
                            size={18}
                          />
                          <Typography variant='h7' ml='0.5em'>
                            {row.asset}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        {(row.percentage ? row.percentage.toFixed(2) : 0) + '%'}
                      </TableCell>
                      <TableCell>{row.free}</TableCell>
                      <TableCell>{row.locked}</TableCell>
                      <TableCell>{row.price}</TableCell>
                      <TableCell>{row.total}</TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <SpotOrderDialog openDialog={openNewOrder} closeDialog={handleNewOrderClose} tokens={tokens} success={success} account={account} />
      </Paper>
    </div>
  );
};

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

export default TradingDashboard;
