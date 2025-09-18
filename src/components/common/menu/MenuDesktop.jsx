import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { ButtonBase, List, ListItem, styled, ListItemIcon, ListItemText, Collapse, Divider } from '@mui/material';
import { menuOptions, menuOptionVariant } from './MenuController';
import MenuDialog from './MenuDialog';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import CommercialDialog from '../dialogs/CommercialDialog';

const MenuButton = styled(ButtonBase, {
  shouldForwardProp: (prop) => prop !== 'selected',
})(({ selected, theme }) => ({
  flexDirection: 'column',
  lineHeight: 0.4,
  wordWrap: 'break-word',
  color: selected
    ? theme.palette.action.selected
    : theme.palette.text.secondary,
  borderRadius: '24px',
  margin: '0.5em',
  padding: '0.5em',
  '&.Mui-disabled': {
    color: theme.palette.text.disabled,
  },
  '&.Main': {
    padding: '0em',
    '& svg': {
      backgroundColor: theme.palette.action.selected,
      borderRadius: '100%',
      padding: '0.5em',
      color: theme.palette.primary.main,
      width: '50px',
      height: '50px',
    },
  },
}));

const MenuDesktop = ({ selected, setSelected, setRequestFilter, requestFilter, triggerSessionValidation, setMobileOpen, logout, userInfo}) => {
  const [openTooltip, setOpenTooltip] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openRequests, setOpenRequests] = useState(false);
  const [comercial, setComercial] = useState(false)
  const closeComercial = () => {
    setComercial(false)
  }

  const handleRequests = (selected) => {
    setSelected(selected);
    setOpenRequests(!openRequests);
  };


  const optionSelected = (target, selected) => {
    if (selected.variant !== menuOptionVariant.Main) {
      setSelected(selected);
      setOpenRequests(false);
    } else {
      setAnchorEl(target);
      setOpenTooltip(true);
    }
  };

  const filterSelected = (selected) => {
    setRequestFilter(selected)
  }

  return (
    <List
      sx={{
        '& .Mui-selected': {
          color: (theme) => theme.palette.third.main,
          '& .MuiSvgIcon-root': {
            color: (theme) => theme.palette.third.main,
          }
        },
        paddingBottom: '50px',
        borderBottom: '0.8px solid',
        borderImage: 'linear-gradient(to right, transparent 10%, rgb(46, 46, 99) 10% 90%, transparent 90%) 1',
      }}>
      {Object.values(menuOptions)
        .filter((opt) => opt.variant !== menuOptionVariant.Secondary)
        .map((opt) => {
          return (
            opt.variant === menuOptionVariant.Primary ?
              <ListItem
                button
                onClick={(event) => {
                  if (opt.label === 'Logout'){
                    logout()
                  }
                  else if (opt.label === 'Asesor'){
                    setComercial(true)
                  }
                  else {
                    optionSelected(event.currentTarget, opt);
                    setMobileOpen(false);
                  }
                }}
                selected={selected === opt}
                key={opt.label}
                disabled={opt.disabled}
              >
                <ListItemIcon sx={{ color: (theme) => theme.palette.primary.main }}>
                  {opt.icon}
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} primary={opt.label} />
              </ListItem>
              :
              <>
                <ListItem
                  button
                  onClick={(event) => {
                    optionSelected(event.currentTarget, opt)
                    filterSelected(0)
                    handleRequests(opt)
                  }}
                  selected={selected === opt}
                  key={opt.label}

                >
                  <ListItemIcon sx={{ color: (theme) => theme.palette.primary.main }}>
                    {opt.icon}
                  </ListItemIcon>
                  <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} primary={opt.label} />
                  {openRequests ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openRequests} timeout='auto' unmountOnExit>
                <Divider />
                  <List>
                    {Object.values(menuOptions)
                      .filter((opt1) => opt1.variant === menuOptionVariant.Secondary)
                      .map((opt1) => {
                        return (
                          <ListItem
                            button
                            onClick={() => {filterSelected(opt1.filter);
                              setMobileOpen(false);
                            }}
                            selected={requestFilter === opt1.filter}
                            key={opt1.label}
                            sx={{
                              paddingLeft: '1.8em',
                            }}
                          >
                            <ListItemIcon sx={{ color: (theme) => theme.palette.primary.main }}>
                              {opt1.icon}
                            </ListItemIcon>
                            <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} primary={opt1.label} />
                          </ListItem>
                        )
                      })}
                  </List>
                  <Divider />
                </ Collapse>
              </>
          )
        })}
      <MenuDialog
        target={anchorEl}
        openTooltip={openTooltip}
        setOpenTooltip={setOpenTooltip}
        options={Object.values(menuOptions).filter(
          (opt) => opt.variant === menuOptionVariant.Secondary
        )}
        triggerSessionValidation={triggerSessionValidation}
      />
      <CommercialDialog openDialog={comercial} closeDialog={closeComercial} userInfo={userInfo} />

    </List>
  );
};

MenuDesktop.propTypes = {
  selected: PropTypes.object,
  setSelected: PropTypes.func,
  setRequestFilter: PropTypes.func,
  requestFilter: PropTypes.number,
  triggerSessionValidation: PropTypes.func,
  setMobileOpen: PropTypes.func,
  logout: PropTypes.func,
  userInfo: PropTypes.object
};

export default MenuDesktop;
