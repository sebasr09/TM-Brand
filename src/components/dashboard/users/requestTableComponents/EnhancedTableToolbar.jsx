import { IconButton, Toolbar, Typography } from '@mui/material';
import { lighten } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Colors from '../../../../constants/Colors';
import PropTypes from 'prop-types';
import React from 'react';
import { Sync } from '@mui/icons-material';
import clsx from 'clsx';

const EnhancedTableToolbar = ({ numSelected, toggleReDoFetch }) => {
  const classes = useToolbarStyles();

  const syncData = () => {
    toggleReDoFetch();
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0
      })}>
      <Typography className={classes.title} variant='h6' id='tableTitle' component='div'>
        Detalle de usuarios
      </Typography>
      <IconButton onClick={syncData} className={classes.syncButton} size="large">
        <Sync fontSize='large' className={classes.syncIcon} />
      </IconButton>
    </Toolbar>
  );
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    backgroundColor: Colors.primary
  },
  highlight: {
    color: theme.palette.secondary.main,
    backgroundColor: lighten(theme.palette.secondary.light, 0.85)
  },
  title: {
    color: Colors.white,
    flex: '1 1 100%'
  },
  syncButton: {
    marginLeft: '1%',
    padding: 3,
    backgroundColor: Colors.white,
    transition: '0.2s',
    '&:hover': {
      background: Colors.secondary
    }
  },
  syncIcon: {
    color: Colors.primary
  }
}));

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number,
  toggleReDoFetch: PropTypes.func
};

export default EnhancedTableToolbar;
