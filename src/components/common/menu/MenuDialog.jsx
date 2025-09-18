import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { styled } from '@mui/styles';
import {
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  Stack,
  Zoom,
} from '@mui/material';
import { getCurrentUser } from '../../../providers/UserProvider';
import { useToastContext } from '../../../providers/ToastProvider';

const SecondaryMenuOption = styled(ListItem)(({ theme }) => ({
  color: theme.palette.white
}));

const MenuContent = React.forwardRef(function MenuComponent(props, ref) {
  const toast = useToastContext()
  return (
    <Stack>
      {props.options.map((opt) => (
        <>
        <SecondaryMenuOption key={opt.label} onClick={() => {
          opt.label !== 'Logout' ? opt.action(getCurrentUser(), new Date().toLocaleString(), toast) : opt.action(props.triggerSessionValidation)
          props.setOpenTooltip(false);
          }}>
          <ListItemIcon>{opt.icon}</ListItemIcon>
          <ListItemText primary={opt.label} />
        </SecondaryMenuOption>
        <Divider />
        </>
        
      ))}
    </Stack>
  );
});

MenuContent.propTypes = {
  options: PropTypes.array,
  setOpenTooltip: PropTypes.func,
  triggerSessionValidation: PropTypes.func,
};

const MenuDialog = ({ target, options, openTooltip, setOpenTooltip, triggerSessionValidation }) => {
  return (
    <Menu
      BackdropProps={{invisible: false}}
      anchorEl={target}
      onClose={() => setOpenTooltip(false)}
      open={openTooltip}
      TransitionComponent={Zoom}
      transformOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
    >
      <MenuContent options={options} setOpenTooltip={setOpenTooltip} triggerSessionValidation={triggerSessionValidation}/>
    </Menu>
  );
};

MenuDialog.propTypes = {
  target: PropTypes.obj,
  options: PropTypes.array,
  openTooltip: PropTypes.bool,
  setOpenTooltip: PropTypes.func,
  triggerSessionValidation: PropTypes.func,
};

export default MenuDialog;
