import React, { useState, useEffect } from 'react';
import {
  Button,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  TableHead,
  TableSortLabel
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { getApi } from '../../api/apiManager';
import ErrorSnackbar from '../../common/ErrorSnackbar';
import LoadingBackdrop from '../../common/LoadingBackdrop';
import SuccessSnackbar from '../../common/SuccessSnackbar';
import EditPotentialCustomerState from './userDialogs/EditPotentialCustomerState';

const headCells = [
  { id: 'name', numeric: false, label: 'Nombre' },
  { id: 'email', numeric: false, label: 'Correo' },
  { id: 'number', numeric: false, label: 'Teléfono' },
  { id: 'contactDate', numeric: false, label: 'Fecha de contacto' },
  { id: 'state', numeric: false, label: 'Estado' },
  { id: 'edit', numeric: false, label: 'Editar' },
];

const PotentialCustomers = () => {

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openSuccess, setOpenSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [redoFetch, setRedoFetch] = useState(false);

  const toggleReDoFetch = () => {
    setRedoFetch(!redoFetch);
  };
  
  const onRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 20));
    setPage(0);
  };

  const handleCloseError = () => {
    setOpenError(false);
    setErrorMessage('');
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
    setSuccessMessage('');
  };

  const handleOpenSuccess = (message) => {
    setOpenSuccess(true);
    setSuccessMessage(message);
  }

  const handleOpenEdit = (selected) => {
    setSelectedUser(selected);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setSelectedUser(null);
    setOpenEdit(false);
    toggleReDoFetch();
  };

  useEffect(() => {
    setOpenBackdrop(true);
    getApi('next-activos/getAllPotentialCustomer/ALL')
      .then((response) => setUsers(response))
      .catch((err) => {
        console.log(err);
        setOpenError(true);
        setErrorMessage('No fue posible obtener la información.')
      })
      .finally(() => setOpenBackdrop(false));
  }, [redoFetch])

  return (
    <Paper sx={{
      width: '100%',
      m: '1% 3% 8%'
    }}>
      <LoadingBackdrop open={openBackdrop} />
      <ErrorSnackbar open={openError} message={errorMessage} handleClose={handleCloseError} />
      <SuccessSnackbar
        open={openSuccess}
        message={successMessage}
        handleClose={handleCloseSuccess}
        id='successSnackbar'
      />
      <EditPotentialCustomerState open={openEdit} handleClose={handleCloseEdit} user={selectedUser} handleOpenSuccess={handleOpenSuccess}/>
      <TableContainer>
        <Table
          stickyHeader
          sx={{minWidth: 750}}
          aria-labelledby='tableTitle'
          aria-label='enhanced table'
          id='usersTable'>
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
            {stableSort(users, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={index} id={`userDetail${index}`}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.number}</TableCell>
                    <TableCell>{row.contactDate.replace('T', ' ').replace('.000Z', '')}</TableCell>
                    <TableCell>{row.state}</TableCell>
                    <TableCell align='left'>
                      <IconButton
                        id='editUserButton'
                        onClick={() => {
                           handleOpenEdit(row);
                        }}
                        size="large">
                        <EditIcon />
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
  )
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

export default PotentialCustomers;