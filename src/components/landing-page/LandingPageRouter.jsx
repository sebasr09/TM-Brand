import { Redirect, Route } from 'react-router-dom';

import DashboardMain from '../dashboard/DashboardMain';
import LoginWrapperRebrand from '../auth/LoginWrapperRebrand';
import LandingRebrand from './LandingRebrand';
import PropTypes from 'prop-types';
import React from 'react';
import InvestorApp from '../../pages/InvestorApp/InvestorApp';
import NewLanding from './NewLanding';
import Es from './Es';
import Otc from '../Otc';

const LandingPageRouter = ({ user, triggerSessionValidation, setUserInfo , userInfo }) => {
  return (
    <React.Fragment>
      <Route
        exact
        path="/login"
        render={() =>
          user && userInfo ? <Redirect to="/app" /> : <LoginWrapperRebrand user={user} triggerSessionValidation={triggerSessionValidation} setUserInfo={setUserInfo}/>
        }
      />
      <Route
        exact
        path="/"
        render={() =>
          user && userInfo ? <Redirect to="/app" /> : <NewLanding />
        }
      />
            <Route
        exact
        path="/Es"
        render={() =>
          user && userInfo ? <Redirect to="/app" /> : <Es />
        }
      />
            <Route
        exact
        path="/Otc"
        render={() =>
          user && userInfo ? <Redirect to="/app" /> : <Otc />
        }
      />
      <Route
        exact
        path="/dashboard"
        render={() =>
          user ? (
            <DashboardMain triggerSessionValidation={triggerSessionValidation} user={user} userInfo={userInfo} setUserInfo={setUserInfo}/>
          ) : (
            <Redirect to="/" />
          )
        }
      />
      <Route
        exact
        path="/app"
        render={() =>
          user && user.signInUserSession.accessToken.payload['cognito:groups'].length === 1 && user.signInUserSession.accessToken.payload['cognito:groups'][0] === 'investor' ? (
            <InvestorApp user={user} userInfo={userInfo} triggerSessionValidation={triggerSessionValidation}/>
          ) : (
            <Redirect to="/dashboard" />
          )
        }
      />
      <Route
        exact
        path="/compras"
        render={() =>
          user ? (
            <DashboardMain triggerSessionValidation={triggerSessionValidation} user={user} selectedSelection={8} setUserInfo={setUserInfo}/>
          ) : (
            <Redirect to="/" />
          )
        }
      />
      <Route
        exact
        path="/pago-finalizado/:billNumber"
        render={({ match }) => {
          return (
            <DashboardMain
              billNumber={match.params.billNumber}
              triggerSessionValidation={triggerSessionValidation}
              user={user}
              setUserInfo={setUserInfo}
            />
          );
        }}
      />
    </React.Fragment>
  );
};

LandingPageRouter.propTypes = {
  user: PropTypes.object,
  triggerSessionValidation: PropTypes.func,
  setUserInfo: PropTypes.func,
  userInfo: PropTypes.object
};

export default LandingPageRouter;
