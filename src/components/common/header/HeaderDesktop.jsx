import React from 'react';
import { Paper, Stack, Typography, Avatar } from '@mui/material';
import {PropTypes} from 'prop-types';

const HeaderDesktop = ({userInfo}) => {

  return (
      <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{padding: '2.5em 0.5em'}}>
        <Stack direction='row' justifyContent='space-between' alignItems='center' >
          <Avatar variant='rounded' sx={{
            bgcolor: theme => theme.palette.primary.main,
            color: theme => theme.palette.third.main,
            margin: ' 0 0.7em'
          }} >{userInfo.name[0] + '' + userInfo.lastName[0]} </Avatar>
          <Stack>
            <Typography variant='h7'>
              <strong>Bienvenido</strong>
            </Typography>
            <Typography variant='h6'  sx={{ color: theme => theme.palette.secondary.dark }}>
              <strong>{userInfo.companies.length > 0 ? userInfo.companies[0].name : userInfo.name + ' ' + userInfo.lastName}</strong>
            </Typography>
          </Stack>
        </Stack>
      </Stack>
  )
}

HeaderDesktop.propTypes = {
  userInfo: PropTypes.object,
}

export default HeaderDesktop;