import React from 'react';
import { Provider } from 'react-redux';
import {Router} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from '../store/smartStore';

import Layout from '../containers/MasterContainer';
import Dashboard from '../components/pages/Dashboard';
import Login from '../components/session/Login';
import Logout from '../components/session/Logout';


injectTapEventPlugin();
export default (props, _railsContext) => {

  const store = configureStore(props);

  // Create an enhanced history that syncs navigation events with the store
  const history = syncHistoryWithStore(
    browserHistory,
    store,
  );

  return (
    <Provider store={store}>
      <Router history={history}
              onUpdate={() => window.scrollTo(0, 0)}  >
        <Route path="/" component={Layout}>
          <IndexRoute component={Dashboard} />
          <Route path="login" component={Login} />
          <Route path="logout" component={Logout} />
        </Route>
      </Router>
    </Provider>
  );
};
