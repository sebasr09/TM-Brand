import React, { useEffect, useState } from 'react';
import { Button, Grid, Typography, TextField, Stack, Paper, Avatar, IconButton } from '@mui/material';
import { PropTypes } from 'prop-types';
import SignDrawer from './SignDrawer';
import awsmobile from '../../aws-exports-dev';
import { Auth } from 'aws-amplify'
import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { PDFDocument } from 'pdf-lib';
import { AccountCircleOutlined, StyleOutlined } from '@mui/icons-material';
import { getApi } from '../../components/api/apiManager';
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

const Kyc = ({ userInfo, triggerSessionValidation }) => {

  const [pdfDoc, setPdfDoc] = useState(null);
  const [pdfUrl, setPdfUrl] = useState('')
  const [cc, setCc] = useState(true);
  const [fondos, setFondos] = useState(true);
  const [contrato, setContrato] = useState(true);
  const [origen, setOrigen] = useState('');
  const [file, setFile] = useState(null);
  const [cliente, setCliente] = useState(null);
  const [redo, setRedo] = useState(true);

  const getPdf = async (name, client) => {
    try {
      const params = {
        Bucket: 'trademate-kyc',
        Key: name
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
      const xd = await res.arrayBuffer()
      if (name === `${userInfo.cognitoid}/Contrato.pdf`) {
        const contrato = await PDFDocument.load(xd);
        const date = new Date()
        const form = contrato.getForm();
        const diasField = form.getTextField('dias')
        diasField.setFontSize(10)
        diasField.setText('  ' + date.getDate())
        const mesField = form.getTextField('mes')
        mesField.setFontSize(10)
        mesField.setText('  ' + months[date.getMonth()])
        const anioField = form.getTextField('anio')
        anioField.setFontSize(10)
        anioField.setText('  ' + date.getFullYear())
        const pdfBytes = await contrato.save()
        setPdfDoc(contrato)
        const blob = new Blob([pdfBytes], { type: 'application/pdf' })
        setPdfUrl(URL.createObjectURL(blob))
      } else {
        setPdfDoc(await PDFDocument.load(xd))
        const blob = new Blob([xd], { type: 'application/pdf' })
        setPdfUrl(URL.createObjectURL(blob))
      }
    }
    catch (err) {
      console.log(err)
    }
  }


  const previsualizar = async (sign, data) => {
    if (origen !== '' && data.length > 0 && (file || cc)) {
      const signature = await pdfDoc.embedPng(sign)
      const date = new Date()
      const form = pdfDoc.getForm();
      const nameField = form.getTextField('Yo')
      nameField.setText('  ' + userInfo.name + ' ' + userInfo.lastName)
      const idField = form.getTextField('identidad No')
      idField.setText('  ' + userInfo.identification)
      const paisField = form.getTextField('expedido en')
      paisField.setText('  ' + userInfo.country.name)
      const origenField = form.getTextField('provienen de las siguientes actividades lícitas')
      origenField.setFontSize(10)
      origenField.setText('  ' + origen)
      const diasField = form.getTextField('los')
      diasField.setText('  ' + date.getDate())
      const mesField = form.getTextField('de')
      mesField.setText('  ' + months[date.getMonth()])
      const anioField = form.getTextField('del año')
      anioField.setText('  ' + date.getFullYear())
      const ciudadField = form.getTextField('ciudad')
      ciudadField.setText('  Miami, FL')
      const name2Field = form.getTextField('Nombre')
      name2Field.setText('  ' + userInfo.name + ' ' + userInfo.lastName)
      const signField = form.getTextField('Firma')
      signField.setImage(signature)
      const id2Field = form.getTextField('ID')
      id2Field.setText('  ' + userInfo.identification)
      form.flatten();
      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const putCommand = new PutObjectCommand({ Bucket: 'trademate-kyc', Key: `${userInfo.cognitoid}/Origen-Fondos.pdf`, Body: blob });
      cliente.send(putCommand)
        .then((response) => {
          window.open(URL.createObjectURL(blob))
          setRedo(!redo)
        })
        .catch((err) => {
          console.log(err);
        })
      if (file) {
        enviarIdentificacion()
      }
    } else {
      console.log('Los campos no están completos.')
    }
  }

  const firmarContrato = async (sign, data) => {
    if (contrato !== '' && data.length > 0 ){
      const signature = await pdfDoc.embedPng(sign) 
      const form = pdfDoc.getForm();
      const signField = form.getTextField('firma')
      signField.setImage(signature)
      form.flatten();
      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const putCommand = new PutObjectCommand({ Bucket: 'trademate-kyc', Key: `${userInfo.cognitoid}/Contrato-Firmado.pdf`, Body: blob });
      cliente.send(putCommand)
        .then((response) => {
          window.open(URL.createObjectURL(blob))
          setRedo(!redo)
        })
        .catch((err) => {
          console.log(err);
        })
    }
    else {
      console.log('Los campos no están completos.')
    }
  }

  useEffect(async () => {
    if (userInfo.companies.length > 0) {
      console.log('hols')
    } else {
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
      setCliente(client);
      const ccParams = {
        Bucket: 'trademate-kyc',
        Key: `${userInfo.cognitoid}/Identificacion.pdf`
      }
      const fondosParams = {
        Bucket: 'trademate-kyc',
        Key: `${userInfo.cognitoid}/Origen-Fondos.pdf`
      }
      const contratoParams = {
        Bucket: 'trademate-kyc',
        Key: `${userInfo.cognitoid}/Contrato-Firmado.pdf`
      }
      client.send(new GetObjectCommand(ccParams))
        .then((response) => { setCc(true) })
        .catch((err) => {
          if (err.name === 'NoSuchKey') {
            setCc(false)
          } else {
            setCc(false)
          }
        })
      client.send(new GetObjectCommand(fondosParams))
        .then((response) => { setFondos(true) })
        .catch((err) => {
          if (err.name === 'NoSuchKey') {
            setFondos(false);
            getPdf('templates/Origen-Fondos.pdf', client)
          } else {
            console.log(err)
            getPdf('templates/Origen-Fondos.pdf', client)
            setFondos(false);
          }
        })
      client.send(new GetObjectCommand(contratoParams))
        .then((response) => { setContrato(true) })
        .catch((err) => {
          if (err.name === 'NoSuchKey') {
            setContrato(false);
            getPdf(`${userInfo.cognitoid}/Contrato.pdf`, client)
          } else {
            console.log(err)
            getPdf(`${userInfo.cognitoid}/Contrato.pdf`, client)
            setContrato(false);
          }
        })
    }
  }, [redo])

  const enviarIdentificacion = () => {
    const putCommand = new PutObjectCommand({ Bucket: 'trademate-kyc', Key: `${userInfo.cognitoid}/Identificacion.pdf`, Body: file });
    cliente.send(putCommand)
      .then((response) => setRedo(!redo))
      .catch((err) => {
        console.log(err);
      })
  }

  const refreshKYC = async () => {
    try {
      const result = await getApi(`next-activos/findUserByEmail/${userInfo.email}`);
      if (result.kycid !== userInfo.kycid) {
        window.localStorage.setItem('user-info', JSON.stringify(result));
        triggerSessionValidation()
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Grid container sx={{ m: { lg: '1.7em 0 0.5em 2.5em', xs: '1.7em 0 0.5em 1.5em' } }}>
      <Grid item xs={11} sx={{ m: { lg: '0 0 2em 0', xs: '1em 0 2.5em 0' } }} >
        <Stack direction='row' alignItems='center' sx={{ justifyContent: { xs: 'center', lg: 'left' } }}>
          <AccountCircleOutlined sx={{ mr: { lg: '0.8em', xs: '0.3em' }, fontSize: '30px' }} />
          <Typography variant={'h5'} sx={{ fontFamily: "Montserrat Bold" }}>
            <strong>Completa tu perfil</strong>
          </Typography>
        </Stack>
      </Grid>
      {userInfo.kycid === '0' && (<>
        {!cc && (<Grid item xs={11} lg={4}>
          <Paper sx={{ p: '1.5em' }} justifyContent='center' alignItems='center'>
            <Stack>
              <Typography variant={'h6'} sx={{ m: '1em 0', fontFamily: "Montserrat Bold", textAlign: 'center' }}>
                <strong>Carga tu identificación</strong>
              </Typography>
              <IconButton component='label' sx={{ m: '3em auto', height: '150px', width: '150px', bgcolor: theme => theme.palette.white.main, outline: '2px solid lightgray', outlineOffset: '5px' }} >
                <input hidden accept="application/pdf" type="file" multiple={false} onChange={(event) => {
                  setFile(event.target.files[0])
                }} />
                <StyleOutlined sx={{ fontSize: '120px', color: theme => theme.palette.primary.main, border: '2px solid lightgray', borderRadius: '50%', p: '20px', bgcolor: theme => theme.palette.lightgray.main }} />
              </IconButton>
              <Stack justifyContent='center'>
                {!file && <Button variant="contained" component="label" color='primary' fullWidth sx={{ fontFamily: "Montserrat Bold", fontSize: 'medium', m: '1em 0', borderRadius: '18px', p: '0.5em 0' }}>
                  Subir
                  <input hidden accept="application/pdf" type="file" multiple={false} onChange={(event) => {
                    setFile(event.target.files[0])
                  }} />
                </Button>}
                {file && <Typography variant={'h6'} sx={{ m: '1em auto', fontFamily: "Montserrat Bold" }}>
                  {file.name}
                </Typography>}
                {file && fondos && <Button variant="contained" color='primary' fullWidth sx={{ fontFamily: "Montserrat Bold", fontSize: 'medium', m: '1em 0', borderRadius: '18px', p: '0.5em 0' }} onClick={() => { enviarIdentificacion() }}>
                  Enviar
                </Button>}
              </Stack>
            </Stack>
          </Paper>
        </Grid>)}
        {!fondos && (<Grid item xs={11} lg={6} sx={{ ml: { lg: '4em', xs: 0 }, mt: { xs: '3em', lg: 0 } }}>
          <Typography variant={'h6'} sx={{ fontFamily: "Montserrat Bold" }}>
            <strong>Diligencia el formulario de origen de fondos</strong>
          </Typography>
          <Typography sx={{ m: '1.5em 0', fontFamily: "Montserrat Light", fontSize: '15px', lineHeight: '2' }}>
            En la siguiente casilla describe con detalle y claridad la fuente de origen de recursos. Respuestas generales como &quot;herencia familiar&quot; o &quot;empresario&quot; no son aceptables; se deben proporcionar tantos detalles como sea posible.
          </Typography>
          <TextField
            rows={6}
            variant='outlined'
            margin='normal'
            fullWidth
            sx={{ mt: '1em', bgcolor: theme => theme.palette.white.main }}
            label={`Descripción de origen de fondos \u00A0 \u00A0 \u00A0`}
            InputLabelProps={{ style: { fontFamily: "Montserrat Light", fontWeight: 'Bold' } }}
            inputProps={{ style: { fontFamily: "Montserrat Light", fontWeight: 'Bold' } }}
            name='Origen'
            autoComplete='Origen'
            autoFocus
            multiline
            value={origen}
            onChange={(event) => setOrigen(event.target.value)}
          />
        </Grid>
        )}
        {!fondos && (<Grid item xs={11} sx={{ mt: '2em', mr: { xs: 0, lg: '10em' } }}>
          <Paper sx={{ p: '1.5em' }} justifyContent='center'>
            <SignDrawer accion={previsualizar} />
          </ Paper>
          <Typography sx={{ fontFamily: "Montserrat Light", fontSize: '15px', lineHeight: '2', fontStyle: 'italic', mt: '2em' }}>
            Al enviar tus datos se abrirá una copia del documento en una nueva pestaña, para que pueda ser descargada.
          </Typography>
        </Grid>
        )}
        {
          cc && fondos && (<><Grid item xs={12}>
            <Typography sx={{ mt: '1em', fontFamily: "Montserrat Light", fontSize: '15px', lineHeight: '2' }}>
              <strong>Tus documentos están en revisión. Un asesor se comunicará contigo cuando hayan sido revisados.</strong>
            </Typography>
          </Grid>
            <Grid item xs={12} sm={3} md={4} lg={2}>
              <Button variant="contained" color='primary' fullWidth sx={{ fontFamily: "Montserrat Bold", fontSize: 'small', m: '2em 0', borderRadius: '18px', p: '0.5em 0' }} onClick={() => { refreshKYC() }}>
                Refrescar
              </Button>
            </Grid></>)
        }
      </>)}
      {
        userInfo.kycid === '1' && (<>
          {
            !contrato && pdfUrl ?
              <>
                <Grid item xs={11}>
                  <Paper sx={{ p: '1.5em' }} justifyContent='center' alignItems='center'>
                    <Stack sx={{ p: '0 1em' }}>
                      <Typography variant={'h6'} sx={{ m: '1em 0', fontFamily: "Montserrat Bold", textAlign: 'center' }}>
                        <strong>Contrato</strong>
                      </Typography>
                      <object type="application/pdf" data={pdfUrl} height={window.innerWidth < 400 ? window.innerWidth * 0.7 : window.innerWidth * 0.5} object-fit='fill' >
                        <p style={{ fontFamily: "Montserrat Bold", textAlign: 'center' }}>Si no puedes visualizar el contrato, descargalo<a href={pdfUrl} download='Contrato'> aquí!</a></p>
                      </object>
                    </Stack>
                  </Paper>
                </Grid>
                <Grid item xs={11} sx={{ mt: '2em' }}>
                  <Paper sx={{ p: '1.5em' }} justifyContent='center'>
                    <SignDrawer accion={firmarContrato} />
                  </ Paper>
                  <Typography sx={{ fontFamily: "Montserrat Light", fontSize: '15px', lineHeight: '2', fontStyle: 'italic', mt: '2em' }}>
                    Al enviar tus datos se abrirá una copia del documento en una nueva pestaña, para que pueda ser descargada.
                  </Typography>
                </Grid></>
              : <><Grid item xs={12}>
                <Typography sx={{ mt: '1em', fontFamily: "Montserrat Light", fontSize: '15px', lineHeight: '2' }}>
                  <strong>El contrato está en revisión. Un asesor se comunicará contigo cuando haya sido revisado.</strong>
                </Typography>
              </Grid>
                <Grid item xs={12} sm={3} md={4} lg={2}>
                  <Button variant="contained" color='primary' fullWidth sx={{ fontFamily: "Montserrat Bold", fontSize: 'small', m: '2em 0', borderRadius: '18px', p: '0.5em 0' }} onClick={() => { refreshKYC() }}>
                    Refrescar
                  </Button>
                </Grid></>
          }
        </>)
      }
    </Grid >
  )
};

Kyc.propTypes = {
  userInfo: PropTypes.object,
  triggerSessionValidation: PropTypes.func,
}


export default Kyc;