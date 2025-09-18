import {
  AccountBalance,
  FindInPage as FindInPageIcon,
  Group as GroupIcon,
  ExpandLess,
  ExpandMore,
  Settings as Settings,
  MonetizationOn,
  ShoppingCart,
  Store,
  Public,
  PriceChange,
  LocalAtm,
  Business,
  AttachMoney,
  DeveloperBoard,
  AccountBalanceWallet as AccountBalanceWalletIcon,
  Pool as PoolIcon,
  VerticalAlignCenter,
  MonetizationOn as MonetizationOnIcon,
  AccountCircle,
  Logout,
  Dashboard as DashboardIcon,
  History,
  Savings,
  SwapHorizontalCircleOutlined as OperationIcon,
  CurrencyExchange,
  AutoGraph,
  GroupAdd
} from '@mui/icons-material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MoneyIcon from '@mui/icons-material/Money';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  CssBaseline,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Toolbar,
  Typography,
  Collapse,
  Stack,
  ButtonBase,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';

import { Auth } from 'aws-amplify';
import LoadingBackdrop from '../common/LoadingBackdrop';
import Notifications from './appBar/Notifications';
import PropTypes from 'prop-types';
import Sockette from 'sockette';
import Users from './users/UsersTable';
import Suppliers from './suppliers/SuppliersTable';
import { makeStyles } from '@mui/styles';
import { useMediaQuery } from 'react-responsive';
import CompanyMonetizationTable from './clientRequests/CompanyMonetizationTable';
import IncomeTable from './clientRequests/IncomeTable';
import SellTable from './clientRequests/SellTable';
import BuyTable from './clientRequests/BuyTable';
import CountriesTable from './params/CountriesTable';
import CoinsTable from './params/CoinsTable';
import CompaniesTable from './params/CompaniesTable';
import Trading from './trading/CryptosList';
import Pools from './pools/PoolsList';
import BuySell from './trading/BuyCrypto/BuySell';
import Colors from '../../constants/Colors';
import WalletView from './trading/wallet/WalletView';
import CashIn from './cashIn/CashIn';
import Dashboard from './dashboard/Dashboard';
import CashOut from './cashOut/CashOut';
import { formatNumber } from '../../utils';
import BasketRequests from './pools/BasketRequests';
import BasketOperations from './pools/BasketOperations';
import { useThemeContext } from '../../providers/ThemeProvider';
import AllNotifications from '../common/notifications/AllNotifications';
import TradingDashboard from './binanceTrading/TradingDashboard';
import SpotHistory from './binanceTrading/SpotHistory';
import PotentialCustomers from './users/PotentialCustomers';

// import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

let drawerWidth = 240;

