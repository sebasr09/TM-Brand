import React from "react";
import PropTypes from 'prop-types';
import { Stack, Grid, Button, InputBase, InputAdornment, Typography, Avatar } from "@mui/material";
import { makeStyles } from '@mui/styles';
import CIcon from "react-crypto-icons";
import { formatNumber } from '../../../utils';
import NumberFormat from "../../common/NumberFormat";

export default function PoolTextField({ mainText, stacked, handleBoughtInfoChange, selectedPool, action }) {

  const classes = useStyles();
  return (
    <Stack
      sx={{
        bgcolor: theme => theme.palette.white.main,
        borderRadius: '1em',
        margin: '1em',
        boxShadow: 'rgb(74 74 104 / 10%) 0px 2px 2px -1px inset'
      }}
      component="form">
      <Grid>
        <Stack direction="row" className={classes.flexRow}>
          <Typography sx={{ color: theme => theme.palette.primary.main }}>
            <strong>{mainText}</strong>
          </Typography>
          <Typography sx={{ color: theme => theme.palette.primary.main }} >
            <strong>Available: {selectedPool && selectedPool.available ? formatNumber(selectedPool.available) : 0}</strong>
          </Typography>
        </Stack>
        <Stack direction="row" className={classes.flexRow}>
          <InputBase
            id="quantity"
            type="tel"
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', 'aria-label': '0.0' }}
            name="quantity"
            className={classes.inputBase}
            placeholder="0.0"
            autoComplete="off"
            value={stacked || ''}
            onChange={(event) => handleBoughtInfoChange(event.target.value)}
            inputComponent={NumberFormat}

          />
          <Stack direction="row" className={classes.flexRow}>
            {selectedPool ?
              selectedPool.short_name != 'COPC' ? <Stack alignItems='center'><InputAdornment>
                <CIcon name={selectedPool && selectedPool.short_name ? selectedPool.short_name.toLowerCase() : ''} size={35} />
              </InputAdornment>
                <Typography sx={{ color: theme => theme.palette.primary.main, marginTop: '1.5em'}}>
                  {selectedPool.short_name}
                </Typography></Stack> :
                <Avatar src={selectedPool.logo} size={35} /> :
              <></>
            }
          </Stack>
        </Stack>
      </Grid>
      <Button
        variant='contained'
        sx={{ bgcolor: theme => theme.palette.third.main }}

        className={classes.submit}
        onClick={() => action()}
        id='buyButton'>
        Invest
      </Button>
    </Stack>
  );
}

const useStyles = makeStyles(() => ({
  flexRow: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '1em 1em 0.5em 1em'
  },
  inputBase: {
    marginLeft: 1,
    flex: 1,
    fontSize: 28,
  },
  coinsField: {
    padding: '6px',
    minWidth: '130px'
  }
}))

PoolTextField.propTypes = {
  mainText: PropTypes.string,
  stacked: PropTypes.string,
  handleBoughtInfoChange: PropTypes.func,
  fiats: PropTypes.array,
  selectedPool: PropTypes.object,
  handleAsset: PropTypes.func,
  action: PropTypes.func
}