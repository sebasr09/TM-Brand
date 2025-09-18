import {
  Badge,
  ClickAwayListener,
  Divider,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@mui/styles';

import Colors from '../../../constants/Colors';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PropTypes from 'prop-types';

const StyledBadge = withStyles({
  root: {
    color: Colors.white
  },
  badge: {
    backgroundColor: Colors.accent
  }
})(Badge);

export default function Notifications({ notifications, markAsRead }) {
  const classes = useStyles();
  const [openNotifications, setOpenNotifications] = useState(false);
  const anchorRef = React.useRef(null);

  useEffect(() => {
    notifications.length && setOpenNotifications(true);
  }, [notifications.length]);

  const handleClose = () => {
    markAsRead();
    setOpenNotifications(false);
  };

  const handleToggle = () => {
    setOpenNotifications((prevOpen) => !prevOpen);
  };

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenNotifications(false);
    }
  };

  return (
    <div className={classes.notificationsBadge}>
      <IconButton
        sx={{mr: 2}}
        aria-label='notifications'
        ref={anchorRef}
        onClick={handleToggle}
        color='white'
        >
        <StyledBadge badgeContent={notifications.filter((notif) => notif.notRead).length}>
          <NotificationsIcon />
        </StyledBadge>
      </IconButton>
      <Popper
        open={openNotifications}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        id='notifications'>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={openNotifications}
                  id='menu-list-grow'
                  onKeyDown={handleListKeyDown}
                  paperprops={{
                    style: {
                      maxHeight: 400
                    }
                  }}>
                  {notifications.length > 0 ? (
                    notifications.slice(0, 4).map((notification, index) => {
                      var hours = new Date(notification.issueDate).getHours();
                      var minutes = new Date(notification.issueDate).getMinutes();

                      hours = hours < 10 ? '0' + hours : hours;
                      minutes = minutes < 10 ? '0' + minutes : minutes;

                      var time = hours + ':' + minutes;
                      return (
                        <MenuItem onClick={handleClose} key={index} id='closeNotification'>
                          <Paper elevation={0} className={classes.notificationPaper} id={`notification${index}`}>
                            <Typography className={classes.title}>{notification.title}</Typography>
                            <Typography>{notification.message}</Typography>
                            <Typography align='right'>{time}</Typography>
                            <Divider variant='fullWidth' className={classes.divider} />
                          </Paper>
                        </MenuItem>
                      );
                    })
                  ) : (
                    <MenuItem onClick={handleClose} id='closeNotification'>
                      <Typography>No hay notificaciones disponibles.</Typography>
                    </MenuItem>
                  )}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

const useStyles = makeStyles(() => ({
  notificationsBadge: {
    
  },
  notificationPaper: {
    width: '100%'
  },
  title: {
    fontWeight: 'bold'
  },
  divider: {
    width: '100%'
  }
}));

Notifications.propTypes = {
  notifications: PropTypes.array,
  markAsRead: PropTypes.func
};
