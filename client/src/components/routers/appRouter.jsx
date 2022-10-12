import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoginPage from '../../pages/loginPage';
import HomePage from '../../pages/homePage';
import RegisterPage from '../../pages/registerPage';
import Logout from '../../pages/logoutPage';

const AppRouter = () => {
  return (
    <>
      <Switch>
        <Route path="/auth/login" component={LoginPage} />
        <Route path="/auth/register" component={RegisterPage} />
         <Route path="/auth/logout" component={Logout} />
        <Route path="/" component={HomePage} />
        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default AppRouter;
