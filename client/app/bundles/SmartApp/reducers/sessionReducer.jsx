import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS,
  REQUEST_USERS, RECEIVE_USERS
} from '../constants/sessionConstants';

import * as actionTypes from '../constants/userConstants';


import Immutable from 'immutable';

export const authInitialState = {
  isFetching: false,
  isClientAuthenticated: localStorage.getItem('smart_token') ? true : false,
  user: {}
};

export function auth(state = authInitialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isClientAuthenticated: false,
        user: action.creds
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isClientAuthenticated: true,
        errorMessage: '',
        user: action.user
      })
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isClientAuthenticated: false,
        errorMessage: action.message
      })
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        isClientAuthenticated: false
      })
    default:
      return state
  }
}

export function users(state = Immutable.fromJS({
  isFetching: false,
  items: [],
  isSaving: false,
  submitUserError: null
}), action) {

  const {type, users, user, error} = action;

  switch (type) {
    case actionTypes.REQUEST_USERS:
      return state.merge({isFetching: true});
    case actionTypes.RECEIVE_USERS:
      return state.merge({isFetching: false, items: users});
    case actionTypes.SUBMIT_USER_SUCCESS: {
      return state.withMutations(state => (
        state
          .updateIn(
            ['items'],
            items => items.unshift(Immutable.fromJS(user)),
          )
          .merge({
            submitUserError: null,
            isSaving: false,
          })
      ));
    }
    case actionTypes.SUBMIT_USER_FAILURE: {
      return state.merge({
        submitUserError: error,
        isSaving: false,
      });
    }
    case actionTypes.SET_IS_SAVING: {
      return state.merge({
        isSaving: true,
      });
    }
    default:
      return state
  }
}
