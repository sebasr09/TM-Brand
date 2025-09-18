import { Button, Typography } from '@mui/material';
import React, { useState } from 'react';

import AppBar from '@mui/material/AppBar';
import BasicInformationDetail from './BasicInformationDetail';
import CloseIcon from '@mui/icons-material/Close';
import Colors from '../../../../constants/Colors';
import CreditInformationDetail from './CreditInformationDetail';
import Dialog from '@mui/material/Dialog';
import DocumentationDetail from './DocumentationDetail';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import FinancialInformationDetail from './FinancialInformationDetail';
import IconButton from '@mui/material/IconButton';
import KYCDetail from './KYCDetail';
import LenderListDetail from './LenderListDetail';
import PagareInformationDetail from './PagareInformationDetail';
import PaymentsDetail from './PaymentsDetail';
import PropTypes from 'prop-types';
import SelectedLenderDetail from './SelectedLenderDetail';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  issueDateContainer: {
    paddingLeft: '2%',
    paddingTop: '2%'
  },
  expansionContainer: {
    padding: '2%'
  },
  expansionSummary: {
    backgroundColor: Colors.bancoldexGray
  },
  expansionDetail: {
    paddingTop: '2%',
    paddingBottom: '2%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: 'bold',
    color: Colors.bancoldexFontColor
  },
  buttonContainer: {
    width: '100%',
    textAlign: 'right',
    paddingTop: '1%'
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledExpandMoreIcon = () => <ExpandMoreIcon style={{ color: Colors.black }} />;

export default function RequestDetail({ request, open, setOpen, setSelectedRequest }) {
  const classes = useStyles();
  const [expansionOpened, setExpansionOpened] = useState({
    basicInformation: true,
    creditInformation: true,
    financialInformation: true,
    creditLines: true,
    riskAssessment: true,
    KYCDetail: true,
    paymentsDetail: true,
    pagareInformation: true
  });

  const handleClose = () => {
    setOpen(false);
  };

  const toggleExpansionOpened = (target) => {
    expansionOpened[target] = !expansionOpened[target];
    setExpansionOpened({ ...expansionOpened });
  };

  const updateDocumentsRequest = (newDocumentsState) => {
    request.documents = newDocumentsState;
    setSelectedRequest({ ...request });
  };

  const renderDate = (date) => {
    if (date) {
      const dateToFormate = new Date(date);
      const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(dateToFormate);
      const month = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(dateToFormate);
      const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(dateToFormate);
      return `${day}-${month}-${year}`;
    }
    return '-';
  };

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
              id="closeDetailButton"
              size="large">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Detalle de solicitud
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.issueDateContainer}>
          <Typography>
            <strong>Tipo de crédito:</strong> {request.creditType}
          </Typography>
          <Typography>
            <strong>Fecha de solicitud:</strong> {renderDate(request.issueDate)}
          </Typography>
          <Typography>
            <strong>Estado:</strong> {request.status ? request.status : '-'}
          </Typography>
          {request.selectedLender && request.selectedLender.policy && request.selectedLender.policy.failedRules && (
            <Typography>
              <strong>Razones de rechazo:</strong>{' '}
              {typeof request.selectedLender.policy.failedRules === 'string'
                ? request.selectedLender.policy.failedRules
                : request.selectedLender.policy.failedRules.join()}
            </Typography>
          )}
          {request.selectedLender && request.selectedLender.amountChanged && (
            <Typography>
              <strong>Hubo rescate:</strong> {request.selectedLender.amountChanged ? 'Sí' : 'No'}
            </Typography>
          )}
          {request.selectedLender && request.selectedLender.amountChanged && (
            <Typography>
              <strong>Tipo de rescate:</strong> {request.selectedLender.amountChangedReason ? 'Negativo' : 'Positivo'}
            </Typography>
          )}
          {request.selectedLender &&
            request.selectedLender.amountChanged &&
            request.selectedLender.amountChangedReason && (
              <Typography>
                <strong>Razón de rescate:</strong> {request.selectedLender.amountChangedReason}
              </Typography>
            )}
        </div>
        <div className={classes.expansionContainer}>
          <Accordion
            expanded={expansionOpened.basicInformation}
            onChange={() => toggleExpansionOpened('basicInformation')}
            id="basicInformationExpansionButton"
          >
            <AccordionSummary
              className={classes.expansionSummary}
              expandIcon={<StyledExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>Información Básica</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.expansionDetail}>
              {request.basicInfo && <BasicInformationDetail basicInformation={request.basicInfo} />}
              {request.basicInfoCorporate && <BasicInformationDetail basicInformation={request.basicInfoCorporate} />}
              {request.basicInfoQuicklink && <BasicInformationDetail basicInformation={request.basicInfoQuicklink} />}
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expansionOpened.creditInformation}
            onChange={() => toggleExpansionOpened('creditInformation')}
            id="creditInformationExpansionButton"
          >
            <AccordionSummary
              className={classes.expansionSummary}
              expandIcon={<StyledExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>Información del Crédito</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.expansionDetail}>
              {request.vehicleCredit && <CreditInformationDetail creditInformation={request.vehicleCredit} />}
              {request.investmentCredit && <CreditInformationDetail creditInformation={request.investmentCredit} />}
              {request.corporateCredit && <CreditInformationDetail creditInformation={request.corporateCredit} />}
              {request.creditInformation && <CreditInformationDetail creditInformation={request.creditInformation} />}
              {!request.vehicleCredit &&
                !request.investmentCredit &&
                !request.corporateCredit &&
                !request.creditInformation && <CreditInformationDetail />}
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expansionOpened.creditLines}
            onChange={() => toggleExpansionOpened('creditLines')}
            id="creditLinesExpansionButton"
          >
            <AccordionSummary
              className={classes.expansionSummary}
              expandIcon={<StyledExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography className={classes.heading}>Lender seleccionado</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.expansionDetail}>
              <SelectedLenderDetail selectedLender={request.selectedLender} />
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expansionOpened.paymentsDetail}
            onChange={() => toggleExpansionOpened('paymentsDetail')}
            id="paymentsDetailExpansionButton"
          >
            <AccordionSummary
              className={classes.expansionSummary}
              expandIcon={<StyledExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography className={classes.heading}>Información de pagos</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.expansionDetail}>
              <PaymentsDetail creditNumber={request.selectedLender && request.selectedLender.creditNumber} />
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expansionOpened.KYCDetail}
            onChange={() => toggleExpansionOpened('KYCDetail')}
            id="KYCDetailExpansionButton"
          >
            <AccordionSummary
              className={classes.expansionSummary}
              expandIcon={<StyledExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography className={classes.heading}>Digital Checking</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.expansionDetail}>
              <KYCDetail kycId={request.kycId} />
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expansionOpened.financialInformation}
            onChange={() => toggleExpansionOpened('financialInformation')}
            id="financialInformationExpansionButton"
          >
            <AccordionSummary
              className={classes.expansionSummary}
              expandIcon={<StyledExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography className={classes.heading}>Información Financiera</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.expansionDetail}>
              <FinancialInformationDetail financialInformation={request.financialInformation} />
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expansionOpened.riskAssessment}
            onChange={() => toggleExpansionOpened('riskAssessment')}
            id="riskAssessmentExpansionButton"
          >
            <AccordionSummary
              className={classes.expansionSummary}
              expandIcon={<StyledExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography className={classes.heading}>Lista de lenders</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.expansionDetail}>
              <LenderListDetail lenderList={request.lenderResults} />
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expansionOpened.riskAssessment}
            onChange={() => toggleExpansionOpened('documentDetail')}
            id="documentDetailExpansionButton"
          >
            <AccordionSummary
              className={classes.expansionSummary}
              expandIcon={<StyledExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography className={classes.heading}>Estado documentación</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.expansionDetail}>
              <DocumentationDetail
                documents={request.documents}
                updateDocumentsRequest={updateDocumentsRequest}
                selectedLender={request.selectedLender}
                documentId={request._id}
                identification={
                  (request.basicInfo && request.basicInfo.identification) ||
                  (request.basicInfoCorporate && request.basicInfoCorporate.identification) ||
                  (request.basicInfoQuicklink && request.basicInfoQuicklink.identification)
                }
              />
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expansionOpened.pagareInformation}
            onChange={() => toggleExpansionOpened('pagareInformation')}
            id="pagareInformationExpansionButton"
          >
            <AccordionSummary
              className={classes.expansionSummary}
              expandIcon={<StyledExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography className={classes.heading}>Información pagaré</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.expansionDetail}>
              <PagareInformationDetail base64PDF={request.selectedLender && request.selectedLender.pagarePDF} />
            </AccordionDetails>
          </Accordion>
          <div className={classes.buttonContainer}>
            <Button
              onClick={handleClose}
              variant="contained"
              style={{ backgroundColor: Colors.primary, color: Colors.white }}
              id="acceptButton"
            >
              ACEPTAR
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

RequestDetail.propTypes = {
  request: PropTypes.object,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  setSelectedRequest: PropTypes.func
};
