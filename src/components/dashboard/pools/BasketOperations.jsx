import {
  Add as AddIcon,
  ShoppingCart as ShoppingCartIcon,
  BeachAccess as BeachAccessIcon,
  Image as ImageIcon,
  Work as WorkIcon,
  Pool,
  ArrowDownward,
  Remove,
  ExpandMore,
} from '@mui/icons-material';

import React, { useState, useEffect } from 'react';

import Colors from '../../../constants/Colors';
import ErrorSnackbar from '../../common/ErrorSnackbar';
import {
  Paper,
  IconButton,
  Tooltip,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@mui/material';
import PropTypes from 'prop-types';
import SuccessSnackbar from '../../common/SuccessSnackbar';
import { makeStyles } from '@mui/styles';
import { Doughnut, Line } from 'react-chartjs-2';
import PoolTextField from './PoolTextField';
import BasketSwap from './BasketSwap';
import LoadingBackdrop from '../../common/LoadingBackdrop';
import { getApi } from '../../api/apiManager';
import CIcon from 'react-crypto-icons';
import MediaQuery from 'react-responsive';
import { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

import {
  Typography,
  Dialog,
  Divider,
  Button,
  Grid,
  Stack,
  Card,
  List,
  Slide,
  ListItem,
  ListItemText,
  CardActionArea,
} from '@mui/material';

import { CardContent } from '@mui/material';
import CopcoinLogoIcon from '../../../logos/icon-copcoin.png';
import { getBackgrounds } from '../../../utils';
import PagesHeaderBar from '../../common/PagesHeaderBar';
import BasketDetail from './BasketDetail';
import BasketBuyTokens from './BasketBuyTokens';

export default function BasketOperations({ roles, userInfo }) {
  const classes = useStyles();
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [openLlcDetailDialog, setOpenLlcDetailDialog] = useState(false);
  const [openBuyTokensDialog, setOpenBuyTokensDialog] = useState(false);
  const [selectedPool, setSelectedPool] = useState({});
  const [pools, setPools] = useState([]);
  const [stacked, setStacked] = useState(0);
  const [detalle, setDetalle] = useState(-1);

  const handleCloseError = () => {
    setOpenError(false);
    setErrorMessage('');
  };

  const formatNumber = function (num) {
    return num.toLocaleString();
  };

  const handlePoolSelected = function (poolIndex) {
    setDetalle(poolIndex);
  };

  const goToDetail = () => {
    return (
      <BasketDetail
        pool={pools[detalle]}
        roles={roles}
        handlePoolSelected={handlePoolSelected}
      />
    );
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltips: {
        display: false,
        enabled: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  };

  const closeDialog = () => {
    setOpenDialog(false);
    setStacked(0);
  };
  const closeDetailDialog = () => {
    setOpenDetailDialog(false);
  };

  const closeLlcDetailDialog = () => {
    setOpenLlcDetailDialog(false);
  };

  const closeBuyTokensDialog = () => {
    setOpenBuyTokensDialog(false);
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
    setSuccessMessage('');
  };

  const notifyBasketBuy = async (msj) => {
    try {
      setOpenBackdrop(true);
      await getApi(
        `next-activos/createBasketBuyAlert/${selectedPool.id}/${userInfo.id}/${msj} `
      );
      setSuccessMessage(
        'Tu asesor comercial se comunicará contigo proximamente'
      );
      setOpenSuccess(true);
    } catch (error) {
      console.log(error);
      setOpenError(true);
      setErrorMessage(
        'No fue posible cargar la lista de activos. Intenta de nuevo más tarde.'
      );
    } finally {
      setOpenBackdrop(false);
      closeDialog();
    }
  };

  useEffect(() => {
    const getBaskets = async () => {
      setOpenBackdrop(true);
      try {
        const data = await getApi('next-activos/getAllBaskets');
        setPools(data);
      } catch (err) {
        setOpenError(true);
        console.log(err);
        setErrorMessage(
          'No fue posible cargar los baskets. Intenta de nuevo más tarde.'
        );
      } finally {
        setOpenBackdrop(false);
      }
    };
    getBaskets();
  }, []);

  return (
    <div className={classes.root}>
      <LoadingBackdrop open={openBackdrop} />
      <ErrorSnackbar
        open={openError}
        message={errorMessage}
        handleClose={handleCloseError}
      />
      <SuccessSnackbar
        open={openSuccess}
        message={successMessage}
        handleClose={handleCloseSuccess}
        id='successSnackbar'
      />
      {detalle == -1 ? (
        <Paper className={classes.paper}>
          <PagesHeaderBar
            title='Portafolios'
            subTitle='Selecciona un portafolio para operar.'
          />
          <Divider />
          <Grid
            container
            alignItems='baseline'
            justifyContent='center'
            className={classes.container}
          >
            {pools.map((pool, index) => {
              return (
                <Grid
                  key={index}
                  item
                  xs={12}
                  md={6}
                  lg={4}
                  className={classes.centerContainer}
                >
                  <Card
                    sx={{
                      margin: '1em',
                      borderRadius: '1em',
                      minWidth: window.width > 459 ? '375px' : '0px',
                    }}
                  >
                    <CardContent>
                      <Stack direction='column' justifyContent='center'>
                        <Typography variant='h5' color={Colors.primary}>
                          <strong>{pool.name}</strong>
                        </Typography>
                        <Typography color={Colors.primary} marginTop='1.2em'>
                          {pool.description
                            ? pool.description
                            : 'Este Pool invierte en Activos estables de seguimiento del dólar estadounidense que respaldan el precio de su token manteniendo una inversión correspondiente 1: 1 en dólares estadounidenses por cada token emitido'}
                        </Typography>
                        <Grid
                          container
                          alignItems='center'
                          className={classes.container}
                        >
                          <MediaQuery minDeviceWidth={460}>
                            {pool.coins.slice(0, 4).map((coin, index) => {
                              return (
                                <div key={index}>
                                  <Grid item xs>
                                    <List
                                      container
                                      component={Stack}
                                      direction='row'
                                    >
                                      <ListItem
                                        item
                                        xs
                                        className={classes.icoins}
                                      >
                                        <IconButton className={classes.bot}>
                                          <CIcon
                                            name={coin.shortName.toLowerCase()}
                                            size={17}
                                          />
                                        </IconButton>
                                        <ListItemText
                                          secondary={coin.shortName}
                                        ></ListItemText>
                                      </ListItem>
                                    </List>
                                  </Grid>
                                </div>
                              );
                            })}
                          </MediaQuery>
                          <MediaQuery maxDeviceWidth={459}>
                            {pool.coins.slice(0, 4).map((coin, index) => {
                              return (
                                <div key={index}>
                                  <Grid item xs>
                                    <List
                                      container
                                      component={Stack}
                                      direction='row'
                                    >
                                      <ListItem
                                        item
                                        xs
                                        className={classes.icoinsMobile}
                                      >
                                        <IconButton
                                          className={classes.botMobile}
                                        >
                                          <CIcon
                                            name={coin.shortName.toLowerCase()}
                                            size={15}
                                          />
                                        </IconButton>
                                        <ListItemText
                                          secondary={coin.shortName}
                                        ></ListItemText>
                                      </ListItem>
                                    </List>
                                  </Grid>
                                </div>
                              );
                            })}
                          </MediaQuery>
                          {pool.coins.length > 4 ? (
                            <NoMaxWidthTooltip
                              className={classes.toolTip}
                              arrow
                              followCursor
                              title={
                                <List
                                  container
                                  component={Stack}
                                  direction='row'
                                  className={classes.toolTip}
                                >
                                  {pool.coins
                                    .slice(4, pool.coins.length)
                                    .map((coin, index) => {
                                      return (
                                        <div key={index}>
                                          <ListItem
                                            item
                                            xs
                                            className={classes.icoinsTooltip}
                                          >
                                            <IconButton
                                              className={classes.botTool}
                                            >
                                              <CIcon
                                                name={coin.shortName.toLowerCase()}
                                                size={17}
                                              />
                                            </IconButton>
                                            <ListItemText
                                              secondary={coin.shortName}
                                            ></ListItemText>
                                          </ListItem>
                                        </div>
                                      );
                                    })}
                                </List>
                              }
                            >
                              <Grid item xs>
                                <ListItem item xs className={classes.plusTool}>
                                  <ListItemText
                                    secondary={'+' + (pool.coins.length - 4)}
                                  ></ListItemText>
                                </ListItem>
                              </Grid>
                            </NoMaxWidthTooltip>
                          ) : (
                            ''
                          )}
                        </Grid>
                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls='panel1a-content'
                          >
                            Opciones
                          </AccordionSummary>
                          <AccordionDetails sx={{ display: 'grid' }}>
                            {roles && roles.includes('investor') && (
                              <>
                                <Button
                                  variant='contained'
                                  color='primary'
                                  sx={{ margin: '0.3em 1em' }}
                                  onClick={() => {
                                    setOpenDialog(true);
                                    setSelectedPool(pool);
                                  }}
                                  id='buyButton'
                                >
                                  Habilitar
                                </Button>
                                <Button
                                  variant='contained'
                                  color='primary'
                                  sx={{ margin: '0.3em 1em' }}
                                  onClick={() => {
                                    {
                                      handlePoolSelected(index);
                                    }
                                  }}
                                >
                                  Detalle
                                </Button>
                              </>
                            )}
                            {roles && roles.includes('llc') && (
                              <>
                                <Button
                                  variant='contained'
                                  color='primary'
                                  sx={{ margin: '0.3em 1em' }}
                                  onClick={() => {
                                    setSelectedPool(pool);
                                    setOpenLlcDetailDialog(true);
                                  }}
                                  id='buyButton'
                                >
                                  Retirar
                                </Button>
                                <Button
                                  variant='contained'
                                  color='primary'
                                  sx={{ margin: '0.3em 1em' }}
                                  onClick={() => {
                                    setSelectedPool(pool);
                                    setOpenBuyTokensDialog(true);
                                  }}
                                  id='buyButton'
                                >
                                  Ingresar
                                </Button>
                              </>
                            )}
                          </AccordionDetails>
                        </Accordion>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
          <List
            sx={{
              width: '100%',
              bgcolor: 'background.paper',
            }}
          ></List>
          <Dialog
            open={openDialog}
            onClose={closeDialog}
            TransitionComponent={Transition}
            keepMounted
          >
            <Card>
              <CardContent>
                <PagesHeaderBar
                  title='Invertir en Basket'
                  subTitle='Selecciona el monto que deseas invertir.'
                />
                <Divider />
                <PoolTextField
                  mainText={`${selectedPool.name}`}
                  stacked={stacked}
                  handleBoughtInfoChange={(event) => {
                    setStacked(event);
                  }}
                  selectedPool={{ short_name: 'USD' }}
                  action={() => notifyBasketBuy(stacked)}
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
            <Card sx={{ overflow: 'overlay' }}>
              <CardContent>
                <Stack>
                  <Typography variant='h5' color={Colors.primary}>
                    <strong>{selectedPool.name}</strong>
                  </Typography>
                  <Typography variant='body2' color={Colors.primary}>
                    {selectedPool.risk == 0 ? 'Riesgo Bajo' : 'Riesgo Medio'}
                  </Typography>
                </Stack>
                <Divider />
                <Stack>
                  {selectedPool.labels && (
                    <Doughnut
                      style={{ margin: '0 5em' }}
                      data={{
                        labels: selectedPool.labels,
                        datasets: [
                          {
                            data: selectedPool.data,
                            backgroundColor: getBackgrounds(
                              selectedPool.data.length
                            ),
                          },
                        ],
                      }}
                    />
                  )}
                  <Typography color={Colors.primary} m='1.5em'>
                    {selectedPool.description}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Dialog>
          <BasketSwap basket={selectedPool} open={openLlcDetailDialog} handleClose={closeLlcDetailDialog}/>
          <BasketBuyTokens basket={selectedPool} open={openBuyTokensDialog} handleClose={closeBuyTokensDialog} />
        </Paper>
      ) : (
        goToDetail()
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    padding: '1% 3% 8%',
    [theme.breakpoints.down('xs')]: {
      width: '82%',
    },
  },
  buttonsGroup: {
    margin: 'auto',
  },
  newUserButton: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  topButtons: {
    padding: '2% 0',
  },
  paper: {
    width: '100%',
    padding: '1em',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
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
    width: 1,
  },
  buttonCreate: {
    marginBottom: '2%',
  },
  buttonDelete: {
    backgroundColor: Colors.accent,
    color: Colors.white,
  },
  buttonEdit: {
    backgroundColor: Colors.primary,
    color: Colors.white,
    marginRight: 10,
  },
  icoins: {
    borderRight: '1px solid #bcbcbc',
    padding: '0 0.4em',
  },
  icoinsMobile: {
    borderRight: '1px solid #bcbcbc',
    padding: '0 0.3em',
  },
  icoinsTooltip: {
    padding: '0 0 0 0',
  },
  bot: {
    padding: '0 5px 0 4px',
  },
  botMobile: {
    padding: '0 3px 0 5px',
  },
  botTool: {
    padding: '0 3px 0 5px',
  },
  plusTool: {
    padding: '0 0 0 7px',
  },
}));

const NoMaxWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 'none',
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});
BasketOperations.propTypes = {
  roles: PropTypes.array,
  userInfo: PropTypes.object,
};
