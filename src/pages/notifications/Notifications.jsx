import { Divider, Grid, Typography, Stack, IconButton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { getApi } from '../../components/api/apiManager';
import SubHeading from '../../components/common/utils/SubHeading';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import NotificationItem from '../../components/common/notifications/NotificationItem';
import { useMediaQuery } from 'react-responsive';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { sendMessage } from '../../components/api/messageManager';
import { useToastContext } from '../../providers/ToastProvider';
import ReportProblemDialog from '../../components/common/dialogs/ReportProblemDialog';

const Notifications = ({ requestFilter, userInfo }) => {
  const [notifications, setNotifications] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 900px)' });
  const types = {
    0: { subject: 'All', msg: '' }, 1: { subject: 'Partial Withdrawal', msg: 'requested a partial withdrawal' }, 2: { subject: 'Buy', msg: 'requested to add funds' }, 3: { subject: 'Join Basket', msg: 'requested to join new basket' }, 4: { subject: 'Report Problem', msg: 'requested a problem to be fixed' }
  }
  const toast = useToastContext()

  const closeDialog = () => {
    setOpenDialog(false);
  };

  const handleRequest = () => {
    if (requestFilter === 4) {
      setOpenDialog(true);
    }
    else {
      sendRequest();
    }
  }

  const sendRequest = () => {
    const date = new Date().toLocaleString();
    sendMessage(toast, {
      user: userInfo.id,
/*       date: date,
 */      type: requestFilter,
      state: 1,
      subject: types[requestFilter].subject,
      msg: `${userInfo.name} ${userInfo.lastName} ${types[requestFilter].msg} ${date}`
    })
  }

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const data = await getApi(
          `next-activos/findRequestByUser/${userInfo.id}`
        );
        data.push({
          date: '2022-03-07T14:51:03.000Z',
          id: 99,
          state: 1,
          type: {
            id: 3,
            name: 'New Basket Request',
            description: 'Ask to be part of one of our baskets',
          },
        });
        setNotifications(data);
      } catch (err) {
        console.log(err);
      }
    };
    getNotifications();
  }, []);

  return (
    <>
      <Grid item xs={12} md={10}>
        <SubHeading title={types[requestFilter].subject + ' Requests'} requestFilter={requestFilter} handleRequest={handleRequest} />
        <Grid container sx={{ pb: { xs: '40px', md: '0' }, margin: isMobile ? "0.5em 0.8em" : '0 3.5em 1em 3.5em' }}>
          {notifications.length > 0 ? (
            notifications.filter((notification) => requestFilter !== 0 ? notification.type.id === requestFilter : true)
              .map((notification) => (
                <Grid key={notification.id} item xs={12} md={10}>
                  <NotificationItem
                    state={notification.state}
                    title={notification.type.name}
                    secondaryText={notification.type.description}
                    date={notification.date}
                  />
                  <Divider />
                </Grid>
              ))
          ) : (
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                margin: { md: '5em', xs: '2em' },
                textAlign: 'center',
                verticalAlign: 'middle',
                color: (theme) => theme.palette.text.disabled,
              }}
            >
              <NotificationsNoneOutlinedIcon fontSize='large' />
              <Typography variant='h5'>
                {"You don't have notifications"}
              </Typography>
            </Grid>
          )}
          {isMobile && requestFilter !== 0 && <Grid item xs={12}>
            <Stack direction='row' alignItems='center' >
              <IconButton onClick={() => handleRequest()} sx={{ borderRadius: '12px', border: '2px solid', borderColor: theme => theme.palette.third.main, p: '0.5em 4.5em', margin: '0 auto' }}>
                <Typography sx={{ color: theme => theme.palette.primary.main, fontSize: 17 }}>
                  <strong>{'New Request'}</strong>
                </Typography>
                <AddBoxOutlinedIcon sx={{ borderRadius: '5px', color: theme => theme.palette.third.main, bgcolor: theme => theme.palette.primary.main, marginLeft: '15px', fontSize: 22 }} />
              </IconButton>
            </Stack>
          </Grid>}
        </Grid>
      </Grid>
      <ReportProblemDialog openDialog={openDialog} closeDialog={closeDialog} userInfo={userInfo} toast={toast} />
    </>
  );
};

Notifications.propTypes = {
  requestFilter: PropTypes.number,
  userInfo: PropTypes.object,
};

export default Notifications;
