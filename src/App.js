import './App.css';

import { BrowserRouter, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import Amplify from 'aws-amplify';
import { Auth } from 'aws-amplify';
import LandingPage from '../src/components/landing-page/LandingPage';
import ScrollToTop from '../src/components/common/ScrollToTop';
import awsExportsDev from './aws-exports-dev';
import awsExportsProd from './aws-exports-prod';
import { TMThemeProvider } from './providers/ThemeProvider';

Amplify.configure(
  process.env.CT_ENV == 'production' ? awsExportsProd : awsExportsDev
);

const App = (props) => {
  const [user, setUser] = useState();
  const [userInfo, setUserInfo] = useState();
  const [authEvent, setAuthEvent] = useState(false);

  const verifySession = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser();
      setUser(authUser);
      getUserInfo();
    } catch (err) {
      console.log(err);
      setUser(null);
    }
  };

  const getUserInfo = async () => {
    try {
      const user = JSON.parse(window.localStorage.getItem('user-info'));
      //console.log(authUser.signInUserSession.idToken.jwtToken);
      setUserInfo(user);
      setUserInfo((previous) => {
        let newObject = { ...previous };
        newObject.balance = 0;
        return newObject;
      });
    } catch (err) {
      console.log(err);
      setUser(null);
    }
  };

  const triggerSessionValidation = () => {
    setAuthEvent((previous) => !previous);
  };

  useEffect(() => {
    verifySession();
  }, [authEvent]);

  return (
    <div className='App'>
      <TMThemeProvider>
        <BrowserRouter>
          <ScrollToTop>
            <Route
              path='/'
              render={() => (
                <LandingPage
                  user={user}
                  setUserInfo={setUserInfo}
                  userInfo={userInfo}
                  triggerSessionValidation={triggerSessionValidation}
                />
              )}
              {...props}
            />
          </ScrollToTop>
        </BrowserRouter>
      </TMThemeProvider>
    </div>
  );
};

export default App;
