import React from 'react';
import { Dialog, Card, CardContent, Button, Slide, Divider, Grid, Typography, IconButton, Stack } from '@mui/material';
import PropTypes from 'prop-types'
import CloseIcon from '@mui/icons-material/Close';

const SpotOrderConfirmation = ({ openDialog, closeDialog, info, handleConfirmation }) => {
  console.log(info)

  return (
    info ? <Dialog
      open={openDialog}
      onClose={closeDialog}
      TransitionComponent={Transition}
    >
      <Card>
        <CardContent>
          <Stack direction='row' justifyContent='space-between' alignItems='center'>
            <Typography variant='h6' ml='0.2em'>
              Cuenta: <strong>{info.account}</strong>
            </Typography>
            <IconButton
              edge='start'
              color='inherit'
              onClick={() => {
                closeDialog();
              }}
              aria-label='close'
              id='closeButton'
              size="large">
              <CloseIcon />
            </IconButton>
          </Stack>
          <Divider />
          <Grid container m='1em 0'>
            <Grid item xs={6}>
              <Typography variant='h6' ml='0.2em'>
                Par: <strong>{info.base} / {info.quote}</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='h6' ml='0.2em'>
                Side: <strong>{info.side}</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='h6' ml='0.2em'>
                Type: <strong>{info.type}</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='h6' ml='0.2em'>
                Precio: {info.options.price ? <strong>{info.options.price}</strong> : <strong>{info.price}</strong>}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='h6' ml='0.2em'>
                Unidades: {info.options.quantity ? <strong>{info.options.quantity}</strong> : info.options.price ? Number(info.options.quoteOrderQty) / Number(info.options.price) : Number(info.options.quoteOrderQty) / Number(info.price)}
              </Typography>
            </Grid>
            {info.type === 'STOP_LOSS_LIMIT' && <Grid item xs={6}>
              <Typography variant='h6' ml='0.2em'>
                Stop: {info.options.stopPrice ? <strong>{info.options.stopPrice}</strong> : <strong>{info.price}</strong>}
              </Typography>
            </Grid>}
            <Grid item xs={6}>
              <Typography variant='h6' ml='0.2em'>
                Total: {info.options.quoteOrderQty ? <strong>{info.options.quoteOrderQty}</strong> : info.options.price ? Number(info.options.quantity) * Number(info.options.price) : Number(info.options.quantity) * Number(info.price)}
              </Typography>
            </Grid>
          </Grid>
          <Button color='third'
            variant='contained'
            onClick={() => {
              delete info.price;
              handleConfirmation(info)
            }}
            id='place-sportOrder'
            sx={{ m: '1em 0 0 0' }}
            fullWidth>
            Confirmar
          </Button>
        </CardContent>
      </Card>
    </Dialog > : <></>
  )
}

SpotOrderConfirmation.propTypes = {
  openDialog: PropTypes.bool,
  closeDialog: PropTypes.func,
  info: PropTypes.object,
  handleConfirmation: PropTypes.func
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default SpotOrderConfirmation;