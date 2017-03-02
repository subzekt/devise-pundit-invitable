/* eslint-disable import/prefer-default-export */
import ReactOnRails from 'react-on-rails';
import axios from 'axios';

import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  LOGOUT_REQUEST,LOGOUT_SUCCESS,
} from '../constants/sessionConstants';



function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isClientAuthenticated: false,
    creds
  }
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isClientAuthenticated: true,
    user
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isClientAuthenticated: false,
    message
  }
}


function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isClientAuthenticated: true
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isClientAuthenticated: false
  }
}

// // Logs the user out
// export function logoutUser() {
//     return dispatch => {
//         dispatch(requestLogout())
//         localStorage.removeItem('sharekhata_token')
//         dispatch(receiveLogout())
//     }
// }
export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout())
    // localStorage.removeItem('id_token')
    return axios(
      {
        method: 'delete',
        url: '/api/v1/users/sign_out.json',
        headers: { 'Authorization': localStorage.getItem('smart_token')}
      })
      .then(function (response) {
        localStorage.removeItem('smart_token')
        dispatch(receiveLogout())
      })
      .catch(err => console.log("Error: ", err));

  }
}

// Calls the API to get a token and
// dispatches actions along the way
export function loginUser(creds) {

  return dispatch => {
    dispatch(requestLogin(creds))

    return axios.post('/api/v1/users/sign_in.json',{
      // authenticity_token: ReactOnRails.authenticityToken(),
      user: {
        login: creds.login,
        password: creds.password
      },
    })
      .then(function (response) {

        let token = response.headers.authorization
        localStorage.setItem('smart_token', token)
        dispatch(receiveLogin(response.data))
      })
      .catch(err => console.log("Error: ", err));
  }
}