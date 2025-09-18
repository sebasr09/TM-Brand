import { Add as AddIcon, DeleteForever as DeleteForeverIcon, Edit as EditIcon, AssignmentInd as CommercialIcon, InfoOutlined } from '@mui/icons-material';
import {
  Button,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { deleteApi, getApi } from '../../api/apiManager';

import Colors from '../../../constants/Colors';
import ConfirmationDialog from '../../common/ConfirmationDialog';
import EnhancedTableHead from './requestTableComponents/EnhancedTableHead';
import EnhancedTableToolbar from './requestTableComponents/EnhancedTableToolbar';
import ErrorSnackbar from '../../common/ErrorSnackbar';
import LoadingBackdrop from '../../common/LoadingBackdrop';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import SuccessSnackbar from '../../common/SuccessSnackbar';
import UserCreate from './userDialogs/UserCreate';
import { makeStyles } from '@mui/styles';
import UpdateCommercial from './userDialogs/UpdateCommercial';
import UserInfo from './userDialogs/UserInfo';

export default function EnhancedTable() {
  const classes = useStyles();
  const [redoFetch, setRedoFetch] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openCreateUser, setOpenCreateUser] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openSuccess, setOpenSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [openCommercial, setOpenCommercial] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);


  const toggleReDoFetch = () => {
    setRedoFetch(!redoFetch);
  };

  const onRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 20));
    setPage(0);
  };

  const handleOpenCreate = () => {
    setOpenCreateUser(true);
    setSelectedUser(null);
    setIsEdit(false);
  };

  const handleCloseError = () => {
    setOpenError(false);
    setErrorMessage('');
  };

  const handleDeleteConfirmation = (selected) => {
    setSelectedUser(selected);
    setConfirmationOpen(true);
  };

  const handleDeleteAccept = async () => {
    setConfirmationOpen(false);
    setOpenBackdrop(true);
    try {
      await deleteApi(`user/${selectedUser.username}`);
      setSelectedUser(null);
      setOpenSuccess(true);
      setSuccessMessage('Usuario eliminado satisfactoriamente.');
      toggleReDoFetch();
    } catch (err) {
      setOpenError(true);
      setErrorMessage('No fue eliminar al usuario. Intenta de nuevo más tarde.');
    } finally {
      setOpenBackdrop(false);
    }
  };

  const handleDeleteCancel = () => {
    setConfirmationOpen(false);
    setSelectedUser(null);
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
    setSuccessMessage('');
  };

  const handleOpenEdit = (selected) => {
    setSelectedUser(selected);
    setIsEdit(true);
    setOpenCreateUser(true);
  };

  const handleOpenCommercial = (selected) => {
    setSelectedUser(selected);
    setOpenCommercial(true);
  };

  const handleCloseCommercial = () => {
    setSelectedUser(null);
    setOpenCommercial(false);
    toggleReDoFetch();
  };

  const handleOpenInfo = (selected) => {
    setSelectedUser(selected);
    setOpenInfo(true);
  };

  const handleCloseInfo = () => {
    setSelectedUser(null);
    setOpenInfo(false);
    toggleReDoFetch();
  };

  const handleModifyClose = () => {
    setSelectedUser(null);
    setIsEdit(false);
    setOpenCreateUser(false);
    toggleReDoFetch();
  };

  useEffect(() => {
    const getUsers = async () => {
      setOpenBackdrop(true);
      try {
        const data = await getApi(`next-activos/getAllUsers`);
        setUsers(data);
      } catch (err) {
        console.log(err);
        setOpenError(true);
        setErrorMessage('No fue posible cargar los usuarios. Intenta de nuevo más tarde.');
      } finally {
        setOpenBackdrop(false);
      }
    };
    getUsers();
  }, [redoFetch]);

  return (
    <div className={classes.root}>
      <LoadingBackdrop open={openBackdrop} />
      <ErrorSnackbar open={openError} message={errorMessage} handleClose={handleCloseError} />
      <SuccessSnackbar
        open={openSuccess}
        message={successMessage}
        handleClose={handleCloseSuccess}
        id='successSnackbar'
      />
      <UserCreate open={openCreateUser} handleModifyClose={handleModifyClose} user={selectedUser} isEdit={isEdit} />
      <UpdateCommercial open={openCommercial} handleModifyClose={handleCloseCommercial} user={selectedUser} />
      <UserInfo open={openInfo} handleModifyClose={handleCloseInfo} user={selectedUser}/>
      {selectedUser ? (
        <ConfirmationDialog
          open={confirmationOpen}
          handleAccept={handleDeleteAccept}
          handleCancel={handleDeleteCancel}
          title={'Confirmar eliminación'}
          content={`¿Estas seguro de que quieres eliminar al usuario: ${selectedUser.name}?`}
        />
      ) : null}
      <Grid container className={classes.buttonsGroup}>
        <Grid item className={classes.topButtons} xs={12}>
          <Button
            color='primary'
            variant='contained'
            startIcon={<AddIcon />}
            className={classes.newUserButton}
            onClick={handleOpenCreate}
            id='create-user'>
            Nuevo usuario
          </Button>
        </Grid>
      </Grid>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar toggleReDoFetch={toggleReDoFetch} />
        <TableContainer>
          <Table
            stickyHeader
            className={classes.table}
            aria-labelledby='tableTitle'
            aria-label='enhanced table'
            id='usersTable'>
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={onRequestSort}
              rowCount={users.length}
            />
            <TableBody>
              {stableSort(users, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={index} id={`userDetail${index}`}>
                      <TableCell>{row.name + ' ' + row.lastName}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>
                        <IconButton
                          id='basketsUserButton'
                          className={classes.buttonEdit}
                          onClick={() => {
                            handleOpenInfo(row)
                          }}
                          size="large">
                          <InfoOutlined />
                        </IconButton>
                      </TableCell>
                      <TableCell><IconButton
                        id='commercialButton'
                        className={classes.buttonEdit}
                        onClick={() => {
                          handleOpenCommercial(row);
                        }}
                        size="large">
                        <CommercialIcon />
                      </IconButton></TableCell>
                      <TableCell align='center'>
                        <IconButton
                          id='editUserButton'
                          className={classes.buttonEdit}
                          onClick={() => {
                            handleOpenEdit(row);
                          }}
                          size="large">
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell align='center'>
                        <IconButton
                          id='deleteUserButton'
                          className={classes.buttonDelete}
                          onClick={() => {
                            handleDeleteConfirmation(row);
                          }}
                          size="large">
                          <DeleteForeverIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

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

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    padding: '1% 3% 8%',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  buttonsGroup: {
    margin: 'auto'
  },
  newUserButton: {
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  topButtons: {
    padding: '2% 0'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  },
  buttonCreate: {
    marginBottom: '2%'
  },
  buttonDelete: {
    backgroundColor: Colors.accent,
    color: Colors.white
  },
  buttonEdit: {
    backgroundColor: Colors.primary,
    color: Colors.white,
    marginRight: 10
  }
}));

EnhancedTable.propTypes = {
  users: PropTypes.array
};
