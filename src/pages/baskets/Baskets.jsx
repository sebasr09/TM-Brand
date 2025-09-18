import React, { useEffect, useState } from 'react';
import { Container, Grid, Box } from '@mui/material';
import { getApi } from "../../components/api/apiManager";
import BasketCard2 from '../../components/common/baskets/BasketCard2';
import PagesHeaderBar from '../../components/common/PagesHeaderBar';
import { PropTypes } from 'prop-types';

const excluded = [1, 3, 4, 5, 6, 8, 9]

const Baskets = ({userInfo}) => {

  const [pools, setPools] = useState([]);

  useEffect(() => {
    const getBaskets = async () => {
      try {
        const data = await getApi('next-activos/getAllBaskets');
        setPools(data.filter(p => !excluded.includes(p.id)));
      } catch (err) {
        console.log(err)
      }
    };
    getBaskets();
  }, []);


  return (
    <Grid item sx={{display: 'block'}} xs={12}>
    <Container sx={{m: '1.7em 0 0.5em 0.5em'}}  >
      <PagesHeaderBar title='Baskets'
        options={[
          {
            icon:
              <></>
            , action: () => { },
          },
        ]}  />
      </Container>
      <Grid container sx={{ pb: { xs: '40px', md: '0' }, m: '0 0.5em 0 0.7em', pr: '1.2em' }}>
        {pools.map((pool) =>
          <Grid key={pool.id} item xs={12} md={4}>
            <BasketCard2 pool={pool} user={userInfo}/>
          </Grid>
        )}
      </Grid>
    </Grid>
  )
}

Baskets.propTypes = {
  userInfo: PropTypes.obj,
};


export default Baskets;