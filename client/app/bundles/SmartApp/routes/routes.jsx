import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from '../containers/MasterContainer';
import Dashboard from '../components/pages/Dashboard';
import Login from '../components/session/Login';
import Logout from '../components/session/Logout';
import UrlNotFound from '../components/UrlNotFound'

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={Dashboard} />
    <Route path="login" component={Login} />
    <Route path="logout" component={Logout} />
    <Route path='*' component={UrlNotFound} />
  </Route>

);
