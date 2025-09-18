import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Stack } from '@mui/material';
import Colors from '../../../constants/Colors';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const NoBasketOverview = () => {
  return (
    <Container component='main' maxWidth='md' >
      <Grid container alignItems='center' justifyContent="center" sx={{
        display: 'flex',
        justifyContent: 'left'
      }}>
        <Grid item xs={12} lg={10} sx={{ margin: '1em auto' }}>
          <Card sx={{ borderRadius: '25px', bgcolor: theme => theme.palette.secondary.dark }}>
            <CardContent>
            <Stack margin='1em 0' alignItems='center'>

              <Typography
                component='div'
                variant='h6'
                fontWeight='Bold'
                marginBottom='0.4em'
              >
                You don&apos;t have a <span color='#21dab9'> basket </span> yet.
              </Typography>
              <Typography
                component='div'
                variant='h6'
                fontWeight=''
              >
                 Want to invest in one?
              </Typography>
              <AddCircleIcon sx={{ color: theme=> theme.palette.action.selected, fontSize: 40, marginTop:'0.2em'}} />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default NoBasketOverview;