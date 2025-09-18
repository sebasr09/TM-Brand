import {
  Card,
  CardContent,
  Container,
  Grid,
  Slide,
  Button,
  Stack,
  Typography,
  Divider,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';

import React, { useEffect, useState, useCallback } from 'react';
import { getApi, postApi } from '../../api/apiManager';
import LoadingBackdrop from '../../common/LoadingBackdrop';
import ErrorSnackbar from '../../common/ErrorSnackbar';
import SuccessSnackbar from '../../common/SuccessSnackbar';
import CashInTextField from './CashInTextField';
import PaymentMethods from './PaymentMethods';
import Colors from '../../../constants/Colors';
import Binance from 'binance-api-node';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function CashIn() {
  const classes = useStyles();
  const client = Binance();
  const [userData, setUserData] = useState({
    quantity: 0,
    selectedAsset: '',
  });
  const [selectedAsset, setSelectedAsset] = useState({
    name: '',
    lastTradePrice: '',
  });
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);

  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  //Api Calls
  const getParams = async () => {
    try {
      const data = await getApi(`activos/params`);
      /*const coins = data.coins.filter((c)=>{return c.is_digital_asset});
      setFiats(coins);*/
    } catch (err) {
      setErrorMessage(
        'No fue posible cargar la información de la base de datos.'
      );
    }
  };

  useEffect(() => {
    getParams();
  }, [open]);

  const handleCloseError = () => {
    setOpenError(false);
    setErrorMessage('');
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
    setSuccessMessage('');
  };

  const handleDigitalAsset = () => {
    setUserData((previous) => {
      const newObject = { ...previous };
      newObject.is_digital_asset = !previous.is_digital_asset;
      return newObject;
    });
  };

  const handleClose = () => {
    setOpen(false);
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
            newObject['lastTradePrice'] = data;
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

  const handleAsset = (event, value) => {
    getAssetInfo(value);
    setSelectedAsset({ value: value });
  };

  return (
    <div className={classes.root}>
      <Container component='main' maxWidth='md'>
        <LoadingBackdrop open={openBackdrop} />
        <ErrorSnackbar
          open={openError}
          message={errorMessage}
          handleClose={handleCloseError}
          id='errorSnackbar'
        />
        <SuccessSnackbar
          open={openSuccess}
          message={successMessage}
          handleClose={handleCloseSuccess}
          id='successSnackbar'
        />
        <Grid
          container
          spacing={10}
          alignItems='center'
          justifyContent='center'
        >
          <Grid item xs={12} md={8} className={classes.centerContainer}>
            <Card className={classes.centerContainer}>
              <CardContent>
                <Stack>
                  <Typography variant='h5' color={Colors.primary}>
                    <strong>Recargar</strong>
                  </Typography>
                  <Typography variant='body2' color={Colors.primary}>
                    Agrega Copcoin a tu cuenta.
                  </Typography>
                </Stack>
                <Divider />
                <CashInTextField
                  mainText={'Cantidad'}
                  value={value}
                  handleBoughtInfoChange={(event) => {
                    setValue(event);
                  }}
                />
                <Button
                  variant='contained'
                  color='primary'
                  className={classes.submit}
                  onClick={() => {
                    console.log('Clicked');
                    setOpen(true);
                  }}
                  id='buyButton'
                >
                  Proceder al pago
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={10} className={classes.centerContainer}>
            <Slide
              direction='up'
              in={open}
              mountOnEnter
              unmountOnExit
              className={classes.centerContainer}
            >
              <Card open={open} onClose={handleClose}>
                <CardContent>
                  <Stack>
                    <Typography variant='h5' color={Colors.primary}>
                      <strong>Métodos de pago</strong>
                    </Typography>
                    <Typography variant='body2' color={Colors.primary}>
                      Escoge tu método de pago.
                    </Typography>
                  </Stack>
                  <Divider />
                  <PaymentMethods mainText={'Recargar'} value={value} />
                  <Button
                    variant='contained'
                    color='primary'
                    className={classes.submit}
                    onClick={() => {
                      setOpen(false);
                    }}
                    id='buyButton'
                  >
                    Cancelar
                  </Button>
                </CardContent>
              </Card>
            </Slide>
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
      width: '100%',
    },
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  container: {
    display: 'flex',
    justifyContent: 'left',
  },
  progress: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(1),
  },
  centerContainer: {
    margin: '0.2em auto',
  },
}));

CashIn.propTypes = {
  open: PropTypes.bool,
};
