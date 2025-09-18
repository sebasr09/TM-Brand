import { AppBar, Button, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { Document, Page, pdfjs } from 'react-pdf';
import React, { useState } from 'react';

import Colors from '../../../../constants/Colors';
import PropTypes from 'prop-types';
import UnavailableInformation from '../../../common/UnavailableInformation';
import { makeStyles } from '@mui/styles';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PagareInformationDetail({ base64PDF }) {
  const classes = useStyles();
  const [numPages, setNumpages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumpages(numPages);
  };

  const onPageLoadSuccess = () => {
    const canvas = document.getElementsByClassName('react-pdf__Page__canvas')[0];
    canvas.style.maxWidth = '100%';
    canvas.style.width = '100%';
    canvas.style.height = 'auto';
  };

  const nextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  const previousPage = () => {
    setPageNumber(pageNumber - 1);
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      {base64PDF ? (
        <React.Fragment>
          <Grid item xs={12} md={8} lg={6} xl={5} className={classes.pdfContainer}>
            <Document
              file={{
                url: `data:application/pdf;base64,${base64PDF}`
              }}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={console.error}
              id="document"
            >
              <Page pageNumber={pageNumber} onLoadSuccess={onPageLoadSuccess} id="page" />
            </Document>
            <div className={classes.root}>
              <AppBar position="static">
                <Toolbar>
                  <div className={classes.optionsContainer}>
                    {pageNumber !== 1 && (
                      <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="arrow-back"
                        onClick={previousPage}
                        id="backArrowButton"
                        size="large">
                        <ArrowBackIos fontSize="large" />
                      </IconButton>
                    )}
                    <Typography display="inline" variant="h6" className={classes.pagesText} id="numberOfPages">
                      {`${pageNumber} / ${numPages}`}
                    </Typography>
                    {pageNumber !== numPages && (
                      <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="arrow-forward"
                        onClick={nextPage}
                        id="nextArrowButton"
                        size="large">
                        <ArrowForwardIos fontSize="large" />
                      </IconButton>
                    )}
                  </div>
                </Toolbar>
              </AppBar>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  const linkSource = `data:application/pdf;base64,${base64PDF}`;
                  const downloadLink = document.createElement('a');
                  const fileName = 'pagare.pdf';
                  downloadLink.href = linkSource;
                  downloadLink.download = fileName;
                  downloadLink.click();
                }}
                variant="contained"
                style={{ backgroundColor: Colors.primary, color: Colors.white, marginTop: '1%' }}
                id="downloadPagare"
              >
                Descargar
              </Button>
            </div>
          </Grid>
        </React.Fragment>
      ) : (
        <UnavailableInformation />
      )}
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
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
  optionsContainer: {
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  menuButton: {
    margin: 'auto'
  },
  pagesText: {
    margin: 'auto'
  },
  pdfContainer: {
    flexGrow: 1
  }
}));

PagareInformationDetail.propTypes = {
  base64PDF: PropTypes.string
};
