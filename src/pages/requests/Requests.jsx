import { Grid, Typography, Card, Button, IconButton } from "@mui/material"
import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { PropTypes } from 'prop-types';
import SubHeading from '../../components/common/utils/SubHeading';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { getApi } from '../../components/api/apiManager';
import { useToastContext } from "../../providers/ToastProvider";

const Requests = ({ user, userInfo, pools }) => {

  const isMobile = useMediaQuery({ query: '(max-width: 900px)' });
  const toast = useToastContext()

  const notifyLiquidateBasket = async (msj) => {
    try {
      //setOpenBackdrop(true);  
      await getApi(`next-activos/liquidateBasketAlert/${pools[0].id}/${userInfo.id}/${msj} `)
      toast.showToast({
        type: 'info',
        title: 'Notification Send',
        message: 'We have received your request, we will contact you soon.'
      })
      /*  setSuccessMessage('Tu asesor comercial se comunicará contigo proximamente')
      setOpenSuccess(true) */
    } catch (error) {
      toast.showToast({
        type: 'error',
        title: 'Error',
        message: "We can't send your request. Please try again later."
      })
      console.log(error);
      /* setOpenError(true);
      setErrorMessage('No fue posible cargar la lista de activos. Intenta de nuevo más tarde.'); */
    } finally {
      //setOpenBackdrop(false);
    }
  }

  return (
    <>
      <Grid item xs={12} md={10}>
        <SubHeading title={'Solicitudes'} />
        <Grid container>
          <Grid item xs={12}>
            <Card sx={{
              margin: isMobile? "0.5em 0.8em" : '0 3.5em 1em 3.5em',
              bgcolor: theme => theme.palette.secondary.dark
            }}>
              <Grid container alignItems='center'>
                <Grid item xs={10} md={11} sx={{
                  padding: '0.5em',
                }}>
                  <Typography variant="h6" sx={{
                    //color: theme => theme.palette.third.main,
                    fontWeight: '',
                    overflow: 'hidden',
                    maxHeight:  'auto',
                    margin: '0.5em 0 0.5em 1em'

                  }}>
                    Solicitud de retiro parcial
                  </Typography>
                </Grid>
                <Grid item xs={2} md={1} sx={{
                  padding: { xs: '0 1.5em 0 0', md: '0 0.6em' },
                  margin:  '1em 0' ,
                  display: 'flex',
                  alignItems: 'center',
                  'button': {
                    borderRadius: '24px',
                    backgroundColor: theme => theme.palette.action.selected,
                    color: theme => theme.palette.primary.main,
                    '&:hover': {
                      color: theme => theme.palette.text.primary
                    }
                  }
                }}>
                  <IconButton onClick={() => notifyLiquidateBasket('rendimientos')}> <ChevronRightIcon /> </IconButton>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{
              margin: isMobile? "0.5em 0.8em" : '0 3.5em 1em 3.5em',
              bgcolor: theme => theme.palette.secondary.dark
            }}>
              <Grid container alignItems='center'>
                <Grid item xs={10} md={11} sx={{
                  padding: '0.5em'
                }}>
                  <Typography variant="h6" sx={{
                    //color: theme => theme.palette.third.main,
                    fontWeight: '',
                    overflow: 'hidden',
                    maxHeight:  'auto',
                    margin: '0.5em 0 0.5em 1em'

                  }}>
                    Solicitud de compra
                  </Typography>
                </Grid>
                <Grid item xs={2} md={1} sx={{
                  padding: { xs: '0 1.5em 0 0', md: '0 0.6em' },
                  margin:  '1em 0' ,
                  display: 'flex',
                  alignItems: 'center',
                  'button': {
                    borderRadius: '24px',
                    backgroundColor: theme => theme.palette.action.selected,
                    color: theme => theme.palette.primary.main,
                    '&:hover': {
                      color: theme => theme.palette.text.primary
                    }
                  }
                }}>
                  <IconButton onClick={() => notifyLiquidateBasket('compra')}> <ChevronRightIcon /> </IconButton>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{
              margin: isMobile? "0.5em 0.8em" : '0 3.5em 1em 3.5em',
              bgcolor: theme => theme.palette.secondary.dark
            }}>
              <Grid container alignItems='center'>
                <Grid item xs={10} md={11} sx={{
                  padding: '0.5em'
                }}>
                  <Typography variant="h6" sx={{
                    //color: theme => theme.palette.third.main,
                    fontWeight: '',
                    overflow: 'hidden',
                    maxHeight:  'auto',
                    margin: '0.5em 0 0.5em 1em'
                  }}>
                    Solicitud de unirse a nuevo portafolio
                  </Typography>
                </Grid>
                <Grid item xs={2} md={1} sx={{
                  padding: { xs: '0 1.5em 0 0', md: '0 0.6em' },
                  margin:  '1em 0' ,
                  display: 'flex',
                  alignItems: 'center',
                  'button': {
                    borderRadius: '24px',
                    backgroundColor: theme => theme.palette.action.selected,
                    color: theme => theme.palette.primary.main,
                    '&:hover': {
                      color: theme => theme.palette.text.primary
                    }
                  }
                }}>
                  <IconButton onClick={() => notifyLiquidateBasket('unirse')}> <ChevronRightIcon /> </IconButton>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

Requests.propTypes = {
  user: PropTypes.object,
  userInfo: PropTypes.object,
  pools: PropTypes.array
};

export default Requests