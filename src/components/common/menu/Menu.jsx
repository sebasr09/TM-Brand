import React, { Fragment, useState } from 'react';
import { PropTypes } from 'prop-types';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import { styled } from '@mui/styles';
import { menuOptions, menuOptionVariant } from './MenuController';
import MenuDialog from './MenuDialog';

const MenuButton = styled(BottomNavigationAction)(({ theme }) => ({
  backgroundColor: theme.palette.white.main,
  color: theme.palette.text.secondary,
  '&.Mui-disabled': {
    color: theme.palette.text.disabled,
  },
  '&.Main': {
    '& svg': {
      backgroundColor: theme.palette.action.selected,
      borderRadius: '100%',
      padding: '0.5em',
      color: theme.palette.primary.main,
      width: '50px',
      height: '50px'
    }
  }
}));

const Menu = ({ selected, setSelected, triggerSessionValidation }) => {
  const [openTooltip, setOpenTooltip] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const optionSelected = (target, selected) => {
    if (selected.variant !== menuOptionVariant.Main) {
      setSelected(selected);
    } else {
      setAnchorEl(target);
      setOpenTooltip(true);
    }
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 0, right: 0, left: 0 }}>
      <BottomNavigation
        sx={{
          bgcolor: (theme) => theme.palette.white.main,
          '& .Mui-selected': {
            '& .MuiBottomNavigationAction-label': {
              fontSize: (theme) => theme.typography.caption,
              transition: 'none',
              fontWeight: 'bold',
              lineHeight: '20px',
            },
            '& .MuiSvgIcon-root, & .MuiBottomNavigationAction-label': {
              color: (theme) => theme.palette.third.main,
            },
          },
        }}
        value={selected}
        onChange={(event, newValue) =>
          optionSelected(event.currentTarget, newValue)
        }
      >
        {Object.values(menuOptions)
          .filter((opt) => opt.variant !== menuOptionVariant.Secondary)
          .map((opt) => {
            return opt.variant === menuOptionVariant.Primary ? (
              <MenuButton
                disabled={opt.disabled}
                value={opt}
                key={opt.label}
                label={opt.label}
                icon={opt.icon}
              />
            ) : (
              <MenuButton
                className='Main'
                disabled={opt.disabled}
                value={opt}
                key={opt.label}
                label={opt.label}
                icon={opt.icon}
              ></MenuButton>
            );
          })}
      </BottomNavigation>
      <MenuDialog
        target={anchorEl}
        openTooltip={openTooltip}
        setOpenTooltip={setOpenTooltip}
        options={Object.values(menuOptions).filter(
          (opt) => opt.variant === menuOptionVariant.Secondary
        )}
        triggerSessionValidation={triggerSessionValidation}
      />
    </Box>
  );
};

Menu.propTypes = {
  selected: PropTypes.object,
  setSelected: PropTypes.func,
  triggerSessionValidation: PropTypes.func,
};

export default Menu;
