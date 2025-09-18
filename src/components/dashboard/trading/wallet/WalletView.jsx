import {
  Stack,
  List,
  ListItem,
  ListItemText,
  Container,
  CardContent,
  Card,
  Grid,
  IconButton,
  Divider,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import CIcon from 'react-crypto-icons';
import Colors from '../../../../constants/Colors';
import { getApi, postApi } from '../../../api/apiManager';
import { makeStyles } from '@mui/styles';
import LoadingBackdrop from '../../../common/LoadingBackdrop';
import ErrorSnackbar from '../../../common/ErrorSnackbar';
import SuccessSnackbar from '../../../common/SuccessSnackbar';
import { formatNumber } from '../../../../utils';
import Binance from 'binance-api-node';

const USD_COP = 3800;

export default function WalletView() {
  const client = Binance();
  const classes = useStyles();
  const [cryptosList, setCryptosList] = useState([]);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const data = {
    labels: ['COPC', 'ETH', 'BTC', 'USDT', 'Otros'],
    datasets: [
      {
        label: 'Saldos',
        data: [16, 10, 4.7, 0, 0],
        backgroundColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(100, 100, 100,1)',
          'rgba(255, 159, 64, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
        ],
      },
    ],
  };

  const handleCloseError = () => {
    setOpenError(false);
    setErrorMessage('');
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
    setSuccessMessage('');
  };

  useEffect(() => {
    const getCoins = async () => {
      setOpenBackdrop(true);
      try {
        const data = await getApi(`activos/getAllCryptos`);
        const promises = data.map(async (element) => {
          if (element.short_name === 'COPC') {
            element.last_trade_price = 1000 / USD_COP;
            element.available = 16043700;
          } else if (element.short_name === 'USDT') {
            element.last_trade_price = 1;
            element.available = 1000;
          } else {
            try {
              let result = await client.prices({
                symbol: element.short_name.concat('USDT'),
              });
              let data = result[Object.keys(result)[0]];
              element.last_trade_price = parseFloat(data) * USD_COP;
              switch (element.short_name) {
                case 'ETH':
                  element.available = 1;
                  break;
                case 'BTC':
                  element.available = 1;
                  break;
                case 'USDT':
                  element.available = 1000;
                  break;
                default:
                  element.available = 0;
                  break;
              }
            } catch (e) {
              console.log(e);
              element.last_trade_price = 0;
              element.available = 0;
            }
          }
          return element;
        });
        Promise.all(promises).then((value) => {
          setCryptosList(value);
        });
      } catch (err) {
        setOpenError(true);
        setErrorMessage(
          'No fue posible cargar la lista de activos. Intenta de nuevo más tarde.'
        );
      } finally {
        setOpenBackdrop(false);
      }
    };
    getCoins();
  }, []);

  return (
    <Container component='main' maxWidth='lg'>
      <LoadingBackdrop open={openBackdrop} />
      <ErrorSnackbar
        open={openError}
        message={errorMessage}
        handleClose={handleCloseError}
        id='errorSnackbar'
      />
      <SuccessSnackbar
        open={openSuccess}
        message={successMessage}
        handleClose={handleCloseSuccess}
        id='successSnackbar'
      />
      <Grid
        container
        alignItems='center'
        justifyContent='center'
        className={classes.container}
      >
        <Grid item xs={12} lg={10} className={classes.centerContainer}>
          <Card>
            <CardContent>
              <Stack>
                <Typography variant='h5' color={Colors.primary}>
                  <strong> Billetera</strong>
                </Typography>
                <Typography variant='body2' color={Colors.primary}>
                  El detalle de tus saldos.
                </Typography>
              </Stack>
              <Divider />
              <Stack>
                <Doughnut data={data} className={classes.centerContainer} />
                <List>
                  {cryptosList.map((row, index) => {
                    return (
                      <div key={index}>
                        <ListItem>
                          <IconButton>
                            <CIcon
                              name={row.short_name.toLowerCase()}
                              size={30}
                            />
                          </IconButton>
                          <ListItemText
                            primary={row.short_name}
                            secondary={row.name}
                          />
                          <ListItemText
                            sx={{ textAlign: 'right' }}
                            primary={formatNumber(row.available || 0)}
                            secondary={`$ ${formatNumber(
                              row.short_name != 'COPC'
                                ? (row.available || 0) * row.last_trade_price
                                : row.available || 0
                            )} COP`}
                          />
                        </ListItem>
                        <Divider />
                      </div>
                    );
                  })}
                </List>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  container: {
    display: 'flex',
    justifyContent: 'left',
  },
  progress: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(1),
  },
  centerContainer: {
    margin: '1em auto',
  },
}));
