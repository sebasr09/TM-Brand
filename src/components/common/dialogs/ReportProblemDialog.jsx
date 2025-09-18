import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Card, CardContent, Divider, Slide, Button, TextField, Container } from '@mui/material';
import PagesHeaderBar from '../PagesHeaderBar';
import { sendMessage } from '../../api/messageManager';

const ReportProblemDialog = ({ openDialog, closeDialog, userInfo, toast }) => {

  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  const sendRequest = () => {
    const date = new Date().toLocaleString();
    sendMessage(toast, {
      user: userInfo.id,
/*       date: date,
 */   type: 4,
      state: 1,
      subject: subject,
      msg: `${userInfo.name} ${userInfo.lastName} reported this issue: ${description} ${date}`
    })
    .then( () => {
      closeDialog();
    })
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
            title='Report Problem'
            subTitle='Please tell us what problem are you experiencing'
          />
          <Divider />
          <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <TextField
              type='text'
              variant='outlined'
              margin='normal'
              sx={{ width: { xs: 280, sm: 500 } }}
              label='Subject'
              name='Subject'
              autoComplete='Subject'
              autoFocus
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
            />

            <TextField
              rows={4}
              variant='outlined'
              margin='normal'
              sx={{ width: { xs: 280, sm: 500 }, marginBottom: '1.5em'}}
              label='Description'
              name='Description'
              autoComplete='Description'
              autoFocus
              multiline
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <Button
              variant='contained'
              color='primary'
              fullWidth
              onClick={() => {
                sendRequest()
              }}
            >
              Submit
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

ReportProblemDialog.propTypes = {
  openDialog: PropTypes.bool,
  closeDialog: PropTypes.func,
  userInfo: PropTypes.obj,
  toast: PropTypes.obj
}

export default ReportProblemDialog;