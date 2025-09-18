import React, { useState } from 'react';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Profile from '../../../pages/profile/Profile';
import Overview from '../../../pages/overview/Overview';
import Requests from '../../../pages/requests/Requests';
import Settings from '../../../pages/settings/Settings';
import Notifications from '../../../pages/notifications/Notifications';
import { Add, Login, Logout, ReportProblemOutlined, MeetingRoom, SupportAgent, Folder } from '@mui/icons-material';
import { sendMessage } from '../../api/messageManager';
import { logOut } from '../../../providers/UserProvider';
import Baskets from '../../../pages/baskets/Baskets';
import Extracts from '../../../pages/extracts/extracts';

export const menuOptionVariant = {
  Primary: 'primary',
  Secondary: 'seondary',
  Third: 'third',
  Main: 'main',
};

export const menuOptions = {
  Dashboard: {
    label: 'Dashboard',
    icon: <AccountCircleOutlinedIcon />,
    variant: menuOptionVariant.Primary,
    disabled: false,
    page: (props) => <Overview {...props} />,
  },
  Baskets: {
    label: 'Baskets',
    icon: <BarChartRoundedIcon />,
    variant: menuOptionVariant.Primary,
    disabled: false,
    page: (props) => <Baskets {...props} />,
  },
  Extratcs: {
    label: 'Extractos',
    icon: <Folder />,
    variant: menuOptionVariant.Primary,
    disabled: false,
    page: (props) => <Extracts {...props} />,
  },
  /* Menu: {
    label: 'Menu',
    icon: <MenuRounded/>,
    variant: menuOptionVariant.Main,
    disabled: false,
    page: (props) => <Requests {...props} />,
  }, */
  Requests: {
    label: 'Solicitudes',
    icon: <AddBoxOutlinedIcon />,
    variant: menuOptionVariant.Third,
    disabled: false,
    page: (props) => <Notifications {...props} />,
  },
  /* Settings: {
    label: 'Settings',
    icon: <SettingsOutlinedIcon />,
    variant: menuOptionVariant.Primary,
    disabled: true,
    page: (props) => <Settings {...props} />,
  }, */
  PartialWitdrawal: {
    label: 'Partial Witdrawal',
    icon: <Logout />,
    variant: menuOptionVariant.Secondary,
    disabled: false,
    filter: 1,
    action: (user, date, toast) =>
      sendMessage(toast, {
        user: user.id,
        date: date,
        type: 1,
        state: 1,
        subject: 'Partial Withdrawal',
        msg: `${user.name} ${user.lastName} requested a partial withdrawal ${date}`,
      }),
  },
  BuyRequest: {
    label: 'Buy Request',
    icon: <Login />,
    variant: menuOptionVariant.Secondary,
    disabled: false,
    filter: 2,
    action: (user, date, toast) =>
      sendMessage(toast, {
        user: user.id,
        date: date,
        type: 2,
        state: 1,
        subject: 'Buy Request',
        msg: `${user.name} ${user.lastName} requested add funds ${date}`,
      }),
  },
  JoinBasket: {
    label: 'Join Basket',
    icon: <Add />,
    variant: menuOptionVariant.Secondary,
    disabled: false,
    filter: 3,
    action: (user, date, toast) =>
      sendMessage(toast, {
        user: user.id,
        date: date,
        type: 3,
        state: 1,
        subject: 'Join Basket',
        msg: `${user.name} ${user.lastName} requested join new basket ${date}`,
      }),
  },
  ReportProblem: {
    label: 'Report Problem',
    icon: <ReportProblemOutlined />,
    variant: menuOptionVariant.Secondary,
    disabled: false,
    filter: 4,
    action: (user, date, toast) =>
      sendMessage(toast, {
        user: user.id,
        date: date,
        type: 4,
        state: 1,
        subject: 'Report Problem',
        msg: `${user.name} ${user.lastName} requested a problem to be fixed ${date}`,
      }),
  },
  Commercial: {
    label: 'Asesor',
    icon: <SupportAgent />,
    variant: menuOptionVariant.Primary,
    disabled: false,
  },
  LogOut: {
    label: 'Logout',
    icon: <MeetingRoom />,
    variant: menuOptionVariant.Primary,
    disabled: false,
    action: async (triggerSessionValidation) =>
      {
        await logOut()
        triggerSessionValidation()
      }
      ,
  },
};

export default function useMenuController(user) {
  const [selected, setSelected] = useState(menuOptions.Overview);

  return [selected, setSelected];
}
