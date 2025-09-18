import React, { useState, useEffect } from 'react';
import BasketOverview from './BasketOverview';
import NoBasketOverview from './NoBasketOverview';
import { PropTypes } from 'prop-types';
import { getApi } from "../../api/apiManager";


const BasketCarousel = ({ userInfo, basket}) => {
  


  const showBasket = () => {
    if (basket){
      return <BasketOverview basket={basket} userInfo={userInfo} />
    }
    return <NoBasketOverview />

  }

  return (
    <div>
      {showBasket()}
    </div>

  )

}

BasketCarousel.propTypes = {
  userInfo: PropTypes.object,
  basket: PropTypes.object
};

export default BasketCarousel;