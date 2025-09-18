import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Colors from '../../constants/Colors';
import { makeStyles } from '@mui/styles';

const FinancialoMejor = window.FinancialoMejor;

const Carla = ({ userData, setUserData, saveUser, createUser }) => {
  const classes = useStyles();
  useEffect(() => {
    const onStart = (error, transactionId) => {
      if (error) {
        console.log(error);
      } else {
        userData.carlaid = transactionId;
        userData.userStateId = 3;
        setUserData({...userData})
        if(!userData.carla){
          createUser()
        }
        else {
          saveUser();
        }
      }
    };
    const onFinished = (error, transactionId, additionalData) => {
      if (error) {
        console.log(error);
      }
      if (additionalData.basicInfo) {
          userData.carlaid = transactionId;
          userData.name = additionalData.basicInfo.name;
          userData.lastName = additionalData.basicInfo.lastName;
          userData.userStateId = 1;
        setUserData({...userData});
        saveUser();
      }
    };
    const element = document.getElementById('fm-button');
    let params = {
      primaryColor: Colors.primary,
      secondaryColor: Colors.secondary,
      buttonIcon: "favicon.png",
      buttonText: 'Verificar',
      client: 'Cariñito'
    };

    if (userData.identification) {
      params.clientInformation = {
        documentType: userData.identificationType.shortName,
        identification: parseInt(userData.identification),
        name: userData.name,
        lastName: userData.lastName,
        email: userData.email
      };
    }

    FinancialoMejor &&
      FinancialoMejor.renderButton(element, process.env.REACT_APP_API_KEY, onFinished, onStart, params);
  }, [userData]);

  const renderFmButton = () => {
    return <div id="fm-button" className={classes.innerButton} />;
  };

  return <div className={classes.fmButton}>{renderFmButton()}</div>;
};

const useStyles = makeStyles(() => ({
  fmButton: {
    margin: 'auto',
    padding: '1%'
  },
  innerButton: { display: 'block' }
}));

Carla.propTypes = {
  userData: PropTypes.object,
  setUserData: PropTypes.func,
  saveUser: PropTypes.func,
  createUser: PropTypes.func
};

export default Carla;
