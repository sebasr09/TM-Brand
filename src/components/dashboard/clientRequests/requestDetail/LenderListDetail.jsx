import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { Typography } from '@mui/material';
import UnavailableInformation from '../../../common/UnavailableInformation';

const LenderListDetail = ({ lenderList }) => {
  return (
    <React.Fragment>
      {lenderList && lenderList.length > 0 ? (
        <Grid container spacing={3}>
          {lenderList.map((lender, index) => (
            <Grid item xs={12} key={index}>
              <Typography id={`lenderName${index}`}>
                <ArrowRightIcon />
                {lender.name} - {lender.interestResult.interest + '%'}
              </Typography>
            </Grid>
          ))}
        </Grid>
      ) : (
        <UnavailableInformation />
      )}
    </React.Fragment>
  );
};

LenderListDetail.propTypes = {
  lenderList: PropTypes.array
};

export default LenderListDetail;
