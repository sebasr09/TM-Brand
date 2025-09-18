import {
  AppBar,
  Button,
  Card,
  CardContent,
  Dialog,
  Grid,
  IconButton,
  Slide,
  TextField,
  Toolbar,
  Typography,
  Input,
  Chip,
  Collapse

} from '@mui/material';
import React, { useEffect, useState , useCallback } from 'react';
import { getApi, postApi } from '../../../api/apiManager';
import {
  validateEmailInput,
  validateNumericInput,
  validateMoneyInput
} from '../../../../controllers/validators';

import Autocomplete from '@mui/lab/Autocomplete';
import { Close as CloseIcon, Add as AddIcon, SettingsOverscanOutlined }from '@mui/icons-material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';

import Axios from 'axios';

import ErrorSnackbar from '../../../common/ErrorSnackbar';
import LoadingBackdrop from '../../../common/LoadingBackdrop';
import PropTypes from 'prop-types';
import SuccessSnackbar from '../../../common/SuccessSnackbar';
import UsagePlanCard from './UsagePlanCard';
import { makeStyles } from '@mui/styles';
import CurrencyFormat from '../../../common/CurrencyFormat';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import {formatNumber} from '../../../../utils';

export default function MonetizationCreate({ open, handleModifyClose, user, isEdit , userInfo, setInformationMessage, setOpenInformation, request, isMonetization}) {
  
  const classes = useStyles();

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    fiat:'',
    organization: '',
    roles: [],
    exchangeRate: '',
    date:new Date(),
    expenses: [],
    currentBuy: '',
    currentSell: '',
    sendingCompanyProvider:{
      id:'',
      name:'',
      lastName:''
    },
    receivingCompany:{
      id:''
    },
    imc:{
      name:'',
      id:''
    },
    sentFiat: {
      short_name:'',
      id:''
    },
    receivedFiat: {
      short_name:'',
      id:''
    },
    concept: { 
      name: '', 
      parent_concept: {
        name:'',
        id:''
      },
      id:''
    }
  });
  const [newExpense, setNewExpense] = useState({
    final_value: '',
    name: '',
    description: '',
    expense_value: '',
    includes_iva: false
  });
  const [usagePlans, setUsagePlans] = useState({
    kycPlan: null,
    carlaidPlan: null,
    contractsPlan: null
  });
  const [dataErrors, setDataErrors] = useState({
    name: false,
    email: false,
    organization: false,
    kycPlan: false,
    carlaidPlan: false,
    contractsPlan: false,
    roles: false,
    expenseValue: false
  });
  const [usagePlansErrors, setUsagePlansErrors] = useState({
    kycPlan: null,
    carlaidPlan: null,
    contractsPlan: null
  });

  const [requiredFields, setRequiredFeilds] = useState(6);
  const [total, setTotal] = useState(0);
  const [fiats, setFiats] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [countries, setCountries] = useState([]);
  const [concepts, setConcepts] = useState([]);
  const [sendingFiats, setSendingFiats] = useState(fiats);
  const [receivingFiats, setReceivingFiats] = useState(fiats);
  const[noCopChecked, setNoCopChecked] = useState(isMonetization);

  const [companies, setCompanies] = useState([]);
  const [providers, setProviders] = useState([]);
  const [companiesProviders, setCompaniesProviders] = useState([]);
  const [imcs, setImcs] = useState([]);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openExpense, setOpenExpense] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [uploadDocumentOpen, setUploadDocumentOpen] = useState(false);
  const [selectedDocumentName, setSelectedDocumentName] = useState(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [created, setCreated] = useState(false);
  const [transactionId, setTransactionId] = useState();

  //Disable the Autocompletes for companies
  const [receivingCountrySelected, setReceivingCountrySelected] = useState(false);
  const [completedFields, setCompletedFields] = useState(0);

  const [editIMC, setEditIMC] = useState({});
  const [editConcept, setEditConcept] = useState({});
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const [dateChecked, setDateChecked] = useState(false);

  const updateCompletedFieldCount = useCallback(() => {
    let completed = 0;
    if (userData.value_origin) {
      completed++;
    }if (userData.sentFiat.id !== '') {
      completed++;
    }if (userData.value_final) {
      completed++;
    }if (userData.receivedFiat.id !== '') {
      completed++;
    }if (userData.rate) {
      completed++;
    }if (userData.sendingCompanyProvider.id !== '') {
      completed++;
    }if (userData.receivingCompany.id !== '') {
      completed++;
    }if (userData.sendingCountry) {
      completed++;
    }if (userData.receivingCountry) {
      completed++;
    }if (userData.imc.id !== '') {
      completed++;
    }if (userData.concept.id !== '' && userData.concept.parent_concept.id !== '') {
      completed++;
      if (userData.concept && userData.concept.id !== null && userData.concept.id !== undefined) {
        completed++;
      }
      //Conceptos sin subconcepto
      else if(userData.concept.parent_concept.id === 300) {
        completed ++;
      }
    }
    setCompletedFields(completed);
  }, [userData]);

  useEffect(() => {
    updateCompletedFieldCount();
  }, [updateCompletedFieldCount])

  const getParams = async () => {
    try {
      const data = await getApi(`activos/params`);
      const countries = data.countries;
      const coins = data.coins.filter((coin) => coin.is_digital_asset == 0);
      setSendingFiats(coins);
      setReceivingFiats(coins);
      setFiats(coins);
    } catch (err) {
      setErrorMessage('No fue posible cargar la información de la base de datos.');
    }
  };

  const handleDateChecked = (event) => {
    setDateChecked(!dateChecked);
  }

  const existErrors = () => {
    for (let key in dataErrors) {
      if (dataErrors[key]) return true;
    }
    let error = false;
    for (let key in userData) {
      if (key in validators) error = error || !validators[key](userData[key]);
    }
    return error;
  };

  const uploadDocument = async () => {

    setUploadingFile(true);
    let urlResult = '';
    const documentKey = `${transactionId}/${selectedDocumentName.substring(0, 30)}/${selectedFile.name}`;
    try {
      const responseURL = await postApi(`activos/upload-signed-url`,
        { fileName: documentKey }
      );
      urlResult = await responseURL.url;
    } catch (error) {
      console.log(error);
    }
    try { 
      const axiosresponse = await Axios.put(urlResult, selectedFile);
      if(axiosresponse.status == 200){
        setUploadDocumentOpen(false);
        let originalDocuments = [...documents];
        originalDocuments.find((document) => document.name == selectedDocumentName.substring(0, 30)).uploaded = true;
        setDocuments(originalDocuments);
        setUploadingFile(false);
        setInformationMessage('Documento subido exitosamente');
        setOpenInformation(true);
        getEditDocuments();
      }
      else{
        setUploadingFile(false);
        setInformationMessage('Error cagando el documento');
        setOpenInformation(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  

  const handleCloseError = () => {
    setOpenError(false);
    setErrorMessage('');
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
    setSuccessMessage('');
  };

  const handleCloseUploadDocument = () => {
    setUploadDocumentOpen(false);
    setSelectedDocumentName(null);
  };

  const handleFileChange = (file) => {
    setSelectedFile(file);
  };

  const handleAttributeChange = (name, value) => {
    setUserData((previous) => {
      const newObject = { ...previous };
      newObject[name] = value;
      if(name == 'value_origin' && previous.rate){
        newObject.value_final = previous.rate * value;
      }
      else if (name == 'rate' && previous.value_origin){
        newObject.value_final = previous.value_origin * value;
      }
      return newObject;
    });
  }; 

  const handleNewExpenseChange = (name, value) => {

    setNewExpense((previous) => {
      const newObject = { ...previous };
      newObject[name] = value;
      
      return newObject;
    });
  }; 

  const removeFromFiats = (value) => {
    var index = fiats.indexOf(value);
    if(index !== -1){
      var newArray = [...fiats];
      newArray.splice(index, 1);
      return newArray;
    }
    else{
      return fiats;
    }
  };

  const removeFromCountries = (value) => {
    var index = countries.indexOf(value);
    if(index !== -1){
      var newArray = [...countries];
      newArray.splice(index, 1);
      return newArray;
    }
    else{
      return countries;
    }
  };

  const handleSentFiat = (event, value) => {
    var newReceivingFiats = removeFromFiats(value);
    setReceivingFiats(newReceivingFiats);
    setUserData((previous) => {
      const newObject = { ...previous };
      const fiat = value;
      newObject['sentFiat'] = fiat !== null ? fiat : { short_name: ''};
      return newObject;
    });
  }; 

  const handleReceivedFiat = (event, value) => {
    var newSendingFiats = removeFromFiats(value);
    setSendingFiats(newSendingFiats);
    setUserData((previous) => {
      const newObject = { ...previous };
      const fiat = value;
      newObject['receivedFiat'] = fiat !== null ? fiat : { short_name: ''};
      return newObject;
    });
  }; 

  const handleSendingCompanyProvider = (event, value) => {
    setUserData((previous) => {
      const newObject = { ...previous };
      newObject['sendingCompanyProvider'] = value !== null ? value: {name:'', id:-1};
      return newObject;
    });
  }; 

  const handleReceivingCompany = (event, value) => {
    setUserData((previous) => {
      const newObject = { ...previous };
      newObject['receivingCompany'] = value !== null ? value: {name:'', id:-1};
      return newObject;
    });
  }; 

  const handleIMC = (event, value) => {
    setUserData((previous) => {
      const newObject = { ...previous };
      newObject['imc'] = value !== null ? value : {name:''};
      return newObject;
    });
  }; 

  const handleConcept = (event, value) => {
    setUserData((previous) => {
      const newObject = { ...previous };
      newObject['concept'] = {};
      newObject['concept'].parent_concept = value;
      return newObject;
    });
  }; 

  const handleSubConcept = (event, value) => {
    setUserData((previous) => {
      const newObject = { ...previous };
      newObject['concept'] = value ? value : { name: '', parent_concept: {
        name:''
      }};
      return newObject;
    });
  };

  const sendCreate = () => {
    if(noCopChecked) createMonetization();
    else createIncome();
  }

  const createMonetization = async () => {
    let body = {
      "type": 601,
      "userId": userInfo.id,
      "originValue": userData.value_origin,
      "idOriginCoin": userData.sentFiat.id,
      "finalValue": userData.value_final,
      "idFinalCoin": userData.receivedFiat.id,
      "rate": userData.rate,
      "companyOrigin":userData.sendingCompanyProvider.id,
      "companyFinal":userData.receivingCompany.id,
      "concept": userData.concept,
      "imc":userData.imc.id,
      "dateChecked": dateChecked,
      "date": userData.date,
      "expenses": userData.expenses
    }
    try{
      await postApi(`activos/createCompanyMonetization`, body).then(response => {
        getDocuments(userData.imc, userData.concept && userData.concept.parent_concept ? userData.concept.parent : userData.concept.id);
        setInformationMessage(`Solicitud creada, id: ${response.id}`);
        setTransactionId(response.id)
        setOpenInformation(true);
        setCreated(true);
        setUserData(previous => {
          let newData = {...previous};
          return newData;
        })
      })
    }
    catch (e){
      setErrorMessage("Error creando la monetización.");
      setOpenError(true)
    }
  }

  const createIncome = async () => {
    let body = {
      "type": 650,
      "userId": userInfo.id,
      "finalValue": userData.value_final,
      "idFinalCoin": userData.receivedFiat.id,
      "provider":userData.sendingCompanyProvider.id,
      "companyFinal":userData.receivingCompany.id,
      "concept": userData.concept,
      "dateChecked": dateChecked,
      "date": userData.date,
      "expenses": userData.expenses
    };
    try{
      await postApi(`activos/createIncome`, body).then(response => {
        getDocuments(0, userData.concept && userData.concept.parent_concept ? userData.concept.parent : userData.concept.id);
        setInformationMessage(`Solicitud creada, id: ${response.id}`);
        setTransactionId(response.id)
        setOpenInformation(true);
        setCreated(true);
        setUserData(previous => {
          let newData = {...previous};
          return newData;
        })
      })
    }
    catch (e){
      setErrorMessage("Error creando la monetización.");
      setOpenError(true)
    }
  }

  const sendEdit = async () => {
    if(noCopChecked) editMonetization();
    else editIncome();
  }

  const editMonetization = async () => {
    let body = {
      "originValue": userData.value_origin,
      "idOriginCoin": userData.sentFiat.id,
      "finalValue": userData.value_final,
      "idFinalCoin": userData.receivedFiat.id,
      "rate": userData.rate,
      "companyOrigin":userData.sendingCompanyProvider.id,
      "companyFinal":userData.receivingCompany.id,
      "concept": userData.concept,
      "imc":userData.imc.id,
      "dateChecked": dateChecked,
      "date": userData.date,
      "expenses": userData.expenses,
      "id": transactionId
    }
    try{
      await postApi(`activos/editCompanyMonetization`, body).then(response => {
        setInformationMessage(`Solicitud editada`);
        setOpenInformation(true);
      });
    }
    catch (e){
      setErrorMessage("Error editando la monetización.");
      setOpenError(true)
    }
  }

  const 
  editIncome = async () => {
    let body = {
      "finalValue": userData.value_final,
      "idFinalCoin": userData.receivedFiat.id,
      "provider":userData.sendingCompanyProvider.id,
      "companyFinal":userData.receivingCompany.id,
      "concept": userData.concept,
      "dateChecked": dateChecked,
      "date": userData.date,
      "expenses": userData.expenses,
      "id": transactionId
    }
    try{
      await postApi(`activos/editIncome`, body).then(response => {
        setInformationMessage(`Solicitud editada`);
        setOpenInformation(true);
      });
    }
    catch (e){
      setErrorMessage("Error editando la monetización.");
      setOpenError(true)
    }
  }

  const handleUsagePlanChange = (name, value) => {
    setUsagePlans((previous) => {
      const newObject = { ...previous };
      newObject[name] = value;
      return newObject;
    });
    setUsagePlansErrors((previous) => {
      const newObject = { ...previous };
      newObject[name] = !validators[name](value);
      return newObject;
    });
  };

  const handleClose = () => {
    setUserData({
      name: '',
      email: '',
      fiat:'',
      organization: '',
      roles: [],
      exchangeRate: '',
      date:new Date(),
      expenses: [],
      currentBuy: '',
      currentSell: '',
      sendingCompanyProvider:{
        id:'',
        name:'',
        lastName:''
      },
      receivingCompany:{
        id:''
      },
      imc:{
        name:'',
        id:''
      },
      sentFiat: {
        short_name:'',
        id:''
      },
      receivedFiat: {
        short_name:'',
        id:''
      },
      concept: { 
        name: '', 
        parent_concept: {
          name:'',
          id:''
        },
        id:''
      }
    });
    setDateChecked(false);
    setCompanies([]);
    setCompaniesProviders([]);
    handleModifyClose();
    setCreated(false);
    setUploadedDocs([]);
    setDocuments([]);
  };

  const calculateTotal = () => {
    let total = 0;
    if(userData.value_final){
      total += parseInt(userData.value_final);
    }
    userData.expenses.forEach(e =>{
      total -= parseInt(e.final_value)
    });
    setTotal(total);
    return total;
  };

  const getAllCompanies = async function (){
    try{
      const data = await getApi(`activos/getAllCompanies`);
      setCompanies(data);
    }
    catch(e){
      setErrorMessage("Error consultando la base de datos, intente mas tarde");
      setOpenError(true)
    }
  }

  const getAllProviders = async function (){
    try{
      const data = await getApi(`activos/getAllSuppliers`);
      setProviders(data);
    }
    catch(e){
      setErrorMessage("Error consultando la base de datos, intente mas tarde");
      setOpenError(true)
    }
  }

  const getImcs = async function (){
    try{
      const data = await getApi(`activos/getAllImc`);
      setImcs(data);
    }
    catch(e){
      setErrorMessage('No fue posible obtener la información de la base de datos. Intenta de nuevo más tarde.');
    }

  }

  const pickerFormat = (date) => {
    let splitted = date.split('T')[0].split('-')
    return `${splitted[1]}/${splitted[2]}/${splitted[0]}`;
  }

  const getConcepts = async function () {
    try{
      const data = await getApi( `activos/getAllConcepts`);
      setConcepts(data)
    }
    catch(e){
      setErrorMessage('No fue posible obtener la información de la base de datos. Intenta de nuevo más tarde.');
    }
  }

  const getConceptsFiltered = function() {
    return concepts.filter((c)=>{return !c.parent_concept.id});
  };

  const getSubConceptsFiltered = function() {
    return userData.concept && userData.concept.parent_concept ? 
    concepts.filter((c)=>{return c.parent_concept.id == userData.concept.parent_concept.id}): 
    concepts.filter((c)=>{return c.parent_concept.id});
  };

  const changeState = async function(state) {
    const result = await postApi(`activos/updateTxState/${transactionId}/${state}`);
  };

  const setEditData = function(){
    getDocuments(isMonetization ? request.imc.id : 'undefined', request.concept_concept && request.concept_concept.parent ? request.concept_concept.parent : request.concept);
    setTransactionId(request.id);
    getEditDocuments();
    setDateChecked(true);
    setUserData((previous) => {
      const newObject = { ...previous };
      newObject.value_final = request.id_monetization.id_transaction.final_value;
      //Revisar
      newObject.concept = concepts.find((concept) => {
        return concept.id == request.concept_concept.id;
      });
      if(isMonetization){
        newObject.value_origin = request.id_monetization.id_transaction.origin_value;
        newObject.rate = request.id_monetization.id_transaction.rate;
        newObject.imc = request.imc;
        newObject.sentFiat = request.id_monetization.id_transaction.id_origin_coin_coin;
      }
      newObject.dateChecked = true;
      newObject.date = pickerFormat(request.id_monetization.id_transaction.date);
      newObject.sendingCompanyProvider = isMonetization ? request.company_origin : request.user;
      
      newObject.receivingCompany = request.company_final;
      newObject.receivedFiat = request.id_monetization.id_transaction.id_final_coin_coin
      
      let expenseList = request.id_monetization.id_transaction.id_expense_expenses; 
      newObject.expenses = expenseList !== undefined ? expenseList.map((expense) => {
        return {
          id:expense.id,
          name: expense.name,
          final_value: expense.id_transaction.final_value
        }
      }) : [];
      return newObject;
    })
    if(isMonetization){
      setNoCopChecked(true);
    }
  };

  const saveExpense = function() {
    setNewExpense((previous) => {
      let newObject = {...previous};
      newObject.final_value = newObject.expense_value;
      setUserData((data) => {
        let newData = {...data};
        newData.expenses.push(newObject);
        return newData;
      });
      if(newObject.includes_iva){
          userData.expenses.push({
          name: `IVA - ${newObject.name}`,
          description: `IVA pagado del gasto ${newObject.name}`,
          final_value: newObject.expense_value * 0.19
        });
      }
      return {
        final_value: '',
        expense_value: '',
        name: '',
        description: '',
        includes_iva: false
      }
    });
    setOpenExpense(false);
  };

  const getEditDocuments = async function() {
    try {
      const response = await postApi(`activos/findTransactionDocuments`,
        { 
          transaction: isEdit ? request.id : transactionId
        }
      );
      const responseDocuments = await response.documents;
      setUploadedDocs(responseDocuments);

    } catch (error) {
      console.log(error);
    }
  }

  const handleIVAChecked = (event) => {
    setNewExpense((previous) => {
      let newObject = {...previous};
      newObject.includes_iva = !newObject.includes_iva;
      return newObject;
    });
  }

  const handleNoCopCheck = (event) => {
    handleAttributeChange("value_final", 0)
    setNoCopChecked(!noCopChecked);
    setUserData((previous) => {
      let newObject = {...previous};
      newObject.sendingCompanyProvider = {
        id:''
      };
      return newObject;
    })
  }

  const checkDocument = (name) => {
    var found = uploadedDocs.find((uploadedDoc) => {
      return uploadedDoc == name;
    });
    if(found) return true;
    else return false;
  }

  const getDocuments = async function(imc, concept) {
    try{
      var documents = await getApi(`activos/findIMCDocuments/${imc}/${concept}`);
      documents = documents.map( document => ({
        ...document, uploaded:false
      }));
      setDocuments(documents);
    }
    catch(e){
      setErrorMessage("Error consultando la base de datos, intente mas tarde");
      setOpenError(true)
    }
  }

  const handleDateChange = (value) => {
    setUserData((previous) => {
      let newObject = {...previous};
      newObject.date = value;
      return newObject;
    });
  }

  useEffect(() => {
    isEdit &&
    request && 
    setEditData()
  }, [request]);

  useEffect(() => {
    if(noCopChecked) {
      setCompaniesProviders(companies);
      setRequiredFeilds(10);
    }
    else{
      setCompaniesProviders(providers);
      setRequiredFeilds(6);
    } 
  }, [noCopChecked]);

  useEffect(() => {
    calculateTotal()
  }, [userData]);


  useEffect(() => {
    documents &&
    uploadedDocs.length !== 0 &&
    transactionId &&
    documents.filter((d)=> !checkDocument(d.name)).length == 0 && changeState(4)
  }, [uploadedDocs]);

  useEffect(() => {
    try {
     getParams();
     getImcs();
     getConcepts();
     getAllCompanies()
     getAllProviders();
    } catch (err) {
      setErrorMessage('No fue posible obtener la información de la base de datos. Intenta de nuevo más tarde.');
      setOpenError(true);
    }
  }, [open]);

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <LoadingBackdrop open={openBackdrop} />
        <ErrorSnackbar open={openError} message={errorMessage} handleClose={handleCloseError} id='errorSnackbar' />
        <SuccessSnackbar
          open={openSuccess}
          message={successMessage}
          handleClose={handleCloseSuccess}
          id='successSnackbar'
        />
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge='start'
              color='inherit'
              onClick={handleClose}
              aria-label='close'
              id='closeButton'
              size="large">
              <CloseIcon />
            </IconButton>
            <Typography variant='h6' className={classes.title}>
              {isEdit ? 'Editar monetización' : 'Proceso de monetización'}
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={styles.userInfoCardContainer}>
          <Card>
            <CardContent>
              <Grid container style={styles.formContainer}>
                <Grid item xs={12} md={6} style={styles.standardInput}>
                  <Autocomplete
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    required
                    disabled={created}
                    value={userData.sendingCompanyProvider || ''}
                    noOptionsText="No hay opciones"
                    options={isMonetization ? companies: providers}
                    getOptionLabel={(option) => isMonetization ? option.name : `${option.name} ${option.lastName}`}
                    onChange={handleSendingCompanyProvider}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        id="sendingCompanies"
                        value={(userData.sendingCompanyProvider && (isMonetization ? userData.sendingCompanyProvider.name : `${userData.sendingCompanyProvider.name} ${userData.sendingCompanyProvider.last_name}`)) || ''}
                        label={`${noCopChecked ? 'Empresa': 'Proveedor'} que envia`}
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6} style={styles.standardInput}>
                  <Autocomplete
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    required
                    disabled={created}
                    value={ userData.receivingCompany }
                    noOptionsText="No hay opciones"
                    options={companies}
                    getOptionLabel={(option) => option.name}
                    onChange={handleReceivingCompany}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        id="receivingCompanies"
                        value={userData.receivingCompany.name}
                        label="Empresa que recibe"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6} md={6} style={styles.standardInput}>
                  <Autocomplete
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    required
                    disabled={created}
                    value={userData.concept.parent_concept}
                    noOptionsText="No hay opciones"
                    options={getConceptsFiltered()}
                    getOptionLabel={(option) => option.name}
                    onChange={handleConcept}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        id="concept"
                        value={ userData.concept.parent_concept.name }
                        label="Concepto"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6} md={6} style={styles.standardInput}>
                  <Autocomplete
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    required
                    disabled={getSubConceptsFiltered().length<1 || created}
                    value={userData.concept}
                    noOptionsText="No hay opciones"
                    options={getSubConceptsFiltered()}
                    getOptionLabel={(option) => option.name}
                    onChange={handleSubConcept}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        id="subConcept"
                        value={userData.concept.name}
                        label="Sub Concepto"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6} style={styles.standardInput}>
                  <TextField
                    id="value_final"
                    disabled={noCopChecked}
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    name="value_final"
                    label="Valor Deuda"
                    fullWidth
                    autoComplete="off"
                    helperText={dataErrors.value && 'Revisa que sea un número válido'}
                    error={dataErrors.value_final}
                    value={userData.value_final || ''}
                    onChange={(event) => handleAttributeChange("value_final", event.target.value)}
                    InputProps={{
                      inputComponent: CurrencyFormat,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6} style={styles.standardInput}>
                  <Autocomplete
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    required
                    disabled={created}
                    value={userData.receivedFiat}
                    noOptionsText="No hay opciones"
                    options={receivingFiats}
                    getOptionLabel={(option) => option.short_name}
                    onChange={handleReceivedFiat}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        id="receviedFiat"
                        value={userData.receivedFiat.short_name}
                        label="Divisa recibida"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={12} style={styles.standardInput}>
                  <Collapse in={noCopChecked} timeout="auto" unmountOnExit>
                    <Grid container style={styles.formContainer}>
                      <Grid item xs={12} md={6} style={styles.standardInput}>
                        <Autocomplete
                          isOptionEqualToValue={(option, value) => option.id === value.id}
                          required
                          disabled={created}
                          value={userData.sentFiat}
                          noOptionsText="No hay opciones"
                          options={sendingFiats}
                          getOptionLabel={(option) => option.short_name}
                          onChange={handleSentFiat}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              required
                              id="sentFiat"
                              value={userData.sentFiat.short_name}
                              label="Divisa enviada"
                              fullWidth
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} md={6} style={styles.standardInput}>
                          <TextField
                            id="value_origin"
                            disabled={created}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            name="value_origin"
                            label="Monto enviado"
                            fullWidth
                            autoComplete="off"
                            helperText={dataErrors.value && 'Revisa que sea un número válido'}
                            error={dataErrors.value_origin}
                            value={userData.value_origin || ''}
                            onChange={(event) => handleAttributeChange("value_origin", event.target.value)}
                            InputProps={{
                              inputComponent: CurrencyFormat,
                            }}
                          />
                      </Grid>
                      <Grid item xs={12} md={6} style={styles.standardInput}>
                        <Autocomplete
                          isOptionEqualToValue={(option, value) => option.id === value.id}
                          required
                          noOptionsText="No hay opciones"
                          disabled={created}
                          options={imcs}
                          defaultValue={isEdit ? editIMC : ''}
                          value={userData.imc}
                          getOptionLabel={(option) => option.name}
                          onChange={handleIMC}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              required
                              id="imc"
                              value={userData.imc.name || ''}
                              label="IMC"
                              fullWidth
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} md={6} style={styles.standardInput}>
                        <TextField
                          id="rate"
                          type="number"
                          disabled={created}
                          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                          name="rate"
                          label="Tarifa Negociada"
                          required
                          fullWidth
                          helperText={dataErrors.identification && 'Revisa que sea un número válido'}
                          error={dataErrors.value}
                          value={userData.rate || ''}
                          onChange={(event) => handleAttributeChange(event.target.name, event.target.value)}
                        />
                      </Grid>
                    </Grid>
                  </Collapse>      
                </Grid>          
                <Grid item xs={12} md={12}>
                  <Button
                    name='expense'
                    color='primary'
                    variant='contained'
                    className={classes.createButton}
                    startIcon={<AddIcon />}
                    onClick={(event)=>{setOpenExpense(true)}}
                    id='monetization'>
                    Agregar Gasto
                  </Button>
                  <Modal
                    open={openExpense}
                    onClose={(event)=>{setOpenExpense(false)}}>
                    <Paper style={styles.modalStyle}>
                      <TextField
                        id="expenseValue"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        name="expense_value"
                        label="Valor"
                        required
                        autoComplete="off"
                        value={newExpense.expense_value || ''}
                        error={dataErrors.expenseValue}
                        onChange={(event) => { handleNewExpenseChange('expense_value', event.target.value) }}
                        InputProps={{
                          inputComponent: CurrencyFormat,
                        }}
                      />
                      <TextField
                        id="expenseName"
                        type="text"
                        name="name"
                        label="Nombre"
                        required
                        value={newExpense.name || ''}
                        onChange={(event) => {
                          handleNewExpenseChange(event.target.name, event.target.value)
                        }}
                        />
                      <TextField
                        id="expenseDescription"
                        type="text"
                        name="description"
                        label="Descripción"
                        value={newExpense.description || ''}
                        onChange={(event) => handleNewExpenseChange(event.target.name, event.target.value)}
                      />
                      <Grid container style={styles.formContainer}>
                        <Grid item xs={12} md={6} style={styles.standardInput}>
                          <FormGroup aria-label="position" row>
                            <FormControlLabel
                              value="top"
                              control={<Checkbox 
                                color="primary"
                                checked={newExpense.includes_iva}
                                  onChange={handleIVAChecked} 
                              />}
                              label="Paga IVA?"
                              labelPlacement="top"
                            />
                          </FormGroup>
                        </Grid>
                        <Grid item xs={12} md={6} style={styles.standardInput}>
                          <TextField
                            disabled
                            id="iva"
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            value={newExpense.includes_iva? newExpense.expense_value * 0.19 : ''}
                            label="IVA"
                            fullWidth
                            InputProps={{
                              inputComponent: CurrencyFormat,
                            }}
                          />
                        </Grid>
                      </Grid>
                      <Button
                        name='expense'
                        color='primary'
                        variant='contained'
                        className={classes.createButton}
                        startIcon={<AddIcon />}
                        onClick={(event) => saveExpense()}
                        id='monetization'>
                        Crear
                      </Button>
                    </Paper>
                  </Modal>
                  <>
                  {
                    userData.expenses.map((e, key) => {
                      return (
                        <Chip
                          key={key}
                          label={`$ ${formatNumber(parseInt(e.final_value))} - ${e.name}`}
                          onDelete={(event)=>{
                            userData.expenses.splice(userData.expenses.indexOf(e),1);
                            handleAttributeChange('expenses', userData.expenses);
                          }}
                        />
                      )
                    })
                  }
                  </>
                </Grid>
                <Grid container style={styles.formContainer}>
                  <Grid item xs={12} md={3} className={classes.logoContainer}>
                    <FormGroup aria-label="position" row>
                      <FormControlLabel
                        value="top"
                        control={<Checkbox 
                          disabled={getSubConceptsFiltered().length<1 || created}
                          color="primary"
                          checked={dateChecked}
                            onChange={handleDateChecked} 
                        />}
                        label={`¿${isMonetization ? 'Monetización':'Ingreso extra'} anterior?`}
                        labelPlacement="start"
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={12} md={3} className={classes.logoContainer}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        disabled={!dateChecked }
                        disableToolbar
                        variant="inline"
                        inputFormat="MM/dd/yyyy"
                        margin="normal"
                        id="date"
                        label="Fecha monetización"
                        value={userData.date}
                        onChange={handleDateChange}
                        renderInput={(props) => <TextField {...props} />}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <TextField
                      id="value_final"
                      disabled={noCopChecked}
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      name="total"
                      label="Total"
                      fullWidth
                      autoComplete="off"
                      helperText={dataErrors.value && 'Revisa que sea un número válido'}
                      value={total}
                      InputProps={{
                        inputComponent: CurrencyFormat,
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid container style={styles.formContainer}>
                <Grid item xs={2} style={styles.createUserButtonContainer}>
                  {
                  isEdit ? 
                  <Button
                    variant='contained' 
                    color='primary' 
                    onClick={ sendEdit }
                  >
                    Editar {isMonetization ? 'monetización' : 'Ingreso extra'}
                  </Button>
                 : (
                  completedFields == requiredFields ? (
                    <Button
                    disabled={created}
                    variant='contained' 
                    color='primary' 
                    onClick={ sendCreate }
                  >
                    Crear {isMonetization ? 'monetización' : 'Ingreso extra'}
                  </Button>
                  ) : 
                  <Typography className={classes.progress}>
                      {`${completedFields} de ${requiredFields} campos completos`}
                  </Typography>)}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          { (created || isEdit ) && (
            <div style={styles.userInfoCardContainer}>
              <Card>
                <CardContent>
                  <Grid container style={styles.formContainer}>
                    {documents.map((document, index) => (
                      <Grid item xs={12} key={index}>
                        <Grid container spacing={10}>
                          <Grid item xs={1}>
                          </Grid>
                          <Grid item xs={5}>
                            <FormControlLabel
                              disabled
                              control={<Checkbox />}
                              checked={checkDocument(document.name)}
                              label={document.name}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <Button
                              fullWidth
                              color="primary"
                              variant="contained"
                              id={`uploadDocumentButton${index}`}
                              onClick={() => {
                                setUploadDocumentOpen(true);
                                setSelectedDocumentName(document.name);
                              }}
                            >
                              Subir archivo
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid> 
                </CardContent>
              </Card>
            </div>
          )}

          {(userData.roles.includes('kyc') || userData.roles.includes('admin')) && (
            <UsagePlanCard
              service='kyc'
              handleUsagePlanChange={handleUsagePlanChange}
              usagePlansErrors={usagePlansErrors}
              usagePlans={usagePlans}
            />
          )}
          {(userData.roles.includes('carlaid') || userData.roles.includes('admin')) && (
            <UsagePlanCard
              service='carlaid'
              handleUsagePlanChange={handleUsagePlanChange}
              usagePlansErrors={usagePlansErrors}
              usagePlans={usagePlans}
            />
          )}
          {(userData.roles.includes('contracts') || userData.roles.includes('admin')) && (
            <UsagePlanCard
              service='contracts'
              handleUsagePlanChange={handleUsagePlanChange}
              usagePlansErrors={usagePlansErrors}
              usagePlans={usagePlans}
            />
          )}
        </div>
        <Dialog
          open={uploadDocumentOpen}
          TransitionComponent={Transition}
          keepMounted
          fullWidth
          onClose={handleCloseUploadDocument}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">Subir documento</DialogTitle>
          {uploadingFile ? (
            <CircularProgress className={classes.uploading} />
          ) : (
            <div>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Por favor selecciona el archivo que deseas subir
                </DialogContentText>
                <Input
                  type="file"
                  fullWidth
                  inputProps={{
                    accept: '.pdf, image/*'
                  }}
                  accept=".pdf"
                  id="documentToUpload"
                  onChange={(event) => {
                    handleFileChange(event.target.files[0]);
                  }}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseUploadDocument} id="cancelUploadButton">
                  Cancelar
                </Button>
                <Button
                  onClick={() => uploadDocument()}
                  color="primary"
                  id="acceptUploadButton"
                  disabled={selectedFile == null}
                >
                  Aceptar
                </Button>
              </DialogActions>
            </div>
          )}
        </Dialog>
      </Dialog>      
    </div>
  );
}

const validators = {
  identification: validateNumericInput,
  email: validateEmailInput,
  exchangeRate: validateMoneyInput,
};

const styles = {
  userInfoCardContainer: {
    padding: '3%'
  },
  formContainer: {
    marginTop: 10
  },
  standardInput: {
    padding: 10
  },
  roleSelectContainer: {
    padding: 10,
    display: 'flex',
    flexDirection: 'column'
  },
  roleSelectInput: {
    marginTop: 'auto'
  },
  roleChipsContainer: {},
  createUserButtonContainer: {
    display: 'flex',
    flexFlow: 'row-reverse',
    padding: 15
  },
  modalStyle: {
    top:  '50%',
    left:  '50%',
    padding: '1em',
    display: 'flex',
    flexDirection: 'column',
    margin: '10em'
  }
};

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  progress: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(1)
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

MonetizationCreate.propTypes = {
  open: PropTypes.bool,
  handleModifyClose: PropTypes.func,
  user: PropTypes.object,
  isEdit: PropTypes.bool,
  userInfo: PropTypes.object, 
  setInformationMessage: PropTypes.func, 
  setOpenInformation: PropTypes.func, 
  request: PropTypes.object, 
  isMonetization: PropTypes.bool
};
