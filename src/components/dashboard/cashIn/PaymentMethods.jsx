import React from "react";
import PropTypes from 'prop-types';
import {  Stack, ImageList, ImageListItem, Grid} from "@mui/material";
import Colors from "../../../constants/Colors";
import { makeStyles } from '@mui/styles';
import CIcon from "react-crypto-icons";
import CopcoinLogoIcon from '../../../logos/icon-copcoin.png';
import PseLogo from '../../../logos/brand-pse.png';
import ClaroPayLogo from '../../../logos/claro-logo-8.png';
import CreditCard from '../../../logos/visa-mastercard-logo.png'
export default function CashInTextField({mainText, value, handleBoughtInfoChange}) {

  const methods = [{logo: PseLogo, title: "PSE"}, {logo: ClaroPayLogo, title: "Claro Pay"}, {logo: CreditCard, title: "Visa - Mastercard"}]

  const classes = useStyles();
  return (
      <ImageList cols={3}>
        {methods.map((item, index) => (
          <ImageListItem key={index} sx={{margin: '0 1em', height: 50+'%'}} >
            <img
              src={item.logo}
              srcSet={item.logo}
              alt={item.title}
              loading="lazy"
              style={{objectFit: 'contain'}}
            />
          </ImageListItem>
        ))}
      </ImageList>
    
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

CashInTextField.propTypes = {
  mainText: PropTypes.string, 
  value: PropTypes.number, 
  handleBoughtInfoChange: PropTypes.func, 
}