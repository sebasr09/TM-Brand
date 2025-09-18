import { Autocomplete, Container, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PagesHeaderBar from "../../components/common/PagesHeaderBar";
import { PropTypes } from 'prop-types';
import { S3Client, GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { Auth } from 'aws-amplify'
import awsmobile from '../../aws-exports-dev';

const Extracts = ({ userInfo }) => {

  const [extracts, setExtracts] = useState(null);
  const [selectedMonth, setSelecetedMonth] = useState('')
  const [cliente, setCliente] = useState(null)

  useEffect(async () => {

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
    });
    setCliente(client)
    const params = {
      Bucket: 'trademate-extracts',
      Prefix: userInfo.cognitoid
    }
    client.send(new ListObjectsV2Command(params))
      .then((response) => {
        let map = new Map()
        response.Contents.forEach((extract) => {
          const url = extract.Key
          const month = url.split('/')[1]
          if (map.get(month) === undefined) {
            map.set(month, [url])
          } else {
            map.set(month, [...map.get(month), url])
          }
        })
        setExtracts(map)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const getExtract = async (url) => {
    if (cliente) {
      const params = {
        Bucket: 'trademate-extracts',
        Key: url
      }
      const response = await cliente.send(new GetObjectCommand(params))
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
      const xd = await res.arrayBuffer()
      const blob = new Blob([xd], { type: 'application/pdf' })
      var link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `Extracto${url.split('/')[1]+''+url.split('/')[2]}.pdf`;
      link.dispatchEvent(new MouseEvent('click'));
    }
  }

  return (
    <Grid item sx={{ display: 'block' }} xs={12}>
      <Container sx={{ m: '1.7em 0 0.5em 0.5em' }}  >
        <PagesHeaderBar title='Extractos'
          options={[
            {
              icon:
                <></>
              , action: () => { },
            },
          ]} />
      </Container>
      <Grid item xs={4} sx={{ m: '2em' }}>
        <Autocomplete
          noOptionsText="No hay extractos disponibles"
          options={extracts ? Array.from(extracts.keys()) : []}
          getOptionLabel={(option) => option}
          onChange={(event, value) => value ? setSelecetedMonth(value) : ''}
          renderInput={(params) => (
            <TextField
              {...params}
              id="account"
              value={selectedMonth || ''}
              label="Selecciona un mes"
            />
          )}
        />
      </Grid>

      <Grid container sx={{ pb: { xs: '40px', md: '0' }, m: '3em 2em', pr: '1.2em' }}>
        {extracts && selectedMonth && extracts.get(selectedMonth).filter((extract) => extract.includes(selectedMonth)).map((pool) =>
          <Grid key={pool} item xs={12} sx={{mb: '2em'}} >
            <Typography variant="h5" component="span" onClick={() => getExtract(pool)}>
              {pool.split('/')[2]}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Grid>
  )
}

Extracts.propTypes = {
  userInfo: PropTypes.obj,
};

export default Extracts;