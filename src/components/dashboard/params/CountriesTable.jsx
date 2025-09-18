import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import React, { useState , useEffect } from 'react';

import Colors from '../../../constants/Colors';
import ErrorSnackbar from '../../common/ErrorSnackbar';
import InformationSnackbar from '../../common/InformationSnackbar';
import PropTypes from 'prop-types';
import CountryCreate from './createCountry/CountryCreate';
import { makeStyles } from '@mui/styles';
import EnhancedTableHead from './countriesTableComponents/EnhancedTableHead';
import EnhancedTableToolbar from '../common/Table/EnhancedTableToolbar';
import LoadingBackdrop from '../../common/LoadingBackdrop';
import Paper from '@mui/material/Paper';
import { getApi } from '../../api/apiManager';

export default function EnhancedTable({ userInfo }) {
  const classes = useStyles();
  const [redoFetch, setRedoFetch] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openInformation, setOpenInformation] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [informationMessage, setInformationMessage] = useState('');
  const [openCreateCountry, setOpenCreateCountry] = useState(false);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [countries, setCountries] = useState([]);

  const toggleReDoFetch = () => {
    setRedoFetch(!redoFetch);
  };

  useEffect(() => {
    const getCountries = async () => {
      setOpenBackdrop(true);
      try {
        const data = await getApi(`activos/params`);
        setCountries(data.countries);
      } catch (err) {
        setOpenError(true);
        setErrorMessage('No fue posible cargar las solicitudes. Intenta de nuevo más tarde.');
      } finally {
        setOpenBackdrop(false);
      }
    };
    getCountries();
  }, [redoFetch]);

  const handleCloseError = () => {
    setOpenError(false);
    setErrorMessage('');
  };

  const handleCloseInformation = () => {
    setOpenInformation(false);
    setInformationMessage('');
  };


  const handleOpenCreateCountry = () => {
    setOpenCreateCountry(true);
  };

  const handleModifyCloseCountry = () => {
    setOpenCreateCountry(false);
    toggleReDoFetch();
  }

  const onRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <div className={classes.root}>
      <LoadingBackdrop open={openBackdrop} />
      <ErrorSnackbar open={openError} message={errorMessage} handleClose={handleCloseError} />
      <InformationSnackbar open={openInformation} message={informationMessage} handleClose={handleCloseInformation} />
      <CountryCreate open={openCreateCountry} handleModifyClose={handleModifyCloseCountry} userInfo={userInfo} setInformationMessage={setInformationMessage} setOpenInformation={setOpenInformation} />
      <React.Fragment>
        <Grid container className={classes.buttonsGroup}>
          <Grid item className={classes.topButtons}>
            <Button
              color='primary'
              variant='contained'
              className={classes.createButton}
              startIcon={<AddIcon />}
              onClick={handleOpenCreateCountry}
              id='create'>
              Crear
            </Button>
          </Grid>
        </Grid>
        <Paper className={classes.paper}>
          <EnhancedTableToolbar toggleReDoFetch={toggleReDoFetch} title={"Paises"}/>
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
                rowCount={countries.length}
              />
              <TableBody>
                {countries
                .map((row, index) => {
                    return (
                      <TableRow hover role='checkbox' tabIndex={-1} key={index} id={`userDetail${index}`}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.code}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
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
  userInfo: PropTypes.object
};
