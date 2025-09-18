import { InputAdornment, Popover, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';

import HelpIcon from '@mui/icons-material/Help';
import MediaQuery from 'react-responsive';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2)
  }
}));

export default function ResponsiveTooltip({ helpText }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleTooltip = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleTooltipClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <MediaQuery maxDeviceWidth={800}>
        <HelpIcon color='primary' onClick={handleTooltip}></HelpIcon>
        <Popover
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleTooltipClose}>
          <Typography className={classes.typography}>{helpText}</Typography>
        </Popover>
      </MediaQuery>
      <MediaQuery minDeviceWidth={800}>
        <InputAdornment position='end'>
          <Tooltip title={<h2>{helpText}</h2>} placement='top'>
            <HelpIcon color='primary'></HelpIcon>
          </Tooltip>
        </InputAdornment>
      </MediaQuery>
    </React.Fragment>
  );
}

ResponsiveTooltip.propTypes = {
  helpText: PropTypes.string
};
