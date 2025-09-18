import React from 'react';
import { PropTypes } from 'prop-types';
import { Typography, Stack, IconButton } from '@mui/material';
import { useMediaQuery } from 'react-responsive';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

const SubHeading = ({ title, requestFilter, handleRequest }) => {

  const isMobile = useMediaQuery({ query: '(max-width: 900px)' });

  return (
    <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{
      m: !isMobile ? '1.2em 0 0.5em 1.5em' : '1em 0 0.5em 0.8em', borderBottom: '2px solid',
      borderImage: !isMobile ? 'linear-gradient(to right, #21dab9 ' + title.length + '%, rgb(46, 46, 99) ' + title.length + '%) 1'
        : 'linear-gradient(to right, #21dab9 ' + title.length * 3.5 + '%, rgb(46, 46, 99) ' + title.length * 3.5 + '%) 1', paddingBottom: '0.4em'
    }}>
      <Typography variant='h5'><strong>{title}</strong></Typography>
      {!isMobile && requestFilter !== 0 && <Stack direction='row' alignItems='center' sx={{ marginRight: isMobile ? '0' : '13em' }}>
        <IconButton onClick={() => handleRequest()} sx={{ borderRadius: '12px', border: '2px solid', borderColor: theme => theme.palette.third.main, p: '0.5em 1em' }}>
          <Typography sx={{ color: theme => theme.palette.primary.main, fontSize: 17 }}>
            <strong>{'New Request'}</strong>
          </Typography>
          <AddBoxOutlinedIcon sx={{ borderRadius: '5px', color: theme => theme.palette.third.main, marginLeft: '10px', fontSize: 22 }} />
        </IconButton>
      </Stack>}
    </Stack>
  )
}

SubHeading.propTypes = {
  title: PropTypes.string,
  requestFilter: PropTypes.number,
  handleRequest: PropTypes.func

}

export default SubHeading;