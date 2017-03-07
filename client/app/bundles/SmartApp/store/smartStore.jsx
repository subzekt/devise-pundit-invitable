import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
// import api from 'lib/middlewares/apiMiddleware';
import {auth, users, authInitialState} from '../reducers/sessionReducer'
import { routerReducer } from 'react-router-redux';


export default (props, railsContext) => {
  let createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
  const reducer = combineReducers({
    auth,
    users,
    routing: routerReducer,
  });

  authInitialState.user = props.user;
  const initialState = {
    auth: authInitialState
  }

  return createStoreWithMiddleware(reducer, initialState);
}