const DashboardMain = ({
  triggerSessionValidation,
  user,
  billNumber,
  selectedSelection,
  userInfo,
  setUserInfo,
}) => {
  const isMobile = useMediaQuery({ query: '(max-width: 900px)' });
  //drawerWidth = isMobile ? 60 : 240;
  const [mobileOpen, setMobileOpen] = useState(false);

  const classes = useStyles();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [selection, setSelection] = useState(0);
  const [websocket, setWebsocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [pendingRequest, setPendingRequest] = useState(null);
  const [incomingRequest, setIncomingRequest] = useState(null);
  const [roles, setRoles] = useState([]);
  const [openLoading, setOpenLoading] = useState(false);
  const [openRequests, setOpenRequests] = useState(false);
  const [openParams, setOpenParams] = useState(false);
  const [openMarket, setOpenMarket] = useState(false);
  const [openBinance, setOpenBinance] = useState(false);

  const theme = useThemeContext();

  const handleMenuItemSelected = (itemIndex) => {
    setMobileOpen(false);
    setSelection(itemIndex);
  };

  const logout = async () => {
    setOpenLoading(true);
    await Auth.signOut({ global: true });
    setOpenLoading(false);
    triggerSessionValidation();
  };

  const pushNotification = useCallback((notify) => {
    setNotifications((previous) =>
      [...previous, notify].sort((a, b) => b.issueDate - a.issueDate)
    );
  }, []);

  const getUserRoles = async () => {
    if (user.signInUserSession.accessToken.payload['cognito:groups']) {
      setRoles(user.signInUserSession.accessToken.payload['cognito:groups']);
      console.log(user.signInUserSession.accessToken.payload['cognito:groups']);
    }
  };

  useEffect(() => {
    theme.changeMode('light');
    user && getUserRoles();
  }, [user]);

  const manageWebsocketMessage = (data) => {
    pushNotification(data);
    switch (data.type) {
      case 'SARLAFT_STATUS_UPDATE':
        setIncomingRequest(data.payload);
        break;
      case 'SARLAFT_PUSH_REQUEST':
        setPendingRequest(data.payload);
        break;

      default:
        break;
    }
  };

  const handleRequests = () => {
    setOpenRequests(!openRequests);
    setOpenParams(false);
    setOpenMarket(false);
    setOpenBinance(false);
  };

  const handleParams = () => {
    setOpenParams(!openParams);
    setOpenRequests(false);
    setOpenMarket(false);
    setOpenBinance(false);
  };

  const handleMarket = () => {
    setOpenMarket(!openMarket);
    setOpenParams(false);
    setOpenRequests(false);
    setOpenBinance(false);
  };

  const handleBinance = () => {
    setOpenBinance(!openBinance);
    setOpenParams(false);
    setOpenRequests(false);
    setOpenMarket(false);
  };

  useEffect(() => {
    if (user && !websocket) {
      const socket = new Sockette(
        process.env.CT_ENV === 'production'
          ? process.env.REACT_APP_WEBSOCKET_PROD
          : process.env.REACT_APP_WEBSOCKET_DEV,
        {
          timeout: 5e3,
          maxAttempts: 5e5,
          onopen: () => {
            socket.json({
              action: 'registerConnection',
              clientId: String(user.username),
            });
          },
          onmessage: (event) => {
            const data = JSON.parse(event.data);
            manageWebsocketMessage(data);
          },
          onerror: (error) => {
            console.log('ERROR', error);
          },
          onmaximum: (event) => console.log('Maximum Attempts', event),
          onclose: (event) => console.log('Closed', event),
        }
      );
      setWebsocket(socket);
    }
  }, [user, websocket, manageWebsocketMessage]);

  const markNotificationsAsRead = useCallback(() => {
    const readNotifications = notifications.map((notif) => {
      notif.notRead = false;
      return notif;
    });
    setNotifications([...readNotifications]);
  }, [notifications]);

  const selectInitialTab = (role) => {
    switch (role) {
      case 'admin':
        return 2;
      case 'lender':
        return 1;
      case 'kyc':
        return 3;
      case 'contracts':
        return 4;
      case 'carlaid':
        return 5;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (billNumber) setSelection(8);
    else if (selectedSelection) setSelection(selectedSelection);
    else {
      //roles && setSelection(selectInitialTab(roles[0]));
      roles && setSelection(0);
    }
  }, [roles, billNumber]);

  const selectDashboardTab = () => {
    switch (selection) {
      case 0:
        return (
          <Dashboard
            user={user}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
          />
        );
      case 1:
        return <CompanyMonetizationTable user={user} userInfo={userInfo} />;
      case 2:
        return <SellTable user={user} userInfo={userInfo} />;
      case 3:
        return <BuyTable user={user} userInfo={userInfo} />;
      case 4:
        return <IncomeTable user={user} userInfo={userInfo} />;
      case 5:
        return <CountriesTable user={user} userInfo={userInfo} />;
      case 6:
        return <CoinsTable user={user} userInfo={userInfo} />;
      case 7:
        return <CompaniesTable user={user} userInfo={userInfo} />;
      case 8:
        return <Suppliers />;
      case 9:
        return <Users />;
      case 10:
        return <Trading user={user} userInfo={userInfo} />;
      case 11:
        return <BuySell user={user} userInfo={userInfo} />;
      case 12:
        return <Pools user={user} userInfo={userInfo} />;
      case 13:
        return <WalletView />;
      case 14:
        return <CashIn user={user} userInfo={userInfo} />;
      case 15:
        return <CashOut user={user} userInfo={userInfo} />;
      case 16:
        return <BasketRequests />;
      case 17:
        return <BasketOperations userInfo={userInfo} roles={roles} />;
      case 18:
        return <AllNotifications />;
      case 19:
        return <TradingDashboard />;
      case 20: 
        return <SpotHistory />;
      case 21:
        return <PotentialCustomers />;
      default:
        return null;
    }
  };

  return (
    <div className={classes.root}>
      <LoadingBackdrop open={openLoading} />
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <div color='inherit'>
            <img
              src={'/images/TradeMate-w.svg'}
              alt='Logo Trade Mate'
              width='180'
              height='auto'
            />
          </div>
          <Notifications
            notifications={notifications}
            markAsRead={markNotificationsAsRead}
          />
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant={isMobile ? 'temporary' : 'permanent'}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        <div className={classes.toolbar} />
        <List sx={{ paddingBottom: '200px' }}>
          {(roles.includes('trader') || roles.includes('llc') || roles.includes('admin')) && (
            <div>
              <ListItem
                button
                onClick={handleRequests}
                id='requestsButton'
                className={openRequests ? classes.openGroup : ''}
              >
                <ListItemIcon>
                  <AccountBalance />
                </ListItemIcon>
                <ListItemText primary='Solicitudes' />
                {openRequests ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openRequests} timeout='auto' unmountOnExit>
                <Divider />
                <List component='div' disablePadding>
                  {roles.includes('admin') && (
                    <ListItem
                      button
                      className={classes.nested}
                      selected={selection === 1}
                      onClick={() => handleMenuItemSelected(1)}
                    >
                      <ListItemIcon>
                        <MonetizationOn />
                      </ListItemIcon>
                      <ListItemText primary='Monetizaciones empresas' />
                    </ListItem>
                  )}
                  {roles.includes('admin') && (
                    <ListItem
                      button
                      className={classes.nested}
                      selected={selection === 4}
                      onClick={() => handleMenuItemSelected(4)}
                    >
                      <ListItemIcon>
                        <AttachMoney />
                      </ListItemIcon>
                      <ListItemText primary='Ingresos extra' />
                    </ListItem>
                  )}
                  {roles.includes('admin') && (
                    <ListItem
                      button
                      className={classes.nested}
                      selected={selection === 2}
                      onClick={() => handleMenuItemSelected(2)}
                    >
                      <ListItemIcon>
                        <Store />
                      </ListItemIcon>
                      <ListItemText primary='Ventas' />
                    </ListItem>
                  )}
                  {roles.includes('admin') && (
                    <ListItem
                      button
                      className={classes.nested}
                      selected={selection === 3}
                      onClick={() => handleMenuItemSelected(3)}
                    >
                      <ListItemIcon>
                        <ShoppingCart />
                      </ListItemIcon>
                      <ListItemText primary='Compras' />
                    </ListItem>
                  )}
                  {(roles.includes('llc') || roles.includes('trader')) && (
                    <ListItem
                      button
                      className={classes.nested}
                      selected={selection === 16}
                      onClick={() => handleMenuItemSelected(16)}
                    >
                      <ListItemIcon>
                        <DeveloperBoard />
                      </ListItemIcon>
                      <ListItemText primary='Solicitudes Basket' />
                    </ListItem>
                  )}
                  {roles.includes('llc') && (
                    <ListItem
                      button
                      className={classes.nested}
                      selected={selection === 18}
                      onClick={() => handleMenuItemSelected(18)}
                    >
                      <ListItemIcon>
                        <DeveloperBoard />
                      </ListItemIcon>
                      <ListItemText primary='Solicitudes' />
                    </ListItem>
                  )}
                </List>
                <Divider />
              </Collapse>
              <ListItem
                button
                onClick={handleParams}
                id='requestsButton'
                className={openParams ? classes.openGroup : ''}
              >
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
                <ListItemText primary='Parámetros' />
                {openParams ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openParams} timeout='auto' unmountOnExit>
                <Divider />
                <List component='div' disablePadding>
                  {roles.includes('admin') && (
                    <ListItem
                      button
                      className={classes.nested}
                      selected={selection === 5}
                      onClick={() => handleMenuItemSelected(5)}
                    >
                      <ListItemIcon>
                        <Public />
                      </ListItemIcon>
                      <ListItemText primary='Paises' />
                    </ListItem>
                  )}
                  {roles.includes('admin') && (
                    <ListItem
                      button
                      className={classes.nested}
                      selected={selection === 6}
                      onClick={() => handleMenuItemSelected(6)}
                    >
                      <ListItemIcon>
                        <LocalAtm />
                      </ListItemIcon>
                      <ListItemText primary='Monedas' />
                    </ListItem>
                  )}
                  {roles.includes('admin') && (
                    <ListItem
                      button
                      className={classes.nested}
                      selected={selection === 7}
                      onClick={() => handleMenuItemSelected(7)}
                    >
                      <ListItemIcon>
                        <Business />
                      </ListItemIcon>
                      <ListItemText primary='Empresas' />
                    </ListItem>
                  )}
                  {roles.includes('admin') && (
                    <ListItem
                      button
                      className={classes.nested}
                      selected={selection === 8}
                      onClick={() => handleMenuItemSelected(8)}
                      id='suppliersButton'
                    >
                      <ListItemIcon>
                        <GroupIcon />
                      </ListItemIcon>
                      <ListItemText primary='Proveedores' />
                    </ListItem>
                  )}
                </List>
                <Divider />
              </Collapse>
            </div>
          )}
          {(roles.includes('admin') || roles.includes('llc') || roles.includes('trader')) && (
            <ListItem
              button
              selected={selection === 9}
              onClick={() => handleMenuItemSelected(9)}
              id='usersButton'
            >
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary='Usuarios' />
            </ListItem>
          )}
          {(roles.includes('admin') || roles.includes('llc')) && (
            <ListItem
              button
              selected={selection === 21}
              onClick={() => handleMenuItemSelected(21)}
              id='usersButton'
            >
              <ListItemIcon>
                <GroupAdd />
              </ListItemIcon>
              <ListItemText primary='Clientes Potenciales' />
            </ListItem>
          )}
          {(roles.includes('llc') || roles.includes('trader')) && (
            <ListItem
              button
              selected={selection === 17}
              onClick={() => handleMenuItemSelected(17)}
              id='basketsButton'
            >
              <ListItemIcon>
                <Savings />
              </ListItemIcon>
              <ListItemText primary='Baskets' />
            </ListItem>
          )}
          {roles.includes('trader') && (
            <div>
              <ListItem
                button
                onClick={handleBinance}
                id='binanceTrading'
                className={openBinance ? classes.openGroup : ''}
              >
                <ListItemIcon>
                  <CurrencyExchange />
                </ListItemIcon>
                <ListItemText primary='Binance Trading' />
                {openBinance ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openBinance} timeout='auto' unmountOnExit>
                <Divider />
                <List component='div' disablePadding>
                  {roles.includes('trader') && (
                    <ListItem
                      button
                      className={classes.nested}
                      selected={selection === 19}
                      onClick={() => handleMenuItemSelected(19)}
                      id='allBasketsButton'
                    >
                      <ListItemIcon>
                        <AutoGraph />
                      </ListItemIcon>
                      <ListItemText primary='Dashboard' />
                    </ListItem>
                  )}
                  {roles.includes('trader') && (
                    <ListItem
                      button
                      className={classes.nested}
                      selected={selection === 20}
                      onClick={() => handleMenuItemSelected(20)}
                      id='allBasketsButton'
                    >
                      <ListItemIcon>
                        <History />
                      </ListItemIcon>
                      <ListItemText primary='Spot History' />
                    </ListItem>
                  )}
                </List>
                <Divider />
              </Collapse>
            </div>
          )}
          {roles.includes('admin') && (
            <div>
              <ListItem
                button
                onClick={handleMarket}
                id='requestsButton'
                className={openMarket ? classes.openGroup : ''}
              >
                <ListItemIcon>
                  <VerticalAlignCenter />
                </ListItemIcon>
                <ListItemText primary='Trade' />
                {openMarket ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openMarket} timeout='auto' unmountOnExit>
                <Divider />
                <List component='div' disablePadding>
                  {roles.includes('trader') && (
                    <ListItem
                      button
                      className={classes.nested}
                      selected={selection === 10}
                      onClick={() => handleMenuItemSelected(10)}
                      id='usersButton'
                    >
                      <ListItemIcon>
                        <AccountBalanceWalletIcon />
                      </ListItemIcon>
                      <ListItemText primary='Precios' />
                    </ListItem>
                  )}
                  {roles.includes('trader') && (
                    <ListItem
                      button
                      className={classes.nested}
                      selected={selection === 11}
                      onClick={() => handleMenuItemSelected(11)}
                    >
                      <ListItemIcon>
                        <PriceChange />
                      </ListItemIcon>
                      <ListItemText primary='Swap' />
                    </ListItem>
                  )}
                  {roles.includes('trader') && (
                    <ListItem
                      button
                      className={classes.nested}
                      selected={selection === 12}
                      onClick={() => handleMenuItemSelected(12)}
                      id='usersButton'
                    >
                      <ListItemIcon>
                        <PoolIcon />
                      </ListItemIcon>
                      <ListItemText primary='Portafolios' />
                    </ListItem>
                  )}
                  {roles.includes('trader') && (
                    <ListItem
                      button
                      className={classes.nested}
                      selected={selection === 13}
                      onClick={() => handleMenuItemSelected(13)}
                    >
                      <ListItemIcon>
                        <MoneyIcon />
                      </ListItemIcon>
                      <ListItemText primary='Billetera' />
                    </ListItem>
                  )}
                </List>
                <Divider />
              </Collapse>
            </div>
          )}
          {roles.includes('admin') && (
            <ListItem
              button
              selected={selection === 14}
              onClick={() => handleMenuItemSelected(14)}
              id='usersButton'
            >
              <ListItemIcon>
                <MonetizationOnIcon />
              </ListItemIcon>
              <ListItemText primary='Deposito' />
            </ListItem>
          )}
          {roles.includes('admin') && (
            <ListItem
              button
              selected={selection === 15}
              onClick={() => handleMenuItemSelected(15)}
              id='usersButton'
            >
              <ListItemIcon>
                <LocalAtm />
              </ListItemIcon>
              <ListItemText primary='Retiro' />
            </ListItem>
          )}
        </List>
        <Stack
          direction='row'
          sx={{
            position: 'fixed',
            bottom: 0,
            padding: '1em',
            boxShadow: 'rgb(74 74 104 / 10%) 0px 2px 2px -1px inset',
            color: Colors.light.secondary,
            backgroundColor: Colors.light.primary,
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            borderRadius: '0 20px 0 0',
            width: 'inherit',
          }}
        >
          <AccountCircle fontSize='large' />
          <Stack
            sx={{
              margin: '0.1em auto',
            }}
          >
            <Typography
              sx={{
                color: Colors.light.white,
                lineHeight: 1,
                fontWeight: 'bold',
              }}
            >
              {`${userInfo.name} ${userInfo.lastName}`}
            </Typography>
            <Typography variant='caption'>
              {`Saldo:`}
              <strong> {formatNumber(userInfo.balance)}</strong> USD
            </Typography>
          </Stack>
          <ArrowForwardIosIcon fontSize='large' />
          <Divider
            sx={{
              flexBasis: '100%',
              borderColor: Colors.light.primaryTransparent,
              margin: '1em 0',
            }}
          />
          <ButtonBase
            sx={{
              flexDirection: 'column',
              lineHeight: 0.5,
              wordWrap: 'break-word',
            }}
            onClick={() => handleMenuItemSelected(0)}
          >
            <DashboardIcon />
            <Typography variant='caption' color={Colors.light.white}>
              Dashboard
            </Typography>
          </ButtonBase>
          <ButtonBase
            disabled
            sx={{
              flexDirection: 'column',
              lineHeight: 0.5,
              wordWrap: 'break-word',
            }}
            onClick={logout}
          >
            <History />
            <Typography variant='caption' color={Colors.light.white}>
              Historial
            </Typography>
          </ButtonBase>
          <ButtonBase
            sx={{
              flexDirection: 'column',
              lineHeight: 0.5,
              wordWrap: 'break-word',
            }}
            onClick={logout}
          >
            <Logout />
            <Typography variant='caption' color={Colors.light.white}>
              Cerrar Sesión
            </Typography>
          </ButtonBase>
        </Stack>
      </Drawer>
      {selectDashboardTab()}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  toolbarButtons: {
    marginLeft: '1%',
  },
  notificationsBadge: {
    marginLeft: 'auto',
  },
  toolbar: theme.mixins.toolbar,
  titleText: {
    textAlign: 'left',
    marginLeft: '2%',
  },
  nested: {
    paddingLeft: '1.8em',
    color: Colors.light.primary,
    '& .MuiListItemIcon-root': {
      color: Colors.light.primary,
    },
    '&$selected': {
      backgroundColor: Colors.light.primaryTransparent,
      color: Colors.light.secondary,
      '& .MuiListItemIcon-root': {
        color: Colors.light.secondary,
      },
    },
  },
  openGroup: {
    backgroundColor: Colors.light.primary,
    color: Colors.light.white,
    '& .MuiListItemIcon-root': {
      color: 'white',
    },
    '&:hover': {
      backgroundColor: Colors.light.secondary,
      '& .MuiListItemIcon-root': {
        color: 'white',
      },
    },
  },
}));

DashboardMain.propTypes = {
  triggerSessionValidation: PropTypes.func,
  user: PropTypes.object,
  billNumber: PropTypes.string,
  selectedSelection: PropTypes.number,
  userInfo: PropTypes.object,
  setUserInfo: PropTypes.function,
};

export default DashboardMain;
