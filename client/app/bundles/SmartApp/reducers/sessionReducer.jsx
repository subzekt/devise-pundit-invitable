import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS,
  REQUEST_USERS, RECEIVE_USERS
} from '../constants/sessionConstants';

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

// The quotes reducer
export function users(state = {
  isFetching: false,
  items: [],
}, action) {
  switch (action.type) {
    case REQUEST_USERS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_USERS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.users
      })
    default:
      return state
  }
}
