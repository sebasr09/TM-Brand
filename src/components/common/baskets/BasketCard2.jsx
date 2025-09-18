import React from 'react';
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
  Paper,
  IconButton,
  Tooltip,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CardContent,
  Container
} from '@mui/material';
import MediaQuery from 'react-responsive';
import CIcon from 'react-crypto-icons';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { tooltipClasses } from '@mui/material/Tooltip';
import { makeStyles } from '@mui/styles';
import Colors from '../../../constants/Colors';
import { useMediaQuery } from 'react-responsive';
import { Line } from 'react-chartjs-2';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { sendMessage } from '../../api/messageManager';
import { useToastContext } from '../../../providers/ToastProvider';

const BasketCard2 = ({ pool, user }) => {
  const classes = useStyles();
  const isMobile = useMediaQuery({ query: '(max-width: 900px)' });
  const options = {
    plugins: {
      legend: {
        display: false
      },
      tooltips: {
        display: false,
        enabled: false
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false
      },
    },
    maintainAspectRatio: false,
  };

  const pooly = { lineData: [20, 24, 25, 18, 22, 29, 30, 35, 41, 38] }
  const toast = useToastContext()

  const notifyBasketBuy = async () => {
    const date = new Date().toLocaleDateString();
    await sendMessage(toast, {
      user: user.id,
/*       date: date,
 */      type: 3,
      state: 1,
      subject: 'Join Basket',
      msg: `${user.name} ${user.lastName} Request to join (${pool.name}) basket ${date}`,
    })
  };

  return (
    <Grid
      /* key={index} */
      item
      xs={12}

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
            <Typography variant='h6' color={theme => theme.palette.primary.main}>
              <strong>{pool.name}</strong>
            </Typography>
            <Stack direction='row'  alignItems='center' justifyContent='space-between' marginTop='1.5em'>
            <Typography color={theme => theme.palette.primary.main} variant='h7'  paddingLeft='0.4em'>
              <strong>{'Coins'}</strong>
            </Typography>
            <Stack direction='row' alignItems='center'>
                  <IconButton onClick={() => notifyBasketBuy()} sx={{ borderRadius: '5px', bgcolor: theme => theme.palette.primary.main, p: '0.1em 0.3em' }}>
                    <AddCircleIcon sx={{ color: theme => theme.palette.third.main, fontSize: 12 }} />
                    <Typography  sx={{ color: theme => theme.palette.third.main, marginLeft: '5px', fontSize: 10 }}>
                      Funds
                    </Typography>
                  </IconButton>
                </Stack>
            </Stack>
            <Grid
              container
              alignItems='center'
              className={classes.container}
            >
              <MediaQuery minDeviceWidth={460}>
                {pool.coins.slice(0, 3).map((coin, index) => {
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
                                size={7}
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
                {pool.coins.slice(0, 3).map((coin, index) => {
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
                                size={12}
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
              {pool.coins.length > 3 ? (
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
                        .slice(3, pool.coins.length)
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
                        secondary={'+' + (pool.coins.length - 3)}
                      ></ListItemText>
                    </ListItem>
                  </Grid>
                </NoMaxWidthTooltip>
              ) : (
                ''
              )}
            </Grid>
          </Stack>
        </CardContent>
        <Container sx={{ bgcolor: '#f0f0f0', height: '70px' }}>
          <Line data={{ labels: pooly.lineData, datasets: [{ data: pooly.lineData, borderColor: '#21dab9', backgroundColor: '#f0f0f0', pointRadius: 0, borderWidth: 1 }] }} options={options}  />
        </Container>
      </Card>
    </Grid>
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

    padding: '0 0.3em',
  },
  icoinsMobile: {

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

BasketCard2.propTypes = {
  pool: PropTypes.obj,
  user: PropTypes.obj,
};

export default BasketCard2;