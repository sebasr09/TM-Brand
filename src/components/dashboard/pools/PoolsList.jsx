import { Add as AddIcon , ShoppingCart as ShoppingCartIcon , BeachAccess as BeachAccessIcon , Image as ImageIcon, Work as WorkIcon, Pool, ArrowDownward, Remove  } from '@mui/icons-material';

import React, { useState } from 'react';

import Colors from '../../../constants/Colors';
import ErrorSnackbar from '../../common/ErrorSnackbar';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import SuccessSnackbar from '../../common/SuccessSnackbar';
import { makeStyles } from '@mui/styles';
import { Doughnut, Line } from 'react-chartjs-2';
import PoolTextField from './PoolTextField';
//import TradeTextField

import {
  Typography,
  Dialog,
  Divider,
  Button,
  Grid,
  Stack,
  Card,
  List,
  Slide
} from '@mui/material';

import { CardContent } from '@mui/material';
import CopcoinLogoIcon from '../../../logos/icon-copcoin.png';
import { getBackgrounds } from '../../../utils';

export default function EnhancedTable() {
  const classes = useStyles();
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openSuccess, setOpenSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedPool, setSelectedPool] = useState({});
  const [pools, setPools] = useState([
    {name: "Estable USD", risk: 0, minTime: 0, produced: 0, produced_total: 1386000000, apy: 5.44, available: 0.87, lineData:[20, 24, 25, 18, 22, 29, 30, 35 ,41, 38], data: [29, 23, 15, 15, 10, 6], labels: ['USDT', 'USDC', 'ALUSD', 'USDP', 'USDN', 'GUSD'], description: 'Este Pool invierte en Activos estables de seguimiento del dólar estadounidense que respaldan el precio de su token manteniendo una inversión correspondiente 1: 1 en dólares estadounidenses por cada token emitido'}, 
    {name: "Alta Liquidez", risk: 0, minTime: 0, produced: 1200000, produced_total: 87500000, apy: 62.7, available: 2.43, lineData:[10, 18, 15, 8, 12, 19, 25, 30], data: [46.94, 11.31, 10.70, 7.74, 7.52, 7.50, 7.48], labels: ['USDT', 'VITE', 'GALA', 'TRON', 'DOGE', 'NEO', 'Chain Link', 'Elrond Gold', 'Fanton', 'Bitcoin', 'Algorand'], description: 'En este Pool se busca tener la mayor cantidad de su posicion en activos estables o de facil realizacion con posiciones intradia.'}, 
    {name: "Mediano Plazo", risk: 1, minTime: 90, logo: CopcoinLogoIcon, produced: 5800000, produced_total: 8685000000, apy:256.7, available: 16700, lineData:[32, 30, 30, 31, 40, 29, 30, 35], data: [6,6,6,6,6,6,7,7,7,7,7,7,7,7,7], labels: ['Binance', 'Tron', 'Bitcoin', 'BitcoinCash', 'Cardano', 'Chainlink', 'Dogecoin', 'Ethereum', 'Litecoin', 'Polkadot', 'Polygon', 'Solana', 'Stellar', 'Uniswap', 'VeChain'], description: 'Es Pool utiliza un proceso de inversión basado en reglas para distribuir los activos por igual entre los principales 15 AD.'},
    {name: "ESG", risk: 1, minTime: 180, logo: CopcoinLogoIcon, produced: 5800000, produced_total: 8685000000, apy:78.9, available: 16700, lineData:[30, 24, 25, 18, 22, 29, 40, 35], data: [10,6,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,3,3,3,3,3,3,2,2,2,2,2,2,2], labels: ['Bitcoin', 'Yeam', 'Maker', 'Handshake', 'Kusama', 'Mirror', 'Balncer', 'Universal', 'IOTA', 'Nano', 'Helium', 'Holo', 'Harmony', 'Casper', 'PolkaDot', 'Ethereum', 'Polygon', 'Bitminutes', 'Avalanche', 'DeFi','Telcoin', 'Thorchain', 'Fantom', 'VeChain', 'Digibyte', 'Terra', 'Solana', 'NEO','Algorand','BinanceCoin'], description: 'Este Pool se compone de inversiones en AD que cumplen con ciertos estándares discrecionales bajo uno o más de las siguientes categorías: Bienes públicos, Escalado e interoperabilidad, medioambientalmente Modelos de consenso sostenibles, sociales Impacto e inclusión financiera. Depósitos se aceptan diariamente en dólares estadounidenses y seleccionan CRIPTOMONEDAS.'},
    {name: "Largo Plazo", risk: 1, minTime: 180, logo: CopcoinLogoIcon, produced: 5800000, produced_total: 8685000000, apy:256.8, available: 16700, lineData:[20, 24, 25, 18, 22, 29, 30, 35], data: [46, 21, 7, 6 ,4 ,4, 3 ,3 ,3 ,3], labels: ['Bitcoin', 'Ethereum', 'Cardano', 'Binance Coin', 'Dogecoin', 'Polkadot', 'Uniswap', 'Sushi', 'Litecoin', 'Solana'], description: 'Este Pool tiene una inversión basado en reglas para diversificar estratégicamente los diez principales activos  digitales de mayor comercio.'}
  ]);

  const [stacked, setStacked] = useState(0);

  const handleCloseError = () => {
    setOpenError(false);
    setErrorMessage('');
  };

  const formatNumber = function(num) {
    return num.toLocaleString();
  };
  
  const options = {
    plugins: {
      legend: {
        display: false
      },
      tooltips: {
        display: false,
        enabled: false
      }
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false
      },
    },
  }; 

  const closeDialog = () => {
    setOpenDialog(false);
    setStacked(0);
  }
  const closeDetailDialog = () => {
    setOpenDetailDialog(false);
  }

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
    setSuccessMessage('');
  };

  return (
    <div className={classes.root}>
      <ErrorSnackbar open={openError} message={errorMessage} handleClose={handleCloseError} />
      <SuccessSnackbar
        open={openSuccess}
        message={successMessage}
        handleClose={handleCloseSuccess}
        id='successSnackbar'
      />
      <Paper className={classes.paper}>
      <Stack>
        <Typography variant='h5' color={Colors.primary}>
          <strong>Portafolios</strong>
        </Typography>
        <Typography variant='body2' color={Colors.primary}>
          Has parte de alguno de nuestros portafolios de tokens.
        </Typography>
      </Stack>
      <Divider />
      <Grid container alignItems="center" justifyContent="center" className={classes.container}>
        {pools.map((pool, index) => {
          return (
            <Grid key={index} item xs={12} md={4} className={classes.centerContainer}>
              <Card sx={{margin: '1em', borderRadius: '1em', color: Colors.white, background: 'linear-gradient(to right top, #76b7e8, #5899d9, #447ac8, #3e5ab3, #403999)'}}>
                <CardContent >
                  <Stack direction='column' justifyContent='center'>
                    <Stack direction='row' justifyContent='space-between'>
                      <Pool fontSize='large'/>
                      <Typography variant='h6'><strong>{`${pool.apy}% APY`}</strong></Typography>
                    </Stack>
                    <Typography variant='h4' color={Colors.primary}><strong>{pool.name}</strong></Typography>
                    <Stack direction='row' justifyContent='space-between'  marginBottom='1.5em' marginTop='0.5em' >
                      <Typography variant='h6'>{pool.risk==0?'Riesgo Bajo':'Riesgo Medio'}</Typography>
                      {
                        pool.risk>0?
                        (<Remove fontSize='large'/>):
                        (<ArrowDownward fontSize='large'/>)
                      }
                    </Stack>
                    <Line data={{labels: pool.lineData, datasets: [{data: pool.lineData, borderColor: Colors.primary}]}} options={options} />
                    <Typography variant='body1' color={Colors.primary}>Permanencia: {pool.minTime==0?'No': `${pool.minTime} días`}</Typography>
                    <Button
                      variant='contained' 
                      color='primary'
                      sx={{margin: '0.3em 1em'}}
                      onClick={() => {
                        setOpenDialog(true);
                        setSelectedPool(pool)
                      }}
                      id='buyButton'
                      >
                      Habilitar
                    </Button>
                    <Button 
                      sx={{margin: '0.3em 1em'}} 
                      onClick={() => {
                        setSelectedPool(pool)
                        setOpenDetailDialog(true);
                      }}>
                        Detalle
                      </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
        </Grid>
        <List
          sx={{
            width: '100%',
            bgcolor: 'background.paper',
          }}
        >
        </List>
        <Dialog
          open={openDialog}
          onClose={closeDialog}
          TransitionComponent={Transition}
          keepMounted
        >
          <Card>
            <CardContent>
              <Stack>
                <Typography variant='h5' color={Colors.primary}>
                  <strong>Pool</strong>
                </Typography>
                <Typography variant='body2' color={Colors.primary}>
                  Selecciona el monto que deseas usar.
                </Typography>
              </Stack>
              <Divider />
              <PoolTextField 
                mainText={`${selectedPool.name}`} 
                stacked={stacked}
                handleBoughtInfoChange={(event) => {
                  setStacked(event)
                }}
                selectedPool={selectedPool}
              />
            </CardContent>
          </Card>
        </Dialog>
        <Dialog
          open={openDetailDialog}
          onClose={closeDetailDialog}
          TransitionComponent={Transition}
          keepMounted
        >
          <Card sx={{overflow: 'overlay'}}>
            <CardContent >
              <Stack>
                <Typography variant='h5' color={Colors.primary}>
                  <strong>{selectedPool.name}</strong>
                </Typography>
                <Typography variant='body2' color={Colors.primary}>
                  {selectedPool.risk==0?'Riesgo Bajo':'Riesgo Medio'}
                </Typography>
              </Stack>
              <Divider />
              <Stack>
                {
                  selectedPool.labels &&
                  <Doughnut style={{margin: '0 5em'}} data={{labels: selectedPool.labels, datasets: [{data: selectedPool.data, backgroundColor: getBackgrounds(selectedPool.data.length) }]}} />
                }
                <Typography color={Colors.primary} m='1.5em' >
                  {selectedPool.description}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Dialog>
      </Paper>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    padding: '1% 3% 8%',
    [theme.breakpoints.down('xs')]: {
      width: '82%'
    }
  },
  buttonsGroup: {
    margin: 'auto'
  },
  newUserButton: {
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  },
  topButtons: {
    padding: '2% 0'
  },
  paper: {
    width: '100%',
    padding: '1em',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  },
  buttonCreate: {
    marginBottom: '2%'
  },
  buttonDelete: {
    backgroundColor: Colors.accent,
    color: Colors.white
  },
  buttonEdit: {
    backgroundColor: Colors.primary,
    color: Colors.white,
    marginRight: 10
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});
EnhancedTable.propTypes = {
  users: PropTypes.array
};
