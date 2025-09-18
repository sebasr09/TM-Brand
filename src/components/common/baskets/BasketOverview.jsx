import React, { useState, useEffect } from "react";
import { Container, Grid, Card, CardContent, Typography, Stack, IconButton, Button } from "@mui/material"
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import PagesHeaderBar from "../PagesHeaderBar";
import Colors from "../../../constants/Colors";
import { formatNumber } from '../../../utils';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';

const BasketOverview = ({ total, change, initial, userInfo }) => {

  const options = {
    plugins: {
      legend: {
        display: false
      },
      tooltips: {
        display: false,
        enabled: false
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false
      },
    },
    maintainAspectRatio: false,
  };

  const pooly = { lineData: [ 22, 29, 30, 41] }


  return (
    <div >
      <Container component='main' maxWidth='md' >
        <Grid container alignItems='center' justifyContent="center" sx={{
          display: 'flex',
          justifyContent: 'left'
        }}>
          <Grid item xs={12} lg={12} sx={{ margin: '1em auto' }}>
            <Card sx={{
              borderRadius: '25px', bgcolor: theme => theme.palette.white.main, pt: '0.5em', height: '302px'
            }}>
              <CardContent>
                <PagesHeaderBar title='Investment Summary'
                  options={[
                    {
                      icon:
                        <></>
                      , action: () => { }, text: ''
                    },
                  ]} />
                <Grid container alignItems="center" sx={{ p: '2.3em 0 0.7em 0' }}>
                  <Grid item xs={1}>

                  </Grid>
                  <Grid item xs={10}>
                    <Stack alignItems='center' margin='0.5em 0 0.5em 0'>
                      <Typography
                        variant='h4'
                        fontWeight='bold'
                        color={`${change > 0 ? 'green' : 'red'}`}
                      >
                        {formatNumber(change.toFixed(2))} %
                      </Typography>
                      <Typography variant='h6' color={Colors.accent}>
                        <strong>Current:</strong> {formatNumber(total.toFixed(0))} USD
                      </Typography>
                      <Typography variant='h6' color={Colors.accent}>
                        <strong>Invested:</strong> {formatNumber(initial.toFixed(0))} USD
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={1} >

                  </Grid>
                </Grid>
                {/* <Stack direction='row' alignItems='center'>
                  <IconButton onClick={() => setOpenDialog(true)} sx={{borderRadius: '24px',}}>
                    <AddCircleIcon sx={{ color: theme=> theme.palette.action.selected, fontSize: 40 }} />
                    <Typography variant='h7' color='white' marginLeft='7px'>
                      Allocate Funds!
                    </Typography>
                  </IconButton>
                </Stack>
                <Button variant="contained" fullWidth sx={{
                  borderRadius: '24px',
                  backgroundColor: theme => theme.palette.action.selected,
                  color: theme => theme.palette.primary.main,
                  '&:hover': {
                    color: theme => theme.palette.text.primary
                  }
                }} onClick={() => {
                  setOpenDetailDialog(true)
                }}>Details</Button> */}
              </CardContent>
              <Container sx={{ bgcolor: '#f0f0f0', height: '90px' }}>
                <Line data={{ labels: pooly.lineData, datasets: [{ data: pooly.lineData, borderColor: '#21dab9', backgroundColor: '#f0f0f0', pointRadius: 0, borderWidth: 1 }] }} options={options} />
              </Container>
            </Card>
          </Grid>
        </Grid>
        {/*         <BasketUserDetail user={userInfo} basketId={basket.basket.id} open={openDetailDialog} handleClose={closeDetailDialog} />
 */}      </Container>
    </div>
  )
}

BasketOverview.propTypes = {
  total: PropTypes.number,
  change: PropTypes.number,
  initial: PropTypes.number,
  userInfo: PropTypes.object,
};

export default BasketOverview;