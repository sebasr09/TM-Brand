import { List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

import { Info } from '@mui/icons-material';
import React from 'react';

const UnavailableInformation = () => (
  <List>
    <ListItem>
      <ListItemAvatar>
        <Info />
      </ListItemAvatar>
      <ListItemText primary="No hay información disponible" />
    </ListItem>
  </List>
);

export default UnavailableInformation;
