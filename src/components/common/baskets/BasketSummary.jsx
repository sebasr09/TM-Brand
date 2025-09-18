import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, Stack, IconButton, Button } from "@mui/material"
import PagesHeaderBar from "../PagesHeaderBar";
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { useMediaQuery } from 'react-responsive';
import { PropTypes } from 'prop-types';
import BasketCard from "./BasketCard";
import InvestDialog from '../dialogs/InvestDialog';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { formatNumber } from '../../../utils';

const BasketSummary = ({ baskets, userInfo, handleNumbers }) => {

  const isMobile = useMediaQuery({ query: '(max-width: 900px)' });
  const [openDialog, setOpenDialog] = useState(false);
  const [stacked, setStacked] = useState(0);
  const [selectedBasket, setSelectedBasket] = useState(baskets[0]);
  const [selectedTotal, setSelectedTotal] = useState(0);
  const [selectedInitial, setSelectedInitial] = useState(0);
  const [selectedUnits, setSelectedUnits] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState(0);

  const closeDialog = () => {
    setOpenDialog(false);
    setStacked(0);
  };

  const handleSelection = (basket) => {
    setSelectedBasket(basket);
    setSelectedTotal(basket.currentInvestment);
    setSelectedInitial(basket.totalInvestment);
    setSelectedUnits(basket.totalUnits);
    setSelectedPrice(basket.price);
  }


  useEffect(() => {
    setSelectedBasket(baskets[0])
  }, [baskets])


  return (
    <Container component='main' maxWidth='md' >

      <Card sx={{
        borderRadius: '20px', bgcolor: theme => theme.palette.third.main, margin: '1em auto', p: '0.5em'
      }}>
        <CardContent>
          <PagesHeaderBar title='Basket Performance' subTitle={selectedBasket.basket.name}
            options={[
              {
                icon:
                  <></>
                , action: () => { },
              },
            ]} />
          <Grid container marginTop='1em'>
            <Grid item xs={6} md={3}>
            <Stack>
              <Typography
                variant='h7'
                sx={{
                  fontWeight: 'bold',
                  color: (theme) => theme.palette.primary.main,
                }}

              >
                Current Value
              </Typography>
              <Typography
                variant='h5'
                sx={{
                  fontWeight: 'bold',
                  color: (theme) => theme.palette.primary.main,
                  marginTop: '0.5em'
                }}

              >
                ${formatNumber(selectedTotal.toFixed(0))}
              </Typography>
            </Stack>
            </Grid>
            <Grid item xs={6} md={3}>

            <Stack justifyContent='space-between'>
              <Typography
                variant='h7'
                sx={{
                  fontWeight: 'bold',
                  color: (theme) => theme.palette.primary.main,
                }}

              >
                Invested Value
              </Typography>

              <Typography
                variant='h6'
                sx={{
                  fontWeight: 'bold',
                  color: (theme) => theme.palette.primary.main,
                  marginTop: '0.5em'

                }}

              >
                ${formatNumber(selectedInitial.toFixed(0))}
              </Typography>
              
            </Stack>
            </Grid>
            <Grid item xs={6} md={3}>
            <Stack>
              <Typography
                variant='h7'
                sx={{
                  fontWeight: 'bold',
                  color: (theme) => theme.palette.primary.main,
                }}

              >
                Total Units
              </Typography>
              <Typography
                variant='h5'
                sx={{
                  fontWeight: 'bold',
                  color: (theme) => theme.palette.primary.main,
                  marginTop: '0.5em'
                }}

              >
                {formatNumber(selectedUnits.toFixed(4))}
              </Typography>
            </Stack>
            </Grid>
            <Grid item xs={6} md={3}>

            <Stack justifyContent='space-between'>
              <Typography
                variant='h7'
                sx={{
                  fontWeight: 'bold',
                  color: (theme) => theme.palette.primary.main,
                }}

              >
                Current Price
              </Typography>

              <Typography
                variant='h6'
                sx={{
                  fontWeight: 'bold',
                  color: (theme) => theme.palette.primary.main,
                  marginTop: '0.5em'

                }}

              >
                ${formatNumber(selectedPrice.toFixed(2))}
              </Typography>
              
            </Stack>
            </Grid>

            {/* <Button variant="contained"  sx={{
                  borderRadius: '20px',
                  width: '300px',
                  backgroundColor: theme => theme.palette.primary.main,
                  color: theme => theme.palette.third.main,
                   '&:hover': {
                    color: theme => theme.palette.text.primary
                  } 
                }} onClick={() => {
                  setOpenDetailDialog(true) 
                }}>Details</Button> */}
          </Grid>

          <Grid container alignItems="center" sx={{ p: '18px 0' }}>

            {baskets.map((pool) =>
              <Grid key={pool.id} item xs={12} md={4}>
                <BasketCard basket={pool} userInfo={userInfo} handleSelection={handleSelection} selectedBasket={selectedBasket} handleNumbers={handleNumbers} />
              </Grid>
            )}
            <Grid item xs={12} md={4}>
              <Card sx={{
                margin: '0.5em 0.5em',
                bgcolor: theme => theme.palette.primary.main,
                borderRadius: '10px',
                height: '77px'
              }}>
                <Stack direction='row' alignItems='center' height='100%'>
                  <IconButton onClick={() => setOpenDialog(true)} sx={{ borderRadius: '24px', margin: 'auto'}}>
                    <AddCircleIcon sx={{ color: theme => theme.palette.third.main, fontSize: 30 }} />
                    <Typography  sx={{ color: theme => theme.palette.third.main, marginLeft: '7px', fontSize: 17 }}>
                      Allocate Funds!
                    </Typography>
                  </IconButton>
                </Stack>
                <InvestDialog openDialog={openDialog} closeDialog={closeDialog} stacked={stacked} setStacked={setStacked} basketName={selectedBasket.basket.name} user={userInfo} />
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card >
    </Container>
  )
}

BasketSummary.propTypes = {
  baskets: PropTypes.array,
  userInfo: PropTypes.obj,
  handleNumbers: PropTypes.func
};


export default BasketSummary;