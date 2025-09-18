import React from 'react';
import { Paper, Stack, Typography, Avatar } from '@mui/material';
import { PropTypes } from 'prop-types';

const HeaderMobile = ({userInfo}) => {

  return (
    <Paper sx={{ padding: '0.5em', bgcolor: 'transparent', margin: '0 1em 0 1em' }} elevation={0}>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Stack>
          <Typography variant='h5'>
            <strong> Hello</strong>
          </Typography>
          <Typography variant='h4'  sx={{ color: theme => theme.palette.secondary.dark }}>
            <strong>{userInfo.name}</strong>
          </Typography>
        </Stack>
        <Avatar sx={{
          bgcolor: theme => theme.palette.primary.main,
          color: theme => theme.palette.third.main
        }} >{userInfo.name[0]} </Avatar>
      </Stack>
    </Paper>
  )
}

HeaderMobile.propTypes = {
  userInfo: PropTypes.object,
}

export default HeaderMobile;