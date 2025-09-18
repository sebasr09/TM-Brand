import { Button, Card, CardActionArea, Grid, Stack, Typography } from "@mui/material"
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { KeyboardArrowUp } from "@mui/icons-material";
import { formatNumber } from '../../../utils';

const BasketCard = ({ basket, userInfo, handleSelection, selectedBasket, handleNumbers }) => {

  const [change, setChange] = useState(0);
  const [total, setTotal] = useState(0);

  if(selectedBasket === basket) handleSelection(basket);
  handleNumbers()
  basket.change = 100 * (basket.currentInvestment / basket.totalInvestment - 1);

  return (
    <Card sx={{
      margin: '0.5em 0.5em',
      bgcolor: '#89e2dc',
      borderRadius: '10px',
      border: selectedBasket === basket ? '2px solid' : '',
    }}
    onClick={() => handleSelection(basket)}
    >
      <CardActionArea sx={{ p: '0.5em' }}>
        <Grid container>
          <Grid item xs={2} md={2} sx={{
            bgcolor: '#89e2dc',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            margin: '0.5em 0.8em 0.5em 0.5em'
          }}>
            <img
              src={'/images/3d-coin-dynamic-color.png'}
              alt='Coin Icon'
              width='30'
              height='auto'
            />
          </Grid>
          <Grid item xs={6} md={6} sx={{
            padding: '0.5em'
          }}>
            <Stack>
              <Typography variant="h6" sx={{
                color: theme => theme.palette.primary.main,
                fontWeight: 'bold',
                overflow: 'hidden',
                maxHeight: '1.4em'
              }}>
                {basket.basket.name}
                <br />
              </Typography>
              <Stack direction='row'>
                <Typography variant="h6" sx={{
                  alignItems: 'center',
                  display: 'flex',
                  fontWeight: '500',
                  marginRight: '1em',
                  color: theme => theme.palette.primary.main,
                  'svg': {
                    color: theme => theme.palette.third.main
                  }
                }}><strong>${formatNumber(basket.currentInvestment.toFixed(2))}</strong> </Typography>
                <Typography variant="h7" sx={{
                  alignItems: 'center',
                  display: 'flex',
                  fontWeight: '500',
                  color: (100 * (basket.currentInvestment / basket.totalInvestment - 1)).toFixed(1) > 0 ? 'green' : 'red', 
                  'svg': {
                    color: theme => theme.palette.third.main
                  }
                }}><strong>{formatNumber((100 * (basket.currentInvestment / basket.totalInvestment - 1)).toFixed(1))}%</strong> </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  )
}

BasketCard.propTypes = {
  basket: PropTypes.object,
  userInfo: PropTypes.object,
  handleSelection: PropTypes.func,
  selectedBasket: PropTypes.object,
  handleNumbers: PropTypes.func
}


export default BasketCard