import React from 'react';
import { Card, CardContent, Grid, Typography, Stack, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import CIcon from 'react-crypto-icons';
import { DeleteForever } from '@mui/icons-material';

const SpotOrder = ({ order, id, cancelOrder }) => {
  const closedDate = new Date(Number(order.updateTime));
  const openDate = new Date(Number(order.transactTime));

  return (
    <Card fullWidth sx={{ m: '0.5em' }}>
      <CardContent>
        <Grid container m='0 2em 0 1.5em'>
          <Grid item xs={1}>
            <Stack>
              <Typography variant='h7' pl='0.6em'>
                <strong>{id + 1}</strong>
              </Typography>
              <Typography variant='h7'>
                <strong>{order.account}</strong>
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={2} ml='1em' >
            <Stack>
              <Typography variant='h7'>
                <strong>{order.symbol}</strong>
              </Typography>
              <Typography variant='h7'>
                {`${order.type} / ${order.side}`}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={2}>
            <Stack>
              <Typography variant='h7'>
                <strong>{order.updateTime !== 'NULL' ? `${closedDate.getMonth() + 1}/${closedDate.getDate()}/${closedDate.getFullYear()}` : 'Pendiente'}</strong>
              </Typography>
              <Typography variant='h7'>
                {order.updateTime !== 'NULL' ? `${closedDate.getHours() === 12 ? 12 : closedDate.getHours() % 12}:${openDate.getMinutes() < 10 ? '0' + openDate.getMinutes() : openDate.getMinutes()} ${closedDate.getHours() > 12 ? 'PM' : 'AM'}` : ''}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={2}>
            <Stack>
              <Stack direction='row' alignItems='center'>
                {order.base && <CIcon
                  name={order.base.toLowerCase()}
                  size={18}
                />}
                <Typography variant='h7' ml='0.5em'>
                  {order.base ? order.base + ': ' : 'Base: '}<strong>{order.origQty}</strong>
                </Typography>
              </Stack>

              <Typography variant='h7'>
                {'Precio: '}<strong>{order.price}</strong>
              </Typography>
              {order.type === 'STOP_LOSS_LIMIT' && <Typography variant='h7'>
                {'Stop: '}<strong>{order.stopPrice}</strong>
              </Typography>}

            </Stack>
          </Grid>
          <Grid item xs={2}>
            <Stack>
              <Typography variant='h7'>
                {'Estado: '}<strong>{order.status}</strong>
              </Typography>
              <Typography variant='h7'>
                {`Creado: ${openDate.getMonth() + 1}/${openDate.getDate()}/${openDate.getFullYear()} ${openDate.getHours() === 12 ? 12 : openDate.getHours() % 12}:${openDate.getMinutes() < 10 ? '0' + openDate.getMinutes() : openDate.getMinutes()} ${openDate.getHours() > 12 ? 'PM' : 'AM'}`}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={2}>
            <Stack>
              <Stack direction='row' alignItems='center'>
                {order.base && <CIcon
                  name={order.base.toLowerCase()}
                  size={18}
                />}
                <Typography variant='h7' ml='0.5em'>
                  {order.base ? order.base + ': ' : 'Base: '}<strong>{order.executedQty}</strong>
                </Typography>
              </Stack>
              <Stack direction='row'>
                {order.quote && <CIcon
                  name={order.quote.toLowerCase()}
                  size={18}
                />}
                <Typography variant='h7' ml='0.5em'>
                  {order.quote ? order.quote + ': ' : 'Quote: '}<strong>{order.cummulativeQuoteQty}</strong>
                </Typography>
              </Stack>
              <Typography variant='h7' >
                {'Precio: '}<strong>{Number(order.executedQty) > 0 ? order.cummulativeQuoteQty / order.executedQty : 0}</strong>
              </Typography>
            </Stack>
          </Grid>
          {(order.type === 'LIMIT' || order.type === 'STOP_LOSS_LIMIT') && order.status === 'NEW' && <Grid item xs={1} ml='-1em'>
            <IconButton onClick={() => {
              cancelOrder(order);
            }}
              sx={{
                padding: 1.5,
                backgroundColor: (theme) => theme.palette.white.main,
                transition: '0.2s',
                '&:hover': {
                  background: (theme) => theme.palette.secondary.main,
                },
              }}
              size='small'
            >
              <DeleteForever />
            </IconButton>
          </Grid>}
        </Grid>
      </CardContent>
    </Card>
  )
}

SpotOrder.propTypes = {
  order: PropTypes.object,
  id: PropTypes.number,
  cancelOrder: PropTypes.func
}

export default SpotOrder;