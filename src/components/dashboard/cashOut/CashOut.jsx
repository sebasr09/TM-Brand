import {
  Tab, 
  Tabs,
  Box,
  Typography
} from '@mui/material';
import { makeStyles , ThemeProvider , styled  } from '@mui/styles';
import PropTypes from 'prop-types';
import CashOutToFiat from './Fiat/CashOutToFiat';
import CashOutToCrypto from './Crypto/CashOutToCrypto';


import React, { useEffect, useState , useCallback } from 'react';

console.log("Si llega")

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function CashOut() {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Fiat" {...a11yProps(0)} />
            <Tab label="Crypto activo" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <CashOutToFiat />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CashOutToCrypto />
        </TabPanel>
      </Box>
    </div>
      
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    padding: '1% 3% 8%',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  appBar: {
    position: 'relative'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  container: {
    display:'flex', 
    justifyContent:'left'
  },
  progress: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(1)
  },
  centerContainer: {
    margin: '1em auto'
  }
}));

CashOut.propTypes = {
  open: PropTypes.bool
};

