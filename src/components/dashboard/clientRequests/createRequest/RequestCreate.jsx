import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
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
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import React, { useEffect, useState } from 'react';
import { getApi, postApi } from '../../../api/apiManager';
import { validateMoneyInput } from '../../../../controllers/validators';
import CurrencyFormat from '../../../common/CurrencyFormat';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import Axios from 'axios';

import Autocomplete from '@mui/lab/Autocomplete';
import CloseIcon from '@mui/icons-material/Close';
import ErrorSnackbar from '../../../common/ErrorSnackbar';
import LoadingBackdrop from '../../../common/LoadingBackdrop';
import PropTypes from 'prop-types';
import SuccessSnackbar from '../../../common/SuccessSnackbar';
import { makeStyles } from '@mui/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { getCarlaApi, postCarlaApi } from '../../../api/apiManagerCarla';
import FormGroup from '@mui/material/FormGroup';
import { formatNumber } from '../../../../utils';
import Binance from 'binance-api-node';

export default function RequestCreate({
  open,
  handleModifyClose,
  user,
  isEdit,
  request,
  setRequest,
  setInformationMessage,
  setOpenInformation,
  monetizations,
  setMonetizations,
}) {
  const MONETIZATION = 'monetization',
    INCOME = 'income';

  const classes = useStyles();

  const [userData, setUserData] = useState({
    selectedMonetizations: [],
    selectedSupplier: '',
    exchangeRate: '',
    selectedAsset: '',
    userHash: '',
    sellHash: '',
  });
  const [selectedDate, setSelectadDate] = useState(new Date());
  const [buyingInfo, setBuyingInfo] = useState({
    value: '',
    quantity: '',
    tradePrice: '',
  });
  const [dataErrors, setDataErrors] = useState({
    exchangeRate: false,
    sellHash: false,
    userHash: false,
    value: false,
    quantity: false,
    tradePrice: false,
    totalToBuy: false,
    selectedMonetizations: [],
  });
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const steps = [
    { name: 'Selección del Proveedor', attribute: 'userInfo' },
    { name: 'Selección del activo digital', attribute: 'assetSelection' },
    { name: 'Compra del activo digital', attribute: 'assetPurchase' },
    { name: 'Archivo de sustento', attribute: 'document' },
  ];
  const [disableContinue, setDisableContinue] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [userValidationOpen, setUserValidationOpen] = useState(true);
  const [assetSelectionOpen, setAssetSelectionOpen] = useState(false);
  const [assetBuyOpen, setAssetBuyOpen] = useState(false);
  const [assetDocumentOpen, setAssetDocumentOpen] = useState(false);
  const [fiats, setFiats] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [uploadDocumentOpen, setUploadDocumentOpen] = useState(false);
  const [notCOP, setnotCOP] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [disabledUploadDocument, setDisabledUploadDocument] = useState(true);
  const [selectedAsset, setSelectedAsset] = useState({
    name: '',
    lastTradePrice: '',
  });
  const [dateChecked, setDateChecked] = useState(false);
  const [fixedFields, setFixedFields] = useState([]);
  const [uploadingBuy, setUploadingBuy] = useState(false);
  const [uploadingSell, setUploadingSell] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState([]);

  const [buySent, setBuySent] = useState(false);
  const [sellSent, setSellSent] = useState(false);
  const client = Binance();

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

  const getAssetInfo = async function (asset) {
    if (asset !== null && asset !== undefined) {
      if (asset.short_name === 'USDT') {
        setSelectedAsset((previous) => {
          const newObject = { ...previous };
          newObject['lastTradePrice'] = 1;
          return newObject;
        });
      } else {
        try {
          let result = await client.prices({
            symbol: asset.short_name.concat('USDT'),
          });
          let data = result[Object.keys(result)[0]];
          setSelectedAsset((previous) => {
            const newObject = { ...previous };
            newObject['lastTradePrice'] = parseFloat(data);
            return newObject;
          });
        } catch (error) {
          console.log(error);
          setSelectedAsset((previous) => {
            const newObject = { ...previous };
            newObject['lastTradePrice'] = 0;
            return newObject;
          });
        }
      }
    } else {
      setSelectedAsset({
        name: '',
        lastTradePrice: '',
      });
    }
  };

  const handleDateChecked = (event) => {
    setDateChecked(!dateChecked);
  };

  const handleDateChange = (value) => {
    setSelectadDate(value);
  };

  const uploadDocument = async () => {
    if (uploadingBuy || uploadingSell) {
      setUploadingFile(true);
      let urlResult = '';
      const documentKey = `${
        uploadingBuy ? userData.currentBuy.id : userData.currentSell.id
      }/${selectedFile.name}`;
      try {
        const responseURL = await postApi(`activos/upload-signed-url`, {
          fileName: documentKey,
        });
        urlResult = await responseURL.url;
      } catch (error) {
        console.log(error);
      }
      try {
        const axiosresponse = await Axios.put(urlResult, selectedFile);
        if (axiosresponse.status == 200) {
          setUploadDocumentOpen(false);
          setUploadingFile(false);
          setInformationMessage('Documento subido exitosamente');
          setOpenInformation(true);
          if (uploadingBuy) {
            setBuySent(true);
          } else {
            setSellSent(true);
          }
        } else {
          setUploadingFile(false);
          setInformationMessage('Error cagando el documento');
          setOpenInformation(true);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setUploadingFile(false);
      setInformationMessage('Error cagando el documento');
      setOpenInformation(true);
    }
  };

  const getUploadedDocs = async function (transactionId) {
    try {
      const response = await postApi(`activos/findTransactionDocuments`, {
        transaction: transactionId,
      });
      return response.documents;
    } catch (error) {
      console.log(error);
    }
  };

  const setEditData = async function () {
    //Fill step 0
    setDateChecked(true);
    setUserData((previous) => {
      let newObject = { ...previous };
      newObject.selectedMonetizations =
        request.id_monetization_monetizations.map((m) => {
          return {
            id_monetization: m,
            type: m.id_transaction.type_id === 601 ? MONETIZATION : INCOME,
          };
        });
      newObject.selectedSupplier = request.id_sell_sell.id_transaction.user;
      newObject.currentSell = request.id_sell_sell;
      newObject.currentBuy = request;
      newObject.selectedMonetizations &&
        userData.selectedMonetizations.length > 0 &&
        expand(1);
      //Fill step 1
      newObject.selectedAsset = request.id_transaction.id_origin_coin_coin;
      newObject.selectedAsset &&
        buyingInfo.quantity &&
        buyingInfo.tradePrice &&
        expand(2);
      //Fill step 2
      newObject.sellHash = request.id_sell_sell.sell_hash;
      newObject.userHash = request.user_hash;
      return newObject;
    });
    setBuyingInfo((previous) => {
      let newObject = { ...previous };
      newObject.quantity = request.id_transaction.origin_value;
      newObject.tradePrice = request.id_sell_sell.trade_price;
      newObject.value =
        request.id_sell_sell.trade_price * request.id_transaction.origin_value;
      return newObject;
    });

    const uploadedBuy = await getUploadedDocs(request.id);
    const uploadedSell = await getUploadedDocs(request.id_sell_sell.id);
    if (uploadedBuy.length > 0) {
      setBuySent(true);
    }
    if (uploadedSell.length > 0) {
      setSellSent(true);
    }
    setSelectadDate(parseDate(request.id_transaction.date));
  };

  const handleFileChange = (file) => {
    setSelectedFile(file);
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
  };

  const handleAttributeChange = (name, value) => {
    if (name === 'selectedMonetizations')
      dataErrors.selectedMonetizations.push(false);
    setUserData((previous) => {
      const newObject = { ...previous };
      newObject[name] = value;
      return newObject;
    });
  };

  const handleToUseChange = (index, value) => {
    setUserData((previous) => {
      let newObject = { ...previous };
      newObject.selectedMonetizations[index].to_use = value;
      if (
        value > userData.selectedMonetizations[index].id_monetization.avaiable
      )
        dataErrors.selectedMonetizations[index] = true;
      else dataErrors.selectedMonetizations[index] = false;
      return newObject;
    });
  };

  const fixedFieldExists = (field) => {
    return fixedFields.some(function (el) {
      return el === field;
    });
  };

  const pushFixedField = (field) => {
    if (!fixedFieldExists(field)) {
      setFixedFields((previous) => {
        let newObject = [...previous];
        newObject.push(field);
        return newObject;
      });
    }
  };

  const removeFixedField = (field) => {
    if (fixedFieldExists(field)) {
      setFixedFields((previous) => {
        let newObject = [...previous];
        let index = newObject.indexOf(field);
        newObject.splice(index, 1);
        return newObject;
      });
    }
  };

  const handleBoughtInfoChange = (name, value) => {
    setBuyingInfo((previous) => {
      const newObject = { ...previous };
      newObject[name] = value;
      if (name == 'tradePrice' && previous.quantity) {
        newObject.value = value * previous.quantity;
      } else if (name == 'quantity' && previous.tradePrice) {
        newObject.value = value * previous.tradePrice;
      }
      return newObject;
    });
  };

  useEffect(() => {
    const checkValue = async () => {
      if (buyingInfo.value > calculateAvailable(request))
        dataErrors.totalToBuy = true;
      else dataErrors.totalToBuy = false;
    };
    if (request !== undefined) checkValue();
  }, [buyingInfo]);

  const handleAsset = (event, value) => {
    getAssetInfo(value);
    setSelectedAsset({ value: value });
  };

  const continuar = () => {
    //create sell&buy
    const create = async () => {
      if (!userData.currentSell) {
        setOpenBackdrop(true);
        let body = {
          userId: userData.selectedSupplier.id,
          dateChecked: dateChecked,
          date: selectedDate,
        };
        let result = await postApi(`activos/createSell`, body);
        userData.currentSell = result;
        body = {
          sellId: result.id,
          userId: user.id,
          monetizations: userData.selectedMonetizations,
          dateChecked: dateChecked,
          date: selectedDate,
        };
        result = await postApi(`activos/createBuy`, body);
        userData.currentBuy = result;
      }
    };

    userData.selectedSupplier.id &&
      userData.selectedMonetizations &&
      create().then(() => {
        setOpenBackdrop(false);
        if (userData.currentBuy) {
          setUserValidationOpen(false);
          setAssetSelectionOpen(true);
          setDisableContinue(true);
          setActiveStep(1);
          setRequest((previous) => {
            let newObject = { ...previous };
            newObject.buy_monetizations = userData.selectedMonetizations;
            return newObject;
          });
        } else {
          setOpenError(true);
          setErrorMessage(
            'No se pudo crear la compra/venta. Intente nuevamente.'
          );
        }
      });
  };

  const saveInfo = async () => {
    const update = async () => {
      let body = {
        userId: userData.selectedSupplier.id,
        dateChecked: dateChecked,
        date: selectedDate,
      };
      let resultSell = await postApi(
        `activos/updateSell/${userData.currentSell.id}`,
        body
      );
      body = {
        sellId: resultSell.id,
        userId: user.id,
        monetizations: userData.selectedMonetizations,
        dateChecked: dateChecked,
        date: selectedDate,
      };
      let resultBuy = await postApi(
        `activos/updateBuy/${userData.currentBuy.id}`,
        body
      );
    };

    update().then(() => {
      setOpenBackdrop(false);
      if (userData.currentBuy) {
        setUserValidationOpen(false);
        setAssetSelectionOpen(true);
        setActiveStep(1);
      } else {
        setOpenError(true);
        setErrorMessage(
          'No se pudo editar la compra/venta. Intente nuevamente.'
        );
      }
    });
  };

  const expand = (position) => {
    switch (position) {
      case 3:
        setAssetBuyOpen(false);
        setAssetSelectionOpen(false);
        setUserValidationOpen(false);
        setAssetDocumentOpen(true);
        setActiveStep(3);
        break;
      case 2:
        setAssetBuyOpen(true);
        setAssetSelectionOpen(false);
        setUserValidationOpen(false);
        setAssetDocumentOpen(false);
        setActiveStep(2);
        break;
      case 1:
        setUserValidationOpen(false);
        setAssetBuyOpen(false);
        setAssetSelectionOpen(true);
        setAssetDocumentOpen(false);
        setActiveStep(1);
        break;
      case 0:
        setUserValidationOpen(true);
        setAssetSelectionOpen(false);
        setAssetBuyOpen(false);
        setAssetDocumentOpen(false);
        setActiveStep(0);
        break;
      default:
        break;
    }
  };

  const volver = () => {
    switch (activeStep) {
      case 3:
        setAssetBuyOpen(false);
        setAssetSelectionOpen(true);
        setActiveStep(3);
        break;
      case 2:
        setAssetBuyOpen(false);
        setAssetSelectionOpen(true);
        setActiveStep(1);
        break;
      case 1:
        setUserValidationOpen(true);
        setAssetSelectionOpen(false);
        setActiveStep(0);
        break;
      default:
        break;
    }
  };

  const siguiente = () => {
    const update = async () => {
      setOpenBackdrop(true);
      let body = {
        originValue: buyingInfo.quantity,
        idOriginCoin: isEdit ? selectedAsset.value.id : selectedAsset.value.id,
        tradePrice: buyingInfo.tradePrice,
      };
      let resultSell = await postApi(
        `activos/updateSell/${userData.currentSell.id}`,
        body
      );
      body = {
        originValue: buyingInfo.quantity,
        idOriginCoin: isEdit ? selectedAsset.value.id : selectedAsset.value.id,
      };
      let resultBuy = await postApi(
        `activos/updateBuy/${userData.currentBuy.id}`,
        body
      );
      userData.currentBuy = resultBuy;
    };

    update()
      .then(() => {
        setOpenBackdrop(false);
        if (userData.currentBuy) {
          setAssetSelectionOpen(false);
          setAssetBuyOpen(true);
          setActiveStep(2);
        } else {
          setOpenError(true);
          setErrorMessage(
            'No se pudo crear la compra/venta. Intente nuevamente.'
          );
        }
      })
      .finally(() => {
        setOpenBackdrop(false);
      });
  };

  const finalizar = () => {
    const updateBuy = async () => {
      let body = {
        userHash: userData.userHash || '',
      };
      let result = await postApi(
        `activos/updateBuy/${userData.currentBuy.id}`,
        body
      );
      setDisabledUploadDocument(false);
      setAssetDocumentOpen(true);
    };
    const updateSell = async () => {
      let body = {
        sellHash: userData.sellHash || '',
      };
      let result = await postApi(
        `activos/updateSell/${userData.currentSell.id}`,
        body
      );
      setDisabledUploadDocument(false);
      setAssetDocumentOpen(true);
    };
    //userData.currentBuy && (userData.userHash && updateBuy() || ( userData.sellHash && updateSell()));
    userData.userHash && updateBuy();
    userData.sellHash && updateSell();
  };

  const handleClose = () => {
    setUserData((previous) => {
      const newObject = { ...previous };
      for (let key in newObject) {
        if (key === 'roles') newObject[key] = [];
        if (key === 'selectedMonetizations') newObject[key] = [];
        else newObject[key] = '';
      }
      return newObject;
    });
    setBuyingInfo((previous) => {
      const newObject = { ...previous };
      for (let key in newObject) {
        if (key === 'roles') newObject[key] = [];
        else newObject[key] = '';
      }
      return newObject;
    });
    setFixedFields([]);
    expand(0);
    setActiveStep(0);
    handleModifyClose();
    setBuySent(false);
    setSellSent(false);
  };

  const renderDate = (date) => {
    if (date) {
      const dateToFormate = new Date(date);
      const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(
        dateToFormate
      );
      const month = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(
        dateToFormate
      );
      const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(
        dateToFormate
      );
      return `${day}-${month}-${year}`;
    }
    return '-';
  };

  const parseDate = (date) => {
    if (date) {
      const dateToFormate = new Date(date);
      const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(
        dateToFormate
      );
      const month = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(
        dateToFormate
      );
      const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(
        dateToFormate
      );
      return `${month}/${day}/${year}`;
    }
    return '-';
  };

  //Api Calls
  const getParams = async () => {
    try {
      const data = await getApi(`activos/params`);
      const coins = data.coins.filter((c) => {
        return c.is_digital_asset;
      });

      setFiats(coins);
    } catch (err) {
      setErrorMessage(
        'No fue posible cargar la información de la base de datos.'
      );
    }
  };

  const calculateAvailable = (data) => {
    let sum = 0;
    if (data && data.buy_monetizations) {
      data.buy_monetizations.forEach((monetization) => {
        sum += parseFloat(monetization.to_use);
      });
    }
    return sum;
  };

  const calculateRate = (data) => {
    let rate = 0;
    let sumValues = 0;
    data.id_monetization_monetizations.forEach((monetization) => {
      rate +=
        monetization.id_transaction.origin_value *
        monetization.id_transaction.rate;
      sumValues += monetization.id_transaction.origin_value;
    });
    return formatNumber(rate / sumValues);
  };

  const calculateOriginFiat = (data) => {
    let sum = 0;
    data.id_monetization_monetizations.forEach((monetization) => {
      sum += monetization.id_transaction.origin_value;
    });
    return formatNumber(sum);
  };

  const calculateFinalFiat = (data) => {
    let sum = 0;
    data.id_monetization_monetizations.forEach((monetization) => {
      sum += monetization.id_transaction.final_value;
    });
    return formatNumber(sum);
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
      setErrorMessage(
        'No fue posible cargar las solicitudes. Intenta de nuevo más tarde.'
      );
    } finally {
      setOpenBackdrop(false);
    }
  };

  const checkMonetizationValues = () => {
    return dataErrors.selectedMonetizations.every(
      (monetization) => monetization === false
    );
  };

  const checkToUseValues = () => {
    return userData.selectedMonetizations.every((monetization) => {
      return (
        monetization.to_use !== null &&
        monetization.to_use !== undefined &&
        monetization.to_use !== '' &&
        monetization.to_use !== 0
      );
    });
  };

  const getSuppliersInfo = async () => {
    try {
      const data = await getApi('activos/getAllSuppliers');
      setSuppliers(data);
    } catch (e) {
      setErrorMessage(e);
      setOpenError(true);
    }
  };

  const kycCheck = async (userId) => {
    const data = await postCarlaApi(`api/v1/sarlaft`, userId);
  };

  const getKycInfo = async (kycId) => {
    const data = await getCarlaApi(`api/v1/sarlaft/${kycId}`);
  };

  useEffect(() => {
    const initParams = async () => {
      await getParams();
      await getSuppliersInfo();
      await getMonetizations();
    };
    open && initParams();
  }, [open]);

  useEffect(() => {
    isEdit && user && setEditData();
  }, [request]);

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <LoadingBackdrop open={openBackdrop} />
        <ErrorSnackbar
          open={openError}
          message={errorMessage}
          handleClose={handleCloseError}
          id='errorSnackbar'
        />
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
              size='large'
            >
              <CloseIcon />
            </IconButton>
            <Typography variant='h6' className={classes.title}>
              Compra de activo digital
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={styles.userInfoCardContainer}>
          <Grid container style={styles.formContainer}>
            <Grid item xs={12} md={9} style={styles.standardInput}>
              <Grid style={styles.formContainer}>
                <Accordion
                  expanded={userValidationOpen}
                  onChange={() => expand(0)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='step1-content'
                    id='step1-header'
                  >
                    <Typography>{steps[0].name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container>
                      <Grid container style={styles.formContainer}>
                        <Grid item xs={12} md={12} style={styles.standardInput}>
                          <Autocomplete
                            required
                            multiple
                            noOptionsText='No hay opciones'
                            options={monetizations}
                            disabled={isEdit}
                            defaultValue={
                              isEdit ? userData.selectedMonetizations : []
                            }
                            getOptionLabel={(option) =>
                              option.id_monetization
                                ? (option.type === MONETIZATION
                                    ? 'Monetización'
                                    : 'Ingreso extra') +
                                  ' Id: ' +
                                  option.id_monetization.id +
                                  ' - ' +
                                  renderDate(
                                    option.id_monetization.id_transaction.date
                                  ) +
                                  ' - ' +
                                  '$' +
                                  option.id_monetization.avaiable.toLocaleString()
                                : ''
                            }
                            onChange={(event, value) =>
                              handleAttributeChange(
                                'selectedMonetizations',
                                value
                              )
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                required
                                id='selectedMonetizations'
                                label='Seleccione la monetización a usar'
                                fullWidth
                              />
                            )}
                          />
                          {!isEdit ? (
                            userData.selectedMonetizations.map(
                              (monetization, index) => {
                                return (
                                  <Grid
                                    container
                                    style={styles.formContainer}
                                    key={index}
                                  >
                                    <Grid
                                      item
                                      xs={12}
                                      md={4}
                                      className={classes.logoContainer}
                                    >
                                      <TextField
                                        id='id_monetization'
                                        inputProps={{
                                          inputMode: 'numeric',
                                          pattern: '[0-9]*',
                                        }}
                                        name='id_monetization'
                                        disabled
                                        label='Id'
                                        required
                                        fullWidth
                                        value={monetization.id || ''}
                                      />
                                    </Grid>
                                    <Grid
                                      item
                                      xs={12}
                                      md={4}
                                      className={classes.logoContainer}
                                    >
                                      <TextField
                                        id='available'
                                        inputProps={{
                                          inputMode: 'numeric',
                                          pattern: '[0-9]*',
                                        }}
                                        name='available'
                                        label='Disponible'
                                        disabled
                                        required
                                        fullWidth
                                        value={
                                          monetization.id_monetization.avaiable
                                        }
                                        InputProps={{
                                          inputComponent: CurrencyFormat,
                                        }}
                                      />
                                    </Grid>
                                    <Grid
                                      item
                                      xs={12}
                                      md={4}
                                      className={classes.logoContainer}
                                    >
                                      <TextField
                                        id='to_use'
                                        inputProps={{
                                          inputMode: 'numeric',
                                          pattern: '[0-9]*',
                                        }}
                                        name='to_use'
                                        label='Monto a usar'
                                        required
                                        fullWidth
                                        value={
                                          userData.selectedMonetizations[index]
                                            .to_use || ''
                                        }
                                        error={
                                          dataErrors.selectedMonetizations[
                                            index
                                          ]
                                        }
                                        helperText={
                                          dataErrors.selectedMonetizations[
                                            index
                                          ] &&
                                          'El monto no debe superar el valor disponible.'
                                        }
                                        InputProps={{
                                          inputComponent: CurrencyFormat,
                                        }}
                                        onChange={(event) =>
                                          handleToUseChange(
                                            index,
                                            event.target.value
                                          )
                                        }
                                      />
                                    </Grid>
                                  </Grid>
                                );
                              }
                            )
                          ) : (
                            <></>
                          )}
                          <Autocomplete
                            required
                            noOptionsText='No hay opciones'
                            options={suppliers}
                            disabled={isEdit}
                            defaultValue={
                              isEdit ? userData.selectedSupplier : ''
                            }
                            getOptionLabel={(option) =>
                              option.userCompanies &&
                              option.userCompanies.companyId
                                ? option.userCompanies.company.name
                                : option.name
                            }
                            onChange={(event, value) =>
                              handleAttributeChange('selectedSupplier', value)
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                required
                                id='selectedSupplier'
                                value={userData.selectedSupplier || ''}
                                label='Seleccione el proveedor'
                                fullWidth
                              />
                            )}
                          />
                          <Grid container style={styles.formContainer}>
                            <Grid
                              item
                              xs={12}
                              md={6}
                              className={classes.logoContainer}
                            >
                              <FormGroup aria-label='position' row>
                                <FormControlLabel
                                  value='top'
                                  control={
                                    <Checkbox
                                      color='primary'
                                      checked={dateChecked}
                                      onChange={handleDateChecked}
                                    />
                                  }
                                  label='Compra anterior?'
                                  labelPlacement='top'
                                />
                              </FormGroup>
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              md={6}
                              className={classes.logoContainer}
                            >
                              <LocalizationProvider
                                dateAdapter={AdapterDateFns}
                              >
                                <DatePicker
                                  disabled={!dateChecked}
                                  disableToolbar
                                  variant='inline'
                                  inputFormat='MM/dd/yyyy'
                                  margin='normal'
                                  id='date'
                                  label='Fecha compra'
                                  value={selectedDate}
                                  onChange={handleDateChange}
                                  renderInput={(props) => (
                                    <TextField {...props} />
                                  )}
                                  KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                  }}
                                />
                              </LocalizationProvider>
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            style={styles.createUserButtonContainer}
                          >
                            <Button
                              variant='contained'
                              color='primary'
                              onClick={isEdit ? saveInfo : continuar}
                              disabled={
                                isEdit ||
                                !userData.selectedSupplier ||
                                disableContinue
                              }
                            >
                              {isEdit ? 'Guardar' : 'Continuar'}
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={assetSelectionOpen}
                  onChange={() => expand(1)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='step2-content'
                    id='step2-header'
                  >
                    <Typography>{steps[1].name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container style={styles.formContainer}>
                      <Grid item xs={12} md={6} style={styles.standardInput}>
                        <Autocomplete
                          required
                          noOptionsText='No hay opciones'
                          options={fiats}
                          defaultValue={isEdit ? userData.selectedAsset : ''}
                          getOptionLabel={(option) => option.short_name}
                          onChange={handleAsset}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              required
                              id='selectedAsset'
                              value={selectedAsset.value || ''}
                              label='Seleccione el activo para la compra'
                              fullWidth
                            />
                          )}
                        />
                      </Grid>
                      {notCOP && (
                        <Grid item xs={12} md={6} style={styles.standardInput}>
                          <TextField
                            id='exchangeRate'
                            inputProps={{
                              inputMode: 'numeric',
                              pattern: '[0-9]*',
                            }}
                            name='exchangeRate'
                            label='Taza de cambio'
                            required
                            fullWidth
                            helperText={
                              dataErrors.exchangeRate &&
                              'Revisa que sea un número válido'
                            }
                            value={userData.exchangeRate || ''}
                            onChange={(event) =>
                              handleAttributeChange(
                                event.target.name,
                                event.target.value
                              )
                            }
                          />
                        </Grid>
                      )}
                      <Grid item xs={12} md={6} style={styles.standardInput}>
                        <TextField
                          id='tradePrice'
                          inputProps={{
                            inputMode: 'numeric',
                            pattern: '[0-9]*',
                          }}
                          name='tradePrice'
                          label='Precio por activo en COP'
                          required
                          fullWidth
                          helperText={
                            dataErrors.tradePrice &&
                            'Revisa que sea un número válido'
                          }
                          value={buyingInfo.tradePrice || ''}
                          onChange={(event) =>
                            handleBoughtInfoChange(
                              'tradePrice',
                              event.target.value
                            )
                          }
                          InputProps={{
                            inputComponent: CurrencyFormat,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6} style={styles.standardInput}>
                        <TextField
                          id='value'
                          inputProps={{
                            inputMode: 'numeric',
                            pattern: '[0-9]*',
                          }}
                          name='value'
                          disabled
                          label='Total en COP'
                          fullWidth
                          helperText={
                            dataErrors.totalToBuy &&
                            'El monto no debe superar al valor disponible.'
                          }
                          value={buyingInfo.value || ''}
                          error={dataErrors.totalToBuy}
                          onChange={(event) =>
                            handleBoughtInfoChange('value', event.target.value)
                          }
                          InputProps={{
                            inputComponent: CurrencyFormat,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6} style={styles.standardInput}>
                        <TextField
                          id='quantity'
                          type='number'
                          inputProps={{
                            inputMode: 'numeric',
                            pattern: '[0-9]*',
                          }}
                          name='quantity'
                          label='Cantidad de activos'
                          required
                          fullWidth
                          helperText={
                            dataErrors.quantity &&
                            'Revisa que sea un número válido'
                          }
                          error={dataErrors.quantity}
                          value={buyingInfo.quantity || ''}
                          onChange={(event) =>
                            handleBoughtInfoChange(
                              'quantity',
                              event.target.value
                            )
                          }
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        style={styles.createUserButtonContainer}
                      >
                        <Button
                          variant='contained'
                          color='primary'
                          onClick={volver}
                        >
                          Volver
                        </Button>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        style={styles.createUserButtonContainer}
                      >
                        <Button
                          variant='contained'
                          color='primary'
                          onClick={siguiente}
                          disabled={dataErrors.totalToBuy}
                        >
                          {isEdit ? 'Guardar' : 'Siguiente'}
                        </Button>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                <Accordion expanded={assetBuyOpen} onChange={() => expand(2)}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='step3-content'
                    id='step3-header'
                  >
                    <Typography>{steps[2].name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container style={styles.formContainer}>
                      <Grid item xs={12} md={6} style={styles.standardInput}>
                        <TextField
                          id='userHash'
                          name='userHash'
                          label='Hash Compra'
                          type='string'
                          fullWidth
                          helperText={
                            dataErrors.userHash && 'Revisa el hash del Usuario'
                          }
                          error={dataErrors.userHash}
                          value={userData.userHash || ''}
                          onChange={(event) =>
                            handleAttributeChange(
                              event.target.name,
                              event.target.value
                            )
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={6} style={styles.standardInput}>
                        <TextField
                          id='sellHash'
                          name='sellHash'
                          label='Hash Venta'
                          fullWidth
                          type='string'
                          helperText={
                            dataErrors.sellHash && 'Revisa el Hash de Kraken'
                          }
                          error={dataErrors.sellHash}
                          value={userData.sellHash || ''}
                          onChange={(event) =>
                            handleAttributeChange(
                              event.target.name,
                              event.target.value
                            )
                          }
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        style={styles.createUserButtonContainer}
                      >
                        <Button
                          variant='contained'
                          color='primary'
                          onClick={finalizar}
                        >
                          Guardar
                        </Button>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={assetDocumentOpen}
                  onChange={() => expand(3)}
                  disabled={isEdit ? false : disabledUploadDocument}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='step3-content'
                    id='step3-header'
                  >
                    <Typography>{steps[3].name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid item xs={12}>
                      <Grid container spacing={10}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={5}>
                          <FormControlLabel
                            disabled
                            control={<Checkbox />}
                            checked={buySent}
                            label={'Sustento de compra'}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Button
                            fullWidth
                            color='primary'
                            variant='contained'
                            id={`uploadDocumentButton`}
                            onClick={() => {
                              setUploadDocumentOpen(true);
                              setUploadingBuy(true);
                              setUploadingSell(false);
                            }}
                          >
                            Subir archivo
                          </Button>
                        </Grid>
                      </Grid>
                      <Grid container spacing={10}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={5}>
                          <FormControlLabel
                            disabled
                            control={<Checkbox />}
                            checked={sellSent}
                            label={'Sustento de venta'}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Button
                            fullWidth
                            color='primary'
                            variant='contained'
                            id={`uploadDocumentButton`}
                            onClick={() => {
                              setUploadDocumentOpen(true);
                              setUploadingBuy(false);
                              setUploadingSell(true);
                            }}
                          >
                            Subir archivo
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
            <Grid item xs={12} md={3}>
              <div style={styles.userInfoCardContainer}>
                <Card>
                  <AppBar className={classes.appBar}>
                    <Toolbar>
                      <Typography variant='h6' className={classes.title}>
                        Monetizado
                      </Typography>
                    </Toolbar>
                  </AppBar>
                  <CardContent>
                    <Typography component='subtitle1' variant='subtitle1'>
                      {/*FIAT inicial: <strong>{isEdit ? `${request.id_monetization_monetizations[0].id_transaction.id_origin_coin_coin.short_name}  ${calculateOriginFiat(request)}` : 'N/A'}</strong><br/>*/}
                    </Typography>
                    <Typography component='subtitle1' variant='subtitle1'>
                      Tasa de cambio:{' '}
                      <strong>
                        {isEdit ? `$ ${calculateRate(request)}` : 'N/A'}
                      </strong>
                      <br />
                    </Typography>
                    <Typography component='subtitle1' variant='subtitle1'>
                      Disponible COP:{' '}
                      <strong>
                        {request && request.buy_monetizations
                          ? formatNumber(calculateAvailable(request))
                          : 'N/A'}
                      </strong>
                    </Typography>
                  </CardContent>
                </Card>
              </div>
              <div style={styles.userInfoCardContainer}>
                <Card>
                  <AppBar className={classes.appBar}>
                    <Toolbar>
                      <Typography variant='h6' className={classes.title}>
                        Información de Kraken
                      </Typography>
                    </Toolbar>
                  </AppBar>
                  <CardContent>
                    <Typography component='h6' variant='h6'>
                      Activo consultado:{' '}
                      <strong>
                        {selectedAsset.short_name != ''
                          ? selectedAsset.short_name
                          : 'N/A'}
                      </strong>
                    </Typography>
                    <Typography id='requestsDone'>
                      Precio última venta:{' '}
                      <strong>
                        {selectedAsset.lastTradePrice != ''
                          ? selectedAsset.lastTradePrice
                          : 'N/A'}
                      </strong>
                    </Typography>
                  </CardContent>
                </Card>
              </div>
              <div style={styles.userInfoCardContainer}>
                <Card>
                  <AppBar className={classes.appBar}>
                    <Toolbar>
                      <Typography variant='h6' className={classes.title}>
                        Compra
                      </Typography>
                    </Toolbar>
                  </AppBar>
                  <CardContent>
                    <Typography component='h6' variant='h6'>
                      Activo consultado:{' '}
                      <strong>
                        {selectedAsset.short_name != ''
                          ? selectedAsset.short_name
                          : 'N/A'}
                      </strong>
                    </Typography>
                    <Typography id='requestsDone'>
                      Precio última venta:{' '}
                      <strong>
                        {selectedAsset.lastTradePrice != ''
                          ? selectedAsset.lastTradePrice
                          : 'N/A'}
                      </strong>
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </Grid>
          </Grid>
        </div>
        <Dialog
          open={uploadDocumentOpen}
          TransitionComponent={Transition}
          keepMounted
          fullWidth
          onClose={handleCloseUploadDocument}
          aria-labelledby='alert-dialog-slide-title'
          aria-describedby='alert-dialog-slide-description'
        >
          <DialogTitle id='alert-dialog-slide-title'>
            Subir documento
          </DialogTitle>
          {uploadingFile ? (
            <CircularProgress className={classes.uploading} />
          ) : (
            <div>
              <DialogContent>
                <DialogContentText id='alert-dialog-slide-description'>
                  Por favor selecciona el archivo que deseas subir
                </DialogContentText>
                <Input
                  type='file'
                  fullWidth
                  inputProps={{
                    accept: '.pdf, image/*',
                  }}
                  accept='.pdf'
                  id='documentToUpload'
                  onChange={(event) => {
                    handleFileChange(event.target.files[0]);
                  }}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleCloseUploadDocument}
                  id='cancelUploadButton'
                >
                  Cancelar
                </Button>
                <Button
                  onClick={() => uploadDocument()}
                  color='primary'
                  id='acceptUploadButton'
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
  exchangeRate: validateMoneyInput,
};

const styles = {
  userInfoCardContainer: {
    padding: '3%',
  },
  formContainer: {
    marginTop: 10,
  },
  standardInput: {
    padding: 10,
  },
  roleSelectContainer: {
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
  },
  roleSelectInput: {
    marginTop: 'auto',
  },
  roleChipsContainer: {},
  createUserButtonContainer: {
    display: 'flex',
    flexFlow: 'row-reverse',
    padding: 15,
  },
};

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

RequestCreate.propTypes = {
  open: PropTypes.bool,
  handleModifyClose: PropTypes.func,
  user: PropTypes.object,
  isEdit: PropTypes.bool,
  request: PropTypes.object,
  setRequest: PropTypes.func,
  userInfo: PropTypes.object,
  setInformationMessage: PropTypes.func,
  setOpenInformation: PropTypes.func,
  monetizations: PropTypes.array,
  setMonetizations: PropTypes.func,
};
