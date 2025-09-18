import { Grid, Typography } from "@mui/material"
import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import BasketOverview from '../../components/common/baskets/BasketOverview';
import Baskets from '../baskets/Baskets';
import { binancePostApi, getApi } from "../../components/api/apiManager";
import SubHeading from "../../components/common/utils/SubHeading";
import BasketSummary from '../../components/common/baskets/BasketSummary';
import Kyc from "../settings/Kyc";

const Overview = ({ user, userInfo,triggerSessionValidation }) => {
  const [baskets, setBaskets] = useState([{ basket: { name: 'loading...' }, transactions: [], totalUnits: 0, change: 0, totalInvestment: 0, price: 0, currentInvestment: 0 }]);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [initialInvestment, setInitialInvestment] = useState(0);
  const [changeInvestment, setChangeInvestment] = useState(0);

  const handleNumbers = () => {
    const totalTemp = baskets.length ? baskets.map((basket) => basket.currentInvestment).reduce((a, b) => a + b) : 0;
    setTotalInvestment(totalTemp)
    const initialTemp = baskets.length ? baskets.map((basket) => basket.totalInvestment).reduce((a, b) => a + b) : 0;
    setInitialInvestment(initialTemp)
    setChangeInvestment(100 * (totalTemp / initialTemp - 1))
  }

  useEffect(() => {
    const getCoins = async () => {
      //setOpenBackdrop(true);
      try {
        const response = await getApi(`next-activos/findUserStatesByUser/${userInfo.id}`);
        if (response.length) {
          let basks = []
          await new Promise((resolve, reject) => {
            const promises = response.map(async (bask) => {
            if (bask.basket.shortName == 'TM'){
              const state = await getApi(`next-activos/getLastBasketState/${bask.basket.id}`)
              bask.price = Number(state.totalFunds) / Number(state.totalUnits)
              bask.currentInvestment = bask.totalUnits * bask.price
            }
            else if (bask.basket.shortName == 'TRUST'){
              const price = await binancePostApi('next-activos/getTickerPrices', { symbols: ['BTCBUSD'], account: 'BTC' })
              bask.price = Number(price[0].price)
              bask.currentInvestment = bask.totalUnits * bask.price
            }
            else {
              bask.price = 1
              bask.currentInvestment = bask.totalUnits * bask.price
            }
            basks.push(bask)
          })
          Promise.all(promises).then((value) => {
            resolve(value);
          });
          });
          setBaskets(basks)
        } else {
          setBaskets([{ basket: { name: "Empty Basket" }, totalUnits: 0, change: 0, totalInvestment: 0, price: 0, currentInvestment: 0 }]);
        }
        /* setUserInfo((previous) => {
          let newObject = { ...previous };
          newObject.balance = 0;
          return newObject;
        }) */
      } catch (err) {
        console.log(err);
        //setOpenError(true);
        //setErrorMessage('No fue posible cargar la lista de activos. Intenta de nuevo más tarde.');
      } finally {
        // setOpenBackdrop(false);
        //totalChange();
      }
    };
    getCoins();
  }, []);
  return (
    <Grid container>
     { userInfo.kycid === "2" ?
      (<> <Grid item xs={12} md={4}>
        <BasketOverview total={totalInvestment} change={changeInvestment} initial={initialInvestment} userInfo={userInfo} />
      </Grid>
      <Grid item xs={12} md={8}>
        <BasketSummary baskets={baskets} userInfo={userInfo} handleNumbers={handleNumbers} />
      </Grid> </>)
      :
      <Kyc userInfo={userInfo} triggerSessionValidation={triggerSessionValidation} />}
    </Grid>
  )
}

Overview.propTypes = {
  user: PropTypes.object,
  userInfo: PropTypes.object,
  triggerSessionValidation: PropTypes.func,
};

export default Overview