import React, { useState, useEffect } from 'react';
import { Dialog, Slide, Card, CardContent, Grid, Stack, Typography, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { getApi } from '../../api/apiManager';
import { useMediaQuery } from 'react-responsive';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import { Auth } from 'aws-amplify'
import awsmobile from '../../../aws-exports-dev';
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";

const CommercialDialog = ({ openDialog, closeDialog, userInfo }) => {


  const [commercial, setCommercial] = useState({ name: '', lastName: '', email: '', cel: '' })
  const isMobile = useMediaQuery({ query: '(max-width: 900px)' });
  const [url, setUrl] = useState('/images/no-user.png')
  

  const getImage = async (commercialName, commercialLastName) => {
    try {
      const imageName = commercialName.concat(commercialLastName).replaceAll(' ', '');
      const imageFolder = imageName.toLowerCase();
      const COGNITO_ID = `cognito-idp.us-east-1.amazonaws.com/${awsmobile.aws_user_pools_id}`; // 'COGNITO_ID' has the format 'cognito-idp.REGION.amazonaws.com/COGNITO_USER_POOL_ID'
      const user = await Auth.currentAuthenticatedUser();
      const client = new S3Client({
        region: 'us-east-1', credentials: fromCognitoIdentityPool({
          client: new CognitoIdentityClient({ region: 'us-east-1' }),
          identityPoolId: awsmobile.aws_cognito_identity_pool_id,
          logins: {
            [COGNITO_ID]: user.signInUserSession.idToken.jwtToken
          }
        })
      })
      const params = {
        Bucket: 'trademate-crew-photos',
        Key: `${imageFolder}/${imageName}SmallSize.png`
      }
      const command = new GetObjectCommand(params)
      const response = await client.send(command)
      const reader = response.Body.getReader();
      const stream = new ReadableStream({
        start(controller) {
          return pump();
          function pump() {
            return reader.read().then(({ done, value }) => {
              // When no more data needs to be consumed, close the stream
              if (done) {
                controller.close();
                return;
              }
              // Enqueue the next data chunk into our target stream
              controller.enqueue(value);
              return pump();
            });
          }
        }
      })
      const res = new Response(stream)
      const blob = await res.blob()
      const newUrl = URL.createObjectURL(blob)
      setUrl(newUrl)
    }
    catch (err) {
      console.log(err)
      setUrl('/images/no-user.png')
    }
  }

  useEffect(() => {
    const getCommercial = async () => {
      getApi(`next-activos/getCommercialFromUser/${userInfo.id}`)
        .then((response) => {
          if (response !== null) {
            setCommercial(response)
            getImage(response.name, response.lastName)
          } else {
            setCommercial({ name: 'No tienes un asesor', lastName: 'asignado. Contáctanos por los siguientes medios:', email: 'info@trademate.tech', phoneNumber: '3046659271' })
          }
        })
        .catch(err => console.log(err))
    };
    getCommercial();
  }, [])

  return (
    <Dialog
      open={openDialog}
      onClose={closeDialog}
      TransitionComponent={Transition}
      keepMounted
    >
      <Card sx={{ background: 'linear-gradient(to bottom, #f4f4f4 0 37%, #caf7ef 37% 100%)', p: !isMobile ? '2em 3em 0em 3em' : '1em 0 0 0', minWidth: !isMobile ? '500px' : '0px' }}>
        <CardContent sx={{p: '2em'}}>
          <Grid container justifyContent='center'>
            <Grid item sx={12} md={4}>
              <Stack sx={{ borderRadius: '10px', border: '3px solid #43438E', width: '125.5px', bgcolor: theme => theme.palette.white.main }}>
                <img
                  src={url}
                  alt='No user logo'
                  style={{borderRadius: 7, width: 120, height: 120}}
                />
              </Stack>
            </Grid>
            <Grid item sx={12} md={1}></Grid>
            <Grid item sx={12} md={7}>
              <Stack sx={{ mt: '0.7em' }}>
                {!isMobile ? <img
                  src={'/images/TradeMate.svg'}
                  alt='Logo Trade Mate'
                  width='140'
                  height='auto'
                /> : <></>}
                <Stack sx={{ mt: !isMobile ? '2.5em' : '1em' }}>
                  <Typography variant='h6'>
                    <strong>{commercial.email === 'info@trademate.tech' ? '' : 'Hola! Soy '} {commercial.name + ' ' + commercial.lastName}</strong>
                  </Typography>
                  <Typography variant='body2' sx={{ mt: '0.3em' }}>
                    Correo
                  </Typography>
                  <Typography variant='h6' sx={{ mt: '-0.3em' }}>
                    <strong>{commercial.email.replace('financialomejor', 'trademate')}</strong>
                  </Typography>
                  <Typography variant='body2' sx={{ mt: '0.3em' }}>
                    Celular
                  </Typography>
                  <Typography variant='h6' sx={{ mt: '-0.3em' }}>
                    <strong>{commercial.phoneNumber}</strong>
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Dialog>
  )
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

CommercialDialog.propTypes = {
  openDialog: PropTypes.bool,
  closeDialog: PropTypes.func,
  userInfo: PropTypes.obj
}

export default CommercialDialog;