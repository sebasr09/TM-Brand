import React from 'react';
import { PropTypes } from 'prop-types';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { styled } from '@mui/styles';
import {
  CheckCircleRounded,
  HighlightOffRounded,
  NotificationImportantRounded,
  TimelapseRounded,
} from '@mui/icons-material';

const NotificationListItem = styled(ListItem)(({ theme }) => ({
  color: theme.palette.white,
  '& .MuiListItemIcon-root': {
    textAlign: 'center',
    color: theme.palette.primary.main
  },
  '& .MuiSvgIcon-root': {
    margin: '0 auto',
    fontSize: 20
  },
}));

const NotificationItem = ({ state, title, secondaryText, date }) => {
  
  const getStateIcon = () => {
    switch (state) {
      case 1:
        return (
          <Stack>
            <TimelapseRounded />
            <Typography variant='caption'>In Review</Typography>
          </Stack>
        )
      case 2:
        return (
          <Stack>
            <CheckCircleRounded />
            <Typography variant='caption'>Resolved</Typography>
          </Stack>
        )
      case 3:
        return (
          <Stack>
            <HighlightOffRounded />
            <Typography variant='caption'>Cancelled</Typography>
          </Stack>
        )
      default:
        return <NotificationImportantRounded />;
    }
  }
  
  return (
    <NotificationListItem>
      <ListItemIcon>
        {getStateIcon()}
      </ListItemIcon>
      <ListItemText primary={title} secondary={secondaryText} />
      <Typography variant='caption' sx={{alignSelf: 'baseline'}}>{date.split('T')[0]}</Typography>
    </NotificationListItem>
  );
};

NotificationItem.propTypes = {
  state: PropTypes.number,
  title: PropTypes.string,
  secondaryText: PropTypes.string,
  date: PropTypes.string
};

export default NotificationItem;
