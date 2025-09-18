import { Button, Input } from '@mui/material';
import React, { useEffect, useState } from 'react';

import Alert from '@mui/lab/Alert';
import Axios from 'axios';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import UnavailableInformation from '../../../common/UnavailableInformation';
import { makeStyles } from '@mui/styles';

//import createZIP from '../../../../controllers/createZIP';

const useStyles = makeStyles(() => ({
  uploading: {
    position: 'relative',
    margin: 'auto',
    marginBottom: '5%'
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DocumentationDetail = ({ documents, updateDocumentsRequest, selectedLender, documentId }) => {
  const classes = useStyles();
  const [uploadDocumentOpen, setUploadDocumentOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedDocumentName, setSelectedDocumentName] = useState(null);
  const [selectedDocumentIndex, setSelectedDocumentIndex] = useState(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [documentsWithURL, setDocumentsWithURL] = useState(0);
  const [alertMessage, setAlertMessage] = useState(null);
  const [openAlertMessage, setOpenAlertMessage] = useState(false);

  useEffect(() => {
    let numOfDocsWithURL = 0;
    documents.forEach((document) => {
      if (document.url) numOfDocsWithURL++;
    });
    setDocumentsWithURL(numOfDocsWithURL);
  }, [documents]);
  
  const uploadDocument = async (selectedLender, documentId) => {
    setUploadingFile(true);
    const extension = selectedFile.name.split('.').pop();
    let urlResult = '';
    const documentKey = `${selectedLender.name}/${documentId}/${selectedDocumentName.substring(0, 30)}.${extension}`;
    try {
      const responseURL = await fetch(`${process.env.REACT_APP_SERVER_HOST}/upload-signed-url`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: documentKey })
      });

      urlResult = await responseURL.json();
    } catch (error) {
      console.log(error);
    }

    try {
      await Axios.put(urlResult.url, selectedFile);
    } catch (error) {
      console.log(error);
    }

    fetch(`${process.env.REACT_APP_SERVER_HOST}/documents`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        requestID: documentId,
        document: selectedDocumentName,
        key: documentKey
      })
    })
      .then((res) => {
        if (res.status === 200) {
          setUploadDocumentOpen(false);
          let originalDocuments = [...documents];
          originalDocuments[selectedDocumentIndex] = { name: selectedDocumentName, url: documentKey };
          updateDocumentsRequest(originalDocuments);
          setUploadingFile(false);
          setAlertMessage('Documento subido exitosamente');
          setOpenAlertMessage(true);
        }
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        throw err;
      });
  };

  const downloadDocument = (url) => {
    fetch(`${process.env.REACT_APP_SERVER_HOST}/get-signed-url`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileName: url })
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        window.open(result.url, '_blank');
      });
  };

  const deleteDocument = (index, name, url) => {
    const documentId = url.split('/')[1];
    fetch(`${process.env.REACT_APP_SERVER_HOST}/delete-document`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        requestID: documentId,
        document: name,
        key: url
      })
    }).then(() => {
      let originalDocuments = [...documents];
      originalDocuments[index] = { name: name };
      updateDocumentsRequest(originalDocuments);
      setAlertMessage('Documento eliminado exitosamente');
      setOpenAlertMessage(true);
    });
  };

  // const downloadAllDocuments = () => {
  //   const zipName = `documentos-${identification}`;
  //   documents.forEach((document, index) => {
  //     const url = document.url;
  //     if (url) {
  //       const filename = url.split('/')[2];
  //       fetch(`${process.env.REACT_APP_SERVER_HOST}/get-signed-url`, {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ fileName: url }),
  //       })
  //         .then((res) => {
  //           return res.json();
  //         })
  //         .then((result) => {
  //           createZIP(filename, result.url, index, documents.length - 1, zipName);
  //         });
  //     }
  //   });
  // };

  const handleCloseAlertMessage = () => {
    setOpenAlertMessage(false);
  };

  const handleCloseUploadDocument = () => {
    setUploadDocumentOpen(false);
    setSelectedDocumentName(null);
  };

  const handleFileChange = (file) => {
    setSelectedFile(file);
  };

  return (
    <React.Fragment>
      <Snackbar open={openAlertMessage} autoHideDuration={6000} onClose={handleCloseAlertMessage}>
        <Alert onClose={handleCloseAlertMessage} severity="success">
          {alertMessage}
        </Alert>
      </Snackbar>
      {documents && documents.length > 0 ? (
        <Grid container spacing={3}>
          {/* {documentsWithURL > 0 &&
            <Grid item xs={12}>
              <Grid item xs={4} >
                <Button
                  color="primary"
                  variant="contained"
                  onClick={downloadAllDocuments}
                >
                  Descargar todos los archivos
                </Button>
              </Grid>
            </Grid>} */}
          {documents.map((document, index) => (
            <Grid item xs={12} key={index}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControlLabel
                    disabled
                    control={<Checkbox />}
                    checked={document.url ? true : false}
                    label={document.name}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    id={`uploadDocumentButton${index}`}
                    onClick={() => {
                      setUploadDocumentOpen(true);
                      setSelectedDocumentName(document.name);
                      setSelectedDocumentIndex(index);
                    }}
                  >
                    Subir archivo
                  </Button>
                </Grid>
                {document.url && (
                  <Grid item xs={2}>
                    <Button
                      fullWidth
                      color="primary"
                      variant="contained"
                      id={`downloadDocumentButton${index}`}
                      onClick={() => downloadDocument(document.url)}
                    >
                      Descargar archivo
                    </Button>
                  </Grid>
                )}
                {document.url && (
                  <Grid item xs={2}>
                    <Button
                      fullWidth
                      color="primary"
                      variant="contained"
                      id={`deleteDocumentButton${index}`}
                      onClick={() => deleteDocument(index, document.name, document.url)}
                    >
                      Eliminar archivo
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Grid>
          ))}
        </Grid>
      ) : (
        <UnavailableInformation />
      )}
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
                onClick={() => uploadDocument(selectedLender, documentId)}
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
    </React.Fragment>
  );
};

DocumentationDetail.propTypes = {
  documents: PropTypes.array,
  updateDocumentsRequest: PropTypes.func,
  selectedLender: PropTypes.object,
  documentId: PropTypes.string
};

export default DocumentationDetail;
