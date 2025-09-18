import { Stack, List, ListItem, ListItemText, Container, CardContent, Card, Grid, IconButton, Divider, Typography, Collapse } from "@mui/material";
import React, { useRef, useEffect, useState } from "react";
import { Doughnut } from 'react-chartjs-2';
import CIcon from "react-crypto-icons";
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { getApi, postApi } from "../../api/apiManager";
import LoadingBackdrop from "../../common/LoadingBackdrop";
import ErrorSnackbar from "../../common/ErrorSnackbar";
import SuccessSnackbar from "../../common/SuccessSnackbar";
import Colors from '../../../constants/Colors';
import { getBackgrounds } from "../../../utils";
import BasketSummary from "./BasketSummary";
import PagesHeaderBar from "../../common/PagesHeaderBar";
import { Logout } from "@mui/icons-material";
const USD_COP = 3800;

export default function InvestmentView({ setUserInfo, userInfo }) {
  const classes = useStyles();
  const [cryptosList, setCryptosList] = useState([]);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [total, setTotal] = useState(0);
  const [doughnutData, setDoughnutData] = useState({});
  const [baskets, setBaskets] = useState([]);
  const pairs = [
    { pair: "XETCZUSD", short_name: "ETC" },
    { pair: "XXLMZUSD", short_name: "XLM" },
    { pair: "XDGUSDT", short_name: "DOGE" },
    { pair: "XBTUSDT", short_name: "BTC" }
  ]

  const calculateData = async () => {
    const filtered = cryptosList.filter(c => {
      if (c.available && c.available > 0) return c;
    });
    const data = {
      labels: filtered.map(c => c.short_name),
      datasets: [
        {
          label: 'Saldos',
          data: filtered.map(c => c.USD_current_price),
          backgroundColor: getBackgrounds(15)
        }
      ]
    }
    setDoughnutData(data);
  }

  const handleCloseError = () => {
    setOpenError(false);
    setErrorMessage('');
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
    setSuccessMessage('');
  };

  const findNamePerPair = function (pair) {
    const found = pairs.find((element) => {
      return element.pair == pair;
    });
    if (found) return found.short_name;
    else return undefined;
  }

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

  const notifyLiquidateBasket = async (msj) => {
    try {
      setOpenBackdrop(true);
      await getApi(`next-activos/liquidateBasketAlert/${baskets[0].basket.id}/${userInfo.id}/${msj} `)
      setSuccessMessage('Tu asesor comercial se comunicará contigo proximamente')
      setOpenSuccess(true)
    } catch (error) {
      console.log(error);
      setOpenError(true);
      setErrorMessage('No fue posible cargar la lista de activos. Intenta de nuevo más tarde.');
    } finally {
      setOpenBackdrop(false);
    }
  }

  useEffect(() => {
    const getCoins = async () => {
      setOpenBackdrop(true);
      try {
        const response = await getApi(`next-activos/getUserBasketTransactions/${userInfo.id}`);
        const newBaskets = await groupByBasket(response);
        setBaskets(newBaskets);
        setUserInfo((previous) => {
          let newObject = { ...previous };
          newObject.balance = 0;
          return newObject;
        })
      } catch (err) {
        console.log(err);
        setOpenError(true);
        setErrorMessage('No fue posible cargar la lista de activos. Intenta de nuevo más tarde.');
      } finally {
        setOpenBackdrop(false);
        //totalChange();
      }
    };
    getCoins();
  }, []);

  useEffect(() => {
    calculateData();
    //getTotal();
  }, [cryptosList])

  useEffect(() => {
    //totalChange();
  }, [cryptosList, total])

  return (
    <div className={classes.root}>
      <Container component='main' maxWidth='md'>
        <LoadingBackdrop open={openBackdrop} />
        <ErrorSnackbar open={openError} message={errorMessage} handleClose={handleCloseError} id='errorSnackbar' />
        <SuccessSnackbar
          open={openSuccess}
          message={successMessage}
          handleClose={handleCloseSuccess}
          id='successSnackbar'
        />
        <Grid container alignItems="center" justifyContent="center" className={classes.container}>
          <Grid item xs={12} lg={10} className={classes.centerContainer}>
            <Card>
              <CardContent>
                <PagesHeaderBar title='Tus inversiones' subTitle='El detalle de tus inversiones.'
                  options={[
                    { icon: <Logout />, text: 'Retiro Total', action: () => notifyLiquidateBasket('total'), disabled: true},
                    { icon: <Logout />, text: 'Retiro de Rendimientos', action: () => notifyLiquidateBasket('rendimientos'), disabled: false },
                  ]} />
                <Divider />
                
                {baskets.map((row, index) => {
                  return (
                    <BasketSummary key={index} basketInfo={row} setUserInfo={setUserInfo} userInfo={userInfo} />
                  )
                })}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
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

InvestmentView.propTypes = {
  setUserInfo: PropTypes.func,
  userInfo: PropTypes.Object
};
