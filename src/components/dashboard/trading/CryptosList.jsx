import { ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import {
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Grid,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import CIcon from 'react-crypto-icons';

import Colors from '../../../constants/Colors';
import ConfirmationDialog from '../../common/ConfirmationDialog';
import EnhancedTableToolbar from './cryptoTableComponents/EnhancedTableToolbar';
import ErrorSnackbar from '../../common/ErrorSnackbar';
import LoadingBackdrop from '../../common/LoadingBackdrop';
import Paper from '@mui/material/Paper';
import SuccessSnackbar from '../../common/SuccessSnackbar';
import { makeStyles } from '@mui/styles';
import { deleteApi, getApi, postApi } from '../../api/apiManager';
import { formatNumber } from '../../../utils';
import Binance from 'binance-api-node';

const USD_COP = 3800;

export default function EnhancedTable() {
  const classes = useStyles();
  const [redoFetch, setRedoFetch] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openSuccess, setOpenSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [cryptosList, setCryptosList] = useState([]);
  const client = Binance();

  const toggleReDoFetch = () => {
    setRedoFetch(!redoFetch);
  };

  const handleCloseError = () => {
    setOpenError(false);
    setErrorMessage('');
  };

  const handleDeleteAccept = async () => {
    setConfirmationOpen(false);
    setOpenBackdrop(true);
    try {
      await deleteApi(`user/${selectedUser.username}`);
      setSelectedUser(null);
      setOpenSuccess(true);
      setSuccessMessage('Usuario eliminado satisfactoriamente.');
      toggleReDoFetch();
    } catch (err) {
      setOpenError(true);
      setErrorMessage(
        'No fue eliminar al usuario. Intenta de nuevo más tarde.'
      );
    } finally {
      setOpenBackdrop(false);
    }
  };

  const handleDeleteCancel = () => {
    setConfirmationOpen(false);
    setSelectedUser(null);
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
    setSuccessMessage('');
  };

  const buyCrypto = async (crypto) => {
    console.log(crypto);
  };

  useEffect(() => {
    const getCoins = async () => {
      setOpenBackdrop(true);
      try {
        const data = await getApi(`activos/getAllCryptos`);
        const promises = data.map(async (element) => {
          if (element.short_name === 'COPC') {
            element.last_trade_price = 1000;
          } else if (element.short_name === 'USDT') {
            element.last_trade_price = 1;
          } else {
            try {
              let result = await client.prices({
                symbol: element.short_name.concat('USDT'),
              });
              let data = result[Object.keys(result)[0]];
              element.last_trade_price = parseFloat(data) * USD_COP;
            } catch (e) {
              console.log(e);
              element.last_trade_price = 0;
            }
          }
          return element;
        });
        Promise.all(promises).then((value) => {
          console.log(value);
          setCryptosList(value);
        });
      } catch (err) {
        setOpenError(true);
        setErrorMessage(
          'No fue posible cargar los usuarios. Intenta de nuevo más tarde.'
        );
      } finally {
        setOpenBackdrop(false);
      }
    };
    getCoins();
  }, [redoFetch]);

  return (
    <div className={classes.root}>
      <LoadingBackdrop open={openBackdrop} />
      <ErrorSnackbar
        open={openError}
        message={errorMessage}
        handleClose={handleCloseError}
      />
      <SuccessSnackbar
        open={openSuccess}
        message={successMessage}
        handleClose={handleCloseSuccess}
        id='successSnackbar'
      />
      {selectedUser ? (
        <ConfirmationDialog
          open={confirmationOpen}
          handleAccept={handleDeleteAccept}
          handleCancel={handleDeleteCancel}
          title={'Confirmar eliminación'}
          content={`¿Estas seguro de que quieres eliminar al usuario: ${selectedUser.name}?`}
        />
      ) : null}
      <Paper className={classes.paper}>
        <EnhancedTableToolbar toggleReDoFetch={toggleReDoFetch} />
        <TableContainer>
          <Table
            size='small'
            stickyHeader
            aria-labelledby='tableTitle'
            aria-label='enhanced table'
            id='usersTable'
          >
            <TableBody>
              {cryptosList.map((row, index) => {
                return (
                  <TableRow
                    hover
                    role='checkbox'
                    tabIndex={-1}
                    key={index}
                    id={`userDetail${index}`}
                  >
                    <TableCell>
                      <Stack direction='row'>
                        <IconButton>
                          <CIcon
                            name={row.short_name.toLowerCase()}
                            size={30}
                          />
                        </IconButton>
                        <Grid p={1}>
                          <Typography fontSize={16}>
                            {row.short_name}
                          </Typography>
                          <Typography fontSize={10} color={Colors.gray}>
                            {row.name}
                          </Typography>
                        </Grid>
                      </Stack>
                    </TableCell>
                    <TableCell>{`$ ${formatNumber(
                      row.last_trade_price
                    )} COP`}</TableCell>
                    <TableCell>
                      <IconButton
                        id='buyCrypto'
                        className={classes.buyCrypto}
                        onClick={() => {
                          buyCrypto(row);
                        }}
                        size='large'
                      >
                        {`${formatNumber(0.0)} %`}
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        id='buyCrypto'
                        className={classes.buyCrypto}
                        onClick={() => {
                          buyCrypto(row);
                        }}
                        size='large'
                      >
                        <ShoppingCartIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    padding: '1% 3% 8%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  buttonsGroup: {
    margin: 'auto',
  },
  newUserButton: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  topButtons: {
    padding: '2% 0',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  buttonCreate: {
    marginBottom: '2%',
  },
  buttonDelete: {
    backgroundColor: Colors.accent,
    color: Colors.white,
  },
  buttonEdit: {
    backgroundColor: Colors.primary,
    color: Colors.white,
    marginRight: 10,
  },
}));
