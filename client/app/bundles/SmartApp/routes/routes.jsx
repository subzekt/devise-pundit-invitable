import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from '../containers/MasterContainer';
import Dashboard from '../components/pages/Dashboard';
import Login from '../components/session/Login';
import UrlNotFound from '../components/UrlNotFound'
import Users from '../components/users'

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={Dashboard} />
    <Route path="login" component={Login} />
    <Route path="users" component={Users} />
    <Route path='*' component={UrlNotFound} />
  </Route>

);
