import React, { useState, useEffect } from 'react';
import LoadingBackdrop from '../LoadingBackdrop';
import ErrorSnackbar from '../ErrorSnackbar';
import SuccessSnackbar from '../SuccessSnackbar';
import {
  Card,
  CardContent,
  Stack,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import { AssignmentTurnedIn } from '@mui/icons-material';
import CancelIcon from '@mui/icons-material/Cancel';
import { getApi, postApi } from '../../api/apiManager';
import { makeStyles } from '@mui/styles';


const AllNotifications = () => {
  const classes = useStyles();
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openSuccess, setOpenSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [notifications, setNotifications] = useState([]);

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
    setSuccessMessage('');
  };


  const solveRequest = async(request) => {
    try{
      setOpenBackdrop(true)
      await postApi(`next-activos/updateRequestState/${request.id}/2`, {})
      setSuccessMessage('La solicitud ha sido resuelta.')
      setOpenSuccess(true);
    } catch(err) {
      setOpenError(true);
      setErrorMessage('No fue posible resolver la solicitud.');
    } finally {
      setOpenBackdrop(false)
    }
  }

  const cancelRequest = async(request) => {
    try{
      setOpenBackdrop(true)
      await postApi(`next-activos/updateRequestState/${request.id}/3`, {})
      setSuccessMessage('La solicitud ha sido cancelada.')
      setOpenSuccess(true);
    } catch(err) {
      setOpenError(true);
      setErrorMessage('No fue posible cancelar la solicitud.');
    } finally {
      setOpenBackdrop(false)
    }
  }

  const filterByState = function (array) {
    return new Promise((resolve, reject) => {
      let response = [];
      array.forEach((element) => {
        if(element.state === 1){
          response.push(element)
        }
      })
      resolve(response);
    });
  }

  useEffect(
    () => {
      const getNotifications = async () => {
        try {
          const data = await getApi(`next-activos/getAllRequests`);
          const requests = await filterByState(data);
          setNotifications(requests);
        } catch (err) {
          setOpenError(true);
          setErrorMessage(
            'No fue posible cargar los requests. Intenta de nuevo más tarde.'
          );
          console.log(err);
        }
      };
      getNotifications();
    },
    [
      openSuccess
    ]
  );

  return (
    <div className={classes.root}
    >
      <LoadingBackdrop open={openBackdrop} />
      <ErrorSnackbar
        open={openError}
        message={errorMessage}
        handleClose={handleCloseSuccess}
      />
      <SuccessSnackbar
        open={openSuccess}
        message={successMessage}
        handleClose={handleCloseSuccess}
        id='successSnackbar'
      />
      <Card >
        <CardContent>
          <Stack>
            <Typography
              variant='h5'
              sx={{ color: (theme) => theme.palette.primary.main }}
            >
              <strong>Solicitudes</strong>
            </Typography>
            <Typography
              variant='body2'
              sx={{ color: (theme) => theme.palette.primary.main }}
            >
              Listado de solicitudes por resolver.
            </Typography>
          </Stack>
          <Divider />
          {notifications && notifications.length > 0 ? (
            <List>
              {notifications.map((row, index) => {
                return (
                  <div key={index}>
                    <ListItem>
                      <ListItemText
                        primary={`${row.type.name} (${row.user.name} ${row.user.lastName})`}
                        secondary={row.type.description}
                      />
                      <IconButton onClick={() =>  solveRequest(row)  }>
                        <AssignmentTurnedIn />
                      </IconButton>
                      <IconButton onClick={() =>  cancelRequest(row)  }>
                        <CancelIcon />
                      </IconButton>
                    </ListItem>
                    <Divider />
                  </div>
                );
              })}
            </List>
          ) : (
            <Typography sx={{ width: '100%', textAlign: 'center', p: '2em' }}>
              {' '}
              No hay solicitudes pendientes
            </Typography>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    padding: '1% 3% 8%',
    [theme.breakpoints.down('sm')]: {
      padding: '1% 3% 20%',
      width: '100%'
    }
  }
}));

export default AllNotifications;
