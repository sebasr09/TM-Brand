import {
  Stack,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Typography,
  Dialog, Slide
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import CIcon from 'react-crypto-icons';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { getApi } from '../../api/apiManager';
import Colors from '../../../constants/Colors';
import { formatNumber, getBackgrounds } from '../../../utils';
import { Pool } from '@mui/icons-material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ErrorSnackbar from '../../common/ErrorSnackbar';
import SuccessSnackbar from '../../common/SuccessSnackbar';
import LoadingBackdrop from '../../common/LoadingBackdrop';
import Binance from 'binance-api-node';

const USD_COP = 3800;

export default function BasketUserDetail({ basketId, user, handleClose, open }) {
  const classes = useStyles();
  const [cryptosList, setCryptosList] = useState([]);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [total, setTotal] = useState(0);
  const [doughnutData, setDoughnutData] = useState({});
  const [change, setChange] = useState(0);
  const [baskets, setBaskets] = useState([]);
  const [basketInfo, setBasketInfo] = useState({basket: {name:''}})
  const pairs = [
    { pair: 'XETCZUSD', short_name: 'ETC' },
    { pair: 'XXLMZUSD', short_name: 'XLM' },
    { pair: 'XDGUSDT', short_name: 'DOGE' },
    { pair: 'XBTUSDT', short_name: 'BTC' },
    { pair: 'USDTUSD', short_name: 'USDT' },
  ];
  const client = Binance();

  const calculateData = async () => {
    const filtered = cryptosList.filter((c) => {
      if (c.available && c.available > 0) return c;
    });
    const data = {
      labels: filtered.map((c) => c.short_name),
      datasets: [
        {
          label: 'Saldos',
          data: filtered.map((c) => c.USD_current_price),
          backgroundColor: getBackgrounds(15),
        },
      ],
    };
    setDoughnutData(data);
  };

  const getTotal = () => {
    let total = 0;
    cryptosList.forEach((crypto) => {
      if (crypto.available && crypto.available > 0) {
        total += crypto.available * crypto.last_trade_price_USD;
      }
    });
    setTotal(total);
  };

  const groupByPair = (array) => {
    return new Promise((resolve, reject) => {
      let response = [];
      array.forEach((element) => {
        let index = response.findIndex(
          (res) => res.pair === element.token.shortName
        );
        if (index >= 0) response[index].transactions.push(element);
        else
          response.push({
            pair: element.token.shortName,
            transactions: [element],
          });
      });
      resolve(response);
    });
  };

  const groupTransactions = (array) => {
    return new Promise((resolve, reject) => {
      let response = [];
      array.forEach((element) => {
        response = response.concat(element.basketEntries);
      });
      resolve(response);
    });
  };

  const balancedPairs = (array) => {
    return new Promise((resolve, reject) => {
      let response = array.map((crypto) => {
        let sumPrice = 0;
        let sumQuantity = 0;
        let sumCost = 0;
        crypto.transactions.forEach((element) => {
          sumPrice += parseFloat(element.price * (element.transaction.type == 802 ? element.tokenQuantity : - element.tokenQuantity));
          sumQuantity += parseFloat((element.transaction.type == 802 ? element.tokenQuantity : - element.tokenQuantity));
          sumCost += parseFloat(element.price * (element.transaction.type == 802 ? element.tokenQuantity : - element.tokenQuantity));
        });
        const price = sumPrice / sumQuantity;
        const cost = sumCost;
        return {
          pair: crypto.pair,
          price: price,
          vol: sumQuantity,
          cost: cost,
        };
      });
      resolve(response);
    });
  };

  const totalChange = () => {
    console.log(baskets)
    const basket = baskets.length ? baskets.find(b => b.basket.id === basketId) : {transactions:[]}
    console.log(basket)
    let totalN = basket.transactions.length ? basket.transactions.map((trans) => trans.type === 802 ? trans.originValue : -trans.originValue).reduce((a, b) => a + b) : 0;
    
    setChange(100 * (total / totalN - 1));
  };

  const getTickerPrices = function (array) {
    return new Promise((resolve, reject) => {
      const promises = array.map(async (element) => {
        if (element.pair === 'USDT') {
          element.last_trade_price_USD = 1;
          element.last_trade_price_COP = USD_COP;
          element.available = element.vol;
          element.initial = element.cost;
          element.change = ((element.vol || 0) / (element.cost || 0) - 1) * 100;
          element.USD_current_price = element.vol || 0;
          element.short_name = element.pair;
        } else {
          try {
            let result = await client.prices({
              symbol: element.pair.concat('USDT'),
            });
            let data = result[Object.keys(result)[0]];
            element.last_trade_price_COP = parseFloat(data) * USD_COP;
            element.last_trade_price_USD = parseFloat(data);
            element.available = element.vol;
            element.initial = element.cost;
            element.change =
              (((element.vol || 0) * parseFloat(data)) / (element.cost || 0) -
                1) *
              100;
            element.USD_current_price = (element.vol || 0) * parseFloat(data);
            element.short_name = element.pair;
          } catch (e) {
            console.log(e);
            element.last_trade_price_USD = 0;
            element.last_trade_price_COP = 0;
            element.available = element.vol;
            element.initial = element.cost;
            element.change = -100;
            element.USD_current_price = 0;
            element.short_name = element.pair;
          }
        }
        return element;
      });
      Promise.all(promises).then((value) => {
        resolve(value);
      });
    });
  };

  const groupByBasket = function (array) {
    return new Promise((resolve, reject) => {
      let response = [];
      array.forEach((element) => {
        let index = response.findIndex(res => res.basket.id === element.finalCoin.basketToken.id);
        if (index >= 0) response[index].transactions.push(element);
        else response.push({
          basket: element.finalCoin.basketToken,
          transactions: [element]
        })
      })
      resolve(response);
    });
  }

  useEffect(() => {
    getCoins() 
  }, [open]);

  useEffect(() => {
    getBaskets() 
  }, [baskets]);


  const getCoins = async () => {
    setOpenBackdrop(true);
    try {
      const response = await getApi(`next-activos/getUserBasketTransactions/${user.id}`);
      const newBaskets = await groupByBasket(response);
      setBaskets(newBaskets);
    } catch (err) {
      console.log(err);
      setOpenError(true);
      setErrorMessage('No fue posible cargar la lista de activos. Intenta de nuevo más tarde.');
    } finally {
      setOpenBackdrop(false);
      //totalChange();
    }
  };

  const getBaskets = async () => {
    setOpenBackdrop(true);
    try {
      const info = baskets.find(b => b.basket.id === basketId);
      let groupedTransactions = await groupTransactions(
        info.transactions
      );
      let grouped = await groupByPair(groupedTransactions);
      let newList = await balancedPairs(grouped);
      let finalList = await getTickerPrices(newList);
      setCryptosList(finalList);
      setBasketInfo(info);
      //const transactionsGet = await getApi(`next-activos/getUserBasketTransactions/${userInfo.id}`)
      //console.log("Here", transactionsGet)
    } catch (err) {
      console.log(err);
      setOpenError(true);
      setErrorMessage(
        'No fue posible cargar la lista de activos. Intenta de nuevo más tarde.'
      );
    } finally {
      setOpenBackdrop(false);
      //totalChange();
    }
  };

  useEffect(() => {
    calculateData();
    setTotal(0);
    getTotal();
  }, [cryptosList]);

  useEffect(() => {
    totalChange();
  }, [cryptosList, total]);

  const handleCloseError = () => {
    setOpenError(false);
    setErrorMessage('');
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
    setSuccessMessage('');
  };

  return (

    <Dialog open={open} onClose={handleClose} TransitionComponent={Transition} keepMounted PaperProps={{sx:{padding: '1em'}}}>
      <LoadingBackdrop open={openBackdrop} />
      <ErrorSnackbar open={openError} message={errorMessage} handleClose={handleCloseError} id='errorSnackbar' />
      <SuccessSnackbar
        open={openSuccess}
        message={successMessage}
        handleClose={handleCloseSuccess}
        id='successSnackbar'
      />
      <Stack sx={{ margin: '1rem 0.5em 0 0.5em' }}>
        <Stack direction='row' justifyContent='space-between'>
          <Typography variant='h5' color={Colors.light.primary}>
            <Pool fontSize='small' /> <strong>{user.name + ' ' + user.lastName}</strong>
          </Typography>
          {<Typography
            variant='button'
            fontWeight='bold'
            color={`${change > 0 ? Colors.light.backgroundGreen : Colors.light.red}`}
          >
            {formatNumber(change)} %
          </Typography>}
        </Stack>
        {<Stack
          direction='row'
          justifyContent='space-between'
        >
          <Typography variant='h6' color={Colors.light.primary}>
            {formatNumber(total.toFixed(1))} USD
          </Typography>
        </Stack>}
      </Stack>
      <Stack sx={{minWidth:{xsm:'', sm:'500px'}}}>
        <Divider />
        <Doughnut
          data={doughnutData}
          className={classes.centerContainer}
          options={{
            color: 'black',
          }}
        />
        <List sx={{ overflow: 'auto' }}>
          {cryptosList.map((row, index) => {
            return row.available && row.available !== 0 ? (
              <div key={index}>
                <ListItem sx={{ paddingLeft: 0 }}>
                  <IconButton>
                    <CIcon name={row.short_name.toLowerCase()} size={30} />
                  </IconButton>
                  <ListItemText
                    primary={row.short_name}
                    secondary={formatNumber(row.available || 0)}
                  />
                  <Stack
                    direction='row'
                    justifyContent='end'
                    sx={{
                      display: 'contents',
                      color: `${row.change > 0 ? Colors.light.backgroundGreen : Colors.light.red}`,
                    }}
                  >
                    <ListItemText
                      sx={{ textAlign: 'right' }}
                      primary={`${formatNumber(row.change)} %`}
                    />
                    {row.change > 0 ? (
                      <ArrowDropUpIcon />
                    ) : (
                      <ArrowDropDownIcon />
                    )}
                  </Stack>
                  <ListItemText
                    sx={{ textAlign: 'right' }}
                    primary={`$ ${formatNumber(
                      row.USD_current_price.toFixed(1)
                    )} USD`}
                    secondary={`$ ${formatNumber(
                      row.short_name != 'COPC'
                        ? (
                          (row.available || 0) * row.last_trade_price_COP
                        ).toFixed(1)
                        : (row.available || 0).toFixed(1)
                    )} COP`}
                  />
                </ListItem>
                <Divider />
              </div>
            ) : (
              <></>
            );
          })}
        </List>
      </Stack>
    </Dialog>
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

BasketUserDetail.propTypes = {
  basketId: PropTypes.number,
  user: PropTypes.object,
  handleClose: PropTypes.func,
  open: PropTypes.bool
};