import { Add, AssignmentTurnedIn } from '@mui/icons-material';
import { Button, Card, CardContent, Divider, Grid, IconButton, List, ListItem, ListItemText, Paper, Stack, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import Colors from '../../../constants/Colors';
import { formatNumber } from '../../../utils';
import { getApi } from '../../api/apiManager';
import ErrorSnackbar from '../../common/ErrorSnackbar';
import LoadingBackdrop from '../../common/LoadingBackdrop';
import SuccessSnackbar from '../../common/SuccessSnackbar';
import BasketRequestCreate from './BasketRequestCreate';
import SolveBasketRequest from './SolveBasketRequest';

export default function BasketRequests() {
  const classes = useStyles();
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openSuccess, setOpenSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [list, setList] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState({});
  const [openRequest, setOpenRequest] = useState(false);
  const [openCreateRequest, setOpenCreateRequest] = useState(false);

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
    setOpenRequest(false)
    setSuccessMessage('');
  };

  const handleClose = () => {
    setOpenRequest(false)
  }

  const handleCloseCreate = () => {
    setOpenCreateRequest(false)
  }

  const solveRequest = (request) => {
    setSelectedRequest(request)
    setOpenRequest(true);
  }

  useEffect(() => {
    const getRequests = async () => {
      setOpenBackdrop(true);
      try {
        const data = await getApi(`next-activos/getBasketBuys`);
        console.log(data)
        setList(data)
      } catch (err) {
        setOpenError(true);
        console.log(err)
        setErrorMessage('No fue posible cargar los request. Intenta de nuevo más tarde.');
      } finally {
        setOpenBackdrop(false);
      }
    };
    getRequests();
  }, [openRequest, openCreateRequest]);

  return (
    <div className={classes.root}>
      <LoadingBackdrop open={openBackdrop} />
      <ErrorSnackbar open={openError} message={errorMessage} handleClose={handleCloseSuccess} />
      <SuccessSnackbar
        open={openSuccess}
        message={successMessage}
        handleClose={handleClose}
        id='successSnackbar'
      />
{/*       <SolveBasketRequest request={selectedRequest} open={openRequest} handleClose={handleCloseSuccess}/>
 */}      <BasketRequestCreate open={openCreateRequest} handleClose={handleCloseCreate} />
      <Grid container className={classes.buttonsGroup}>
        <Grid item className={classes.topButtons}>
          <Button
            color='primary'
            variant='contained'
            className={classes.createButton}
            startIcon={<Add />}
            onClick={() => setOpenCreateRequest(true)}
            id='basket-buy'>
            Nueva Solicitud
          </Button>
        </Grid>
      </Grid>
      <Card>
        <CardContent>
          <Stack>
            <Typography variant='h5' color={Colors.primary}>
              <strong>Solicitudes de Basket</strong>
            </Typography>
            <Typography variant='body2' color={Colors.primary}>
              Listado de baskets por resolver.
            </Typography>
          </Stack>
          <Divider />
          { list && list.length > 0 ?
            <List>
            {list.map((row, index) => {
              return (
                <div key={index}>
                  <ListItem >
                    <ListItemText primary={`${row.finalCoin.basketToken.name} (${row.user.name} ${row.user.lastName})`} secondary={`${formatNumber(row.originValue || 0)} ${row.originCoin.shortName}` }/>
                    <IconButton onClick={() => solveRequest(row)}>
                      <AssignmentTurnedIn />
                    </IconButton>
                  </ListItem>
                  <Divider />
                </div>
              )
            })}
            </List>
            :
            <Typography sx={{width: '100%', textAlign: 'center', p: '2em'}}> No hay solicitudes pendientes</Typography>
            }
        </CardContent>
      </Card>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    padding: '1% 3% 8%',
    [theme.breakpoints.down('sm')]: {
      padding: '1% 3% 20%',
      width: '100%'
    }
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2)
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  toolbarButtons: {
    marginLeft: '1%'
  },
  buttonsGroup: {
    margin: 'auto'
  },
  topButtons: {
    padding: '2% 0 2% 0',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  notificationsBadge: {
    marginLeft: 'auto'
  },
  toolbar: theme.mixins.toolbar,
  titleText: {
    textAlign: 'left',
    marginLeft: '2%'
  },
  nested: {
    paddingLeft: '1.8em',
    color: Colors.primary,
    "& .MuiListItemIcon-root": {
      color: Colors.primary
    },
    "&$selected": {
      backgroundColor: Colors.primaryTransparent,
      color: Colors.secondary,
      "& .MuiListItemIcon-root": {
        color: Colors.secondary
      }
    }
  },
  openGroup: {
    backgroundColor: Colors.primary,
    color: Colors.white,
    "& .MuiListItemIcon-root": {
      color: "white"
    },
    "&:hover": {
      backgroundColor: Colors.secondary,
      "& .MuiListItemIcon-root": {
        color: "white"
      }
    }
  }
}));