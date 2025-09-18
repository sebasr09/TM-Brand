import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, makeStyles } from '@mui/material';
import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import UnavailableInformation from '../../../common/UnavailableInformation';
import { getApi } from '../../../api/apiManager';
import tusDatosHallazgos from '../../../../data/tusDatosHallazgosList';
import tusDatosObjects from '../../../../data/tusDatosObjects';

const useStyles = makeStyles(() => ({
  indicator: {
    marginRight: 10
  },
  highAlertRect: {
    fill: '#eb0001',
    fontSize: '40px'
  },
  mediumAlertRect: {
    fill: '#ff9a4d',
    fontSize: '40px'
  },
  lowAlertRect: {
    fill: '#FFD44D',
    fontSize: '40px'
  },
  infoAlertRect: {
    fill: 'green',
    fontSize: '40px'
  }
}));

const KYCDetail = ({ kycId }) => {
  const classes = useStyles();
  const [request, setRequest] = useState({});

  useEffect(() => {
    const getRequest = async () => {
      if (kycId !== undefined) {
        try {
          const result = await getApi(`kyc/request/${kycId}`);
          setRequest(result);
        } catch (err) {
          console.log(err);
        }
      } else {
        setRequest(null);
      }
    };
    getRequest();
  }, [kycId]);

  const classNameForRect = (nameInObject) => {
    if (nameInObject === 'altos') return classes.highAlertRect;
    else if (nameInObject === 'medios') return classes.mediumAlertRect;
    else if (nameInObject === 'bajos') return classes.lowAlertRect;
    else if (nameInObject === 'infos') return classes.infoAlertRect;
  };

  return (
    <React.Fragment>
      {request && request['dict_hallazgos'] ? (
        <Paper>
          <TableContainer>
            <Table stickyHeader className={classes.table} aria-labelledby="tableTitle" aria-label="enhanced table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Campo</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Tipo de hallazgo</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Hallazgo</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tusDatosHallazgos.map((row) => {
                  return request['dict_hallazgos'][row.nameInObject].map((hallazgoInfo) => {
                    return tusDatosObjects.map((detail, index) => {
                      if (detail.location === hallazgoInfo.fuente) {
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                            <TableCell component="th" id={labelId} scope="row">
                              {detail.name}
                            </TableCell>
                            <TableCell component="th" id={labelId} scope="row">
                              <ReportProblemIcon className={classNameForRect(row.nameInObject)} />
                            </TableCell>
                            <TableCell component="th" id={labelId} scope="row">
                              {hallazgoInfo.hallazgo}
                            </TableCell>
                          </TableRow>
                        );
                      } else return null;
                    });
                  });
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ) : (
        <UnavailableInformation />
      )}
    </React.Fragment>
  );
};

KYCDetail.propTypes = {
  kycId: PropTypes.string
};

export default KYCDetail;
