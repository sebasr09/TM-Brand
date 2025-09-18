import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ErrorSnackbar from '../../../common/ErrorSnackbar';
import LoadingBackdrop from '../../../common/LoadingBackdrop';
import PropTypes from 'prop-types';
import { Dialog, Tabs, Tab, Divider, AppBar, Toolbar, IconButton, Typography, Slide, Card, CardContent, Grid, Stack, Autocomplete, TextField, Box, Paper, TableContainer, TableCell, Table, TableHead, TableBody, TableRow, TableSortLabel, Button, Container } from '@mui/material';
import { binancePostApi, getApi, putApi } from '../../../api/apiManager';
import TabPanel from '../../../common/TabPanel';
import { S3Client, GetObjectCommand, PutObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import awsmobile from '../../../../aws-exports-dev';
import { Auth } from 'aws-amplify'
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { PDFDocument } from 'pdf-lib';

const headCells = [
  { id: 'id', numeric: false, label: '#' },
  { id: 'entryQuantity', numeric: false, label: 'Inversión' },
  { id: 'tokenUnits', numeric: false, label: 'Unidades' },
  { id: 'price', numeric: false, label: 'Precio' },
  { id: 'type', numeric: false, label: 'Tipo' },
  { id: 'date', numeric: false, label: 'Fecha' },
];

const UserInfo = ({ open, handleModifyClose, user }) => {

  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [states, setStates] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [basket, setBasket] = useState(null)
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('token');
  const [tabIndex, setTabIndex] = useState(0);
  const [cliente, setCliente] = useState(null);
  const [identificacion, setIdentificacion] = useState(null);
  const [fondos, setFondos] = useState(null);
  const [contrato, setContrato] = useState(null);
  const [price, setPrice] = useState(0);
  const [diligenciado, setDiligenciado] = useState(-1)
  const [unidades, setUnidades] = useState(0)
  const [dolares, setDolares] = useState(0)
  const [dolaresPalabra, setDolaresPalabra] = useState('')
  const [firstPdfBytes, setFirstPdfBytes] = useState('')
  const [extracts, setExtracts] = useState(null);
  const [selectedMonth, setSelecetedMonth] = useState('')

  const handleCloseError = () => {
    setOpenError(false);
    setErrorMessage('');
  };

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const onRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const aprobarKyc = () => {
    setOpenBackdrop(true);
    putApi(`next-activos/updateUser/${user.id}`, { kycid: '1' })
      .then((response) => handleModifyClose())
      .catch((err) => {
        console.log(err);
        setErrorMessage('No fue posible actualizar la información.');
        setOpenError(true);
      })
      .finally(() => setOpenBackdrop(false));
  }

  const aprobarContrato = () => {
    setOpenBackdrop(true);
    putApi(`next-activos/updateUser/${user.id}`, { kycid: '2' })
      .then((response) => handleModifyClose())
      .catch((err) => {
        console.log(err);
        setErrorMessage('No fue posible actualizar la información.');
        setOpenError(true);
      })
      .finally(() => setOpenBackdrop(false));
  }

  const loadPdf = async (setter, content) => {
    const reader = content.Body.getReader();
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
    setFirstPdfBytes(xd)
    const blob = new Blob([xd], { type: 'application/pdf' })
    setter(URL.createObjectURL(blob))
  }

  useEffect(() => {
    const getUserStates = async () => {
      setOpenBackdrop(true);
      getApi(`next-activos/findUserStatesByUser/${user.id}`)
        .then((response) => setStates(response))
        .catch((err) => {
          console.log(err);
          setErrorMessage('No fue posible cargar la información.');
          setOpenError(true);
        })
        .finally(() => setOpenBackdrop(false));
    }

    const getUserTransactions = async () => {
      setOpenBackdrop(true);
      getApi(`next-activos/findUserTransactions/${user.id}`)
        .then((response) => setTransactions(response))
        .catch((err) => {
          console.log(err);
          setErrorMessage('No fue posible cargar las transacciones.');
          setOpenError(true);
        })
        .finally(() => setOpenBackdrop(false));
    }

    const getKyc = async () => {
      setOpenBackdrop(true);
      const COGNITO_ID = `cognito-idp.us-east-1.amazonaws.com/${awsmobile.aws_user_pools_id}`; // 'COGNITO_ID' has the format 'cognito-idp.REGION.amazonaws.com/COGNITO_USER_POOL_ID'
      const userC = await Auth.currentAuthenticatedUser();
      const client = new S3Client({
        region: 'us-east-1', credentials: fromCognitoIdentityPool({
          client: new CognitoIdentityClient({ region: 'us-east-1' }),
          identityPoolId: awsmobile.aws_cognito_identity_pool_id,
          logins: {
            [COGNITO_ID]: userC.signInUserSession.idToken.jwtToken
          }
        })
      });
      setCliente(client);
      const ccParams = {
        Bucket: 'trademate-kyc',
        Key: `${user.cognitoid}/Identificacion.pdf`
      }
      const fondosParams = {
        Bucket: 'trademate-kyc',
        Key: `${user.cognitoid}/Origen-Fondos.pdf`
      }
      const contratoParams = {
        Bucket: 'trademate-kyc',
        Key: `${user.cognitoid}/Contrato-Firmado.pdf`
      }
      client.send(new GetObjectCommand(ccParams))
        .then((response) => { loadPdf(setIdentificacion, response) })
        .catch((err) => {
          if (err.name === 'NoSuchKey') {
            setIdentificacion(null)
          } else {
            console.log(err)
          }
        })
      client.send(new GetObjectCommand(fondosParams))
        .then((response) => { loadPdf(setFondos, response) })
        .catch((err) => {
          if (err.name === 'NoSuchKey') {
            setFondos(null);
          } else {
            console.log(err)
          }
        })
      if (user.kycid !== '0') {
        client.send(new GetObjectCommand(contratoParams))
          .then((response) => {
            loadPdf(setContrato, response)
            setDiligenciado(2)
          })
          .catch((err) => {
            client.send(new GetObjectCommand({
              Bucket: 'trademate-kyc',
              Key: `${user.cognitoid}/Contrato.pdf`
            }))
              .then((response) => {
                loadPdf(setContrato, response)
                setDiligenciado(1)
              })
              .catch((err) => {
                client.send(new GetObjectCommand({
                  Bucket: 'trademate-kyc',
                  Key: `templates/Contrato-Baskets.pdf`
                }))
                  .then((response) => {
                    loadPdf(setContrato, response)
                    setDiligenciado(0)
                  })
                  .catch((err) => {
                    setContrato(null);
                    console.log(err)
                  })
                console.log(err)
              })
            setContrato(null);
            console.log(err)
          })
      }
    }

    user && getUserStates() && getUserTransactions() && getKyc();
  }, [open])

  useEffect(() => {
    const getExtracts = async () => {
      const params = {
        Bucket: 'trademate-extracts',
        Prefix: user.cognitoid
      }
      cliente.send(new ListObjectsV2Command(params))
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
          console.log(Array.from(map.values()))
          setExtracts(map)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    cliente && user && getExtracts();
  }, [cliente])

  useEffect(() => {
    const getBasketPrice = async () => {
      if (basket.basket.shortName === 'TM') {
        setOpenBackdrop(true);
        getApi(`next-activos/getLastBasketState/${basket.basket.id}`)
          .then((response) => setPrice(Number(response.totalFunds) / Number(response.totalUnits)))
          .catch((err) => {
            console.log(err);
            setPrice(0)
            setErrorMessage('No fue posible cargar el precio.');
            setOpenError(true);
          })
          .finally(() => setOpenBackdrop(false));
      } else if (basket.basket.shortName === 'TRUST') {
        binancePostApi('next-activos/getTickerPrices', { symbols: ['BTCBUSD'], account: 'BTC' }).then((response) => setPrice(Number(response[0].price))).catch((error) => {
          console.log(error);
          setErrorMessage('No se pudo obtener el precio.');
          setOpenError(true);
        })
      }
      else {
        setPrice(1)
      }
    }
    basket !== '' && basket !== null && getBasketPrice()
  }, [basket])

  const diligenciar = async () => {
    if (contrato !== '' && unidades > 0 && dolares > 0 && dolaresPalabra != '') {
      setOpenBackdrop(true);
      const pdfDoc = await PDFDocument.load(firstPdfBytes);
      const form = pdfDoc.getForm();
      const nameField = form.getTextField('Nombre_cliente')
      nameField.setFontSize(10)
      nameField.setText('  ' + user.name + ' ' + user.lastName)
      const unitsField = form.getTextField('unidades')
      unitsField.setFontSize(11)
      unitsField.setText('  ' + unidades)
      const dolarsTextField = form.getTextField('dolares_letras')
      dolarsTextField.setFontSize(11)
      dolarsTextField.setText('  ' + dolaresPalabra.toUpperCase())
      const dolaresField = form.getTextField('dolares_numeros')
      dolaresField.setFontSize(11)
      dolaresField.setText('  ' + dolares)
      const nameSignField = form.getTextField('nombre_firma')
      nameSignField.setText('  ' + user.name + ' ' + user.lastName)
      nameSignField.setFontSize(10)
      const idField = form.getTextField('id')
      idField.setText('  ' + user.identification)
      idField.setFontSize(10)
      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const putCommand = new PutObjectCommand({ Bucket: 'trademate-kyc', Key: `${user.cognitoid}/Contrato.pdf`, Body: blob });
      cliente.send(putCommand)
        .then((response) => {
          window.open(URL.createObjectURL(blob))
          handleModifyClose()
        })
        .catch((err) => {
          console.log(err);
          setErrorMessage('Hubo un error subiendo el archivo.');
          setOpenError(true);
        })
    } else {
      setErrorMessage('Hay campos vacíos. Diligencielos por favor.');
      setOpenError(true);
    }
    setOpenBackdrop(false);
  }

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
      window.open(URL.createObjectURL(blob))
    }
  }

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleModifyClose} TransitionComponent={Transition}>
        <LoadingBackdrop open={openBackdrop} />
        <ErrorSnackbar open={openError} message={errorMessage} handleClose={handleCloseError} id='errorSnackbar' />
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge='start'
              color='inherit'
              onClick={() => {
                setBasket(null);
                handleModifyClose();
              }}
              aria-label='close'
              id='closeButton'
              size="large">
              <CloseIcon />
            </IconButton>
            <Typography variant='h6' sx={{
              marginLeft: '1em',
              flex: 1
            }}>
              {`Información de ${user ? user.name : ''} ${user ? user.lastName : ''}`}
            </Typography>
          </Toolbar>
        </AppBar>
        <Tabs
          value={tabIndex}
          onChange={(event, newValue) => setTabIndex(newValue)}
          aria-label='basic tabs example'
          sx={{ m: '1em 0 0 2em' }}
        >
          <Tab label={<strong>Baskets</strong>} id='tab-baskets' />
          <Tab label={<strong>KYC</strong>} id='tab-kyc' />
          <Tab label={<strong>Extractos</strong>} id='tab-extractos' />
        </Tabs>
        <Divider />
        <TabPanel value={tabIndex} index={0}>
          {states.length > 0 ? <Box sx={{ m: '3%' }}>
            <Grid container m='0.5em' p='0 1em 0.5em 0.5em'>
              <Grid item xs={8}>
                <Typography variant='h4'>
                  {<strong>Basket: {basket ? basket.basket.name : ''}</strong>}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Autocomplete
                  noOptionsText="No hay baskets"
                  options={states}
                  getOptionLabel={(option) => option.basket.name}
                  onChange={(event, value) => value ? setBasket(value) : ''}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      id="account"
                      value={basket || ''}
                      label="Basket"
                      fullWidth
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Card>
              <CardContent>
                <Grid container sx={{ p: '0.5em' }}>
                  <Grid item xs={12} sm={6} >
                    <Stack>
                      <Typography variant='h6'>
                        Inversión Total: ${basket ? basket.totalInvestment : ''}
                      </Typography>
                      <Typography variant='h6' mt='0.5em'>
                        Unidades: {basket ? basket.totalUnits : ''}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6} >
                    <Stack>
                      <Typography variant='h6'>
                        Precio Actual: ${price.toFixed(2)}
                      </Typography>
                      <Typography variant='h6' mt='0.5em'>
                        Saldo Actual:${basket ? (price * basket.totalUnits).toFixed(2) : 0}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Paper sx={{ width: '100%', margin: '2em 0', borderRadius: '25px' }}>
              <TableContainer>
                <Table
                  stickyHeader
                  sx={{ minWidth: 750 }}
                  aria-labelledby='tableTitle'
                  aria-label='enhanced table'
                  id='usersTable'
                >
                  <TableHead>
                    <TableRow>
                      {headCells.map((headCell) => (
                        <TableCell
                          key={headCell.id}
                          align={headCell.numeric ? 'center' : 'left'}
                          sortDirection={orderBy === headCell.id ? order : false}
                          id={headCell.id}
                        >
                          <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                          >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                              <span
                                style={{
                                  border: 0,
                                  clip: 'rect(0 0 0 0)',
                                  height: 1,
                                  margin: -1,
                                  overflow: 'hidden',
                                  padding: 0,
                                  position: 'absolute',
                                  top: 20,
                                  width: 1,
                                }}
                              >
                                {order === 'desc'
                                  ? 'sorted descending'
                                  : 'sorted ascending'}
                              </span>
                            ) : null}
                          </TableSortLabel>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {stableSort(transactions.filter((trans) => basket ? trans.basket.id === basket.basket.id : false), getComparator(order, orderBy)).map(
                      (row, index) => {
                        return (
                          <TableRow
                            hover
                            role='checkbox'
                            tabIndex={-1}
                            key={index}
                            id={`tokenDetail${index}`}
                          >
                            <TableCell >
                              {index + 1}
                            </TableCell>
                            <TableCell>
                              {row.entryQuantity}
                            </TableCell>
                            <TableCell>{row.tokenUnits}</TableCell>
                            <TableCell>{row.price}</TableCell>
                            <TableCell>{row.type}</TableCell>
                            <TableCell>{row.date.replace('T', ' ').replace('.000Z', '')}</TableCell>
                          </TableRow>
                        );
                      }
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box> :
            <Typography variant='h4' m='3%'>
              {`${user ? user.name : ''} ${user ? user.lastName : ''} no tiene inversión en Baskets.`}
            </Typography>}
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <Grid container sx={{ m: '1em' }}>
            <Grid item xs={12} md={6}>
              <Stack sx={{ m: '1em' }}>
                <Typography variant='h5' sx={{ mb: '1em' }}>
                  <strong>Identificación </strong>
                </Typography>
                {identificacion ? <object type='application/pdf' data={identificacion} width='500' height='700'></object>
                  : <Typography variant='h6' sx={{ mb: '1em' }}>
                    <strong>El usuario no ha cargado Identificacion </strong>
                  </Typography>}
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack sx={{ m: '1em' }}>
                <Typography variant='h5' sx={{ mb: '1em' }}>
                  <strong>Origen de Fondos </strong>
                </Typography>
                {fondos ? <object type='application/pdf' data={fondos} width='500' height='700'></object>
                  : <Typography variant='h6' sx={{ mb: '1em' }}>
                    <strong>El usuario no ha cargado Origen de Fondos </strong>
                  </Typography>}
              </Stack>
            </Grid>
            {user && user.kycid !== '0' && <><Grid item xs={12} md={8} lg={6}>
              <Stack sx={{ m: '1em' }}>
                <Typography variant='h5' sx={{ mb: '1em' }}>
                  <strong>Contrato </strong>
                </Typography>
                {contrato ? <object type='application/pdf' data={contrato} width='500' height='700'></object>
                  : <Typography variant='h6' sx={{ mb: '1em' }}>
                    <strong>El usuario no ha cargado Contrato </strong>
                  </Typography>}
              </Stack>
            </Grid>
              {diligenciado === 0 && <Grid item xs={12} md={4}>
                <Stack sx={{ m: '1em' }}>
                  <Typography variant='h5' sx={{ mb: '1em' }}>
                    <strong>Campos para llenar </strong>
                  </Typography>
                  <TextField
                    type='number'
                    variant='outlined'
                    margin='normal'
                    sx={{ mt: '1em', bgcolor: theme => theme.palette.white.main }}
                    label={`Unidades`}
                    name='Unidades'
                    autoComplete='Unidades'
                    autoFocus
                    value={unidades}
                    onChange={(event) => setUnidades(event.target.value)}
                  />
                  <TextField
                    type='number'
                    variant='outlined'
                    margin='normal'
                    sx={{ mt: '1em', bgcolor: theme => theme.palette.white.mai }}
                    label={`Dolares (numero)`}
                    name='Dolares'
                    autoComplete='Dolares'
                    autoFocus
                    value={dolares}
                    onChange={(event) => setDolares(event.target.value)}
                  />
                  <TextField
                    type='text'
                    variant='outlined'
                    margin='normal'
                    sx={{ mt: '1em', bgcolor: theme => theme.palette.white.mai }}
                    label={`Dolares (texto)`}
                    name='Dolares'
                    autoComplete='Dolares'
                    autoFocus
                    value={dolaresPalabra}
                    onChange={(event) => setDolaresPalabra(event.target.value)}
                  />
                </Stack>
              </Grid>}
              {diligenciado === 1 && <Grid item xs={12} md={4}>
                <Stack sx={{ m: '1em' }}>
                  <Typography variant='h5' sx={{ m: '2em 0' }}>
                    <strong>El cliente falta por firmar el contrato. </strong>
                  </Typography>
                </Stack>
              </Grid>}
            </>
            }
            {user && user.kycid === '0' && <Grid item xs={10}>
              <Button color='third'
                variant='contained'
                fullWidth
                sx={{ m: '1em 2em 0 0' }}
                onClick={() => { aprobarKyc() }}>Aprobar KYC</Button>
            </Grid>}
            {user && user.kycid === '1' && diligenciado === 2 && <Grid item xs={10}>
              <Button color='third'
                variant='contained'
                fullWidth
                sx={{ m: '1em 2em 0 0' }}
                onClick={() => { aprobarContrato() }}>Aprobar Contrato</Button>
            </Grid>}
            {user && user.kycid === '1' && diligenciado === 0 && <Grid item xs={10}>
              <Button color='third'
                variant='contained'
                fullWidth
                sx={{ m: '1em 2em 0 0' }}
                onClick={() => { diligenciar() }}>Diligenciar Contrato</Button>
            </Grid>}
          </Grid>
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          <Grid container >
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
            <Grid container sx={{ pb: { xs: '40px', md: '0' }, m: '0 2em', pr: '1.2em' }}>
              {extracts && selectedMonth && extracts.get(selectedMonth).filter((extract) => extract.includes(selectedMonth)).map((pool) =>
                <Grid key={pool} item xs={12} sx={{mb: '2em'}}>
                  <Typography variant="h4" component="span" onClick={() => getExtract(pool)}>
                    {pool.split('/')[2]}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
        </TabPanel>
      </Dialog>
    </div>
  )
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

UserInfo.propTypes = {
  open: PropTypes.bool,
  handleModifyClose: PropTypes.func,
  user: PropTypes.object,
};

export default UserInfo;