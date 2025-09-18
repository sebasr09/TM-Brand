import React, { useEffect, useState } from 'react';
import Colors from '../../../constants/Colors';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import {
  Grid,
  Tab,
  Typography,
  Button,
  Divider,
  Stack,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  IconButton,
  Paper,
  Tabs,
} from '@mui/material';
import { getBackgrounds } from '../../../utils';
import { Doughnut, Line } from 'react-chartjs-2';
import { getApi, postApi } from '../../api/apiManager';
import CIcon from 'react-crypto-icons';
import PagesHeaderBar from '../../common/PagesHeaderBar';
import TabPanel from '../../common/TabPanel';
import Binance from 'binance-api-node';
import { Close, Visibility } from '@mui/icons-material';
import BasketUserDetail from './BasketUserDetail';

export default function BasketDetail({ pool, roles, handlePoolSelected }) {
  const classes = useStyles();
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [coins, setCoins] = useState([]);
  const [coinLabels, setCoinLabels] = useState([]);
  const [coinQuantity, setCoinQuantity] = useState([]);
  const [users, setUsers] = useState([]);
  const [userLabels, setUserLabels] = useState([]);
  const [userQuantity, setUserQuantity] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState({})
  const client = Binance();

  useEffect(() => {
    const getBasketCoins = async () => {
      setOpenBackdrop(true);
      try {
        const data = await getApi(
          `next-activos/getBasketCoins/${pool.token.id}`
        );
        const promises = data.map(async (element) => {
          if (element.coin.shortName === 'USDT') {
            element.lastTradePrice = 1;
          } else {
            try {
              let result = await client.prices({
                symbol: element.coin.shortName.concat('USDT'),
              });
              element.lastTradePrice = parseFloat(
                result[Object.keys(result)[0]]
              );
            } catch (e) {
              console.log(e);
              element.lastTradePrice = 0;
            }
          }
          return element;
        });
        Promise.all(promises).then((value) => {
          console.log(value);
          if (value.length > 0) {
            setCoins(value);
          } else {
            let newCoins = [];
            pool.coins.map((coin) => {
              let ob = {
                coin: {
                  name: coin.name,
                  shortName: coin.shortName
                },
                lastTradePrice: 1,
                total: 1,
                totalRedondeado: 1,
              };
              newCoins.push(ob);
            });
            setCoins(newCoins);
          }
        });
      } catch (err) {
        setOpenError(true);
        console.log(err);
        setErrorMessage(
          'No fue posible cargar la información del basket. Intenta de nuevo más tarde.'
        );
      } finally {
        setOpenBackdrop(false);
      }
    };

    const getBasketState = async() => {
      setOpenBackdrop(true);
      getApi(`next-activos/getLastBasketState/${pool.token.id}`)
      .then((response) => console.log(response))
      .catch((err) => {
        setOpenError(true);
        console.log(err);
        setErrorMessage(
        'No fue posible cargar la información del basket. Intenta de nuevo más tarde.'
      );})
      .finally(() => setOpenBackdrop(false))
    }

    const getBasketUsers = async () => {
      setOpenBackdrop(true);
      try {
        const data = await getApi(
          `next-activos/findUserStatesByBasket/${pool.token.id}`
        );
          setUsers(data);
      } catch (err) {
        setOpenError(true);
        console.log(err);
        setErrorMessage(
          'No fue posible cargar la información del basket. Intenta de nuevo más tarde.'
        );
      } finally {
        setOpenBackdrop(false);
      }
    };
    getBasketCoins();
    getBasketState();
    getBasketUsers();
  }, []);

  useEffect(() => {
    handleCoins();
  }, [coins]);

  useEffect(() => {
    handleUsers();
  }, [users]);

  const closeDialog = () => {
    setOpenDialog(false);
  };

  const handleCoins = async () => {
    let labelList = [];
    let quantityList = [];
    coins.forEach((coin) => {
      labelList.push(coin.coin.shortName);
      quantityList.push(
        Math.round(coin.lastTradePrice * coin.total * 1000) / 1000
      );
    });
    setCoinLabels(labelList);
    setCoinQuantity(quantityList);
  };

  const handleUsers = async () => {
    let labelList = [];
    let quantityList = [];
    users.forEach((user) => {
      labelList.push(user.user.name);
      quantityList.push(user.totalInvestment);
    });
    setUserLabels(labelList);
    setUserQuantity(quantityList);
  };

  return (
    <Paper className={classes.paper}>
      <PagesHeaderBar
        title={pool.name}
        options={[
          {
            icon: <Close />,
            action: () => handlePoolSelected(-1),
            disabled: false,
          },
        ]}
      />
      <Divider />
      <Grid container>
        {
          <Grid
            item
            xs={12}
            md={12}
            lg={4}
            sx={{ overflow: 'overlay' }}
            marginTop='13px'
          >
            <Typography
              style={{ margin: '0 2em' }}
              variant='h6'
              color={Colors.primary}
            >
              {pool.description
                ? pool.description
                : 'Este Pool invierte en Activos estables de seguimiento del dólar estadounidense que respaldan el precio de su token manteniendo una inversión correspondiente 1: 1 en dólares estadounidenses por cada token emitido'}
            </Typography>
          </Grid>
        }
        {
          <Grid
            item
            xs={12}
            md={12}
            lg={8}
            sx={{ overflow: 'overlay' }}
            marginTop='13px'
          >
            <Stack>
              <Tabs
                value={tabIndex}
                onChange={(event, newValue) => setTabIndex(newValue)}
                aria-label='basic tabs example'
              >
                <Tab label={<strong>Monedas</strong>} id='tab-coins' />
                {roles && roles.includes('llc') && (
                  <Tab label={<strong>Usuarios</strong>} id='tab-users' />
                )}
              </Tabs>
              <Divider />
              <TabPanel value={tabIndex} index={0}>
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
                <List>
                  {coins.map((row, index) => {
                    return (
                      <div key={index}>
                        <ListItem>
                          <IconButton>
                            <CIcon
                              name={row.coin.shortName.toLowerCase()}
                              size={20}
                            />
                          </IconButton>
                          <ListItemText
                            primary={row.coin.shortName}
                            secondary={row.coin.name}
                          />
                          <ListItemText
                            sx={{ textAlign: 'right' }}
                            primary={row.totalRedondeado}
                            secondary={
                              Math.round(
                                row.lastTradePrice * row.total * 1000
                              ) /
                              1000 +
                              ' USDT'
                            }
                          />
                        </ListItem>
                        <Divider />
                      </div>
                    );
                  })}
                </List> 
              </TabPanel>
              <TabPanel value={tabIndex} index={1}>
                {userLabels && (
                  <Doughnut
                    style={{ margin: '0 5em' }}
                    data={{
                      labels: userLabels,
                      datasets: [
                        {
                          data: userQuantity,
                          backgroundColor: getBackgrounds(userQuantity.length),
                        },
                      ],
                    }}
                  />
                )}
                <List>
                  <ListItem>
                    <ListItemText 
                    sx={{ textAlign: 'left' }}
                    primary={'Usuario'} />
                    <ListItemText
                      sx={{ textAlign: 'center' }}
                      primary={'Total Unidades'}
                    />
                    <ListItemText
                      sx={{ textAlign: 'center' }}
                      primary={'Participación'}
                      secondary={'USD'}
                    />
                    <ListItemText
                      sx={{ textAlign: 'right' }}
                      primary={'Detalle'}
                    />
                  </ListItem>
                  <Divider />
                  {users.map((row, index) => {
                    return (
                      <div key={index}>
                        <ListItem sx={{ justifyContent: 'space-between' }}>
                          <ListItemText
                            primary={row.user.name}
                            secondary={row.user.lastName}
                            sx={{ maxWidth: '200px' }}
                          />
                          <ListItemText
                           sx={{ textAlign: 'left' }}
                            primary={row.totalUnits}
                          />
                          <ListItemText
                            primary={row.totalInvestment}
                          />
                          <IconButton
                            className={classes.botTool}
                            onClick={() => {
                              setSelectedUser(row.user);
                              setOpenDialog(true);
                            }}
                          >
                              <Visibility />
                          </IconButton>
                        </ListItem>
                        <Divider />
                      </div>
                    );
                  })}
                </List>
              </TabPanel>
            </Stack>
          </Grid>
        }
      </Grid>
      <BasketUserDetail user={selectedUser} basketId={pool.id} open={openDialog} handleClose={closeDialog} />
    </Paper>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    padding: '1% 3% 8%',
    [theme.breakpoints.down('xs')]: {
      width: '82%',
    },
  },
  buttonsGroup: {
    margin: 'auto',
  },
  newUserButton: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  topButtons: {
    padding: '2% 0',
  },
  paper: {
    width: '100%',
    padding: '1em',
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

BasketDetail.propTypes = {
  pool: PropTypes.object,
  roles: PropTypes.array,
  handlePoolSelected: PropTypes.func,
};
