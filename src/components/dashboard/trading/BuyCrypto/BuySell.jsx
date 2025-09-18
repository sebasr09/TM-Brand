import {
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Button,
  Stack,
  Divider
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';

import React, { useEffect, useState } from 'react';
import { getApi, postApi } from '../../../api/apiManager';
import ErrorSnackbar from '../../../common/ErrorSnackbar';
import SuccessSnackbar from '../../../common/SuccessSnackbar';
import TradeTextField from './CoinTradeTextField/TradeTextField';
import Colors from '../../../../constants/Colors';
import { ArrowDownward } from '@mui/icons-material';
import Binance from 'binance-api-node'

export default function BuySell({ open }) {

  const USD_COP = 3800;

  const classes = useStyles();

  const [selectedAssetI, setSelectedAssetI] = useState({
    name:'',
    lastTradePrice:'',
  });
  const [selectedAssetF, setSelectedAssetF] = useState({
    name:'',
    lastTradePrice:'',
  });
  const [buyingInfoI, setBuyingInfoI] = useState({
    quantity:'',
    tradePrice:''
  });
  const [buyingInfoF, setBuyingInfoF] = useState({
    quantity:'',
    tradePrice:''
  });
  const [fiats, setFiats] = useState([]);
  const [fiatsI, setFiatsI] = useState([]);
  const [fiatsF, setFiatsF] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [enabledButton, setEnabledButton] = useState(false);
  const client = Binance()

  //Api Calls
  
  const getParams = async () => {
    try {
      const data = await getApi(`activos/params`);
      const coins = data.coins.filter((c)=>{return c.is_digital_asset});
      setFiats(coins);
      setFiatsI(coins);
      setFiatsF(coins);
      handleAssetI(null, coins.find((c) => c.short_name == 'COPC'));
      handleAssetF(null, coins.find((c) => c.short_name == 'USDT'));
    } catch (err) {
      setErrorMessage('No fue posible cargar la información de la base de datos.');
    }
  };

  useEffect(() => {
    getParams()
  }, [open]);

  useEffect(() => {
    function validateQuantities(){
      if(buyingInfoI.quantity && buyingInfoF.quantity){
        setEnabledButton(true);
      }
      else setEnabledButton(false);
    }
    validateQuantities();
  }, [buyingInfoI, buyingInfoF])

  useEffect(() => {
    if(buyingInfoI){
      calcFPrice(buyingInfoI.quantity);
    }
  }, [selectedAssetF])

  const handleCloseError = () => {
    setOpenError(false);
    setErrorMessage('');
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
    setSuccessMessage('');
  };

  const getAssetInfo = async function (asset){
    if(asset.short_name !== 'COPC'){
      if(asset.short_name === 'USDT'){
        return 1;
      }
      try {
        let result = await client.prices({symbol: asset.short_name.concat('USDT')})
        let data = result[Object.keys(result)[0]]
        return data;
      } catch (error) {
        console.log(error);
        return 0;
      }
    }
    else{
      return 1;
    }
  }

  const newFiatsArray = (value) => {
    var index = fiats.indexOf(value);
      if(index !== -1){
        var newArray = [...fiats];
        newArray.splice(index, 1);
        return newArray;
      }
      else{
        return fiats;
      }
  }

  const handleAssetI = async(event, value) => {
    if(value !== null && value !== undefined) {
      setBuyingInfoF((previous) => {
        let newObject = {...previous};
        newObject.quantity = 0;
        return newObject;
      });
      setBuyingInfoI((previous) => {
        let newObject = {...previous};
        newObject.quantity = 0;
        return newObject;
      })
      getAssetInfo(value).then((trade) => {
        setSelectedAssetI({
          lastTradePrice: trade, 
          value: value,
        })
      })
    } else {
      setSelectedAssetI({
        name:'', 
        lastTradePrice:''
      });
    }
  };
  
  const handleAssetF = async(event, value) => {
    if(value !== null && value !== undefined) {
      
      getAssetInfo(value).then((trade) => {
        handleBoughtInfoChangeF()
        setSelectedAssetF({
          lastTradePrice: trade,
          value: value,
        });
      })
    } else {
      setSelectedAssetF({
        name:'', 
        lastTradePrice:''
      });
    }
  };

  const handleBoughtInfoChangeI = (name, value) => {
    setBuyingInfoI((previous) => {
      const newObject = { ...previous };
      newObject[name] = value;
      if(name == 'quantity' ){
        newObject.value = value;
        if(selectedAssetF.value && selectedAssetI.value) {
          calcFPrice(value);
        }
      }
      return newObject;
    });
  };

  const calcFPrice = (value) => {
    let newVal = 0 ;
    if(selectedAssetI.value && selectedAssetI.value.short_name == 'COPC') newVal = value * selectedAssetI.lastTradePrice / USD_COP;
    else if(selectedAssetI.value && selectedAssetI.value.short_name == 'USDT') newVal = value * selectedAssetI.lastTradePrice * USD_COP;
    else if(selectedAssetF.value && selectedAssetF.value.short_name == 'COPC') newVal = value * selectedAssetI.lastTradePrice * USD_COP;
    else newVal = value * selectedAssetI.lastTradePrice;
    setBuyingInfoF((previous) => {
      const newObject = { ...previous };
      newObject['quantity'] = newVal / selectedAssetF.lastTradePrice;
      return newObject;
    })
  }

  const handleBoughtInfoChangeF = (name, value) => {
    setBuyingInfoF((previous) => {
      const newObject = { ...previous };
      newObject[name] = value;

      if(name == 'quantity'){
        newObject.value = value;
        if(selectedAssetF.value && selectedAssetI.value) {
          let newVal = 0;
          if(selectedAssetI.value && selectedAssetI.value.short_name == 'COPC') newVal = value * selectedAssetF.lastTradePrice * USD_COP;
          else if(selectedAssetI.value && selectedAssetI.value.short_name == 'USDT') newVal = value * selectedAssetF.lastTradePrice / USD_COP;
          else newVal = value * selectedAssetF.lastTradePrice;
          setBuyingInfoI((previous) => {
            const newObject = { ...previous };
            newObject['quantity'] = newVal / selectedAssetI.lastTradePrice;
            return newObject;
          })
        }
      }
      return newObject;
    });
  };

  return (
    <div className={classes.root}>
      <Container component='main' maxWidth='md'>
        <ErrorSnackbar open={openError} message={errorMessage} handleClose={handleCloseError} id='errorSnackbar' />
        <SuccessSnackbar
          open={openSuccess}
          message={successMessage}
          handleClose={handleCloseSuccess}
          id='successSnackbar'
        />
        <Grid container spacing={10} alignItems="center" justifyContent="center" className={classes.container}>
          <Grid item xs={12} md={8} className={classes.centerContainer}>
            <Card>
              <CardContent>
                <Stack>
                  <Typography variant='h5' color={Colors.primary}>
                    <strong>Swap</strong>
                  </Typography>
                  <Typography variant='body2' color={Colors.primary}>
                    Intercambia tus activos digitales al instante.
                  </Typography>
                </Stack>
                <Divider />
                <TradeTextField 
                  mainText='De' 
                  buyingInfo={buyingInfoI}
                  handleBoughtInfoChange={handleBoughtInfoChangeI}
                  fiats={fiatsI}
                  selectedAsset={selectedAssetI}
                  handleAsset={handleAssetI}
                />
                <Stack direction='row' justifyContent='center' color={Colors.primary}>
                  <ArrowDownward/>
                </Stack>
                <TradeTextField 
                  mainText='A' 
                  buyingInfo={buyingInfoF}
                  handleBoughtInfoChange={handleBoughtInfoChangeF}
                  fiats={fiatsF}
                  selectedAsset={selectedAssetF}
                  handleAsset={handleAssetF}
                />
                <Button
                  disabled={!enabledButton}
                  fullWidth
                  variant='contained' 
                  color='primary'
                  className={classes.submit}
                  onClick={() => {
                    console.log("Clicked")
                  }}
                  id='buyButton'
                  >
                  Comprar
                </Button>
              </CardContent>
            </Card>
          </Grid>
          {/* <Grid item xs={5} >
              <Card>
                <CardContent>
                  <Typography
                    margin='normal'
                    component='h5' variant='h5'
                  >
                    Resumen de compra
                  </Typography>
                  <Grid className={classes.container}>
                    <Grid item xs={8}>
                      <Typography
                        margin='normal'
                        fullWidth
                      >
                        Tasa:
                      </Typography>
                      <Typography
                        margin='normal'
                        fullWidth
                      >
                        Costos de compra:
                      </Typography>
                      <Typography
                        margin='normal'
                        fullWidth
                      >
                        Costos de transacción:
                      </Typography>
                      <Typography
                        margin='normal'
                        fullWidth
                      >
                        Gas requerido:
                      </Typography>
                      <Typography
                        margin='normal'
                        fullWidth
                      >
                        Costos financieros:
                      </Typography>
                      <Typography
                        margin='normal'
                        fullWidth
                        component='h6' variant='h6'
                      >
                        Total en COPC:
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        margin='normal'
                        fullWidth
                      >
                        0
                      </Typography>
                      <Typography
                        margin='normal'
                        fullWidth
                      >
                        0
                      </Typography>
                      <Typography
                        margin='normal'
                        fullWidth
                      >
                        0
                      </Typography>
                      <Typography
                        margin='normal'
                        fullWidth
                      >
                        0
                      </Typography>
                      <Typography
                        margin='normal'
                        fullWidth
                      >
                        0
                      </Typography>
                      <Typography
                        margin='normal'
                        fullWidth
                        component='h6' variant='h6'
                      >
                        0
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>*/}
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
  }
}));

BuySell.propTypes = {
  open: PropTypes.bool
};
