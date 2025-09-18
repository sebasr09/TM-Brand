import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Stack,
  Grid,
  InputBase,
  Typography,
  Avatar,
  Autocomplete,
  TextField,
  InputAdornment,
} from '@mui/material';
import Colors from '../../../../constants/Colors';
import { makeStyles } from '@mui/styles';
import CIcon from 'react-crypto-icons';
import { postApi } from '../../../api/apiManager';
import { formatNumber } from '../../../../utils';
import NumberFormat from '../../../common/NumberFormat';
import Binance from 'binance-api-node';

export default function CashOutTextField({
  mainText,
  value,
  fiats,
  setValue,
  setAvailableParent,
  setSelectedAsset,
  selectedAsset,
}) {
  const [available, setAvailable] = useState(0);
  const availableArray = [
    { short_name: 'COPC', available: 1000000 },
    { short_name: 'USDT', available: 1000 },
    { short_name: 'BTC', available: 1 },
    { short_name: 'ETH', available: 1 },
    { short_name: 'BNB', available: 1 },
    { short_name: 'XRP', available: 1 },
    { short_name: 'DAI', available: 1 },
    { short_name: 'CAKE', available: 1 },
    { short_name: 'USDC', available: 1000 },
    { short_name: 'SOL', available: 1 },
    { short_name: 'DOGE', available: 1 },
  ];
  const [address, setAddress] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState({});
  const networks = [{ name: 'ERC20' }, { name: 'TRC20' }];
  const client = Binance();

  const handleAsset = (event, value) => {
    getAssetInfo(value);
    setSelectedAsset({ value: value });
    const availableObject = availableArray.find((element) => {
      return element.short_name === value.short_name;
    });
    setAvailable(availableObject.available);
    setAvailableParent(availableObject.available);
  };

  const getAssetInfo = async function (asset) {
    if (asset !== null && asset !== undefined) {
      if (asset.short_name === 'USDT') {
        setSelectedAsset((previous) => {
          const newObject = { ...previous };
          newObject['lastTradePrice'] = 1;
          return newObject;
        });
      } else {
        try {
          let result = await client.prices({
            symbol: asset.short_name.concat('USDT'),
          });
          let data = result[Object.keys(result)[0]];
          setSelectedAsset((previous) => {
            const newObject = { ...previous };
            newObject['lastTradePrice'] = parseFloat(data);
            return newObject;
          });
        } catch (error) {
          console.log(error);
          setSelectedAsset((previous) => {
            const newObject = { ...previous };
            newObject['lastTradePrice'] = 0;
            return newObject;
          });
        }
      }
    } else {
      setSelectedAsset({
        name: '',
        lastTradePrice: '',
      });
      console.log(selectedAsset);
    }
  };

  const handleNetwork = (event, value) => {
    setSelectedNetwork(value);
  };

  const classes = useStyles();
  return (
    <Stack className={classes.container} component='form'>
      <Grid>
        <Stack direction='row' className={classes.flexRow}>
          <Typography>
            <strong>{mainText}</strong>
          </Typography>
          <Typography>
            <strong>Disponible: {formatNumber(available)}</strong>
          </Typography>
        </Stack>
        <Stack direction='row' className={classes.flexRow}>
          <InputBase
            id='quantity'
            type='tel'
            inputProps={{
              inputMode: 'numeric',
              pattern: '[0-9]*',
              'aria-label': '0.0',
            }}
            name='quantity'
            className={classes.inputBase}
            placeholder='0.0'
            autoComplete='off'
            value={value || ''}
            onChange={(event) => setValue(event.target.value)}
            inputComponent={NumberFormat}
          />
          <Autocomplete
            disableClearable
            noOptionsText=' - '
            options={fiats}
            getOptionLabel={(option) => option.short_name || ' -- '}
            value={
              selectedAsset && selectedAsset.value ? selectedAsset.value : ''
            }
            defaultValue={selectedAsset.value || ''}
            onChange={handleAsset}
            renderInput={(params) => (
              <Stack direction='row' className={classes.flexRow}>
                <TextField
                  variant='standard'
                  {...params}
                  className={classes.coinsField}
                  id='selectedAsset'
                  value={selectedAsset.value || ''}
                  InputProps={{
                    ...params.InputProps,
                    disableUnderline: true,
                    startAdornment: (
                      <InputAdornment position='start'>
                        {selectedAsset.value ? (
                          <CIcon
                            name={
                              selectedAsset.value
                                ? selectedAsset.value.short_name.toLowerCase()
                                : ''
                            }
                            size={35}
                          />
                        ) : (
                          <img
                            src={'/images/tm-icon.svg'}
                            alt='Logo Carla Tech'
                            width='35'
                            height='auto'
                          />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
            )}
          />
        </Stack>
        <Stack className={classes.flexRow}>
          <Autocomplete
            disableClearable
            noOptionsText=' - '
            options={networks}
            getOptionLabel={(option) => option.name || 'Red de la dirección'}
            value={selectedNetwork}
            defaultValue={selectedNetwork || ''}
            onChange={handleNetwork}
            renderInput={(params) => (
              <TextField
                variant='standard'
                {...params}
                id='selecteNetwork'
                className={classes.coinsField}
                value={selectedNetwork.name ? selectedNetwork.name : ''}
                InputProps={{ ...params.InputProps, disableUnderline: true }}
              />
            )}
          />
        </Stack>
        <Stack direction='row' className={classes.flexRow}>
          <TextField
            id='address'
            variant='standard'
            className={classes.coinsField}
            InputProps={{ inputMode: 'text', disableUnderline: true }}
            name='address'
            placeholder='Dirección'
            fullWidth
            autoComplete='off'
            value={address || ''}
            onChange={(event) => {
              setAddress(event.target.value);
            }}
          />
        </Stack>
      </Grid>
    </Stack>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: Colors.primaryTransparent,
    borderRadius: '1em',
    margin: '1em',
    boxShadow: 'rgb(74 74 104 / 10%) 2px 2px 2px -5px inset',
    color: Colors.primary,
  },
  flexRow: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '1em',
  },
  inputBase: {
    marginLeft: 1,
    flex: 1,
    fontSize: 28,
    color: Colors.secondary,
  },
  coinsField: {
    padding: '6px',
    minWidth: '130px',
  },
}));

CashOutTextField.propTypes = {
  mainText: PropTypes.string,
  value: PropTypes.number,
  handleBoughtInfoChange: PropTypes.func,
  fiats: PropTypes.array,
  setValue: PropTypes.func,
  setAvailableParent: PropTypes.func,
  setSelectedAsset: PropTypes.func,
  selectedAsset: PropTypes.object,
};
