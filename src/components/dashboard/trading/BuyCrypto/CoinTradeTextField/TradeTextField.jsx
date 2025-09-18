import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import { Stack, Grid, InputBase, InputAdornment, TextField, Typography, Box, Avatar } from "@mui/material";
import Autocomplete from "@mui/lab/Autocomplete";
import Colors from "../../../../../constants/Colors";
import { makeStyles } from '@mui/styles';
import CIcon from "react-crypto-icons";
import NumberFormat from "../../../../common/NumberFormat";
import CopcoinLogoIcon from "../../../../../logos/icon-copcoin.png";
import {formatNumber} from '../../../../../utils';

export default function TradeTextField({mainText, buyingInfo, handleBoughtInfoChange, fiats, selectedAsset, handleAsset}) {

  const [balance, setBalance] = useState(0);

  const availableArray = [
    {short_name: 'COPC', available: 1000000},
    {short_name: 'USDT', available: 1000},
    {short_name: 'BTC', available: 1},
    {short_name: 'ETH', available: 1},
    {short_name: 'BNB', available: 1},
    {short_name: 'XRP', available: 1},
    {short_name: 'DAI', available: 1},
    {short_name: 'CAKE', available: 1},
    {short_name: 'USDC', available: 1000},
    {short_name: 'SOL', available: 1},
    {short_name: 'DOGE', available: 1}]

  useEffect(() => {
    function setFirstAsset () {
      handleAsset(undefined, {
      });
    }
    //setFirstAsset();
  }, []);

  useEffect (() => {
    function getBalance(){
      if(selectedAsset.value){
        const available = availableArray.find(element =>  {
          return element.short_name == selectedAsset.value.short_name
        });
        if(available) setBalance(available.available)
      }
    }
    getBalance();
  }, [selectedAsset])

  const classes = useStyles();
  return (
    <Stack
      className={classes.container}
      component="form">
      <Grid>
        <Stack direction="row" className={classes.flexRow}>
          <Typography>
            <strong>{mainText}</strong>
          </Typography>
          <Typography>
            <strong>Disponible: {formatNumber(balance)}</strong>
          </Typography>
        </Stack>
        <Stack direction="row" className={classes.flexRow}>
          <Box>
            <InputBase
              id="quantity"
              name="quantity"
              className={classes.inputBase}
              placeholder="0.0"
              autoComplete="off"
              value={ buyingInfo.quantity || ''}
              onChange={(event) => handleBoughtInfoChange('quantity', event.target.value)}
              inputComponent={NumberFormat}
            />
            </Box>
          <Autocomplete
            disableClearable
            noOptionsText=" - "
            options={fiats}
            getOptionLabel={(option) => option.short_name || ' -- '}
            value={selectedAsset.value?selectedAsset.value : ''}
            onChange={handleAsset}
            renderInput={(params) => (
              <Stack direction="row" className={classes.flexRow}>
                <TextField
                  variant="standard"
                  {...params}
                  className={classes.coinsField}
                  id="selectedAsset"
                  value={selectedAsset.value || ''}
                  InputProps={{...params.InputProps, disableUnderline: true, startAdornment: (
                    <InputAdornment position="start">
                      {selectedAsset.value ? ( selectedAsset.value.short_name == 'COPC' ? 
                      <Avatar src={CopcoinLogoIcon}  size={35} /> : 
                      <CIcon name={selectedAsset.value?selectedAsset.value.short_name.toLowerCase(): ''} size={35} /> ):
                      (<img
                        src={'/images/tm-icon.svg'}
                        alt='Logo Carla Tech'
                        width='35'
                        height='auto'
                      />)}
                    </InputAdornment> 
                  )}}
                />
              </Stack>
            )}
          />
        </Stack>
      </Grid>
    </Stack>
  );
}

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: Colors.primaryTransparent, 
    borderRadius: '1em',
    margin: '1em',
    boxShadow: 'rgb(74 74 104 / 10%) 0px 2px 2px -1px inset',
    color: Colors.primary
  },
  flexRow: {
    display: 'flex', 
    justifyContent: 'space-between', 
    margin: '1em' 
  },
  inputBase: {
    marginLeft: 1, 
    flex: 1, 
    fontSize: 28, 
    color: Colors.secondary 
  },
  coinsField:{
    padding: '6px',
    minWidth: '130px'
  }
}))

TradeTextField.propTypes = {
  mainText: PropTypes.string, 
  buyingInfo: PropTypes.object, 
  handleBoughtInfoChange: PropTypes.func, 
  fiats: PropTypes.array, 
  selectedAsset: PropTypes.object, 
  handleAsset: PropTypes.func,
}