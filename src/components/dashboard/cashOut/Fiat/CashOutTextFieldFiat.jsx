import React from "react";
import PropTypes from 'prop-types';
import {  Stack, Grid, InputBase, Typography , Avatar} from "@mui/material";
import Colors from "../../../../constants/Colors";
import { makeStyles } from '@mui/styles';
import CopcoinLogoIcon from '../../../../logos/icon-copcoin.png';
import NumberFormat from "../../../common/NumberFormat";


export default function CashOutTextField({mainText, value, handleBoughtInfoChange}) {

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
            <strong>Disponible: 3.280.000</strong>
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
            value={ value || ''}
            onChange={(event) => handleBoughtInfoChange(event.target.value)}
            inputComponent={NumberFormat}

          />
          <Stack direction="row" className={classes.flexRow}>
            <Avatar src={CopcoinLogoIcon}  size={35} />
          </Stack>
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

CashOutTextField.propTypes = {
  mainText: PropTypes.string, 
  value: PropTypes.number, 
  handleBoughtInfoChange: PropTypes.func, 
}