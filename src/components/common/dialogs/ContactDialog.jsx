import React, { useState } from 'react';
import { Dialog, Card, CardContent, Divider, Slide, Button, TextField, Container, Checkbox, FormControlLabel, Typography, Stack } from '@mui/material';
import PagesHeaderBar from '../PagesHeaderBar';
import PropTypes from 'prop-types';
import TermsAndConditionsDialog from '../TermsAndConditionsDialog';
import { sendContactMessage } from '../../api/messageManager';

const ContactDialog = ({ openDialog, closeDialog, handleNotify }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);
  const [error, setError] = useState(false);

  const handleClickOpen = () => {
    setOpenTerms(true);
  };

  const handleClose = () => {
    setOpenTerms(false);
  };

  const handleSubmit = () => {
    if (checkbox) {
      sendContactMessage({
        subject: 'Contact Request',
        msg: `A potential client has requested to contact us.\n -Name: ${name}. \n -Email: ${email}. \n -Phone number: ${number}.`,
        name: name,
        email: email,
        number: number,
        description: ''
      }).then((message) => handleNotify(message))
      ;
      closeDialog();
    }
    else {
      setError(true);
    }
  }

  return (
    <Dialog
      open={openDialog}
      onClose={closeDialog}
      TransitionComponent={Transition}
      keepMounted
    >
      <Card sx={{ bgcolor: theme => theme.palette.secondary.light }}>
        <CardContent >
          <PagesHeaderBar
            title='Contáctanos'
          />
          <Divider />
          <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <TextField
              required
              type='text'
              variant='outlined'
              margin='normal'
              sx={{ width: { xs: 280, sm: 350 }, marginTop: '1.5em' }}
              label='Nombre'
              name='Name'
              autoComplete='Name'
              autoFocus
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <TextField
              required
              type='email'
              variant='outlined'
              margin='normal'
              sx={{ width: { xs: 280, sm: 350 } }}
              label='Email'
              name='Email'
              autoComplete='Email'
              autoFocus
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              required
              type='number'
              variant='outlined'
              margin='normal'
              sx={{ width: { xs: 280, sm: 350 } }}
              label='Celular o teléfono'
              name='Phone Number'
              autoFocus
              value={number}
              onChange={(event) => setNumber(event.target.value)}
            />
            <Stack direction='row' sx={{ alignItems: 'center', justifyContent: 'stretch', alignSelf: 'start', ml: { xs: 0, sm: '1em' }, mb: '1em', border: error ? '1px solid red' : '', p: '0 0.4em' }}  >
              <FormControlLabel control={<Checkbox required />} label={'Acepto los '} sx={{ mr: '0.2em' }} onChange={(event) => {
                setCheckbox(event.target.checked);
                setError(false)
              }} />
              <Typography><a href='https://docs.trademate.tech/manejo-de-cuenta/terminos-y-condiciones' target='_blank' rel="noreferrer"> <strong> Términos y Condiciones</strong></a></Typography>
            </Stack>
            <Typography></Typography>

            <Button
              variant='contained'
              color='primary'
              fullWidth
              onClick={() => {
                handleSubmit()
              }}
            >
              Enviar
            </Button>
          </Container>
        </CardContent>
      </Card>
    </Dialog>
  )
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

ContactDialog.propTypes = {
  openDialog: PropTypes.bool,
  closeDialog: PropTypes.func,
  handleNotify: PropTypes.func
}

export default ContactDialog;