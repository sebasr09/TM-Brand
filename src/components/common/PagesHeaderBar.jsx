import { IconButton, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import Colors from '../../constants/Colors';

export default function PagesHeaderBar({ title, subTitle, options, disabled }) {

  return (
    <>
      <Stack direction='row' justifyContent='space-between'>
        <Stack>
          <Typography variant='h5'>
            <strong>{title}</strong>
          </Typography>
          <Typography variant='h7'  >
          <strong>{subTitle}</strong>
          </Typography>
        </Stack>
        <Stack direction='row'>
          {options && options.map((row, index) => {
            return (
              <IconButton sx={{ color: Colors.accent, flexDirection: 'column', lineHeight: 0.5, wordWrap: 'break-word', maxWidth: '5rem', alignSelf: 'flex-start' }} onClick={() => row.action()} key={index} disabled={row.disabled}>
                {row.icon}
                <Typography variant='caption' color={row.disabled? Colors.mediumGray : Colors.accent}>
                  {row.text}
                </Typography>
              </IconButton>
            )
          })}
        </Stack>
      </Stack>
    </>
  )
}

PagesHeaderBar.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  options: PropTypes.array,
  disabled: PropTypes.bool
}