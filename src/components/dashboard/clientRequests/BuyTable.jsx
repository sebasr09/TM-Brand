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
import React, { useState , useEffect } from 'react';
import { Add as AddIcon , Edit as EditIcon , DeleteForever as DeleteForeverIcon} from '@mui/icons-material';

import Colors from '../../../constants/Colors';
import ErrorSnackbar from '../../common/ErrorSnackbar';
import InformationSnackbar from '../../common/InformationSnackbar';
import PropTypes from 'prop-types';
import RequestCreate from './createRequest/RequestCreate';
import MonetizationCreate from './createMonetization/MonetizationCreate';
import { makeStyles } from '@mui/styles';
import EnhancedTableHead from './buysTableComponents/EnhancedTableHead';
import EnhancedTableToolbar from '../common/Table/EnhancedTableToolbar';
import LoadingBackdrop from '../../common/LoadingBackdrop';
import Paper from '@mui/material/Paper';
import { getApi } from '../../api/apiManager';

import Axios from 'axios';

import {formatNumber} from '../../../utils';


export default function EnhancedTable({ user, userInfo }) {

  const MONETIZATION = 'monetization',
  INCOME = 'income';

  const classes = useStyles();
  const [redoFetch, setRedoFetch] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState({});
  const [monetizations, setMonetizations] = useState([]);
  const [doingFetch, setDoingFetch] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openInformation, setOpenInformation] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [informationMessage, setInformationMessage] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [openCreateRequest, setOpenCreateRequest] = useState(false);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [requestsCount, setRequestsCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const renderDate = (date) => {
    /*if (date) {
      const dateToFormate = new Date(date);
      const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(dateToFormate);
      const month = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(dateToFormate);
      const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(dateToFormate);
      return `${day}-${month}-${year}`;
    }*/
    return date.split('T')[0];//'-';
  };

  const toggleReDoFetch = () => {
    setRedoFetch(!redoFetch);
  };

  const getMonetizations = async () => {
    setOpenBackdrop(true);
    try {
      let dataMonetizations = await getApi(`activos/monetizationsForBuy`);
      dataMonetizations = dataMonetizations.map((monetization) => {
        monetization.type = MONETIZATION;
        return monetization;
      });
      let dataIncomes = await getApi(`activos/incomesForBuy`);
      dataIncomes = dataIncomes.map((income) => {
        income.type = INCOME;
        return income;
      });
      setMonetizations(dataMonetizations.concat(dataIncomes));
    } catch (err) {
      setOpenError(true);
      setErrorMessage('No fue posible cargar las solicitudes. Intenta de nuevo más tarde.');
    } finally {
      setOpenBackdrop(false);
    }
  };

  useEffect(() => {
    const getRequests = async () => {
      setOpenBackdrop(true);
      try {
        let limit = rowsPerPage;
        let offset = page * limit;
        const data = await getApi(`activos/getAllBuys/desc/${offset}/${limit}`);
        console.log(data);
        setRequests(data.rows);
        setRequestsCount(data.count)
      } catch (err) {
        setOpenError(true);
        setErrorMessage('No fue posible cargar las solicitudes. Intenta de nuevo más tarde.');
      } finally {
        setOpenBackdrop(false);
      }
    };
    getRequests();
    getMonetizations();
  }, [redoFetch]);

  useEffect(() => {
  }, [informationMessage]);

  const handleCloseError = () => {
    setOpenError(false);
    setErrorMessage('');
  };

  const handleCloseInformation = () => {
    setOpenInformation(false);
    setInformationMessage('');
  };

  const handleOpenCreateBuy = () => {
    setOpenCreateRequest(true);
    setIsEdit(false);
    setSelectedRequest({});
  };

  const handleOpenEdit = (selected) => {
    let boolOpen = true;
    const setRequest = async() => {
      let request = {...selected};
      request.id_monetization_monetizations = selected.id_monetization_monetizations.map( m => {
        let found =  monetizations.find(mon=> {
          return mon.id === m.id
        });
        if(found !== undefined){
          return found.id_monetization;
        }
        else {
          boolOpen = false;
          return null;
        }
      });
      if(boolOpen){
        setSelectedRequest(request);
        setOpenCreateRequest(true);
        setIsEdit(true);
      }
      else{
        setErrorMessage("Error consultando la base de datos. Reintente por favor");
        setOpenError(true);
      }
    };
    setRequest();
  };

  const handleModifyClose = () => {
    setSelectedRequest(null);
    setIsEdit(false);
    setOpenCreateRequest(false);
    toggleReDoFetch();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    toggleReDoFetch();
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    toggleReDoFetch();
  };

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

  const onRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  return (
    <div className={classes.root}>
      <LoadingBackdrop open={doingFetch} />
      <ErrorSnackbar open={openError} message={errorMessage} handleClose={handleCloseError} />
      <InformationSnackbar open={openInformation} message={informationMessage} handleClose={handleCloseInformation} />
      <RequestCreate open={openCreateRequest} handleModifyClose={handleModifyClose} request={selectedRequest} setRequest={setSelectedRequest} isEdit={isEdit} user={user} userInfo={userInfo} setInformationMessage={setInformationMessage} setOpenInformation={setOpenInformation} monetizations={monetizations} setMonetizations={setMonetizations}/>
      <React.Fragment>
      <Grid container className={classes.buttonsGroup}>
          <Grid item className={classes.topButtons}>
            <Button
              color='primary'
              variant='contained'
              className={classes.createButton}
              startIcon={<AddIcon />}
              onClick={handleOpenCreateBuy}
              id='monetization'>
              Nueva Compra
            </Button>
          </Grid>
        </Grid>
        <Paper className={classes.paper}>
          <EnhancedTableToolbar toggleReDoFetch={toggleReDoFetch} title={"Compras"}/>
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
                rowCount={requests.length}
              />
              <TableBody>
                {/*stableSort(requests, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)*/
                  requests
                  .map((row, index) => {
                    return (
                      <TableRow hover role='checkbox' tabIndex={-1} key={index} id={`userDetail${index}`}>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{renderDate(row.id_transaction.date)}</TableCell>
                        <TableCell>{`${row.id_sell_sell && row.id_sell_sell.trade_price ? `${row.id_monetization_monetizations[0].id_transaction.id_final_coin_coin.short_name} ${formatNumber(row.id_sell_sell.trade_price)}` : ''}`}</TableCell>
                        <TableCell>{row.id_transaction.id_origin_coin_coin && row.id_transaction.origin_value && (row.id_transaction.id_origin_coin_coin.short_name + " " + formatNumber(row.id_transaction.origin_value)) || ''}</TableCell>
                        <TableCell>{row.id_transaction.id_final_coin_coin && row.id_transaction.final_value &&  (row.id_transaction.id_final_coin_coin.short_name + " " + formatNumber(row.id_transaction.final_value)) || ''}</TableCell>
                        <TableCell>{row.id_transaction.rate}</TableCell>
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
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={requestsCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </React.Fragment>
    </div>
  );
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
  downloadButton: {
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  createButton: {
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  legend: {
    padding: '3%'
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
  successButton: {
    backgroundColor: 'white',
    color: '#69E076'
  },
  incompleteButton: {
    backgroundColor: Colors.accent,
    color: 'white'
  },
  incompleteRect: {
    fill: Colors.accent
  },
  resultsButton: {
    backgroundColor: Colors.black,
    color: 'white'
  },
  resultsRect: {
    fill: Colors.black
  },
  completeButton: {
    backgroundColor: Colors.primary,
    color: 'white'
  },
  completeRect: {
    fill: Colors.primary
  },
  approvedButton: {
    backgroundColor: 'green',
    color: 'white'
  },
  approvedRect: {
    fill: 'green'
  },
  fastButton: {
    backgroundColor: Colors.mediumGray,
    color: 'white'
  },
  fastRect: {
    fill: Colors.mediumGray
  },
  rejectButton: {
    backgroundColor: Colors.yellow,
    color: 'white'
  },
  rejectRect: {
    fill: Colors.yellow
  },
  invalidIDButton: {
    backgroundColor: '#8A2BE2',
    color: 'white'
  },
  invalidIDRect: {
    fill: '#8A2BE2'
  },
  deleteButton: {
    marginTop: 'auto'
  },
  buttonsGroup: {
    margin: 'auto'
  },
  uploading: {
    marginLeft: '50%',
    marginTop: '20%'
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.1em'
  },
  appBar: {
    top: 'auto',
    bottom: 0,
    paddingLeft: 250,
    paddingTop: '1%',
    paddingBottom: '1%',
    [theme.breakpoints.down('md')]: {
      paddingLeft: 65
    }
  },
  legendTitle: {
    cursor: 'pointer',
    textAlign: 'center',
    fontSize: '1.4em',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2em'
    }
  },
  topButtons: {
    padding: '2% 0 2% 0',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  searchForm: {
    width: '100%',
    maxWidth: '100%',
    padding: '1% 0'
  }
}));

EnhancedTable.propTypes = {
  user: PropTypes.object,
  userInfo: PropTypes.object
};
