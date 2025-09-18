import {
  Card,
  CardContent,
  Container,
  Grid,
  Slide,
  Button,
  Typography,
  Paper,
  Stack,
  ListItemText,
  Divider
} from '@mui/material';
import { makeStyles , styled  } from '@mui/styles';
import PropTypes from 'prop-types';

import React, { useEffect, useState } from 'react';
import { getApi } from '../../../api/apiManager';
import LoadingBackdrop from '../../../common/LoadingBackdrop';
import ErrorSnackbar from '../../../common/ErrorSnackbar';
import SuccessSnackbar from '../../../common/SuccessSnackbar';
import WithdrawTextField from './WithdrawTextField';
import Colors from '../../../../constants/Colors';
import CashOutMethods from './CashOutMethodsCrypto';

const networkFees = [
  {short_name: 'BTC', fee: '0.00035', platform: '0.00020'},
  {short_name: 'ETH', fee: '0.0065', platform: '0.0005'},
  {short_name: 'COPC', fee: '1.5', platform: '0.7'},
  {short_name: 'USDT', fee: '0.045', platform: '0.02'},
  {short_name: 'BNB', fee: '0.057', platform: '0.025'},
  {short_name: 'XRP', fee: '0.00065', platform: '0.0022'},
  {short_name: 'DAI', fee: '0.08', platform: '0.004'},
  {short_name: 'CAKE', fee: '0.058', platform: '0.0065'},
  {short_name: 'USDC', fee: '0.55', platform: '0.078'},
  {short_name: 'SOL', fee: '0.0059', platform: '0.0063'},
  {short_name: 'DOGE', fee: '0.0065', platform: '0.087'}
]

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const Item = styled(Paper)(() => ({
  textAlign: 'center',
  height: 60,
  lineHeight: '60px',
}));

export default function CashOutCopcoin() {
  const classes = useStyles();

  const [userData, setUserData] = useState({
    quantity: 0,
    selectedAsset: ''
  });
  const [selectedAsset, setSelectedAsset] = useState({  });
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [fiats, setFiats] = useState([]);

  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [available, setAvailable] = useState(0);
  const [networkFee, setNetworkFee] = useState(0);
  const [platformFee, setPlatformFee] = useState(0);
  //Api Calls
  const getParams = async () => {
    try {
      const data = await getApi(`activos/params`);
      const coins = data.coins.filter((c)=>{return c.is_digital_asset});
      setFiats(coins);
    } catch (err) {
      setErrorMessage('No fue posible cargar la información de la base de datos.');
    }
  };

  useEffect(() => {
    getParams()
  }, [open]);

  const handleCloseError = () => {
    setOpenError(false);
    setErrorMessage('');
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
    setSuccessMessage('');
  };

  const handleClose = () => {
    setOpen(false);
  }

  useEffect(() => {
    if(selectedAsset && selectedAsset.value){
      const fee = networkFees.find((element) => element.short_name === selectedAsset.value.short_name);
      setNetworkFee(fee.fee);
      setPlatformFee(fee.platform)
    }
  }, [selectedAsset]);

  return (
    <div className={classes.root}>
      <Container component='main' maxWidth='md'>
        <LoadingBackdrop open={openBackdrop} />
        <ErrorSnackbar open={openError} message={errorMessage} handleClose={handleCloseError} id='errorSnackbar' />
        <SuccessSnackbar
          open={openSuccess}
          message={successMessage}
          handleClose={handleCloseSuccess}
          id='successSnackbar'
        />
        <Grid container spacing={10} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={8} className={classes.centerContainer}>
            <Card>
              <CardContent>
                <Stack>
                  <Typography variant='h5' color={Colors.primary}>
                    <strong>Envíos</strong>
                  </Typography>
                  <Typography variant='body2' color={Colors.primary}>
                    Deposita tus activos digitales en la red que prefieras.
                  </Typography>
                </Stack>
                <Divider />
                <WithdrawTextField 
                  mainText={'Cantidad'} 
                  value={value}
                  fiats={fiats}
                  setValue={setValue}
                  setAvailableParent={setAvailable}
                  setSelectedAsset={setSelectedAsset}
                  selectedAsset={selectedAsset}
                />
                <Button
                  disabled={value > available}
                  variant='contained' 
                  color='primary'
                  className={classes.submit}
                  onClick={() => {
                    setOpen(true);
                  }}
                  id='buyButton'
                  >
                  Enviar
                </Button>
              </CardContent>
            </Card>
            <Card sx={{marginTop: '1.5em'}}>
              <CardContent>
                <Stack direction='row'>
                  <ListItemText primary="Costo de Red" 
                    primaryTypographyProps={{ fontSize: 14, fontWeight: '500', color: Colors.gray }}
                    secondary={`${networkFee} ${selectedAsset && selectedAsset.value ? selectedAsset.value.short_name: ''}`}  
                    secondaryTypographyProps={{fontWeight: 'bold', fontSize: 16, color: Colors.primary}} />
                  <ListItemText primary="Costo de la Plataforma" 
                    primaryTypographyProps={{ fontSize: 14, fontWeight: '500', color: Colors.gray }}
                    secondary={`${platformFee} ${selectedAsset && selectedAsset.value ? selectedAsset.value.short_name: ''}`}  
                    secondaryTypographyProps={{fontWeight: 'bold', fontSize: 16, color: Colors.primary}} />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid> 
      </Container>
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
  },
}));

CashOutCopcoin.propTypes = {
  open: PropTypes.bool
};

